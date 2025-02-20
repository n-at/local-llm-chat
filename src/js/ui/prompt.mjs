import Messages from '../messages.mjs';
import Inference from '../inference.mjs';

let inputEl = null;
let submitEl = null;

function submit() {
    const message = inputEl.value;
    
    clear();

    Inference.generateCompletion(message);
}

function clear() {
    inputEl.value = '';
}

const Prompt = {
    init() {
        inputEl = document.getElementById('prompt-input');
        submitEl = document.getElementById('prompt-submit');
        submitEl.addEventListener('click', () => {
            submit();
        });

        document.getElementById('prompt-clear').addEventListener('click', () => {
            Inference.cancelCompletion();
            Messages.clear();
        });
    },

    lockSubmit() {
        submitEl.disabled = true;
    },
    unlockSubmit() {
        submitEl.disabled = false;
    },
};

export default Prompt;
