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
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-extrabold text-gray-950 tracking-tight">
                                    Smart<span className="text-indigo-600">Event.</span>
                                </Link>
                            </div>

                            {/* Navigation Links - Dinamis berdasarkan Role */}
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex">
                                {/* Link Dashboard Dinamis */}
                                <NavLink 
                                    href={user.role === 'admin' ? route('admin.dashboard') : route('dashboard')} 
                                    active={route().current('dashboard') || route().current('admin.dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                {/* Menu Khusus Admin: Persetujuan */}
                                {user.role === 'admin' && (
                                    <NavLink href={route('admin.approvals')} active={route().current('admin.approvals')}>
                                        Persetujuan
                                    </NavLink>
                                )}

                                <NavLink href={route('communities.index')} active={route().current('communities.index')}>
                                    Jelajahi Komunitas
                                </NavLink>

                                {/* Menu khusus Organizer/Admin untuk Buat Event */}
                                {(user.role === 'organizer' || user.role === 'admin') && (
                                    <NavLink href={route('events.create')} active={route().current('events.create')}>
                                        Buat Event
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* User Settings Dropdown */}
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
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 11.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profil Saya</Dropdown.Link>
                                        <div className="border-t border-gray-100"></div>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 font-bold">
                                            Keluar
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-t border-gray-100'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={user.role === 'admin' ? route('admin.dashboard') : route('dashboard')} active={route().current('dashboard') || route().current('admin.dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        {user.role === 'admin' && (
                            <ResponsiveNavLink href={route('admin.approvals')} active={route().current('admin.approvals')}>
                                Persetujuan
                            </ResponsiveNavLink>
                        )}
                        <ResponsiveNavLink href={route('communities.index')} active={route().current('communities.index')}>
                            Jelajahi Komunitas
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-100">
                        <div className="px-4">
                            <div className="font-bold text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profil Saya</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Keluar</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="max-w-7xl mx-auto py-10 px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}