import { Wllama, LoggerWithoutDebug } from './node_modules/@wllama/wllama/esm/index.js';

const models = {
    'QVikhr-2.5-1.5B': {
        file: 'QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf',
        quant: 'Q4_K_M',
    },
};

const languages = {
    ru: {
        name: 'Russian',
    },
    en: {
        name: 'English',
    },
};

function modelUrl(modelId) {
    if (!models[modelId]) {
        return null;
    }
    return `${location.origin}/models/${models[modelId].file}`;
}

const currentModelId = 'QVikhr-2.5-1.5B';
const currentSystemPrompt = 'You are helpful digital assistant.';

///////////////////////////////////////////////////////////////////////////////

(async () => {
    const CONFIG_PATHS = {
        'single-thread/wllama.wasm': './node_modules/@wllama/wllama/esm/single-thread/wllama.wasm',
        'multi-thread/wllama.wasm' : './node_modules/@wllama/wllama/esm/multi-thread/wllama.wasm',
    };

    const wllama = new Wllama(CONFIG_PATHS);

    await wllama.loadModelFromUrl(modelUrl(currentModelId), {
        progressCallback: ({loaded, total}) => {
            window.Loading.perc(Math.round((loaded / total) * 100));
        },
        logger: LoggerWithoutDebug,
    });

    window.Loading.hide();

    // const messages = [
    //     {role: 'system', content: currentSystemPrompt},
    //     {role: 'user', content: 'Почему трава зеленая?'},
    // ];

    // console.log('THINKING...');

    // const output = await wllama.createChatCompletion(messages, {
    //     sampling: {
    //         temp: 0.5,
    //         top_k: 40,
    //         top_p: 0.9,
    //     },
    // });

    // console.log(`OUTPUT: ${output}`);
})();
