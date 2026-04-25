import { Head } from '@inertiajs/react';
import { actionIcons, SectionCard, StudentCenterActionCard, StudentCenterLayout, TrendChart } from '../Shared';

export default function Index({ student }) {
    const latestSnapshot = student.analytics[student.analytics.length - 1];

    return (
        <StudentCenterLayout student={student} title="Analytics" subtitle={student.full_name} currentSection="analytics" backHref={route('student-center.show', student.id)} backLabel="Back to hub">
            <Head title={`Analytics | ${student.full_name}`} />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SectionCard eyebrow="Overview" title="Current performance snapshot" description="The analytics landing page keeps the overview before branching into deeper views.">
                    <div className="space-y-3 text-sm text-slate-600">
                        <img src={student.analytics_badge_url} alt="Analytics illustration" className="h-20 w-20 rounded-3xl bg-violet-50 p-3" />
                        <p>Latest checkpoint: <span className="font-medium text-slate-950">{latestSnapshot?.label || 'Not available yet'}</span></p>
                        <p>Overall {latestSnapshot?.overall_score || 0} • Knowledge {latestSnapshot?.knowledge_score || 0} • Skills {latestSnapshot?.skills_score || 0}</p>
                    </div>
                </SectionCard>
                <StudentCenterActionCard href={route('student-center.analytics.final', student.id)} title="Final-score view" description="Grouped chart for overall, knowledge, and skills progression." icon={actionIcons.analytics} tone="violet" />
                <StudentCenterActionCard href={route('student-center.analytics.subjects', student.id)} title="Per-subject view" description="Subject-level performance across the available snapshots." icon={actionIcons.story} tone="sky" />
            </div>

            <SectionCard eyebrow="Overview chart" title="Overall score trend" description="Rendered with React instead of the legacy chart plugin loader.">
                <TrendChart
                    points={student.analytics.map((snapshot) => ({
                        label: snapshot.label,
                        value: snapshot.overall_score,
                        benchmark: snapshot.benchmark.average,
                    }))}
                />
            </SectionCard>
        </StudentCenterLayout>
    );
}
