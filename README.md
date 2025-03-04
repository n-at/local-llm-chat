# local-llm-chat

Simple LLM chat inside browser.

## Run

```bash
mkdir -m 0777 logs src/models

wget -O "src/models/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf" "https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF/resolve/main/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf?download=true"

wget -O "src/models/Phi-3.5-mini-instruct-Q4_K_M.gguf" "https://huggingface.co/bartowski/Phi-3.5-mini-instruct-GGUF/resolve/main/Phi-3.5-mini-instruct-Q4_K_M.gguf?download=true"
docker run --rm -it -v $(pwd):/data --entrypoint "/app/llama-gguf-split" "ghcr.io/ggml-org/llama.cpp:full" --split-max-size 512M "/data/src/models/Phi-3.5-mini-instruct-Q4_K_M.gguf" "/data/src/models/Phi-3.5-mini-instruct-Q4_K_M"
rm "./src/models/Phi-3.5-mini-instruct-Q4_K_M.gguf"

cd src && npm install && cd ..

docker compose up -d
```

## docker image

```bash
docker image build -t local-llm-chat:latest .
docker run -d -p 8888:80 local-llm-chat:latest
```

## Uses

* [Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO](https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF) - Apache-2.0
* [microsoft/Phi-3.5-mini-instruct](https://huggingface.co/microsoft/Phi-3.5-mini-instruct) - MIT
* [twbs/bootstrap](https://github.com/twbs/bootstrap) - MIT
* [twbs/icons](https://github.com/twbs/icons) - MIT
* [ngxson/wllama](https://github.com/ngxson/wllama) - MIT
* [markedjs/marked](https://github.com/markedjs/marked) - MIT
* [cure53/DOMPurify](https://github.com/cure53/DOMPurify) - Apache-2.0
* [tobiasahlin/SpinKit](https://github.com/tobiasahlin/SpinKit) - MIT
