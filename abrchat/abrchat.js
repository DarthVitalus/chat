(function() {
	'use strict';

	class AbrChat {
		constructor({ el, renderNow }) {
			this.el = el;
			this._initChildElements();
			if (renderNow)
				this.render();
		}

		render() {
			this.el.appendChild(this.chatHistory.el);
			this.messageBox.render();
			this.el.appendChild(this.messageBox.el);
		}

		_initChildElements () {
			this.messageBox = new MessageBox({
				el: document.createElement('div')		
			});
			this.chatHistory = new ChatHistory({
				el: document.createElement('div')
			});

			this.messageBox.el.addEventListener('sendMessage',
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
	window.AbrChat = AbrChat;
})();