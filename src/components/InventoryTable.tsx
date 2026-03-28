// La tabla visual.-

import { useInventory, type Product } from "../hooks/useInventory";
import { Trash2, Plus, Minus, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";

export default function InventoryTable() {
  const { products, updateStock, deleteProduct } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtro de búsqueda en tiempo real
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* BARRA DE BÚSQUEDA FUTURISTA */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
        <input
          type="text"
          placeholder="Buscar componentes (RTX, Ryzen, Asus...)"
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLA */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="p-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Producto</th>
              <th className="p-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Categoría</th>
              <th className="p-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest text-center">Stock</th>
              <th className="p-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest">Precio (ARS)</th>
              <th className="p-4 text-[10px] font-black uppercase text-zinc-500 tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filteredProducts.map((product) => {
              const isLowStock = product.stock <= product.minStock;

              return (
                <tr 
                  key={product.id} 
                  className={`group transition-colors ${isLowStock ? 'bg-red-500/5 hover:bg-red-500/10' : 'hover:bg-zinc-800/30'}`}
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">{product.brand}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 font-bold uppercase border border-zinc-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => updateStock(product.id, -1)}
                        className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      
                      <div className="flex flex-col items-center min-w-10">
                        <span className={`text-sm font-mono font-bold ${isLowStock ? 'text-red-400' : 'text-cyan-400'}`}>
                          {product.stock}
                        </span>
                        {isLowStock && <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />}
                      </div>

                      <button 
                        onClick={() => updateStock(product.id, 1)}
                        className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm text-zinc-300">
                    ${product.priceARS.toLocaleString('es-AR')}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => {
                        if(confirm(`¿Eliminar ${product.name}?`)) deleteProduct(product.id);
                      }}
                      className="p-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em]">No se encontraron componentes_</p>
          </div>
        )}
      </div>
    </div>
  );
}