export class HtmlHelper {
    static innerHTML(selector, html) {
        if (typeof html === 'number')
            html = String(html);
        const element = document.querySelector(selector);
        if (element instanceof Element)
            element.innerHTML = html;
        else
            throw new Error(`can't find element with selector ${selector}.`);
    }
    static foreach(selector, callback) {
        // @ts-ignore
        document.querySelectorAll(selector).forEach(callback);
    }
    static addClickEvent(selector, callback) {
        // @ts-ignore
        document.querySelector(selector).addEventListener('click', callback);
    }
    static createAndInsertElement(selector, position = 'append', tag = 'div') {
        const element = document.createElement(tag);
        if (position === 'append')
            document.querySelector(selector).append(element);
        else
            document.querySelector(selector).prepend(element);
        return element;
    }
    static remove(selector) {
        document.querySelector(selector).remove();
    }
    static removeClass(selector, className) {
        document.querySelector(selector).classList.remove(className);
    }
    static addClass(selector, className) {
        document.querySelector(selector).classList.add(className);
    }
    static foreachClick(selector, callback) {
        document.querySelectorAll(selector).forEach((el) => {
            el.addEventListener('click', callback);
        });
    }
    static onSubmit(selector, callback) {
        document.querySelector(selector).addEventListener('submit', (ev) => {
            ev.preventDefault();
            callback(ev);
        });
    }
}
//# sourceMappingURL=HtmlHelper.js.map