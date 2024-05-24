export const currencyFormatter = (amount) => {
    const formater = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formater.format(amount);
}