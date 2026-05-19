# UMKM Dashboard - Sistem Manajemen Usaha Mikro Kecil Menengah

Dashboard admin modern untuk mengelola UMKM dengan fitur lengkap, dibangun menggunakan Next.js 14, TypeScript, Prisma ORM, dan Tailwind CSS.

## 🚀 Fitur Utama

### Dashboard Analytics
- Total Pendapatan (format Rupiah)
- Total Transaksi
- Peringatan Stok Menipis
- Total Produk
- Grafik Penjualan Bulanan
- Transaksi Terakhir
- Daftar Produk Stok Menipis

### Manajemen Produk
- CRUD Produk lengkap (Create, Read, Update, Delete)
- Kategori Produk (Makanan, Minuman, Kerajinan, Fashion, Kosmetik)
- Manajemen Stok dengan alert otomatis
- Pencarian & Filter berdasarkan kategori

### Manajemen Transaksi
- Pencatatan penjualan harian
- Invoice otomatis
- Berbagai metode pembayaran (Tunai, Transfer, Debit, E-Wallet)
- Status transaksi (Selesai, Menunggu, Dibatalkan)
- Detail invoice lengkap

### Manajemen Pengguna
- Role-based access (Admin, Staff)
- CRUD Pengguna
- Manajemen hak akses

### Laporan
- Laporan bulanan
- Produk terlaris
- Export data

## 🛠️ Teknologi

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL (support PGLite/Supabase)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (custom implementation)
- **Icons**: Lucide React
- **Charts**: Custom CSS charts (Recharts ready)

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- npm atau pnpm
- PostgreSQL database

### Langkah Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd UMKM
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan dengan database Anda:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/umkm_db?schema=public"
```

4. Generate Prisma Client
```bash
npm run db:generate
```

5. Push schema ke database
```bash
npm run db:push
```

6. Seed database dengan data dummy
```bash
npm run db:seed
```

7. Jalankan development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
src/
├── app/
│   ├── api/              # API Routes
│   │   ├── products/     # Products API
│   │   ├── transactions/ # Transactions API
│   │   ├── users/        # Users API
│   │   └── dashboard/    # Dashboard stats API
│   ├── dashboard/        # Dashboard pages
│   │   ├── products/     # Product management
│   │   ├── transactions/ # Transaction management
│   │   ├── users/        # User management
│   │   ├── reports/      # Reports page
│   │   └── settings/     # Settings page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (redirect to dashboard)
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # UI components (button, card, input, etc.)
│   └── sidebar.tsx       # Sidebar navigation
└── lib/
    ├── prisma.ts         # Prisma client instance
    └── utils.ts          # Utility functions (formatRupiah, etc.)
prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Seed data
```

## 🗄️ Database Schema

### Models
- **User**: Admin/Staff management
- **Category**: Product categories
- **Product**: Products with SKU, price, stock
- **Transaction**: Sales transactions
- **TransactionItem**: Line items in transactions

### Relations
- One-to-Many: Category → Products
- One-to-Many: Transaction → TransactionItems
- One-to-Many: Product → TransactionItems
- One-to-Many: User → Transactions (created/handled)

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction (with auto stock deduction)

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🇮🇩 Lokalisasi Indonesia

- Format mata uang Rupiah (Rp)
- Format tanggal Indonesia
- Label dan teks dalam Bahasa Indonesia
- Format nomor Indonesia

## 📱 Responsive Design

Dashboard didesain responsive untuk:
- Desktop (1920px+)
- Tablet (768px+)
- Mobile (320px+)

## 🔒 Security Notes

- Password hashing diperlukan untuk production (gunakan bcrypt)
- Implement authentication middleware
- Add authorization checks
- Use environment variables for sensitive data

## 📄 License

MIT License

---

Dibuat dengan ❤️ untuk UMKM Indonesia