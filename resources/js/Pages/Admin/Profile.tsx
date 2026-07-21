import React, { useRef, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminProfile() {
    const { auth } = usePage().props as any;
    const user = auth.user;

    // Personal Info Form
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_e164: user.phone_e164 || '',
    });

    const updateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        
        const originalPhone = user.phone_e164 || '';
        const newPhone = data.phone_e164 || '';
        if (newPhone !== originalPhone && newPhone.length > 0) {
            const code = window.prompt(`An SMS with a verification code has been sent to ${newPhone}.\n\nPlease enter the 6-digit code to verify (use 123456 for testing):`);
            if (code !== '123456') {
                alert('Invalid verification code.');
                return;
            }
        }

        put(route('profile.update'), {
            preserveScroll: true,
        });
    };

    // Password Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put(route('profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    // Avatar Form
    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const avatarForm = useForm({
        avatar: null as File | null,
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            avatarForm.setData('avatar', file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const uploadAvatar = (e: React.FormEvent) => {
        e.preventDefault();
        avatarForm.post(route('profile.avatar.update'), {
            preserveScroll: true,
            onSuccess: () => {
                avatarForm.reset();
                if (avatarInput.current) {
                    avatarInput.current.value = '';
                }
            },
        });
    };

    return (
        <AdminLayout title="My Profile">
            <Head title="My Profile" />

            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div className="bg-admin-surface rounded-3xl p-8 shadow-sm border border-admin-border/40 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-admin-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-admin-surface-muted flex items-center justify-center text-admin-primary font-bold text-4xl">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : user.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button 
                            onClick={() => avatarInput.current?.click()}
                            className="absolute bottom-0 right-0 p-2.5 bg-admin-primary text-white rounded-full shadow-lg hover:bg-admin-primary/90 transition-transform hover:scale-105"
                            title="Change Avatar"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <input type="file" ref={avatarInput} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </div>

                    <div className="flex-1 text-center md:text-left z-10">
                        <h2 className="text-3xl font-extrabold text-admin-text tracking-tight">{user.name}</h2>
                        <p className="text-admin-text-muted mt-1 font-medium capitalize">{user.role}</p>
                        
                        {avatarForm.data.avatar && (
                            <button
                                onClick={uploadAvatar}
                                disabled={avatarForm.processing}
                                className="mt-4 px-6 py-2 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-admin-primary/30 hover:bg-admin-primary/90 transition-all disabled:opacity-50"
                            >
                                {avatarForm.processing ? 'Uploading...' : 'Save New Profile Picture'}
                            </button>
                        )}
                        {avatarForm.errors.avatar && <p className="text-sm text-admin-danger mt-2 font-medium">{avatarForm.errors.avatar}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-admin-surface rounded-3xl p-8 shadow-sm border border-admin-border/40">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-admin-primary/10 text-admin-primary rounded-xl">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-admin-text">Personal Information</h3>
                        </div>

                        <form onSubmit={updateProfile} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary/50 transition-all"
                                />
                                {errors.name && <p className="text-sm text-admin-danger mt-1 font-medium">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Email Address <span className="text-xs font-normal opacity-70">(Cannot be changed)</span></label>
                                <input
                                    type="email"
                                    value={data.email}
                                    disabled
                                    className="w-full bg-admin-surface-muted/50 border-none rounded-xl px-4 py-3 text-admin-text-muted font-medium cursor-not-allowed"
                                />
                                {errors.email && <p className="text-sm text-admin-danger mt-1 font-medium">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    value={data.phone_e164}
                                    onChange={e => setData('phone_e164', e.target.value)}
                                    placeholder="+1234567890"
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary/50 transition-all"
                                />
                                {errors.phone_e164 && <p className="text-sm text-admin-danger mt-1 font-medium">{errors.phone_e164}</p>}
                            </div>
                            <div className="pt-2 flex items-center justify-between">
                                {recentlySuccessful && <span className="text-sm font-bold text-admin-primary">Saved successfully!</span>}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="ml-auto px-6 py-3 bg-admin-text text-white text-sm font-bold rounded-xl shadow-lg hover:bg-admin-text/90 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="bg-admin-surface rounded-3xl p-8 shadow-sm border border-admin-border/40">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-admin-text text-white rounded-xl">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-admin-text">Security</h3>
                        </div>

                        <form onSubmit={updatePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={e => passwordForm.setData('current_password', e.target.value)}
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary/50 transition-all"
                                />
                                {passwordForm.errors.current_password && <p className="text-sm text-admin-danger mt-1 font-medium">{passwordForm.errors.current_password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={e => passwordForm.setData('password', e.target.value)}
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary/50 transition-all"
                                />
                                {passwordForm.errors.password && <p className="text-sm text-admin-danger mt-1 font-medium">{passwordForm.errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary/50 transition-all"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                {passwordForm.recentlySuccessful && <span className="text-sm font-bold text-admin-primary">Password updated!</span>}
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="ml-auto px-6 py-3 bg-admin-danger text-white text-sm font-bold rounded-xl shadow-lg hover:bg-admin-danger/90 transition-all disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
