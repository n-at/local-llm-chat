import Messages from '../messages.mjs';
import { MessageTypes } from '../messages.mjs';

let containerEl = null;
let messageEls = {};

const Chat = {
    init() {
        containerEl = document.getElementById('chat');
    },

    addMessage(id, role, content, typing=false) {
        let messageBorderCls = '';
        let messageRoleCls = 'text-secondary';
        let messageSpinnerCls = 'text-secondary';
        let roleDisplay = 'Unknown';
        let spinnerDisplayCls = typing ? '' : 'd-none';
        let toolsDisplayCls = typing ? 'd-none' : '';

        switch (role) {
            case MessageTypes.ROLE_SYSTEM:
                messageBorderCls = '';
                messageRoleCls = 'text-danger';
                messageSpinnerCls = 'text-danger';
                roleDisplay = 'System';
                break;

            case MessageTypes.ROLE_USER:
                messageBorderCls = '';
                messageRoleCls = 'text-success';
                messageSpinnerCls = 'text-success';
                roleDisplay = 'User';
                break;

            case MessageTypes.ROLE_ASSISTANT:
                messageBorderCls = '';
                messageRoleCls = 'text-primary';
                messageSpinnerCls = 'text-primary';
                roleDisplay = 'Assistant';
                break;
        }

        const el = document.createElement('div');
    
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
                        <button type="button" class="btn btn-sm btn-outline-secondary border-0 btn-message-tts" title="Read message">
                            <i class="bi bi-volume-up"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-secondary border-0 btn-message-clipboard" title="Copy to clipboard">
                            <i class="bi bi-clipboard"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        el.querySelector('.btn-message-tts').addEventListener('click', () => {
            Messages.speak(id);
        });
        el.querySelector('.btn-message-clipboard').addEventListener('click', () => {
            Messages.copyToClipboard(id);
        });

        messageEls[id] = el;
        containerEl.append(el);
        containerEl.scrollTo({
            top: containerEl.scrollHeight,
            left: 0,
            smooth: 'auto',
        });
    },

    updateMessage(id, content, typing=false) {
        if (!messageEls[id]) {
            return;
        }
        
        const el = messageEls[id];
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
        if (!messageEls[id]) {
            return;
        }

        messageEls[id].remove();

        delete messageEls[id];
    },
};

export default Chat;
