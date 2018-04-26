define({

	/**
	 * allow for registering the app
	 *
	 * @return deferred promise containing app id, name, author and version
	 */

	 info : {

		 // basic information
		 id          : 'demo_full',  // needs to match the folder name
		 name        : "I love fullscreen",
		 author      : "Felix Heidecke",
		 version     : "0.1.0"
	 },

	setup : () => {
		OC.registerNav('files', {
			name: "Fullscreen",
			iconMaterial: 'face',
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
