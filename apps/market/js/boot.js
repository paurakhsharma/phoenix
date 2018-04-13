define({
    id : 'market',
    name : 'Market',
    version : '1.12.0',
    standalone : true,
    assets : {
        js : ['js/market.bundle.js'],
        css : []
    },
    dependencies : [{
        app : 'phoenix',
        minVersion : '10.1',
        maxVersion : '10.1'
    }],

    init () {
        OC.registerNav( this.id, {
            'name' : this.name,
            'iconMaterial' : 'shopping_cart'
        }).then(function(returnMessage) {
            // did it work?
            console.log(returnMessage);
        }).catch(function(err) {
            console.log(`woops: ${err}`);
        });
    }
});
