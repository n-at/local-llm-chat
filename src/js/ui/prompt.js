(() => {

    window.Prompt = {
        inputEl: null,
        submitEl: null,

        init() {
            this.inputEl = document.getElementById('prompt-input');
            this.submitEl = document.getElementById('prompt-submit');
            this.submitEl.addEventListener('click', () => {
                this.submit();
            });

            document.getElementById('prompt-clear').addEventListener('click', () => {
                window.Inference.cancelCompletion();
                window.Messages.clear();
            });
        },

        lockSubmit() {
            this.submitEl.disabled = true;
        },
        unlockSubmit() {
            this.submitEl.disabled = false;
        },
        submit() {
            const message = this.inputEl.value;
            
            this.clear();

            window.Inference.generateCompletion(message);
        },
        clear() {
            this.inputEl.value = '';
        },
    };

    window.Prompt.init();

})();
