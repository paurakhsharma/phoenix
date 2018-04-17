define({

	/**
	 * allow for registering the app
	 *
	 * @return deferred promise containing app id, name, author and version
	 */

	setup : () => {
		OC.registerNav('files', {
			name: "Files",
			iconMaterial: 'shopping_cart'
		});

		return {
			id: 'files',
			name: _.upperFirst('files'),
			author: "ownCloud Leute",
			version: "1.0.0"
		}
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
