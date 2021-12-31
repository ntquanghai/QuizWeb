import Register from "./register.js";
import Login from "./login.js";

const appRegister = new Register();

const appLogin = new Login();


class App {
    screen;

    constructor(container) {
        this.screen = container;
        
    }

    setActiveScreen(component) {
        if(this.screen !== undefined){
            this.screen.innerHTML = "";
        }
        component.render(this.screen);
    }
}

const appDisplay = document.getElementById("app");
const app = new App(appDisplay);
app.setActiveScreen(new Register);

export default app;

