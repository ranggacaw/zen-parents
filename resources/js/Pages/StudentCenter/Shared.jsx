import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowLeft, BarChart3, BookOpen, CalendarDays, CheckCircle2, ChevronRight, CircleAlert, ClipboardList, FileText, Wallet } from 'lucide-react';

export function StudentCenterLayout({ student, title, subtitle, currentSection, children, backHref = route('student-center.index'), backLabel = 'Back to Anakku' }) {
    const navItems = [
        { key: 'hub', label: 'Hub', href: route('student-center.show', student.id) },
        { key: 'schedule', label: 'Schedule', href: route('student-center.schedule', student.id) },
        { key: 'rkh', label: 'RKH', href: route('student-center.rkh', student.id) },
        { key: 'attendance', label: 'Attendance', href: route('student-center.attendance', student.id) },
        { key: 'reports', label: 'Reports', href: route('student-center.reports.index', student.id) },
        { key: 'analytics', label: 'Analytics', href: route('student-center.analytics.index', student.id) },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-4">
                    <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900">
                        <ArrowLeft className="h-4 w-4" />
                        <span>{backLabel}</span>
                    </Link>

                    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 text-white shadow-xl">
                        <div className="grid gap-4 p-5 md:grid-cols-[auto,1fr] md:items-center md:p-8">
                            <div className="flex items-center justify-center rounded-[1.5rem] bg-white/10 p-3">
                                <img src={student.avatar_url} alt={`${student.full_name} avatar`} className="h-24 w-24 rounded-[1.25rem] object-cover md:h-28 md:w-28" />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge className="bg-white/15 text-white">Anakku student center</Badge>
                                        <Badge className="bg-emerald-400/20 text-emerald-100">{student.status}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-sky-100">{subtitle}</p>
                                        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    {student.summary_cards.map((item) => (
                                        <div key={item.label} className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                                            <p className="text-xs uppercase tracking-[0.2em] text-sky-100">{item.label}</p>
                                            <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={cn(
                                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition',
                                    currentSection === item.key
                                        ? 'bg-slate-950 text-white'
                                        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            }
        >
            <div className="space-y-4 md:space-y-6">{children}</div>
        </AuthenticatedLayout>
    );
}

export function StudentCenterActionCard({ href, title, description, icon: Icon, tone = 'sky' }) {
    const tones = {
        sky: 'from-sky-50 to-white text-sky-900 ring-sky-100',
        emerald: 'from-emerald-50 to-white text-emerald-900 ring-emerald-100',
        amber: 'from-amber-50 to-white text-amber-900 ring-amber-100',
        violet: 'from-violet-50 to-white text-violet-900 ring-violet-100',
    };

    return (
        <Link href={href} className={cn('block rounded-3xl bg-gradient-to-br p-5 ring-1 transition hover:-translate-y-0.5 hover:shadow-md', tones[tone])}>
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <div className="inline-flex rounded-2xl bg-white/80 p-3">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-base font-semibold">{title}</p>
                        <p className="mt-1 text-sm text-slate-600">{description}</p>
                    </div>
                </div>
                <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" />
            </div>
        </Link>
    );
}

export function SectionCard({ eyebrow, title, description, children, className }) {
    return (
        <Card className={className}>
            <CardHeader className="pb-4">
                {eyebrow ? <CardDescription>{eyebrow}</CardDescription> : null}
                <CardTitle>{title}</CardTitle>
                {description ? <CardDescription>{description}</CardDescription> : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export function StatusBadge({ status }) {
    const tone = status === 'present' ? 'success' : status === 'late' ? 'warning' : status === 'mapped' ? 'success' : status === 'remapped' ? 'info' : 'default';

    return <Badge tone={tone}>{status}</Badge>;
}

export function LegacyInteractionList({ interactions }) {
    return (
        <SectionCard eyebrow="Legacy hooks" title="Interaction handling" description="Source hooks that are outside the current module are either mapped intentionally or downgraded into safe non-breaking UI.">
            <div className="space-y-3">
                {interactions.map((interaction) => (
                    <div key={interaction.key} className="rounded-2xl border border-slate-100 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <p className="font-medium text-slate-950">{interaction.label}</p>
                                <p className="text-sm text-slate-500">Legacy key: {interaction.key}</p>
                            </div>
                            <StatusBadge status={interaction.status} />
                        </div>
                        <p className="mt-3 text-sm text-slate-600">{interaction.description}</p>
                        {interaction.href ? (
                            <Link href={interaction.href} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-800">
                                <Wallet className="h-4 w-4" />
                                Open mapped destination
                            </Link>
                        ) : null}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

export function TrendChart({ points, color = '#0284c7', benchmarkColor = '#94a3b8', yLabel = 'Score' }) {
    if (!points.length) {
        return <EmptyState message="No analytics snapshots are available yet." />;
    }

    const width = 520;
    const height = 220;
    const padding = 24;
    const values = points.flatMap((point) => [point.value, point.benchmark].filter((entry) => Number.isFinite(entry)));
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 100);
    const range = Math.max(max - min, 1);
    const stepX = points.length === 1 ? 0 : (width - padding * 2) / (points.length - 1);

    const toY = (value) => height - padding - ((value - min) / range) * (height - padding * 2);
    const toX = (index) => padding + stepX * index;
    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.value)}`).join(' ');
    const benchmarkPath = points.some((point) => Number.isFinite(point.benchmark))
        ? points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.benchmark ?? min)}`).join(' ')
        : null;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} /> Student</span>
                {benchmarkPath ? <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: benchmarkColor }} /> Benchmark</span> : null}
                <span>{yLabel}</span>
            </div>

            <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full rounded-3xl bg-slate-50 p-3">
                {[0, 1, 2, 3].map((tick) => {
                    const value = min + (range / 3) * tick;
                    const y = toY(value);

                    return (
                        <g key={tick}>
                            <line x1={padding} x2={width - padding} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                            <text x={4} y={y + 4} fill="#64748b" fontSize="10">{Math.round(value)}</text>
                        </g>
                    );
                })}

                {benchmarkPath ? <path d={benchmarkPath} fill="none" stroke={benchmarkColor} strokeDasharray="6 6" strokeWidth="2.5" /> : null}
                <path d={path} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                {points.map((point, index) => (
                    <g key={point.label}>
                        <circle cx={toX(index)} cy={toY(point.value)} r="4.5" fill={color} />
                        <text x={toX(index)} y={height - 4} textAnchor="middle" fill="#475569" fontSize="10">{point.label}</text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

export function GroupedBarChart({ categories, series }) {
    if (!categories.length || !series.length) {
        return <EmptyState message="No chart data is available yet." />;
    }

    const width = 560;
    const height = 240;
    const padding = 24;
    const max = Math.max(...series.flatMap((item) => item.values), 100);
    const chartHeight = height - padding * 2;
    const categoryWidth = (width - padding * 2) / categories.length;
    const barGroupWidth = Math.max(categoryWidth - 16, 32);
    const barWidth = Math.max(Math.min(barGroupWidth / Math.max(series.length, 1) - 6, 28), 10);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                {series.map((item) => (
                    <span key={item.label} className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.label}
                    </span>
                ))}
            </div>

            <svg viewBox={`0 0 ${width} ${height}`} className="h-60 w-full rounded-3xl bg-slate-50 p-3">
                {[0, 25, 50, 75, 100].map((tick) => {
                    const y = height - padding - (tick / max) * chartHeight;

                    return (
                        <g key={tick}>
                            <line x1={padding} x2={width - padding} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                            <text x={4} y={y + 4} fill="#64748b" fontSize="10">{tick}</text>
                        </g>
                    );
                })}

                {categories.map((category, categoryIndex) => {
                    const groupX = padding + categoryWidth * categoryIndex + (categoryWidth - barGroupWidth) / 2;

                    return (
                        <g key={category}>
                            {series.map((item, seriesIndex) => {
                                const value = item.values[categoryIndex] ?? 0;
                                const barHeight = (value / max) * chartHeight;
                                const x = groupX + seriesIndex * (barWidth + 6);
                                const y = height - padding - barHeight;

                                return <rect key={item.label} x={x} y={y} width={barWidth} height={barHeight} rx="8" fill={item.color} />;
                            })}
                            <text x={padding + categoryWidth * categoryIndex + categoryWidth / 2} y={height - 4} textAnchor="middle" fill="#475569" fontSize="10">{category}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export function EmptyState({ message }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            {message}
        </div>
    );
}

export const actionIcons = {
    schedule: CalendarDays,
    rkh: ClipboardList,
    reports: FileText,
    attendance: CheckCircle2,
    analytics: BarChart3,
    story: BookOpen,
    legacy: CircleAlert,
};

export function LinkButton({ href, children, variant = 'secondary', className }) {
    return (
        <Link href={href} className="inline-flex">
            <Button variant={variant} className={className}>{children}</Button>
        </Link>
    );
}
