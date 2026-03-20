import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, events }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800 leading-tight">🔥 Explore Events</h2>}
        >
            <Head title="Events" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center relative">
                                    <span className="text-white text-5xl opacity-20 font-black italic uppercase">Event</span>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600">
                                        {event.community?.name}
                                    </div>
                                </div>

                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors italic">{event.title}</h3>
                                    <p className="mt-3 text-gray-500 text-sm line-clamp-3">{event.description}</p>
                                    <div className="mt-6 space-y-2 text-gray-600 text-sm">
                                        <p>📍 {event.location}</p>
                                        <p>📅 {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 border-t flex items-center justify-between">
                                    <span className="text-lg font-black text-indigo-700">
                                        {event.price === 0 ? 'FREE' : `Rp ${event.price.toLocaleString('id-ID')}`}
                                    </span>
                                    <Link href={route('events.show', event.slug)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md">
                                        Detail Event
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}