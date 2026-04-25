import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { SectionCard, StudentCenterLayout } from '../Shared';

export default function Show({ student, report }) {
    const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

    return (
        <StudentCenterLayout student={student} title={report.term} subtitle="Report detail" currentSection="reports" backHref={route('student-center.reports.index', student.id)} backLabel="Back to reports">
            <Head title={`${report.term} | ${student.full_name}`} />

            <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
                <SectionCard eyebrow="Report summary" title="Academic snapshot" description="This detail screen maps the legacy `detailed-b` interaction into an in-page breakdown toggle.">
                    <div className="space-y-4 text-sm text-slate-600">
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                            <div>
                                <p className="font-medium text-slate-950">Final average</p>
                                <p>{report.school_year}</p>
                            </div>
                            <Badge tone="warning">{report.final_average}</Badge>
                        </div>
                        <p>{report.summary}</p>

                        <div className="space-y-3">
                            {report.academic_scores.map((item) => (
                                <div key={item.subject} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                                    <span className="font-medium text-slate-950">{item.subject}</span>
                                    <Badge tone="info">{item.score}</Badge>
                                </div>
                            ))}
                        </div>

                        <Button type="button" variant="secondary" onClick={() => setShowDetailedBreakdown((value) => !value)}>
                            {showDetailedBreakdown ? 'Hide detailed breakdown' : 'Open detailed breakdown'}
                        </Button>
                    </div>
                </SectionCard>

                <SectionCard eyebrow="Teacher note" title="Advice and next focus" description="The report keeps the source-style narrative section beside the score summary.">
                    <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                        {report.advice}
                    </div>
                </SectionCard>
            </div>

            {showDetailedBreakdown ? (
                <div className="grid gap-4 xl:grid-cols-3">
                    <SectionCard title="Behavior" description="Mapped from the report detail interaction.">
                        <div className="space-y-3 text-sm text-slate-600">
                            {report.behavior.map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                                    <span className="capitalize">{item.label.replace('_', ' ')}</span>
                                    <span className="font-medium text-slate-950">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Religious and extracurricular" description="Additional grouped content from the dense source screen.">
                        <div className="space-y-4 text-sm text-slate-600">
                            {report.religious_activities.map((item) => (
                                <div key={`religious-${item.label}`} className="rounded-2xl border border-slate-100 px-4 py-3">
                                    <p className="font-medium text-slate-950 capitalize">{item.label.replace('_', ' ')}</p>
                                    <p className="mt-1">{item.value}</p>
                                </div>
                            ))}
                            {report.extracurricular.map((item) => (
                                <div key={`extra-${item.label}`} className="rounded-2xl border border-slate-100 px-4 py-3">
                                    <p className="font-medium text-slate-950 capitalize">{item.label.replace('_', ' ')}</p>
                                    <p className="mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Physical development" description="Developmental observations remain available without a modal dependency.">
                        <div className="space-y-3 text-sm text-slate-600">
                            {report.physical_development.map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 px-4 py-3">
                                    <span className="capitalize">{item.label.replace('_', ' ')}</span>
                                    <span className="font-medium text-slate-950">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            ) : null}
        </StudentCenterLayout>
    );
}
