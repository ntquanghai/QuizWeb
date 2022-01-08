import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
// import { auth, messagesRef } from "../constants/index.js";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import header from "./header.js";
import answerBoxAdd from "./answerBoxAdd.js";

let fileUrl;

const storage = getStorage();
const db = getFirestore();
const questionData = collection(db, "questionData");
export default class questionAddDetail {
  $qadMainContainer;
  $qadContainer;

  $qadDesc;

  $qadContentContainer;

  $qadTextMainContainer;

  $qadText;

  $qadTextCharContainer;
  $qadTextCharCurr;
  $qadTextCharMax;

  $qadImg;

  $qadImgButtonContainer;
  $qadImgButton;

  $qadAns0;
  $qadAns1;
  $qadAns2;
  $qadAns3;

  $qadAnsContainer;

  $qadDescAns;

  $qadButtonContainer;

  $qadToImgButton;
  $submitButton;

  _textOrImg;
  _fileUrl;

  constructor(textOrImg) {
    this.$qadMainContainer = document.createElement("div");

    this.$qadContainer = document.createElement("div");

    this.$qadDesc = document.createElement("div");
    this.$qadDesc.textContent = "ADD QUESTIONS.";
    this.$qadDesc.setAttribute(
      "class",
      "text-center text-6xl font-bold mx-4 mt-4 mb-4"
    );

    this.$qadContentContainer = document.createElement("div");
    this.$qadContentContainer.setAttribute("class", "flex py-4");

    this.$qadTextMainContainer = document.createElement("div");
    this.$qadTextMainContainer.setAttribute(
      "class",
      "flex-col border-2 flex h-40 justify-around p-4 ml-4 my-auto bg-white w-2/3"
    );

    this.$qadTextContainer = document.createElement("div");
    this.$qadTextContainer.setAttribute("class", "text-2xl");

    this.$qadText = document.createElement("textarea");
    this.$qadText.setAttribute("class", "focus:outline-none w-full bg-white");
    this.$qadText.id = "qadText";
    this.$qadText.placeholder = "Enter your question here.";
    this.$qadText.style.resize = "none";
    this.$qadText.style.overflow = "hidden";
    this.$qadText.addEventListener("keyup", this.liveCharCount);
    this.$qadText.maxLength = "100";

    this.$qadTextCharContainer = document.createElement("div");
    this.$qadTextCharContainer.setAttribute(
      "class",
      "ml-auto flex flex-end text-gray-400"
    );

    this.$qadTextCharMax = document.createElement("div");
    this.$qadTextCharCurr = document.createElement("div");
    this.$qadTextCharCurr.textContent = "0";
    this.$qadTextCharMax.textContent = "/100";

    this.$qadImg = document.createElement("img");
    this.$qadImg.setAttribute("class", "border-2 p-4 text-2xl bg-white");
    this.$qadImg.id = "qadImg";
    this.$qadImg.style.height = "480px";
    this.$qadImg.style.width = "600px";

    this.$qadImgButtonContainer = document.createElement("div");

    this.$qadImgButton = document.createElement("input");
    this.$qadImgButton.type = "file";
    this.$qadImgButton.id = "myFile";
    this.$qadImgButton.setAttribute("class", "mt-4 inline-block mb-4");
    this.$qadImgButton.addEventListener("change", this.onChangeUpload);

    this.$qadDescAns = document.createElement("div");
    this.$qadDescAns.textContent = "Enter your answers here.";
    this.$qadDescAns.setAttribute("class", "text-2xl mt-4");

    this.$qadAnsContainer = document.createElement("div");
    this.$qadAnsContainer.setAttribute("class", "flex");

    this.$qadAns0 = new answerBoxAdd("A", "q0");
    this.$qadAns1 = new answerBoxAdd("B", "q1");
    this.$qadAns2 = new answerBoxAdd("C", "q2");
    this.$qadAns3 = new answerBoxAdd("D", "q3");

    this.$qadButtonContainer = document.createElement("div");
    this.$qadButtonContainer.setAttribute("class", "flex justify-between");

    this.$qadToImgButton = document.createElement("button");
    this.$qadToImgButton.setAttribute("class", "bg-yellow-300 p-2 m-2 hover:bg-yellow-400");
    this.$qadToImgButton.textContent = "Image question";

    this.$submitButton = document.createElement("button");
    this.$submitButton.setAttribute("class", "bg-yellow-300 p-2 m-2 hover:bg-yellow-400");
    this.$submitButton.textContent = "Submit";



    this._textOrImg = textOrImg;
  }

  toImgPage = () => {
    document.getElementById("app").innerHTML = "";
    const imgPage = new questionAddDetail("img");
    imgPage.render(document.getElementById("app"));
  };

  toTextPage = () => {
    document.getElementById("app").innerHTML = "";
    const textPage = new questionAddDetail("text");
    textPage.render(document.getElementById("app"));
  };

  liveCharCount = (e) => {
    this.$qadTextCharCurr.textContent = this.$qadText.value.length;
  };

  handleSubmitText = (e) => {
    e.preventDefault();

    const validated = this.conditionUpload();
    alert("Data submitted.")
    document.getElementById("qadText").value = "";
    this.$qadAns0.clearValue();
    this.$qadAns1.clearValue();
    this.$qadAns2.clearValue();
    this.$qadAns3.clearValue();
    for(let i = 0; i < 4; i++) {
      document.getElementById("q"+i).children[0].children[2].children[0].setAttribute("class","text-center hidden");
    }

    if (validated !== null) {
      addDoc(questionData, validated);
    }
  };

  handleSubmitImg = (e) => {
    e.preventDefault();

    const validated = this.conditionUpload();
    alert("Data submitted.")
    document.getElementById("qadImg").src = "../img/screen-1.jpg";
    document.getElementById("qadText").value = "";
    this.$qadAns0.clearValue();
    this.$qadAns1.clearValue();
    this.$qadAns2.clearValue();
    this.$qadAns3.clearValue();
    for(let i = 0; i < 4; i++) {
      document.getElementById("q"+i).children[0].children[2].children[0].setAttribute("class","text-center hidden");
    }

    if (validated !== null) {
      addDoc(questionData, validated);
    }
  }

  elLength(element) {
    return element.replace(/\s/g, "").length;
  }

  conditionUpload() {
    const qadImg = document.getElementById("qadImg");
    const qadText = document.getElementById("qadText");
    const q0 = this.$qadAns0.returnValue();
    const q1 = this.$qadAns1.returnValue();
    const q2 = this.$qadAns2.returnValue();
    const q3 = this.$qadAns3.returnValue();

    let imgQuestion = fileUrl;

    let flag = true;

    if(this._textOrImg === "text") {
      imgQuestion = "";
        if (
            this.elLength(qadText.value) === 0 ||
            this.elLength(q0).length === 0 ||
            this.elLength(q1).length === 0 ||
            this.elLength(q2).length === 0 ||
            this.elLength(q3).length === 0 ||
            (
              (!(document.getElementById("q0").classList.contains("false"))) && 
              (!(document.getElementById("q1").classList.contains("false"))) &&
              (!(document.getElementById("q2").classList.contains("false"))) &&
              (!(document.getElementById("q3").classList.contains("false")))
            )
          ) {
            alert("Invalid submission. Missing inputs.");
            flag = false;
          } else if (qadText.value.length < 10) {
            alert(
              "Invalid submission. Your question must have at least 10 characters, and at most 100 characters."
            );
          }
    }

    else if(this._textOrImg === "img") {
        if (
            this.elLength(qadImg.src) === 0 ||
            this.elLength(qadText.value) === 0 ||
            this.elLength(q0).length === 0 ||
            this.elLength(q1).length === 0 ||
            this.elLength(q2).length === 0 ||
            this.elLength(q3).length === 0 ||
            (
              (!(document.getElementById("q0").classList.contains("false"))) && 
              (!(document.getElementById("q1").classList.contains("false"))) &&
              (!(document.getElementById("q2").classList.contains("false"))) &&
              (!(document.getElementById("q3").classList.contains("false")))
            )
          ) {
            alert("Invalid submission. Missing inputs.");
            flag = false;
          } else if (qadText.value.length < 10) {
            alert(
              "Invalid submission. Your question must have at least 10 characters, and at most 100 characters."
            );
          }
    }
    const textQuestion = document.getElementById("qadText").value;
    const ansObj0 = {
      content: q0,
      flag: document.getElementById("q0").classList.contains(true),
    };
    const ansObj1 = {
      content: q1,
      flag: document.getElementById("q1").classList.contains(true),
    };
    const ansObj2 = {
      content: q2,
      flag: document.getElementById("q2").classList.contains(true),
    };
    const ansObj3 = {
      content: q3,
      flag: document.getElementById("q3").classList.contains(true),
    };
    const ans = [ansObj0, ansObj1, ansObj2, ansObj3];

    const questionObj = {
      imgQuestion: imgQuestion,
      textQuestion: textQuestion,
      ans: ans,
    };
    

    if (flag === true) {
      return questionObj;
    } else {
      console.log("failure");
      return null;
    }
  }

  onChangeUpload = (e) => {
    const file = e.target.files[0];
    this._fileType = file.type;
    const imageRef = ref(storage, file.name);

    if (this.conditionUpload !== null) {
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("error upload", error);
          alert("Tai file le that bai");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            fileUrl = url;
          });
        }
      );
    }
  };

  render(container) {
    if (this._textOrImg === "text") {
      const newHeader = new header();
      newHeader.render(document.getElementById("app"));
      this.$qadContainer.setAttribute(
        "class",
        "flex flex-col p-20 m-auto fixed border-2 border-black bg-yellow-50 rounded"
      );
      this.$qadContainer.style.top = "50%";
      this.$qadContainer.style.left = "50%";
      this.$qadContainer.style.transform = "translate(-50%, -50%)";
      this.$qadContainer.appendChild(this.$qadDesc);

      this.$qadTextCharContainer.appendChild(this.$qadTextCharCurr);
      this.$qadTextCharContainer.appendChild(this.$qadTextCharMax);
      this.$qadTextContainer.appendChild(this.$qadText);
      this.$qadTextMainContainer.appendChild(this.$qadTextContainer);
      this.$qadTextMainContainer.appendChild(this.$qadTextCharContainer);

      this.$qadTextMainContainer.setAttribute(
        "class",
        "flex-col border-2 flex h-40 justify-around p-4 flex-grow my-auto bg-white"
      );

      this.$qadContentContainer.appendChild(this.$qadTextMainContainer);
      this.$qadContainer.appendChild(this.$qadContentContainer);
      this.$qadContainer.appendChild(this.$qadDescAns);
      this.$qadAns0.render(this.$qadAnsContainer);
      this.$qadAns1.render(this.$qadAnsContainer);
      this.$qadAns2.render(this.$qadAnsContainer);
      this.$qadAns3.render(this.$qadAnsContainer);

      this.$qadButtonContainer.appendChild(this.$qadToImgButton);
      this.$qadButtonContainer.appendChild(this.$submitButton);

      this.$qadContainer.appendChild(this.$qadAnsContainer);

      this.$qadContainer.appendChild(this.$qadButtonContainer);

      this.$qadMainContainer.appendChild(this.$qadContainer);

      this.$qadMainContainer.setAttribute("class", "");
      container.appendChild(this.$qadMainContainer);

      this.$qadToImgButton.addEventListener("click", this.toImgPage);
      this.$submitButton.addEventListener("click", this.handleSubmitText);

    } else if (this._textOrImg === "img") {
      const newHeader = new header();
      newHeader.render(document.getElementById("app"));
      this.$qadMainContainer.appendChild(this.$qadContainer);
      this.$qadMainContainer.setAttribute("class", "absolute bg-yellow-50 w-5/6 border-2 border-black");
      this.$qadMainContainer.style.top = "54%";
      this.$qadMainContainer.style.left = "50%";
      this.$qadMainContainer.style.transform = "translate(-50%, -50%)";
      this.$qadMainContainer.height = "90%";

      this.$qadContainer.setAttribute("class", "flex flex-col h-5/6 p-4");

      this.$qadContentContainer.appendChild(this.$qadImg);

      this.$qadTextCharContainer.appendChild(this.$qadTextCharCurr);
      this.$qadTextCharContainer.appendChild(this.$qadTextCharMax);
      this.$qadTextContainer.appendChild(this.$qadText);
      this.$qadTextMainContainer.appendChild(this.$qadTextContainer);
      this.$qadTextMainContainer.appendChild(this.$qadTextCharContainer);

      this.$qadContentContainer.appendChild(this.$qadTextMainContainer);
      this.$qadContainer.appendChild(this.$qadDesc);
      this.$qadContainer.appendChild(this.$qadContentContainer);

      this.$qadImgButtonContainer.appendChild(this.$qadImgButton)
      this.$qadContainer.appendChild(this.$qadImgButtonContainer);

      this.$qadContainer.appendChild(this.$qadDescAns);
      this.$qadAns0.render(this.$qadAnsContainer);
      this.$qadAns1.render(this.$qadAnsContainer);
      this.$qadAns2.render(this.$qadAnsContainer);
      this.$qadAns3.render(this.$qadAnsContainer);

      this.$qadToImgButton.textContent = "Text question";
      this.$qadToImgButton.addEventListener("click", this.toTextPage);

      this.$qadButtonContainer.appendChild(this.$qadToImgButton);
      this.$qadButtonContainer.appendChild(this.$submitButton);

      this.$qadContainer.appendChild(this.$qadAnsContainer);

      this.$qadContainer.appendChild(this.$qadButtonContainer);
      container.appendChild(this.$qadMainContainer);

      document.getElementById("myFile").addEventListener("change", function () {
        let reader;
        if (this.files && this.files[0]) {
          reader = new FileReader();

          reader.onload = function (e) {
            console.log("haha");
            document
              .getElementById("qadImg")
              .setAttribute("src", e.target.result);
          };
          reader.readAsDataURL(document.getElementById("myFile").files[0]);
        }
      });

      this.$submitButton.addEventListener("click", this.handleSubmitImg);
    }
  }
}
