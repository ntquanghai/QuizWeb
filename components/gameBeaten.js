export default class gameBeaten {
    $gbMainContainer
    $gbContainer
    $gBBackground
    $gbTextCongrats
    $gbTextRecord
    $gbRecord
    $gbQuestNum
    $gbPoint
    $gbMainButton
    $gbLeaderboardButton

    constructor(questNum,points) {
        this.$gBBackground = document.createElement("div");
        this.$gBBackground.setAttribute("class","w-screen h-screen bg-cover bg-no-repeat flex")
        this.$gBBackground.style.backgroundImage = "url(./img/congrats.gif)";

        this.$gbContainer  = document.createElement("div");
        this.$gbContainer.setAttribute("class","flex flex-col m-auto");

        this.$gbTextCongrats = document.createElement("div");
        this.$gbTextCongrats.textContent = "CONGRATULATIONS!";
        this.$gbTextCongrats.setAttribute("class","font-bold text-6xl text-green-400")

        this.$gbTextRecord = document.createElement("div");
        this.$gbTextRecord.textContent = "You have reached our current record!";
        this.$gbTextRecord.setAttribute("class","text-3xl text-center p-2 font-bold");

        this.$gbRecord = document.createElement("div");
        this.$gbRecord.setAttribute("class","flex justify-around")

        this.$gbQuestNum = document.createElement("div");
        this.$gbQuestNum.textContent = "Question: " + questNum;
        this.$gbQuestNum.setAttribute("class","text-xl");

        this.$gbPoint = document.createElement("div");
        this.$gbPoint.textContent = "Points: " + points;
        this.$gbPoint.setAttribute("class","text-xl");


        this.$gbMainButton = document.createElement("button");
        this.$gbMainButton.textContent = "Main page";
        this.$gbMainButton.setAttribute("class","p-2 bg-green-200 inline-block m-2")
        
        this.$gbLeaderboardButton = document.createElement("button");
        this.$gbLeaderboardButton.textContent = "Leaderboard"
        this.$gbLeaderboardButton.setAttribute("class","p-2 bg-green-200 inline-block m-2")
    }
    render(container) {
        this.$gBBackground.appendChild(this.$gbContainer);
        this.$gbContainer.appendChild(this.$gbTextCongrats);
        this.$gbContainer.appendChild(this.$gbTextRecord);
        this.$gbRecord.appendChild(this.$gbQuestNum);
        this.$gbRecord.appendChild(this.$gbPoint);
        this.$gbContainer.appendChild(this.$gbRecord);
        this.$gbContainer.appendChild(this.$gbMainButton);
        this.$gbContainer.appendChild(this.$gbLeaderboardButton);
        container.appendChild(this.$gBBackground);
    }
}


