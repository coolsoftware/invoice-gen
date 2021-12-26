import { Config } from '_config';
import { handleResponse } from '_helpers';

export const senderService = {
    getDefault,
    save,
}

function getDefault() {
    const requestOptions = { method: 'GET' };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/companies/default`, requestOptions).then(handleResponse);
}

function save(id, {name, inn, address}) {
    const requestOptions = { 
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ name, inn, address }),
    };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/companies/${id}`, requestOptions).then(handleResponse);
}