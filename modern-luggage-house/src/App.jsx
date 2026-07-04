import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "923001234567"; // Replace with real number

const initialProducts = [
  { id: 1, name: "Explorer Pro Backpack", category: "School Bags", price: 2500, image: "🎒", description: "Durable 30L backpack with laptop compartment. Ideal for students.", inStock: true },
  { id: 2, name: "Kids Cartoon Bag", category: "School Bags", price: 1200, image: "🎒", description: "Lightweight colorful bag for primary school kids.", inStock: true },
  { id: 3, name: "Elite Travel Trolley 24\"", category: "Suitcases", price: 8500, image: "🧳", description: "Hard-shell 4-wheel spinner. TSA lock. 24 inch.", inStock: true },
  { id: 4, name: "Business Carry-On 20\"", category: "Suitcases", price: 6500, image: "🧳", description: "Cabin-size lightweight trolley with organizer pockets.", inStock: true },
  { id: 5, name: "Family Set 28\"", category: "Suitcases", price: 12000, image: "🧳", description: "Large 28-inch expandable suitcase for family travel.", inStock: false },
  { id: 6, name: "Ladies Tote Bag", category: "Handbags", price: 1800, image: "👜", description: "Spacious leather-look tote. Fits A4 documents.", inStock: true },
  { id: 7, name: "Crossbody Sling", category: "Handbags", price: 1400, image: "👜", description: "Compact anti-theft crossbody for daily use.", inStock: true },
  { id: 8, name: "Office Laptop Bag", category: "Handbags", price: 2200, image: "💼", description: "Professional 15.6\" laptop bag with shoulder strap.", inStock: true },
  { id: 9, name: "Duffle Travel Bag", category: "Travel Bags", price: 3200, image: "🪣", description: "40L weekend bag with shoe compartment.", inStock: true },
  { id: 10, name: "Hiking Backpack 50L", category: "Travel Bags", price: 4500, image: "🎒", description: "Waterproof trekking bag with chest strap.", inStock: true },
  { id: 11, name: "Auto Open Umbrella", category: "Umbrellas", price: 850, image: "☂️", description: "Windproof auto open/close. UV protection coating.", inStock: true },
  { id: 12, name: "Golf Umbrella XL", category: "Umbrellas", price: 1500, image: "☂️", description: "Extra large 130cm golf umbrella. Fiberglass ribs.", inStock: true },
];

const CATEGORIES = ["All", "School Bags", "Suitcases", "Handbags", "Travel Bags", "Umbrellas"];

const ADMIN_PASSWORD = "admin123";

export default function App() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = sessionStorage.getItem("mlh_products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch { return initialProducts; }
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("shop"); // shop | admin | cart
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", category: "School Bags", price: "", image: "🎒", description: "", inStock: true });
  const [showAddForm, setShowAddForm] = useState(false);
  const [orders, setOrders] = useState(() => {
    try {
      const saved = sessionStorage.getItem("mlh_orders");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    try { sessionStorage.setItem("mlh_products", JSON.stringify(products)); } catch {}
  }, [products]);

  useEffect(() => {
    try { sessionStorage.setItem("mlh_orders", JSON.stringify(orders)); } catch {}
  }, [orders]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const buildWhatsAppMsg = () => {
    const lines = cart.map(i => `• ${i.name} x${i.qty} = Rs. ${(i.price * i.qty).toLocaleString()}`);
    const msg = `Assalam o Alaikum! Main order karna chahta/chahti hoon:\n\n${lines.join("\n")}\n\nTotal: Rs. ${totalPrice.toLocaleString()}\n\nPlease confirm availability. Shukriya!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    const order = {
      id: Date.now(),
      items: [...cart],
      total: totalPrice,
      status: "Pending",
      date: new Date().toLocaleString("en-PK"),
    };
    setOrders(prev => [order, ...prev]);
    window.open(buildWhatsAppMsg(), "_blank");
    setCart([]);
    setView("shop");
    showToast("Order sent via WhatsApp!");
  };

  const adminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setAdminError("");
      setView("admin");
    } else {
      setAdminError("Wrong password. Try: admin123");
    }
  };

  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const saveEdit = () => {
    setProducts(prev => prev.map(p => p.id === editProduct.id ? editProduct : p));
    setEditProduct(null);
    showToast("Product updated!");
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p = { ...newProduct, id: Date.now(), price: parseInt(newProduct.price) };
    setProducts(prev => [...prev, p]);
    setNewProduct({ name: "", category: "School Bags", price: "", image: "🎒", description: "", inStock: true });
    setShowAddForm(false);
    showToast("Product added!");
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const categoryEmoji = { "School Bags": "🎒", "Suitcases": "🧳", "Handbags": "👜", "Travel Bags": "🪣", "Umbrellas": "☂️" };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: "#F8F6F1", color: "#1A1F3C" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .playfair { font-family: 'Playfair Display', serif; }
        .btn-gold { background: #D4A843; color: #1A1F3C; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-gold:hover { background: #c49a38; transform: translateY(-1px); }
        .btn-navy { background: #1A1F3C; color: #F8F6F1; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-navy:hover { background: #252d56; }
        .btn-ghost { background: transparent; color: #1A1F3C; border: 2px solid #1A1F3C; padding: 8px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .btn-wa { background: #25D366; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 15px; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .btn-wa:hover { background: #1da851; transform: translateY(-1px); }
        .card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 12px rgba(26,31,60,0.08); transition: transform 0.2s, box-shadow 0.2s; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(26,31,60,0.14); }
        input, select, textarea { border: 1.5px solid #e2e0db; border-radius: 8px; padding: 9px 13px; font-size: 14px; width: 100%; font-family: inherit; outline: none; background: white; }
        input:focus, select:focus, textarea:focus { border-color: #D4A843; }
        .tag { display: inline-block; background: #F0EDE6; color: #6B7280; font-size: 11px; padding: 3px 9px; border-radius: 20px; font-weight: 500; }
        .badge { background: #D4A843; color: #1A1F3C; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .tab { padding: 8px 18px; border-radius: 20px; border: none; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; background: transparent; color: #6B7280; }
        .tab.active { background: #1A1F3C; color: #D4A843; }
        .toast { position: fixed; bottom: 30px; right: 30px; background: #1A1F3C; color: white; padding: 12px 22px; border-radius: 10px; font-size: 14px; z-index: 9999; border-left: 4px solid #D4A843; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .out-of-stock { opacity: 0.55; }
        @media (max-width: 600px) { .hero-title { font-size: 28px !important; } .grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* NAVBAR */}
      <nav style={{ background: "#1A1F3C", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🧳</span>
          <div>
            <div className="playfair" style={{ color: "#D4A843", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>Modern Luggage House</div>
            <div style={{ color: "#9CA3AF", fontSize: 11 }}>Shah Alam Market, Lahore</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="tab" style={{ color: view === "shop" ? "#D4A843" : "#9CA3AF" }} onClick={() => setView("shop")}>Shop</button>
          <button className="tab" style={{ color: view === "admin" ? "#D4A843" : "#9CA3AF" }} onClick={() => { if (!adminAuth) setView("adminlogin"); else setView("admin"); }}>Admin</button>
          <button onClick={() => setView("cart")} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#F8F6F1", fontWeight: 600, fontSize: 14 }}>
            🛒
            {cart.length > 0 && <span className="badge">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* SHOP VIEW */}
      {view === "shop" && (
        <>
          {/* HERO */}
          <div style={{ background: "linear-gradient(135deg, #1A1F3C 0%, #2d3565 100%)", padding: "60px 24px 50px", textAlign: "center" }}>
            <div className="playfair hero-title" style={{ fontSize: 38, color: "#F8F6F1", marginBottom: 10, lineHeight: 1.2 }}>
              Travel in <span style={{ color: "#D4A843" }}>Style</span>
            </div>
            <p style={{ color: "#9CA3AF", fontSize: 16, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
              Premium bags, suitcases & travel gear — Shah Alam Market, Lahore
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-wa">💬 Chat on WhatsApp</button>
              </a>
              <button className="btn-gold" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
                Browse Products
              </button>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div style={{ padding: "24px 24px 12px", display: "flex", gap: 8, overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} className="tab" style={{ background: activeCategory === cat ? "#D4A843" : "#EDE9E1", color: activeCategory === cat ? "#1A1F3C" : "#6B7280", fontWeight: 600, borderRadius: 20, padding: "8px 18px" }} onClick={() => setActiveCategory(cat)}>
                {cat !== "All" ? categoryEmoji[cat] + " " : ""}{cat}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div style={{ padding: "12px 24px 20px", maxWidth: 480, margin: "0 auto" }}>
            <input placeholder="🔍 Search bags, suitcases, umbrellas..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* PRODUCTS */}
          <div id="products" style={{ padding: "0 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 60, color: "#9CA3AF" }}>
                <div style={{ fontSize: 48 }}>🔍</div>
                <p style={{ marginTop: 12 }}>No products found</p>
              </div>
            )}
            <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {filtered.map(p => (
                <div key={p.id} className={`card ${!p.inStock ? "out-of-stock" : ""}`}>
                  <div style={{ background: "linear-gradient(135deg, #EDE9E1, #F8F6F1)", height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
                    {p.image}
                  </div>
                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ marginBottom: 6 }}>
                      <span className="tag">{p.category}</span>
                      {!p.inStock && <span className="tag" style={{ background: "#fee2e2", color: "#dc2626", marginLeft: 4 }}>Out of Stock</span>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: "#1A1F3C" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10, lineHeight: 1.4 }}>{p.description}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="playfair" style={{ fontSize: 18, fontWeight: 700, color: "#D4A843" }}>Rs. {p.price.toLocaleString()}</div>
                      <button className="btn-navy" disabled={!p.inStock} onClick={() => addToCart(p)} style={{ padding: "7px 14px", fontSize: 12, opacity: p.inStock ? 1 : 0.4 }}>
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ background: "#1A1F3C", padding: "32px 24px", textAlign: "center" }}>
            <div className="playfair" style={{ color: "#D4A843", fontSize: 20, marginBottom: 8 }}>Modern Luggage House</div>
            <p style={{ color: "#9CA3AF", fontSize: 13 }}>Shah Alam Market, Lahore, Pakistan</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ color: "#25D366", fontSize: 13, textDecoration: "none", display: "inline-block", marginTop: 8 }}>
              💬 +92 300 1234567
            </a>
          </div>
        </>
      )}

      {/* CART VIEW */}
      {view === "cart" && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }}>
          <button onClick={() => setView("shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, marginBottom: 20 }}>← Back to Shop</button>
          <div className="playfair" style={{ fontSize: 28, marginBottom: 24 }}>Your Cart</div>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#9CA3AF" }}>
              <div style={{ fontSize: 48 }}>🛒</div>
              <p style={{ marginTop: 12 }}>Cart is empty</p>
              <button className="btn-gold" style={{ marginTop: 16 }} onClick={() => setView("shop")}>Browse Products</button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="card" style={{ display: "flex", gap: 14, padding: 16, marginBottom: 12, alignItems: "center" }}>
                  <div style={{ fontSize: 36, background: "#F0EDE6", borderRadius: 10, padding: "8px 12px" }}>{item.image}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                    <div style={{ color: "#D4A843", fontWeight: 700, fontSize: 15 }}>Rs. {(item.price * item.qty).toLocaleString()}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: "#EDE9E1", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontWeight: 700 }}>−</button>
                    <span style={{ fontWeight: 600, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: "#EDE9E1", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontWeight: 700 }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer" }}>✕</button>
                  </div>
                </div>
              ))}

              <div style={{ background: "white", borderRadius: 14, padding: "20px 24px", marginTop: 20, boxShadow: "0 2px 12px rgba(26,31,60,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#6B7280" }}>Total ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "#1A1F3C" }}>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <button className="btn-wa" style={{ width: "100%", justifyContent: "center", fontSize: 16 }} onClick={placeOrder}>
                  💬 Order via WhatsApp
                </button>
                <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
                  Your order details will be sent directly to our WhatsApp
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* ADMIN LOGIN */}
      {view === "adminlogin" && (
        <div style={{ maxWidth: 380, margin: "80px auto", padding: "0 24px" }}>
          <div className="card" style={{ padding: 32 }}>
            <div className="playfair" style={{ fontSize: 24, marginBottom: 6 }}>Admin Login</div>
            <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 24 }}>Modern Luggage House Panel</p>
            <input type="password" placeholder="Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && adminLogin()} style={{ marginBottom: 12 }} />
            {adminError && <p style={{ color: "#dc2626", fontSize: 12, marginBottom: 12 }}>{adminError}</p>}
            <button className="btn-navy" style={{ width: "100%" }} onClick={adminLogin}>Login</button>
            <button onClick={() => setView("shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 13, marginTop: 14, display: "block", width: "100%", textAlign: "center" }}>← Back to Shop</button>
          </div>
        </div>
      )}

      {/* ADMIN PANEL */}
      {view === "admin" && adminAuth && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div className="playfair" style={{ fontSize: 28 }}>Admin Panel</div>
              <p style={{ color: "#6B7280", fontSize: 13 }}>Manage products & orders</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-gold" onClick={() => setShowAddForm(true)}>+ Add Product</button>
              <button className="btn-ghost" onClick={() => { setAdminAuth(false); setView("shop"); }}>Logout</button>
            </div>
          </div>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
            {[
              { label: "Total Products", value: products.length, icon: "📦" },
              { label: "In Stock", value: products.filter(p => p.inStock).length, icon: "✅" },
              { label: "Total Orders", value: orders.length, icon: "📋" },
              { label: "Pending", value: orders.filter(o => o.status === "Pending").length, icon: "⏳" },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#D4A843" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ADD PRODUCT FORM */}
          {showAddForm && (
            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Add New Product</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input placeholder="Product name" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
                <select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
                <input placeholder="Price (Rs.)" type="number" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} />
                <select value={newProduct.image} onChange={e => setNewProduct(p => ({ ...p, image: e.target.value }))}>
                  {["🎒", "🧳", "👜", "💼", "🪣", "☂️"].map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <textarea placeholder="Description" rows={2} value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} style={{ marginTop: 12 }} />
              <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                <label style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="checkbox" checked={newProduct.inStock} onChange={e => setNewProduct(p => ({ ...p, inStock: e.target.checked }))} style={{ width: "auto" }} />
                  In Stock
                </label>
                <div style={{ flex: 1 }} />
                <button className="btn-gold" onClick={addProduct}>Add Product</button>
                <button className="btn-ghost" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* PRODUCTS TABLE */}
          <div className="card" style={{ marginBottom: 28 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #F0EDE6", fontWeight: 700 }}>Products ({products.length})</div>
            {products.map(p => (
              <div key={p.id}>
                {editProduct?.id === p.id ? (
                  <div style={{ padding: "14px 20px", borderBottom: "1px solid #F0EDE6", background: "#FDFBF8" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <input value={editProduct.name} onChange={e => setEditProduct(p => ({ ...p, name: e.target.value }))} />
                      <select value={editProduct.category} onChange={e => setEditProduct(p => ({ ...p, category: e.target.value }))}>
                        {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                      </select>
                      <input type="number" value={editProduct.price} onChange={e => setEditProduct(p => ({ ...p, price: parseInt(e.target.value) }))} />
                      <select value={editProduct.image} onChange={e => setEditProduct(p => ({ ...p, image: e.target.value }))}>
                        {["🎒", "🧳", "👜", "💼", "🪣", "☂️"].map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>
                    <textarea rows={2} value={editProduct.description} onChange={e => setEditProduct(p => ({ ...p, description: e.target.value }))} style={{ marginBottom: 10 }} />
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <label style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
                        <input type="checkbox" checked={editProduct.inStock} onChange={e => setEditProduct(p => ({ ...p, inStock: e.target.checked }))} style={{ width: "auto" }} />
                        In Stock
                      </label>
                      <div style={{ flex: 1 }} />
                      <button className="btn-gold" onClick={saveEdit}>Save</button>
                      <button className="btn-ghost" onClick={() => setEditProduct(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "12px 20px", borderBottom: "1px solid #F0EDE6", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{p.image}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                        <span className="tag">{p.category}</span>
                        <span className="tag" style={{ background: p.inStock ? "#dcfce7" : "#fee2e2", color: p.inStock ? "#16a34a" : "#dc2626" }}>{p.inStock ? "In Stock" : "Out of Stock"}</span>
                      </div>
                    </div>
                    <div className="playfair" style={{ fontWeight: 700, color: "#D4A843", minWidth: 90, textAlign: "right" }}>Rs. {p.price.toLocaleString()}</div>
                    <button className="btn-ghost" style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => setEditProduct({ ...p })}>Edit</button>
                    <button onClick={() => deleteProduct(p.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ORDERS */}
          <div className="card">
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #F0EDE6", fontWeight: 700 }}>Orders ({orders.length})</div>
            {orders.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#9CA3AF" }}>No orders yet</div>
            ) : orders.map(o => (
              <div key={o.id} style={{ padding: "14px 20px", borderBottom: "1px solid #F0EDE6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>Order #{String(o.id).slice(-6)}</div>
                    <div style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>{o.date}</div>
                    <div style={{ marginTop: 6 }}>
                      {o.items.map(i => (
                        <div key={i.id} style={{ fontSize: 12, color: "#6B7280" }}>{i.image} {i.name} x{i.qty}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="playfair" style={{ fontWeight: 700, color: "#D4A843", fontSize: 16 }}>Rs. {o.total.toLocaleString()}</div>
                    <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)} style={{ marginTop: 8, fontSize: 12, padding: "4px 8px", width: "auto", color: o.status === "Completed" ? "#16a34a" : o.status === "Cancelled" ? "#dc2626" : "#D4A843" }}>
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
