import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const { school } = usePage().props;

    return (
        <>
            <Head title="Zen Parents" />
            <div className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-10">
                <div className="mx-auto flex max-w-6xl flex-col gap-10">
                    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">{school.short_name}</p>
                            <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-white md:text-6xl">One parent portal for admissions, academics, finance, and school communication.</h1>
                            <p className="mt-4 max-w-2xl text-base text-slate-300">{school.tagline}</p>
                        </div>
                        <nav className="flex gap-3">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                                    Open portal
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950">
                                        Create account
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="grid gap-6 lg:grid-cols-[1.3fr,0.9fr]">
                        <div className="grid gap-6 md:grid-cols-2">
                            {[
                                ['PPDB admissions', 'Start child registration, upload payment proof, and follow admissions status without repeating family data.'],
                                ['Academic visibility', 'Review schedules, daily learning plans, attendance, report details, and performance trends per child.'],
                                ['Finance and events', 'Track tuition, extracurricular fees, event costs, and payment handoffs from one ledger.'],
                                ['Messages and content', 'Contact school teams and read academy materials, articles, activities, and partner offers in one app.'],
                            ].map(([title, body]) => (
                                <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                                    <p className="mt-3 text-sm text-slate-300">{body}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
                            <p className="text-sm text-slate-500">Mobile-first portal shell</p>
                            <h2 className="mt-2 text-2xl font-semibold">Built for a school-branded PWA</h2>
                            <ul className="mt-6 space-y-3 text-sm text-slate-600">
                                <li>Installable on supported mobile browsers</li>
                                <li>Deployment-level branding and feature flags</li>
                                <li>Parent-scoped access control across household data</li>
                                <li>Inertia + React delivery on Laravel</li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
