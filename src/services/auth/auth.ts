import { AuthAdapter } from '../../api/fetchAuth';

const authAdapter = new AuthAdapter();

export const loginAuth = async (data: object) => {
    const response: any = await authAdapter.post('/login', data);
    if (response.data.token) {
        localStorage.setItem("x-access-token", response.data.token);
    }

    return response;
}

export const verifyToken = async () => {
    const response: any = await authAdapter.get('/auth').catch((err) => {
        localStorage.removeItem("x-access-token");
    });

    return response;
}