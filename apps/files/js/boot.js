define({
    id : 'files',
    name : 'Files',
    version : '0.1.0',
    standalone : true,
    assets : {
        js : ['js/files.bundle.js'],
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
            'iconMaterial' : 'folder'
        }).then(function(returnMessage) {
            // did it work?
            console.log(returnMessage);
        }).catch(function(err) {
            console.log(`woops: ${err}`);
        });
    }
});
