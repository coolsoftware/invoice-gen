export function InvoiceSummary({items}) {
    return (
        <div className="group-5-zqxklK" data-id="3:63" style={{top:466+items.length*20}}>
            <div className="group-3-XBjSx2" data-id="2:54">
                <div className="rectangle-3-14PxCj" data-id="1:34"></div>
                <div className="invoice-summary-14PxCj roboto-bold-black-14px" data-id="1:35">Invoice Summary</div>
                <img className="line-2-14PxCj" data-id="1:41" src="/resources/invoice_gen/line-1@2x.svg" /><img className="line-3-14PxCj" data-id="1:42" src="/resources/invoice_gen/line-1@2x.svg" />
            </div>
            <div className="group-4-XBjSx2" data-id="3:62">
                <img className="line-1-OXJk8v" data-id="1:36" src="/resources/invoice_gen/line-1@2x.svg" />
                <div className="total-OXJk8v roboto-normal-black-14px" data-id="1:38">Total (USD):</div>
                <div className="x30-OXJk8v" data-id="1:40">{
                    items.reduce((prev, cur) => prev+(cur.qty*cur.rate), 0)
                }</div>
            </div>
        </div>
    );
}
