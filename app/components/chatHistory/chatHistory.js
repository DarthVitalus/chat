(function() {
	'use strict';

	class ChatHistory {
		constructor ({ el, db }) {
			this.el = el;
		    this.db = db;
			this.el.classList.add('chatHistory');
			this.evaluateTemplate();
			this.chatHistory = [];
		}

		evaluateTemplate () {
			this.newMessageTemplate = doT.template(`
				<div class="chatHistory__message{{? it.login === '${this.login}' }}_mine{{?}}"><span>{{=it.login}}: </span>{{=it.text}} <span>{{=it.date.format('dd.mm.yyyy HH:MM:ss')}}</span></div>
			`);
		}

		appendMessage (message) {
			this.chatHistory.push(message);
			const newMessageHtml = this.newMessageTemplate(message);
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
		}

		loadData (dateFrom) {
		    this.chatHistory = ChatHistory.getTestData();
        }

		static getTestData () {
			return [
				{
					login: "1",
					text: 'Первое сообщение',
					date: new Date('2017-05-01T13:14:15.000')
				},
				{
					login: "1",
					text: 'Второе сообщение',
					date: new Date('2017-05-02T13:14:15.000')
				},
				{
					login: "2",
					text: 'Третье сообщение',
					date: new Date('2017-05-03T13:14:15.000')
				}
			];
		}
	}

	//export
	window.ChatHistory = ChatHistory;
})();