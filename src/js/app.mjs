import Options from './ui/options.mjs';
import Loading from './ui/loading.mjs';
import Chat from './ui/chat.mjs';
import Prompt from './ui/prompt.mjs';
import Theme from './ui/theme.mjs';

import Messages from './messages.mjs';
import Inference from './inference.mjs';
import TTS from './tts.mjs';

//ui
Options.init();
Loading.init();
Chat.init();
Prompt.init();
Theme.init();

//app
Messages.init();
TTS.init();
Inference.init();
