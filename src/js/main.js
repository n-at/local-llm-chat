import { Wllama, LoggerWithoutDebug } from '../node_modules/@wllama/wllama/esm/index.js';

const models = {
    'QVikhr-2.5-1.5B': {
        file: 'QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf',
        quant: 'Q4_K_M',
    },
};

function modelUrl(modelId) {
    if (!models[modelId]) {
        return null;
    }
    return `${location.origin}/models/${models[modelId].file}`;
}

///////////////////////////////////////////////////////////////////////////////

(async () => {
    const CONFIG_PATHS = {
        'single-thread/wllama.wasm': './node_modules/@wllama/wllama/esm/single-thread/wllama.wasm',
        'multi-thread/wllama.wasm' : './node_modules/@wllama/wllama/esm/multi-thread/wllama.wasm',
    };

    const options = window.Options.options;
    
    const wllama = new Wllama(CONFIG_PATHS);

    await wllama.loadModelFromUrl(modelUrl(options.model), {
        progressCallback: ({loaded, total}) => {
            window.Loading.perc(Math.round((loaded / total) * 100));
        },
        logger: LoggerWithoutDebug,
    });

    window.Loading.hide();

    // const messages = [
    //     {role: 'system', content: options.system_prompt},
    //     {role: 'user', content: 'Почему трава зеленая?'},
    // ];

    // console.log('THINKING...');

    // const output = await wllama.createChatCompletion(messages, {
    //     sampling: {
    //         temp: options.temp,
    //         penalty_repeat: options.repeat_penalty,
    //         top_k: options.top_k,
    //         top_p: options.top_p,
    //         min_p: options.min_p,
    //     },
    // });

    // console.log(`OUTPUT: ${output}`);
})();
