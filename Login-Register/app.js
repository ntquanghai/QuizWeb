import Register from "./register.js";
import Login from "./login.js";
import Main from "../components/index.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { auth } from "../components/outerImports.js";

const appRegister = new Register();

const appLogin = new Login();

class App {
    screen;

    constructor(container) {
        this.screen = container;
        this.setupAuthenticationListener();
    }

    setupAuthenticationListener() {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const mainScreen = new Main();
            mainScreen.runGame();
            this.setActiveScreen(mainScreen);
          } else {
            const loginScreen = new Login();
            this.setActiveScreen(loginScreen);
          }
        });
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

