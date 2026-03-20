import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react'; // Tambah useForm di sini

export default function Show({ auth, event }) {
    // 1. Setup Form Inertia
    const { post, processing, wasSuccessful } = useForm();

    const handleJoin = (e) => {
        e.preventDefault();
        // 2. Kirim request POST ke route events.join
        post(route('events.join', event.slug), {
            preserveScroll: true,
            onSuccess: () => alert('Selamat! Lu resmi terdaftar, Bro! 🔥'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">{event.title}</h2>}
        >
            <Head title={event.title} />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
                        {/* Header Image / Gradient */}
                        <div className="h-64 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-8 text-center">
                            <h1 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter">{event.title}</h1>
                        </div>

                        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Left Content */}
                            <div className="md:col-span-2">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800 underline decoration-indigo-500 decoration-4">Tentang Event</h3>
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            {/* Right Sidebar / Action Card */}
                            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit shadow-inner">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Penyelenggara</label>
                                    <p className="text-indigo-600 font-bold text-lg">@{event.community.name.replace(/\s+/g, '').toLowerCase()}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">📍 Lokasi</label>
                                    <p className="text-gray-800 font-semibold">{event.location}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">📅 Waktu</label>
                                    <p className="text-gray-800 font-semibold">
                                        {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Investasi</label>
                                    <p className="text-3xl font-black text-gray-900 mb-6">
                                        {event.price === 0 ? 'FREE' : `Rp ${event.price.toLocaleString('id-ID')}`}
                                    </p>

                                    {/* 3. Tombol dengan Logic Loading */}
                                    <form onSubmit={handleJoin}>
                                        <button 
                                            type="submit"
                                            disabled={processing}
                                            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex justify-center items-center ${
                                                processing 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                            }`}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    Sabar, Bro...
                                                </span>
                                            ) : 'Daftar Sekarang'}
                                        </button>
                                    </form>
                                    
                                    {wasSuccessful && (
                                        <p className="mt-3 text-center text-green-600 text-sm font-bold animate-bounce">
                                            ✅ Lu udah terdaftar!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}