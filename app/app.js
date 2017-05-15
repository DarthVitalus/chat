(function() {
	'use strict';

	class App {
		constructor ({ el, renderNow }) {
			this.el = el;
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
				el: document.createElement('div')
			});
		}

		_initEventHandlers () {
			this.loginForm.on('applyLogin',
				(event) => {
					this.chatHistory.render({ hidden: true });
					this.messageBox.render({ hidden: true });

					this.messageBox.setLogin(event.detail.login);
					this.chatHistory.setLogin(event.detail.login);

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
					this.chatHistory.appendMessage({
						text: event.detail.text
					});

					if (event.detail.callback)
						event.detail.callback();
				}
			);
		}
	}

	//export
	window.App = App;
})();