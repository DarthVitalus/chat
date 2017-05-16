(function() {
	'use strict';

	class App {
		constructor ({ el, db, renderNow }) {
			this.el = el;
		    this.db = db;
			this._initChildElements();
			this._initEventHandlers();
			if (renderNow)
				this.render();
		}

		render () {
			this.loginForm.render();

			this.el.appendChild(this.loginForm.el);
		}

		_initChildElements () {
			this.loginForm = new LoginForm({
				el: document.createElement('div')
			});
			this.messageBox = new MessageBox({
				el: document.createElement('div')		
			});
			this.chatHistory = new ChatHistory({
			    el: document.createElement('div'),
                db: this.db
			});
		}

		_initEventHandlers () {
			this.loginForm.on('applyLogin',
				(event) => {
				    this.login = event.detail.login;
				    this.messageBox.setLogin(this.login);
				    this.chatHistory.setLogin(this.login);

				    this._refreshChatHistory();

					this.chatHistory.render({ hidden: true });
					this.messageBox.render({ hidden: true });

					this.el.appendChild(this.chatHistory.el);
					this.el.appendChild(this.messageBox.el);

					this.loginForm.hide();
					this.messageBox.show();
					this.chatHistory.show();

					if (event.detail.callback)
						event.detail.callback();
				}
			);

			this.messageBox.on('sendMessage',
				(event) => {
				    const message = {
				        login: this.login,
				        text: event.detail.text,
                        date: (new Date()).toUTCString()
				    };
				    //this.chatHistory.appendMessage(message);

				    this.db.post('messages', message);

					if (event.detail.callback)
						event.detail.callback();
				}
			);
		}

		_refreshChatHistory () {
		    this.chatHistory.loadData(this.lastChecked);
		    this.lastChecked = new Date();
		    this.serverTimer = setTimeout(() => { this._refreshChatHistory() }, 1000);
		}
	}

	//export
	window.App = App;
})();