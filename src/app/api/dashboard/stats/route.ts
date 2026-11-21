import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET() {
  try {
    // Get current month's transactions
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total revenue (completed transactions only)
    const completedTransactions = await prisma.transaction.findMany({
      where: {
        status: "COMPLETED",
      },
      select: {
        finalAmount: true,
      },
    });

    const totalRevenue = completedTransactions.reduce(
      (sum, t) => sum + t.finalAmount,
      0,
    );

    // Monthly revenue
    const monthlyTransactions = await prisma.transaction.findMany({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: startOfMonth,
        },
      },
      select: {
        finalAmount: true,
      },
    });

    const monthlyRevenue = monthlyTransactions.reduce(
      (sum, t) => sum + t.finalAmount,
      0,
    );

    // Total orders
    const totalOrders = await prisma.transaction.count();

    // Monthly orders
    const monthlyOrders = await prisma.transaction.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Low stock products (stock <= 10)
    const lowStockProducts = await prisma.product.count({
      where: {
        stock: {
          lte: 10,
        },
      },
    });

    // Total products
    const totalProducts = await prisma.product.count();

    // Monthly sales trend (last 6 months)
    const monthlySalesData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const monthTransactions = await prisma.transaction.findMany({
        where: {
          status: "COMPLETED",
          createdAt: {
            gte: monthStart,
            lt: monthEnd,
          },
        },
        select: {
          finalAmount: true,
        },
      });

      const monthRevenue = monthTransactions.reduce(
        (sum, t) => sum + t.finalAmount,
        0,
      );

      monthlySalesData.push({
        month: monthStart.toLocaleString("id-ID", { month: "short" }),
        sales: monthRevenue,
      });
    }

    // Recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          take: 2,
          include: {
            product: true,
          },
        },
      },
    });

    // Low stock products details
    const lowStockProductsList = await prisma.product.findMany({
      where: {
        stock: {
          lte: 10,
        },
      },
      take: 5,
      orderBy: {
        stock: "asc",
      },
    });

    return NextResponse.json({
      totalRevenue,
      monthlyRevenue,
      totalOrders,
      monthlyOrders,
      lowStockProducts,
      totalProducts,
      monthlySalesData,
      recentTransactions,
      lowStockProductsList,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 },
    );
  }
}
