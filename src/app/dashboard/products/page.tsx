"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRupiah, formatNumber } from "@/lib/utils";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
} from "lucide-react";

// Types
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}

interface Category {
  name: string;
  slug: string;
}

// Mock data
const categories: Category[] = [
  { name: "Makanan", slug: "makanan" },
  { name: "Minuman", slug: "minuman" },
  { name: "Kerajinan Tangan", slug: "kerajinan" },
  { name: "Fashion & Pakaian", slug: "fashion" },
  { name: "Kosmetik Alami", slug: "kosmetik" },
];

const initialProducts: Product[] = [
  { id: "1", name: "Keripik Singkong Balado", sku: "MKP-001", price: 15000, stock: 150, category: "makanan" },
  { id: "2", name: "Keripik Pisang Coklat", sku: "MKP-002", price: 18000, stock: 120, category: "makanan" },
  { id: "3", name: "Kacang Atom Pedas", sku: "MKP-003", price: 12000, stock: 200, category: "makanan" },
  { id: "4", name: "Stik Keju Premium", sku: "MKP-004", price: 25000, stock: 80, category: "makanan" },
  { id: "5", name: "Basreng (Baso Goreng)", sku: "MKP-005", price: 20000, stock: 100, category: "makanan" },
  { id: "6", name: "Sale Pisang", sku: "MKP-006", price: 22000, stock: 60, category: "makanan" },
  { id: "7", name: "Dodol Garut", sku: "MKP-007", price: 30000, stock: 3, category: "makanan" },
  { id: "8", name: "Emping Melinjo", sku: "MKP-008", price: 28000, stock: 90, category: "makanan" },
  { id: "9", name: "Kopi Giling Robusta", sku: "MNM-001", price: 45000, stock: 50, category: "minuman" },
  { id: "10", name: "Kopi Giling Arabika", sku: "MNM-002", price: 65000, stock: 8, category: "minuman" },
  { id: "11", name: "Teh Hijau Organik", sku: "MNM-003", price: 35000, stock: 75, category: "minuman" },
  { id: "12", name: "Jahe Instan", sku: "MNM-004", price: 25000, stock: 100, category: "minuman" },
  { id: "13", name: "Tas Anyaman Rotan", sku: "KRJ-001", price: 150000, stock: 25, category: "kerajinan" },
  { id: "14", name: "Topi Bambu", sku: "KRJ-002", price: 45000, stock: 40, category: "kerajinan" },
  { id: "15", name: "Kemeja Batik Pria", sku: "FSH-001", price: 175000, stock: 30, category: "fashion" },
  { id: "16", name: "Dress Batik Wanita", sku: "FSH-002", price: 225000, stock: 4, category: "fashion" },
  { id: "17", name: "Sabun Alami Madu", sku: "KSM-001", price: 25000, stock: 100, category: "kosmetik" },
  { id: "18", name: "Lulur Kopi", sku: "KSM-002", price: 35000, stock: 80, category: "kosmetik" },
  { id: "19", name: "Minyak Kelapa Virgin", sku: "KSM-003", price: 55000, stock: 60, category: "kosmetik" },
  { id: "20", name: "Serum Wajah Alami", sku: "KSM-005", price: 75000, stock: 6, category: "kosmetik" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
  });

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Low stock products
  const lowStockProducts = products.filter((p) => p.stock <= 10);

  // Get category name
  const getCategoryName = (slug: string) => {
    const category = categories.find((c) => c.slug === slug);
    return category?.name || slug;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              sku: formData.sku,
              price: parseInt(formData.price),
              stock: parseInt(formData.stock),
              category: formData.category,
            }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        sku: formData.sku,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
      };
      setProducts([...products, newProduct]);
    }

    closeModal();
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    });
    setIsModalOpen(true);
  };

  // Delete product
  const handleDelete = (productId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  // Open modal for new product
  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      sku: "",
      price: "",
      stock: "",
      category: categories[0]?.slug || "",
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      sku: "",
      price: "",
      stock: "",
      category: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produk</h1>
          <p className="text-gray-500 mt-1">Kelola produk dan inventaris</p>
        </div>
        <Button onClick={openNewProductModal}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-gray-500">Dalam {categories.length} kategori</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Inventaris</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRupiah(products.reduce((sum, p) => sum + p.price * p.stock, 0))}
            </div>
            <p className="text-xs text-gray-500">Total nilai stok</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Menipis</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockProducts.length}</div>
            <p className="text-xs text-gray-500">Produk perlu restock</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari produk berdasarkan nama atau SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
          <CardDescription>
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Nama Produk</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Kategori</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Harga</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stok</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono text-gray-500">{product.sku}</td>
                    <td className="py-3 px-4 text-sm font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{getCategoryName(product.category)}</td>
                    <td className="py-3 px-4 text-sm font-medium">{formatRupiah(product.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-bold ${product.stock <= 10 ? "text-red-600" : ""}`}>
                        {formatNumber(product.stock)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {product.stock === 0 ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Habis</span>
                      ) : product.stock <= 10 ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Menipis</span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Tersedia</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Produk</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama produk"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SKU</label>
                  <Input
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Masukkan SKU (contoh: MKP-001)"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stok</label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Kategori</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <div className="flex justify-end gap-3 px-6 pb-6">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}