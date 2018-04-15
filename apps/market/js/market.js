define(function() {
    var market = new Vue({
        template: '<h1>Wohoo … {{ name }}</h1>',
        name: 'Market',
        data: {
            name :"Marketplace App"
        },
        computed : {
            apps () {
                // Just to see if it works
                return OC.getApps();
            }
        }
    })

    return market;

});
