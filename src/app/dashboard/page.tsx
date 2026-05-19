import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah, formatNumber } from "@/lib/utils";
import {
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data for demonstration (will be replaced with real data from API)
const dashboardData = {
  totalRevenue: 15750000,
  totalOrders: 156,
  lowStockProducts: 5,
  totalProducts: 31,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
};

const monthlySalesData = [
  { month: "Jan", sales: 4200000 },
  { month: "Feb", sales: 3800000 },
  { month: "Mar", sales: 5100000 },
  { month: "Apr", sales: 4700000 },
  { month: "May", sales: 5500000 },
  { month: "Jun", sales: 6200000 },
];

const recentTransactions = [
  { id: "INV-2024-0001", customer: "Ibu Siti", amount: 125000, status: "completed", date: "2024-01-15" },
  { id: "INV-2024-0002", customer: "Bapak Ahmad", amount: 89000, status: "completed", date: "2024-01-15" },
  { id: "INV-2024-0003", customer: "Ibu Dewi", amount: 245000, status: "pending", date: "2024-01-14" },
  { id: "INV-2024-0004", customer: "Bapak Joko", amount: 178000, status: "completed", date: "2024-01-14" },
  { id: "INV-2024-0005", customer: "Ibu Rina", amount: 320000, status: "completed", date: "2024-01-13" },
];

const lowStockProducts = [
  { name: "Lukisan Kaca", sku: "KRJ-005", stock: 5 },
  { name: "Dodol Garut", sku: "MKP-007", stock: 3 },
  { name: "Kopi Giling Arabika", sku: "MNM-002", stock: 8 },
  { name: "Dress Batik Wanita", sku: "FSH-002", stock: 4 },
  { name: "Serum Wajah Alami", sku: "KSM-005", stock: 6 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Selamat datang di Sistem Manajemen UMKM</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(dashboardData.totalRevenue)}</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">+{dashboardData.revenueGrowth}% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.totalOrders)}</div>
            <div className="flex items-center text-sm text-emerald-600 mt-1">
              <ArrowUpRight className="h-4 w-4" />
              <span className="ml-1">+{dashboardData.ordersGrowth}% dari bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Menipis</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.lowStockProducts}</div>
            <p className="text-sm text-red-600 mt-1">Produk perlu restock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.totalProducts)}</div>
            <p className="text-sm text-gray-500 mt-1">Dalam 5 kategori</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Monthly Sales Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle> Grafik Penjualan Bulanan </CardTitle>
            <CardDescription> Pendapatan 6 bulan terakhir </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2 px-4">
              {monthlySalesData.map((item) => {
                const maxHeight = Math.max(...monthlySalesData.map((d) => d.sales));
                const height = (item.sales / maxHeight) * 100;
                return (
                  <div key={item.month} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-gray-500 mb-2">{formatRupiah(item.sales / 1000000)}jt</div>
                    <div
                      className="w-full bg-emerald-500 rounded-t-md transition-all hover:bg-emerald-600"
                      style={{ height: `${height}%`, minHeight: "20px" }}
                    />
                    <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle> Transaksi Terakhir </CardTitle>
            <CardDescription> 5 transaksi paling baru </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {transaction.customer.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.customer}</p>
                      <p className="text-xs text-gray-500">{transaction.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatRupiah(transaction.amount)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {transaction.status === "completed" ? "Selesai" : "Menunggu"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Peringatan Stok Menipis
          </CardTitle>
          <CardDescription> Produk yang perlu segera di-restock </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Nama Produk</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stok Tersedia</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product.sku} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{product.sku}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-bold ${product.stock <= 5 ? "text-red-600" : "text-yellow-600"}`}>
                        {product.stock} unit
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product.stock <= 5
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.stock <= 5 ? "Kritis" : "Rendah"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}