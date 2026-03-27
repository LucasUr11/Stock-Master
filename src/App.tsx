import InventoryTable from "./components/InventoryTable";
import { Package, AlertCircle, TrendingUp, DollarSign } from "lucide-react";

export default function App() {
  // Estos datos son solo para que veas la tabla linda ahora mismo.
  // Una vez que tengamos el formulario, esto vendrá de tu hook useInventory.

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-cyan-500/30">
      {/* HEADER PRINCIPAL */}
      <nav className="border-b border-zinc-800 bg-zinc-900/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Package className="w-5 h-5 text-black" />
            </div>
            <span className="font-black tracking-tighter text-xl text-white uppercase">
              Stock<span className="text-cyan-500">Master</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sistema Online</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* SECCIÓN DE ESTADÍSTICAS RÁPIDAS (RESUMEN) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-2">
            <div className="flex justify-between items-start">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Valor Inventario</p>
              <DollarSign className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-black text-white">$4.250.000</p>
            <p className="text-[10px] text-zinc-600 font-mono">Calculado en base a Precio ARS</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-2">
            <div className="flex justify-between items-start">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Alertas de Stock</p>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-black text-red-400 underline underline-offset-8 decoration-red-500/30">12 Items</p>
            <p className="text-[10px] text-zinc-600 font-mono">Requieren reposición inmediata</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-2 ring-1 ring-cyan-500/20">
            <div className="flex justify-between items-start">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Margen Promedio</p>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-black text-white">22.4%</p>
            <p className="text-[10px] text-zinc-600 font-mono">Rendimiento mensual estimado</p>
          </div>
        </div>

        {/* SECCIÓN DE LA TABLA */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Inventario de Componentes
              <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 font-mono">v1.0</span>
            </h2>
            <button className="px-4 py-2 bg-white text-black text-xs font-black uppercase rounded-xl hover:bg-cyan-500 transition-all active:scale-95">
              + Agregar Producto
            </button>
          </div>
          
          {/* AQUÍ RENDERIZAMOS TU COMPONENTE */}
          <InventoryTable />
        </div>

      </main>

      {/* FOOTER DE ESTILO TERMINAL */}
      <footer className="p-10 border-t border-zinc-900 text-center">
        <p className="text-[10px] font-mono text-zinc-700 tracking-[0.3em] uppercase italic">
          Conectado a la base de datos de hardware_
        </p>
      </footer>
    </div>
  );
}