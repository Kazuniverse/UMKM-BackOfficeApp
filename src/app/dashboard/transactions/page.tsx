"use client";

import { useState } from "react";
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
import {
  formatRupiah,
  formatNumber,
  formatDateTime,
  paymentMethodLabels,
  transactionStatusLabels,
  transactionStatusColors,
} from "@/lib/utils";
import {
  Plus,
  Search,
  Eye,
  ShoppingCart,
  CreditCard,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

// Types
interface TransactionItem {
  id: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Transaction {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  items: TransactionItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

// Mock data
const transactions: Transaction[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-0001",
    customerName: "Ibu Siti",
    customerPhone: "081234567890",
    items: [
      { id: "1", productName: "Keripik Singkong Balado", productSku: "MKP-001", quantity: 5, unitPrice: 15000, subtotal: 75000 },
      { id: "2", productName: "Keripik Pisang Coklat", productSku: "MKP-002", quantity: 3, unitPrice: 18000, subtotal: 54000 },
    ],
    totalAmount: 129000,
    discount: 0,
    finalAmount: 129000,
    paymentMethod: "CASH",
    status: "COMPLETED",
    createdAt: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-0002",
    customerName: "Bapak Ahmad",
    customerPhone: "081234567891",
    items: [
      { id: "3", productName: "Kopi Giling Arabika", productSku: "MNM-002", quantity: 2, unitPrice: 65000, subtotal: 130000 },
    ],
    totalAmount: 130000,
    discount: 13000,
    finalAmount: 117000,
    paymentMethod: "TRANSFER",
    status: "COMPLETED",
    createdAt: new Date("2024-01-15T11:45:00"),
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-0003",
    customerName: "Ibu Dewi",
    customerPhone: "081234567892",
    items: [
      { id: "4", productName: "Tas Anyaman Rotan", productSku: "KRJ-001", quantity: 1, unitPrice: 150000, subtotal: 150000 },
      { id: "5", productName: "Selendang Tenun", productSku: "FSH-003", quantity: 2, unitPrice: 85000, subtotal: 170000 },
    ],
    totalAmount: 320000,
    discount: 0,
    finalAmount: 320000,
    paymentMethod: "E_WALLET",
    status: "PENDING",
    createdAt: new Date("2024-01-14T09:15:00"),
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-0004",
    customerName: "Bapak Joko",
    customerPhone: "081234567893",
    items: [
      { id: "6", productName: "Sabun Alami Madu", productSku: "KSM-001", quantity: 10, unitPrice: 25000, subtotal: 250000 },
      { id: "7", productName: "Lulur Kopi", productSku: "KSM-002", quantity: 5, unitPrice: 35000, subtotal: 175000 },
      { id: "8", productName: "Masker Bengkoang", productSku: "KSM-004", quantity: 5, unitPrice: 30000, subtotal: 150000 },
    ],
    totalAmount: 575000,
    discount: 57500,
    finalAmount: 517500,
    paymentMethod: "DEBIT",
    status: "COMPLETED",
    createdAt: new Date("2024-01-14T14:20:00"),
  },
  {
    id: "5",
    invoiceNumber: "INV-2024-0005",
    customerName: "Ibu Rina",
    customerPhone: "081234567894",
    items: [
      { id: "9", productName: "Kemeja Batik Pria", productSku: "FSH-001", quantity: 2, unitPrice: 175000, subtotal: 350000 },
    ],
    totalAmount: 350000,
    discount: 0,
    finalAmount: 350000,
    paymentMethod: "CASH",
    status: "COMPLETED",
    createdAt: new Date("2024-01-13T16:00:00"),
  },
  {
    id: "6",
    invoiceNumber: "INV-2024-0006",
    customerName: "Bapak Hadi",
    customerPhone: "081234567895",
    items: [
      { id: "10", productName: "Teh Hijau Organik", productSku: "MNM-003", quantity: 4, unitPrice: 35000, subtotal: 140000 },
      { id: "11", productName: "Jahe Instan", productSku: "MNM-004", quantity: 3, unitPrice: 25000, subtotal: 75000 },
    ],
    totalAmount: 215000,
    discount: 0,
    finalAmount: 215000,
    paymentMethod: "E_WALLET",
    status: "CANCELLED",
    createdAt: new Date("2024-01-12T08:30:00"),
  },
];

const products = [
  { id: "1", name: "Keripik Singkong Balado", sku: "MKP-001", price: 15000, stock: 150 },
  { id: "2", name: "Keripik Pisang Coklat", sku: "MKP-002", price: 18000, stock: 120 },
  { id: "3", name: "Kacang Atom Pedas", sku: "MKP-003", price: 12000, stock: 200 },
  { id: "4", name: "Kopi Giling Arabika", sku: "MNM-002", price: 65000, stock: 8 },
  { id: "5", name: "Tas Anyaman Rotan", sku: "KRJ-001", price: 150000, stock: 25 },
  { id: "6", name: "Sabun Alami Madu", sku: "KSM-001", price: 25000, stock: 100 },
  { id: "7", name: "Kemeja Batik Pria", sku: "FSH-001", price: 175000, stock: 30 },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Calculate totals
  const totalRevenue = transactions
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.finalAmount, 0);
  const totalTransactions = transactions.length;
  const avgTransactionValue = totalTransactions > 0 ? totalRevenue / transactions.filter(t => t.status === "COMPLETED").length : 0;

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || t.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // View invoice
  const viewInvoice = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsInvoiceModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaksi</h1>
          <p className="text-gray-500 mt-1">Kelola penjualan dan transaksi</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Transaksi Baru
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(totalRevenue)}</div>
            <p className="text-xs text-gray-500">Transaksi selesai</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-gray-500">Semua status</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Rata-rata</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(avgTransactionValue)}</div>
            <p className="text-xs text-gray-500">Per transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaksi Hari Ini</CardTitle>
            <Wallet className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactions.filter(t => new Date(t.createdAt).toDateString() === new Date().toDateString()).length}
            </div>
            <p className="text-xs text-gray-500">Transaksi baru</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari invoice atau pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="COMPLETED">Selesai</SelectItem>
                <SelectItem value="PENDING">Menunggu</SelectItem>
                <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Metode Bayar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Metode</SelectItem>
                <SelectItem value="CASH">Tunai</SelectItem>
                <SelectItem value="TRANSFER">Transfer</SelectItem>
                <SelectItem value="DEBIT">Debit</SelectItem>
                <SelectItem value="E_WALLET">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>
            Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">No. Invoice</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Pelanggan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tanggal</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Metode</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono font-medium">
                      {transaction.invoiceNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium">{transaction.customerName}</p>
                        <p className="text-xs text-gray-500">{transaction.customerPhone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDateTime(transaction.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {paymentMethodLabels[transaction.paymentMethod] || transaction.paymentMethod}
                    </td>
                    <td className="py-3 px-4 text-sm font-bold">
                      {formatRupiah(transaction.finalAmount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${transactionStatusColors[transaction.status] || ""}`}>
                        {transactionStatusLabels[transaction.status] || transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewInvoice(transaction)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Modal */}
      {isInvoiceModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Invoice</CardTitle>
                  <CardDescription>{selectedTransaction.invoiceNumber}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsInvoiceModalOpen(false)}>
                  Tutup
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Pelanggan</p>
                  <p className="font-medium">{selectedTransaction.customerName}</p>
                  <p className="text-sm text-gray-500">{selectedTransaction.customerPhone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tanggal</p>
                  <p className="font-medium">{formatDateTime(selectedTransaction.createdAt)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${transactionStatusColors[selectedTransaction.status] || ""}`}>
                    {transactionStatusLabels[selectedTransaction.status]}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-2 px-3 text-sm font-medium">Produk</th>
                      <th className="text-right py-2 px-3 text-sm font-medium">Qty</th>
                      <th className="text-right py-2 px-3 text-sm font-medium">Harga</th>
                      <th className="text-right py-2 px-3 text-sm font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.items.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-2 px-3">
                          <p className="text-sm font-medium">{item.productName}</p>
                          <p className="text-xs text-gray-500">{item.productSku}</p>
                        </td>
                        <td className="py-2 px-3 text-right text-sm">{item.quantity}</td>
                        <td className="py-2 px-3 text-right text-sm">{formatRupiah(item.unitPrice)}</td>
                        <td className="py-2 px-3 text-right text-sm font-medium">
                          {formatRupiah(item.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatRupiah(selectedTransaction.totalAmount)}</span>
                </div>
                {selectedTransaction.discount > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Diskon</span>
                    <span>-{formatRupiah(selectedTransaction.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>{formatRupiah(selectedTransaction.finalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 border-t pt-2">
                  <span>Metode Pembayaran</span>
                  <span>{paymentMethodLabels[selectedTransaction.paymentMethod]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Transaksi Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Fitur transaksi baru akan segera tersedia. Silakan gunakan data dummy yang sudah ada.
              </p>
              <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Tutup</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}