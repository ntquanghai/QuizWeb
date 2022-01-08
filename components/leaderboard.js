import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { auth } from "./outerImports.js";
import header from "./header.js"

let dataUser = [];
const db = getFirestore();
    const questionData = collection(db, "questionData");
    const userData = collection(db, "userData");
    const getUserData = getDocs(userData);
    getUserData.then((data) => {
      data.docs.forEach((doc) => {
        dataUser.push({ ...doc.data(), id: doc.id });
      });
    });
    await getUserData;


    function topSort(array) {
      let filterArr =[];
      for(let i = 0; i < array.length; i++) {
        if(filterArr.includes(array[i].username)) {
          array.splice(array[i],1);
          i--;
        }
        else {
        }
        filterArr.push(array[i].username);
      }
      return array
    }


export default class leaderboard {
  $lbMainContainer;
  $lbContainer;
  $lbHeader;

  $lbContentContainer;
  $lbContentHeader;

  $lbBoardContainer;

  $lbBoardHeaderContainer;
  $lbBoardHeader;

  $lbBoardRank;
  $lbBoardName;
  $lbBoardPoints;
  $lbBoardTimeCompleted;

  $lbBoardContent;

  constructor() {
    this.$lbMainContainer = document.createElement("div");
    this.$lbMainContainer.setAttribute("class","flex flex-col w-screen h-screen")

    this.$lbContainer = document.createElement("div");
    this.$lbContainer.setAttribute(
      "class",
      "flex flex-col h-5/6 w-2/3 p-8 bg-white border-2 border-black m-auto"
    );

    this.$lbHeader = new header();

    this.$lbContentContainer = document.createElement("div");

    this.$lbContentHeader = document.createElement("div");
    this.$lbContentHeader.setAttribute(
      "class",
      "text-8xl font-bold text-center p-4 text-yellow-300"
    );
    this.$lbContentHeader.textContent = "LEADERBOARD";

    this.$lbBoardContainer = document.createElement("table");
    this.$lbBoardContainer.style.width = "100%";
    this.$lbBoardContainer.style.overflow = "scroll";

    this.$lbBoardHeaderContainer = document.createElement("thead");

    this.$lbBoardHeader = document.createElement("tr");

    this.$lbBoardRank = document.createElement("th");
    this.$lbBoardRank.setAttribute(
      "class",
      "text-center py-2 px-8 border-l-2 border-t-2 border-b-2 border-black"
    );
    this.$lbBoardRank.textContent = "Rank";

    this.$lbBoardName = document.createElement("th");
    this.$lbBoardName.setAttribute(
      "class",
      "text-center flex-grow py-2 px-2 border-l-2 border-t-2 border-b-2 border-black w-1/3"
    );
    this.$lbBoardName.textContent = "Username";

    this.$lbBoardPoints = document.createElement("th");
    this.$lbBoardPoints.setAttribute(
      "class",
      "text-center py-2 px-4 border-l-2 border-t-2 border-b-2 border-black"
    );
    this.$lbBoardPoints.textContent = "Points";

    this.$lbBoardTimeCompleted = document.createElement("th");
    this.$lbBoardTimeCompleted.setAttribute(
      "class",
      "text-center py-2 px-4 border-2 border-black whitespace-nowrap"
    );
    this.$lbBoardTimeCompleted.textContent = "Time completed";
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

  runTable(container) {
    const fieldSorter = (fields) => (a, b) => fields.map(o => 
      {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
      }).reduce((p, n) => p ? p : n, 0);
  
    let dataUserArr = dataUser
      .sort(fieldSorter(["points", "-timePlay"]))
      .reverse();
      let filterArr =[];
      for(let i = 0; i < dataUserArr.length; i++) {
        if(filterArr.includes(dataUserArr[i].username)) {
          dataUserArr.splice(i,1);
          i--;
        }
        else {
          filterArr.push(dataUserArr[i].username);
        }
      }
    const infoContainer = document.createElement("tbody");
    if(dataUserArr.length < 10) {
      for (let i = 0; i < dataUserArr.length; i++) {
        let tableRow = document.createElement("tr");
        if (i % 2 == 0) {
          tableRow.setAttribute("class", "bg-gray-200");
        }
        let rowRank = document.createElement("td");
        rowRank.setAttribute(
          "class",
          "text-center py-2 px-8 border-l-2 border-t-2 border-b-2 border-black"
        );
        rowRank.textContent = i + 1;
  
        let rowName = document.createElement("td");
        rowName.setAttribute(
          "class",
          "text-center flex-grow py-2 px-2 border-l-2 border-t-2 border-b-2 border-black"
        );
        if(dataUserArr[i].username === auth.currentUser.displayName) {
          rowName.textContent = dataUserArr[i].username + " (You)";
        } 
        else {
          rowName.textContent = dataUserArr[i].username;
        }
  
  
        let rowPoints = document.createElement("td");
        rowPoints.setAttribute(
          "class",
          "text-center py-2 px-4 border-l-2 border-t-2 border-b-2 border-black"
        );
        rowPoints.textContent = dataUserArr[i].points;
  
        let rowDate = document.createElement("td");
        rowDate.setAttribute(
          "class",
          "text-center py-2 px-4 border-2 border-black whitespace-nowrap"
        );
        rowDate.textContent = this.convertHMS(dataUserArr[i].timePlay);
  
        tableRow.appendChild(rowRank);
        tableRow.appendChild(rowName);
        tableRow.appendChild(rowPoints);
        tableRow.appendChild(rowDate);
  
        infoContainer.appendChild(tableRow);
      }
    }
    else {
      for (let i = 0; i < 10; i++) {
        let tableRow = document.createElement("tr");
        if (i % 2 == 0) {
          tableRow.setAttribute("class", "bg-gray-200");
        }
        let rowRank = document.createElement("td");
        rowRank.setAttribute(
          "class",
          "text-center py-2 px-8 border-l-2 border-t-2 border-b-2 border-black"
        );
        rowRank.textContent = i + 1;
  
        let rowName = document.createElement("td");
        rowName.setAttribute(
          "class",
          "text-center flex-grow py-2 px-2 border-l-2 border-t-2 border-b-2 border-black"
        );
        if(dataUserArr[i].username === auth.currentUser.displayName) {
          rowName.textContent = dataUserArr[i].username + " (You)";
        } 
        else {
          rowName.textContent = dataUserArr[i].username;
        }
  
  
        let rowPoints = document.createElement("td");
        rowPoints.setAttribute(
          "class",
          "text-center py-2 px-4 border-l-2 border-t-2 border-b-2 border-black"
        );
        rowPoints.textContent = dataUserArr[i].points;
  
        let rowDate = document.createElement("td");
        rowDate.setAttribute(
          "class",
          "text-center py-2 px-4 border-2 border-black whitespace-nowrap"
        );
        rowDate.textContent = this.convertHMS(dataUserArr[i].timePlay);
  
        tableRow.appendChild(rowRank);
        tableRow.appendChild(rowName);
        tableRow.appendChild(rowPoints);
        tableRow.appendChild(rowDate);
  
        infoContainer.appendChild(tableRow);
      }
    }
    
    container.appendChild(infoContainer);
  }

  render(container) {
    document
      .getElementById("app")
      .setAttribute("class", "w-screen h-screen");

    this.$lbBoardHeader.appendChild(this.$lbBoardRank);
    this.$lbBoardHeader.appendChild(this.$lbBoardName);
    this.$lbBoardHeader.appendChild(this.$lbBoardPoints);
    this.$lbBoardHeader.appendChild(this.$lbBoardTimeCompleted);

    this.$lbBoardHeaderContainer.appendChild(this.$lbBoardHeader);

    this.$lbBoardContainer.appendChild(this.$lbBoardHeaderContainer);
    this.runTable(this.$lbBoardContainer);

    this.$lbContentContainer.appendChild(this.$lbContentHeader);
    this.$lbContentContainer.appendChild(this.$lbBoardContainer);
    this.$lbContainer.appendChild(this.$lbContentContainer);

    this.$lbHeader.render(this.$lbMainContainer);
    this.$lbMainContainer.appendChild(this.$lbContainer);
    container.appendChild(this.$lbMainContainer);
  }
}
