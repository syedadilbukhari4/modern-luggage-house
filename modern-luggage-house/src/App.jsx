import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "923001234567";
const ADMIN_PASSWORD = "admin123";

const CATEGORY_ICONS = {
  "All": null,
  "School Bags": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="7" width="20" height="14" rx="2"/></svg>
  ),
  "Suitcases": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
  ),
  "Handbags": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  "Travel Bags": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
  ),
  "Umbrellas": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>
  ),
};

const initialProducts = [
  { id: 1, name: "Pro Series 30L Backpack", category: "School Bags", price: 2500, description: "Padded laptop compartment, water-resistant base, ergonomic straps. Fits 15.6\" laptops.", tag: "Bestseller", inStock: true },
  { id: 2, name: "Junior Lightweight Schoolbag", category: "School Bags", price: 1200, description: "Lightweight frame, breathable back panel, side water bottle pockets. Ages 6–12.", tag: "", inStock: true },
  { id: 3, name: "College Laptop Bag 15.6\"", category: "School Bags", price: 1800, description: "USB charging port, anti-theft back pocket, rain cover included.", tag: "New", inStock: true },
  { id: 4, name: "Hard Shell Trolley 24\"", category: "Suitcases", price: 8500, description: "Polycarbonate shell, 360° spinner wheels, TSA-approved combination lock.", tag: "Bestseller", inStock: true },
  { id: 5, name: "Cabin Carry-On 20\"", category: "Suitcases", price: 6500, description: "Airline cabin-size compliant. Expandable zip, interior organizer pockets.", tag: "", inStock: true },
  { id: 6, name: "Family Traveller 28\"", category: "Suitcases", price: 12000, description: "Extra-large capacity, reinforced corner guards, dual-zip main compartment.", tag: "New", inStock: false },
  { id: 7, name: "Soft Shell Trolley Set 3pc", category: "Suitcases", price: 15000, description: "20\"+24\"+28\" matching set. Durable Oxford fabric, retractable handle.", tag: "", inStock: true },
  { id: 8, name: "Ladies Leather Tote", category: "Handbags", price: 1800, description: "PU leather finish, magnetic snap closure, internal zip pocket. Fits A4 documents.", tag: "Trending", inStock: true },
  { id: 9, name: "Anti-Theft Crossbody", category: "Handbags", price: 1400, description: "Cut-resistant strap, RFID-blocking pocket, water-repellent shell.", tag: "", inStock: true },
  { id: 10, name: "Office Laptop Briefcase", category: "Handbags", price: 2200, description: "Professional 15.6\" briefcase. Separate organizer section, padded handle.", tag: "Bestseller", inStock: true },
  { id: 11, name: "Mini Shoulder Bag", category: "Handbags", price: 950, description: "Compact everyday bag. Chain strap, zipper closure, two interior pockets.", tag: "", inStock: true },
  { id: 12, name: "40L Duffle Weekender", category: "Travel Bags", price: 3200, description: "Separate shoe compartment, detachable shoulder strap, trolley sleeve.", tag: "", inStock: true },
  { id: 13, name: "Hiking Pack 50L", category: "Travel Bags", price: 4500, description: "Waterproof, chest & waist strap, ventilated back panel. Trekking-grade.", tag: "New", inStock: true },
  { id: 14, name: "Sports Gym Bag", category: "Travel Bags", price: 1600, description: "Vented shoe compartment, wet pocket, removable shoulder strap.", tag: "", inStock: true },
  { id: 15, name: "Auto Open/Close Umbrella", category: "Umbrellas", price: 850, description: "Windproof fiberglass ribs, UV-protective coating, compact folding design.", tag: "Bestseller", inStock: true },
  { id: 16, name: "Golf Umbrella 130cm", category: "Umbrellas", price: 1500, description: "Extra-large canopy, non-slip rubberized handle, double-canopy ventilation.", tag: "", inStock: true },
  { id: 17, name: "Kids Printed Umbrella", category: "Umbrellas", price: 550, description: "Lightweight, safety runner tip, easy-grip handle for children.", tag: "", inStock: true },
];

const CATEGORIES = ["All", "School Bags", "Suitcases", "Handbags", "Travel Bags", "Umbrellas"];

// SVG Icons
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

export default function App() {
  const [products, setProducts] = useState(() => {
    try { const s = sessionStorage.getItem("mlh_p"); return s ? JSON.parse(s) : initialProducts; } catch { return initialProducts; }
  });
  const [orders, setOrders] = useState(() => {
    try { const s = sessionStorage.getItem("mlh_o"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("shop"); // shop | cart | admin | adminlogin
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "School Bags", price: "", description: "", tag: "", inStock: true });
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("products"); // products | orders

  useEffect(() => { try { sessionStorage.setItem("mlh_p", JSON.stringify(products)); } catch {} }, [products]);
  useEffect(() => { try { sessionStorage.setItem("mlh_o", JSON.stringify(orders)); } catch {} }, [orders]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2800); };

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast("Added to cart");
  };
  const updateQty = (id, qty) => { if (qty < 1) setCart(p => p.filter(i => i.id !== id)); else setCart(p => p.map(i => i.id === id ? { ...i, qty } : i)); };
  const removeFromCart = (id) => setCart(p => p.filter(i => i.id !== id));

  const buildWAMsg = () => {
    const lines = cart.map(i => `- ${i.name} x${i.qty} = Rs. ${(i.price * i.qty).toLocaleString()}`);
    const msg = `Assalam o Alaikum,\n\nI would like to place an order:\n\n${lines.join("\n")}\n\nTotal: Rs. ${cartTotal.toLocaleString()}\n\nPlease confirm availability. Thank you.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const placeOrder = () => {
    if (!cart.length) return;
    const order = { id: Date.now(), items: [...cart], total: cartTotal, status: "Pending", date: new Date().toLocaleString("en-PK") };
    setOrders(p => [order, ...p]);
    window.open(buildWAMsg(), "_blank");
    setCart([]);
    setView("shop");
    showToast("Order sent via WhatsApp!");
  };

  const adminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) { setAdminAuth(true); setAdminErr(""); setView("admin"); }
    else setAdminErr("Incorrect password.");
  };

  const deleteProduct = (id) => { setProducts(p => p.filter(x => x.id !== id)); showToast("Product deleted"); };
  const saveEdit = () => { setProducts(p => p.map(x => x.id === editProduct.id ? editProduct : x)); setEditProduct(null); showToast("Product updated"); };
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts(p => [...p, { ...newProduct, id: Date.now(), price: parseInt(newProduct.price) }]);
    setNewProduct({ name: "", category: "School Bags", price: "", description: "", tag: "", inStock: true });
    setShowAddForm(false);
    showToast("Product added");
  };
  const updateOrderStatus = (id, status) => setOrders(p => p.map(o => o.id === id ? { ...o, status } : o));

  const statusColor = { "Pending": "#b45309", "Confirmed": "#1d4ed8", "Completed": "#15803d", "Cancelled": "#b91c1c" };
  const statusBg = { "Pending": "#fef3c7", "Confirmed": "#dbeafe", "Completed": "#dcfce7", "Cancelled": "#fee2e2" };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#f5f5f5", minHeight: "100vh", color: "#212121" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f5f5; }

        /* Navbar */
        .navbar { background: #1a237e; position: sticky; top: 0; z-index: 200; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
        .navbar-inner { max-width: 1280px; margin: 0 auto; padding: 0 16px; display: flex; align-items: center; gap: 12px; height: 60px; }
        .nav-brand { color: white; font-weight: 700; font-size: 15px; line-height: 1.2; white-space: nowrap; min-width: 0; }
        .nav-brand span { display: block; color: #ffd600; font-size: 13px; font-weight: 400; }
        .search-bar { flex: 1; display: flex; background: white; border-radius: 4px; overflow: hidden; min-width: 0; }
        .search-bar input { flex: 1; border: none; outline: none; padding: 9px 12px; font-size: 14px; min-width: 0; }
        .search-btn { background: #ffd600; border: none; padding: 0 14px; cursor: pointer; display: flex; align-items: center; color: #212121; flex-shrink: 0; }
        .nav-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
        .nav-btn { background: none; border: none; color: white; cursor: pointer; padding: 6px 10px; font-size: 13px; font-weight: 500; border-radius: 4px; display: flex; align-items: center; gap: 5px; transition: background 0.15s; white-space: nowrap; }
        .nav-btn:hover { background: rgba(255,255,255,0.12); }
        .cart-badge { background: #ffd600; color: #212121; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-left: 2px; }

        /* Category bar */
        .cat-bar { background: #283593; border-bottom: 1px solid #1a237e; }
        .cat-bar-inner { max-width: 1280px; margin: 0 auto; padding: 0 16px; display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }
        .cat-bar-inner::-webkit-scrollbar { display: none; }
        .cat-btn { background: none; border: none; color: rgba(255,255,255,0.85); padding: 10px 14px; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; display: flex; align-items: center; gap: 6px; border-bottom: 3px solid transparent; transition: all 0.15s; }
        .cat-btn:hover { color: white; background: rgba(255,255,255,0.08); }
        .cat-btn.active { color: #ffd600; border-bottom-color: #ffd600; }

        /* Layout */
        .page-wrapper { max-width: 1280px; margin: 0 auto; padding: 16px; }

        /* Product grid */
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
        @media (min-width: 640px) { .product-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; } }
        @media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; } }

        /* Product card */
        .p-card { background: white; border-radius: 4px; overflow: hidden; cursor: pointer; transition: box-shadow 0.2s; border: 1px solid #e0e0e0; }
        .p-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .p-card-img { background: #f9f9f9; height: 160px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #f0f0f0; position: relative; overflow: hidden; }
        @media (min-width: 640px) { .p-card-img { height: 180px; } }
        .p-card-body { padding: 10px 12px 12px; }
        .p-card-name { font-size: 13px; font-weight: 500; color: #212121; line-height: 1.4; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .p-card-desc { font-size: 11px; color: #757575; line-height: 1.4; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .p-card-price { font-size: 16px; font-weight: 700; color: #212121; margin-bottom: 8px; }
        .p-card-price span { font-size: 12px; font-weight: 400; color: #9e9e9e; }
        .tag-badge { display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 2px; margin-bottom: 6px; }
        .tag-bestseller { background: #fff3e0; color: #e65100; }
        .tag-new { background: #e8f5e9; color: #2e7d32; }
        .tag-trending { background: #fce4ec; color: #c62828; }
        .out-of-stock-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #9e9e9e; letter-spacing: 0.5px; }

        /* Buttons */
        .btn-primary { background: #ffd600; color: #212121; border: none; padding: 9px 16px; border-radius: 4px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.15s; width: 100%; }
        .btn-primary:hover { background: #f9c800; }
        .btn-primary:disabled { background: #e0e0e0; color: #9e9e9e; cursor: not-allowed; }
        .btn-secondary { background: white; color: #1a237e; border: 1.5px solid #1a237e; padding: 8px 16px; border-radius: 4px; font-weight: 600; font-size: 13px; cursor: pointer; width: 100%; margin-top: 6px; transition: all 0.15s; }
        .btn-secondary:hover { background: #e8eaf6; }
        .btn-wa { background: #25d366; color: white; border: none; padding: 11px 20px; border-radius: 4px; font-weight: 700; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; transition: background 0.15s; }
        .btn-wa:hover { background: #1da851; }
        .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 3px; border: none; cursor: pointer; font-weight: 500; }

        /* Cart */
        .cart-item { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid #f0f0f0; align-items: flex-start; }
        .cart-img { width: 70px; height: 70px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid #e0e0e0; }
        .qty-ctrl { display: flex; align-items: center; gap: 0; border: 1px solid #e0e0e0; border-radius: 3px; overflow: hidden; display: inline-flex; }
        .qty-btn { background: white; border: none; width: 28px; height: 28px; cursor: pointer; font-size: 16px; font-weight: 500; color: #212121; display: flex; align-items: center; justify-content: center; }
        .qty-btn:hover { background: #f5f5f5; }
        .qty-val { width: 32px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; }

        /* Mobile sticky cart */
        .sticky-cart { display: none; }
        @media (max-width: 767px) {
          .sticky-cart { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: #1a237e; color: white; padding: 12px 16px; align-items: center; justify-content: space-between; z-index: 150; box-shadow: 0 -2px 12px rgba(0,0,0,0.2); }
        }

        /* Section header */
        .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .section-title { font-size: 16px; font-weight: 700; color: #212121; }
        .section-meta { font-size: 12px; color: #757575; }

        /* Card / panel */
        .panel { background: white; border-radius: 4px; border: 1px solid #e0e0e0; }

        /* Admin table */
        .admin-row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #f5f5f5; }
        .admin-row:last-child { border-bottom: none; }

        /* Form */
        .form-input { border: 1.5px solid #e0e0e0; border-radius: 4px; padding: 9px 12px; font-size: 14px; width: 100%; font-family: inherit; outline: none; background: white; transition: border 0.15s; }
        .form-input:focus { border-color: #1a237e; }
        .form-label { font-size: 12px; font-weight: 600; color: #616161; margin-bottom: 4px; display: block; }
        .form-group { margin-bottom: 12px; }

        /* Toast */
        .toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #212121; color: white; padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: 500; z-index: 9999; box-shadow: 0 4px 16px rgba(0,0,0,0.2); white-space: nowrap; }
        @media (min-width: 768px) { .toast { bottom: 30px; } }

        /* Hero banner */
        .hero { background: linear-gradient(90deg, #1a237e 0%, #283593 60%, #3949ab 100%); padding: 28px 16px; margin-bottom: 16px; }
        .hero-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .hero-text h1 { color: white; font-size: 22px; font-weight: 700; line-height: 1.3; margin-bottom: 6px; }
        @media (min-width: 640px) { .hero-text h1 { font-size: 28px; } }
        .hero-text p { color: rgba(255,255,255,0.75); font-size: 13px; margin-bottom: 16px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: #ffd600; color: #212121; padding: 9px 18px; border-radius: 4px; font-weight: 700; font-size: 14px; cursor: pointer; border: none; text-decoration: none; }
        .hero-badge:hover { background: #f9c800; }
        .hero-stat { text-align: right; color: white; flex-shrink: 0; display: none; }
        @media (min-width: 640px) { .hero-stat { display: block; } }
        .hero-stat .num { font-size: 36px; font-weight: 700; color: #ffd600; line-height: 1; }
        .hero-stat .lbl { font-size: 12px; color: rgba(255,255,255,0.65); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: #bdbdbd; border-radius: 3px; }

        /* Admin tabs */
        .admin-tab { background: none; border: none; padding: 10px 20px; font-size: 14px; font-weight: 600; cursor: pointer; color: #757575; border-bottom: 2px solid transparent; }
        .admin-tab.active { color: #1a237e; border-bottom-color: #1a237e; }

        /* Stats */
        .stat-card { background: white; border: 1px solid #e0e0e0; border-radius: 4px; padding: 16px 20px; }
        .stat-num { font-size: 28px; font-weight: 700; color: #1a237e; line-height: 1; margin-bottom: 4px; }
        .stat-lbl { font-size: 12px; color: #757575; font-weight: 500; }

        /* Responsive hide */
        @media (max-width: 480px) { .hide-mobile { display: none !important; } }
      `}</style>

      {toast && <div className="toast">{toast}</div>}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand">
            Modern Luggage House
            <span>Shah Alam Market, Lahore</span>
          </div>
          <div className="search-bar">
            <input
              placeholder="Search bags, suitcases, umbrellas..."
              value={search}
              onChange={e => { setSearch(e.target.value); setView("shop"); }}
              onFocus={() => setView("shop")}
            />
            <button className="search-btn"><SearchIcon /></button>
          </div>
          <div className="nav-actions">
            <button className="nav-btn hide-mobile" onClick={() => { if (!adminAuth) setView("adminlogin"); else setView("admin"); }}>
              Admin
            </button>
            <button className="nav-btn" onClick={() => setView("cart")} style={{ position: "relative" }}>
              <CartIcon />
              <span className="hide-mobile" style={{ marginLeft: 4 }}>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* CATEGORY BAR */}
      {view === "shop" && (
        <div className="cat-bar">
          <div className="cat-bar-inner">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
                {CATEGORY_ICONS[cat] && <span style={{ opacity: 0.85 }}>{CATEGORY_ICONS[cat]}</span>}
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SHOP VIEW */}
      {view === "shop" && (
        <>
          {/* HERO */}
          <div className="hero">
            <div className="hero-inner">
              <div className="hero-text">
                <h1>Pakistan's Trusted<br />Luggage Destination</h1>
                <p>School bags, suitcases, handbags & umbrellas — direct from Shah Alam Market</p>
                <a className="hero-badge" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
              <div className="hero-stat">
                <div className="num">{products.filter(p => p.inStock).length}+</div>
                <div className="lbl">Products Available</div>
              </div>
            </div>
          </div>

          <div className="page-wrapper">
            <div className="section-header">
              <div className="section-title">
                {activeCategory === "All" ? "All Products" : activeCategory}
              </div>
              <div className="section-meta">{filtered.length} items found</div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9e9e9e" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>
                  <SearchIcon />
                </div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>No products found</div>
                <div style={{ fontSize: 13 }}>Try a different search or category</div>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map(p => (
                  <div key={p.id} className="p-card">
                    <div className="p-card-img">
                      {/* Placeholder product image with category-based visual */}
                      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" strokeWidth="1.2">
                        {p.category === "School Bags" && <><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="7" width="20" height="14" rx="2"/></>}
                        {p.category === "Suitcases" && <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><circle cx="8" cy="20" r="1"/><circle cx="16" cy="20" r="1"/></>}
                        {p.category === "Handbags" && <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>}
                        {p.category === "Travel Bags" && <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></>}
                        {p.category === "Umbrellas" && <><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></>}
                      </svg>
                      {!p.inStock && <div className="out-of-stock-overlay">OUT OF STOCK</div>}
                    </div>
                    <div className="p-card-body">
                      {p.tag && (
                        <div className={`tag-badge tag-${p.tag.toLowerCase()}`}>{p.tag}</div>
                      )}
                      <div className="p-card-name">{p.name}</div>
                      <div className="p-card-desc">{p.description}</div>
                      <div className="p-card-price">Rs. {p.price.toLocaleString()}</div>
                      <button className="btn-primary" disabled={!p.inStock} onClick={() => addToCart(p)}>
                        {p.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile sticky cart bar */}
          {cartCount > 0 && (
            <div className="sticky-cart" onClick={() => setView("cart")}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{cartCount} item{cartCount > 1 ? "s" : ""} in cart</div>
                <div style={{ fontSize: 11, color: "#ffd600" }}>Rs. {cartTotal.toLocaleString()}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#ffd600", color: "#212121", padding: "8px 16px", borderRadius: 4, fontWeight: 700, fontSize: 13 }}>
                View Cart <ChevronRight />
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div style={{ background: "#1a237e", padding: "28px 16px", marginTop: 32 }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Modern Luggage House</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 4 }}>Shah Alam Market, Lahore, Pakistan</div>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                  <WhatsAppIcon /> +92 300 1234567
                </a>
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Categories</div>
                {CATEGORIES.filter(c => c !== "All").map(c => (
                  <div key={c} onClick={() => { setActiveCategory(c); window.scrollTo(0, 0); }} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 4, cursor: "pointer" }}>{c}</div>
                ))}
              </div>
            </div>
            <div style={{ maxWidth: 1280, margin: "20px auto 0", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              © 2025 Modern Luggage House. All rights reserved.
            </div>
          </div>
        </>
      )}

      {/* CART VIEW */}
      {view === "cart" && (
        <div className="page-wrapper" style={{ maxWidth: 900 }}>
          <button onClick={() => setView("shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1a237e", fontSize: 13, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 4 }}>
            ← Continue Shopping
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: cart.length > 0 ? "1fr" : "1fr", gap: 16 }}>
              {/* Cart items */}
              <div className="panel" style={{ padding: "0 16px" }}>
                <div style={{ padding: "14px 0 10px", borderBottom: "1px solid #f0f0f0", fontWeight: 700, fontSize: 16 }}>
                  Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
                </div>

                {cart.length === 0 ? (
                  <div style={{ padding: "48px 0", textAlign: "center", color: "#9e9e9e" }}>
                    <div style={{ marginBottom: 12 }}><CartIcon /></div>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Your cart is empty</div>
                    <button className="btn-primary" style={{ width: "auto", padding: "9px 24px" }} onClick={() => setView("shop")}>Browse Products</button>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-img">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bdbdbd" strokeWidth="1.5">
                            {item.category === "School Bags" && <><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="7" width="20" height="14" rx="2"/></>}
                            {item.category === "Suitcases" && <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>}
                            {item.category === "Handbags" && <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>}
                            {item.category === "Travel Bags" && <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></>}
                            {item.category === "Umbrellas" && <><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></>}
                          </svg>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, color: "#212121" }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: "#757575", marginBottom: 10 }}>{item.category}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <div className="qty-ctrl">
                              <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                              <div className="qty-val">{item.qty}</div>
                              <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#e53935", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500 }}>
                              <TrashIcon /> Remove
                            </button>
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#212121", whiteSpace: "nowrap" }}>
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                    ))}

                    {/* Order summary */}
                    <div style={{ padding: "16px 0" }}>
                      <div style={{ background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 4, padding: 16 }}>
                        <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>Order Summary</div>
                        {cart.map(i => (
                          <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "#616161" }}>
                            <span>{i.name} × {i.qty}</span>
                            <span>Rs. {(i.price * i.qty).toLocaleString()}</span>
                          </div>
                        ))}
                        <div style={{ borderTop: "1px solid #e0e0e0", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                          <span>Total</span>
                          <span>Rs. {cartTotal.toLocaleString()}</span>
                        </div>
                        <div style={{ marginTop: 14 }}>
                          <button className="btn-wa" onClick={placeOrder}>
                            <WhatsAppIcon /> Place Order via WhatsApp
                          </button>
                          <div style={{ fontSize: 11, color: "#9e9e9e", textAlign: "center", marginTop: 8 }}>
                            Your order details will be sent to our WhatsApp for confirmation
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN */}
      {view === "adminlogin" && (
        <div style={{ maxWidth: 380, margin: "64px auto", padding: "0 16px" }}>
          <div className="panel" style={{ padding: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Admin Login</div>
            <div style={{ color: "#757575", fontSize: 13, marginBottom: 24 }}>Modern Luggage House Management</div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter password" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === "Enter" && adminLogin()} />
            </div>
            {adminErr && <div style={{ color: "#e53935", fontSize: 12, marginBottom: 12 }}>{adminErr}</div>}
            <button className="btn-primary" onClick={adminLogin}>Login</button>
            <button className="btn-secondary" onClick={() => setView("shop")}>Back to Shop</button>
          </div>
        </div>
      )}

      {/* ADMIN PANEL */}
      {view === "admin" && adminAuth && (
        <div className="page-wrapper">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>Admin Panel</div>
              <div style={{ color: "#757575", fontSize: 13 }}>Modern Luggage House</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" style={{ width: "auto" }} onClick={() => setShowAddForm(true)}>+ Add Product</button>
              <button className="btn-secondary" style={{ width: "auto" }} onClick={() => { setAdminAuth(false); setView("shop"); }}>Logout</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Total Products", val: products.length },
              { label: "In Stock", val: products.filter(p => p.inStock).length },
              { label: "Out of Stock", val: products.filter(p => !p.inStock).length },
              { label: "Total Orders", val: orders.length },
              { label: "Pending Orders", val: orders.filter(o => o.status === "Pending").length },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-num">{s.val}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="panel" style={{ marginBottom: 0 }}>
            <div style={{ borderBottom: "1px solid #e0e0e0", display: "flex" }}>
              <button className={`admin-tab ${adminTab === "products" ? "active" : ""}`} onClick={() => setAdminTab("products")}>Products ({products.length})</button>
              <button className={`admin-tab ${adminTab === "orders" ? "active" : ""}`} onClick={() => setAdminTab("orders")}>Orders ({orders.length})</button>
            </div>

            {/* Add form */}
            {showAddForm && adminTab === "products" && (
              <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Add New Product</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Product Name *</label>
                    <input className="form-input" placeholder="e.g. Pro Backpack 30L" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Category *</label>
                    <select className="form-input" value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}>
                      {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Price (Rs.) *</label>
                    <input className="form-input" type="number" placeholder="2500" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Badge Tag</label>
                    <select className="form-input" value={newProduct.tag} onChange={e => setNewProduct(p => ({ ...p, tag: e.target.value }))}>
                      <option value="">None</option>
                      <option>Bestseller</option>
                      <option>New</option>
                      <option>Trending</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 10 }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-input" rows={2} placeholder="Key features..." value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input type="checkbox" checked={newProduct.inStock} onChange={e => setNewProduct(p => ({ ...p, inStock: e.target.checked }))} />
                    In Stock
                  </label>
                  <div style={{ flex: 1 }} />
                  <button className="btn-primary" style={{ width: "auto" }} onClick={addProduct}>Add Product</button>
                  <button className="btn-secondary" style={{ width: "auto" }} onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            {/* Products list */}
            {adminTab === "products" && (
              <div>
                {products.map(p => (
                  <div key={p.id}>
                    {editProduct?.id === p.id ? (
                      <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                          <div>
                            <label className="form-label">Name</label>
                            <input className="form-input" value={editProduct.name} onChange={e => setEditProduct(p => ({ ...p, name: e.target.value }))} />
                          </div>
                          <div>
                            <label className="form-label">Category</label>
                            <select className="form-input" value={editProduct.category} onChange={e => setEditProduct(p => ({ ...p, category: e.target.value }))}>
                              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="form-label">Price (Rs.)</label>
                            <input className="form-input" type="number" value={editProduct.price} onChange={e => setEditProduct(p => ({ ...p, price: parseInt(e.target.value) }))} />
                          </div>
                          <div>
                            <label className="form-label">Tag</label>
                            <select className="form-input" value={editProduct.tag} onChange={e => setEditProduct(p => ({ ...p, tag: e.target.value }))}>
                              <option value="">None</option>
                              <option>Bestseller</option>
                              <option>New</option>
                              <option>Trending</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <label className="form-label">Description</label>
                          <textarea className="form-input" rows={2} value={editProduct.description} onChange={e => setEditProduct(p => ({ ...p, description: e.target.value }))} />
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                            <input type="checkbox" checked={editProduct.inStock} onChange={e => setEditProduct(p => ({ ...p, inStock: e.target.checked }))} />
                            In Stock
                          </label>
                          <div style={{ flex: 1 }} />
                          <button className="btn-primary" style={{ width: "auto" }} onClick={saveEdit}>Save Changes</button>
                          <button className="btn-secondary" style={{ width: "auto" }} onClick={() => setEditProduct(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="admin-row">
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{p.name}</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, color: "#757575" }}>{p.category}</span>
                            {p.tag && <span className={`tag-badge tag-${p.tag.toLowerCase()}`} style={{ fontSize: 10 }}>{p.tag}</span>}
                            <span style={{ fontSize: 11, fontWeight: 600, color: p.inStock ? "#2e7d32" : "#c62828" }}>{p.inStock ? "In Stock" : "Out of Stock"}</span>
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#212121", whiteSpace: "nowrap", marginRight: 12 }}>Rs. {p.price.toLocaleString()}</div>
                        <button className="btn-sm" style={{ background: "#e8eaf6", color: "#1a237e", marginRight: 6 }} onClick={() => setEditProduct({ ...p })}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><EditIcon /> Edit</span>
                        </button>
                        <button className="btn-sm" style={{ background: "#fee2e2", color: "#c62828" }} onClick={() => deleteProduct(p.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Orders list */}
            {adminTab === "orders" && (
              <div>
                {orders.length === 0 ? (
                  <div style={{ padding: "40px 20px", textAlign: "center", color: "#9e9e9e", fontSize: 13 }}>No orders yet. Orders placed via WhatsApp will appear here.</div>
                ) : orders.map(o => (
                  <div key={o.id} style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Order #{String(o.id).slice(-6)}</div>
                        <div style={{ fontSize: 12, color: "#757575", marginBottom: 8 }}>{o.date}</div>
                        {o.items.map(i => (
                          <div key={i.id} style={{ fontSize: 12, color: "#616161", marginBottom: 2 }}>
                            {i.name} × {i.qty} — Rs. {(i.price * i.qty).toLocaleString()}
                          </div>
                        ))}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Rs. {o.total.toLocaleString()}</div>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: statusBg[o.status], color: statusColor[o.status], marginBottom: 8 }}>
                          {o.status}
                        </span>
                        <br />
                        <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)} className="form-input" style={{ fontSize: 12, padding: "5px 8px", width: "auto" }}>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}