import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'member', // Default role-nya member
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans antialiased">
            <Head title="Daftar Akun - Smart Event" />

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 p-10 md:p-12">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-extrabold text-gray-950 tracking-tight">
                        Smart<span className="text-indigo-600">Event.</span>
                    </Link>
                    <h1 className="mt-8 text-4xl font-extrabold text-gray-950 tracking-tighter">
                        Buat akun Anda
                    </h1>
                    <p className="mt-2 text-base text-gray-600 font-medium">
                        Bergabung dengan komunitas kami dan mulai kelola event Anda.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">Nama Lengkap</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full mt-1.5 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-sm bg-white"
                            placeholder="Contoh: Ivan Farrel"
                            required
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">Alamat Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full mt-1.5 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-sm bg-white"
                            placeholder="nama@email.com"
                            required
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.email}</p>}
                    </div>

                    {/* ROLE SELECTION */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Daftar Sebagai</label>
                        <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 rounded-xl border border-gray-200">
                            <button
                                type="button"
                                onClick={() => setData('role', 'member')}
                                className={`py-3 px-4 rounded-lg flex items-center justify-center space-x-2.5 transition-all text-sm font-bold ${
                                    data.role === 'member'
                                        ? 'bg-white text-indigo-600 shadow border border-gray-100'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                <span>Member</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setData('role', 'organizer')}
                                className={`py-3 px-4 rounded-lg flex items-center justify-center space-x-2.5 transition-all text-sm font-bold ${
                                    data.role === 'organizer'
                                        ? 'bg-white text-purple-600 shadow border border-gray-100'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                <span>Organizer</span>
                            </button>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-2 ml-1 font-medium">
                            Pilih 'Member' untuk mengikuti event, atau 'Organizer' untuk membuat dan mengelola event.
                        </p>
                    </div>

                    {/* Password Fields */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900">Kata Sandi</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full mt-1.5 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm bg-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900">Konfirmasi Sandi</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full mt-1.5 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm bg-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-950 text-white font-semibold py-3.5 rounded-lg mt-6 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 shadow-sm disabled:opacity-70 text-sm"
                    >
                        {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600 font-medium">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="text-indigo-600 font-bold hover:text-indigo-700">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}