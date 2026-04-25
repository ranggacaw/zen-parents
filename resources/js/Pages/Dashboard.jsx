import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ household, students, applicants, finance_summary, recent_transactions, upcoming_events, conversation_overview, featured_content }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm text-slate-500">Household dashboard</p>
                        <h2 className="text-3xl font-semibold">{household?.name || 'Parent home'}</h2>
                    </div>
                    <Link href={route('applicants.create')}>
                        <Button>Register a child</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Parent Home" />

            <div className="space-y-6">
                <div className="portal-grid">
                    <Card>
                        <CardHeader>
                            <CardDescription>Students</CardDescription>
                            <CardTitle>{students.length} linked child profiles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {students.map((student) => (
                                <Link key={student.id} href={route('students.show', student.id)} className="block rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-medium text-slate-900">{student.full_name}</p>
                                            <p className="text-sm text-slate-500">{student.class_name || 'Pending class placement'}</p>
                                        </div>
                                        <Badge tone="success">{student.status}</Badge>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardDescription>Admissions</CardDescription>
                            <CardTitle>{applicants.length} active PPDB applicants</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {applicants.map((applicant) => (
                                <Link key={applicant.id} href={route('applicants.show', applicant.id)} className="block rounded-2xl border border-slate-100 p-4 hover:border-amber-200 hover:bg-amber-50">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-medium text-slate-900">{applicant.full_name}</p>
                                            <p className="text-sm text-slate-500">{applicant.grade_preference} • {applicant.school_year}</p>
                                        </div>
                                        <Badge tone="warning">{applicant.status}</Badge>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardDescription>Finance</CardDescription>
                            <CardTitle>Household payment visibility</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-2xl bg-amber-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-amber-700">Pending</p>
                                <p className="mt-2 text-2xl font-semibold">Rp {finance_summary.pending_total.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl bg-emerald-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-emerald-700">Paid</p>
                                <p className="mt-2 text-2xl font-semibold">Rp {finance_summary.paid_total.toLocaleString()}</p>
                            </div>
                            <div className="rounded-2xl bg-rose-50 p-4">
                                <p className="text-xs uppercase tracking-wide text-rose-700">Overdue</p>
                                <p className="mt-2 text-2xl font-semibold">Rp {finance_summary.overdue_total.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
                    <Card>
                        <CardHeader>
                            <CardDescription>Recent finance activity</CardDescription>
                            <CardTitle>Transactions and school events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                {recent_transactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4">
                                        <div>
                                            <p className="font-medium">{transaction.title}</p>
                                            <p className="text-sm text-slate-500">{transaction.category} • {transaction.reference}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge tone={transaction.status === 'paid' ? 'success' : transaction.status === 'overdue' ? 'danger' : 'warning'}>{transaction.status}</Badge>
                                            <p className="mt-2 text-sm font-medium">Rp {transaction.amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-semibold">Upcoming events</h3>
                                {upcoming_events.map((event) => (
                                    <Link key={event.id} href={route('events.show', event.id)} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50">
                                        <div>
                                            <p className="font-medium">{event.title}</p>
                                            <p className="text-sm text-slate-500">{event.location}</p>
                                        </div>
                                        <Badge tone={event.requires_payment ? 'warning' : 'info'}>{event.requires_payment ? 'Paid event' : 'Info'}</Badge>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardDescription>Messaging</CardDescription>
                                <CardTitle>Latest conversations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {conversation_overview.map((conversation) => (
                                    <Link key={conversation.id} href={route('conversations.show', conversation.id)} className="block rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50">
                                        <p className="font-medium">{conversation.subject}</p>
                                        <p className="text-sm text-slate-500">{conversation.contact_name} • {conversation.contact_role}</p>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardDescription>Content hub</CardDescription>
                                <CardTitle>Academy and partner highlights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-slate-600">
                                {featured_content.materials.map((item) => (
                                    <Link key={`m-${item.id}`} href={route('materials.show', item.id)} className="block rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50">
                                        <p className="font-medium text-slate-900">{item.title}</p>
                                        <p>{item.description}</p>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
