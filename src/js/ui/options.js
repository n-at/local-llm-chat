(() => {

    window.Options = {
        defaultOptions: {
            model: 'QVikhr-2.5-1.5B',
            system_prompt: 'You are helpful digital assistant.',
            voice_lang: 'ru',
            speak_lang: 'ru',
            temp: 0.8,
            repeat_penalty: 1.0,
            top_k: 40,
            top_p: 0.9,
            min_p: 0.1,
            theme: 'system',
        },

        options: {},

        init() {
            document.getElementById('options-save').addEventListener('click', () => {
                window.localStorage['local-llm-chat-options'] = JSON.stringify(this.gatherOptions());
                window.location.reload();
            });

            document.getElementById('options-defaults').addEventListener('click', () => {
                window.localStorage['local-llm-chat-options'] = JSON.stringify(this.defaultOptions);
                window.location.reload();
            });

            if (window.localStorage['local-llm-chat-options']) {
                this.options = JSON.parse(window.localStorage['local-llm-chat-options']);
            } else {
                this.options = this.defaultOptions;
            }

            document.getElementById('options-model').value = this.options.model;
            document.getElementById('options-system-prompt').value = this.options.system_prompt;
            document.getElementById('options-voice-lang').value = this.options.voice_lang;
            document.getElementById('options-speak-lang').value = this.options.speak_lang;
            document.getElementById('options-temp').value = this.options.temp;
            document.getElementById('options-repeat-penalty').value = this.options.repeat_penalty;
            document.getElementById('options-top-k').value = this.options.top_k;
            document.getElementById('options-top-p').value = this.options.top_p;
            document.getElementById('options-min-p').value = this.options.min_p;
            document.getElementById('options-theme').value = this.options.theme;
        },

        gatherOptions() {
            return {
                model: document.getElementById('options-model').value,
                system_prompt: document.getElementById('options-system-prompt').value,
                voice_lang: document.getElementById('options-voice-lang').value,
                speak_lang: document.getElementById('options-speak-lang').value,
                temp: document.getElementById('options-temp').value,
                repeat_penalty: document.getElementById('options-repeat-penalty').value,
                top_k: document.getElementById('options-top-k').value,
                top_p: document.getElementById('options-top-p').value,
                min_p: document.getElementById('options-min-p').value,
                theme: document.getElementById('options-theme').value,
            };
        },
    };

    window.Options.init();

})();