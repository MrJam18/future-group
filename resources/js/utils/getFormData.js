export function getFormData(ev) {
    const form = ev.currentTarget;
    const elements = form.elements;
    const data = {};
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const name = el.name;
        if (name)
            data[name] = el.value;
    }
    return data;
}
//# sourceMappingURL=getFormData.js.map