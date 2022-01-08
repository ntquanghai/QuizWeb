import Main from "./gamePage.js";
import app from "../Login-Register/app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import leaderboard from "./leaderboard.js";
import header from "./header.js";
import { db } from "./outerImports.js";
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";

const auth = getAuth();
let dataArr = [];
if (auth.currentUser != null) {
  const q = query(
    collection(db, "userData"),
    where("userId", "==", auth.currentUser.uid)
  );
  const getDoc = await getDocs(q);
  getDoc.forEach((doc) => {
    dataArr.push(doc.data());
  });
  const fieldSorter = (fields) => (a, b) =>
    fields
      .map((o) => {
        let dir = 1;
        if (o[0] === "-") {
          dir = -1;
          o = o.substring(1);
        }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
      })
      .reduce((p, n) => (p ? p : n), 0);
  dataArr.sort(fieldSorter(["points", "-timePlay"])).reverse();
  console.log(dataArr[0].dateEnd.seconds);
}

export default class HomePage {
  $header;
  $liScore;
  $liLogOut;
  $btnPlay;
  $container;

  $centerModal;
  $centerModalText;

  $centerModalPlayDataContainer;

  $centerModalPlayDataText;
  $centerModalPlayDataHighScore;
  $centerModalPlayDataTimeCompleted;
  $centerModalPlayDataTimeLast;

  $centerModalBtnPlayContainer;

  $logoutButton;

  constructor() {
    this.$header = new header();
    // this.$header.setAttribute(
    //   "class",
    //   "flex items-center justify-between header"
    // );

    this.$liScore = document.createElement("li");
    // this.$liLogOut = document.createElement("li");
    // this.$liHis.innerHTML = `<i class="fas fa-history"></i>Lịch sử`;

    this.$logoutButton = document.createElement("button");

    this.$container = document.createElement("div");
    // this.$container.setAttribute("class", "p-4");

    // this.$logoutButton.appendChild(this.$liLogOut);
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const loginName = document.createElement("div");
    const rank = document.createElement("div");
    const logOut = document.createElement("div");
    const logoutBtn = document.createElement("div");
    const nav_right = document.createElement("div");

    const logoName = document.createElement("div");
    logoName.textContent = "Quizzy";
    logoName.style.fontFamily = "";

    const iMaxLevel = document.createElement("i");
    const iScore = document.createElement("i");
    const iLogOut = document.createElement("button");
    iLogOut.innerText = "Sign out";
    iLogOut.addEventListener("click", this.signOut);

    const user = document.createElement("span");
    user.innerText = auth.currentUser.displayName;
    const score = document.createElement("span");

    const imgRank = document.createElement("img");

    iMaxLevel.setAttribute("class", "fas fa-user-circle");

    imgRank.src = "./img/logoRanking.png";
    imgRank.addEventListener("click", function () {
      console.log("asdfasdf");
      app.setActiveScreen(new leaderboard());
    });

    loginName.appendChild(iMaxLevel);
    loginName.appendChild(user);
    loginName.setAttribute(
      "class",
      "logo text-2xl p-4 border-2 border-black rounded bg-green-400"
    );

    ul.appendChild(loginName);
    ul.appendChild(this.$liScore);
    // ul.appendChild(this.$liLogOut);

    nav.appendChild(ul);
    nav.setAttribute("class", "navbar");

    // this.$liLogOut.appendChild(iLogOut);
    iLogOut.setAttribute("class", "fas fa-sign-out-alt ml-4 logOut");

    this.$liScore.appendChild(iScore);
    iScore.setAttribute("class", "fas fa-award");

    this.$liScore.appendChild(score);

    score.innerHTML = "HIGHEST SCORE:";

    this.$centerModal = document.createElement("div");
    this.$centerModal.setAttribute(
      "class",
      "absolute left-1/2 center w-1/2 p-8 flex flex-col bg-yellow-50 border-2 border-black"
    );

    this.$centerModalText = document.createElement("div");
    this.$centerModalText.textContent = "ARE YOU READY FOR THE QUIZZES?";
    this.$centerModalText.setAttribute(
      "class",
      "text-8xl font-bold text-yellow-300 p-2 mx-auto text-center"
    );

    this.$btnPlay = document.createElement("button");
    this.$btnPlay.innerHTML = "PLAY NOW";
    this.$btnPlay.setAttribute(
      "class",
      "py-4 px-8 text-2xl bg-yellow-200 border-2 rounded border-black hover:bg-yellow-300 block mx-auto"
    );
    this.$btnPlay.addEventListener("click", this.goToPlay);

    this.$centerModalBtnPlayContainer = document.createElement("div");
    this.$centerModalBtnPlayContainer.appendChild(this.$btnPlay);

    this.$centerModalPlayDataContainer = document.createElement("div");
    this.$centerModalPlayDataContainer.setAttribute("class", "mx-auto p-4");

    this.$centerModalPlayDataText = document.createElement("div");
    this.$centerModalPlayDataText.textContent = "Your personal best record:";
    this.$centerModalPlayDataText.setAttribute(
      "class",
      "text-3xl font-bold text-center"
    );

    this.$centerModalPlayDataHighScore = document.createElement("div");
    this.$centerModalPlayDataHighScore.textContent =
      "Highest score: " + dataArr[0].points;
    this.$centerModalPlayDataHighScore.setAttribute(
      "class",
      "text-center text-2xl"
    );

    this.$centerModalPlayDataTimeCompleted = document.createElement("div");
    this.$centerModalPlayDataTimeCompleted.textContent =
      "Time completed: " + this.convertHMS(dataArr[0].timePlay);
    this.$centerModalPlayDataTimeCompleted.setAttribute(
      "class",
      "text-center text-2xl"
    );

    this.$centerModalPlayDataTimeLast = document.createElement("div");
    // this.$centerModalPlayDataTimeLast.textContent = "Last time played: " + this.toDateTime(dataArr[0].dateEnd.seconds);
    // this.$centerModalPlayDataTimeLast.setAttribute("class","text-center text-2xl");

    this.$centerModalPlayDataContainer.appendChild(
      this.$centerModalPlayDataText
    );
    this.$centerModalPlayDataContainer.appendChild(
      this.$centerModalPlayDataTimeLast
    );
    this.$centerModalPlayDataContainer.appendChild(
      this.$centerModalPlayDataHighScore
    );
    this.$centerModalPlayDataContainer.appendChild(
      this.$centerModalPlayDataTimeCompleted
    );

    this.$centerModal.appendChild(this.$centerModalText);
    this.$centerModal.appendChild(this.$centerModalPlayDataContainer);
    this.$centerModal.appendChild(this.$centerModalBtnPlayContainer);

    this.$header.render(this.$container);
    this.$container.appendChild(this.$centerModal);
    this.$container.appendChild(logoutBtn);

    nav_right.appendChild(rank);
    nav_right.appendChild(logOut);
    nav_right.setAttribute("class", "flex justify-center items-center");

    logOut.appendChild(iLogOut);
    rank.appendChild(imgRank);
    rank.setAttribute(
      "class",
      "h-20 cursor-pointer p-2.5 relative overflow-hidden rank"
    );
  }

  convertHMS(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  }

  toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  goToPlay = () => {
    let newMain = new Main();
    document.getElementById("app").innerHTML = "";
    newMain.render(document.getElementById("app"));
    newMain.runGame();
  };

  signOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign Out Succesful");
      })
      .catch((error) => {
        console.log("bruh");
      });
  };

  render(container) {
    // return this.$container;
    // const mainContainer = document.createElement("div");
    // mainContainer.appendChild(this.$container);
    // this.$container.render(mainContainer);

    container.appendChild(this.$container);
    if (sessionStorage.getItem("Replay")) {
      let newMain = new Main();
      document.getElementById("app").innerHTML = "";
      newMain.render(document.getElementById("app"));
      newMain.runGame();
    }
  }
}
// const main = new HomePage();
// document.getElementById("app").appendChild(main.render());
