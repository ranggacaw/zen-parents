import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ materials, articles, activities, partners }) {
    return (
        <AuthenticatedLayout header={<div><p className="text-sm text-slate-500">Digital content hub</p><h2 className="text-3xl font-semibold">Academy, articles, activities, and partners</h2></div>}>
            <Head title="Content" />
            <div className="portal-grid">
                <Card className="xl:col-span-2"><CardHeader><CardDescription>Academy materials</CardDescription><CardTitle>Embedded learning material viewing</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{materials.map((item) => <Link key={item.id} href={route('materials.show', item.id)} className="rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50"><p className="font-medium text-slate-950">{item.title}</p><p className="mt-2 text-sm text-slate-600">{item.description}</p></Link>)}</CardContent></Card>
                <Card><CardHeader><CardDescription>School articles</CardDescription><CardTitle>Parent reading</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600">{articles.map((item) => <div key={item.id} className="rounded-2xl border border-slate-100 p-4"><p className="font-medium text-slate-950">{item.title}</p><p>{item.excerpt}</p></div>)}</CardContent></Card>
                <Card><CardHeader><CardDescription>Activities</CardDescription><CardTitle>Family discovery</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600">{activities.map((item) => <div key={item.id} className="rounded-2xl border border-slate-100 p-4"><p className="font-medium text-slate-950">{item.title}</p><p>{item.summary}</p></div>)}</CardContent></Card>
                <Card><CardHeader><CardDescription>Partners</CardDescription><CardTitle>Promotions for school families</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-slate-600">{partners.map((item) => <a key={item.id} href={item.cta_url} className="block rounded-2xl border border-slate-100 p-4 hover:border-sky-200 hover:bg-sky-50"><p className="font-medium text-slate-950">{item.title}</p><p>{item.summary}</p></a>)}</CardContent></Card>
            </div>
        </AuthenticatedLayout>
    );
}
