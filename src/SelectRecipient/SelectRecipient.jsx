import React, { useState, useEffect } from 'react';

import {recipientService} from '_services';

import './SelectRecipient.css';

const recipientHeight = 60;

function RecipientItem({index, recipient, onSelect}) {
    return (
        <div className="group-2-8yD7Zo" data-id="1:15" style={{top:18+index*recipientHeight}}>
            <img className="vector-dqbQN8" data-id="1:6" src="/resources/select_recipient/vector@2x.svg" />
            <div onClick={() => onSelect(recipient)} className="group-1-dqbQN8 button" data-id="1:13">
                <div className="rectangle-1-21VLxy" data-id="1:11"></div>
                <div className="select-21VLxy" data-id="1:12">Select</div>
            </div>
            <div className="recipient-name-dqbQN8 roboto-normal-black-14px" data-id="1:25">{recipient.name}</div>
            <div className="recipient-inn-dqbQN8 roboto-normal-black-14px" data-id="1:26">INN: {recipient.inn}</div>
        </div>
    );
}

function RecipientList({recipients, onSelect}) {
    return (<>
        {recipients.map((recipient, index) => 
            <RecipientItem 
                key={'recipient_'+index}
                index={index} 
                recipient={recipient} 
                onSelect={onSelect} 
            />
        )}
    </>);
}

export function SelectRecipient({onSelect}) {

    const [recipientFields, setRecipientFields] = useState({
        name: '',
        inn: '',
    });
    const [recipients, setRecipients] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        loadRecipients();
    }, []);

    const loadRecipients = () => {
        setError();
        recipientService.getAll().then(
            recipients => {
                setRecipients(recipients);
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const onRecipientFieldChange = (e) => {
        setRecipientFields({
            ...recipientFields,
            [e.target.name]: e.target.value
        });
    }

    const createNewRecipient = () => {
        if (!recipientFields.name || !recipientFields.inn) {
            return;
        }
        setError();
        recipientService.create(recipientFields).then(
            recipient => {
                if (onSelect) onSelect(recipient);
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const createEnabled = recipientFields.name && recipientFields.inn;

    return (
        <div className="container-center-horizontal">
            <div className="sr-frame-1 screen " data-id="1:2">
                {recipients.length > 0 && (<>
                    <div className="please-select-recepient-8yD7Zo" data-id="1:14">Please select recepient:</div>
                    <div className="group-4-VxPVnb" data-id="1:17">
                        <RecipientList recipients={recipients} onSelect={onSelect} />
                    </div>
                </>)}
                <div className="group-4-VxPVnb-bottom" style={{top:78+Math.min(recipients.length,2)*recipientHeight}}>
                    {recipients.length > 0 && (<>
                        <div className="or-create-new-one-8yD7Zo" data-id="1:18">Or create new one:</div>
                        <img className="line-1-VxPVnb" data-id="3:32" src="/resources/select_recipient/line-1@2x.svg" />
                    </>)}
                    <div className="group-2-VxPVnb" data-id="1:19">
                        <div className="rectangle-6-IHYDQL" data-id="1:20"></div>
                        <input value={recipientFields.name} onChange={onRecipientFieldChange}
                            className="recipient-name-IHYDQL roboto-normal-black-14px" data-id="1:21" name="name" placeholder="Recipient Name" type="text" />
                    </div>
                    <div className="group-5-VxPVnb" data-id="1:22">
                        <div className="rectangle-7-OxrO5u" data-id="1:23"></div>
                        <input value={recipientFields.inn} onChange={onRecipientFieldChange}
                            className="resipient-inn-OxrO5u roboto-normal-black-14px" data-id="1:24" name="inn" placeholder="Recipient INN" type="text" />
                    </div>
                    <div onClick={createNewRecipient} className="group-6-VxPVnb button" data-id="1:31">
                        {createEnabled && (
                            <div className="rectangle-8-tqxTCL" data-id="1:29"></div>
                        )}
                        {!createEnabled && (
                            <div className="rectangle-8-tqxTCL disabled" data-id="1:29"></div>
                        )}
                        <div className="create-new-recepient-tqxTCL" data-id="1:30">Create New Recepient</div>
                    </div>
                </div>
            </div>
            {error && 
                <div className="alert alert-danger">{error}</div>
            }
        </div>
    );
}