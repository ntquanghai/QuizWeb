import answerBox from "./answerBox.js";
import data from "./data.js";
import gameOverModal from "./gameOverModal.js";

let points = 0;
let intervalVar;
let questNum = 1;


export default class Main {
    $mainContainer
    $mainQuestionsBox
    $mainQuestionsText

    $mainDuration

    $mainPointContainer
    $mainQuestionIndex
    $mainPoint

    $mainAns
    $mainAnsR1
    $mainAnsR2

    _points;
    _questNum;

    constructor() {
        this.$mainQuestionsBox = document.createElement("div");
        this.$mainQuestionsBox.setAttribute("class","flex flex-grow w-full text-8xl")

        this.$mainQuestionsText = document.createElement("div");
        this.$mainQuestionsText.setAttribute("class","m-auto flex-grow text-center");

        this.$mainDuration = document.createElement("div");
        this.$mainDuration.setAttribute("class","flex border-black border");

        this.$mainPointContainer = document.createElement("div");
        this.$mainPointContainer.setAttribute("class","flex");

        this.$mainQuestionIndex = document.createElement("div");
        this.$mainQuestionIndex.textContent = "Question: " + questNum;
        this.$mainQuestionIndex.setAttribute("class","text-xl m-4");

        this.$mainPoint = document.createElement("div");
        this.$mainPoint.setAttribute("class","text-xl m-4")
        this.$mainPoint.textContent = "Points: " + points;

        this.$mainAns = document.createElement("div");
        this.$mainAns.setAttribute("class","flex");
        
        this.$mainAnsR1 = document.createElement("div");
        this.$mainAnsR1.setAttribute("class","flex");
        
        this.$mainAnsR2 = document.createElement("div");
        this.$mainAnsR2.setAttribute("class","flex");
    }

    heee = (yer) => {
        return yer*10;
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    decrease = (array, length, textBox, timerNum, mainCon) => {
        timerNum.textContent = "GO"
        length = array.length;
        let i = 0;
        let timeNum = 15;
        intervalVar = setInterval(function() {
            timerNum.textContent = timeNum;
            timeNum--;
            if(i < 5) {
                array[14-i].classList.remove("bg-green-300");
            }
            else if((i >= 5) && (i < 10)) {
                if(i === 5) {
                    for(let j = 0; j < 10; j++) {
                        array[j].classList.remove("bg-green-300");
                        array[j].classList.add("bg-yellow-300");
                    }
                }
                array[14 - i].classList.remove("bg-yellow-300");
            }
            else if((i >= 10) && (i < 15)) {
                if(i === 10) {
                    for(let j = 0; j < 5; j++) {
                        array[j].classList.remove("bg-yellow-300");
                        array[j].classList.add("bg-red-300");
                    }
                }
                array[14 - i].classList.remove("bg-red-300");
            }
            else {
                clearInterval(intervalVar);
                textBox.textContent = "GAME OVER";
                const goModal = new gameOverModal(points);
                goModal.render(mainCon);
            }
            i++;
        },1000)
    }


    render(container) {

        const flag = false;
        let ansArr = ["A","B","C","D"];

        const dataArr = this.shuffle(data);

        let i = 0; 

        const arr = [];
        for(let i = 0; i < 15; i++) {
            arr[i] = document.createElement("div");
            arr[i].style.width = "6.66666666666%";
            arr[i].setAttribute("class","bg-green-300 h-20")
            arr[i].id = i;
            this.$mainDuration.appendChild(arr[i]);
        }

        const timerNum = document.createElement("div");
        timerNum.setAttribute("class","my-auto flex-grow text-3xl font-bold text-center");
        

        const mainContainer = document.createElement("div");
        mainContainer.setAttribute("class","flex flex-col-reverse h-screen p-4")

        mainContainer.appendChild(this.$mainAns);
        this.$mainQuestionsBox.appendChild(this.$mainQuestionsText);
        mainContainer.appendChild(this.$mainQuestionsBox);

        this.$mainPointContainer.appendChild(this.$mainQuestionIndex);
        this.$mainPointContainer.appendChild(timerNum);
        this.$mainPointContainer.appendChild(this.$mainPoint);

        mainContainer.appendChild(this.$mainPointContainer);
        mainContainer.appendChild(this.$mainDuration);
        this.$mainAns.appendChild(this.$mainAnsR1);
        this.$mainAns.appendChild(this.$mainAnsR2);

        this.$mainQuestionsText.textContent = dataArr[0].textQuestion;


        for(let i = 0; i < 4; i++) {
            let newAnswer = new answerBox((ansArr[i]),dataArr[0].ans[i].content,dataArr[0].ans[i].flag);
            newAnswer.$boxContainer.addEventListener("click", function(event) {
                if(event.currentTarget.classList.contains("true")) {
                    points = points + 10;
                    questNum++;
                    document.getElementById("app").innerHTML = "";
                    let hoho = new Main();
                    hoho.render(document.getElementById("app"));
                }
                else {
                    clearInterval(intervalVar);
                    let haha = new gameOverModal(points);
                    haha.render(mainContainer);
                }
            })
            newAnswer.render(this.$mainAns);
        }
    
        this.decrease(arr,15,this.$mainQuestionsText,timerNum,mainContainer);
        container.appendChild(mainContainer); 
    }
}


const haha = new Main();
haha.render(document.getElementById("app"));
