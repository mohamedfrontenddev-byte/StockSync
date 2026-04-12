import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './features/dashboard/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Branches from './pages/Branches';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-slate-50 text-slate-900">
        {isSidebarOpen && <Sidebar />}
        <main className={`flex-1 p-8 ${isSidebarOpen ? '' : 'ml-0'}`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isSidebarOpen ? 'إخفاء القائمة' : 'إظهار القائمة'}
          </button>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
