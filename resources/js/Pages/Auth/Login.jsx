import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex bg-white font-sans antialiased">
            <Head title="Masuk - Smart Event" />

            {/* Kiri: Form Section (Putih Bersih) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo & Header */}
                    <div>
                        <Link href="/" className="text-3xl font-extrabold text-gray-950 tracking-tight">
                            Smart<span className="text-indigo-600">Event.</span>
                        </Link>
                        <h2 className="mt-8 text-4xl font-extrabold text-gray-950 tracking-tighter">
                            Selamat datang kembali
                        </h2>
                        <p className="mt-2 text-base text-gray-600 font-medium">
                            Masukkan detail akun Anda untuk mengelola event.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
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

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-sm font-semibold text-gray-900">Kata Sandi</label>
                                <Link href="#" className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">
                                    Lupa kata sandi?
                                </Link>
                            </div>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-sm bg-white"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 font-medium">Ingat saya</label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gray-950 text-white font-semibold py-3.5 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 shadow-sm disabled:opacity-70 text-sm"
                        >
                            {processing ? 'Sedang masuk...' : 'Masuk sekarang'}
                        </button>
                    </form>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600 font-medium">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="text-indigo-600 font-bold hover:text-indigo-700">
                                Daftar akun baru
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Kanan: Hero Section (Indigo/Ungu Minimalis) */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-50 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/5 backdrop-blur-sm"></div>
                
                <div className="relative z-10 max-w-lg text-center">
                    <div className="inline-flex p-3 bg-white/60 backdrop-blur rounded-2xl shadow-inner border border-white/40 mb-10">
                        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h3 className="text-5xl font-extrabold text-gray-950 tracking-tighter leading-tight">
                        Kelola event jadi lebih <span className="text-indigo-600">mudah.</span>
                    </h3>
                    <p className="mt-6 text-xl text-gray-700 font-medium leading-relaxed">
                        Dari pertemuan komunitas hingga konferensi besar, kelola semuanya dalam satu platform yang bersih.
                    </p>
                </div>
                
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                <div className="absolute -top-12 -left-12 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
            </div>
        </div>
    );
}