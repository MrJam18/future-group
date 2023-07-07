export function getCSRF():string | null {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if(meta) return meta.getAttribute('content');
    return null;
}