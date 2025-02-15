(() => {

    window.Chat = {
        ROLE_SYSTEM: 'system',
        ROLE_USER: 'user',
        ROLE_ASSISTANT: 'assistant',

        containerEl: null,
        messageEls: {},
        lastMessageId: 0,

        init() {
            this.containerEl = document.getElementById('chat');
        },

        addMessage(role, message, typing=false) {
            let messageBorderCls = 'border-secondary';
            let messageRoleCls = 'text-secondary';
            let messageSpinnerCls = 'text-secondary';
            let roleDisplay = 'Unknown';
            let spinnerDisplayCls = typing ? '' : 'd-none';

            switch (role) {
                case Chat.ROLE_SYSTEM:
                    messageBorderCls = 'border-danger';
                    messageRoleCls = 'text-danger';
                    messageSpinnerCls = 'text-danger';
                    roleDisplay = 'System';
                    break;

                case Chat.ROLE_USER:
                    messageBorderCls = 'border-success';
                    messageRoleCls = 'text-success';
                    messageSpinnerCls = 'text-success';
                    roleDisplay = 'User';
                    break;

                case Chat.ROLE_ASSISTANT:
                    messageBorderCls = 'border-primary';
                    messageRoleCls = 'text-primary';
                    messageSpinnerCls = 'text-primary';
                    roleDisplay = 'Assistant';
                    break;
            }

            const content = DOMPurify.sanitize(marked.parse(message));

            const el = document.createElement('div');
            const elId = (this.lastMessageId++);
            this.messageEls[elId] = el;

            el.innerHTML = `
                <div class="card m-3 chat-message ${messageBorderCls}">
                    <div class="card-body p-2">
                        <div class="chat-message-user">
                            <span class="${messageRoleCls}">
                                <i class="bi bi-person-circle"></i> ${roleDisplay}
                            </span>
                        </div>
                        <div class="chat-message-content">
                            ${content}
                        </div>
                        <div class="chat-message-typing text-end ${spinnerDisplayCls}">
                            <div class="spinner-border spinner-border-sm ${messageSpinnerCls}" role="status">
                                <span class="visually-hidden">Typing message...</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            this.containerEl.append(el);
            this.containerEl.scrollTo({
                top: this.containerEl.scrollHeight,
                left: 0,
                smooth: 'auto',
            });

            return elId;
        },

        updateMessage(id, message, typing=false) {
            if (!this.messageEls[id]) {
                return;
            }
            
            const el = this.messageEls[id];
            const contentEl = el.querySelector('.chat-message-content');
            const typingEl = el.querySelector('.chat-message-typing');

            contentEl.innerHTML = DOMPurify.sanitize(marked.parse(message));

            if (typing) {
                typingEl.classList.remove('d-none');
            } else {
                typingEl.classList.add('d-none');
            }
        },

        deleteMessage(id) {
            if (!this.messageEls[id]) {
                return;
            }

            this.messageEls[id].remove();

            delete this.messageEls[id];
        },
    };

    window.Chat.init();

})();
