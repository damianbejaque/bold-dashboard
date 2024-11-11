import React from "react"

export enum Status {
    'SUCCESSFUL' = 'SUCCESSFUL',
    'REJECTED' = 'REJECTED'
}


export interface myBussiness {
    status: Status
    paymentMethod: string
    id: string
    salesType: string
    createdAt: number
    transactionReference: number
    amount: number
    deduction?: number
    franchise?: string
}

export interface adaptedMyBussinessTable {
    [key: string]: string | number | React.ReactNode;
    'Transaccion': React.ReactNode
    'Fecha y hora': string
    'Metodo de pago': React.ReactNode
    'ID transaccion Bold': string
    'Monto': string | React.ReactNode
    amount: number
    id: string
}
