import { useForm, Head } from '@inertiajs/react';

export default function CreateCommunity() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        join_type: 'auto',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('communities.store'));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <Head title="Buat Komunitas Baru" />
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight mb-2">Buat Komunitas</h1>
                <p className="text-gray-500 mb-8 font-medium">Ajukan komunitasmu agar orang lain bisa bergabung.</p>
                
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">Nama Komunitas</label>
                        <input 
                            type="text" 
                            className="w-full mt-1.5 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all bg-white"
                            placeholder="Contoh: Komunitas Mahasiswa TI UNP"
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Sistem Bergabung</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setData('join_type', 'auto')}
                                className={`py-3 rounded-lg border-2 font-bold text-sm transition-all ${data.join_type === 'auto' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-100 text-gray-500'}`}
                            >
                                Otomatis (Auto)
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('join_type', 'manual')}
                                className={`py-3 rounded-lg border-2 font-bold text-sm transition-all ${data.join_type === 'manual' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-100 text-gray-500'}`}
                            >
                                Persetujuan (Manual)
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900">Deskripsi</label>
                        <textarea 
                            rows="4"
                            className="w-full mt-1.5 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                            placeholder="Ceritakan tentang komunitas ini..."
                            onChange={e => setData('description', e.target.value)}
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-gray-950 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
                    >
                        {processing ? 'Sedang Mengirim...' : 'Ajukan Komunitas'}
                    </button>
                </form>
            </div>
        </div>
    );
}