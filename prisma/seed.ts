import {
  PrismaClient,
  Role,
  PaymentMethod,
  TransactionStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

async function main() {
  console.log("🌱 Memulai seeding database UMKM...");

  console.log("📝 Membuat user...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@umkm.id" },
    update: {},
    create: {
      name: "Budi Santoso",
      email: "admin@umkm.id",
      password: "$2a$10$E2wGcPKxqN7N7N7N7N7N7OZm9k9k9k9k9k9k9k9k9k9k9k9k9k9k9",
      role: Role.ADMIN,
    },
  });

  const staff1 = await prisma.user.upsert({
    where: { email: "siti@umkm.id" },
    update: {},
    create: {
      name: "Siti Nurhaliza",
      email: "siti@umkm.id",
      password: "$2a$10$E2wGcPKxqN7N7N7N7N7N7OZm9k9k9k9k9k9k9k9k9k9k9k9k9k9k9",
      role: Role.STAFF,
    },
  });

  const staff2 = await prisma.user.upsert({
    where: { email: "ahmad@umkm.id" },
    update: {},
    create: {
      name: "Ahmad Wijaya",
      email: "ahmad@umkm.id",
      password: "$2a$10$E2wGcPKxqN7N7N7N7N7N7OZm9k9k9k9k9k9k9k9k9k9k9k9k9k9k9",
      role: Role.STAFF,
    },
  });

  console.log(`✅ User dibuat: ${admin.name}, ${staff1.name}, ${staff2.name}`);

  console.log("📦 Membuat kategori produk...");
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "makanan" },
      update: {},
      create: { name: "Makanan", slug: "makanan" },
    }),
    prisma.category.upsert({
      where: { slug: "minuman" },
      update: {},
      create: { name: "Minuman", slug: "minuman" },
    }),
    prisma.category.upsert({
      where: { slug: "kerajinan" },
      update: {},
      create: { name: "Kerajinan Tangan", slug: "kerajinan" },
    }),
    prisma.category.upsert({
      where: { slug: "fashion" },
      update: {},
      create: { name: "Fashion & Pakaian", slug: "fashion" },
    }),
    prisma.category.upsert({
      where: { slug: "kosmetik" },
      update: {},
      create: { name: "Kosmetik Alami", slug: "kosmetik" },
    }),
  ]);

  console.log(`✅ Kategori dibuat: ${categories.length} kategori`);
  console.log("🛍️ Membuat produk...");
  await prisma.product.deleteMany();

  const products = await prisma.product.createMany({
    data: [
      {
        name: "Keripik Singkong Balado",
        sku: "MKP-001",
        price: 15000,
        stock: 150,
        category: "makanan",
      },
      {
        name: "Keripik Pisang Coklat",
        sku: "MKP-002",
        price: 18000,
        stock: 120,
        category: "makanan",
      },
      {
        name: "Kacang Atom Pedas",
        sku: "MKP-003",
        price: 12000,
        stock: 200,
        category: "makanan",
      },
      {
        name: "Stik Keju Premium",
        sku: "MKP-004",
        price: 25000,
        stock: 80,
        category: "makanan",
      },
      {
        name: "Basreng (Baso Goreng)",
        sku: "MKP-005",
        price: 20000,
        stock: 100,
        category: "makanan",
      },
      {
        name: "Sale Pisang",
        sku: "MKP-006",
        price: 22000,
        stock: 60,
        category: "makanan",
      },
      {
        name: "Dodol Garut",
        sku: "MKP-007",
        price: 30000,
        stock: 45,
        category: "makanan",
      },
      {
        name: "Emping Melinjo",
        sku: "MKP-008",
        price: 28000,
        stock: 90,
        category: "makanan",
      },
      {
        name: "Kopi Giling Robusta",
        sku: "MNM-001",
        price: 45000,
        stock: 50,
        category: "minuman",
      },
      {
        name: "Kopi Giling Arabika",
        sku: "MNM-002",
        price: 65000,
        stock: 40,
        category: "minuman",
      },
      {
        name: "Teh Hijau Organik",
        sku: "MNM-003",
        price: 35000,
        stock: 75,
        category: "minuman",
      },
      {
        name: "Jahe Instan",
        sku: "MNM-004",
        price: 25000,
        stock: 100,
        category: "minuman",
      },
      {
        name: "Serbuk Kunyit Asam",
        sku: "MNM-005",
        price: 20000,
        stock: 85,
        category: "minuman",
      },
      {
        name: "Tas Anyaman Rotan",
        sku: "KRJ-001",
        price: 150000,
        stock: 25,
        category: "kerajinan",
      },
      {
        name: "Topi Bambu",
        sku: "KRJ-002",
        price: 45000,
        stock: 40,
        category: "kerajinan",
      },
      {
        name: "Tempat Tisu Kayu",
        sku: "KRJ-003",
        price: 55000,
        stock: 35,
        category: "kerajinan",
      },
      {
        name: "Gantungan Kunci Kulit",
        sku: "KRJ-004",
        price: 25000,
        stock: 60,
        category: "kerajinan",
      },
      {
        name: "Lukisan Kaca",
        sku: "KRJ-005",
        price: 250000,
        stock: 10,
        category: "kerajinan",
      },
      {
        name: "Kemeja Batik Pria",
        sku: "FSH-001",
        price: 175000,
        stock: 30,
        category: "fashion",
      },
      {
        name: "Dress Batik Wanita",
        sku: "FSH-002",
        price: 225000,
        stock: 25,
        category: "fashion",
      },
      {
        name: "Selendang Tenun",
        sku: "FSH-003",
        price: 85000,
        stock: 45,
        category: "fashion",
      },
      {
        name: "Kain Sarung Tenun",
        sku: "FSH-004",
        price: 120000,
        stock: 35,
        category: "fashion",
      },
      {
        name: "Syal Sutra",
        sku: "FSH-005",
        price: 95000,
        stock: 50,
        category: "fashion",
      },
      {
        name: "Sabun Alami Madu",
        sku: "KSM-001",
        price: 25000,
        stock: 100,
        category: "kosmetik",
      },
      {
        name: "Lulur Kopi",
        sku: "KSM-002",
        price: 35000,
        stock: 80,
        category: "kosmetik",
      },
      {
        name: "Minyak Kelapa Virgin",
        sku: "KSM-003",
        price: 55000,
        stock: 60,
        category: "kosmetik",
      },
      {
        name: "Masker Bengkoang",
        sku: "KSM-004",
        price: 30000,
        stock: 90,
        category: "kosmetik",
      },
      {
        name: "Serum Wajah Alami",
        sku: "KSM-005",
        price: 75000,
        stock: 45,
        category: "kosmetik",
      },
    ],
  });

  console.log(`✅ Produk dibuat: ${products.count} produk`);
  console.log("📊 Membuat transaksi penjualan...");
  const allProducts = await prisma.product.findMany();
  const transactions = [];

  for (let i = 0; i < 50; i++) {
    const daysAgoValue = Math.floor(Math.random() * 30);
    const transactionDate = daysAgo(daysAgoValue);
    const invoiceNumber = `INV-${String(new Date().getFullYear())}-${String(i + 1).padStart(4, "0")}`;
    const numItems = Math.floor(Math.random() * 4) + 1;
    const selectedProducts = [];
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

    for (let j = 0; j < numItems && j < shuffled.length; j++) {
      const product = shuffled[j];
      const quantity = Math.floor(Math.random() * 5) + 1;
      selectedProducts.push({
        product,
        quantity,
        unitPrice: product.price,
        subtotal: product.price * quantity,
      });
    }

    const totalAmount = selectedProducts.reduce(
      (sum, item) => sum + item.subtotal,
      0,
    );
    const discount = i % 5 === 0 ? Math.floor(totalAmount * 0.1) : 0;
    const finalAmount = totalAmount - discount;

    const paymentMethods: PaymentMethod[] = [
      "CASH",
      "TRANSFER",
      "DEBIT",
      "E_WALLET",
    ];
    const statuses: TransactionStatus[] = [
      "COMPLETED",
      "COMPLETED",
      "COMPLETED",
      "PENDING",
      "CANCELLED",
    ];

    const transaction = await prisma.transaction.create({
      data: {
        invoiceNumber,
        customerName: [
          "Ibu Siti",
          "Bapak Ahmad",
          "Ibu Dewi",
          "Bapak Joko",
          "Ibu Rina",
          "Bapak Hadi",
          "Ibu Lestari",
          "Bapak Bambang",
          "Ibu Wati",
          "Bapak Agus",
          "Ibu Kartini",
          "Bapak Susanto",
          "Ibu Mei Ling",
          "Bapak Rahmat",
          "Ibu Fitri",
        ][i % 15],
        customerPhone: `08${String(Math.floor(Math.random() * 1000000000)).padStart(9, "0")}`,
        totalAmount,
        discount,
        finalAmount,
        paymentMethod:
          paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: transactionDate,
        createdBy: admin.id,
        handledBy: i % 3 === 0 ? staff1.id : staff2.id,
        items: {
          create: selectedProducts.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
          })),
        },
      },
    });

    transactions.push(transaction);
    for (const item of selectedProducts) {
      await prisma.product.update({
        where: { id: item.product.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }
  }

  console.log(`✅ Transaksi dibuat: ${transactions.length} transaksi`);
  console.log("⚠️ Menyesuaikan stok untuk simulasi alert...");
  await prisma.product.update({
    where: { sku: "KRJ-005" },
    data: { stock: 5 },
  });
  await prisma.product.update({
    where: { sku: "MKP-007" },
    data: { stock: 3 },
  });
  await prisma.product.update({
    where: { sku: "MNM-002" },
    data: { stock: 8 },
  });
  await prisma.product.update({
    where: { sku: "FSH-002" },
    data: { stock: 4 },
  });
  await prisma.product.update({
    where: { sku: "KSM-005" },
    data: { stock: 6 },
  });

  console.log("✅ Seeding selesai!");
  console.log("\n📋 Ringkasan:");
  console.log(`   - User: 3 (1 Admin, 2 Staff)`);
  console.log(`   - Kategori: ${categories.length}`);
  console.log(`   - Produk: ${allProducts.length}`);
  console.log(`   - Transaksi: ${transactions.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
