// El modal para agregar o editar productos.-

import { useState } from "react";
import { useInventory, type Product } from "../hooks/useInventory";
import { PlusCircle, PackagePlus, DollarSign } from "lucide-react";

export default function ProductForm() {
    const { addProduct } = useInventory();

    // Estado inicial del formulario
    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        brand: "",
        category: "GPU",
        stock: 0,
        minStock: 2,
        costUSD: 0,
        priceARS: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.brand) return alert("Completá los campos básicos");

        addProduct(formData);

        // Limpiar formulario después de agregar
        setFormData({
            name: "",
            brand: "",
            category: "GPU",
            stock: 0,
            minStock: 2,
            costUSD: 0,
            priceARS: 0,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-6 backdrop-blur-md"
        >
            <div className="flex items-center gap-2 mb-2">
                <PackagePlus className="w-5 h-5 text-cyan-500" />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Nuevo Ingreso_</h3>
            </div>

            <div className="flex flex-col">
                {/* Nombre y Marca */}
                <div className="space-y-1 flex flex-col items-start">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Modelo</label>
                    <input
                        type="text"
                        placeholder="Ej: RTX 4080 Super"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="space-y-1 flex flex-col items-start">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Marca</label>
                    <input
                        type="text"
                        placeholder="Ej: ASUS / Gigabyte"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 transition-all"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                </div>

                <div className="space-y-1 flex flex-col items-start">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Categoría</label>
                    <select
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 appearance-none text-zinc-400"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    >
                        <option value="GPU">Graphics Card (GPU)</option>
                        <option value="CPU">Processor (CPU)</option>
                        <option value="RAM">Memory (RAM)</option>
                        <option value="SSD">Storage (SSD)</option>
                        <option value="PSU">Power Supply (PSU)</option>
                    </select>
                </div>

                {/* Stock y Precio */}
                <div className="space-y-1 flex flex-col items-start">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Precio Venta (ARS)</label>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                            <input
                                type="number"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-2 text-sm outline-none focus:border-cyan-500/50"
                                value={formData.priceARS || ""}
                                onChange={(e) => setFormData({ ...formData, priceARS: Number(e.target.value) })}
                            />
                        </div>

                        <div className="md:col-span-2 flex items-center">
                            <button
                                type="submit"
                                className="w-full p-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs py-2 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Registrar Ingreso
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-4 pt-2">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Stock Inicial</label>
                    <input
                        type="number"
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50"
                        placeholder="0"
                        value={formData.stock || ""}
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Stock Mínimo</label>
                    <input
                        type="number"
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50"
                        value={formData.minStock || ""}
                        onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                    />
                </div>

            </div>
        </form>
    );
}