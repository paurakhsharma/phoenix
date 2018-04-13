OC = new Vue({
    el  : "#oc",
    data: {
        nav : [],
        appPath : '/apps',
        apps : [],
        config: {}
    },
    mounted () {
        this._loadConfig().then(() =>{
            this._bootApps();
        });
    },
    methods: {

        // ------------------------------------------------- startup methods ---

        _loadConfig( ) {
            var pr = new Promise((resolve, reject) => {

                $.getJSON('/config.json', (data) => {
                    this.apps = data.apps;
                    resolve();
                });
            });

            return pr;
        },

        _bootApps ( ) {
            for( let app of this.apps ) {
                requirejs([`${this.appPath}/${app}/js/boot.js`], function( app ) {
                    app.init();
                })
            }
        },


        // -------------------------------------------- registration methods ---

        // nav

        registerNav ( app, payload ) {

            var pr = new Promise((resolve, no) => {
                this.nav.push(_.assign( {id: app }, payload ));
                this.nextTick(resolve(`${app} registered`));
            })

            return pr;
        },

        removeNav( item ) {
            // nothing here so far
            return true;
        },

        // apps

        registerApp () {},

        // config

        registerConfig () {},

        // -------------------------------------------------------- EVENTBUS ---

        emit( e, id ) {
            OC.event.$emit(`${e} ${id}`);
        },

        // --------------------------------------------------------- GETTERS ---

        getConfig () {
            return this.config;
        },

        getApps () {
            return this.apps;
        },

        getActiveApp () {
            return this.apps[0];
        },

        getNavItems () {
            return this.nav;
        }
    },
})
