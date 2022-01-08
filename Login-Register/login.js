import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { auth } from "../components/outerImports.js";
import InputType from "./input.js";
import Register from "./register.js";
import app from "./app.js";


class Login {

    //maincontainerLogin
    $maincontainerLogin;
    //header
    $header;
    $logoEl;
  
    //formLogin
    $containerLogin;
    $formLogin;
    $contentLoginEl;
    $email;
    $password;
    //img
    // $google;
    //btnSwitch
    $submit;

    $switchBox;
    $switchBoxTextContainer;
    $switchBoxText;
    $switch;
    constructor() {

        this.$maincontainerLogin = document.createElement("div");
        this.$maincontainerLogin.setAttribute(
        "class", 
        "w-screen relative h-screen"
        )

        this.$containerLogin = document.createElement("div");
        this.$containerLogin.setAttribute("class","absolute w-1/3");
        this.$containerLogin.style.top = "50%";
        this.$containerLogin.style.left = "50%";
        this.$containerLogin.style.transform = "translate(-50%,-50%)";
        // header
        // this.$header = document.createElement("div");
        // this.$header.setAttribute(
        // "class",
        // "h-auto flex items-center relative"
        // );

        // this.$logoEl = document.createElement("div");
        // this.$logoEl.textContent = "fly to the moon";
        // this.$logoEl.setAttribute(
        // "class",
        // "w-auto h-auto ml-20 text-white mt-8 flex items-center text-6xl font-extrabold uppercase"
        // );

        // this.$google = document.createElement("img");
        // this.$google.src ="google.png"


        this.$formLogin = document.createElement("form");
        this.$formLogin.setAttribute(
        "class",
        "bg-yellow-100 py-6 px-12 -mt-2 rounded-lg border-2 border-black flex flex-col"
        );


        this.$contentLoginEl = document.createElement("p");
        this.$contentLoginEl.textContent ="SIGN IN TO QUIZZY";
        this.$contentLoginEl.setAttribute(
        "class",
        " sticky pb-5 text-5xl font-black text-yellow-300 text-center"
        )

        this.$email = new InputType(
            "Email",
            "email",
            "Enter your email",
        );

        this.$password = new InputType(
            "Password",
            "password",
            "Enter your password",
        );
        
        this.$submit = document.createElement("button");
        this.$submit.type = "button";
        this.$submit.textContent = "Sign in";
        this.$submit.setAttribute(
        "class",
        "py-2 px-20 mx-auto border-solid bg-yellow-300 text-white text-2xl")
        this.$submit.addEventListener("click",this.handleLogin);

        this.$switchBox = document.createElement("div");
        this.$switchBox.setAttribute("class","p-8 bg-yellow-100 mt-4 rounded border-2 border-black flex text-xl");
        
        this.$switchBoxTextContainer = document.createElement("div");
        this.$switchBoxTextContainer.setAttribute("class","flex mx-auto")
        this.$switchBoxText = document.createElement("div");
        this.$switchBoxText.textContent = "Haven't got an account?"

        this.$switch = document.createElement("button");
        this.$switch.type = "button";
        this.$switch.textContent = "Click here!";
        this.$switch.addEventListener("click", this.switchRegister);
        this.$switch.setAttribute("class","font-bold ml-1 hover:text-yellow-300")
        // this.$switch.setAttribute(
        // "class",
        // "px-4 py-2 rounded-lg bg-blue-600 text-white ring ring-blue-400 ring-offset-4 ring-offset-blue-300 ring-offset-blue-30 transform hover:scale-110 motion-reduce:transform-none font-black uppercase"
        // );
    }

    handleLogin = (e) => {
        e.preventDefault();
    
        const email = this.$email.getValue();
        const password = this.$password.getValue();
    
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            
          })
          .catch((error) => {
            alert(error.message);
          });
      };

    switchRegister = () => {
        const registerScreen = new Register();
        app.setActiveScreen(new Register());
        
    }


    render(container){
        // this.$header.appendChild(this.$logoEl);
    
        this.$formLogin.appendChild(this.$contentLoginEl);
        this.$formLogin.appendChild(this.$email.render());
        this.$formLogin.appendChild(this.$password.render());
        this.$formLogin.appendChild(this.$submit);

        // this.$maincontainerLogin.appendChild(this.$header);
        this.$containerLogin.appendChild(this.$formLogin);

        this.$switchBoxTextContainer.appendChild(this.$switchBoxText);
        this.$switchBoxTextContainer.appendChild(this.$switch);
        this.$switchBox.appendChild(this.$switchBoxTextContainer);
        this.$containerLogin.appendChild(this.$switchBox);
        this.$maincontainerLogin.appendChild(this.$containerLogin);

        return container.appendChild(this.$maincontainerLogin);
    }
}

export default Login;