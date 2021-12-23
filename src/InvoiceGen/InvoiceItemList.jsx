import React, {useState} from 'react';

function InvoiceItem({index, name, qty, rate, remove}) {
    return (
        <div className="group-18-Blfza8" data-id="10:91" style={{top: 54+index*20}}>
            <div className="item-1-4Hyxdo roboto-normal-black-14px" data-id="10:86">{name}</div>
            <div className="x2-4Hyxdo roboto-normal-black-14px" data-id="10:87">{qty}</div>
            <div className="x15-4Hyxdo roboto-normal-black-14px" data-id="10:89">{rate}</div>
            <div className="x30-4Hyxdo roboto-normal-black-14px" data-id="10:90">{qty * rate}</div>
            <img onClick={remove} className="vector-4Hyxdo button" data-id="10:99" src="/resources/invoice_gen/vector-6@2x.svg" />
        </div>
    );
}

export function InvoiceItemList({items, remove}) {
    return items.map((item, index) => (
        <InvoiceItem 
            key={'item_'+index} 
            index={index} 
            name={item.name} 
            qty={item.qty} 
            rate={item.rate} 
            remove={() => remove(index)}
        />
    ));
}

export function InvoiceItemsHeader() {
    return (
        <div className="group-2-Blfza8" data-id="2:53">
            <div className="rectangle-1-Pua9Ri" data-id="1:26"></div>
            <div className="item-Pua9Ri roboto-normal-black-14px" data-id="1:27">Item</div>
            <div className="qty-Pua9Ri roboto-normal-black-14px" data-id="1:28">QTY</div>
            <div className="rate-usd-Pua9Ri roboto-normal-black-14px" data-id="1:29">Rate (USD)</div>
            <div className="subtotal-usd-Pua9Ri roboto-normal-black-14px" data-id="1:30">Subtotal (USD)</div>
        </div>
    );
}

export function NewItemEditor({items, add}) {
    const [itemFields, setItemFields] = useState({
        name: '',
        qty: '',
        rate: '',
    });
    const onItemFieldChange = (e) => {
        setItemFields({
            ...itemFields,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="group-12-Blfza8" data-id="3:75" style={{top:68+items.length*20}}>
            <div className="group-22-sxsHhV" data-id="19:7">
                <div className="rectangle-6-516QrC border-1px-silver" data-id="3:65"></div>
                <input value={itemFields.name} onChange={onItemFieldChange} 
                    className="item-name-516QrC roboto-normal-black-12px" data-id="18:2" name="name" placeholder="Item Name" type="text" />
            </div>
            <div className="group-21-sxsHhV" data-id="19:6">
                <div className="rectangle-7-jzLcDJ border-1px-silver" data-id="3:66"></div>
                <input value={itemFields.qty} onChange={onItemFieldChange} 
                    className="quantity-jzLcDJ roboto-normal-black-12px" data-id="18:3" name="qty" placeholder="Quantity" type="text" />
            </div>
            <div className="group-20-sxsHhV" data-id="19:5">
                <div className="rectangle-8-xLs1X2 border-1px-silver" data-id="3:67"></div>
                <input value={itemFields.rate} onChange={onItemFieldChange}
                    className="rate-xLs1X2 roboto-normal-black-12px" data-id="18:4" name="rate" placeholder="Rate" type="text" />
            </div>
            <div onClick={() => {
                    add(itemFields); 
                    setItemFields({
                        name: '',
                        qty: '',
                        rate: '',
                    });
            }} className="group-19-sxsHhV button" data-id="10:95">
                {itemFields.name && itemFields.qty && itemFields.rate && (
                    <div className="rectangle-9-VThcb8" data-id="10:92"></div>
                )}
                {(!itemFields.name || !itemFields.qty || !itemFields.rate) && (
                    <div className="rectangle-9-VThcb8 disabled" data-id="10:92"></div>
                )}
                <div className="add-item-VThcb8" data-id="10:93">Add Item</div>
            </div>
        </div>
    );
}