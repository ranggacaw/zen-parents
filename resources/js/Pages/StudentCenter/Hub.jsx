import { Badge } from '@/Components/ui/badge';
import { Head } from '@inertiajs/react';
import { actionIcons, LegacyInteractionList, SectionCard, StudentCenterActionCard, StudentCenterLayout, TrendChart } from './Shared';

export default function Hub({ student }) {
    const latestAttendance = student.attendance[0];
    const latestReport = student.reports[0];
    const latestSnapshot = student.analytics[student.analytics.length - 1];

    return (
        <StudentCenterLayout student={student} title={student.full_name} subtitle="Student detail hub" currentSection="hub">
            <Head title={`${student.full_name} | Anakku`} />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <StudentCenterActionCard href={route('student-center.schedule', student.id)} title="Schedule" description="Daily timetable with room and teacher details." icon={actionIcons.schedule} tone="sky" />
                <StudentCenterActionCard href={route('student-center.rkh', student.id)} title="RKH" description="Daily learning plan focus and notes." icon={actionIcons.rkh} tone="emerald" />
                <StudentCenterActionCard href={route('student-center.reports.index', student.id)} title="Reports" description="Semester summaries and detailed report breakdowns." icon={actionIcons.reports} tone="amber" />
                <StudentCenterActionCard href={route('student-center.attendance', student.id)} title="Attendance" description="Daily presence, lateness, and notes from school." icon={actionIcons.attendance} tone="emerald" />
                <StudentCenterActionCard href={route('student-center.analytics.index', student.id)} title="Analytics" description="Overview, final-score trends, and per-subject performance." icon={actionIcons.analytics} tone="violet" />
                <StudentCenterActionCard href={route('finance.index')} title="Finance handoff" description="Legacy transaction hooks are safely remapped into the finance module." icon={actionIcons.legacy} tone="sky" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SectionCard eyebrow="Child summary" title="Profile and class context" description="The cloned hub keeps the child summary block visible before branching into deeper pages.">
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                            <span>Admission no.</span>
                            <span className="font-medium text-slate-950">{student.admission_number}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                            <span>School year</span>
                            <span className="font-medium text-slate-950">{student.school_year}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                            <span>Birth date</span>
                            <span className="font-medium text-slate-950">{student.birth_date}</span>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                            <p className="font-medium text-slate-950">Family notes</p>
                            <p className="mt-2">{student.family_notes}</p>
                        </div>
                    </div>
                </SectionCard>

                <SectionCard eyebrow="Quick pulse" title="Latest school signals" description="A hub snapshot before drilling deeper into individual screens.">
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-medium text-slate-950">Attendance</p>
                                {latestAttendance ? <Badge tone={latestAttendance.status === 'present' ? 'success' : latestAttendance.status === 'late' ? 'warning' : 'danger'}>{latestAttendance.status}</Badge> : null}
                            </div>
                            <p className="mt-2">{latestAttendance ? `${latestAttendance.attendance_date} • ${latestAttendance.notes}` : 'No attendance records yet.'}</p>
                        </div>
                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                            <p className="font-medium text-slate-950">Latest report</p>
                            <p className="mt-2">{latestReport ? `${latestReport.term} • Average ${latestReport.final_average}` : 'No report has been published yet.'}</p>
                        </div>
                        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                            <p className="font-medium text-slate-950">Current analytics</p>
                            <p className="mt-2">{latestSnapshot ? `Overall ${latestSnapshot.overall_score}, knowledge ${latestSnapshot.knowledge_score}, skills ${latestSnapshot.skills_score}` : 'No analytics snapshots yet.'}</p>
                        </div>
                    </div>
                </SectionCard>

                <SectionCard eyebrow="Health and logistics" title="Daily handoff notes" description="Static module cues preserved from the hardcoded parity-first source approach.">
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="rounded-2xl border border-slate-100 p-4">
                            <p className="font-medium text-slate-950">Health notes</p>
                            <p className="mt-2">{student.health_notes}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 p-4">
                            <p className="font-medium text-slate-950">Transport mode</p>
                            <p className="mt-2">{student.transport_mode}</p>
                        </div>
                    </div>
                </SectionCard>
            </div>

            <SectionCard eyebrow="Analytics preview" title="Overall score trend" description="The clone replaces legacy chart bootstrapping with a React-rendered summary chart.">
                <TrendChart
                    points={student.analytics.map((snapshot) => ({
                        label: snapshot.label,
                        value: snapshot.overall_score,
                        benchmark: snapshot.benchmark.average,
                    }))}
                />
            </SectionCard>

            <LegacyInteractionList interactions={student.legacy_interactions} />
        </StudentCenterLayout>
    );
}
