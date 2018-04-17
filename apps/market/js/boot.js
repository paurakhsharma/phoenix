define(['/apps/market/js/market.js'], function(market) {

	let app = {}

	/**
	 * allow for registering the app
	 *
	 * @return deferred promise containing app id, name, author and version
	 */

	app.setup = () => {
		let deferred = $.Deferred();

		$.getJSON('/apps/market/package.json', function(pack) {

			OC.registerNav(pack.name, {
				name: pack.name,
				iconMaterial: 'shopping_cart'
			});

			deferred.resolve({
				id: pack.name,
				name: _.upperFirst(pack.name),
				author: pack.author,
				version: pack.version
			});

		})

		return deferred;
	}


	/**
	 * Start the application by mounting it to the respective DOM element
	 *
	 * @return deferred promise
	 */

	app.boot = (container) => {
		let deferred = $.Deferred();
		market.$mount(container);
		deferred.resolve();
		return deferred;
	}

	return app;
});
