import React, { useState, useEffect } from 'react';

import {senderService} from '_services';

import './SelectSender.css';

export function SelectSender({onSelect}) {
    const [senderId, setSenderId] = useState(null);
    const [senderFields, setSenderFields] = useState({
        name: '',
        inn: '',
    });
    const [error, setError] = useState();

    const onSenderFieldChange = (e) => {
        setSenderFields({
            ...senderFields,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        loadDefaultSender();
    }, []);

    const loadDefaultSender = () => {
        setError();
        return senderService.getDefault().then(
            ({_id, ...sender}) => {
                setSenderId(_id);
                setSenderFields({
                    ...senderFields,
                    ...sender
                });
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const saveSender = () => {
        if (!senderFields.name || !senderFields.inn) {
            return;
        }
        setError();
        senderService.save(senderId, senderFields).then(
            () => {
                loadDefaultSender().then(() => {
                    if (onSelect) onSelect({
                        _id: senderId,
                        ...senderFields
                    });
                });
            },
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const saveEnabled = senderFields.name && senderFields.inn;

    return (
        <div className="container-center-horizontal">
            <div className="ss-frame-1 screen " data-id="1:2">
                <div className="group-4-VxPVnb" data-id="1:18">
                    <img className="user-alt-8yD7Zo" data-id="1:3" src="/resources/select_sender/vector@2x.svg" />
                    <div className="sender-8yD7Zo" data-id="1:5">Sender</div>
                </div>
                <div className="group-2-VxPVnb" data-id="1:16">
                    <div className="rectangle-6-IHYDQL" data-id="1:8"></div>
                    <input value={senderFields.name} onChange={onSenderFieldChange}
                        className="sender-name-IHYDQL" data-id="1:9" name="name" placeholder="Sender Name" type="text" />
                </div>
                <div className="group-3-VxPVnb" data-id="1:17">
                    <div className="rectangle-7-z17040" data-id="1:10"></div>
                    <input value={senderFields.inn} onChange={onSenderFieldChange}
                        className="sender-inn-z17040" data-id="1:11" name="inn" placeholder="Sender INN" type="text" />
                </div>
                <div onClick={saveSender} className="group-1-VxPVnb button" data-id="1:15">
                    {saveEnabled && (
                        <div className="rectangle-8-MQwLM3" data-id="1:12"></div>
                    )}
                    {!saveEnabled && (
                        <div className="rectangle-8-MQwLM3 disabled" data-id="1:12"></div>
                    )}
                    <div className="save-MQwLM3" data-id="1:14">Save</div>
                </div>
            </div>
            {error && 
                <div className="alert alert-danger">{error}</div>
            }
        </div>
    );
}