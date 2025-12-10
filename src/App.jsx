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

// --- CSS Styles ---
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
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
  .animate-float { animation: float linear infinite; }
  .animate-shimmer { animation: shimmer 2s infinite; }
  .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
  .animate-shake { animation: shake 0.5s; }
  .animate-fade-in-down { animation: fade-in-down 0.6s ease-out; }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
  .animate-fade-in { animation: fade-in 0.8s ease-out; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .bg-grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  .border-3 { border-width: 3px; }
  .backdrop-blur-3xl { backdrop-filter: blur(60px); }
`;
document.head.appendChild(style);

const API_BASE_URL = "https://inventory-backend-apn6.onrender.com";

// --- Login Page Component ---
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
      const res = await fetch(`${API_BASE_URL}/api/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ top: '10%', left: '10%' }}></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ top: '40%', right: '10%' }}></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" style={{ bottom: '10%', left: '30%' }}></div>
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none transition-all duration-300"
          style={{ left: `${mousePosition.x - 128}px`, top: `${mousePosition.y - 128}px` }}
        ></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

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

      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300 border-4 border-white/50">
              <Package size={40} className="text-blue-600 drop-shadow-lg md:w-12 md:h-12" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 mb-3 drop-shadow-lg animate-gradient px-4">
            ระบบหลังบ้าน
          </h1>
          <p className="text-cyan-100 text-sm md:text-lg font-medium tracking-wide px-4">ระบบจัดการสต๊อกสินค้า</p>
        </div>

        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8 animate-fade-in-up mx-2 md:mx-0">
          <h2 className="relative text-xl md:text-2xl font-bold text-white mb-6 text-center">เข้าสู่ระบบ</h2>

          {error && (
            <div className="mb-4 p-3 md:p-4 bg-red-500/20 backdrop-blur-xl border-2 border-red-400/50 rounded-xl flex items-center gap-2 text-red-100 animate-shake">
              <AlertTriangle size={18} className="flex-shrink-0 animate-pulse md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 relative">
            <div className="group">
              <label className="block text-xs md:text-sm font-semibold text-cyan-100 mb-2 ml-1">ชื่อผู้ใช้</label>
              <div className="relative">
                <User className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-cyan-300 z-10" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="relative w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs md:text-sm font-semibold text-cyan-100 mb-2 ml-1">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-cyan-300 z-10" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-full pl-10 md:pl-12 pr-12 md:pr-14 py-3 md:py-4 text-sm md:text-base bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-cyan-100 transition-all z-10"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 md:py-4 text-sm md:text-base bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl overflow-hidden group disabled:opacity-50 transition-all duration-300 hover:shadow-2xl"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="mt-5 md:mt-6 p-3 md:p-5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
            <p className="text-xs md:text-sm font-semibold text-cyan-100 mb-2 md:mb-3">ข้อมูลทดสอบ:</p>
            <div className="text-xs text-cyan-200 space-y-2">
              <div className="flex gap-2 p-2 bg-white/5 rounded-lg">
                <span>👤 Admin:</span> <span className="font-mono">admin / admin123</span>
              </div>
              <div className="flex gap-2 p-2 bg-white/5 rounded-lg">
                <span>👤 Demo:</span> <span className="font-mono">demo / demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Inventory System Component ---
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
  const [totalStock, setTotalStock] = useState(0);

  const LOW_STOCK_THRESHOLD = 20;
  const RETAILER_ID = user.retailerId;

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/get_inventory.php?retailer_id=${RETAILER_ID}`);
      const data = await res.json();
      if (data.success) {
        const list = data.inventory || [];
        setInventory(list);
        setTotalStock(list.reduce((sum, item) => sum + Number(item.current_stock || 0), 0));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const refreshRevenue = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get_total_sales.php?retailer_id=${RETAILER_ID}`);
      const data = await res.json();
      setIsAnimating(false);
      setDisplayRevenue(0);
      setTotalRevenue(data.total_sales || 0);
      setIsAnimating(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadInventory();
    refreshRevenue();
  }, [RETAILER_ID]);

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

  const handleTransaction = async (type) => {
    if (!selectedProduct || !quantity || quantity <= 0) {
      showNotification('error', 'กรุณาเลือกสินค้าและระบุจำนวนที่ถูกต้อง');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/inventory_update.php`, {
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
      setModalOpen(null);
      setSelectedProduct("");
      setQuantity("");
      loadInventory();
      await refreshRevenue();
    } catch (err) {
      console.error(err);
      showNotification('error', 'เกิดข้อผิดพลาดระหว่างการเชื่อมต่อ');
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const name = (item.product_name || "").toLowerCase();
    const sku = (item.sku_id || "").toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || sku.includes(searchTerm.toLowerCase());
    const stock = Number(item.current_stock) || 0;
    const matchesFilter = filterStatus === "all" ||
      (filterStatus === "low" && stock < LOW_STOCK_THRESHOLD) ||
      (filterStatus === "normal" && stock >= LOW_STOCK_THRESHOLD);
    return matchesSearch && matchesFilter;
  });

  const lowStockCount = inventory.filter((item) => Number(item.current_stock) < LOW_STOCK_THRESHOLD).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-2xl transform transition-all duration-300 backdrop-blur-xl border-2 ${notification.type === "success" ? "bg-green-500/90 border-green-300 text-white" : "bg-red-500/90 border-red-300 text-white"} animate-fade-in-down max-w-xs md:max-w-sm`}>
          <div className="flex items-center gap-2 md:gap-3">
            {notification.type === "success" ? <Sparkles size={18} /> : <AlertTriangle size={18} />}
            <span className="font-medium text-xs md:text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-opacity-95">
        <div className="px-3 md:px-4 py-2 md:py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 md:gap-3">
              <Package size={24} className="text-cyan-200" />
              <div>
                <h1 className="text-sm md:text-xl font-bold tracking-tight">ระบบหลังบ้าน</h1>
                <p className="text-[10px] md:text-xs text-cyan-200 font-medium hidden sm:block">Inventory Management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-xl px-2 md:px-4 py-1.5 rounded-full border border-white/20">
              <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs md:text-sm font-semibold leading-tight">{user.shopName}</p>
                <p className="text-[10px] md:text-xs text-cyan-200">{user.role.toUpperCase()}</p>
              </div>
            </div>
            <button onClick={onLogout} className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm bg-white/10 hover:bg-white/20 rounded-xl border border-white/20">ออกจากระบบ</button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-12 md:top-14 lg:top-16 left-0 bottom-0 w-64 bg-white/80 backdrop-blur-2xl shadow-2xl transform transition-all duration-300 z-30 border-r border-gray-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg">
            <TrendingUp size={20} />
            <span className="font-semibold">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-xl transition-all">
            <Package size={20} />
            <span className="font-medium">จัดการสต๊อก</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 md:pt-20 lg:ml-64 p-3 md:p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
            {/* Revenue Card */}
            {user.role === "admin" && (
              <div className="bg-gradient-to-br from-purple-500 to-rose-500 rounded-2xl shadow-xl p-4 md:p-6 text-white hover:scale-105 transition-transform">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-white/20 rounded-xl"><DollarSign size={24} /></div>
                  <button onClick={refreshRevenue} disabled={isAnimating} className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><RefreshCw size={16} className={isAnimating ? "animate-spin" : ""} /></button>
                </div>
                <h3 className="text-sm font-semibold opacity-90">ยอดขายทั้งหมด</h3>
                <p className="text-3xl font-black">฿{displayRevenue.toLocaleString()}</p>
              </div>
            )}
            {/* Stock Count */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-xl p-4 md:p-6 text-white hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-white/20 rounded-xl"><Package size={24} /></div>
              </div>
              <h3 className="text-sm font-semibold opacity-90">สินค้าคงเหลือ</h3>
              <p className="text-3xl font-black">{totalStock.toLocaleString()}</p>
            </div>
            {/* Low Stock */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-4 md:p-6 text-white hover:scale-105 transition-transform">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-white/20 rounded-xl"><AlertTriangle size={24} /></div>
                <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-bold animate-pulse">เตือน</div>
              </div>
              <h3 className="text-sm font-semibold opacity-90">ต้องสั่งเพิ่ม</h3>
              <p className="text-3xl font-black">{lowStockCount}</p>
            </div>
             {/* Total Items */}
             <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-xl p-4 md:p-6 text-white hover:scale-105 transition-transform">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-white/20 rounded-xl"><ShoppingBag size={24} /></div>
              </div>
              <h3 className="text-sm font-semibold opacity-90">รายการสินค้า</h3>
              <p className="text-3xl font-black">{inventory.length}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 mb-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="ค้นหา SKU หรือ ชื่อสินค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 outline-none appearance-none bg-white"
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="low">สินค้าเหลือน้อย</option>
                  <option value="normal">ปกติ</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModalOpen("sale")} className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Minus size={18} /> บันทึกการขาย
                </button>
                {user.role === "admin" && (
                  <button onClick={() => setModalOpen("receive")} className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Plus size={18} /> รับเข้า
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">SKU</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">ชื่อสินค้า</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">ราคา</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">คงเหลือ</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr><td colSpan="5" className="py-12 text-center text-slate-500">กำลังโหลด...</td></tr>
                  ) : filteredInventory.length === 0 ? (
                    <tr><td colSpan="5" className="py-12 text-center text-slate-500">ไม่พบสินค้า</td></tr>
                  ) : (
                    filteredInventory.map((item) => {
                      const stock = Number(item.current_stock) || 0;
                      const low = stock < LOW_STOCK_THRESHOLD;
                      return (
                        <tr key={item.sku_id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm font-bold text-slate-700">{item.sku_id}</td>
                          <td className="px-6 py-4 text-slate-800 font-semibold">{item.product_name}</td>
                          <td className="px-6 py-4 text-right font-bold text-slate-700">฿{(Number(item.price) || 0).toLocaleString()}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-lg font-bold text-white ${low ? "bg-red-500 animate-pulse" : "bg-green-500"}`}>{stock}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${low ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                              {low ? "เหลือน้อย" : "ปกติ"}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
            <div className={`p-6 text-white ${modalOpen === "sale" ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-gradient-to-r from-emerald-600 to-teal-600"}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {modalOpen === "sale" ? <ShoppingBag /> : <Truck />}
                  {modalOpen === "sale" ? "บันทึกการขาย" : "รับสินค้าเข้า"}
                </h3>
                <button onClick={() => setModalOpen(null)} className="p-2 hover:bg-white/20 rounded-full"><X size={24} /></button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">เลือกสินค้า</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none appearance-none bg-white text-slate-700"
                  >
                    <option value="" disabled>กรุณาเลือกสินค้า</option>
                    {inventory.map((item) => (
                      <option key={item.sku_id} value={item.sku_id}>
                        {item.sku_id} - {item.product_name} (เหลือ {item.current_stock})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">จำนวน</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 font-bold"
                  placeholder="ระบุจำนวน"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setModalOpen(null)} className="flex-1 py-3 border-2 border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50">ยกเลิก</button>
                <button
                  onClick={() => handleTransaction(modalOpen === "sale" ? "OUT" : "IN")}
                  className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105 ${modalOpen === "sale" ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gradient-to-r from-emerald-500 to-teal-600"}`}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- App Root ---
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

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;
  return <InventorySystem user={user} onLogout={handleLogout} />;
};

export default App;
