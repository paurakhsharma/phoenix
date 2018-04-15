define({

    /**
     * allow for registering the app
     *
     * @return promised object containing app id, name, author and version
     */

    setup () {
        var pr = new Promise((resolve, reject) => {

            $.getJSON('/apps/market/package.json', function(app) {

                OC.registerNav( app.name, {
                    'name' : app.name,
                    'iconMaterial' : 'shopping_cart'
                });

                resolve({
                    id      : app.name,
                    name    : _.upperFirst(app.name),
                    author  : app.author,
                    version : app.version
                });

            })
        });

        return pr;
    },


    /**
     * Start the application by mounting it to the respective DOM element
     *
     * @return promise
     */

    boot () {

        var pr = new Promise((resolve, reject) => {
            requirejs(['/apps/market/js/market.js'], ( app ) => {
                app.$mount('#oc-app-container');
                resolve();
            });
        });

        return pr;
    }
});
