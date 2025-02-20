let el = null;
let percEl = null;
let value = 0;

const Loading = {
    init() {
        el = document.getElementById('loading');
        percEl = document.getElementById('loading-perc');
    },

    hide() {
        el.remove();
    },

    perc(v) {
        value = v;
        percEl.innerText = v;
    },
};

export default Loading;
