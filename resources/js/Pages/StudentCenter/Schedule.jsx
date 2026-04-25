import { Head } from '@inertiajs/react';
import { EmptyState, SectionCard, StudentCenterLayout } from './Shared';

export default function Schedule({ student }) {
    const groupedSchedule = student.schedule.reduce((groups, item) => {
        groups[item.day_name] = groups[item.day_name] || [];
        groups[item.day_name].push(item);
        return groups;
    }, {});

    return (
        <StudentCenterLayout student={student} title="Schedule" subtitle={student.full_name} currentSection="schedule" backHref={route('student-center.show', student.id)} backLabel="Back to hub">
            <Head title={`Schedule | ${student.full_name}`} />

            <SectionCard eyebrow="Linked view" title="Weekly class schedule" description="This page clones the schedule destination linked from the student hub.">
                {Object.keys(groupedSchedule).length ? (
                    <div className="space-y-4">
                        {Object.entries(groupedSchedule).map(([dayName, entries]) => (
                            <div key={dayName} className="rounded-3xl border border-slate-100 p-4">
                                <p className="text-base font-semibold text-slate-950">{dayName}</p>
                                <div className="mt-4 space-y-3">
                                    {entries.map((item, index) => (
                                        <div key={`${dayName}-${item.starts_at}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <p className="font-medium text-slate-950">{item.subject}</p>
                                                <span>{item.starts_at} - {item.ends_at}</span>
                                            </div>
                                            <p className="mt-2">{item.room} • {item.teacher_name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No schedule entries are available for this student yet." />
                )}
            </SectionCard>
        </StudentCenterLayout>
    );
}
