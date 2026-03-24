import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            {/* Navbar Modern & Clean */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo - Minimalist style */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-extrabold text-gray-950 tracking-tight">
                                    Smart<span className="text-indigo-600">Event.</span>
                                </Link>
                            </div>

                            {/* Navigation Links - Centered & Clean */}
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                {/* <NavLink href={route('events.index')} active={route().current('events.index')}>
                                    Jelajahi Event
                                </NavLink> */}
                                {/* Menu khusus Organizer/Admin */}
                                {(user.role === 'organizer' || user.role === 'admin') && (
                                    <NavLink href={route('events.create')} active={route().current('events.create')}>
                                        Buat Event
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* User Settings Dropdown - Right Side */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-semibold rounded-lg text-gray-800 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <span className="ms-1 text-indigo-600 capitalize">({user.role})</span>
                                                <svg className="ms-2 -me-0.5 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profil Saya</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Keluar</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        {/* ... (Mobile menu button code, keep it but style it clean) */}
                    </div>
                </div>
            </nav>

            {/* Page Content - Minimalist Container */}
            <main className="max-w-7xl mx-auto py-10 px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}