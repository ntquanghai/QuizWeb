import questionAddDetail from "./questionAddDetail.js"

export default class questionAdd {
    $qaMainContainer
    $qaContainer

    $qaOption
    $qaOptionQues
    $qaOptionText
    $qaOptionImg

    constructor() {
        this.$qaMainContainer = document.createElement("div");
        this.$qaMainContainer.setAttribute("class","flex flex-col h-screen p-4")

        this.$qaContainer = document.createElement("div");
        this.$qaContainer.setAttribute("class","my-auto");

        this.$qaOption = document.createElement("div");
        this.$qaOption.setAttribute("class","flex justify-around");

        this.$qaOptionQues = document.createElement("div");
        this.$qaOptionQues.textContent = "Choose the type of your question."
        this.$qaOptionQues.setAttribute("class","text-6xl text-center m-8")

        this.$qaOptionText = document.createElement("button");
        this.$qaOptionText.textContent = "Text question";
        this.$qaOptionText.setAttribute("class","p-20 text-xl border-2 rounded");
        this.$qaOptionText.addEventListener("click", function() {
            document.getElementById("app").innerHTML = "";
            const toTextPage = new questionAddDetail("text");
            toTextPage.render(document.getElementById("app"));
        })

        this.$qaOptionImg = document.createElement("button");
        this.$qaOptionImg.textContent = "Image question";
        this.$qaOptionImg.setAttribute("class","p-20 text-xl border-2 rounded");
        this.$qaOptionImg.addEventListener("click", function() {
            document.getElementById("app").innerHTML = "";
            const toTextPage = new questionAddDetail("img");
            toTextPage.render(document.getElementById("app"));
        })  
    }


    render(container) {
        container.appendChild(this.$qaMainContainer);

        this.$qaMainContainer.appendChild(this.$qaContainer);
        this.$qaContainer.appendChild(this.$qaOptionQues);

        this.$qaOption.appendChild(this.$qaOptionText);
        this.$qaOption.appendChild(this.$qaOptionImg);
        
        this.$qaContainer.appendChild(this.$qaOption);
    }
}