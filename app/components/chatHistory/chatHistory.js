(function() {
	'use strict';

	class ChatHistory {
		constructor ({ el }) {
			this.el = el;
			this.el.classList.add('chatHistory');
			this.evaluateTemplate();
			this.chatHistory = [];
		}

		evaluateTemplate () {
			this.newMessageTemplate = doT.template(`
				<div class="chatHistory__message{{? it.login === '${this.login}' }}_mine{{?}}"><span>{{=it.login}}: </span>{{=it.text}} <span>{{=it.date}}</span></div>
			`);
		}

		appendMessage (message) {
			this.chatHistory.push(message);
			const newMessageHtml = this.newMessageTemplate({
				login: this.login,
				text: message.text,
				date: (new Date()).format('dd.mm.yyyy HH:MM:ss')
			});
			this.el.insertAdjacentHTML('beforeEnd', newMessageHtml);
		}

		render (options) {
			if (options && options.hidden)
				this.el.hidden = options.hidden;
			this.el.innerHTML = '';
			let resultHtml = '';
			this.chatHistory.forEach((message) => {
				resultHtml += this.newMessageTemplate(message);
			});
			this.el.insertAdjacentHTML('beforeEnd', resultHtml);
		}

		show () {
			this.el.hidden = false;
		}

		hide () {
			this.el.hidden = true;
		}

		setLogin (login) {
			this.login = login;
			this.evaluateTemplate();
			this.chatHistory = ChatHistory.getData();
			this.render();
		}

		static getData () {
			return [
				{
					login: "1",
					text: 'Первое сообщение',
					date: '14.05.2017 21:44:00'
				},
				{
					login: "1",
					text: 'Второе сообщение',
					date: '14.05.2017 21:45:00'
				},
				{
					login: "2",
					text: 'Третье сообщение',
					date: '14.05.2017 21:46:00'
				}
			];
		}
	}

	//export
	window.ChatHistory = ChatHistory;
})();