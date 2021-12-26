import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import { invoiceService } from '_services';
import { formatDate } from '_helpers';

import { InvoiceSummary } from './InvoiceSummary';
import { InvoiceItemList, InvoiceItemsHeader, NewItemEditor } from './InvoiceItemList';

import { SelectSender } from 'SelectSender';
import { SelectRecipient } from 'SelectRecipient';
import { SelectBankAccount } from 'SelectBankAccount';

import './InvoiceGen.css';

function SaveInvoiceButton({onClick, enabled}) {
    return (
        <div onClick={onClick} className="group-14-AxCvTw button" data-id="9:80">
            {enabled && (
                <div className="rectangle-4-TM18I2" data-id="2:48"></div>
            )}
            {!enabled && (
                <div className="rectangle-4-TM18I2 disabled" data-id="2:48"></div>
            )}
            <div className="save-invoice-TM18I2 roboto-bold-white-18px" data-id="2:49">Create Invoice</div>
        </div>
    );
}

function ViewInvoicesButton() {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            navigate("/invoices/");            
        }} className="group-16-AxCvTw button" data-id="9:82">
            <div className="rectangle-4-T3ixir" data-id="9:83"></div>
            <div className="view-invoices-T3ixir roboto-bold-white-18px" data-id="9:84">View Invoices</div>
        </div>
    );
}

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

function SenderDetails({name, inn, edit}) {
    return (
        <div className="group-9-zqxklK" data-id="3:72">
            <div className="from-bqMZCy" data-id="1:5">FROM</div>
            <div className="sender-name-bqMZCy roboto-normal-black-14px" data-id="1:17">{name || 'Please, select...'}</div>
            <div className="sender-inn-bqMZCy roboto-normal-black-14px" data-id="1:19">INN: {inn}</div>
            <img className="vector-bqMZCy" data-id="1:11" src="/resources/invoice_gen/vector@2x.svg" />
            <img onClick={edit} 
                className="vector-n4cKQK button" data-id="1:44" src="/resources/invoice_gen/vector-1@2x.svg" />
        </div>
    );
}

function RecipientDetails({name, inn, edit}) {
    return (
        <div className="group-10-zqxklK" data-id="3:73">
            <div className="to-fT2hTi" data-id="1:6">TO</div>
            <div className="recipient-name-fT2hTi roboto-normal-black-14px" data-id="1:18">{name || 'Please, select...'}</div>
            <div className="recipient-inn-fT2hTi roboto-normal-black-14px" data-id="1:20">INN: {inn}</div>
            <img className="vector-fT2hTi" data-id="1:15" src="/resources/invoice_gen/vector@2x.svg" />
            <img onClick={edit}
                className="vector-8shKQw button" data-id="1:46" src="/resources/invoice_gen/vector-1@2x.svg" />
        </div>
    );
}

function BankAccountDetails({bankName, accountName, accountNumber, edit}) {
    return (
        <div className="group-11-zqxklK" data-id="3:74">
            <img className="vector-F3rz5N" data-id="3:56" src="/resources/invoice_gen/vector-4@2x.svg" />
            <div className="bank-name-F3rz5N roboto-normal-black-14px" data-id="3:59">{bankName || 'Please, select...'}</div>
            <img onClick={edit} 
                className="vector-qohgBx button" data-id="3:61" src="/resources/invoice_gen/vector-1@2x.svg" />
            <div className="account-name-F3rz5N roboto-normal-black-14px" data-id="8:76">{accountName}</div>
            <div className="account-number-F3rz5N roboto-normal-black-14px" data-id="8:78">{accountNumber}</div>
        </div>
    ); 
}

export function InvoiceGen() {

    const [invoiceItems, setInvoiceItems] = useState([]);
    const [invoiceNumber, setInvoiceNumber] = useState();
    const [invoiceDate, setInvoiceDate] = useState();
    const [senderId, setSenderId] = useState();
    const [senderName, setSenderName] = useState();
    const [senderINN, setSenderINN] = useState();
    const [recipientId, setRecipientId] = useState();
    const [recipientName, setRecipientName] = useState();
    const [recipientINN, setRecipientINN] = useState();
    const [bankAccountId, setBankAccountId] = useState();
    const [bankName, setBankName] = useState();
    const [accountName, setAccountName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState();

    const navigate = useNavigate();

    const closeModal = () => {
        setModalState();
    }

    const openSenderModal = () => {
        setModalState('edit-sender');
    }

    const openRecipientModal = () => {
        setModalState('edit-recipient');
    }

    const openBankAccountModal = () => {
        setModalState('edit-bankaccount');
    }

    useEffect(() => {
        newInvoice();
    }, []);

    const newInvoice = () => {
        setError();
        invoiceService.newInvoice().then(
            invoice => {
                setInvoiceNumber(invoice.number);
                setInvoiceDate(invoice.date && new Date(Date.parse(invoice.date)));
                setSenderId(invoice.sender && invoice.sender._id);
                setSenderName(invoice.sender && invoice.sender.name);
                setSenderINN(invoice.sender && invoice.sender.inn);
                setInvoiceItems(invoice.items);
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const removeItem = (index) => {
        setInvoiceItems([
            ...invoiceItems.slice(0, index),
            ...invoiceItems.slice(index+1)
        ]);
    }

    const addItem = (item) => {
        if (!item.name || !item.qty || !item.rate) {
            // need alert message here ...
            return;
        }
        setInvoiceItems([
            ...invoiceItems,
            item
        ]);
    }

    const saveInvoice = () => {
        if (!senderId || !recipientId || !bankAccountId || !invoiceItems.length) return;
        setError();
        const total = invoiceItems.reduce((prev, cur) => prev+(cur.qty*cur.rate), 0);
        invoiceService.createInvoice({
            number: invoiceNumber,
            date: invoiceDate,
            items: invoiceItems,
            total,
            sender: {
                _id: senderId,
                name: senderName,
                inn: senderINN,
            },
            recipient: {
                _id: recipientId,
                name: recipientName,
                inn: recipientINN,
            },
            bankAccount: {
                _id: bankAccountId,
                bankName,
                accountName,
                accountNumber,
            },
        }).then(
            () => {
                //newInvoice();
                navigate("/invoices/");
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const createInvoiceEnabled = senderId && senderName && recipientId && bankAccountId && (invoiceItems.length > 0);

    return (
        <>
            <div className="container-center-horizontal">
                {error && 
                    <div className="alert alert-danger">{error}</div>
                }
                <div className="ig-frame-1 screen " data-id="1:4">
                    <div className="frame-2-VxPVnb" data-id="1:37">
                        <div className="invoice-zqxklK" data-id="1:7">INVOICE</div>
                        <InvoiceDetails 
                            number={invoiceNumber} 
                            date={invoiceDate} />
                        <SenderDetails 
                            name={senderName} 
                            inn={senderINN} 
                            edit={openSenderModal} />
                        <RecipientDetails 
                            name={recipientName} 
                            inn={recipientINN} 
                            edit={openRecipientModal} />
                        <BankAccountDetails 
                            bankName={bankName} 
                            accountName={accountName} 
                            accountNumber={accountNumber} 
                            edit={openBankAccountModal} />
                        <div className="group-13-zqxklK" data-id="8:79">
                            <InvoiceItemsHeader />
                            <InvoiceItemList 
                                items={invoiceItems} 
                                remove={removeItem} />
                            <NewItemEditor 
                                items={invoiceItems} 
                                add={addItem} />
                        </div>
                        <InvoiceSummary items={invoiceItems} />
                    </div>
                    <div className="group-17-VxPVnb" data-id="10:85">
                        <SaveInvoiceButton 
                            onClick={saveInvoice} 
                            enabled = {createInvoiceEnabled} />
                        <ViewInvoicesButton />
                    </div>
                </div>
            </div>
            <div className="container-center-horizontal">
                <Modal 
                    isOpen={'edit-sender' === modalState}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <SelectSender 
                        onSelect={sender => {
                            setSenderId(sender._id);
                            setSenderName(sender.name);
                            setSenderINN(sender.inn);
                            closeModal();
                        }}
                    />
                </Modal>
                <Modal
                    isOpen={'edit-recipient' === modalState}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <SelectRecipient
                        onSelect={recipient => {
                            setRecipientId(recipient._id);
                            setRecipientName(recipient.name);
                            setRecipientINN(recipient.inn);
                            closeModal();
                        }}
                    />
                </Modal>
                <Modal
                    isOpen={'edit-bankaccount' === modalState}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <SelectBankAccount
                        onSelect={account => {
                            setBankAccountId(account._id);
                            setBankName(account.bankName);
                            setAccountName(account.accountName);
                            setAccountNumber(account.accountNumber);
                            closeModal();
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}