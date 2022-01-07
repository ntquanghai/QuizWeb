import answerBox from "./answerBox.js";
import gameOverModal from "./gameOverModal.js";
import gameBeaten from "./gameBeaten.js";
import questionAdd from "./questionAdd.js";

import { getFirestore, collection, doc, setDoc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";  
import { auth } from "./outerImports.js";

let points = 0;
let intervalVar;
let questNum = 1;
let dataArr =[];
let dateStart = new Date();
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

const db = getFirestore();
const questionData = collection(db, "questionData"); 
const userData = collection(db, "userData");
const getDoc = getDocs(questionData)
getDoc.then((data) => {
    let dataArrTemp = [];
    data.docs.forEach((doc) => {
        dataArrTemp.push({...doc.data(), id: doc.id })
    })
    dataArr = shuffle(dataArrTemp)
})
await getDoc


export default class Main {
    $mainContainer

    $mainQuestionsBox
    $mainQuestionsText

    $mainQuestionsImg

    $mainDuration

    $mainPointContainer
    $mainQuestionIndex
    $mainPoint

    $timerNum

    $mainAns

    _points;
    _questNum;

    constructor() {
        this.$mainContainer = document.createElement("div");
        this.$mainContainer.setAttribute("class","flex flex-col-reverse h-5/6 w-5/6 p-4 bg-white border-2 border-black m-auto");

        this.$mainQuestionsBox = document.createElement("div");
        this.$mainQuestionsBox.setAttribute("class","flex flex-grow w-full text-6xl")
        
        this.$mainQuestionsText = document.createElement("div");
        this.$mainQuestionsText.setAttribute("class","m-auto flex-grow text-center");

        this.$mainQuestionsImg = document.createElement("img");
        this.$mainQuestionsImg.setAttribute("class", "border-2 p-4 text-2xl bg-white");
        this.$mainQuestionsImg.id = "mqImg";
        this.$mainQuestionsImg.style.height = "480px";
        this.$mainQuestionsImg.style.width = "600px";

        this.$mainDuration = document.createElement("div");
        this.$mainDuration.setAttribute("class","flex border-black border-2");

        this.$mainPointContainer = document.createElement("div");
        this.$mainPointContainer.setAttribute("class","flex");

        this.$mainQuestionIndex = document.createElement("div");
        this.$mainQuestionIndex.textContent = "Question: " + questNum;
        this.$mainQuestionIndex.setAttribute("class","text-xl m-4");
        this.$mainQuestionIndex.addEventListener("click",function() {
            document.getElementById("app").innerHTML = "";
            clearInterval(intervalVar);
            const gaga = new questionAdd()
            gaga.render(document.getElementById("app"));
        })


        this.$mainPoint = document.createElement("div");
        this.$mainPoint.setAttribute("class","text-xl m-4")
        this.$mainPoint.textContent = "Points: " + points;

        this.$timerNum = document.createElement("div");
        this.$timerNum.setAttribute("class","my-auto flex-grow text-3xl font-bold text-center");

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
                    userId: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    points: points,
                    questNum: questNum,
                    dateStart: dateStart,
                    dateEnd: new Date(),
                }
                console.log("go",dataObj);
                addDoc(userData,dataObj);
                clearInterval(intervalVar);
                const goModal = new gameOverModal(points);
                goModal.render(mainCon);
            }
            i++;
        },1000)
    }

    runGame = async () => {
        const flag = false;
        let ansArr = ["A","B","C","D"];
        let i = 0; 
        

            const arr = [];
            for(let i = 0; i < 15; i++) {
                arr[i] = document.createElement("div");
                arr[i].style.width = "6.66666666666%";
                arr[i].setAttribute("class","bg-green-300 h-16")
                arr[i].id = i;
                this.$mainDuration.appendChild(arr[i]);
            }

            if(questNum-1 === dataArr.length) {
                sessionStorage.removeItem("Replay");
                document.getElementById("app").innerHTML = "";
                document.getElementById("app").setAttribute("class","");
                const dataObj = {
                    userId: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    points: points,
                    questNum: questNum,
                    dateStart: dateStart,
                    dateEnd: new Date(),
                }
                addDoc(userData,dataObj);
                console.log(dataObj);
                const gb = new gameBeaten(questNum,points);
                clearInterval(intervalVar);
                gb.render(document.getElementById("app"));
            }
            else {
                if((dataArr[questNum-1].imgQuestion.length != 0)) {
                    this.$mainQuestionsImg.src = dataArr[questNum-1].imgQuestion;
                    this.$mainQuestionsBox.appendChild(this.$mainQuestionsImg);
                    this.$mainQuestionsBox.appendChild(this.$mainQuestionsText);
                }
                else {
                    this.$mainQuestionsBox.appendChild(this.$mainQuestionsText);
                }
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
                            newMain.runGame();
                        }
                        else {
                            clearInterval(intervalVar);
                            const dataObj = {
                                userId: auth.currentUser.uid,
                                username: auth.currentUser.displayName,
                                email: auth.currentUser.email,
                                points: points,
                                questNum: questNum,
                                dateStart: dateStart,
                                dateEnd: new Date(),
                            }
                            addDoc(userData,dataObj);
                            console.log("goWrong",dataObj);
                            let newMain = new gameOverModal(points);
                            newMain.render(document.getElementById("app"));
                        }
                    })
                    newAnswer.render(this.$mainAns);
                }
                this.decrease(arr,15,this.$mainQuestionsText,this.$timerNum,this.$mainContainer);
            } 
    }

    render(container) {    
        document.getElementById("app").innerHTML = "";    
        document.getElementById("app").setAttribute("class","w-screen h-screen flex")
        this.$mainContainer.appendChild(this.$mainAns);
        this.$mainContainer.appendChild(this.$mainQuestionsBox);

        this.$mainPointContainer.appendChild(this.$mainQuestionIndex);
        this.$mainPointContainer.appendChild(this.$timerNum);
        this.$mainPointContainer.appendChild(this.$mainPoint);

        this.$mainContainer.appendChild(this.$mainPointContainer);
        this.$mainContainer.appendChild(this.$mainDuration);
        
        container.appendChild(this.$mainContainer);
    }
}


const newMain = new Main();
newMain.render(document.getElementById("app"));
