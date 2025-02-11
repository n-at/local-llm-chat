# local-llm-chat

```bash
mkdir -m 0777 logs src/models

wget -O "src/models/QVikhr-2.5-1.5B-Instruct-SMPO-Q3_K_M.gguf" "https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF/resolve/main/QVikhr-2.5-1.5B-Instruct-SMPO-Q3_K_M.gguf?download=true"

cd src && npm install && cd ..

docker compose up -d
```
