import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ filters, transactions, events }) {
    const [status, setStatus] = useState(filters.status || '');
    const [category, setCategory] = useState(filters.category || '');

    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">Finance and events</p><h2 className="text-3xl font-semibold">Household ledger</h2></div>}>
            <Head title="Finance" />
            <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
                <Card>
                    <CardHeader><CardDescription>Transaction history</CardDescription><CardTitle>Filter by payment status and category</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Input placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                            <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                            <Button type="button" onClick={() => router.get(route('finance.index'), { status, category }, { preserveState: true })}>Apply</Button>
                        </div>
                        <div className="space-y-3">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="rounded-2xl border border-slate-100 p-4">
                                    <div className="flex items-center justify-between gap-3"><div><p className="font-medium">{transaction.title}</p><p className="text-sm text-slate-500">{transaction.reference} • {transaction.category}</p></div><Badge tone={transaction.status === 'paid' ? 'success' : transaction.status === 'overdue' ? 'danger' : 'warning'}>{transaction.status}</Badge></div>
                                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600"><span>Rp {transaction.amount.toLocaleString()}</span><span>{transaction.due_date || 'No due date'}</span></div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardDescription>School events</CardDescription><CardTitle>Event detail and payment handoff</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {events.map((event) => (
                            <Link key={event.id} href={route('events.show', event.id)} className="block rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50">
                                <div className="flex items-center justify-between gap-3"><div><p className="font-medium text-slate-950">{event.title}</p><p className="text-sm text-slate-500">{event.location}</p></div><Badge tone={event.requires_payment ? 'warning' : 'info'}>{event.requires_payment ? 'Requires payment' : 'Info only'}</Badge></div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
