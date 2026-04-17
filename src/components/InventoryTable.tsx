// src/components/InventoryTable.tsx
import { type Product } from "../hooks/useInventory";
import {
  Search,
  PackagePlus,
  Minus,
  Plus,
  AlertTriangle,
  Trash2,
  X,
  Pencil
} from "lucide-react";
import { useState } from "react";
import ProductForm from "./ProductForm";

// 1. Definimos exactamente qué necesita este componente para funcionar
interface InventoryTableProps {
  products: Product[];
  onAdd: (product: Omit<Product, "id">) => void;
  onUpdate: (id: string, amount: number) => void;
  onDelete: (id: string) => void;
  onUpdateProduct: (id: string, product: Omit<Product, "id">) => void;
}

export default function InventoryTable({
  products,
  onAdd,
  onUpdate,
  onDelete,
  onUpdateProduct
}: InventoryTableProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filtro de búsqueda
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-4">

      {/* BARRA DE ACCIONES */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative group flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Buscar componentes (RTX, Ryzen, Asus...)"
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="w-full md:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <PackagePlus className="w-4 h-4" />
          Añadir Producto
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleCloseModal}
          />

          <div className="relative w-full max-w-2xl transform transition-all animate-in fade-in zoom-in duration-200">
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 p-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer"
            >
              Cerrar <X className="w-5 h-5" />
            </button>

            <div className="shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
              <ProductForm
                initialData={editingProduct}
                onSave={(formData) => {
                  if (editingProduct) {
                    onUpdateProduct(editingProduct.id, formData);
                  } else {
                    onAdd(formData);
                  }
                  handleCloseModal();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* TABLA */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
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

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => onUpdate(product.id, -1)}
                          className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
                          onClick={() => onUpdate(product.id, 1)}
                          className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-sm text-zinc-300">
                      ${product.priceARS.toLocaleString('es-AR')}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-zinc-500 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-lg hover:bg-zinc-800"
                          title="Editar producto"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar ${product.name}?`)) onDelete(product.id);
                          }}
                          className="p-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-lg hover:bg-zinc-800"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center border-t border-zinc-800/50">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] italic">
              // No se encontraron componentes en el sistema _
            </p>
          </div>
        )}
      </div>
    </div>
  );
}