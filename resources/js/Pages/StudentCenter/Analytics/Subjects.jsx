import { Head } from '@inertiajs/react';
import { EmptyState, GroupedBarChart, SectionCard, StudentCenterLayout } from '../Shared';

export default function Subjects({ student }) {
    const subjectNames = Array.from(new Set(student.analytics.flatMap((snapshot) => snapshot.subject_scores.map((item) => item.subject))));

    return (
        <StudentCenterLayout student={student} title="Per-subject analytics" subtitle={student.full_name} currentSection="analytics" backHref={route('student-center.analytics.index', student.id)} backLabel="Back to analytics">
            <Head title={`Subject Analytics | ${student.full_name}`} />

            <SectionCard eyebrow="Detailed analytics" title="Subject-level performance" description="The per-subject clone view compares the available subject scores across the snapshot timeline.">
                {subjectNames.length ? (
                    <GroupedBarChart
                        categories={student.analytics.map((snapshot) => snapshot.label)}
                        series={subjectNames.map((subject, index) => ({
                            label: subject,
                            color: ['#0284c7', '#f59e0b', '#10b981', '#7c3aed'][index % 4],
                            values: student.analytics.map((snapshot) => snapshot.subject_scores.find((item) => item.subject === subject)?.score || 0),
                        }))}
                    />
                ) : (
                    <EmptyState message="No subject-level analytics are available yet." />
                )}
            </SectionCard>
        </StudentCenterLayout>
    );
}
