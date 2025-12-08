
import React, { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  Truck,
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Minus,
  DollarSign,
  RefreshCw,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
} from "lucide-react";

// Custom CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -50px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(50px, 50px) scale(1.05); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes fade-in-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  .animate-float {
    animation: float linear infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  .animate-shake {
    animation: shake 0.5s;
  }
  
  .animate-fade-in-down {
    animation: fade-in-down 0.6s ease-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
  }
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .bg-grid-pattern {
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  
  .border-3 {
    border-width: 3px;
  }
  
  .backdrop-blur-3xl {
    backdrop-filter: blur(60px);
  }
`;
document.head.appendChild(style);

// ======================
// ตั้งค่า API (PHP + MySQL)
// ======================
// เติม /api ต่อท้ายตรงนี้เลย
const API_BASE_URL = "https://inventory-backend-apn6.onrender.com/api";

// ใช้ SweetAlert2 ถ้ามีโหลดจาก CDN
const Swal = window.Swal || null;

const safeSwalFire = (options) => {
  if (Swal && typeof Swal.fire === "function") {
    Swal.fire(options);
  } else {
    console.log("Swal.fire:", options);
  }
};

const safeSwalClose = () => {
  if (Swal && typeof Swal.close === "function") {
    Swal.close();
  }
};

// =================================================================
// 1. Login Component (แก้ไขแล้ว: ลบส่วน user profile ที่ทำให้ error)
// =================================================================
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login.php`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        setLoading(false);
        return;
      }

      onLogin({
        username: data.username,
        retailerId: data.retailer_id,
        shopName: data.shop_name,
        role: data.role,
      });
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ top: '10%', left: '10%', animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ top: '40%', right: '10%', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ bottom: '10%', left: '30%', animationDelay: '4s' }}
        ></div>
        
        {/* Interactive mouse follow effect */}
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none transition-all duration-300"
          style={{
            left: `${mousePosition.x - 128}px`,
            top: `${mousePosition.y - 128}px`,
          }}
        ></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300 border-4 border-white/50">
              <Package size={48} className="text-blue-600 drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 mb-3 drop-shadow-lg animate-gradient">
            ระบบหลังบ้าน
          </h1>
          <p className="text-cyan-100 text-lg font-medium tracking-wide">ระบบจัดการสต๊อกสินค้า</p>
        </div>

        {/* Login Form */}
        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 animate-fade-in-up">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>

          <h2 className="relative text-2xl font-bold text-white mb-6 text-center">
            เข้าสู่ระบบ
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 backdrop-blur-xl border-2 border-red-400/50 rounded-xl flex items-center gap-2 text-red-100 animate-shake">
              <AlertTriangle size={20} className="animate-pulse" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            {/* Username */}
            <div className="group">
              <label className="block text-sm font-semibold text-cyan-100 mb-2 ml-1">
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-300 z-10 group-hover:scale-110 transition-transform"
                  size={20}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-semibold text-cyan-100 mb-2 ml-1">
                รหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-300 z-10 group-hover:scale-110 transition-transform"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-cyan-100 transition-all hover:scale-110 z-10"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 transition-all"
                />
                <span className="text-cyan-100 group-hover:text-white transition-colors">จดจำฉันไว้</span>
              </label>
              <a
                href="#"
                className="text-cyan-300 hover:text-white font-medium transition-colors relative group"
              >
                <span className="relative z-10">ลืมรหัสผ่าน?</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {loading ? (
                <div className="relative flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>กำลังเข้าสู่ระบบ...</span>
                </div>
              ) : (
                <span className="relative">เข้าสู่ระบบ</span>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
            <p className="text-sm font-semibold text-cyan-100 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              ข้อมูลทดสอบ:
            </p>
            <div className="text-xs text-cyan-200 space-y-2">
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span>👤 Admin:</span>
                <span className="font-mono bg-white/10 px-3 py-1 rounded-lg flex-1 text-center">
                  admin / admin123
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span>👤 Demo:</span>
                <span className="font-mono bg-white/10 px-3 py-1 rounded-lg flex-1 text-center">
                  demo / demo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-cyan-200/60 text-sm mt-6 animate-fade-in">
          © 2026 หัวแถว. All rights reserved.
        </p>
      </div>
    </div>
  );
};

// =================================================================
// 2. Inventory System Component (ดึงจาก MySQL ผ่าน PHP)
// =================================================================

const InventorySystem = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notification, setNotification] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [displayRevenue, setDisplayRevenue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const LOW_STOCK_THRESHOLD = 20;
  const RETAILER_ID = user.retailerId;
  const IS_ADMIN = user.role === "admin";

  // ==============================
  // ดึงสต๊อกจาก get_inventory.php
  // ==============================
const loadInventory = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      `${API_BASE_URL}/get_inventory.php?retailer_id=${RETAILER_ID}`
    );
    const data = await res.json();

    if (data.success) {
      const list = data.inventory || [];
      setInventory(list);

      // มูลค่าสินค้าคงเหลือ (ถ้าอยากเก็บ)
      const inventoryVal = list.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.current_stock) || 0),
        0
      );
      setInventoryValue(inventoryVal);

      // ➜ จำนวนสินค้าคงเหลือทั้งหมด (ตัวนี้แหละที่ UI ต้องการ)
      const totalStockCount = list.reduce(
        (sum, item) => sum + Number(item.current_stock || 0),
        0
      );
      setTotalStock(totalStockCount);
    }
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};

  useEffect(() => {
    loadInventory();
    
  }, [RETAILER_ID]);

  useEffect(() => {
    refreshRevenue();
}, [RETAILER_ID]);   // <-- วางตรงนี้เลย ถูกที่สุด



  // Animation for revenue display
useEffect(() => {
  if (!isAnimating) return;

  const duration = 2000;
  const steps = 60;
  const step = totalRevenue / steps;

  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;

    if (currentStep <= steps) {
      setDisplayRevenue(Math.floor(step * currentStep));
    } else {
      setDisplayRevenue(totalRevenue);
      setIsAnimating(false);
      clearInterval(timer);
    }
  }, duration / steps);

  return () => clearInterval(timer);
}, [isAnimating, totalRevenue]);


  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

const refreshRevenue = async () => {
    const res = await fetch(`${API_BASE_URL}/get_total_sales.php?retailer_id=${RETAILER_ID}`);
    const data = await res.json();

    setIsAnimating(false);      // reset ก่อนเริ่มใหม่
    setDisplayRevenue(0);       // เริ่มจาก 0
    setTotalRevenue(data.total_sales); 
    setIsAnimating(true);       // เริ่ม animate ใหม่
};



  // ========================================
  // บันทึกการขาย/รับเข้า ผ่าน inventory_update.php
  // ========================================
const handleTransaction = async (type) => {
  if (!selectedProduct || !quantity || quantity <= 0) {
    showNotification('error', 'กรุณาเลือกสินค้าและระบุจำนวนที่ถูกต้อง');
    return;
  }

  try {
    // ลบคำว่า api ออกจากชื่อไฟล์ เพราะมันอยู่ในตัวแปร API_BASE_URL แล้ว
const res = await fetch(`${API_BASE_URL}/inventory_update.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        retailer_id: RETAILER_ID,
        transaction_type: type,
        product_sku: selectedProduct,
        quantity: Number(quantity),
      }),
    });

    const data = await res.json();

    if (!data.success) {
      showNotification('error', data.message);
      return;
    }

    showNotification('success', 'บันทึกสำเร็จ!');
    loadInventory(); // โหลดสต๊อกใหม่จาก DB

    // ⭐⭐⭐ อันนี้แหละที่ทำให้ยอดขายคุณเพี้ยน เพราะมันขาดไป ⭐⭐⭐
    await refreshRevenue(); // โหลดยอดขายใหม่จากฐานข้อมูลจริง (75)

  } catch (err) {
    console.error(err);
    showNotification('error', 'เกิดข้อผิดพลาดระหว่างการเชื่อมต่อ');
  }
};

  const filteredInventory = inventory.filter((item) => {
    const name = (item.product_name || "").toLowerCase();
    const sku = (item.sku_id || "").toLowerCase();
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      sku.includes(searchTerm.toLowerCase());

    const stock = Number(item.current_stock) || 0;

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "low" && stock < LOW_STOCK_THRESHOLD) ||
      (filterStatus === "normal" && stock >= LOW_STOCK_THRESHOLD);

    return matchesSearch && matchesFilter;
  });

  const totalStock = inventory.reduce(
    (sum, item) => sum + (Number(item.current_stock) || 0),
    0
  );
  const lowStockCount = inventory.filter(
    (item) => Number(item.current_stock) < LOW_STOCK_THRESHOLD
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 backdrop-blur-xl border-2 ${
            notification.type === "success" 
              ? "bg-green-500/90 border-green-300 text-white" 
              : "bg-red-500/90 border-red-300 text-white"
          } animate-fade-in-down`}
        >
          <div className="flex items-center gap-3">
            {notification.type === "success" ? (
              <Sparkles size={20} className="animate-pulse" />
            ) : (
              <AlertTriangle size={20} className="animate-pulse" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-opacity-95">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        <div className="px-4 py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
                <Package size={32} className="text-cyan-200 relative group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">ระบบหลังบ้าน</h1>
                <p className="text-xs text-cyan-200 font-medium">Inventory Management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">
                    {user?.username?.charAt(0)?.toUpperCase() || ""}
{user?.shopName || ""}
{user?.role?.toUpperCase() || ""}

                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">{user.shopName}</p>
                <p className="text-xs text-cyan-200">{user.role.toUpperCase()}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-medium border border-white/20 hover:scale-105 backdrop-blur-xl"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white/80 backdrop-blur-2xl shadow-2xl transform transition-all duration-300 z-30 border-r border-gray-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50"></div>
        <nav className="p-4 space-y-2 relative">
          <a
            href="#"
            className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <TrendingUp size={20} className="relative group-hover:scale-110 transition-transform" />
            <span className="font-semibold relative">Dashboard</span>
            <div className="absolute right-2 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
          </a>
          <a
            href="#"
            className="group flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105"
          >
            <Package size={20} className="group-hover:text-blue-600 transition-colors group-hover:scale-110 transform duration-300" />
            <span className="font-medium group-hover:text-blue-600 transition-colors">จัดการสต๊อกของฉัน</span>
          </a>
          
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-blue-600" />
              <p className="text-xs font-bold text-slate-700">Quick Stats</p>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <p className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-bold text-blue-600">{inventory.length}</span>
              </p>
              <p className="flex justify-between">
                <span>Low Stock:</span>
                <span className="font-bold text-red-600">{lowStockCount}</span>
              </p>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <Package className="text-blue-600" size={32} />
              จัดการสต๊อกสินค้า
            </h2>
            <p className="text-slate-600">
              ระบบจัดการสต๊อกสำหรับผู้ค้าปลีก ({user.role.toUpperCase()})
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            
            {/* Revenue Card - แสดงเฉพาะ Admin */}
            {user.role === "admin" && (
              <div className="group relative bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-300">
                      <DollarSign size={32} className="drop-shadow-lg" />
                    </div>
                    <button
                      onClick={refreshRevenue}
                      disabled={isAnimating}
                      className="bg-white/20 hover:bg-white/30 p-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 backdrop-blur-xl hover:scale-110"
                      title="รีเฟรชตัวเลข"
                    >
                      <RefreshCw
                        size={18}
                        className={isAnimating ? "animate-spin" : ""}
                      />
                    </button>
                  </div>
                  <h3 className="text-base font-semibold mb-2 opacity-90">
                    ยอดขายทั้งหมด (ประมาณ)
                  </h3>
                  <p className="text-4xl font-black mb-1 tracking-tight">
                    ฿{displayRevenue.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Zap size={14} className="animate-pulse" />
                    <span>บาท</span>
                  </div>
                </div>
              </div>
            )}

            {/* Total Stock */}
            <div
              className={`group relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 overflow-hidden ${
                user.role === "admin" ? "" : "md:col-span-2"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-300">
                    <Package size={32} className="drop-shadow-lg" />
                  </div>
                  <div className="px-3 py-1.5 bg-white/20 rounded-full text-sm font-bold backdrop-blur-xl">
                    รวม
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2 opacity-90">
                  จำนวนสินค้าคงเหลือ
                </h3>
                <p className="text-4xl font-black mb-1 tracking-tight">
                  {loading ? "..." : totalStock.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>ชิ้น</span>
                </div>
              </div>
            </div>

            {/* Low Stock Warning */}
            <div
              className={`group relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 overflow-hidden ${
                user.role === "admin" ? "" : "md:col-span-1"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                    <AlertTriangle size={32} className="drop-shadow-lg" />
                  </div>
                  <div className="px-3 py-1.5 bg-white/20 rounded-full text-sm font-bold backdrop-blur-xl animate-pulse">
                    เตือน
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2 opacity-90">
                  สินค้าที่ต้องสั่งเพิ่ม
                </h3>
                <p className="text-4xl font-black mb-1 tracking-tight">
                  {loading ? "..." : lowStockCount}
                </p>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <AlertTriangle size={14} className="animate-bounce" />
                  <span>รายการ</span>
                </div>
              </div>
            </div>

            {/* Total Items */}
            <div
              className={`group relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 overflow-hidden ${
                user.role === "admin" ? "" : "md:col-span-1"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag size={32} className="drop-shadow-lg" />
                  </div>
                  <div className="px-3 py-1.5 bg-white/20 rounded-full text-sm font-bold backdrop-blur-xl">
                    ทั้งหมด
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2 opacity-90">
                  จำนวนรายการสินค้า
                </h3>
                <p className="text-4xl font-black mb-1 tracking-tight">
                  {loading ? "..." : inventory.length}
                </p>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Package size={14} className="animate-pulse" />
                  <span>ชนิด</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Filters */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              {/* Search */}
              <div className="relative flex-1 w-full lg:max-w-md group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors z-10"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า (SKU หรือชื่อ)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white group-hover:shadow-lg"
                />
              </div>

              {/* Filter */}
              <div className="relative w-full sm:w-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Filter
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-purple-500 transition-colors z-10"
                  size={20}
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="relative w-full pl-12 pr-10 py-4 border-2 border-slate-200 rounded-2xl appearance-none focus:border-purple-500 focus:outline-none transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white group-hover:shadow-lg font-medium"
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="low">สินค้าเหลือน้อย</option>
                  <option value="normal">สินค้าปกติ</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-purple-500 transition-colors"
                  size={20}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setModalOpen("sale")}
                  className="group relative flex-1 sm:flex-auto flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold overflow-hidden transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Minus size={18} className="relative group-hover:scale-110 transition-transform" />
                  <span className="relative">บันทึกการขาย</span>
                </button>
                {user.role === "admin" && (
                  <button
                    onClick={() => setModalOpen("receive")}
                    className="group relative flex-1 sm:flex-auto flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 font-semibold overflow-hidden transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Plus size={18} className="relative group-hover:scale-110 transition-transform" />
                    <span className="relative">รับเข้า</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-200 border-b-2 border-slate-300">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                      ชื่อสินค้า
                    </th>
                    <th className="px-6 py-5 text-right text-sm font-bold text-slate-700 uppercase tracking-wider">
                      ราคาขาย
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                      จำนวนคงเหลือ
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                      สถานะ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-16 text-center text-slate-500"
                      >
                        <div className="flex flex-col items-center justify-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                          </div>
                          <p className="text-lg font-semibold">กำลังโหลดข้อมูล...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredInventory.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-16 text-center text-slate-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Package size={48} className="text-slate-300" />
                          <p className="text-lg font-semibold">ไม่พบสินค้าที่ค้นหา</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredInventory.map((item, index) => {
                      const stock = Number(item.current_stock) || 0;
                      const low = stock < LOW_STOCK_THRESHOLD;
                      return (
                        <tr
                          key={item.sku_id}
                          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Package size={18} className="text-blue-600" />
                              </div>
                              <span className="font-mono text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                {item.sku_id}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-slate-800 font-semibold group-hover:text-slate-900 transition-colors">
                              {item.product_name}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <span className="inline-flex items-center gap-1 text-slate-700 font-bold text-lg group-hover:text-green-600 transition-colors">
                              ฿{(Number(item.price) || 0).toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span
                              className={`inline-flex items-center justify-center min-w-[4rem] px-4 py-2 rounded-xl font-black text-lg shadow-md transform group-hover:scale-110 transition-all duration-300 ${
                                low
                                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              }`}
                            >
                              {stock}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-md transform group-hover:scale-110 transition-all duration-300 ${
                                low
                                  ? "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-300"
                                  : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300"
                              }`}
                            >
                              {low ? (
                                <>
                                  <AlertTriangle size={16} className="animate-bounce" />
                                  เหลือน้อย
                                </>
                              ) : (
                                <>
                                  <Sparkles size={16} />
                                  ปกติ
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal - Transaction Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform animate-fade-in-up">
            <div
              className={`relative p-8 ${
                modalOpen === "sale"
                  ? "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600"
                  : "bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600"
              } text-white rounded-t-3xl overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="flex items-center justify-between relative">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  {modalOpen === "sale" ? (
                    <>
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl">
                        <ShoppingBag size={28} />
                      </div>
                      บันทึกการขาย
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl">
                        <Truck size={28} />
                      </div>
                      รับสินค้าเข้า
                    </>
                  )}
                </h3>
                <button
                  onClick={() => {
                    setModalOpen(null);
                    setSelectedProduct("");
                    setQuantity("");
                  }}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl hover:scale-110 hover:rotate-90"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {modalOpen === "receive" && (
                <div className="flex items-start gap-3 p-5 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl animate-fade-in">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <AlertTriangle
                      className="text-orange-600"
                      size={20}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-orange-900 mb-1">
                      หมายเหตุ:
                    </p>
                    <p className="text-sm text-orange-800">
                      การเพิ่มสต๊อกนี้จะไปอัปเดตฐานข้อมูล MySQL ผ่าน API
                    </p>
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                  เลือกสินค้า
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors z-10" size={20} />
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl appearance-none focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-white hover:to-white font-medium hover:shadow-lg"
                    required
                  >
                    <option value="" disabled>
                      กรุณาเลือกสินค้า
                    </option>
                    {inventory.map((item) => (
                      <option key={item.sku_id} value={item.sku_id}>
                        {item.sku_id} - {item.product_name} (เหลือ{" "}
                        {item.current_stock})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                  จำนวน {modalOpen === "sale" ? "ที่ขาย" : "ที่รับเข้า"}
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="ระบุจำนวน"
                    className="relative w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-white hover:to-white font-semibold text-lg hover:shadow-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(null);
                    setSelectedProduct("");
                    setQuantity("");
                  }}
                  className="flex-1 px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-100 transition-all duration-300 font-bold hover:scale-105 hover:shadow-lg"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleTransaction(modalOpen === "sale" ? "OUT" : "IN")
                  }
                  className={`group relative flex-1 px-6 py-4 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${
                    modalOpen === "sale"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  }`}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {modalOpen === "sale" ? (
                      <>
                        <Minus size={18} />
                        บันทึกการขาย
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        ยืนยันการรับเข้า
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =================================================================
// 3. Main App Wrapper
// =================================================================
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <InventorySystem user={user} onLogout={handleLogout} />;
};

export default App;

