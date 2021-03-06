import { Config } from '_config';
import { handleResponse } from '_helpers';

export const recipientService = {
    getAll,
    create,
}

function getAll() {
    const requestOptions = { method: 'GET' };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/customers`, requestOptions).then(handleResponse);
}

function create({name, inn, address}) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ name, inn, address }),
    };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/customers/create`, requestOptions).then(handleResponse);
}
