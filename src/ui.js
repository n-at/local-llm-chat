(() => {

    window.Loading = {
        el: null,
        percEl: null,

        init() {
            this.el = document.getElementById('loading');
            this.percEl = document.getElementById('loading-perc');
        },

        hide() {
            this.el.remove();
        },

        perc(v) {
            this.percEl.innerText = v;
        },
    };

    ///////////////////////////////////////////////////////////////////////////

    window.Loading.init();

})();
