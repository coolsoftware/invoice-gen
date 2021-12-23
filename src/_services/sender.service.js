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

function save(id, sender) {
    const requestOptions = { 
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(sender),
    };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/companies/${id}`, requestOptions).then(handleResponse);
}