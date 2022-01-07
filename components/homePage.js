import Main from "./gamePage.js";
import app from "../Login-Register/app.js"
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import leaderboard from "./leaderboard.js";

const auth = getAuth();

export default class HomePage {
  $header;
  $liScore;
  $liLogOut;
  $btnPlay;
  $container;
  $logoutButton;

  constructor() {
    this.$header = document.createElement("header");
    this.$header.setAttribute(
      "class",
      "flex items-center justify-between header"
    );

    this.$liScore = document.createElement("li");
    // this.$liLogOut = document.createElement("li");
    // this.$liHis.innerHTML = `<i class="fas fa-history"></i>Lịch sử`;

    this.$btnPlay = document.createElement("button");
    this.$btnPlay.innerHTML = "PLAY NOW";
    this.$btnPlay.setAttribute("class","py-4 px-8 text-2xl bg-green-300 border-2 rounded border-black hover:bg-green-400")
    this.$btnPlay.addEventListener("click", this.goToPlay);

    this.$logoutButton = document.createElement("button");

    this.$container = document.createElement("div");
    this.$container.setAttribute("class", "p-4");

    // this.$logoutButton.appendChild(this.$liLogOut);
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const loginName = document.createElement("div");
    const rank = document.createElement("div");
    const logOut = document.createElement("div");
    const centerBtn = document.createElement("div");
    const logoutBtn = document.createElement("div");
    const nav_right = document.createElement("div");
    
    const logoName = document.createElement("div");
    logoName.textContent = "Quizzy";
    logoName.style.fontFamily = ""

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
    imgRank.addEventListener("click", function() {
        console.log("asdfasdf");
        app.setActiveScreen(new leaderboard);
    })

    loginName.appendChild(iMaxLevel);
    loginName.appendChild(user);
    loginName.setAttribute("class", "logo text-2xl p-4 border-2 border-black rounded bg-green-400");

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


    this.$header.appendChild(nav);
    this.$header.appendChild(rank);
    this.$header.appendChild(logOut);

    centerBtn.appendChild(this.$btnPlay);
    centerBtn.setAttribute("class", "absolute left-1/2 center");

    // logoutBtn.appendChild(this.$logoutButton);
    // logoutBtn.setAttribute("class", "absolute left-1/2 right");

    this.$container.appendChild(this.$header);
    this.$container.appendChild(centerBtn);
    this.$container.appendChild(logoutBtn);

    nav_right.appendChild(rank);
    nav_right.appendChild(logOut);
    nav_right.setAttribute("class", "flex justify-center items-center");

    this.$header.appendChild(nav_right);

    logOut.appendChild(iLogOut);
    rank.appendChild(imgRank);
    rank.setAttribute(
      "class",
      "h-20 cursor-pointer p-2.5 relative overflow-hidden rank"
    );
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
    const mainContainer = document.createElement("div");

    mainContainer.appendChild(this.$container);

    // this.$container.render(mainContainer);

    container.appendChild(mainContainer);
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
