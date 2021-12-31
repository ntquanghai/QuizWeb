import InputType from "./input.js";
import app from "./app.js";
import Login from "./login.js";



class Register {
    //main
    $containerMain;
    
    //head
    $header;
    $logoEl;
    $ulEl;
    $liAboutUs;
    $liContactSupport;

    //form
    $formRegister;
    $contentRegisterEl;
    $displayNameEl;
    $emailEl;
    $passwordEL;
    $confirmPasswordEl;
    $submit;
    $switch;

    constructor() {
        // main
        this.$containerMain = document.createElement("div");
        this.$containerMain.setAttribute("class", " w-screen  bg-gradient-to-r from-green-400 to-blue-500")

        // header
        this.$header = document.createElement("div");
        this.$header.setAttribute("class","h-auto flex relative items-center")
        
        this.$logoEl = document.createElement("div");
        this.$logoEl.textContent = "come with me";
        this.$logoEl.setAttribute("class","animate-bounce w-auto h-auto ml-20 text-white mt-10 text-6xl font-extrabold uppercase self-center")

        this.$ulEl = document.createElement("ul");
        this.$ulEl.setAttribute("class", "flex absolute right-20 mt-10")
        
        this.$liContactSupport = document.createElement("li");
        this.$liContactSupport.textContent = "need to support";
        this.$liContactSupport.setAttribute("class","transform hover:scale-110 motion-reduce:transform-none m-4 mr-36 p-2 bg-green-400 text-white ring ring-green-400 ring-offset-4 ring-offset-green-300 rounded-full uppercase")

        this.$liAboutUs = document.createElement("li");
        this.$liAboutUs.textContent = "about us";
        this.$liAboutUs.setAttribute("class", "transform hover:scale-110 motion-reduce:transform-none m-2 p-2 bg-green-400 text-white ring ring-green-400 ring-offset-4 ring-offset-green-300 uppercase self-center rounded-full")

        //formRegister
        this.$formRegister = document.createElement("form");
        this.$formRegister.setAttribute("class","relative w-1/3 m-auto bg-green-100 py-5 px-12 rounded-lg border-solid border-4 border-green-500")

        this.$contentRegisterEl = document.createElement("p");
        this.$contentRegisterEl.textContent = "Join With Us";
        this.$contentRegisterEl.setAttribute("class","sticky pb-5 text-xl font-black uppercase text-center ")

        this.$displayNameEl = new InputType(
            "DisplayName",
            "text",
            "Enter your full name",
        );

        this.$emailEl = new InputType(
            "Email",
            "email",
            "Enter your email",
        );

        this.$passwordEL = new InputType(
            "Password",
            "password",
            "Enter your password",
        );

        this.$confirmPasswordEl = new InputType(
            "Confirm Password",
            "password",
            "Confirm your password",
        );

        this.$submit = document.createElement("button");
        this.$submit.type = "button";
        this.$submit.textContent = "Register";
        this.$submit.setAttribute("class"," py-2 px-4 mb-6 border-solid border-4 border-blue-500 rounded uppercase font-black text-white bg-green-400 hover:bg-indigo-500 ");
        this.$submit.addEventListener("click",this.handleSubmit);

        
        this.$switch = document.createElement("button");
        this.$switch.type = "button";
        this.$switch.textContent = "go to login";
        this.$switch.addEventListener("click", this.switchLogin);
        this.$switch.setAttribute("class"," flex absolute right-4 py-2 px-4 border-solid border-4 border-blue-400 rounded-lg uppercase bg-indigo-600 text-white transform hover:scale-110 motion-reduce:transform-none  font-black")
                            
    };

    switchLogin = () =>{
        const appLogin = new Login;
        app.setActiveScreen(new Login)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const validated = this.validation();
        

    };
    
    validation() {  

        let regexDisplayName = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        const displayName = this.$displayNameEl.getValue();
        const email = this.$emailEl.getValue();
        const password = this.$passwordEL.getValue();
        const confirmPassword = this.$confirmPasswordEl.getValue();

        const checkedDisplayName = this.checkingType(displayName, regexDisplayName);
        const checkedEmail = this.checkingType(email, regexEmail);
        const checkedPassword = this.checkingType(password, regexPassword);
        
        
        if(!checkedDisplayName) {
            this.$displayNameEl.errorValue("DisplayName is not available");
        }
        if(!checkedEmail) {
            this.$emailEl.errorValue("Email is not available")
        }
        if(!checkedPassword) {
            this.$passwordEL.errorValue("Password is not available")
        }
        if(confirmPassword !== password) {
            this.$confirmPasswordEl.errorValue("Password and confirm password does not match")
        }
    }

    checkingType(input, regex) {
        return input.match(regex)
    }

    render(container) {

        this.$ulEl.appendChild(this.$liContactSupport);
        this.$ulEl.appendChild(this.$liAboutUs);
        this.$header.appendChild(this.$ulEl);
        this.$header.appendChild(this.$logoEl);


        this.$formRegister.appendChild(this.$contentRegisterEl);
        this.$formRegister.appendChild(this.$displayNameEl.render());
        this.$formRegister.appendChild(this.$emailEl.render());
        this.$formRegister.appendChild(this.$passwordEL.render());
        this.$formRegister.appendChild(this.$confirmPasswordEl.render());
        this.$formRegister.appendChild(this.$submit);
        this.$formRegister.appendChild(this.$switch);

        this.$containerMain.appendChild(this.$header);
        this.$containerMain.appendChild(this.$formRegister);

         return container.appendChild(this.$containerMain);
        
        
    }
}

export default Register;
