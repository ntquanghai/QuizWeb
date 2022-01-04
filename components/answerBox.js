export default class answerBox {
    $boxContainer
    $boxAnsBox
    $boxAnsChoice
    $boxAnsText
    
    _boxAnsValue

    constructor(ans, text, value) {
        this.$boxContainer = document.createElement("button");
        this.$boxContainer.setAttribute("class","w-1/4 mx-2 mt-4 bg-green-200 hover:bg-green-300 cursor-pointer h-16 p-2 border border-black");
        this._boxAnsValue = value;
        this.$boxContainer.classList.add(this._boxAnsValue);

        this.$boxAnsBox = document.createElement("div");
        this.$boxAnsBox.setAttribute("class","flex my-auto");

        this.$boxAnsChoice = document.createElement("div");
        this.$boxAnsChoice.textContent = ans +".";

        this.$boxAnsText = document.createElement("div");
        this.$boxAnsText.setAttribute("class","ml-1");
        this.$boxAnsText.textContent = text;
    }
    render(container) {
        this.$boxAnsBox.appendChild(this.$boxAnsChoice);
        this.$boxAnsBox.appendChild(this.$boxAnsText);
        this.$boxContainer.appendChild(this.$boxAnsBox);
        container.appendChild(this.$boxContainer);
    }
}