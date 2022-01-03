import answerBox from "./answerBox.js";
import data from "./data.js";
import gameOverModal from "./gameOverModal.js";
import gameBeaten from "./gameBeaten.js";
import questionAdd from "./questionAdd.js";

let points = 0;
let intervalVar;
let questNum = 1;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const dataArr = shuffle(data);


export default class Main {
    $mainContainer
    $mainQuestionsBox
    $mainQuestionsText

    $mainDuration

    $mainPointContainer
    $mainQuestionIndex
    $mainPoint

    $mainAns

    _points;
    _questNum;

    constructor() {
        this.$mainQuestionsBox = document.createElement("div");
        this.$mainQuestionsBox.setAttribute("class","flex flex-grow w-full text-8xl")
        this.$mainQuestionsBox.addEventListener("click",function() {
            document.getElementById("app").innerHTML = "";
            clearInterval(intervalVar);
            const gaga = new questionAdd()
            gaga.render(document.getElementById("app"));
        })

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
            console.log(timeNum);
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
                textBox.textContent = "GAME OVER";
                const dataObj = {
                    userId: "default",
                    username: "default",
                    points: points,
                    questNum: questNum
                }
                console.log("go",dataObj);
                clearInterval(intervalVar);
                const goModal = new gameOverModal(points);
                goModal.render(mainCon);
            }
            i++;
        },1000)
    }


    render(container) {
        const flag = false;
        let ansArr = ["A","B","C","D"];

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
        

        if(questNum-1 === dataArr.length) {
            const dataObj = {
                userId: "default",
                username: "default",
                points: points,
                questNum: questNum
            }
            console.log("hahahaha",dataObj);
            document.getElementById("app").innerHTML = "";
            const gb = new gameBeaten(questNum,points);
            gb.render(document.getElementById("app"));
        }
        else {
            this.$mainQuestionsText.textContent = dataArr[questNum-1].textQuestion;
            for(let i = 0; i < 4; i++) {
                let newAnswer = new answerBox((ansArr[i]),dataArr[questNum-1].ans[i].content,dataArr[questNum-1].ans[i].flag);
                newAnswer.$boxContainer.addEventListener("click", function(event) {
                    if(event.currentTarget.classList.contains("true")) {
                        clearInterval(intervalVar);
                        points = points + 10;
                        questNum++;
                        document.getElementById("app").innerHTML = "";
                        let newMain = new Main();
                        newMain.render(document.getElementById("app"));
                    }
                    else {
                        clearInterval(intervalVar);
                        const dataObj = {
                            userId: "default",
                            username: "default",
                            points: points,
                            questNum: questNum
                        }
                        console.log("goWrong",dataObj);
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
}


const newMain = new Main();
newMain.render(document.getElementById("app"));
