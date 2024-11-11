// utils.test.ts
import {
    sumAllSales,
    formatDate,
    formatDateTime,
    transactionStatus,
    formatAmount,
    currentMonth,
    filterByTextInput,
    getFooterDate
} from './utils';
import { Status } from '../types/myBussiness';

describe('Utils Functions', () => {
    test('sumAllSales should return the sum of all amounts', () => {
        const data = [
            { amount: 100 },
            { amount: 200 },
            { amount: 300 },
        ];
        expect(sumAllSales(data)).toBe(600);
    });

    test('formatDate should format the date correctly', () => {
        const date = 1609459200000;
        expect(formatDate(date)).toBe(new Date(date).toLocaleDateString());
    });

    test('formatDateTime should format the date and time correctly', () => {
        const date = 1609459200000;
        const expected = `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString('es-CO', { hour12: false })}`;
        expect(formatDateTime(date)).toBe(expected);
    });

    test('transactionStatus should return correct status message', () => {
        expect(transactionStatus(Status.SUCCESSFUL)).toBe('Cobro exitoso');
        expect(transactionStatus(Status.REJECTED)).toBe('Cobro no realizado');
    });

    test('formatAmount should format the amount correctly', () => {
        const amount = 123456.78;
        expect(formatAmount(amount)).toBe(`$ ${new Intl.NumberFormat('es-MX').format(amount)}`);
    });

    test('currentMonth should return the current month with uppercase first letter', () => {
        const currentDate = new Date();
        const month = currentDate.toLocaleString('es-CO', { month: 'long' });
        const expected = month.charAt(0).toUpperCase() + month.slice(1);
        expect(currentMonth()).toBe(expected);
    });

    test('filterByTextInput should return all data when filterTextInput is empty', () => {
        const dataFilter = [
            {
                "id": "GZENQ6HQJ5YSY",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "NEQUI",
                "salesType": "TERMINAL",
                "createdAt": 1730937600000,
                "transactionReference": 5448,
                "amount": 2077467
            },
            {
                "id": "GZEN8UXW25DV7",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "PSE",
                "salesType": "TERMINAL",
                "createdAt": 1731340439155,
                "transactionReference": 4592,
                "amount": 8759857
            },
            {
                "id": "GZENFGQCK1SLM",
                "status": Status.REJECTED,
                "paymentMethod": "NEQUI",
                "salesType": "PAYMENT_LINK",
                "createdAt": 1731340439155,
                "transactionReference": 7651,
                "amount": 3769571
            },
            {
                "id": "GZENZ5S4HSB18",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "BANCOLOMBIA",
                "salesType": "TERMINAL",
                "createdAt": 1731110400000,
                "transactionReference": 2594,
                "amount": 1187649
            }];
        expect(filterByTextInput(dataFilter, '')).toEqual(dataFilter);
    });

    test('filterByTextInput should filter data based on filterTextInput', () => {
        const dataFilter = [
            {
                "id": "GZENQ6HQJ5YSY",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "NEQUI",
                "salesType": "TERMINAL",
                "createdAt": 1730937600000,
                "transactionReference": 5448,
                "amount": 2077467
            },
            {
                "id": "GZEN8UXW25DV7",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "PSE",
                "salesType": "TERMINAL",
                "createdAt": 1731340439155,
                "transactionReference": 4592,
                "amount": 8759857
            },
            {
                "id": "GZENFGQCK1SLM",
                "status": Status.REJECTED,
                "paymentMethod": "NEQUI",
                "salesType": "PAYMENT_LINK",
                "createdAt": 1731340439155,
                "transactionReference": 7651,
                "amount": 3769571
            },
            {
                "id": "GZENZ5S4HSB18",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "BANCOLOMBIA",
                "salesType": "TERMINAL",
                "createdAt": 1731110400000,
                "transactionReference": 2594,
                "amount": 1187649
            }];
        const filterTextInput = 'B18';
        const expected = [
            {
                "id": "GZENZ5S4HSB18",
                "status": Status.SUCCESSFUL,
                "paymentMethod": "BANCOLOMBIA",
                "salesType": "TERMINAL",
                "createdAt": 1731110400000,
                "transactionReference": 2594,
                "amount": 1187649
            },
        ];
        expect(filterByTextInput(dataFilter, filterTextInput)).toEqual(expected);
    });

    test('getFooterDate should return today\'s date when title is "hoy"', () => {
        const today = new Date();
        const expected = formatDate(today.getTime());
        expect(getFooterDate('hoy')).toBe(expected);
    });

    test('getFooterDate should return date range for "esta semana"', () => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const expected = `${lastWeek.toLocaleDateString()} - ${today.toLocaleDateString()}`;
        expect(getFooterDate('esta semana')).toBe(expected);
    });

    test('getFooterDate should return current month and year for other titles', () => {
        const today = new Date();
        const month = today.toLocaleString('es-CO', { month: 'long' });
        const expected = `${month.charAt(0).toUpperCase() + month.slice(1)}, ${today.getFullYear()}`;
        expect(getFooterDate('otro')).toBe(expected);
    });
});