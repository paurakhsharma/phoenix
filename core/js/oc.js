OC = new Vue({
	el  : "#oc",
	data: {
		appPath : '/apps',

		// config settings
		config  : {},

		// models
		nav     : [],
		apps    : {}
	},

	mounted () {

		// TODO: Looks ugly, is ugly … Make nice!

		this._loadConfig().then(() =>{
			this._setupApps().then(() => {
				this._bootApp(this.getActiveApp().id);
			})
		});

		let foo = this._spawnAppContainer();
		this.log(foo);
	},


	computed: {
		activeApp () {
			return this.apps['market'];
		},

		wurst () {
			return Math.random().toString(36).substring(7);
		}
	},

	methods: {

		/**
		 * Write apps.json to this.apps
		 *
		 * @return Promise
		 */

		_loadConfig () {
			var deferred = $.Deferred();

			$.getJSON('/apps.json', (apps) => {
				this.apps = apps;
				deferred.resolve();
			});

			return deferred;
		},


		/**
		 * Setup all available apps
		 *
		 * @return Promise
		 */

		_setupApps () {
			var deferred = $.Deferred();

			_.map(this.apps, (no, i) => {
				requirejs([`${this.appPath}/${i}/js/boot.js`], ( app ) => {
					app.setup().then((data) => {
						this.apps[i] = data;
						if ( _.findLastKey(this.apps) === i)
							deferred.resolve();
					})
				}, (err) => {
					this.warn( 'OC._setupApps(): ' + err);
					deferred.reject(err);
				});
			});

			return deferred;
		},


		/**
		 * Boot an application
		 *
		 * @param obj app with appId as key
		 * @return Promise
		 */

		_bootApp (app) {
			var deferred = $.Deferred();

			requirejs([this.pathAppBoot(app)], ( app ) => {
				app.boot(this._spawnAppContainer());
				deferred.resolve();
			})

			return deferred;
		},

		_spawnAppContainer () {

			let attr = {
				id    : this.getRandom(),
				class : 'oc-app-container',
				text  : 'Loading ...'
			};

			// Reset app container
			$('#oc-content').html( $('<div>', attr ) );
			return `#${attr.id}`;
		},

		getRandom () {
			return 'c' + Math.random().toString(36).substring(2);
		},

		// ------------------------------------------------ logging, warning ---

		pathAppBoot( appname ) {
			return `${this.appPath}/${appname}/js/boot.js`;
		},

		// ------------------------------------------------ logging, warning ---

		log ( message ) {
			console.log( message );
		},

		warn ( message ) {
			console.warn( message );
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
