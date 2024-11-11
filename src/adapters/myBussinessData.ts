import { myBussiness } from "../types/myBussiness";

export const myBussinessData = (data: myBussiness[]): myBussiness[] => {
    return data.map(item => ({
        status: item.status,
        paymentMethod: item.paymentMethod,
        id: item.id,
        salesType: item.salesType,
        createdAt: item.createdAt,
        transactionReference: item.transactionReference,
        amount: item.amount,
        deduction: item.deduction || 0,
        franchise: item.franchise || '',
    }));
};
