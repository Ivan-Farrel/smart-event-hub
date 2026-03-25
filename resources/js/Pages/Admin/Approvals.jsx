import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Approvals({ auth, communities }) {
    const { patch, processing } = useForm();

    const handleApprove = (id) => {
        if (confirm('Setujui komunitas ini?')) {
            patch(route('admin.communities.approve', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-950 tracking-tighter">Persetujuan Komunitas</h2>}
        >
            <Head title="Admin Approvals - Smart Event" />

            <div className="py-6">
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Komunitas</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Pengaju</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tipe</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {communities.length > 0 ? communities.map((community) => (
                                <tr key={community.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-950">{community.name}</div>
                                        <div className="text-xs text-gray-500 line-clamp-1">{community.description}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{community.creator?.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md uppercase">
                                            {community.join_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleApprove(community.id)}
                                            disabled={processing}
                                            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                                        >
                                            Setujui
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500 font-medium">
                                        Tidak ada pengajuan komunitas baru.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}