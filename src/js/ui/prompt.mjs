import Messages from '../messages.mjs';
import Inference from '../inference.mjs';
import Options from './options.mjs';

///////////////////////////////////////////////////////////////////////////////

let inputEl = null;
let submitEl = null;
let speakEl = null;

///////////////////////////////////////////////////////////////////////////////

function submit() {
    const message = inputEl.value;
    
    clear();

    Inference.generateCompletion(message);
}

function clear() {
    inputEl.value = '';
}

///////////////////////////////////////////////////////////////////////////////

const Prompt = {
    init() {
        inputEl = document.getElementById('prompt-input');
        submitEl = document.getElementById('prompt-submit');
        submitEl.addEventListener('click', () => {
            submit();
        });

        speakEl = document.getElementById('prompt-speak');
        speakEl.addEventListener('click', () => {
            if (Options.getSpeak()) {
                Options.setSpeak(false);
                speakEl.classList.remove('active');
            } else {
                Options.setSpeak(true);
                speakEl.classList.add('active');
            }
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
