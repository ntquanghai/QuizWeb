class InputType {
    $containerEl;
    $labelEl;
    $inputEl;
    $errorValueEl;

    constructor(name, type, placeholder){
        this.$containerEl = document.createElement("div")
        this.$containerEl.setAttribute("class","flex flex-col mb-4")

        this.$labelEl = document.createElement("label");
        this.$labelEl.textContent = name;
        this.$labelEl.setAttribute("class","text-purple-600 text-xl font-bold mb-2 ")
        
        
        this.$inputEl = document.createElement("input");
        this.$inputEl.type = type;
        this.$inputEl.placeholder = placeholder;
        this.$inputEl.setAttribute("class","py-2 px-4 rounded font-size: italic placeholder-gray-300 bg-gray-200 focus:bg-white font-bold");

        this.$errorValue = document.createElement("p");
        this.$errorValue.textContent = "";
    }

    getValue() {
        return this.$inputEl.value;
    };

    errorValue(message) {
        if(message) {
        this.$errorValue.textContent = message;
        this.$errorValue.setAttribute("class", "text-red-500 font-size: italic text-sx mt-2");
        }
    };

    render() {
        this.$containerEl.appendChild(this.$labelEl);
        this.$containerEl.appendChild(this.$inputEl);
        this.$containerEl.appendChild(this.$errorValue);

        return this.$containerEl;
    };
}

export default InputType;