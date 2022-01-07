export default class leaderboardPart {
    $lbPContainer
    $lbPRank
    $lbPName
    $lbPPoints
    $lbPTimeCompleted

    constructor(rank,username,points,timeCompleted) {
        this.$lbPContainer = document.createElement("div");

        this.$lbBoardRank = document.createElement("div");
        this.$lbBoardRank.setAttribute("class","text-center py-2 px-8 border-l-2 border-t-2 border-b-2 border-black");
        this.$lbBoardRank.textContent = rank;
        
        this.$lbBoardName = document.createElement("div");
        this.$lbBoardName.setAttribute("class","text-center flex-grow py-2 px-2 border-l-2 border-t-2 border-b-2 border-black");
        this.$lbBoardName.textContent = username;

        this.$lbBoardPoints = document.createElement("div");
        this.$lbBoardPoints.setAttribute("class","text-center py-2 px-8 border-l-2 border-t-2 border-b-2 border-black");
        this.$lbBoardPoints.textContent = points;

        this.$lbBoardTimeCompleted = document.createElement("div");
        this.$lbBoardTimeCompleted.setAttribute("class","text-center py-2 px-8 border-2 border-black");
        this.$lbBoardTimeCompleted.textContent = timeCompleted;
    }

    render(container) {
        
    }
}