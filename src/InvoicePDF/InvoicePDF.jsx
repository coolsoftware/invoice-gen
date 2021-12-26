import React, { useState } from 'react';

import { invoiceService } from '_services';
import { formatDate } from '_helpers';
import { InvoiceSummary } from './InvoiceSummary';
import { InvoiceItemList, InvoiceItemsHeader, NewItemEditor } from './InvoiceItemList';

import './InvoicePDF.css';

function InvoiceDetails({number, date}) {
    return (
        <div className="group-8-zqxklK" data-id="3:71">
            <div className="group-6-rGJpD2" data-id="3:69">
                <div className="invoice-no-Z7ORtu roboto-bold-black-14px" data-id="1:21">Invoice No:</div>
                <div className="x002-Z7ORtu roboto-normal-black-14px" data-id="1:24">{number}</div>
            </div>
            <div className="group-7-rGJpD2" data-id="3:70">
                <div className="invoice-date-ETkACT roboto-bold-black-14px" data-id="1:22">Invoice Date:</div>
                <div className="dec-20th-2021-ETkACT roboto-normal-black-14px" data-id="1:25">{formatDate(date)}</div>
            </div>
        </div>
    );
}

function SenderDetails({name, inn}) {
    return (
        <div className="group-9-zqxklK" data-id="3:72">
            <div className="from-bqMZCy" data-id="1:5">FROM</div>
            <div className="sender-name-bqMZCy roboto-normal-black-14px" data-id="1:17">{name}</div>
            <div className="sender-inn-bqMZCy roboto-normal-black-14px" data-id="1:19">INN: {inn}</div>
            <img className="vector-bqMZCy" data-id="1:11" src="/resources/invoice_gen/vector@2x.svg" />
        </div>
    );
}

function RecipientDetails({name, inn}) {
    return (
        <div className="group-10-zqxklK" data-id="3:73">
            <div className="to-fT2hTi" data-id="1:6">TO</div>
            <div className="recipient-name-fT2hTi roboto-normal-black-14px" data-id="1:18">{name}</div>
            <div className="recipient-inn-fT2hTi roboto-normal-black-14px" data-id="1:20">INN: {inn}</div>
            <img className="vector-fT2hTi" data-id="1:15" src="/resources/invoice_gen/vector@2x.svg" />
        </div>
    );
}

function BankAccountDetails({bankName, accountName, accountNumber}) {
    return (
        <div className="group-11-zqxklK" data-id="3:74">
            <img className="vector-F3rz5N" data-id="3:56" src="/resources/invoice_gen/vector-4@2x.svg" />
            <div className="bank-name-F3rz5N roboto-normal-black-14px" data-id="3:59">{bankName}</div>
            <div className="account-name-F3rz5N roboto-normal-black-14px" data-id="8:76">{accountName}</div>
            <div className="account-number-F3rz5N roboto-normal-black-14px" data-id="8:78">{accountNumber}</div>
        </div>
    ); 
}

export function InvoicePDF({invoice}) {

    const invoiceNumber = invoice.number;
    const invoiceDate = invoice.date;
    const senderName = invoice.sender && invoice.sender.name;
    const senderINN = invoice.sender && invoice.sender.inn;
    const recipientName = invoice.recipient && invoice.recipient.name;
    const recipientINN = invoice.recipient && invoice.recipient.inn;
    const {bankName, accountName, accountNumber} = invoice.bankAccount || {
        bankName: '',
        accountName: '',
        accountNumber: '',
    }; 

    return (
        <div className="ipdf-frame-1 screen " data-id="1:4">
            {false /* <div className="frame-2-VxPVnb" data-id="1:37"> */}
                <div className="invoice-zqxklK" data-id="1:7">INVOICE</div>
                <InvoiceDetails 
                    number={invoiceNumber} 
                    date={invoiceDate} />
                <SenderDetails 
                    name={senderName} 
                    inn={senderINN} />
                <RecipientDetails 
                    name={recipientName} 
                    inn={recipientINN} />
                <BankAccountDetails 
                    bankName={bankName} 
                    accountName={accountName} 
                    accountNumber={accountNumber} />
                <div className="group-13-zqxklK" data-id="8:79">
                    <InvoiceItemsHeader />
                    <InvoiceItemList items={invoice.items} />
                </div>
                <InvoiceSummary items={invoice.items} />
            {false /* </div> */}
        </div>
    );
}