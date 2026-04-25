import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status, household }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || household?.primary_contact_name || '',
        preferred_name: user.preferred_name || '',
        email: user.email || household?.primary_email || '',
        phone: user.phone || household?.primary_phone || '',
        household_name: household?.name || '',
        primary_phone: household?.primary_phone || '',
        spouse_name: household?.spouse_name || '',
        spouse_email: household?.spouse_email || '',
        spouse_phone: household?.spouse_phone || '',
        guardian_name: household?.guardian_name || '',
        guardian_phone: household?.guardian_phone || '',
        address_line: household?.address_line || '',
        city: household?.city || '',
        province: household?.province || '',
        postal_code: household?.postal_code || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm text-slate-500">Identity and household access</p>
                    <h2 className="text-3xl font-semibold">Profile settings</h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <Card>
                    <CardHeader>
                        <CardDescription>Parent and household details</CardDescription>
                        <CardTitle>Keep admissions, finance, and messaging contacts current</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-2 text-sm">
                                <span>Parent name</span>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name ? <p className="text-xs text-rose-600">{errors.name}</p> : null}
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Preferred name</span>
                                <Input value={data.preferred_name} onChange={(e) => setData('preferred_name', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Email</span>
                                <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Phone</span>
                                <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm md:col-span-2">
                                <span>Household name</span>
                                <Input value={data.household_name} onChange={(e) => setData('household_name', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Spouse name</span>
                                <Input value={data.spouse_name} onChange={(e) => setData('spouse_name', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Spouse email</span>
                                <Input type="email" value={data.spouse_email} onChange={(e) => setData('spouse_email', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Spouse phone</span>
                                <Input value={data.spouse_phone} onChange={(e) => setData('spouse_phone', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Guardian name</span>
                                <Input value={data.guardian_name} onChange={(e) => setData('guardian_name', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Guardian phone</span>
                                <Input value={data.guardian_phone} onChange={(e) => setData('guardian_phone', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm md:col-span-2">
                                <span>Address</span>
                                <Input value={data.address_line} onChange={(e) => setData('address_line', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>City</span>
                                <Input value={data.city} onChange={(e) => setData('city', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Province</span>
                                <Input value={data.province} onChange={(e) => setData('province', e.target.value)} />
                            </label>
                            <label className="space-y-2 text-sm">
                                <span>Postal code</span>
                                <Input value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} />
                            </label>
                            <div className="md:col-span-2">
                                <Button disabled={processing}>Save profile</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardDescription>Verification</CardDescription>
                            <CardTitle>Account access state</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-slate-600">
                            <p>{mustVerifyEmail ? 'Email verification is enabled for this deployment.' : 'Email verification is not required in this deployment.'}</p>
                            {status ? <p className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">{status}</p> : null}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Access control</CardDescription>
                            <CardTitle>Household-scoped privacy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-slate-600">
                            <p>Only linked children, applicants, conversations, and transactions are exposed to this signed-in household.</p>
                            <p>Update contact details here so admissions, finance, and classroom teams always use the latest information.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
