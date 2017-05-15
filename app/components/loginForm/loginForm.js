(function() {
	'use strict';

	class LoginForm {
		constructor ({ el }) {
			this.el = el;
			this.el.classList.add('loginForm');
			this._initElements();
			this._initEvents();
		}

		_initElements () {
			this.el.innerHTML = `
			<input class="loginForm__login" value="Введите ваш логин"/>
			<input class="loginForm__applyBtn" value="Подтвердить"/>
			`;

			this.login = this.el.getElementsByClassName('loginForm__login')[0];
			this.applyBtn = this.el.getElementsByClassName('loginForm__applyBtn')[0];
		}

		_initEvents () {
			this.applyBtn.addEventListener('click', () => { this._applyLogin(); });
			this.el.addEventListener('keypress',
				(e) => {
					if (e.keyCode === 13) {
						e.preventDefault();
						this._applyLogin();
					}
				});
		}

		_applyLogin () {
			const login = this.login.value;
			if (!login) return;

			const applyLoginEvent = new CustomEvent(
				'applyLogin',
				{
					detail: {
						login: login,
						callback: this._applyLoginCallback.bind(this)
					}
				}
			);
			this.el.dispatchEvent(applyLoginEvent);
		}

		_applyLoginCallback () {
			this.el.hidden = true;
		}

		render (options) {
			if (options && options.hidden)
				this.el.hidden = options.hidden;
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
	}

	//export
	window.LoginForm = LoginForm;
})();