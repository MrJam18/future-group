import {stopPropagation} from "../../utils/stopPropagation.js";

export class Modal
{
    protected element: HTMLElement;
    private background: HTMLElement | null;
    private closeEvent: EventListenerOrEventListenerObject;
    private closeButton: HTMLElement;
    constructor(modalSelector: string)
    {
        this.element = document.querySelector(modalSelector);
        if(!this.element) throw new Error('cant find modal with selector ' + modalSelector);
        this.closeEvent = (ev)=> this.hide();
    }

    show()
    {
        this.element.classList.remove('none');
        this.element.classList.add('block');
        const parent = this.element.parentNode;
        this.background = document.createElement('div');
        this.background.classList.add('modal-background', 'opacity_0');
        parent.replaceChild(this.background, this.element);
        this.background.appendChild(this.element);
        this.background.addEventListener('click',this.closeEvent);
        this.element.addEventListener('click', stopPropagation);
        if(!this.closeButton) {
            this.closeButton = this.element.querySelector('.modal__close-button');
        }
        if (this.closeButton) this.closeButton.addEventListener('click', this.closeEvent);
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            this.background.classList.remove('opacity_0');
        }, 0);
    }

    hide()
    {
        this.background.classList.add('opacity_0');
        document.body.style.overflow = 'initial';
        if(this.closeButton) this.closeButton.removeEventListener('click', this.closeEvent);
        setTimeout(() => {
            this.element.classList.remove('block');
            this.element.classList.add('none');
            this.background.parentNode.replaceChild(this.element, this.background);
        }, 300);
    }
}
