import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRupiah, formatNumber } from "@/lib/utils";
import { Download, FileText, BarChart3, TrendingUp } from "lucide-react";

const monthlyReport = [
  { month: "Januari 2024", revenue: 4200000, orders: 28, avgOrder: 150000 },
  { month: "Februari 2024", revenue: 3800000, orders: 24, avgOrder: 158333 },
  { month: "Maret 2024", revenue: 5100000, orders: 35, avgOrder: 145714 },
  { month: "April 2024", revenue: 4700000, orders: 32, avgOrder: 146875 },
  { month: "Mei 2024", revenue: 5500000, orders: 38, avgOrder: 144737 },
  { month: "Juni 2024", revenue: 6200000, orders: 42, avgOrder: 147619 },
];

const topProducts = [
  { name: "Keripik Singkong Balado", sold: 156, revenue: 2340000 },
  { name: "Kopi Giling Arabika", sold: 89, revenue: 5785000 },
  { name: "Sabun Alami Madu", sold: 234, revenue: 5850000 },
  { name: "Kemeja Batik Pria", sold: 45, revenue: 7875000 },
  { name: "Tas Anyaman Rotan", sold: 28, revenue: 4200000 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-500 mt-1">Analisis dan laporan bisnis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(29500000)}</div>
            <p className="text-xs text-gray-500">6 bulan terakhir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(199)}</div>
            <p className="text-xs text-gray-500">Transaksi berhasil</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Order</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(148241)}</div>
            <p className="text-xs text-gray-500">Per transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Terjual</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(552)}</div>
            <p className="text-xs text-gray-500">Total unit</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Bulanan</CardTitle>
          <CardDescription>Ringkasan performa per bulan</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Bulan</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Pendapatan</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Transaksi</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Rata-rata Order</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((report, index) => (
                <tr key={report.month} className={`border-b hover:bg-gray-50 ${index === monthlyReport.length - 1 ? 'border-0' : ''}`}>
                  <td className="py-3 px-4 text-sm font-medium">{report.month}</td>
                  <td className="py-3 px-4 text-sm text-right font-medium">{formatRupiah(report.revenue)}</td>
                  <td className="py-3 px-4 text-sm text-right">{formatNumber(report.orders)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-500">{formatRupiah(report.avgOrder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produk Terlaris</CardTitle>
          <CardDescription>5 produk dengan penjualan tertinggi</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">#</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Produk</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Terjual</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.name} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-500">{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-right">{formatNumber(product.sold)} unit</td>
                  <td className="py-3 px-4 text-sm text-right font-medium">{formatRupiah(product.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}