import { NextResponse } from 'next/server';
import { getPrismaClient } from '../../../prisma';

export async function GET() {
  try {
    const prisma = getPrismaClient();
    // Mencoba melakukan koneksi dan query sederhana
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ 
      status: 'success', 
      message: 'Koneksi ke database MySQL berhasil via Prisma!' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Gagal terhubung ke database MySQL', 
      detail: error.message 
    }, { status: 500 });
  }
}
