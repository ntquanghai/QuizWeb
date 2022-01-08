import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import HomePage from "./homePage.js";
import { auth } from "./outerImports.js";

export default class codeModal {
  $CMModalContainer;
  $CMModalackgroundOverlay;

  $CMModalTextbox;
  $CMModalText;
  $CMModalInput;

  $CMModalButtonContainer;
  $CMModalCancel;
  $CMModalSubmit;

  constructor() {
    this.$CMModalackgroundOverlay = document.createElement("div");
    this.$CMModalackgroundOverlay.id = "codeModal";
    this.$CMModalackgroundOverlay.setAttribute(
      "class",
      "w-screen h-screen fixed top-1/2 left-1/2 z-20"
    );
    this.$CMModalackgroundOverlay.style.backgroundColor = "rgba(0,0,0,0.2)";
    this.$CMModalackgroundOverlay.style.transform = "translate(-50%, -50%)";

    this.$CMModalContainer = document.createElement("div");
    this.$CMModalContainer.setAttribute(
      "class",
      "fixed top-1/2 left-1/2 rounded- bg-white p-4 border-2 border-black"
    );
    this.$CMModalContainer.style.transform = "translate(-50%, -50%)";

    this.$CMModalTextbox = document.createElement("div");
    this.$CMModalTextbox.textContent = "Enter your invitation code here.";
    this.$CMModalTextbox.setAttribute(
      "class",
      "text-2xl font-bold text-center p-2"
    );

    this.$CMModalInput = document.createElement("input");
    this.$CMModalInput.id = "inputCode"
    this.$CMModalInput.setAttribute(
      "class",
      "w-full px-2 py-1 outline-none border-2 border-black"
    );
    this.$CMModalInput.maxLength = "8";

    this.$CMModalButtonContainer = document.createElement("div");
    this.$CMModalButtonContainer.setAttribute(
      "class",
      "flex justify-between py-2"
    );

    this.$CMModalCancel = document.createElement("button");
    this.$CMModalCancel.setAttribute(
      "class",
      "py-1 px-4 bg-yellow-300 border-2 border-black hover:bg-yellow-400"
    );
    this.$CMModalCancel.textContent = "Cancel";
    this.$CMModalCancel.addEventListener("click", function () {
      document.getElementById("codeModal").remove();
    });

    this.$CMModalSubmit = document.createElement("button");
    this.$CMModalSubmit.setAttribute(
      "class",
      "py-1 px-4 bg-yellow-300 border-2 border-black hover:bg-yellow-400"
    );
    this.$CMModalSubmit.textContent = "Submit";
    this.$CMModalSubmit.addEventListener("click", async function () {
      let dataArr = [];
      const db = getFirestore();
      const questionData = collection(db, "editorCode");
      const getDoc = getDocs(questionData);
      getDoc.then((data) => {
        let dataArrTemp = [];
        data.docs.forEach((doc) => {
          dataArrTemp.push({ ...doc.data(), id: doc.id });
        });
        dataArr = dataArrTemp[0].editCode;
      });
      await getDoc;
      if(dataArr.includes(document.getElementById("inputCode").value)) {
        alert("Welcome editor! (Reload page if the feature has not appeared)");

        const editorList = collection(db,"editorList");
        const infoObj = {
            userId: auth.currentUser.uid,
            email: auth.currentUser.email,
            username: auth.currentUser.displayName,
            editor: true,
        }
        await addDoc(editorList,infoObj);
        location.reload();
        document.getElementById("codeModal").remove();
      }
      else {
        alert("Invalid code");
        document.getElementById("codeModal").remove();
      }
    });
  }

  render(container) {
    this.$CMModalContainer.appendChild(this.$CMModalTextbox);
    this.$CMModalContainer.appendChild(this.$CMModalInput);

    this.$CMModalButtonContainer.appendChild(this.$CMModalCancel);
    this.$CMModalButtonContainer.appendChild(this.$CMModalSubmit);
    this.$CMModalContainer.appendChild(this.$CMModalButtonContainer);
    this.$CMModalackgroundOverlay.appendChild(this.$CMModalContainer);

    container.appendChild(this.$CMModalackgroundOverlay);
  }
}
