(function() {
	'use strict';

	class ChatHistory {
		constructor({ el }) {
			this.el = el;
			this.el.classList.add('chatHistory');
		}

		appendMessage({ text }) {
			const newMessageEl = document.createElement('div');
			newMessageEl.classList.add('chatHistory__message');
			newMessageEl.textContent = text;
			this.el.appendChild(newMessageEl);
		}
	}

	//export
	window.ChatHistory = ChatHistory;
})();