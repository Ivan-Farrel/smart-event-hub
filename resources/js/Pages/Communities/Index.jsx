import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, communities }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-950 tracking-tighter">Jelajahi Komunitas</h2>}
        >
            <Head title="Jelajahi Komunitas - Smart Event" />

            <div className="py-6">
                {/* Search & Filter Bar Simpel */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div className="relative w-full md:max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all" 
                            placeholder="Cari komunitas berdasarkan nama..." 
                        />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                        Menampilkan <span className="text-gray-950 font-bold">{communities.length}</span> Komunitas
                    </p>
                </div>

                {/* Grid Komunitas */}
                {communities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {communities.map((community) => (
                            <div key={community.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                {/* Thumbnail (Placeholder kalau gak ada gambar) */}
                                <div className="h-40 bg-gray-100 relative overflow-hidden">
                                    {community.image ? (
                                        <img src={`/storage/${community.image}`} alt={community.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${community.join_type === 'auto' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {community.join_type} Join
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-extrabold text-gray-950 tracking-tight mb-2 truncate">
                                        {community.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
                                        {community.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center text-gray-400 text-xs font-bold">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 01-9-4.912"></path></svg>
                                            {community.users_count || 0} Member
                                        </div>
                                        <Link 
                                            href={route('communities.show', community.slug)}
                                            className="px-4 py-2 bg-gray-950 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-all"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 text-center flex flex-col items-center">
                        <div className="p-4 bg-gray-50 rounded-full mb-4">
                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-950">Belum ada komunitas</h3>
                        <p className="text-gray-500 max-w-xs mt-1">Komunitas yang sudah disetujui Admin akan muncul di sini.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}