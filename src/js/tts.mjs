import Options from './ui/options.mjs';

///////////////////////////////////////////////////////////////////////////////

let voices = {};
let pitch = 1;
let rate = 0.75;
let volume = 1;
let utterance = null;
let lang = null;

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

    speak(text) {
        if (window.speechSynthesis.speaking) {
            this.stop();
        }
        if (!voiceExists(lang)) {
            return;
        }
        utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        utterance.voice = voices[lang];
        utterance.lang = voices[lang].lang;
        utterance.text = text;
        window.speechSynthesis.speak(utterance);
    } ,
    
    stop() {
        window.speechSynthesis.cancel();
        utterance = null;
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
        if (utterance) {
            utterance.pitch = value;
        }
    },

    setRate(value) {
        rate = value;
        if (utterance) {
            utterance.rate = value;
        }
    },

    setVolume(value) {
        volume = value;
        if (utterance) {
            utterance.volume = value;
        }
    },
};

export default TTS;
