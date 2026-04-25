import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    CheckCircle2, 
    FileText, 
    CreditCard, 
    UserCircle, 
    Users, 
    MapPin, 
    HeartPulse, 
    ChevronRight, 
    MessageSquare,
    Home,
    Activity,
    BookOpen,
    LayoutGrid,
    Wallet
} from 'lucide-react';
import { useState } from 'react';

// Reusable Accordion Item for Data
const DataSection = ({ icon: Icon, title, summary, data, fields }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
            >
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{summary}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="px-4 pb-4 pt-1 bg-slate-50/50">
                    <dl className="grid gap-y-3 sm:grid-cols-2 text-sm px-14">
                        {fields.map(({ key, label, fullWidth }) => (
                            <div key={key} className={fullWidth ? 'sm:col-span-2' : ''}>
                                <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</dt>
                                <dd className="font-medium text-slate-800">
                                    {data?.[key] ? data[key] : <span className="font-normal italic text-slate-400">Belum diisi</span>}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            )}
        </div>
    );
};

export default function Show({ applicant }) {
    const { post, processing } = useForm({});

    const DEMOGRAPHIC_FIELDS = [
        { key: 'gender', label: 'Gender' },
        { key: 'birth_date', label: 'Tanggal Lahir' },
        { key: 'religion', label: 'Agama' },
    ];

    const FAMILY_FIELDS = [
        { key: 'father_name', label: "Nama Ayah" },
        { key: 'mother_name', label: "Nama Ibu" },
        { key: 'parent_phone', label: 'No. Handphone' },
        { key: 'family_card_number', label: 'No. Kartu Keluarga' },
    ];

    const ADDRESS_FIELDS = [
        { key: 'address_line', label: 'Alamat Lengkap', fullWidth: true },
        { key: 'city', label: 'Kota' },
        { key: 'province', label: 'Provinsi' },
        { key: 'postal_code', label: 'Kode Pos' },
    ];

    const HEALTH_FIELDS = [
        { key: 'blood_type', label: 'Golongan Darah' },
        { key: 'allergies', label: 'Alergi' },
        { key: 'medical_notes', label: 'Catatan Medis', fullWidth: true },
    ];

    // Helper for initials
    const initials = applicant.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    const docCount = applicant.supporting_document_paths?.length || 0;

    return (
        <div className="bg-slate-200 min-h-screen font-sans flex justify-center">
            <Head title={applicant.full_name} />

            {/* Mobile App Container */}
            <div className="w-full max-w-[414px] bg-[#f8f9fc] min-h-screen relative shadow-2xl flex flex-col justify-between">
                
                <main className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {/* Cover & Avatar Header */}
                    <div className="relative">
                        {/* Cover Photo */}
                        <div className="h-32 bg-gradient-to-r from-slate-700 to-slate-600 w-full overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop" 
                                alt="Cover" 
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>
                        
                        <div className="px-5 relative">
                            <div className="flex justify-between items-end">
                                {/* Overlapping Avatar */}
                                <div className="-mt-10 relative">
                                    <div className="w-20 h-20 rounded-full border-4 border-[#f8f9fc] bg-indigo-100 flex items-center justify-center overflow-hidden shadow-sm">
                                        <span className="text-2xl font-black text-indigo-500 tracking-tighter">{initials}</span>
                                    </div>
                                </div>
                                
                                {/* Status Badge */}
                                <div className="mb-2">
                                    <div className="bg-amber-100/80 text-amber-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-amber-200">
                                        <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-xs font-bold tracking-tight capitalize">{applicant.status || 'Reviewing'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <h1 className="text-[22px] font-extrabold text-slate-900 leading-tight">{applicant.full_name}</h1>
                                <p className="text-sm text-slate-500 mt-0.5">Pendaftaran: <span className="font-semibold text-slate-700">{applicant.grade_preference}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Key Action Cards */}
                    <div className="px-5 mt-6">
                        <h2 className="text-sm font-bold text-slate-800 mb-3 px-1">Lengkapi Pendaftaran</h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {/* Upload Dokumen Card */}
                            <div className="bg-white rounded-[20px] shadow-sm border border-slate-100/60 overflow-hidden flex flex-col active:scale-95 transition-transform cursor-pointer">
                                <div className="h-24 bg-blue-50 relative flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                                    <FileText className="w-10 h-10 text-blue-500 relative z-10" />
                                    {docCount === 0 && (
                                        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="p-3.5 text-center flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-slate-900 leading-snug">Dokumen</h3>
                                    <p className="text-[10px] font-medium text-slate-500 mt-1">
                                        {docCount > 0 ? `${docCount} Berkas Terupload` : 'Belum Ada Dokumen'}
                                    </p>
                                </div>
                            </div>

                            {/* Pembayaran Card */}
                            <div className="bg-white rounded-[20px] shadow-sm border border-slate-100/60 overflow-hidden flex flex-col active:scale-95 transition-transform cursor-pointer">
                                <div className="h-24 bg-emerald-50 relative flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                                    <CreditCard className="w-10 h-10 text-emerald-500 relative z-10" />
                                    {!applicant.payment_proof_path && (
                                        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="p-3.5 text-center flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-slate-900 leading-snug">Pembayaran</h3>
                                    <p className="text-[10px] font-medium text-slate-500 mt-1">
                                        {applicant.payment_proof_path ? 'Menunggu Konfirmasi' : 'Menunggu Bukti'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Formulir Accordion Group */}
                    <div className="px-5 mt-8">
                        <div className="flex justify-between items-center mb-3 px-1">
                            <h2 className="text-sm font-bold text-slate-800">Data Formulir</h2>
                            <Link href="#" className="text-xs text-emerald-600 font-bold hover:underline">Edit</Link>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100/60 overflow-hidden">
                            <DataSection 
                                icon={UserCircle} 
                                title="Data Demografi" 
                                summary="Gender, TTL, Agama" 
                                data={applicant.demographic_data} 
                                fields={DEMOGRAPHIC_FIELDS} 
                            />
                            <DataSection 
                                icon={Users} 
                                title="Data Keluarga" 
                                summary="Nama Orangtua & Kontak" 
                                data={applicant.family_data} 
                                fields={FAMILY_FIELDS} 
                            />
                            <DataSection 
                                icon={MapPin} 
                                title="Alamat Rumah" 
                                summary={applicant.address_data?.address_line || "Belum diisi"} 
                                data={applicant.address_data} 
                                fields={ADDRESS_FIELDS} 
                            />
                            <DataSection 
                                icon={HeartPulse} 
                                title="Data Kesehatan" 
                                summary="Golongan darah, Alergi" 
                                data={applicant.health_data} 
                                fields={HEALTH_FIELDS} 
                            />
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="px-5 mt-6 mb-6">
                        <button 
                            onClick={() => post(route('applicants.handoff', applicant.id))}
                            disabled={processing}
                            className="w-full bg-slate-900 text-white rounded-[16px] py-4 px-4 flex items-center justify-center gap-2 font-bold shadow-md hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-70"
                        >
                            <MessageSquare className="w-5 h-5 opacity-80" />
                            Tanya Panitia
                        </button>
                    </div>
                </main>

                {/* Bottom Navigation Wrapper */}
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

            </div>
        </div>
    );
}
