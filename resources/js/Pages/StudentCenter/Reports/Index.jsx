import { Badge } from '@/Components/ui/badge';
import { Head, Link } from '@inertiajs/react';
import { EmptyState, SectionCard, StudentCenterLayout } from '../Shared';

export default function Index({ student }) {
    return (
        <StudentCenterLayout student={student} title="Reports" subtitle={student.full_name} currentSection="reports" backHref={route('student-center.show', student.id)} backLabel="Back to hub">
            <Head title={`Reports | ${student.full_name}`} />

            <SectionCard eyebrow="Linked view" title="Report list" description="The report page stays as a list first, then branches into a report detail screen.">
                {student.reports.length ? (
                    <div className="space-y-4">
                        {student.reports.map((report) => (
                            <Link key={report.id} href={route('student-center.reports.show', [student.id, report.id])} className="block rounded-3xl border border-slate-100 p-5 transition hover:border-sky-200 hover:bg-sky-50">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-lg font-semibold text-slate-950">{report.term}</p>
                                        <p className="text-sm text-slate-500">{report.school_year}</p>
                                    </div>
                                    <Badge tone="info">Average {report.final_average}</Badge>
                                </div>
                                <p className="mt-4 text-sm text-slate-600">{report.summary}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No reports are available yet." />
                )}
            </SectionCard>
        </StudentCenterLayout>
    );
}
