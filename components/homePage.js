import Main from "./index.js";
import app from "../Login-Register/app.js";

export default class HomePage {
  $header;
  $liScore;
  $liHis;
  $btnPlay;
  $container;
  constructor() {
    this.$header = document.createElement("header");
    this.$header.setAttribute(
      "class",
      "flex items-center justify-between header"
    );

    this.$liScore = document.createElement("li");
    this.$liHis = document.createElement("li");
    this.$liHis.innerHTML = `<i class="fas fa-history"></i>Lịch sử`;

    this.$btnPlay = document.createElement("button");
    this.$btnPlay.innerHTML = "CHƠI NGAY";
    this.$btnPlay.addEventListener("click", this.goToPlay);

    this.$container = document.createElement("div");
    this.$container.setAttribute("class", "p-4");

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const loginName = document.createElement("div");
    const rank = document.createElement("div");
    const centerBtn = document.createElement("div");

    const iMaxLevel = document.createElement("i");
    const iScore = document.createElement("i");
    const iHis = document.createElement("i");

    const user = document.createElement("span");
    const score = document.createElement("span");

    const imgRank = document.createElement("img");

    iMaxLevel.setAttribute("class", "fas fa-user-circle");

    imgRank.src = "./img/logoRanking.png";

    loginName.appendChild(iMaxLevel);
    loginName.appendChild(user);
    loginName.setAttribute("class", "logo");

    ul.appendChild(loginName);
    ul.appendChild(this.$liScore);
    ul.appendChild(this.$liHis);

    nav.appendChild(ul);
    nav.setAttribute("class", "navbar");

    this.$liHis.appendChild(iHis);
    // iHis.setAttribute("class", "fas fa-history");

    this.$liScore.appendChild(iScore);
    iScore.setAttribute("class", "fas fa-award");

    this.$liScore.appendChild(score);

    score.innerHTML = "Điểm cao nhất: ";

    this.$header.appendChild(nav);
    this.$header.appendChild(rank);

    centerBtn.appendChild(this.$btnPlay);
    centerBtn.setAttribute("class", "absolute left-1/2 center");

    this.$container.appendChild(this.$header);
    this.$container.appendChild(centerBtn);

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

  render(container) {
    // return this.$container;
    const mainContainer = document.createElement("div");

    mainContainer.appendChild(this.$container);

    // this.$container.render(mainContainer);

    container.appendChild(mainContainer);
  }
}
// const main = new HomePage();
// document.getElementById("app").appendChild(main.render());
