import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MaterialShow({ material }) {
    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">Academy viewer</p><h2 className="text-3xl font-semibold">{material.title}</h2></div>}>
            <Head title={material.title} />
            <Card>
                <CardHeader><CardDescription>{material.file_label || 'In-portal reading material'}</CardDescription><CardTitle>{material.description}</CardTitle></CardHeader>
                <CardContent><article className="prose max-w-none prose-slate" dangerouslySetInnerHTML={{ __html: material.content_html }} /></CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
