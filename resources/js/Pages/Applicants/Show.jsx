import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ applicant }) {
    const { post, processing } = useForm({});

    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">PPDB applicant</p><h2 className="text-3xl font-semibold">{applicant.full_name}</h2></div>}>
            <Head title={applicant.full_name} />
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
                <Card>
                    <CardHeader><CardDescription>Admissions progress</CardDescription><CardTitle>Submitted data and supporting proof</CardTitle></CardHeader>
                    <CardContent className="space-y-5 text-sm text-slate-600">
                        <div className="flex items-center justify-between"><div><p>Preferred level</p><p className="font-medium text-slate-950">{applicant.grade_preference}</p></div><Badge tone="warning">{applicant.status}</Badge></div>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Demographic</p><pre className="mt-2 whitespace-pre-wrap font-sans text-sm">{JSON.stringify(applicant.demographic_data, null, 2)}</pre></div>
                            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Family</p><pre className="mt-2 whitespace-pre-wrap font-sans text-sm">{JSON.stringify(applicant.family_data, null, 2)}</pre></div>
                            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Address</p><pre className="mt-2 whitespace-pre-wrap font-sans text-sm">{JSON.stringify(applicant.address_data, null, 2)}</pre></div>
                            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Health</p><pre className="mt-2 whitespace-pre-wrap font-sans text-sm">{JSON.stringify(applicant.health_data, null, 2)}</pre></div>
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardDescription>Uploads</CardDescription><CardTitle>Payment and supporting documents</CardTitle></CardHeader>
                        <CardContent className="space-y-3 text-sm text-slate-600">
                            <p>Payment proof: {applicant.payment_proof_path || 'Pending upload'}</p>
                            <p>Documents: {(applicant.supporting_document_paths || []).join(', ') || 'No supporting documents uploaded yet'}</p>
                            <p>Status notes: {applicant.status_notes || 'No status notes yet.'}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardDescription>Admissions communication</CardDescription><CardTitle>Message the admissions desk with context attached</CardTitle></CardHeader>
                        <CardContent><Button onClick={() => post(route('applicants.handoff', applicant.id))} disabled={processing}>Open admissions conversation</Button></CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
