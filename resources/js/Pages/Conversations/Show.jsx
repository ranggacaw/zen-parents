import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ conversation }) {
    const { data, setData, post, processing } = useForm({ conversation_id: conversation.id, body: '', attachment_name: '' });

    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">Conversation thread</p><h2 className="text-3xl font-semibold">{conversation.subject}</h2></div>}>
            <Head title={conversation.subject} />
            <Card>
                <CardHeader><CardDescription>{conversation.contact_name} • {conversation.contact_role}</CardDescription><CardTitle>{conversation.applicant_name ? `Linked to ${conversation.applicant_name}` : 'General household conversation'}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        {conversation.messages.map((message) => (
                            <div key={message.id} className={`rounded-2xl p-4 text-sm ${message.sender_type === 'parent' ? 'ml-auto max-w-xl bg-sky-600 text-white' : 'max-w-xl bg-slate-100 text-slate-700'}`}>
                                <p className="font-medium">{message.sender_name}</p>
                                <p className="mt-1">{message.body}</p>
                                {message.attachment_name ? <p className="mt-2 text-xs opacity-80">Attachment-ready: {message.attachment_name}</p> : null}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); post(route('conversations.store')); }} className="space-y-3">
                        <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Reply to the school team" value={data.body} onChange={(e) => setData('body', e.target.value)} />
                        <input className="h-11 w-full rounded-2xl border border-slate-200 px-4" placeholder="Attachment name (optional)" value={data.attachment_name} onChange={(e) => setData('attachment_name', e.target.value)} />
                        <Button disabled={processing}>Send reply</Button>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
