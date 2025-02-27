import Options from './ui/options.mjs';

///////////////////////////////////////////////////////////////////////////////

let voices = {};
let pitch = 1;
let rate = 1.15;
let volume = 1;
let lang = null;

let queue = [];

///////////////////////////////////////////////////////////////////////////////

function loadVoices() {
    voices = {};
    
    for (let voice of window.speechSynthesis.getVoices()) {
        if (!voice.localService || !voice.default) {
            continue;
        }
        
        const lang = voice.lang.substring(0, 2);
        
        voices[lang] = voice;
    }
}

function voiceExists(lang) {
    return !!voices[lang];
}

function queueNext() {
    if (queue.length == 0) {
        return;
    }
    
    const text = queue.shift();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    utterance.voice = voices[lang];
    utterance.lang = voices[lang].lang;
    utterance.addEventListener('end', () => {
        queueNext();
    });
    window.speechSynthesis.speak(utterance);
}

///////////////////////////////////////////////////////////////////////////////

const TTS = {
    init() {
        if (typeof window.speechSynthesis === 'undefined') {
            return;
        }
    
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        loadVoices();

        lang = Options.get().speak_lang
    },

    speak(text, addToQueue=false) {
        if (!addToQueue) {
            queue = [];
            if (this.speaking()) {
                this.stop();
            }
        }

        queue.push(text);
        
        if (!this.speaking()) {
            queueNext();
        }
    },
    
    stop() {
        window.speechSynthesis.cancel();
    },

    speaking() {
        return window.speechSynthesis.speaking;
    },

    setLang(newLang) {
        if (!voiceExists(newLang)) {
            return;
        }
        lang = newLang;
    },

    setPitch(value) {
        pitch = value;
    },

    setRate(value) {
        rate = value;
    },

    setVolume(value) {
        volume = value;
    },
};

export default TTS;
