export class AlertsList {
    constructor() {
        this.alertHeight = 0;
        this.alertStep = 50;
        this.element = document.createElement('div');
        this.element.classList.add('alerts-list');
        document.body.append(this.element);
        const phoneMediaQuery = window.matchMedia("(max-width: 600px)");
        if (phoneMediaQuery.matches) {
            this.alertStep = 33;
        }
        phoneMediaQuery.addEventListener('change', (ev) => {
            if (ev.matches)
                this.alertStep = 33;
        });
    }
    addAlert(message, delay = 4500) {
        const alert = document.createElement('div');
        this.element.prepend(alert);
        if (this.element.childElementCount === 1) {
            this.element.lastElementChild.setAttribute('data-last', '');
        }
        alert.classList.add('alert__container');
        alert.insertAdjacentHTML('afterbegin', `
    <div class="alert">
        <div class="alert__message">${message}</div>
        <button type="button" class="alert__close-button" data-dismiss="alert" aria-label="Close">
            <img src="/img/xmark.svg" alt="x" class="alert__button-img">
        </button>
    </div>
    <div class="alert__margin"></div>
        `);
        setTimeout(() => {
            alert.style.transform = 'translate(-100%, 0)';
        });
        this.alertHeight += this.alertStep;
        this.element.style.height = this.alertHeight + 'px';
        setTimeout(() => {
            this.removeAlert(alert);
        }, delay);
        alert.querySelector('.alert__close-button').addEventListener('click', () => this.removeAlert(alert));
        return alert;
    }
    removeAlert(alert) {
        if (alert.hasAttribute('data-last')) {
            const alerts = document.querySelectorAll('.alert__container');
            const prevAlert = alerts[alerts.length - 2];
            if (prevAlert) {
                prevAlert.setAttribute('data-last', '');
            }
            this.element.style.transition = 'none';
        }
        else
            this.element.style.transition = 'height 250ms';
        alert.style.transform = 'translate(0)';
        setTimeout(() => {
            this.alertHeight -= this.alertStep;
            this.element.style.height = this.alertHeight + 'px';
            alert.remove();
        }, 250);
        return alert;
    }
}
//# sourceMappingURL=AlertsList.js.map