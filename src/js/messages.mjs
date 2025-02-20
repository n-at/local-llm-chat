import Chat from './ui/chat.mjs';
import Options from './ui/options.mjs';
import TTS from './tts.mjs';

const MessageTypes = {
    ROLE_SYSTEM: 'system',
    ROLE_USER: 'user',
    ROLE_ASSISTANT: 'assistant',
}

const SettingsOffset = 'local-llm-chat-messages';

let messages = [];
let lastMessageId = 0;

function store() {
    window.localStorage[SettingsOffset] = JSON.stringify(messages);
}

function getMessageById(id) {
    return messages.find(message => message.id == id);
} 

const Messages = {
    init() {
        if (window.localStorage[SettingsOffset]) {
            messages = JSON.parse(window.localStorage[SettingsOffset]);
        }

        if (messages.length == 0) {
            this.addSystemPrompt();
        } else {
            messages.forEach(message => {
                Chat.addMessage(message.id, message.role, message.content, message.typing);
                lastMessageId = Math.max(lastMessageId, message.id);
            });
        }
    },

    add(role, content, typing=false) {
        const id = (++lastMessageId);
        
        Chat.addMessage(id, role, content, typing);
        
        messages.push({
            id,
            role,
            content,
            typing,
        });

        store();

        return id;
    },

    update(id, content, typing=false) {
        const message = getMessageById(id);
        if (!message) {
            return;
        }

        Chat.updateMessage(id, content, typing);

        message.content = content;
        message.typing = typing;

        store();
    },

    delete(id) {
        const message = getMessageById(id);
        if (!message) {
            return;
        }

        Chat.deleteMessage(message.id);

        messages.filter(message => message.id != id);
        
        store();
    },

    clear() {
        messages.forEach(message => {
            Chat.deleteMessage(message.id);
        });

        messages = [];
        
        this.addSystemPrompt();
    },

    ///

    getAsChatLog() {
        return messages.map(elem => {
            return {
                role: elem.role,
                content: elem.content,
            };
        });
    },

    copyToClipboard(id) {
        const message = getMessageById(id);
        if (!message) {
            return;
        }
        navigator.clipboard.writeText(message.content).catch(e => console.log(e));
    },

    speak(id) {
        const message = getMessageById(id);
        if (!message) {
            return;
        }
        
        const el = document.createElement('div');
        el.innerHTML = DOMPurify.sanitize(marked.parse(message.content));
        
        const text = el.innerText;
        el.remove();

        TTS.speak(text);
    },

    addSystemPrompt() {
        this.add(MessageTypes.ROLE_SYSTEM, Options.get().system_prompt, false);
    },
};

export default Messages;
export {
    MessageTypes,
}
