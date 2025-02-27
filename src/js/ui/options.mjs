const DefaultOptions = {
    model: 'QVikhr-2.5-1.5B',
    system_prompt: 'You are helpful digital assistant.',
    voice_lang: 'ru',
    speak_lang: 'ru',
    temp: 0.8,
    n_predict: -1, //nPredict
    repeat_penalty: 1.0, //penalty_repeat
    repeat_last_n: 64, //penalty_last_n
    top_k: 40,
    top_p: 0.9,
    min_p: 0.1,
    typical: 1.0, //typical_p
    mirostat: 0,
    mirostat_tau: 5.0,
    mirostat_eta: 0.1,
    theme: 'system',
    speak: false,
};

const SettingsOffset = 'local-llm-chat-options';

///////////////////////////////////////////////////////////////////////////////

let options = {};

///////////////////////////////////////////////////////////////////////////////

function gatherOptions() {
    return {
        model: document.getElementById('options-model').value,
        system_prompt: document.getElementById('options-system-prompt').value,
        voice_lang: document.getElementById('options-voice-lang').value,
        speak_lang: document.getElementById('options-speak-lang').value,
        temp: document.getElementById('options-temp').value,
        n_predict: document.getElementById('options-n-predict').value,
        repeat_penalty: document.getElementById('options-repeat-penalty').value,
        repeat_last_n: document.getElementById('options-repeat-last-n').value,
        top_k: document.getElementById('options-top-k').value,
        top_p: document.getElementById('options-top-p').value,
        min_p: document.getElementById('options-min-p').value,
        typical: document.getElementById('options-typical').value,
        mirostat: document.getElementById('options-mirostat').value,
        mirostat_tau: document.getElementById('options-mirostat-tau').value,
        mirostat_eta: document.getElementById('options-mirostat-eta').value,
        theme: document.getElementById('options-theme').value,
    };
}

function save() {
    const optionsToSave = Object.assign({}, options, gatherOptions());
    window.localStorage[SettingsOffset] = JSON.stringify(optionsToSave);
}

///////////////////////////////////////////////////////////////////////////////

const Options = {
    init() {
        document.getElementById('options-save').addEventListener('click', () => {
            save();
            window.location.reload();
        });

        document.getElementById('options-defaults').addEventListener('click', () => {
            window.localStorage[SettingsOffset] = JSON.stringify(DefaultOptions);
            window.location.reload();
        });

        if (window.localStorage[SettingsOffset]) {
            options = JSON.parse(window.localStorage[SettingsOffset]);
        } else {
            options = DefaultOptions;
        }

        document.getElementById('options-model').value = options.model;
        document.getElementById('options-system-prompt').value = options.system_prompt;
        document.getElementById('options-voice-lang').value = options.voice_lang;
        document.getElementById('options-speak-lang').value = options.speak_lang;
        document.getElementById('options-temp').value = options.temp;
        document.getElementById('options-n-predict').value = options.n_predict;
        document.getElementById('options-repeat-penalty').value = options.repeat_penalty;
        document.getElementById('options-repeat-last-n').value = options.repeat_last_n;
        document.getElementById('options-top-k').value = options.top_k;
        document.getElementById('options-top-p').value = options.top_p;
        document.getElementById('options-min-p').value = options.min_p;
        document.getElementById('options-typical').value = options.typical;
        document.getElementById('options-mirostat').value = options.mirostat;
        document.getElementById('options-mirostat-tau').value = options.mirostat_tau;
        document.getElementById('options-mirostat-eta').value = options.mirostat_eta;
        document.getElementById('options-theme').value = options.theme;
    },

    get() {
        return Object.assign({}, options);
    },

    setSpeak(value) {
        options.speak = !!value;
        save();
    },
    getSpeak() {
        return options.speak;
    },
};

export default Options;
