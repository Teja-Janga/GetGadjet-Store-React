
import { useEffect, useState } from "react";
import {API_BASE_URL} from '../../config';

export default function OrderDetailsModal({ order, close }) {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (order) {
            fetch(`${API_BASE_URL}/api-get-order-details.php?order_id=${order.ID}`)
            .then(res => res.json())
            .then(data => setDetails(data));
        }
    }, [order]);

    if(!order) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%',    //Primary
                      height: '100%', backgroundColor: 'rgba(0,0,0,0.8)',
                      display: 'flex', justifyContent: 'center',
                      alignItems: 'center', zIndex: 1000}}
        > 
            <div style={{backgroundColor: '#fff', padding: '30px',      //Secondary
                         borderRadius: '10px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.4)'}}
            >
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3>Order # {order.ID} Details</h3>
                    <button
                        onClick={close}
                        style={{color:'red', cursor:'pointer', border:'none', background: 'none', fontSize: '40px'}}
                    >
                        &times;
                    </button>
                </div>    

                <p><strong>Customer:</strong> {order.Customer_Name}</p><hr />
                
                <div style={{maxHeight:'300px', overflowY:'auto'}}>
                    {details.map(item => (
                        <div
                            key={item.ID}
                            style={{display:'flex', gap: '15px', marginBottom: '15px', alignItems: 'center'}}
                        >
                            <img
                                src={`${API_BASE_URL}\/images/${item.Image}`}
                                alt={item.Title}
                                style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px'}}
                            />
                            <div style={{flex:1}}>
                                <div style={{ fontWeight: 'bold' }}>{item.Title}</div>
                                <div style={{ color: '#666', fontSize: '14px' }}>{item.Quantity} x ₹{parseFloat(item.Price).toLocaleString()}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                    <span>Total:</span>
                    <span>₹{parseFloat(order.Total_Amount).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}