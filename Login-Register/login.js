import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { auth } from "../components/outerImports.js";
import InputType from "./input.js";
import Register from "./register.js";
import app from "./app.js"

class Login {
    //formLogin
    $formLogin;
    $contentLoginEl;
    $email;
    $password;
    //btnSwitch
    $submit;
    $switch;
    // btnConnect
    $viaFb;
    $viaGoogle;

    constructor() {

        this.$contentLoginEl = document.createElement("div")
        this.$formLogin = document.createElement("form");
        this.$formLogin.setAttribute("class"," relative absolute top-20 w-1/3 bg-gray-400 py-6 m-auto  px-12 rounded-lg border-solid border-4 border-gray-500")

        this.$contentLoginEl = document.createElement("p");
        this.$contentLoginEl.textContent ="Hello wold";
        this.$contentLoginEl.setAttribute("class"," animate-bounce sticky pb-5 text-4xl font-black text-yellow-300 uppercase text-center ")
        
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

        this.$viaFb = document.createElement("button");
        this.$viaFb.type = "button";
        this.$viaFb.textContent = "via facebook";
        this.$viaFb.setAttribute("class"," absolute -top-8 -right-16 px-4 py-2 bg-blue-400 font-bold text-white uppercase transform hover:scale-110 motion-reduce:transform-none rounded")

        this.$viaGoogle = document.createElement("button");
        this.$viaGoogle.type = "button";
        this.$viaGoogle.textContent = "via google";
        this.$viaGoogle.setAttribute("class","absolute top-6 -right-8 px-4 py-2 uppercase text-white bg-blue-400 font-bold transform hover:scale-110 motion-reduce:transform-none rounded")
        

        
        this.$submit = document.createElement("button");
        this.$submit.type = "button";
        this.$submit.textContent = "login";
        this.$submit.setAttribute("class"," py-2 px-20 bg-white m-auto mb-10 border-solid border-4 border-blue-500 hover:bg-blue-500 rounded-lg uppercase font-black")
        this.$submit.addEventListener("click",this.handleLogin);

        this.$switch = document.createElement("button");
        this.$switch.type = "button";
        this.$switch.textContent = "go register";
        this.$switch.addEventListener("click", this.switchRegister);
        this.$switch.setAttribute("class"," flex absolute right-4 py-2 px-4 border-solid border-4 border-blue-400 rounded-lg uppercase bg-indigo-600 text-white transform hover:scale-110 motion-reduce:transform-none  font-black");
        
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
        this.$formLogin.appendChild(this.$contentLoginEl);
        this.$formLogin.appendChild(this.$email.render());
        this.$formLogin.appendChild(this.$password.render());
        this.$formLogin.appendChild(this.$submit);
        this.$formLogin.appendChild(this.$switch);
        this.$formLogin.appendChild(this.$viaFb);
        this.$formLogin.appendChild(this.$viaGoogle);

        
        

        return container.appendChild(this.$formLogin);
    }
}

export default Login;