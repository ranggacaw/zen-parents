import { Badge } from '@/Components/ui/badge';
import { Head } from '@inertiajs/react';
import { EmptyState, SectionCard, StudentCenterLayout } from './Shared';

export default function Attendance({ student }) {
    const summary = student.attendance.reduce((counts, item) => {
        counts[item.status] = (counts[item.status] || 0) + 1;
        return counts;
    }, {});

    return (
        <StudentCenterLayout student={student} title="Attendance" subtitle={student.full_name} currentSection="attendance" backHref={route('student-center.show', student.id)} backLabel="Back to hub">
            <Head title={`Attendance | ${student.full_name}`} />

            <div className="grid gap-4 md:grid-cols-3">
                <SectionCard title="Present" description="On-time attendance records.">
                    <p className="text-3xl font-semibold text-emerald-600">{summary.present || 0}</p>
                </SectionCard>
                <SectionCard title="Late" description="Arrival after session start.">
                    <p className="text-3xl font-semibold text-amber-600">{summary.late || 0}</p>
                </SectionCard>
                <SectionCard title="Other" description="Any non-standard attendance status.">
                    <p className="text-3xl font-semibold text-slate-600">{Object.entries(summary).filter(([key]) => !['present', 'late'].includes(key)).reduce((total, [, value]) => total + value, 0)}</p>
                </SectionCard>
            </div>

            <SectionCard eyebrow="Linked view" title="Attendance log" description="The attendance destination stays inside the student-center route set.">
                {student.attendance.length ? (
                    <div className="space-y-3">
                        {student.attendance.map((entry) => (
                            <div key={entry.attendance_date} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-sm text-slate-600">
                                <div>
                                    <p className="font-medium text-slate-950">{entry.attendance_date}</p>
                                    <p className="mt-1">{entry.notes}</p>
                                </div>
                                <Badge tone={entry.status === 'present' ? 'success' : entry.status === 'late' ? 'warning' : 'danger'}>{entry.status}</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No attendance entries have been recorded yet." />
                )}
            </SectionCard>
        </StudentCenterLayout>
    );
}
