export function getCSRF() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta)
        return meta.getAttribute('content');
    return null;
}
//# sourceMappingURL=getCSRF.js.map