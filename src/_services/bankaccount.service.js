import { Config } from '_config';
import { handleResponse } from '_helpers';

export const bankAccountService = {
    getAll,
    create,
}

function getAll() {
    const requestOptions = { method: 'GET' };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/bankaccounts`, requestOptions).then(handleResponse);
}

function create({ accountName, accountNumber, bankName, currency }) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ accountName, accountNumber, bankName, currency }),
    };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/bankaccounts/create`, requestOptions).then(handleResponse);
}
