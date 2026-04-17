// Es el "Cerebro", maneja los datos y el localSorage.-

import { useState, useEffect } from 'react';

// Definimos el tipo de producto.-
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'GPU' | 'CPU' | 'RAM' | 'SSD' | 'PSU';
  stock: number;
  minStock: number;
  costUSD: number;
  priceARS: number;
}

export const useInventory = () => {

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('stock-master-data');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('stock-master-data', JSON.stringify(products));
  }, [products]);

  // Verificar si un producto ya existe (para evitar duplicados).-
  const checkExists = (name: string, brand: string, category: string) => {
    return products.some(p =>
      p.name.toLowerCase().trim() === name.toLowerCase().trim() &&
      p.brand.toLowerCase().trim() === brand.toLowerCase().trim() &&
      p.category === category
    );
  };

  // Agregar un nuevo producto, asegurando que no haya duplicados.-
  const addProduct = (product: Omit<Product, 'id'>) => {

    const isDuplicate = products.some(p =>
      p.name.toLowerCase().trim() === product.name.toLowerCase().trim() &&
      p.brand.toLowerCase().trim() === product.brand.toLowerCase().trim() &&
      p.category === product.category
    );

    if (isDuplicate) {
      // Aquí podrías lanzar un error o retornar un booleano para que el componente sepa
      console.error("El producto ya existe");
      return false;
    }

    const newProduct = { ...product, id: crypto.randomUUID() };
    setProducts(prev => [...prev, newProduct]);
  };

  // Actualizar Stock (Suma o Resta rápida)
  const updateStock = (id: string, amount: number) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p
    ));
  };

  // Editar cualquier campo del producto (Precios, Nombres)
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const lowStockProducts = products.filter(p => p.stock <= p.minStock);

  return {
    products,
    addProduct,
    updateStock,
    checkExists,
    updateProduct,
    deleteProduct,
    lowStockProducts
  };
};