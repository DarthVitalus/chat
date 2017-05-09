(function() {
	'use strict';

	class MessageBox {
		constructor ({ el }) {
			this.el = el;
			this.el.classList.add('messageBox');
			this.initElements();
			this._initEvents();
		}

		initElements () {
			this.newMessage = 
		}

		render () {
			this.el.innerHTML = `
				<textarea type="text" class="messageBox__newMessage"></textarea>
				<input value="Отправить" class="messageBox__sendBtn"/>
			`;

			this.sendBtn = this.el.querySelector('.messageBox__sendBtn');
			this.newMessage = this.el.querySelector('.messageBox__newMessage');
		}

		_initEvents() {
			//this.sendBtn.addEventListener('click', this._onSendMessageClick.bind(this));
			this.el.addEventListener('click', (event) => { if (event.target.matches('.messageBox__sendBtn')) this._sendMessage(event); });
		}

		_sendMessage(event) {
			if (!event.target.matches('.messageBox__sendBtn')) return;

			const text = this.newMessage.value;
			if (!text) return;
			
			const sendMessageEvent = new CustomEvent(
				'sendMessage',
				{
					text: text,
					callback: this._sendMessageCallback.bind(this)
				}
			);
			this.dispatchEvent(sendMessageEvent);
		}

		_sendMessageCallback() {
			this.newMessage.textContent = '';
		}

		//_onSendMessageClick(event) {
		//	this._onSendMessageClickHandler();
		//}

		//_onSendMessageClickHandler() {
		//}

		//hide () {
		//	this.el.hidden = true;
		//}

		//show () {
		//	this.el.hidden = false;
		//}

		//fill ({ login, password }) {
		//	this._getElement('login').textContent = login;
		//	this._getElement('password').textContent = password;
		//}

		//setOnReturnClickHandler (handler) {
		//	this._onReturnClickHandler = handler;
		//}

		//_getElement (name) {
		//	return this.el.querySelector(`[name="${name}"]`);
		//}
	}

	//export

	window.MessageBox = MessageBox;
})();