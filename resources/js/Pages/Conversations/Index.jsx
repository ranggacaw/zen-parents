import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ staffContacts, conversations }) {
    const { data, setData, post, processing } = useForm({
        contact_name: staffContacts[0]?.name || '',
        contact_role: staffContacts[0]?.role || '',
        subject: '',
        body: '',
        attachment_name: '',
    });

    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">Parent-school messaging</p><h2 className="text-3xl font-semibold">Conversation hub</h2></div>}>
            <Head title="Messages" />
            <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
                <Card>
                    <CardHeader><CardDescription>Staff contacts</CardDescription><CardTitle>Start a new message</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => { e.preventDefault(); post(route('conversations.store')); }} className="space-y-3 text-sm">
                            <select className="h-11 w-full rounded-2xl border border-slate-200 px-4" value={data.contact_name} onChange={(e) => { const selected = staffContacts.find((item) => item.name === e.target.value); setData('contact_name', e.target.value); setData('contact_role', selected?.role || ''); }}>
                                {staffContacts.map((contact) => <option key={contact.name} value={contact.name}>{contact.name} ({contact.role})</option>)}
                            </select>
                            <input className="h-11 w-full rounded-2xl border border-slate-200 px-4" placeholder="Subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} />
                            <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Type your message" value={data.body} onChange={(e) => setData('body', e.target.value)} />
                            <input className="h-11 w-full rounded-2xl border border-slate-200 px-4" placeholder="Attachment name (optional)" value={data.attachment_name} onChange={(e) => setData('attachment_name', e.target.value)} />
                            <button className="rounded-full bg-sky-600 px-4 py-2 font-semibold text-white" disabled={processing}>Send message</button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardDescription>Existing threads</CardDescription><CardTitle>Household-scoped conversations</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {conversations.map((conversation) => (
                            <Link key={conversation.id} href={route('conversations.show', conversation.id)} className="block rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50">
                                <p className="font-medium text-slate-950">{conversation.subject}</p>
                                <p className="text-sm text-slate-500">{conversation.contact_name} • {conversation.contact_role}</p>
                                {conversation.applicant_name ? <p className="text-xs text-slate-400">Applicant: {conversation.applicant_name}</p> : null}
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
