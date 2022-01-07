import Main from "./gamePage.js"
import points from "./gamePage.js"

export default class gameOverModal {
    $GOModalContainer
    $GOModalackgroundOverlay

    $GOModalTextbox
    $GOModalText
    $GOModalPointsText

    $GOModalButtonsContainer
    $GOModalReplay
    $GOModalToLeaderboard
    $GOModalToMain

    constructor(points) {
        this.$GOModalackgroundOverlay = document.createElement("div");
        this.$GOModalackgroundOverlay.setAttribute("class","w-screen h-screen fixed top-1/2 left-1/2 z-20")
        this.$GOModalackgroundOverlay.style.backgroundColor = "rgba(0,0,0,0.2)"
        this.$GOModalackgroundOverlay.style.transform = "translate(-50%, -50%)";

        this.$GOModalContainer = document.createElement("div");
        this.$GOModalContainer.setAttribute("class","fixed top-1/2 left-1/2 rounded- bg-white p-4 border-2 border-black")
        this.$GOModalContainer.style.transform = "translate(-50%, -50%)";

        this.$GOModalTextbox = document.createElement("div");
        this.$GOModalText = document.createElement("div");
        this.$GOModalText.textContent = "GAME OVER";
        this.$GOModalText.setAttribute("class","font-bold text-2xl text-center");

        this.$GOModalPointsText = document.createElement("div");
        this.$GOModalPointsText.textContent = "You reached " + points + " points!";
        this.$GOModalPointsText.setAttribute("class","text-center");

        this.$GOModalButtonsContainer = document.createElement("div");
        this.$GOModalButtonsContainer.setAttribute("class","flex justify-between bg-grey-100 p-2");
        
        this.$GOModalReplay = document.createElement("button");
        this.$GOModalReplay.setAttribute("class","px-2 py-1 bg-green-200 border-1 mx-2 w-32 border-black border hover:bg-green-300")
        this.$GOModalReplay.textContent = "Replay";
        
        this.$GOModalToLeaderboard = document.createElement("button");
        this.$GOModalToLeaderboard.setAttribute("class","px-2 py-1 border-1 bg-green-200 mx-2 w-32 border-black border hover:bg-green-300");
        this.$GOModalToLeaderboard.textContent = "Leaderboard";

        this.$GOModalToMain = document.createElement("button");
        this.$GOModalToMain.setAttribute("class","px-2 py-1 border-1 bg-green-200 mx-2 w-32 border-black border hover:bg-green-300");
        this.$GOModalToMain.textContent = "Main page";
    }

    replay() { 

        const newMain = new Main();
        newMain.render(document.getElementById("app"));
        newMain.runGame();
    }

    render(container) {
        this.$GOModalackgroundOverlay.appendChild(this.$GOModalContainer);

        this.$GOModalToMain.addEventListener("click", function() {
            sessionStorage.removeItem("Replay");
            location.reload();
        })

        this.$GOModalReplay.addEventListener("click", function() {
            sessionStorage.setItem("Replay", "true");
            location.reload();
        })

        this.$GOModalToLeaderboard.addEventListener("click", function() {

        })


        this.$GOModalTextbox.appendChild(this.$GOModalText);
        this.$GOModalTextbox.appendChild(this.$GOModalPointsText);

        this.$GOModalButtonsContainer.appendChild(this.$GOModalToMain);
        this.$GOModalButtonsContainer.appendChild(this.$GOModalToLeaderboard);
        this.$GOModalButtonsContainer.appendChild(this.$GOModalReplay);

        this.$GOModalContainer.appendChild(this.$GOModalTextbox);
        this.$GOModalContainer.appendChild(this.$GOModalButtonsContainer);
        container.appendChild(this.$GOModalackgroundOverlay);
    }
}
    