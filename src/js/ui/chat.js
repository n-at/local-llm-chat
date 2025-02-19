(() => {

    window.Chat = {
        containerEl: null,
        messageEls: {},

        init() {
            this.containerEl = document.getElementById('chat');
        },

        addMessage(id, role, content, typing=false) {
            let messageBorderCls = '';
            let messageRoleCls = 'text-secondary';
            let messageSpinnerCls = 'text-secondary';
            let roleDisplay = 'Unknown';
            let spinnerDisplayCls = typing ? '' : 'd-none';
            let toolsDisplayCls = typing ? 'd-none' : '';

            switch (role) {
                case window.Messages.ROLE_SYSTEM:
                    messageBorderCls = '';
                    messageRoleCls = 'text-danger';
                    messageSpinnerCls = 'text-danger';
                    roleDisplay = 'System';
                    break;

                case window.Messages.ROLE_USER:
                    messageBorderCls = '';
                    messageRoleCls = 'text-success';
                    messageSpinnerCls = 'text-success';
                    roleDisplay = 'User';
                    break;

                case window.Messages.ROLE_ASSISTANT:
                    messageBorderCls = '';
                    messageRoleCls = 'text-primary';
                    messageSpinnerCls = 'text-primary';
                    roleDisplay = 'Assistant';
                    break;
            }

            const el = document.createElement('div');
            this.messageEls[id] = el;

            el.innerHTML = `
                <div class="card m-3 chat-message ${messageBorderCls}">
                    <div class="card-body p-2">
                        <div class="chat-message-user">
                            <span class="${messageRoleCls}">
                                <i class="bi bi-person-circle"></i> ${roleDisplay}
                            </span>
                        </div>
                        <div class="chat-message-content">
                            ${DOMPurify.sanitize(marked.parse(content))}
                        </div>
                        <div class="chat-message-typing text-end ${spinnerDisplayCls}">
                            <div class="spinner-border spinner-border-sm ${messageSpinnerCls}" role="status">
                                <span class="visually-hidden">Typing message...</span>
                            </div>
                        </div>
                        <div class="chat-message-tools text-end ${toolsDisplayCls}">
                            <button type="button" class="btn btn-sm btn-outline-secondary border-0" title="Read message" onclick="window.Messages.speak(${id})">
                                <i class="bi bi-volume-up"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary border-0" title="Copy to clipboard" onclick="window.Messages.copyToClipboard(${id})">
                                <i class="bi bi-clipboard"></i>
                            </button>
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
        },

        updateMessage(id, content, typing=false) {
            if (!this.messageEls[id]) {
                return;
            }
            
            const el = this.messageEls[id];
            const contentEl = el.querySelector('.chat-message-content');
            const typingEl = el.querySelector('.chat-message-typing');
            const toolsEl = el.querySelector('.chat-message-tools');

            contentEl.innerHTML = DOMPurify.sanitize(marked.parse(content));

            if (typing) {
                typingEl.classList.remove('d-none');
                toolsEl.classList.add('d-none');
            } else {
                typingEl.classList.add('d-none');
                toolsEl.classList.remove('d-none');
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
