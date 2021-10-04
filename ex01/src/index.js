const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // creating main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Seting up main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard_keys");
        this.elements.keysContainer.appendChild(this._createKeys())

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key")

        // add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Use keyboard for elements with .keyboard-input
        document.querySelectorAll(".keyboard-input").forEach(element =>{
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                })
            })
        })
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "e", "t", "y", "u", "i", "o", "p", "enter",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "capslock",
            "z", "x", "c", "v", "b", "n", "m", "-", "_", "shift",
            "space", "ok"
        ]

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "capslock", "shift", "enter"].indexOf(key) !== -1;

            // adding atributes /classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = "Back Space";
                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    })
                    break;
                case "capslock":
                    keyElement.classList.add("keyboard_key-justwide");
                    keyElement.innerHTML = "Caps Lock";
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard_key-active", this.properties.capsLock);
                    })
                    break;
                case "space":
                    keyElement.classList.add("keyboard_key-extra-wide");
                    keyElement.innerHTML = "Space";
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " "
                        this._triggerEvent("oninput");
                    })
                    break;
                case "enter":
                    keyElement.classList.add("keyboard_key-wide");
                    keyElement.innerHTML = "enter";
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    })
                    break;
                    case "shift":
                        keyElement.classList.add("keyboard_key-justwide");
                        keyElement.innerHTML = "shift";
                        keyElement.addEventListener("click", () => {
                            this.properties.capsLock = !this.properties.capsLock;
                            for(const item of this.elements.keys){
                                if(item.textContent !== "Space" && item.textContent !== "enter" && item.textContent !== "ok" && item.textContent !== "Caps Lock" && item.textContent !== "shift" && item.textContent !== "Back Space"){
                                    item.textContent = this.properties.capsLock ? item.textContent.toUpperCase() : item.textContent.toLowerCase();
                                }
                            }
                            
                            this._triggerEvent("oninput");
                        })
                        break;
                        case "ok":
                            keyElement.classList.add("keyboard_key");
                            keyElement.innerHTML = "ok";
                            keyElement.addEventListener("click", () => {
                                this.properties.value += "";
                                this._triggerEvent("onclose");
                                var text = document.getElementById("tbInput").value;
                                alert(text);
                            })
                            break;
                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    })
                    break;
            }
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    _triggerEvent(handlerName) {
        if(typeof this.eventHandlers[handlerName] == "function"){
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for(const key of this.elements.keys){
            if(key.textContent !== "Space" && key.textContent !== "enter" && key.textContent !== "ok" && key.textContent !== "Caps Lock" && key.textContent !== "shift" && key.textContent !== "Back Space"){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        
    },
    close() {
        this.properties.value ="";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    
});