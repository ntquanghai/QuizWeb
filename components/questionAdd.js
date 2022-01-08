import questionAddDetail from "./questionAddDetail.js"
import header from "./header.js"

export default class questionAdd {
    $qaMainContainer
    $qaContainer

    $qaOption
    $qaOptionQues
    $qaOptionText
    $qaOptionImg

    constructor() {
        this.$qaMainContainer = document.createElement("div");
        this.$qaMainContainer.setAttribute("class","absolute flex flex-col h-2/3 w-2/3 p-4 bg-yellow-50 border-2 border-black");
        this.$qaMainContainer.style.top = "50%";
        this.$qaMainContainer.style.left = "50%";
        this.$qaMainContainer.style.transform = "translate(-50%,-50%)"

        this.$qaContainer = document.createElement("div");
        this.$qaContainer.setAttribute("class","my-auto");

        this.$qaOption = document.createElement("div");
        this.$qaOption.setAttribute("class","flex justify-around");

        this.$qaOptionQues = document.createElement("div");
        this.$qaOptionQues.textContent = "Choose the type of your question."
        this.$qaOptionQues.setAttribute("class","text-6xl text-center m-8")

        this.$qaOptionText = document.createElement("button");
        this.$qaOptionText.textContent = "Text question";
        this.$qaOptionText.setAttribute("class","p-20 text-xl border-2 border-black bg-yellow-200 hover:bg-yellow-300");
        this.$qaOptionText.addEventListener("click", function() {
            document.getElementById("app").innerHTML = "";
            const toTextPage = new questionAddDetail("text");
            toTextPage.render(document.getElementById("app"));
        })

        this.$qaOptionImg = document.createElement("button");
        this.$qaOptionImg.textContent = "Image question";
        this.$qaOptionImg.setAttribute("class","p-20 text-xl border-2 border-black bg-yellow-200 hover:bg-yellow-300");
        this.$qaOptionImg.addEventListener("click", function() {
            document.getElementById("app").innerHTML = "";
            const toTextPage = new questionAddDetail("img");
            toTextPage.render(document.getElementById("app"));
        })  
    }


    render(container) {
        const newHeader = new header();
        newHeader.render(document.getElementById("app"));

        container.appendChild(this.$qaMainContainer);

        this.$qaMainContainer.appendChild(this.$qaContainer);
        this.$qaContainer.appendChild(this.$qaOptionQues);

        this.$qaOption.appendChild(this.$qaOptionText);
        this.$qaOption.appendChild(this.$qaOptionImg);
        
        this.$qaContainer.appendChild(this.$qaOption);
    }
}