(function() {
	'use strict';

	class MessageBox {
		constructor ({ el }) {
			this.el = el;
			this.el.classList.add('messageBox');
			this._initElements();
			this._initEvents();
		}

		_initElements () {
			this.newMessage = document.createElement('textarea');
			this.newMessage.setAttribute('type', 'text');
			this.newMessage.classList.add('messageBox__newMessage');

			this.sendBtn = document.createElement('input');
			this.sendBtn.setAttribute('value', 'Отправить');
			this.sendBtn.classList.add('messageBox__sendBtn');
		}

		_initEvents() {
			this.sendBtn.addEventListener('click', () => { this._sendMessage(); });
			this.el.addEventListener('keypress',
				(e) => {
					if (e.keyCode === 13) {
						e.preventDefault();
						this._sendMessage();
					}
				});
		}

		_sendMessage() {
			const text = this.newMessage.value;
			if (!text) return;

			const sendMessageEvent = new CustomEvent(
				'sendMessage',
				{
					detail: {
						text: text,
						callback: this._sendMessageCallback.bind(this)
					}
				}
			);
			this.el.dispatchEvent(sendMessageEvent);
		}

		_sendMessageCallback() {
			this.newMessage.value = '';
		}

		render() {
			this.el.appendChild(this.newMessage);
			this.el.appendChild(this.sendBtn);
		}
	}

	//export
	window.MessageBox = MessageBox;
})();