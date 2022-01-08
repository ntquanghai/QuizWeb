import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { auth } from "../components/outerImports.js";
import InputType from "./input.js";
import app from "./app.js";
import Login from "./login.js";

class Register {
  //main
  $mainContainerRegister;

  //head
  $header;
  $logoEl;

  //form
  $containerRegister;
  $formRegister;
  $contentRegisterEl;
  $displayNameEl;
  $emailEl;
  $passwordEL;
  $confirmPasswordEl;

  $submit;

  $switchBox;
  $switchBoxTextContainer;
  $switchBoxText;
  $switch;

  constructor() {
    // main
    this.$mainContainerRegister = document.createElement("div");
    this.$mainContainerRegister.setAttribute(
    "class",
    "w-screen relative h-screen"
    );

    this.$containerRegister = document.createElement("div");
    this.$containerRegister.setAttribute("class","absolute w-1/3");
    this.$containerRegister.style.top = "50%";
    this.$containerRegister.style.left = "50%";
    this.$containerRegister.style.transform = "translate(-50%,-50%)";
    // header
    // this.$header = document.createElement("div");
    // this.$header.setAttribute("class",
    // "h-auto flex items-center relative");

    // this.$logoEl = document.createElement("div");
    // this.$logoEl.textContent = "fly to the moon";
    // this.$logoEl.setAttribute(
    // "class",
    // "w-auto h-auto ml-20 text-white mt-8 flex items-center text-6xl font-extrabold uppercase"
    // );

    //formRegister
    this.$formRegister = document.createElement("form");
    this.$formRegister.setAttribute(
    "class",
    "bg-yellow-100 py-6 px-12 rounded-lg border-2 border-black flex flex-col"
    );

    this.$contentRegisterEl = document.createElement("p");
    this.$contentRegisterEl.textContent = "JOIN QUIZZY";
    this.$contentRegisterEl.setAttribute(
    "class",
    "sticky pb-5 text-5xl text-yellow-300 font-black text-center "
    );

    this.$displayNameEl = new InputType(
      "Username",
      "text",
      "Enter your full name"
    );

    this.$emailEl = new InputType("Email", "email", "Enter your email");

    this.$passwordEL = new InputType(
      "Password",
      "password",
      "Enter your password"
    );

    this.$confirmPasswordEl = new InputType(
      "Confirm Password",
      "password",
      "Confirm your password"
    );

    this.$submit = document.createElement("button");
    this.$submit.type = "button";
    this.$submit.textContent = "Register";
    this.$submit.setAttribute(
    "class",
    "py-2 px-20 mx-auto border-solid bg-yellow-300 text-white text-2xl"
    );
    this.$submit.addEventListener("click", this.handleSubmit);
    
    // this.$switch.textContent = "go login";
    // this.$switch.addEventListener("click", this.switchLogin);
    // this.$switch.setAttribute(
    // "class",
    // " relative absolute -right-72 py-2 px-4 mt-4 border-solid bg-blue-600 text-white ring ring-blue-400 ring-offset-4 ring-offset-blue-300 ring-offset-blue-30 transform hover:scale-110 motion-reduce:transform-none rounded-lg uppercase font-black"
    // );
    this.$switchBox = document.createElement("div");
    this.$switchBox.setAttribute("class","p-8 bg-yellow-100 mt-4 rounded border-2 border-black flex text-xl");
    
    this.$switchBoxTextContainer = document.createElement("div");
    this.$switchBoxTextContainer.setAttribute("class","flex mx-auto")

    this.$switchBoxText = document.createElement("div");
    this.$switchBoxText.textContent = "Already got an account?"

    this.$switch = document.createElement("button");
    this.$switch.type = "button";
    this.$switch.textContent = "Click here!";
    this.$switch.addEventListener("click", this.switchLogin);
    this.$switch.setAttribute("class","font-bold ml-1 hover:text-yellow-300")
  }

  switchLogin = () => {
    const appLogin = new Login();
    app.setActiveScreen(new Login());
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const validated = this.validation();

    if (validated !== null) {
        console.log("successful");
      createUserWithEmailAndPassword(auth, validated.email, validated.password)
        .then((user) => {
          console.log(user.user);
          updateProfile(auth.currentUser, {
            displayName: validated.displayName,
          });
          sendEmailVerification(auth.currentUser);
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
    else {
        console.log("failure")
    }
  };

  validation() {
    let flag  = true;
    let regexDisplayName =
      /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const displayName = this.$displayNameEl.getValue();
    const email = this.$emailEl.getValue();
    const password = this.$passwordEL.getValue();
    const confirmPassword = this.$confirmPasswordEl.getValue();

    const checkedDisplayName = this.checkingType(displayName, regexDisplayName);
    const checkedEmail = this.checkingType(email, regexEmail);
    const checkedPassword = this.checkingType(password, regexPassword);

    if (!checkedDisplayName) {
      this.$displayNameEl.errorValue("DisplayName is 8-20 characters long, no _ or .");
      flag = false;
    }
    if (!checkedEmail) {
      this.$emailEl.errorValue("Email is not available");
      flag = false;
    }
    if (!checkedPassword) {
      this.$passwordEL.errorValue("Minimum eight characters, at least one letter, one number and one special character");
      flag = false;
    }
    if (confirmPassword == "") {
      this.confirmPassword.errorValue("Password is not available")
      flag = false;
    }
    if (confirmPassword !== password) {
      this.$confirmPasswordEl.errorValue(
        "Password and confirm password does not match"
      );
      flag = false;
    }
    if (flag === true) {
        return {
          displayName: displayName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        };
      }
      return null;
  }

  checkingType(input, regex) {
    return input.match(regex);
  }

  render(container) {
    // this.$header.appendChild(this.$logoEl);

    this.$formRegister.appendChild(this.$contentRegisterEl);
    this.$formRegister.appendChild(this.$displayNameEl.render());
    this.$formRegister.appendChild(this.$emailEl.render());
    this.$formRegister.appendChild(this.$passwordEL.render());
    this.$formRegister.appendChild(this.$confirmPasswordEl.render());
    this.$formRegister.appendChild(this.$submit);

    this.$containerRegister.appendChild(this.$formRegister);

    this.$switchBoxTextContainer.appendChild(this.$switchBoxText);
    this.$switchBoxTextContainer.appendChild(this.$switch);
    this.$switchBox.appendChild(this.$switchBoxTextContainer);
    this.$containerRegister.appendChild(this.$switchBox);
    this.$mainContainerRegister.appendChild(this.$containerRegister);
    // this.$mainContainerRegister.appendChild(this.$header);

    return container.appendChild(this.$mainContainerRegister);
  }
}

export default Register;
