import { Wllama, LoggerWithoutDebug } from '../node_modules/@wllama/wllama/esm/index.js';

(async () => {

    window.Inference = {
        wllama: null,
        wllamaConfigPaths: {
            'single-thread/wllama.wasm': '../node_modules/@wllama/wllama/esm/single-thread/wllama.wasm',
            'multi-thread/wllama.wasm' : '../node_modules/@wllama/wllama/esm/multi-thread/wllama.wasm',
        },
        models: {
            'QVikhr-2.5-1.5B': {
                file: 'QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf',
                quant: 'Q4_K_M',
            },
        },

        cancel: false,

        async init() {
            this.wllama = new Wllama(this.wllamaConfigPaths);

            const options = window.Options.get();
            const url = this.getModelUrl(options.model);

            await this.wllama.loadModelFromUrl(url, {
                progressCallback: ({loaded, total}) => {
                    window.Loading.perc(Math.round((loaded / total) * 100));
                },
                logger: LoggerWithoutDebug,
            });
        
            window.Loading.hide();
        },

        async generateCompletion(userMessage) {
            window.Prompt.lockSubmit();

            window.Messages.add(window.Messages.ROLE_USER, userMessage, false);

            const assistantMessageId = window.Messages.add(window.Messages.ROLE_ASSISTANT, '', true);
            const chatHistory = window.Messages.getAsChatLog();
            const inferenceOptions = this.getInferenceOptions();

            let previousText = '';

            inferenceOptions.onNewToken = (t, p, currentText, options) => {
                const diff = currentText.substring(previousText.length);
                const dotPosition = diff.indexOf('.');
                if (dotPosition >= 0) {
                    const newText = previousText + diff.substring(0, dotPosition + 1);
                    window.Messages.update(assistantMessageId, newText, true);
                }
                
                previousText = currentText;

                if (this.cancel) {
                    options.abortSignal();
                }
            };

            this.cancel = false;

            const output = await this.wllama.createChatCompletion(chatHistory, inferenceOptions);

            window.Messages.update(assistantMessageId, output, false);
            window.Prompt.unlockSubmit();
        },

        cancelCompletion() {
            this.cancel = true;
        },

        getModelUrl(modelId) {
            if (!this.models[modelId]) {
                return null;
            }
            return `${location.origin}/models/${this.models[modelId].file}`;
        },

        getInferenceOptions() {
            const options = window.Options.get();
            const nPredict = parseInt(options.n_predict);
            return {
                nPredict: nPredict > 0 ? nPredict : undefined,
                sampling: {
                    temp: parseFloat(options.temp),
                    penalty_repeat: parseFloat(options.repeat_penalty),
                    penalty_last_n: parseInt(options.repeat_last_n),
                    top_k: parseInt(options.top_k),
                    top_p: parseFloat(options.top_p),
                    min_p: parseFloat(options.min_p),
                    typical_p: parseFloat(options.typical),
                    mirostat: parseInt(options.mirostat),
                    mirostat_eta: parseFloat(options.mirostat_eta),
                    mirostat_tau: parseFloat(options.mirostat_tau),
                },
            };
        },
    };

    await window.Inference.init();

})();
