import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, myCommunities = [], upcomingEvents = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-950 tracking-tighter">Ringkasan Aktivitas</h2>}
        >
            <Head title="Dashboard - Smart Event" />

            <div className="py-6">
                {/* 1. Header & Quick Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                            Selamat Datang, {auth.user.name}
                        </h1>
                        <div className="flex items-center mt-1 text-gray-500 font-medium">
                            <svg className="w-4 h-4 mr-1.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            Akun terverifikasi sebagai <span className="ml-1 text-indigo-600 capitalize font-bold">{auth.user.role || 'Member'}</span>
                        </div>
                    </div>
                    
                    {/* Tombol Aksi (Quick Access) */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link 
                            href={route('communities.index')}
                            className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 text-gray-950 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm group"
                        >
                            <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Jelajahi Komunitas
                        </Link>
                        <Link 
                            href={route('communities.create')}
                            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-sm group"
                        >
                            <svg className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                            Buat Komunitas
                        </Link>
                        <Link 
                            href={route('events.index')}
                            className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 text-gray-950 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            Cari Event
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. Section Kiri (Komunitas & Event) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Komunitas Saya */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-extrabold text-gray-950 tracking-tight flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    Komunitas Saya
                                </h4>
                                <Link href="#" className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700">Lihat Semua</Link>
                            </div>

                            {myCommunities.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Data komunitas akan di-render di sini */}
                                </div>
                            ) : (
                                <div className="bg-white border-2 border-dashed border-gray-100 rounded-2xl p-10 text-center flex flex-col items-center">
                                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                    <p className="text-gray-500 font-medium">Belum ada komunitas yang diikuti.</p>
                                </div>
                            )}
                        </section>

                        {/* Event Mendatang */}
                        <section>
                            <h4 className="text-xl font-extrabold text-gray-950 tracking-tight flex items-center mb-4">
                                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                Agenda Mendatang
                            </h4>
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                {upcomingEvents.length > 0 ? (
                                    <p>List Event...</p>
                                ) : (
                                    <div className="flex items-center text-gray-500 py-4">
                                        <svg className="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <p className="text-sm font-medium">Tidak ada jadwal event dalam waktu dekat.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* 3. Sidebar Kanan (Stats & Info) */}
                    <div className="space-y-6">
                        <div className="bg-gray-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 text-indigo-400 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span className="text-xs font-bold uppercase tracking-widest">Informasi</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Lengkapi profil komunitas Anda untuk mempermudah proses verifikasi oleh tim Admin.
                                </p>
                            </div>
                            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h4 className="font-bold text-gray-950 text-sm uppercase tracking-wider mb-5">Statistik Saya</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-gray-500 text-sm font-medium">Event Diikuti</span>
                                    <span className="font-bold text-gray-950">0</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                    <span className="text-gray-500 text-sm font-medium">Poin Kontribusi</span>
                                    <span className="font-bold text-indigo-600">0</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 text-sm font-medium">Komunitas Aktif</span>
                                    <span className="font-bold text-gray-950">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}