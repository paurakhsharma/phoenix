define({

	/**
	 * allow for registering the app
	 *
	 * @return deferred promise containing app id, name, author and version
	 */

	 info : {

		 // basic information
		 id          : 'files',  // needs to match the folder name
		 name        : "Files",
		 author      : "Felix Heidecke, Vincent Petry, Thomas Müller",
		 version     : "0.1.0",

		 // app does not attach to the dom (defalt: false)
		 silentBoot : false,

		 // Key: Plugin name; value: local Method
		 extend : {
			 phoenixAlert : "setup",
		 }
	 },

	setup : () => {
		OC.registerNav('files', {
			name: "Files",
			iconMaterial: 'shopping_cart',
			route: '/'
		});
	},


	/**
	 * Start the application by mounting it to the respective DOM element
	 *
	 * @return deferred promise
	 */

	boot : (container) => {
		var p = new Promise((resolve, defer) => {
			requirejs(['/apps/files/js/files.bundle.js'], function(market) {
				market.$mount(container);
				resolve();
			});
		});

		return p;
	}
});
