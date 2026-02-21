
export default function Navbar({ activeCategory, setActiveCategory, setSearchTerm }) {
    return (
        <div>
            <h1>GetGadjet - React Frontend</h1>
            <div style={{ display:'flex', gap:'10px', marginBottom:'20px'}}>
                {["All", "Mobile Phone", "Laptop"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: '1px solid #007bff',
                            backgroundColor: activeCategory === cat ? '#007bff' : "#fff",
                            color: activeCategory === cat ? '#fff' : "#007bff",
                            cursor: 'pointer'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder='Search gadgets or categories...'
                style={{
                    padding:'10px',
                    width:'100%',
                    maxWidth:'400px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <hr />
        </div>
    )
}