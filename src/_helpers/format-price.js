export function formatPrice(amount, currency) {
    if (typeof amount == 'string' && amount) {
        amount = parseFloat(amount); 
    }
    if (typeof amount !== 'number' || Number.isNaN(amount)) {
        return amount;
    }
    switch (currency) {
        case 'USD':
            return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
        case 'RUB':
            return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(amount);
        case 'CZK':
            return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency }).format(amount);
        case 'EUR':
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(amount);
        default:
            return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    }
}