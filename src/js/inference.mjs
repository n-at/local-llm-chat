import { Wllama, LoggerWithoutDebug } from '../node_modules/@wllama/wllama/esm/index.js';
import Options from './ui/options.mjs';
import Prompt from './ui/prompt.mjs';
import Loading from './ui/loading.mjs';
import Messages from './messages.mjs';
import {MessageTypes} from './messages.mjs';

///////////////////////////////////////////////////////////////////////////////

const WllamaConfigPaths = {
    'single-thread/wllama.wasm': '../node_modules/@wllama/wllama/esm/single-thread/wllama.wasm',
    'multi-thread/wllama.wasm' : '../node_modules/@wllama/wllama/esm/multi-thread/wllama.wasm',
};
   
const Models = {
    'QVikhr-2.5-1.5B': {
        file: 'QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf',
        quant: 'Q4_K_M',
    },
    'Phi-3.5-mini-instruct': {
        file: 'Phi-3.5-mini-instruct-Q4_K_M-00001-of-00005.gguf',
        quant: 'Q4_K_M',
    },
};

///////////////////////////////////////////////////////////////////////////////

let wllama = null;
let cancel = false;

///////////////////////////////////////////////////////////////////////////////

function getModelUrl(modelId) {
    if (!Models[modelId]) {
        return null;
    }
    return `${location.origin}/models/${Models[modelId].file}`;
};

function getInferenceOptions() {
    const options = Options.get();
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
};

///////////////////////////////////////////////////////////////////////////////

const Inference = {
    async init() {
        wllama = new Wllama(WllamaConfigPaths);

        const options = Options.get();
        const url = getModelUrl(options.model);

        await wllama.loadModelFromUrl(url, {
            progressCallback: ({loaded, total}) => {
                Loading.perc(Math.round((loaded / total) * 100));
            },
            logger: LoggerWithoutDebug,
        });
    
        Loading.hide();
    },

    async generateCompletion(userMessage) {
        Prompt.lockSubmit();

        Messages.add(MessageTypes.ROLE_USER, userMessage, false);

        const assistantMessageId = Messages.add(MessageTypes.ROLE_ASSISTANT, '', true);
        const chatHistory = Messages.getAsChatLog();
        const inferenceOptions = getInferenceOptions();

        let previousText = '';

        inferenceOptions.onNewToken = (t, p, currentText, options) => {
            const diff = currentText.substring(previousText.length);
            const dotPosition = diff.indexOf('.');
            if (dotPosition >= 0) {
                const newText = previousText + diff.substring(0, dotPosition + 1);
                Messages.update(assistantMessageId, newText, true);
            }
            
            previousText = currentText;

            if (cancel) {
                options.abortSignal();
            }
        };

        cancel = false;

        const output = await wllama.createChatCompletion(chatHistory, inferenceOptions);

        Messages.update(assistantMessageId, output, false);
        Prompt.unlockSubmit();
    },

    cancelCompletion() {
        cancel = true;
    },
};

export default Inference;
