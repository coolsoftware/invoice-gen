import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import { invoiceService } from '_services';
import { formatDate } from '_helpers';

import { InvoicePDF } from 'InvoicePDF';

import jsPDF from 'jspdf';

import './InvoiceList.css';

function CreateInvoiceButton() {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            navigate("/");
        }} className="group-14-VxPVnb button" data-id="1:22">
            <div className="rectangle-4-S8UpFC" data-id="1:23"></div>
            <div className="create-new-invoice-S8UpFC" data-id="1:24">Create New Invoice</div>
        </div>
    );
}

function InvoiceListItem({index, id, number, date, sender, recipient, total, paid, setPaid, showPDF}) {
    return (
        <div className="group-16-zqxklK" data-id="6:26" style={{top:85+index*30}}>
            <div className="x001-PWUVxb roboto-normal-black-14px" data-id="1:13">{number}</div>
            <div className="dec-20th-2021-PWUVxb roboto-normal-black-14px" data-id="1:14">{formatDate(date)}</div>
            <div className="sender-name-PWUVxb roboto-normal-black-14px" data-id="1:15">{sender}</div>
            <div className="recipient-name-PWUVxb roboto-normal-black-14px" data-id="1:16">{recipient}</div>
            <div className="x100-PWUVxb roboto-normal-black-14px" data-id="1:17">{total}</div>
            <div className="no-PWUVxb roboto-normal-black-14px" data-id="1:19">{(paid && 'Yes') || 'No'}</div>
            {!paid && (
                <div onClick={setPaid} className="group-15-PWUVxb button" data-id="6:25">
                    <div className="rectangle-2-g2jxSw" data-id="1:20"></div>
                    <div className="paid-g2jxSw" data-id="1:21">Paid</div>
                </div>
            )}
            <div onClick={showPDF} className="group-15-PWUVxb-pdf button" data-id="6:25">
                <div className="rectangle-2-g2jxSw-pdf" data-id="1:20"></div>
                <div className="pdf-g2jxSw" data-id="1:21">PDF</div>
            </div>
        </div>
    );
}

export function InvoiceList() {

    const [invoiceList, setInvoiceList] = useState([]);
    const [error, setError] = useState(null);
    const [modalState, setModalState] = useState();
    const [viewInvoice, setViewInvoice] = useState();

    useEffect(() => {
        setError();
        invoiceService.getAll().then(
            all => {
                setInvoiceList(all);
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }, []);

    const setPaid = (id) => {
        invoiceService.paid(id).then(
            () => {
                setInvoiceList(invoiceList.map(invoice => {
                    if (id === invoice._id) {
                        invoice.paid = true;
                    }
                    return invoice;
                }));
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        )
    }

    const showPDF = (invoice) => {
        setViewInvoice(invoice);
        setModalState('view-pdf');
    }

    const closeModal = () => {
        setModalState();
    }

    const downloadPDF = (invoice) => {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4'
        });
        doc.html(
            renderToStaticMarkup(
               <InvoicePDF invoice={invoice} />
            ), 
            {
                callback: function (doc) {
                    const blob =  new Blob([ doc.output() ], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'invoice_'+invoice.number+'.pdf');
                    document.body.appendChild(link);
                    link.click();
                },
                x: 0,
                y: 0,
                html2canvas: {
                    scale: 0.7, //this was my solution, you have to adjust to your size
                    width: 1000 //for some reason width does nothing
                },
            }
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

    return (
        <>
            <div className="container-center-horizontal">
                <div className="il-frame-1 screen " data-id="1:2">
                    {error && 
                        <div className="alert alert-danger">{error}</div>
                    }
                    <div className="frame-2-VxPVnb" data-id="1:3">
                        <div className="group-17-zqxklK" data-id="6:27">
                            <div className="rectangle-1-bdUqxe" data-id="1:4"></div>
                            <div className="sender-bdUqxe roboto-normal-black-14px" data-id="1:10">Sender</div>
                            <div className="invoice-no-bdUqxe roboto-normal-black-14px" data-id="1:7">Invoice No.</div>
                            <div className="date-bdUqxe roboto-normal-black-14px" data-id="1:9">Date</div>
                            <div className="recipient-bdUqxe roboto-normal-black-14px" data-id="1:11">Recipient</div>
                            <div className="total-usd-bdUqxe roboto-normal-black-14px" data-id="1:12">Total</div>
                            <div className="paid-bdUqxe roboto-normal-black-14px" data-id="1:18">Paid</div>
                        </div>
                        {
                            invoiceList.map((invoice, index) => {
                                return (
                                    <InvoiceListItem 
                                        key={'invoice_'+index}
                                        index={index}
                                        id={invoice._id} 
                                        number={invoice.number} 
                                        date={invoice.date}
                                        sender={invoice.sender && invoice.sender.name}
                                        recipient={invoice.recipient && invoice.recipient.name}
                                        total={invoice.total}
                                        paid={invoice.paid}
                                        setPaid={() => setPaid(invoice._id)}
                                        showPDF={() => showPDF(invoice)}
                                    />
                                );
                            })
                        }
                    </div>
                    <CreateInvoiceButton />
                </div>
            </div>
            <div className="container-center-horizontal">
                <Modal 
                    isOpen={'view-pdf' === modalState}
                    onRequestClose={closeModal}
                    style={modalStyles}
                >
                    <InvoicePDF invoice={viewInvoice} />
                </Modal>
            </div>
        </>
    );
}
