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
			this.el.innerHTML = `
			<textarea class="messageBox__newMessage" type="text"></textarea>
			<input class="messageBox__sendBtn" value="Отправить"/>
			`;

			this.newMessage = this.el.getElementsByClassName('messageBox__newMessage')[0];
			this.sendBtn = this.el.getElementsByClassName('messageBox__sendBtn')[0];
		}

		_initEvents () {
			this.sendBtn.addEventListener('click', () => { this._sendMessage(); });
			this.el.addEventListener('keypress',
				(e) => {
					if (e.keyCode === 13) {
						e.preventDefault();
						this._sendMessage();
					}
				});
		}

		_sendMessage () {
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

		_sendMessageCallback () {
			this.newMessage.value = '';
		}

		render (options) {
			if (options && options.hidden)
				this.el.hidden = options.hidden;
			this.el.appendChild(this.newMessage);
			this.el.appendChild(this.sendBtn);
		}

		show () {
			this.el.hidden = false;
		}

		hide () {
			this.el.hidden = true;
		}

		on (eventName, handler) {
			this.el.addEventListener(eventName, handler);
		}

		setLogin (login) {
			this.login = login;
		}
	}

	//export
	window.MessageBox = MessageBox;
})();