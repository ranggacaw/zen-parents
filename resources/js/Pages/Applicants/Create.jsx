import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ schoolYears, gradeOptions, transportOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        school_year: schoolYears[0],
        grade_preference: gradeOptions[0],
        special_needs: false,
        special_needs_notes: '',
        transport_mode: transportOptions[0],
        aid_program: '',
        distance_km: '',
        commute_minutes: '',
        gender: '',
        birth_date: '',
        religion: '',
        family_card_number: '',
        father_name: '',
        mother_name: '',
        parent_phone: '',
        address_line: '',
        city: '',
        province: '',
        postal_code: '',
        blood_type: '',
        allergies: '',
        medical_notes: '',
        payment_proof: null,
        supporting_documents: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('applicants.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm text-slate-500">Child portfolio and admissions</p>
                    <h2 className="text-3xl font-semibold">New child registration</h2>
                </div>
            }
        >
            <Head title="Register Child" />

            <Card>
                <CardHeader>
                    <CardDescription>PPDB data capture</CardDescription>
                    <CardTitle>Collect demographic, family, health, and admissions proof in one flow</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2 text-sm md:col-span-2"><span>Full name</span><Input value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />{errors.full_name ? <p className="text-xs text-rose-600">{errors.full_name}</p> : null}</label>
                        <label className="space-y-2 text-sm"><span>School year</span><select className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm" value={data.school_year} onChange={(e) => setData('school_year', e.target.value)}>{schoolYears.map((option) => <option key={option}>{option}</option>)}</select></label>
                        <label className="space-y-2 text-sm"><span>Preferred level</span><select className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm" value={data.grade_preference} onChange={(e) => setData('grade_preference', e.target.value)}>{gradeOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                        <label className="space-y-2 text-sm"><span>Gender</span><Input value={data.gender} onChange={(e) => setData('gender', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Birth date</span><Input type="date" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Religion</span><Input value={data.religion} onChange={(e) => setData('religion', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Transport</span><select className="h-11 w-full rounded-2xl border border-slate-200 px-4 text-sm" value={data.transport_mode} onChange={(e) => setData('transport_mode', e.target.value)}>{transportOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                        <label className="space-y-2 text-sm"><span>Aid program</span><Input value={data.aid_program} onChange={(e) => setData('aid_program', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Distance to school (km)</span><Input type="number" step="0.1" value={data.distance_km} onChange={(e) => setData('distance_km', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Commute time (minutes)</span><Input type="number" value={data.commute_minutes} onChange={(e) => setData('commute_minutes', e.target.value)} /></label>
                        <label className="space-y-2 text-sm md:col-span-2"><span>Family card number</span><Input value={data.family_card_number} onChange={(e) => setData('family_card_number', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Father name</span><Input value={data.father_name} onChange={(e) => setData('father_name', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Mother name</span><Input value={data.mother_name} onChange={(e) => setData('mother_name', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Parent phone</span><Input value={data.parent_phone} onChange={(e) => setData('parent_phone', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Blood type</span><Input value={data.blood_type} onChange={(e) => setData('blood_type', e.target.value)} /></label>
                        <label className="space-y-2 text-sm md:col-span-2"><span>Address</span><Input value={data.address_line} onChange={(e) => setData('address_line', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>City</span><Input value={data.city} onChange={(e) => setData('city', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Province</span><Input value={data.province} onChange={(e) => setData('province', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Postal code</span><Input value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} /></label>
                        <label className="flex items-center gap-2 text-sm md:col-span-2"><input type="checkbox" checked={data.special_needs} onChange={(e) => setData('special_needs', e.target.checked)} /><span>Child has special support needs</span></label>
                        <label className="space-y-2 text-sm md:col-span-2"><span>Special needs notes</span><Textarea value={data.special_needs_notes} onChange={(e) => setData('special_needs_notes', e.target.value)} /></label>
                        <label className="space-y-2 text-sm md:col-span-2"><span>Allergies</span><Textarea value={data.allergies} onChange={(e) => setData('allergies', e.target.value)} /></label>
                        <label className="space-y-2 text-sm md:col-span-2"><span>Medical notes</span><Textarea value={data.medical_notes} onChange={(e) => setData('medical_notes', e.target.value)} /></label>
                        <label className="space-y-2 text-sm"><span>Payment proof</span><Input type="file" onChange={(e) => setData('payment_proof', e.target.files[0])} /></label>
                        <label className="space-y-2 text-sm"><span>Supporting documents</span><Input type="file" multiple onChange={(e) => setData('supporting_documents', Array.from(e.target.files))} /></label>
                        <div className="md:col-span-2"><Button disabled={processing}>Submit application</Button></div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
