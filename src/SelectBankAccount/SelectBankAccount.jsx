import React, { useState, useEffect } from 'react';

import {bankAccountService} from '_services';

import './SelectBankAccount.css';

const bankAccountHeight = 90;

function BankAccountItem({index, bankAccount, onSelect}) {
    return (
        <div className="group-2-8yD7Zo" data-id="1:4" style={{top:18+index*bankAccountHeight}}>
            <img className="vector-dqbQN8" data-id="1:5" src="/resources/select_bankaccount/vector@2x.svg" />
            <div onClick={() => onSelect(bankAccount)} className="group-1-dqbQN8 button" data-id="1:6">
                <div className="rectangle-1-21VLxy" data-id="1:7"></div>
                <div className="select-21VLxy" data-id="1:8">Select</div>
            </div>
            <div className="bank-name-dqbQN8 roboto-normal-black-14px" data-id="1:9">{bankAccount.bankName}</div>
            <div className="account-name-dqbQN8 roboto-normal-black-14px" data-id="1:10">{bankAccount.accountName}</div>
            <div className="account-number-dqbQN8 roboto-normal-black-14px" data-id="1:22">{bankAccount.accountNumber}</div>
        </div>
    );
}

function BankAccountList({bankAccounts, onSelect}) {
    return (<>
        {bankAccounts.map((bankAccount, index) => 
            <BankAccountItem
                key={'bankacc_'+index}
                index={index}
                bankAccount={bankAccount}
                onSelect={onSelect}
            />
        )}
    </>);
}

export function SelectBankAccount({onSelect}) {

    const [bankAccountFields, setBankAccountFields] = useState({
        bankName: '',
        accountName: '',
        accountNumber: '',
        currency: 'USD',
    });
    const [bankAccounts, setBankAccounts] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        loadBankAccounts();
    }, []);

    const loadBankAccounts = () => {
        setError();
        return bankAccountService.getAll().then(
            bankAccounts => {
                setBankAccounts(bankAccounts);
            }, 
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const onBankAccountFieldChange = (e) => {
        setBankAccountFields({
            ...bankAccountFields,
            [e.target.name]: e.target.value
        });
    }

    const createNewBankAccount = () => {
        if (!bankAccountFields.bankName || !bankAccountFields.accountName || !bankAccountFields.accountNumber) {
            return;
        }
        setError();
        bankAccountService.create(bankAccountFields).then(
            bankAccount => {
                if (onSelect) onSelect(bankAccount);
            }, 
            error => setError(typeof error === 'string' ? error : error.toString())
        );
    }

    const createEnabled = bankAccountFields.bankName && bankAccountFields.accountName && bankAccountFields.accountNumber;

    return (
        <div className="container-center-horizontal">
            <div className="sba-frame-1 screen " data-id="1:2">
                {bankAccounts.length > 0 && (<>
                    <div className="please-select-bank-account-8yD7Zo" data-id="1:11">Please select bank account:</div>
                    <div className="group-4-VxPVnb" data-id="1:3">
                        <BankAccountList bankAccounts={bankAccounts} onSelect={onSelect} />
                    </div>
                </>)}
                <div className="group-4-VxPVnb-bottom" style={{top:78+Math.min(bankAccounts.length,2)*bankAccountHeight}}>
                    {bankAccounts.length > 0 && (<>
                        <div className="or-create-new-one-8yD7Zo" data-id="1:12">Or create new one:</div>
                        <img className="line-1-VxPVnb" data-id="2:26" src="/resources/select_bankaccount/line-1@2x.svg" />
                    </>)}
                    <div className="group-2-VxPVnb" data-id="1:13">
                        <div className="rectangle-6-IHYDQL border-1px-silver" data-id="1:14"></div>
                        <input value={bankAccountFields.bankName} onChange={onBankAccountFieldChange}
                            className="bank-name-IHYDQL roboto-normal-black-14px" data-id="1:15" name="bankName" placeholder="Bank Name" type="text" />
                    </div>
                    <div className="group-5-VxPVnb" data-id="1:16">
                        <div className="rectangle-7-OxrO5u border-1px-silver" data-id="1:17"></div>
                        <input value={bankAccountFields.accountName} onChange={onBankAccountFieldChange}
                            className="account-name-OxrO5u roboto-normal-black-14px" data-id="1:18" name="accountName" placeholder="Account Name" type="text" />
                    </div>
                    <div className="group-7-VxPVnb" data-id="1:23">
                        <div className="rectangle-7-tEzywy border-1px-silver" data-id="1:24"></div>
                        <input value={bankAccountFields.accountNumber} onChange={onBankAccountFieldChange}
                            className="account-number-tEzywy roboto-normal-black-14px" data-id="1:25" name="accountNumber" placeholder="Account Number" type="text" />
                    </div>
                    <div onClick={createNewBankAccount} className="group-6-VxPVnb button" data-id="1:19">
                        {createEnabled && (
                            <div className="rectangle-8-tqxTCL" data-id="1:20"></div>
                        )}
                        {!createEnabled && (
                            <div className="rectangle-8-tqxTCL disabled" data-id="1:20"></div>
                        )}
                        <div className="create-account-tqxTCL" data-id="1:21">Create New Account</div>
                    </div>
                </div>
            </div>
            {error && 
                <div className="alert alert-danger">{error}</div>
            }
        </div>
    );
}