import app from "../Login-Register/app.js"
import HomePage from "./homePage.js"
import leaderboard from "./leaderboard.js"
import {auth} from "./outerImports.js"
import { signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import codeModal from "./codeModal.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import questionAddDetail from "./questionAddDetail.js";
import questionAdd from "./questionAdd.js"
let editorListArr = [];
const db = getFirestore();
const editorList = collection(db,"editorList");
const getEditorList = await getDocs(editorList);


getEditorList.forEach((doc) => {
  editorListArr.push(doc.data());
})

let editorArr = [];

for(let i = 0; i < editorListArr.length; i++) {
    editorArr.push(editorListArr[i].userId);
}

export default class header {
    $headerContainer

    $headerContentContainer
    $headerLogo
    $headerHome
    $headerLeaderboard
    $headerEditCode

    $profileMenuContainer

    $headerUsernameContainer
    $headerUsername
    $headerSeparation
    $headerUsernameLogOut

    constructor() {

        this.$headerContainer = document.createElement("div");
        this.$headerContainer.setAttribute("class","py-3 px-20 flex justify-between w-screen")
        this.$headerContainer.style.backgroundColor = "rgba(252, 211, 77, 0.8)"

        
        this.$headerLogo = document.createElement("div");
        this.$headerLogo.textContent = "Quizzy";
        this.$headerLogo.style.fontFamily = "Bubblegum Sans, cursive";
        this.$headerLogo.setAttribute("class","font-bold text-5xl my-auto italic ");

        this.$headerContentContainer = document.createElement("div");
        this.$headerContentContainer.setAttribute("class","flex my-auto")
        
        this.$headerHome = document.createElement("div");
        this.$headerHome.setAttribute("class","text-xl cursor-pointer text-center my-auto ml-12 px-4 hover:text-yellow-400")
        this.$headerHome.textContent = "HOME";
        this.$headerHome.addEventListener("click", function() {
            const newHomePage = new HomePage();
            document.getElementById("app").innerHTML = "";
            newHomePage.render(document.getElementById("app"));
        });

        this.$headerLeaderboard = document.createElement("div");
        this.$headerLeaderboard.setAttribute("class","text-xl cursor-pointer text-center my-auto px-4 hover:text-yellow-400")
        this.$headerLeaderboard.textContent = "LEADERBOARD";
        this.$headerLeaderboard.addEventListener("click", function() {
            const lb = new leaderboard();
            document.getElementById("app").innerHTML = "";
            lb.render(document.getElementById("app"));
        });

        this.$headerEditCode = document.createElement("div")
        this.$headerEditCode.setAttribute("class","text-xl cursor-pointer text-center my-auto px-4 hover:text-yellow-400")

        
            if(editorArr.includes(auth.currentUser.uid)) {
                this.$headerEditCode.textContent = "ADD QUESTIONS";
                this.$headerEditCode.addEventListener("click", function() {
                    const addQuestion = new questionAdd();
                    document.getElementById("app").innerHTML = "";
                    addQuestion.render(document.getElementById("app"));
                })
            }
            else {   
                    console.log("asdfasdf");
                    this.$headerEditCode.textContent = "EDITOR'S INVITATION";
                    this.$headerEditCode.addEventListener("click", function() {
                    const addQuestion = new codeModal();
                    addQuestion.render(document.getElementById("app"));
                })
            }



        this.$headerHighestScore = document.createElement("div");

        this.$headerUsernameContainer = document.createElement("div");
        this.$headerUsernameContainer.setAttribute("class","flex")

        this.$headerUsername = document.createElement("div");
        this.$headerUsername.setAttribute("class","my-auto text-xl font-bold");
        this.$headerUsername.id = "header--username"
        this.$headerUsername.textContent = auth.currentUser.displayName;

        this.$headerSeparation = document.createElement("div");
        this.$headerSeparation.textContent = "|";
        this.$headerSeparation.setAttribute("class","text-xl mx-2 my-auto")

        this.$headerUsernameLogOut = document.createElement("div")
        this.$headerUsernameLogOut.id = "signOut";
        this.$headerUsernameLogOut.textContent =  "Sign out";
        this.$headerUsernameLogOut.setAttribute("class"," my-auto text-xl cursor-pointer hover:text-yellow-400")
        this.$headerUsernameLogOut.addEventListener("click", function() {
            signOut(auth).then(() => {
              }).catch((error) => {
                alert("Invalid")
              });
        })


        this.$profileMenuContainer = document.createElement("ul");
        this.$profileMenuContainer.setAttribute("class","flex flex-col")

        this.$profileMenuName = document.createElement("li");
        this.$profileMenuName.textContent = "Username"


        this.$profileSignOut = document.createElement("li");
        this.$profileSignOut.textContent = "Sign out"

    }

    
    render(container) {
        this.$headerContentContainer.appendChild(this.$headerLogo)
        this.$headerContentContainer.appendChild(this.$headerHome);
        this.$headerContentContainer.appendChild(this.$headerLeaderboard);
        this.$headerContentContainer.appendChild(this.$headerEditCode);

        this.$headerContainer.appendChild(this.$headerContentContainer);

        this.$headerUsernameContainer.appendChild(this.$headerUsername);
        this.$headerUsernameContainer.appendChild(this.$headerSeparation);
        this.$headerUsernameContainer.appendChild(this.$headerUsernameLogOut);
        this.$headerContainer.appendChild(this.$headerUsernameContainer)

        container.appendChild(this.$headerContainer);
    }
}