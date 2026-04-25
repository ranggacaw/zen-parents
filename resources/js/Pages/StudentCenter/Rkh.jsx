import { Head } from '@inertiajs/react';
import { EmptyState, SectionCard, StudentCenterLayout } from './Shared';

export default function Rkh({ student }) {
    return (
        <StudentCenterLayout student={student} title="RKH" subtitle={student.full_name} currentSection="rkh" backHref={route('student-center.show', student.id)} backLabel="Back to hub">
            <Head title={`RKH | ${student.full_name}`} />

            <SectionCard eyebrow="Linked view" title="Daily learning plan" description="The RKH screen preserves the same day-to-day lesson focus structure in the cloned module.">
                {student.learning_plans.length ? (
                    <div className="space-y-4">
                        {student.learning_plans.map((plan) => (
                            <div key={`${plan.plan_date}-${plan.title}`} className="rounded-3xl border border-slate-100 p-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-lg font-semibold text-slate-950">{plan.title}</p>
                                        <p className="text-sm text-slate-500">{plan.plan_date} • {plan.focus}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-600">{plan.summary}</p>
                                <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                    <span className="font-medium text-slate-950">Teacher notes:</span> {plan.notes}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No learning plans have been added yet." />
                )}
            </SectionCard>
        </StudentCenterLayout>
    );
}
