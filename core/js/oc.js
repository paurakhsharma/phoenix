OC = new Vue({
    el  : "#oc",
    data: {
        appPath : '/apps',

        // config settings
        config  : {}

        // models
        nav     : [],
        apps    : {},
    },

    mounted () {

        // TODO: Looks ugly, is ugly … Make nice!

        this._loadConfig().then(() =>{
            this._setupApps().then(() => {
                this._bootApp(this.getActiveApp().id);
            })
        });
    },


    computed: {
        activeApp () {
            return this.apps['market'];
        }
    },

    methods: {

        /**
         * Write apps.json to this.apps
         *
         * @return Promise
         */

        _loadConfig () {
            var pr = new Promise((resolve, reject) => {
                $.getJSON('/apps.json', (apps) => {
                    this.apps = apps;
                    resolve();
                });
            });
            return pr;
        },


        /**
         * Setup all available apps
         *
         * @return Promise
         */

        _setupApps () {
            var pr = new Promise((resolve, reject) => {
                _.map(this.apps, (no, i) => {
                    requirejs([`${this.appPath}/${i}/js/boot.js`], ( app ) => {
                        app.setup().then((data) => {
                            this.apps[i] = data;
                            if ( _.findLastKey(this.apps) === i)
                                resolve();
                        })
                    })
                });
            });
            return pr;
        },


        /**
         * Boot an application
         *
         * @param obj app with appId as key
         * @return Promise
         */

        _bootApp (app) {
            var pr = new Promise((resolve, reject) => {
                requirejs([`${this.appPath}/${app}/js/boot.js`], ( app ) => {
                    app.boot();
                })
            });
            return pr;
        },


        // -------------------------------------------- registration methods ---

        registerNav ( app, payload ) {

            var pr = new Promise((resolve, no) => {
                this.nav.push(_.assign( {id: app }, payload ));
                this.nextTick(resolve(`registered:${app}`));
            })

            return pr;
        },

        removeNav() {},

        // -------------------------------------------------------- EVENTBUS ---

        emit( e, id ) {
            OC.event.$emit(`${e}:${id}`);
        },

        // --------------------------------------------------------- GETTERS ---

        getConfig () {
            return this.config;
        },

        getApps () {
            return this.apps;
        },

        getActiveApp () {
            return this.apps['market'];
        },

        getNavItems () {
            return this.nav;
        }
    },
})
