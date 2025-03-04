FROM ubuntu:24.04 as download
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update &&\
    apt-get install -y wget nodejs npm &&\
    mkdir /data &&\
    cd /data &&\
    wget -O "QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf" "https://huggingface.co/Vikhrmodels/QVikhr-2.5-1.5B-Instruct-SMPO_GGUF/resolve/main/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf?download=true" &&\
    wget -O "Phi-3.5-mini-instruct-Q4_K_M.gguf" "https://huggingface.co/bartowski/Phi-3.5-mini-instruct-GGUF/resolve/main/Phi-3.5-mini-instruct-Q4_K_M.gguf?download=true"
ADD src /app
RUN cd /app && npm install

FROM ghcr.io/ggml-org/llama.cpp:full as split
RUN mkdir -p /data/output
COPY --from=download /data/Phi-3.5-mini-instruct-Q4_K_M.gguf /data/
RUN /app/llama-gguf-split --split-max-size 512M "/data/Phi-3.5-mini-instruct-Q4_K_M.gguf" "/data/output/Phi-3.5-mini-instruct-Q4_K_M"

FROM nginx:latest
COPY --from=download /app /opt/local-llm-chat
RUN cd /opt/local-llm-chat &&\
    mkdir models
COPY --from=download /data/QVikhr-2.5-1.5B-Instruct-SMPO-Q4_K_M.gguf /opt/local-llm-chat/models/
COPY --from=split /data/output/* /opt/local-llm-chat/models/
ADD conf.d/vhost.conf /etc/nginx/conf.d/default.conf
