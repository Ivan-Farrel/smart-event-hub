import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    UsersIcon, 
    ClockIcon, 
    ArrowTrendingUpIcon,
    ArrowUpRightIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';

// Import komponen Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Dashboard({ auth, stats }) {

    // --- 1. Konfigurasi Bar Chart (Registrasi Bulanan) ---
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false, // Penting biar bisa atur tinggi via CSS Container
        plugins: {
            legend: {
                display: false, // Sembunyikan legend biar clean kayak referensi
            },
            tooltip: {
                backgroundColor: '#111827', // Gray-900 biar modern
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f3f4f6', // Gray-100 biar gridnya halus
                },
                ticks: {
                    color: '#9ca3af', // Gray-400
                    callback: (value) => `$ ${value.toLocaleString()}`, // Dummy formatter uang
                },
            },
            x: {
                grid: {
                    display: false, // Sembunyikan grid vertical biar rapi
                },
                ticks: {
                    color: '#9ca3af', // Gray-400
                },
            },
        },
    };

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'], // 8 bulan dummy
        datasets: [
            {
                label: 'Pendaftaran',
                // Data dummy: disesuaikan dengan tinggi di referensi
                data: [21000, 9500, 14000, 12800, 16000, 20500, 25200, 21500],
                backgroundColor: '#4f46e5', // Indigo-600
                borderRadius: 10, // Rounded top edges kayak di referensi
                barThickness: 30, // Atur ketebalan bar
            },
        ],
    };

    // --- 2. Konfigurasi Doughnut Chart (Status Komunitas) ---
    const doughnutData = {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [
            {
                data: [65, 25, 10], // Persentase dummy
                backgroundColor: [
                    '#4f46e5', // Indigo-600 (Approved)
                    '#f59e0b', // Amber-500 (Pending)
                    '#ef4444', // Red-500 (Rejected)
                ],
                borderWidth: 0, // Tanpa border biar kelihatan clean/modern
                cutout: '75%', // Bikin lubang tengah jadi gede kayak referensi
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Sembunyikan legend bawaan, kita bikin legend custom
            },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-extrabold text-2xl text-gray-950 tracking-tight">System Analytics</h2>
                    <div className="flex items-center text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        <CalendarDaysIcon className="w-5 h-5 mr-2 text-indigo-600" />
                        Aktivitas: <span className="font-bold text-gray-900 ml-1">Hari Ini</span>
                    </div>
                </div>
            }
        >
            <Head title="Enterprise Admin Dashboard" />

            <div className="space-y-8">
                {/* 1. Grid Statistik Cards (Sesuai referensi lu sebelumnya) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total User */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group transition-all hover:border-indigo-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-indigo-50 rounded-xl">
                                <UsersIcon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                                <ArrowTrendingUpIcon className="w-3.5 h-3.5 mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Pengguna</h3>
                        <p className="text-3xl font-black text-gray-950">{stats.total_users}</p>
                    </div>

                    {/* Pending Approval */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group transition-all hover:border-amber-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-50 rounded-xl">
                                <ClockIcon className="w-6 h-6 text-amber-600" />
                            </div>
                            <Link href={route('admin.approvals')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center">
                                Lihat Semua <ArrowUpRightIcon className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Menunggu Persetujuan</h3>
                        <p className="text-3xl font-black text-gray-950">{stats.pending_communities}</p>
                    </div>

                    {/* quick actions / mini server info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center text-indigo-700 mb-3">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-2.5"></div>
                            <span className="text-xs font-bold uppercase tracking-widest">Server Status: Optimal</span>
                        </div>
                        <p className="text-gray-600 text-sm">Latensi: 18ms. Semua sistem berjalan normal. Tidak ada insiden hari ini.</p>
                    </div>
                </div>

                {/* 2. Grid CHARTS (Kayak di Gambar Referensi 2) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- Bar Chart (Registrasi Bulanan) - 2/3 Grid --- */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-lg border border-gray-50 transition-all hover:shadow-xl hover:shadow-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 tracking-tight">Statistik Pendaftaran</h3>
                                <p className="text-sm text-gray-500">Jumlah pendaftaran komunitas vs user bulan ini.</p>
                            </div>
                            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900">
                                <ArrowUpRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Container Chart dengan tinggi fix */}
                        <div className="h-80 relative">
                            <Bar options={barOptions} data={barData} />
                        </div>
                    </div>

                    {/* --- Doughnut Chart (Distribusi Status) - 1/3 Grid --- */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 transition-all hover:shadow-xl hover:shadow-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-950">Status Komunitas</h3>
                                <p className="text-sm text-gray-500">Perbandingan status komunitas saat ini.</p>
                            </div>
                            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900">
                                <ArrowUpRightIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chart Area */}
                        <div className="h-60 relative flex-grow mb-6">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>

                        {/* Custom Legend (Kayak di referensi) */}
                        <div className="space-y-3.5">
                            {doughnutData.labels.map((label, index) => (
                                <div key={label} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {/* Dot warna */}
                                        <div 
                                            className="w-3 h-3 rounded-full mr-3"
                                            style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[index] }}
                                        ></div>
                                        <span className="text-sm font-semibold text-gray-700">{label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-950">
                                        {doughnutData.datasets[0].data[index]}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Recent Activity Section (Contoh tambahan biar komplit) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-950 mb-4">Aktivitas Terbaru</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                        <p>• Komunitas <span className='font-bold text-gray-900'>"Backend Kediri"</span> mendaftar. <span className='text-amber-600 font-bold'>(Pending)</span> - 10mnt yang lalu</p>
                        <p>• User baru <span className='font-bold text-gray-900'>"Budi Santoso"</span> bergabung. - 30mnt yang lalu</p>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}