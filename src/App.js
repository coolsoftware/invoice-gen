import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { InvoiceGen } from './InvoiceGen';
import { InvoiceList } from './InvoiceList';
import { SelectSender } from './SelectSender';
import { SelectBankAccount } from './SelectBankAccount';
import { SelectRecipient } from './SelectRecipient';
import { NoPage } from './NoPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={
                        <InvoiceGen />
                    } />
                    <Route path="/invoices" element={
                        <InvoiceList />
                    } />
                    <Route path="/sender" element={
                        <SelectSender />
                    } />
                    <Route path="/bankaccount" element={
                        <SelectBankAccount />
                    } />
                    <Route path="/recipient" element={
                        <SelectRecipient />
                    } />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
