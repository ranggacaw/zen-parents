import { Link } from '@inertiajs/react';
import { Home, Wallet, BookOpen, Activity, LayoutGrid } from 'lucide-react';

export default function BottomNav() {
    return (
        <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 flex justify-between px-6 pb-6 pt-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50">
            <Link href={route('student-center.index')} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-500 group">
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Anakku</span>
            </Link>
            <Link href={route('finance.index')} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-500 group">
                <Wallet className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Transaksi</span>
            </Link>
            <Link href={route('content.index')} className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-500 group">
                <BookOpen className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Akademi</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-500 group">
                <Activity className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Kegiatan</span>
            </Link>
            <Link href="#" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-500 group">
                <LayoutGrid className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Lainnya</span>
            </Link>
        </div>
    );
}
