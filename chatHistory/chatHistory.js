(function() {
	'use strict';

	class ChatHistory {
		constructor({ el }) {
			this.el = el;
			this.el.classList.add('chatHistory');
			this.newMessageTemplate = doT.template('<div class="chatHistory__message">{{=it.text}}</div>');
		}

		appendMessage(message) {
			this.chatHistory.push(message);
			const newMessageHTML = this.newMessageTemplate({ text: message.text });
			this.el.insertAdjacentHTML("beforeEnd", newMessageHTML);
		}

		render() {
			this.chatHistory = ChatHistory.getData();
			let resultHTML = '';
			this.chatHistory.forEach((message) => {
				resultHTML += this.newMessageTemplate(message);
			});
			this.el.insertAdjacentHTML("beforeEnd", resultHTML);
		}

		static getData() {
			return [
				{
					text: 'Первое сообщение'
				},
				{
					text: 'Второе сообщение'
				},
				{
					text: 'Третье сообщение'
				}
			];
		}
	}

	//export
	window.ChatHistory = ChatHistory;
})();