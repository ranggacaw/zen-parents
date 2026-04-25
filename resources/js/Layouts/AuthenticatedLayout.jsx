import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, school } = usePage().props;
    const user = auth.user;
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const navItems = [
        { label: 'Home', routeName: 'dashboard' },
        { label: 'Finance', routeName: 'finance.index' },
        { label: 'Messages', routeName: 'conversations.index' },
        { label: 'Content', routeName: 'content.index' },
        { label: 'Profile', routeName: 'profile.edit' },
    ];

    return (
        <div className="min-h-screen pb-24">
            <div className="portal-shell py-6">
                <div className="rounded-[2rem] bg-slate-950 px-5 py-5 text-white shadow-xl sm:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold">
                                    {school.brand.logo_mark}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-300">{school.name}</p>
                                    <h1 className="text-2xl font-semibold text-white">Parent portal</h1>
                                </div>
                            </div>
                            <p className="max-w-2xl text-sm text-slate-300">{school.tagline}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-white/10 text-white">{user.preferred_name || user.name}</Badge>
                            {installPrompt && school.features.pwa ? (
                                <Button
                                    variant="secondary"
                                    type="button"
                                    onClick={async () => {
                                        await installPrompt.prompt();
                                        setInstallPrompt(null);
                                    }}
                                >
                                    Install app
                                </Button>
                            ) : null}
                            <Link href={route('logout')} method="post" as="button">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                                    Log out
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="portal-shell space-y-6">
                {header ? <header>{header}</header> : null}
                <main>{children}</main>
            </div>

            <nav className="fixed inset-x-0 bottom-4 z-20 mx-auto flex w-[calc(100%-2rem)] max-w-3xl items-center justify-between rounded-full border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur">
                {navItems.map((item) => (
                    <Link
                        key={item.routeName}
                        href={route(item.routeName)}
                        className={cn(
                            'flex-1 rounded-full px-3 py-2 text-center text-sm font-medium text-slate-500 transition',
                            route().current(item.routeName) && 'bg-slate-950 text-white',
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
