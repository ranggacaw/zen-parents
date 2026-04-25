import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventShow({ event }) {
    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">School event</p><h2 className="text-3xl font-semibold">{event.title}</h2></div>}>
            <Head title={event.title} />
            <Card>
                <CardHeader><CardDescription>Event detail and logistics</CardDescription><CardTitle>{event.location}</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600">
                    <Badge tone={event.requires_payment ? 'warning' : 'info'}>{event.registration_status}</Badge>
                    <p>{event.summary}</p>
                    <p>{event.logistics}</p>
                    <p>Cost: Rp {Number(event.cost || 0).toLocaleString()}</p>
                    <Link href={route('finance.index', { category: 'event' })} className="font-medium text-sky-700">Open related event payments</Link>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
