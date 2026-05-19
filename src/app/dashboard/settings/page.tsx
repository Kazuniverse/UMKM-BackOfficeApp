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
import { Store, Bell, Shield, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 mt-1">Konfigurasi sistem dan preferensi</p>
      </div>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-emerald-600" />
            <CardTitle>Informasi Toko</CardTitle>
          </div>
          <CardDescription>Atur informasi dasar toko Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Toko</label>
              <Input defaultValue="UMKM Berkah Jaya" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" defaultValue="info@umkmberkah.id" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telepon</label>
              <Input defaultValue="081234567890" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <Input defaultValue="Jl. Raya Utama No. 123, Jakarta" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Simpan Perubahan</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600" />
            <CardTitle>Notifikasi</CardTitle>
          </div>
          <CardDescription>Kelola preferensi notifikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifikasi Stok Menipis</p>
              <p className="text-sm text-gray-500">Dapatkan notifikasi ketika stok produk menipis</p>
            </div>
            <Select defaultValue="yes">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Aktif</SelectItem>
                <SelectItem value="no">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifikasi Transaksi Baru</p>
              <p className="text-sm text-gray-500">Dapatkan notifikasi untuk setiap transaksi baru</p>
            </div>
            <Select defaultValue="yes">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Aktif</SelectItem>
                <SelectItem value="no">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Laporan Mingguan</p>
              <p className="text-sm text-gray-500">Terima ringkasan laporan setiap minggu via email</p>
            </div>
            <Select defaultValue="yes">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Aktif</SelectItem>
                <SelectItem value="no">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            <CardTitle>Keamanan</CardTitle>
          </div>
          <CardDescription>Atur keamanan akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Kata Sandi Saat Ini</label>
            <Input type="password" placeholder="Masukkan kata sandi saat ini" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kata Sandi Baru</label>
            <Input type="password" placeholder="Masukkan kata sandi baru" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Konfirmasi Kata Sandi</label>
            <Input type="password" placeholder="Konfirmasi kata sandi baru" />
          </div>
          <div className="flex justify-end">
            <Button>Ubah Kata Sandi</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <CardTitle>Tagihan & Berlangganan</CardTitle>
          </div>
          <CardDescription>Kelola langganan dan metode pembayaran</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Paket Profesional</p>
              <p className="text-sm text-gray-500">Rp 99.000 / bulan</p>
            </div>
            <Button variant="outline">Kelola Langganan</Button>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Metode Pembayaran</p>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Berlaku hingga 12/25</p>
              </div>
              <Button variant="outline" className="ml-auto">Ubah</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}