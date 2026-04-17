import { useState, useEffect } from "react";
import { useInventory, type Product } from "../hooks/useInventory";
import { PlusCircle, PackagePlus, DollarSign, Pencil } from "lucide-react";

interface ProductFormProps {
    initialData?: Product | null; // Opcional, para modo edición
    onSave: (product: Omit<Product, "id">) => void; // onAdd se convierte en onSave
}

export default function ProductForm({ initialData, onSave }: ProductFormProps) {

    const isEditing = !!initialData;

    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        brand: "",
        category: "GPU",
        stock: 0,
        minStock: 2,
        costUSD: 0,
        priceARS: 0,
    });

    const [isDuplicate, setIsDuplicate] = useState(false);
    const { checkExists } = useInventory();

    useEffect(() => {
        if (formData.name.trim() && formData.brand.trim()) {
            const exists = checkExists(
                formData.name,
                formData.brand,
                formData.category,
            );
            setIsDuplicate(exists); // Actualizamos el estado de duplicado según la verificación.-
        } else {
            setIsDuplicate(false); // Si no hay datos, no consideramos duplicado.-
        }
    }, [formData.name, formData.brand, formData.category, checkExists]);


    useEffect(() => {
        if (initialData) {
            // Si hay datos iniciales, rellenamos el estado.-
            setFormData({
                name: initialData.name,
                brand: initialData.brand,
                category: initialData.category,
                stock: initialData.stock,
                minStock: initialData.minStock,
                costUSD: initialData.costUSD,
                priceARS: initialData.priceARS,
            });
        } else {
            // Si initialData es null, limpiamos el formulario (Modo Creación)
            setFormData({
                name: "", brand: "", category: "GPU", stock: 0, minStock: 2, costUSD: 0, priceARS: 0,
            });
        }
    }, [initialData]); // Se dispara cada vez que initialData cambia en el modal

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.brand) return alert("Completá los campos básicos");

        onSave(formData); // Llamamos a onSave del padre
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-6 backdrop-blur-md"
        >
            <div className="flex items-center gap-2 mb-2">
                {/* Cambiamos el ícono y título condicionalmente */}
                {isEditing ? <Pencil className="w-5 h-5 text-cyan-500" /> : <PackagePlus className="w-5 h-5 text-cyan-500" />}
                <h3 className="text-sm font-black uppercase tracking-widest text-white">
                    {isEditing ? `Editar ${initialData.name}_` : "Nuevo Ingreso_"}
                </h3>
            </div>

            <div className="flex flex-col gap-4">
                {/* Modelo */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Modelo</label>
                    <input
                        type="text"
                        placeholder="Ej: RTX 4080 Super"
                        className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 transition-all text-zinc-200 
                            ${isDuplicate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {isDuplicate && (
                        <p className="text-red-500 text-xs mt-1">
                            Ya existe un producto con este nombre, marca y categoría.
                        </p>
                    )}
                </div>

                {/* Marca */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Marca</label>
                    <input
                        type="text"
                        placeholder="Ej: ASUS / Gigabyte"
                        className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 transition-all text-zinc-200 
                            ${isDuplicate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                    {isDuplicate && (
                        <p className="text-red-500 text-xs mt-1">
                            Ya existe un producto con este nombre, marca y categoría.
                        </p>
                    )}
                </div>

                {/* Categoría */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Categoría</label>
                    <select
                        className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 text-zinc-400 cursor-pointer
                            ${isDuplicate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
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

                {/* Precio y Botón */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Precio Venta (ARS)</label>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                            <input
                                type="number"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-2 text-sm outline-none focus:border-cyan-500/50 text-zinc-200"
                                value={formData.priceARS || ""}
                                onChange={(e) => setFormData({ ...formData, priceARS: Number(e.target.value) })}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer 
                                ${isDuplicate ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={isDuplicate} // Deshabilitamos el botón si hay un producto duplicado.-
                        >
                            {isEditing ? <Pencil className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                            {isEditing ? "Guardar Cambios" : "Registrar Ingreso"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stocks */}
            <div className="flex gap-4 pt-2">
                <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Stock Inicial</label>
                    <input
                        type="number"
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 text-zinc-200"
                        placeholder="0"
                        value={formData.stock || ""}
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Stock Mínimo</label>
                    <input
                        type="number"
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 text-zinc-200"
                        value={formData.minStock || ""}
                        onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                    />
                </div>
            </div>
        </form>
    );
}