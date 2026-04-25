import { Head } from '@inertiajs/react';
import { GroupedBarChart, SectionCard, StudentCenterLayout } from '../Shared';

export default function Final({ student }) {
    return (
        <StudentCenterLayout student={student} title="Final-score analytics" subtitle={student.full_name} currentSection="analytics" backHref={route('student-center.analytics.index', student.id)} backLabel="Back to analytics">
            <Head title={`Final Scores | ${student.full_name}`} />

            <SectionCard eyebrow="Detailed analytics" title="Overall, knowledge, and skills" description="The clone keeps the deeper analytics route as a dedicated screen with explicit chart labels.">
                <GroupedBarChart
                    categories={student.analytics.map((snapshot) => snapshot.label)}
                    series={[
                        { label: 'Overall', color: '#0284c7', values: student.analytics.map((snapshot) => snapshot.overall_score) },
                        { label: 'Knowledge', color: '#7c3aed', values: student.analytics.map((snapshot) => snapshot.knowledge_score) },
                        { label: 'Skills', color: '#10b981', values: student.analytics.map((snapshot) => snapshot.skills_score) },
                    ]}
                />
            </SectionCard>
        </StudentCenterLayout>
    );
}
