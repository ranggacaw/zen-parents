import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ student }) {
    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">Academic visibility</p><h2 className="text-3xl font-semibold">{student.full_name}</h2></div>}>
            <Head title={student.full_name} />
            <div className="space-y-6">
                <div className="portal-grid">
                    <Card><CardHeader><CardDescription>Student overview</CardDescription><CardTitle>{student.class_name}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-slate-600"><p>Homeroom: {student.homeroom_teacher}</p><p>Admission no: {student.admission_number}</p><p>Transport: {student.transport_mode}</p><Badge tone="success">{student.status}</Badge></CardContent></Card>
                    <Card><CardHeader><CardDescription>Attendance</CardDescription><CardTitle>Latest records</CardTitle></CardHeader><CardContent className="space-y-3">{student.attendance.map((item) => <div key={item.attendance_date} className="flex items-center justify-between text-sm"><span>{item.attendance_date}</span><Badge tone={item.status === 'present' ? 'success' : item.status === 'late' ? 'warning' : 'danger'}>{item.status}</Badge></div>)}</CardContent></Card>
                    <Card><CardHeader><CardDescription>Analytics</CardDescription><CardTitle>Trend snapshots</CardTitle></CardHeader><CardContent className="space-y-3">{student.analytics.map((item) => <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-sm"><p className="font-medium text-slate-950">{item.label}</p><p>Overall {item.overall_score} • Knowledge {item.knowledge_score} • Skills {item.skills_score}</p></div>)}</CardContent></Card>
                </div>
                <div className="grid gap-6 xl:grid-cols-2">
                    <Card><CardHeader><CardDescription>Schedule and RKH</CardDescription><CardTitle>Day-to-day learning visibility</CardTitle></CardHeader><CardContent className="space-y-4">{student.schedule.map((item, index) => <div key={`${item.day_name}-${index}`} className="rounded-2xl border border-slate-100 p-4 text-sm"><p className="font-medium">{item.day_name} • {item.subject}</p><p className="text-slate-500">{item.starts_at} - {item.ends_at} • {item.room}</p></div>)}{student.learning_plans.map((item) => <div key={item.plan_date} className="rounded-2xl border border-slate-100 p-4 text-sm"><p className="font-medium">{item.title}</p><p className="text-slate-500">{item.plan_date} • {item.focus}</p><p className="mt-2">{item.summary}</p></div>)}</CardContent></Card>
                    <Card><CardHeader><CardDescription>Detailed report</CardDescription><CardTitle>Academic and developmental detail</CardTitle></CardHeader><CardContent className="space-y-4">{student.reports.map((report) => <div key={report.term} className="rounded-2xl border border-slate-100 p-4 text-sm text-slate-600"><div className="flex items-center justify-between"><p className="font-medium text-slate-950">{report.term}</p><Badge tone="info">Average {report.final_average}</Badge></div><p className="mt-2">{report.summary}</p><pre className="mt-3 whitespace-pre-wrap font-sans text-xs">{JSON.stringify(report.academic_scores, null, 2)}</pre></div>)}</CardContent></Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
