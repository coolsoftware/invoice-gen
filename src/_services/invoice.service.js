import { Config } from '_config';
import { handleResponse } from '_helpers';

export const invoiceService = {
    getAll,
    newInvoice,
    createInvoice,
    paid,
}

function getAll() {
    const requestOptions = { method: 'GET' };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/invoices`, requestOptions).then(handleResponse);
}

function newInvoice() {
    const requestOptions = { method: 'POST' };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/invoices/new`, requestOptions).then(handleResponse);
}

function createInvoice({ number, date, items, total, sender, recipient, bankAccount }) {
    const requestOptions = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ number, date, items, total, 
            sender: { _id: sender._id }, 
            recipient: { _id: recipient._id }, 
            bankAccount: { _id: bankAccount._id }
        }),
    };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/invoices/create`, requestOptions).then(handleResponse);
}

function paid(id) {
    const requestOptions = { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            paid: true,
        }),
    };
    const {apiUrl} = Config.get();
    return fetch(`${apiUrl}/invoices/${id}`, requestOptions).then(handleResponse);
}