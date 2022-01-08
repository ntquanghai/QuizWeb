import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { auth } from "../components/outerImports.js";
import InputType from "./input.js";
import Register from "./register.js";
import app from "./app.js";


class Login {

    //containerLogin
    $containerLogin;
    //header
    $header;
    $logoEl;
    $forgotPassword;
  
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
    $switch;
    constructor() {

        this.$containerLogin = document.createElement("div");
        this.$containerLogin.setAttribute(
        "class", 
        "w-screen relative h-screen"
        )

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
        "absolute w-1/3 bg-yellow-100 py-6 px-12 -mt-2 rounded-lg border-2 border-black "
        );
        this.$formLogin.style.top = "50%";
        this.$formLogin.style.left = "50%";
        this.$formLogin.style.transform = "translate(-50%,-50%)";

        this.$contentLoginEl = document.createElement("p");
        this.$contentLoginEl.textContent ="Sign in to Quizzy";
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
        this.$submit.textContent = "login";
        this.$submit.setAttribute(
        "class",
        "py-2 px-20 mx-auto border-solid bg-yellow-300 text-white text-2xl")
        this.$submit.addEventListener("click",this.handleLogin);

        this.$switch = document.createElement("button");
        this.$switch.type = "button";
        this.$switch.textContent = "go register";
        this.$switch.addEventListener("click", this.switchRegister);
        this.$switch.setAttribute(
        "class",
        "px-4 py-2 ml-72 -mt-16 rounded-lg bg-blue-600 text-white ring ring-blue-400 ring-offset-4 ring-offset-blue-300 ring-offset-blue-30 transform hover:scale-110 motion-reduce:transform-none font-black uppercase"
        );
        
        this.$forgotPassword = document.createElement("div");
        this.$forgotPassword.textContent = "forgot password ?";
        this.$forgotPassword.setAttribute(
            "class",
            "relative absolution top-8 text-black font-black text-sm italic underline uppercase")

    }

    handleLogin = (e) => {
        e.preventDefault();
    
        const email = this.$email.getValue();
        const password = this.$password.getValue();
    
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            
          })
          .catch((error) => {
            console.log("Failure to log in");
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
        this.$formLogin.appendChild(this.$forgotPassword);
        this.$formLogin.appendChild(this.$switch);


        // this.$containerLogin.appendChild(this.$header);
        this.$containerLogin.appendChild(this.$formLogin);

        return container.appendChild(this.$containerLogin);
    }
}

export default Login;