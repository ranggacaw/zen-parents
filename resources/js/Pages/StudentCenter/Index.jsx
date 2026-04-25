import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function Index({ students }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm text-slate-500">Anakku clone</p>
                    <h2 className="text-3xl font-semibold">Student center entry</h2>
                </div>
            }
        >
            <Head title="Anakku" />

            <div className="grid gap-4 md:gap-6 xl:grid-cols-[1.1fr,0.9fr]">
                <Card className="bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 text-white">
                    <CardHeader>
                        <CardDescription className="text-sky-100">Mobile journey</CardDescription>
                        <CardTitle className="text-white">Choose an active child card to open the cloned student hub.</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-sky-50">
                        <p>The Anakku clone keeps the original linked journey together: hub, schedule, RKH, reports, attendance, analytics overview, final-score analytics, and per-subject analytics.</p>
                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-white/10 text-white">Mobile-first</Badge>
                            <Badge className="bg-white/10 text-white">Inertia routes</Badge>
                            <Badge className="bg-white/10 text-white">React charts</Badge>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {students.map((student) => (
                        <Link key={student.id} href={route('student-center.show', student.id)} className="block rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <img src={student.avatar_url} alt={`${student.full_name} avatar`} className="h-20 w-20 rounded-[1.5rem] bg-slate-50 object-cover" />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="truncate text-lg font-semibold text-slate-950">{student.full_name}</p>
                                        <Badge tone="success">{student.status}</Badge>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">{student.class_name || 'Class placement pending'} • {student.school_year}</p>
                                    <p className="mt-1 text-sm text-slate-500">Homeroom: {student.homeroom_teacher || 'Teacher not assigned yet'}</p>
                                </div>
                                <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-400" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
