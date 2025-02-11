# local-llm-chat

```bash
mkdir -m 0777 logs src/models

wget -O "src/models/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf" "https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF/resolve/main/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf?download=true"

cd src && npm install && cd ..

docker compose up -d
```

## Uses

* [Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO](https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF) - Apache-2.0
* [twbs/bootstrap](https://github.com/twbs/bootstrap) - MIT
* [twbs/icons](https://github.com/twbs/icons) - MIT
* [ngxson/wllama](https://github.com/ngxson/wllama) - MIT
* [markedjs/marked](https://github.com/markedjs/marked) - MIT
