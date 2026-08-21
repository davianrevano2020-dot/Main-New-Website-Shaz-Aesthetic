import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F8F6] text-[#3A3632] px-6 text-center">
      <h1 className="font-serif text-5xl font-bold mb-4 text-[#4C5C44]">404</h1>
      <h2 className="text-xl font-medium mb-6">Halaman Tidak Ditemukan</h2>
      <Link 
        href="/"
        className="px-6 py-3 rounded-full bg-[#4C5C44] text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
