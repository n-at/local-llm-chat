# local-llm-chat

```bash
mkdir -m 0777 logs src/models

wget -O "src/models/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf" "https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF/resolve/main/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf?download=true"

wget -O "src/models/microsoft_Phi-4-mini-instruct-Q4_K_M.gguf" "https://huggingface.co/bartowski/microsoft_Phi-4-mini-instruct-GGUF/resolve/main/microsoft_Phi-4-mini-instruct-Q4_K_M.gguf?download=true"
docker run --rm -it -v $(pwd):/data --entrypoint "/app/llama-gguf-split" "ghcr.io/ggml-org/llama.cpp:full" --split-max-size 512M "/data/src/models/microsoft_Phi-4-mini-instruct-Q4_K_M.gguf" "/data/src/models/microsoft_Phi-4-mini-instruct-Q4_K_M"
rm "./src/models/microsoft_Phi-4-mini-instruct-Q4_K_M.gguf"

cd src && npm install && cd ..

docker compose up -d
```

## Uses

* [Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO](https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF) - Apache-2.0
* [microsoft/Phi-4-mini-instruct](https://huggingface.co/microsoft/Phi-4-mini-instruct) - MIT
* [twbs/bootstrap](https://github.com/twbs/bootstrap) - MIT
* [twbs/icons](https://github.com/twbs/icons) - MIT
* [ngxson/wllama](https://github.com/ngxson/wllama) - MIT
* [markedjs/marked](https://github.com/markedjs/marked) - MIT
* [cure53/DOMPurify](https://github.com/cure53/DOMPurify) - Apache-2.0
* [tobiasahlin/SpinKit](https://github.com/tobiasahlin/SpinKit) - MIT
