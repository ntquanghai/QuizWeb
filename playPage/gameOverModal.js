import Main from "./index.js"
import points from "./index.js"

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
        this.$GOModalackgroundOverlay.style.backgroundColor = "rgba(0,0,0,0.1)"
        this.$GOModalackgroundOverlay.style.transform = "translate(-50%, -50%)";

        this.$GOModalContainer = document.createElement("div");
        this.$GOModalContainer.setAttribute("class","fixed top-1/2 left-1/2 rounded-xl bg-white p-4 ")
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
        this.$GOModalReplay.setAttribute("class","px-2 py-1 bg-red-200 border-1 mx-2 w-32")
        this.$GOModalReplay.textContent = "Replay";
        

        this.$GOModalToLeaderboard = document.createElement("button");
        this.$GOModalToLeaderboard.setAttribute("class","px-2 py-1 border-1 bg-red-200 mx-2 w-32");
        this.$GOModalToLeaderboard.textContent = "Leaderboard";

        this.$GOModalToMain = document.createElement("button");
        this.$GOModalToMain.setAttribute("class","px-2 py-1 border-1 bg-red-200 mx-2 w-32");
        this.$GOModalToMain.textContent = "Main page";
    }

    render(container) {
        this.$GOModalackgroundOverlay.appendChild(this.$GOModalContainer);

        this.$GOModalReplay.addEventListener("click", function() {
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
    