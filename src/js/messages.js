(() => {

    window.Messages = {
        ROLE_SYSTEM: 'system',
        ROLE_USER: 'user',
        ROLE_ASSISTANT: 'assistant',

        messages: [],
        lastMessageId: 0,

        init() {
            if (window.localStorage['local-llm-chat-messages']) {
                this.messages = JSON.parse(window.localStorage['local-llm-chat-messages']);
            }

            if (this.messages.length == 0) {
                this.addSystemPrompt();
            } else {
                this.messages.forEach(message => {
                    window.Chat.addMessage(message.id, message.role, message.content, message.typing);
                    this.lastMessageId = Math.max(this.lastMessageId, message.id);
                });
            }
        },

        add(role, content, typing=false) {
            const id = (++this.lastMessageId);
            
            window.Chat.addMessage(id, role, content, typing);
            
            this.messages.push({
                id,
                role,
                content,
                typing,
            });

            this.store();

            return id;
        },

        update(id, content, typing=false) {
            const message = this.getMessageById(id);
            if (!message) {
                return;
            }

            window.Chat.updateMessage(id, content, typing);

            message.content = content;
            message.typing = typing;

            this.store();
        },

        delete(id) {
            const message = this.getMessageById(id);
            if (!message) {
                return;
            }

            window.Chat.deleteMessage(message.id);

            this.messages.filter(message => message.id != id);
            
            this.store();
        },

        clear() {
            this.messages.forEach(message => {
                window.Chat.deleteMessage(message.id);
            });

            this.messages = [];
            this.addSystemPrompt();
        },

        ///

        getAsChatLog() {
            return this.messages.map(elem => {
                return {
                    role: elem.role,
                    content: elem.content,
                };
            });
        },

        copyToClipboard(id) {
            const message = this.getMessageById(id);
            if (!message) {
                return;
            }
            navigator.clipboard.writeText(message.content).catch(e => console.log(e));
        },

        speak(id) {
            const message = this.getMessageById(id);
            if (!message) {
                return;
            }
            console.log('Speaking...'); //TODO TTS
        },

        ///

        store() {
            window.localStorage['local-llm-chat-messages'] = JSON.stringify(this.messages);
        },

        getMessageById(id) {
            return this.messages.find(message => message.id == id);
        },

        addSystemPrompt() {
            this.add(window.Messages.ROLE_SYSTEM, window.Options.get().system_prompt, false);
        },
    };

    window.Messages.init();

})();
