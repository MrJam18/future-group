import axios from "axios";
export const api = axios.create({
    baseURL: '/api',
    timeout: 3000,
    headers: {
        Accept: 'application/json'
    }
});
//# sourceMappingURL=api.js.map