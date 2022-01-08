export default class answerBoxAdd {
    $boxContainer
    $boxAnsBox
    $boxAnsChoice
    $boxAnsText
    $boxAnsCheckboxContainer
    $boxAnsCheckmark

    
    constructor(ans,id) {
        this.$boxContainer = document.createElement("div");
        this.$boxContainer.setAttribute("class","flex w-1/4 mx-2 mt-4 bg-yellow-200 cursor-pointer h-16 p-2 border border-black");
        this.$boxContainer.id = id;

        this.$boxAnsBox = document.createElement("div");
        this.$boxAnsBox.setAttribute("class","flex my-auto w-full");

        this.$boxAnsChoice = document.createElement("div");
        this.$boxAnsChoice.textContent = ans +".";

        this.$boxAnsText = document.createElement("input");
        this.$boxAnsText.setAttribute("class","mx-1 bg-transparent outline-none my-auto flex-grow bg-yellow-100 px-2");
        this.$boxAnsText.maxLength = "20";

        this.$boxAnsCheckboxContainer = document.createElement("div");
        this.$boxAnsCheckboxContainer.setAttribute("class","my-auto w-6 h-6 bg-gray-100 hover:bg-gray-200")

        this.$boxAnsCheckmark = document.createElement("div");
        this.$boxAnsCheckmark.textContent = '✓';
        this.$boxAnsCheckmark.setAttribute("class","text-center hidden");
        this.$boxAnsCheckboxContainer.addEventListener("click", this.selectAns)
    }

    returnValue() {
        return this.$boxAnsText.value;
    }

    clearValue() {
        this.$boxAnsText.value = "";
        return this.$boxAnsText.value;
    }

    selectAns = (e) => {
        e.currentTarget.children[0].setAttribute("class","text-center block");
        e.currentTarget.parentNode.parentNode.classList.remove("false");
        e.currentTarget.parentNode.parentNode.classList.add("true");
        for(let i = 0; i < 4; i++) {
            if(e.currentTarget.children[0].parentNode.parentNode.parentNode.id != e.currentTarget.children[0].parentNode.parentNode.parentNode.parentNode.children[i].id) {
                document.getElementById("q"+i).children[0].children[2].children[0].setAttribute("class","text-center hidden");
                document.getElementById("q"+i).classList.remove("true");
                document.getElementById("q"+i).classList.add("false");
            }
        }
    }

    handleSubmit = (textQuestion,imgQuestion,ans1,ans2,ans3,ans4,flag1,flag2,flag3,flag4) => {
        const obj = {};
        obj.textQuestion = textQuestion
        obj.imgQuestion = imgQuestion
        
        const ans = [];
        const ansObj1 = {};
        ansObj1.content = ans1;
        ansObj1.flag = flag1;

        const ansObj2 = {};
        ansObj2.content = ans2;
        ansObj2.flag = flag2;

        const ansObj3 = {};
        ansObj3.content = ans3;
        ansObj3.flag = flag3;

        const ansObj4 = {};
        ansObj4.content = ans4;
        ansObj4.flag = flag4;

        ans.push(ansObj1,ansObj2,ansObj3,ansObj4);

        console.log(ans);
    }

    render(container) {
        this.$boxAnsBox.appendChild(this.$boxAnsChoice);
        this.$boxAnsBox.appendChild(this.$boxAnsText);
        this.$boxAnsCheckboxContainer.appendChild(this.$boxAnsCheckmark);
        this.$boxAnsBox.appendChild(this.$boxAnsCheckboxContainer);
        this.$boxContainer.appendChild(this.$boxAnsBox);
        container.appendChild(this.$boxContainer);
    }
}