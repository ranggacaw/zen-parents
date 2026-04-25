import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, school } = usePage().props;
    const user = auth.user;
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        const checkTablet = () => {
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        checkTablet();
        window.addEventListener('resize', checkTablet);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('resize', checkTablet);
        };
    }, []);

    const navItems = [
        { label: 'Home', routeName: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: 'Finance', routeName: 'finance.index', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'Messages', routeName: 'conversations.index', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
        { label: 'Content', routeName: 'content.index', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { label: 'Profile', routeName: 'profile.edit', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    ];

    return (
        <div className="min-h-screen pb-20 md:pb-6">
            <div className="portal-shell py-4 md:py-6">
                <div className="rounded-2xl md:rounded-[2rem] bg-slate-950 px-4 md:px-8 py-4 md:py-5 text-white shadow-xl">
                    <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white/10 text-base md:text-lg font-bold">
                                    {school.brand.logo_mark}
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-slate-300">{school.name}</p>
                                    <h1 className="text-xl md:text-2xl font-semibold text-white">Parent portal</h1>
                                </div>
                            </div>
                            <p className="max-w-2xl text-xs md:text-sm text-slate-300 hidden sm:block">{school.tagline}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <Badge className="bg-white/10 text-white text-xs md:text-sm">{user.preferred_name || user.name}</Badge>
                            {installPrompt && school.features.pwa ? (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    type="button"
                                    onClick={async () => {
                                        await installPrompt.prompt();
                                        setInstallPrompt(null);
                                    }}
                                >
                                    <span className="hidden md:inline">Install app</span>
                                    <span className="md:hidden">Install</span>
                                </Button>
                            ) : null}
                            <Link href={route('logout')} method="post" as="button">
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                                    Log out
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="portal-shell space-y-4 md:space-y-6 px-3 md:px-0">
                {header ? <header>{header}</header> : null}
                <main>{children}</main>
            </div>

            {isTablet ? (
                <nav className="fixed left-0 top-0 h-full w-16 md:w-20 lg:w-64 flex-col border-r border-slate-200 bg-white/95 backdrop-blur z-20 hidden md:flex">
                    <div className="flex-1 py-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName)}
                                className={cn(
                                    'flex items-center gap-3 px-3 md:px-4 py-3 mx-2 md:mx-3 rounded-lg md:rounded-xl text-sm font-medium text-slate-500 transition',
                                    route().current(item.routeName) && 'bg-slate-950 text-white'
                                )}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <span className="hidden lg:inline">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            ) : (
                <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] backdrop-blur md:hidden">
                    <div className="flex items-center justify-between max-w-lg mx-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName)}
                                className={cn(
                                    'flex flex-col items-center gap-0.5 flex-1 py-1.5 text-xs font-medium transition',
                                    route().current(item.routeName) ? 'text-slate-950' : 'text-slate-400'
                                )}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </div>
    );
}