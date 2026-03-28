import InventoryTable from "./components/InventoryTable";
import ProductForm from "./components/ProductForm";
import { useInventory } from "./hooks/useInventory";
import { Package, AlertCircle, TrendingUp, DollarSign, LayoutDashboard } from "lucide-react";

export default function App() {
  const { products } = useInventory();

  // --- Lógica para Estadísticas Reales ---
  const totalStockValue = products.reduce((acc, p) => acc + (p.priceARS * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  // Supongamos un margen promedio simple para el ejemplo
  const avgMargin = products.length > 0 ? "24.5%" : "0%";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black text-zinc-200 selection:bg-cyan-500/30">

      {/* NAVBAR REDISEÑADA */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-400 mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="group relative">
              <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/10">
                <Package className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-black tracking-tighter text-2xl text-white uppercase block leading-none">
                Stock<span className="text-cyan-500">Master</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase">Hardware_Storage</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              Local: Argentina
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <span>v1.2.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-400 mx-auto p-6 space-y-8">

        {/* DASHBOARD CARDS CON DATOS REALES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Valor Total"
            value={`$${totalStockValue.toLocaleString('es-AR')}`}
            sub="Capital en mercadería"
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
          />
          <StatCard
            title="Alertas Críticas"
            value={`${lowStockCount} Items`}
            sub="Por debajo del mínimo"
            icon={<AlertCircle className="w-5 h-5 text-red-500" />}
            isAlert={lowStockCount > 0}
          />
          <StatCard
            title="Rendimiento"
            value={avgMargin}
            sub="Margen operativo"
            icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}
          />
        </div>

        {/* ESTRUCTURA DE DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* COLUMNA IZQUIERDA: FORMULARIO (Fijo en desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4 flex flex-col">
            <div className="flex items-center gap-2 px-2">
              <LayoutDashboard className="w-4 h-4 text-cyan-500" />
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">Gestión de Entrada</h2>
            </div>
            <ProductForm />
          </div>

          {/* COLUMNA DERECHA: TABLA */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-col items-end justify-between px-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 text-right w-full italic">
                Base de Datos de Inventario
              </h2>
              <span className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase">
                {products.length} productos
              </span>
            </div>
            <InventoryTable />
          </div>

        </div>
      </main>
    </div>
  );
}

// Componente pequeño para las tarjetas de stats (reutilizable)
function StatCard({ title, value, sub, icon, isAlert }: any) {
  return (
    <div className={`bg-zinc-900/20 border transition-all duration-500 p-6 rounded-4xl space-y-2
      ${isAlert ? 'border-red-500/20 bg-red-500/5 ring-1 ring-red-500/10' : 'border-white/5 hover:border-white/10'}`}>
      <div className="flex justify-between items-start">
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
        <div className="p-2 bg-black/40 rounded-xl border border-white/5">{icon}</div>
      </div>
      <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
      <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">{sub}</p>
    </div>
  );
}