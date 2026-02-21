
import { useState } from 'react';
import {API_BASE_URL} from '../../config';

export default function AddProduct() {
    const [formData, setFormData] = useState({ title: '', price: '', category: 'Mobile Phone', description: '' });
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(); // Required for file uploads!
        data.append('title', formData.title);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('image', image);

        fetch(`${API_BASE_URL}/api-upload-product.php`, {
            method: 'POST',
            body: data 
        })
        .then(res => res.json())
        .then(resData => {
            alert(resData.message);
            if(resData.status === 'success') window.location.reload(); // Refresh to see new product
        });
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', border: '1px solid #ddd' }}>
            <h3>Add New Gadget 🚀</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Product Title" required onChange={e => setFormData({...formData, title: e.target.value})} />
                <input type="number" placeholder="Price" required onChange={e => setFormData({...formData, price: e.target.value})} />
                <select onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Mobile Phone">Mobile Phone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} />
                <input type="file" accept="image/*" required onChange={e => setImage(e.target.files[0])} />
                <button type="submit" style={{ background: '#333', color: '#fff', padding: '10px', cursor: 'pointer' }}>Upload Product</button>
            </form>
        </div>
    );
}