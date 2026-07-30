import React, { useRef, useState, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function AdminProfile() {
    const { auth, hasGoogleLinked } = usePage().props as any;
    const user = auth.user;

    // Personal Info Form
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_e164: user.phone_e164 || '',
    });

    const [showSmsModal, setShowSmsModal] = useState(false);
    const [smsCode, setSmsCode] = useState('');

    // Email PIN Verification Flow
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [showEmailPinModal, setShowEmailPinModal] = useState(false);
    const [emailPin, setEmailPin] = useState('');
    const [isSendingPin, setIsSendingPin] = useState(false);
    const [isVerifyingPin, setIsVerifyingPin] = useState(false);
    const [pinError, setPinError] = useState('');
    const [pinSuccess, setPinSuccess] = useState(false);
    const [pinCountdown, setPinCountdown] = useState(0);

    useEffect(() => {
        let timer: any;
        if (pinCountdown > 0) {
            timer = setInterval(() => {
                setPinCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [pinCountdown]);

    const sendEmailPin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail || newEmail === user.email) return;

        if (pinCountdown > 0) {
            setShowEmailPinModal(true);
            return;
        }

        
        setIsSendingPin(true);
        setPinError('');
        setPinSuccess(false);
        router.post('/admin/profile/send-pin', { new_email: newEmail }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowEmailPinModal(true);
                setPinCountdown(120);
            },
            onFinish: () => setIsSendingPin(false)
        });
    };

    const verifyEmailPin = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailPin.length !== 6) return;

        setIsVerifyingPin(true);
        setPinError('');
        setPinSuccess(false);

        router.post('/admin/profile/verify-pin', { pin: emailPin }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setPinSuccess(true);
                setTimeout(() => {
                    setShowEmailPinModal(false);
                    setIsChangingEmail(false);
                    setNewEmail('');
                    setEmailPin('');
                    setPinSuccess(false);
                }, 1500);
            },
            onError: (errors) => {
                setPinError(errors.pin || 'Wrong PIN, please try again.');
            },
            onFinish: () => setIsVerifyingPin(false)
        });
    };

    const submitForm = () => {
        put('/admin/profile', {
            preserveScroll: true,
            onSuccess: () => setShowSmsModal(false),
        });
    };

    const updateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        
        const originalPhone = user.phone_e164 || '';
        const newPhone = data.phone_e164 || '';
        if (newPhone !== originalPhone && newPhone.length > 0) {
            setShowSmsModal(true);
        } else {
            submitForm();
        }
    };

    const handleSmsVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (smsCode === '123456') {
            submitForm();
        } else {
            alert('Invalid verification code. Please use 123456 for testing.');
        }
    };

    // Password Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    // Avatar Form
    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarPreview(URL.createObjectURL(file));
            
            // Upload immediately
            const formData = new FormData();
            formData.append('avatar', file);
            
            router.post('/admin/profile/avatar', formData, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Profile picture updated successfully!');
                    if (avatarInput.current) {
                        avatarInput.current.value = '';
                    }
                },
                onError: () => toast.error('Failed to update profile picture.'),
            });
        }
    };

    // Removed manual upload handler since we now upload instantly

    const [googleLoading, setGoogleLoading] = useState(false);
    const linkGoogleAccount = async () => {
        setGoogleLoading(true);
        try {
            const { signInWithGooglePopupOrRedirect } = await import('../../lib/firebase');
            const result = await signInWithGooglePopupOrRedirect();
            if (result?.user) {
                const idToken = await result.user.getIdToken();
                router.post('/admin/profile/google-link', { id_token: idToken }, {
                    preserveScroll: true,
                    onSuccess: () => toast.success('Google account linked successfully!'),
                    onError: (err) => toast.error(err.google || 'Failed to link Google account'),
                    onFinish: () => setGoogleLoading(false)
                });
            } else {
                setGoogleLoading(false);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to authenticate with Google');
            setGoogleLoading(false);
        }
    };

    const unlinkGoogleAccount = () => {
        setGoogleLoading(true);
        router.post('/admin/profile/google-unlink', {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Google account unlinked successfully!'),
            onError: (err) => toast.error(err.google || 'Failed to unlink Google account'),
            onFinish: () => setGoogleLoading(false)
        });
    };

    return (
        <AdminLayout title="My Profile">
            <Head title="My Profile" />

            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div className="bg-admin-surface rounded-3xl p-8 shadow-sm border border-admin-border/40 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-admin-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative group flex-shrink-0">
                        <div className="w-28 h-28 rounded-full shadow-lg overflow-hidden bg-admin-surface-muted flex items-center justify-center text-admin-primary font-bold text-4xl border-2 border-admin-surface relative z-10">
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
                            className="absolute bottom-0 right-0 p-2 bg-admin-primary text-white rounded-full shadow-lg hover:bg-admin-primary-hover transition-transform hover:scale-110 z-20"
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
                        <h2 className="text-2xl font-black text-admin-text tracking-tight">{user.name}</h2>
                        <p className="text-sm font-bold text-admin-text-muted mt-0.5 capitalize flex items-center gap-1 justify-center md:justify-start">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {user.role}
                        </p>
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
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Login Email</label>
                                {!isChangingEmail ? (
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full bg-admin-surface-muted/50 border border-admin-border/50 rounded-xl px-4 py-3 text-admin-text-muted font-bold cursor-not-allowed"
                                            />
                                            {user.email_verified_at && <p className="mt-2 text-xs font-bold text-admin-success flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Verified</p>}
                                        </div>
                                        <button type="button" onClick={() => setIsChangingEmail(true)} className="px-5 py-3 text-sm font-bold bg-admin-surface border border-admin-border hover:bg-admin-surface-muted text-admin-text shadow-sm rounded-xl transition">Change</button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-1">
                                                <input
                                                    type="email"
                                                    placeholder="Enter new email address"
                                                    value={newEmail}
                                                    onChange={e => setNewEmail(e.target.value)}
                                                    className="w-full bg-admin-surface border border-admin-primary/50 rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary"
                                                />
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={sendEmailPin} 
                                                disabled={!newEmail || newEmail === user.email || isSendingPin}
                                                className="px-4 py-3 text-sm font-bold bg-admin-primary text-white hover:bg-admin-primary-hover rounded-xl transition disabled:opacity-50"
                                            >
                                                {isSendingPin ? 'Sending...' : 'Send PIN'}
                                            </button>
                                            <button type="button" onClick={() => setIsChangingEmail(false)} className="px-4 py-3 text-sm font-bold bg-admin-surface-muted hover:bg-admin-border/50 text-admin-text rounded-xl transition">Cancel</button>
                                        </div>
                                        <p className="text-xs text-admin-text-muted">We will send a 6-digit verification code to this new email to confirm it belongs to you.</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    value={data.phone_e164}
                                    onChange={e => setData('phone_e164', e.target.value)}
                                    placeholder="+1234567890"
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-bold focus:ring-2 focus:ring-admin-primary/50 transition-all"
                                />
                                {errors.phone_e164 && <p className="text-sm text-admin-danger mt-1 font-medium">{errors.phone_e164}</p>}
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-admin-primary-hover transition-all disabled:opacity-50"
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
                                    className="ml-auto px-6 py-3 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-admin-primary-hover transition-all disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Google Authentication */}
                    <div className="bg-admin-surface rounded-3xl p-8 shadow-sm border border-admin-border/40 md:col-span-1 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-admin-primary/10 text-admin-primary rounded-xl">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-admin-text">Google Authentication</h3>
                        </div>
                        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-admin-surface-muted/50 border rounded-2xl p-6 ${hasGoogleLinked ? 'border-green-200 bg-green-50/50' : 'border-admin-border/50'}`}>
                            <div>
                                <h4 className="font-bold text-admin-text text-lg">
                                    {hasGoogleLinked ? 'Google Account Connected' : 'Link Google Account'}
                                </h4>
                                <p className="text-sm font-medium text-admin-text-muted mt-1">
                                    {hasGoogleLinked 
                                        ? 'Your Google account is connected. You can use it to sign into the CMS Dashboard.' 
                                        : 'Link your Google account to enable signing into the CMS Dashboard with Google.'}
                                </p>
                            </div>
                            
                            {hasGoogleLinked ? (
                                <button
                                    type="button"
                                    onClick={unlinkGoogleAccount}
                                    disabled={googleLoading}
                                    className="whitespace-nowrap px-6 py-3 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl shadow-sm hover:bg-red-100 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {googleLoading ? 'Disconnecting...' : (
                                        <>
                                            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
                                            </svg>
                                            Disconnect Google
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={linkGoogleAccount}
                                    disabled={googleLoading}
                                    className="whitespace-nowrap px-6 py-3 bg-admin-surface dark:bg-admin-surface-muted border border-admin-border text-admin-text text-sm font-bold rounded-xl shadow-sm hover:bg-admin-surface-muted transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {googleLoading ? 'Linking...' : (
                                        <>
                                            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
                                            </svg>
                                            Connect Google
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SMS Verification Modal */}
            {showSmsModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-admin-surface rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-admin-text mb-4">Verify Your Phone Number</h3>
                        <p className="text-admin-text-muted mb-6">
                            We've sent an SMS with a verification code to <strong>{data.phone_e164}</strong>. 
                            (For testing, please enter <strong>123456</strong>).
                        </p>
                        <form onSubmit={handleSmsVerify} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2">6-Digit Code</label>
                                <input
                                    type="text"
                                    value={smsCode}
                                    onChange={e => setSmsCode(e.target.value)}
                                    maxLength={6}
                                    className="w-full bg-admin-surface-muted border-none rounded-xl px-4 py-3 text-admin-text font-medium focus:ring-2 focus:ring-admin-primary/50 text-center tracking-[0.5em] text-lg"
                                    placeholder="••••••"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowSmsModal(false)}
                                    className="flex-1 px-4 py-3 bg-admin-surface-muted text-admin-text font-bold rounded-xl hover:bg-admin-border/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-3 bg-admin-primary text-white font-bold rounded-xl hover:bg-admin-primary-hover shadow-lg shadow-admin-primary/30 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Verifying...' : 'Verify & Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Email PIN Verification Modal */}
            {showEmailPinModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-admin-surface border border-admin-border rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button 
                            onClick={() => setShowEmailPinModal(false)}
                            className="absolute top-6 right-6 text-admin-text-muted hover:text-admin-text"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-admin-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-admin-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-admin-text">Verify New Email</h3>
                            <p className="text-admin-text-muted mt-2">We sent a 6-digit code to <span className="font-bold text-admin-text">{newEmail}</span>.</p>
                        </div>

                        <form onSubmit={verifyEmailPin}>
                            <input
                                type="text"
                                maxLength={6}
                                value={emailPin}
                                onChange={e => {
                                    setEmailPin(e.target.value.replace(/\D/g, ''));
                                    setPinError('');
                                }}
                                placeholder="000000"
                                className={`w-full text-center text-3xl tracking-[0.5em] font-mono bg-admin-surface-muted border ${pinError ? 'border-red-500 focus:ring-red-500' : pinSuccess ? 'border-green-500 focus:ring-green-500' : 'border-admin-border focus:ring-admin-primary'} rounded-xl px-4 py-4 text-admin-text focus:ring-2 focus:border-transparent transition-all mb-4`}
                                required
                            />
                            
                            {pinError && (
                                <p className="text-red-500 text-sm font-bold text-center mb-4 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {pinError}
                                </p>
                            )}
                            
                            {pinSuccess && (
                                <p className="text-green-500 text-sm font-bold text-center mb-4 flex items-center justify-center gap-2 animate-in fade-in zoom-in">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Verify successful!
                                </p>
                            )}
                            
                            <button
                                type="submit"
                                disabled={emailPin.length !== 6 || isVerifyingPin || pinSuccess || pinCountdown === 0}
                                className="w-full bg-admin-primary hover:bg-admin-primary-hover text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
                            >
                                {isVerifyingPin ? 'Verifying...' : pinSuccess ? 'Verified' : 'Verify & Save Email'}
                            </button>
                            
                            <div className="mt-6 text-center">
                                {pinCountdown > 0 ? (
                                    <p className="text-admin-text-muted text-sm font-medium">Code expires in <span className="font-bold text-admin-text">{pinCountdown}s</span></p>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <p className="text-red-500 text-sm font-bold mb-2">Code expired</p>
                                        <button 
                                            type="button" 
                                            onClick={sendEmailPin} 
                                            disabled={isSendingPin}
                                            className="inline-flex items-center gap-1.5 text-admin-primary hover:text-admin-primary-hover text-sm font-bold transition disabled:opacity-50"
                                        >
                                            {isSendingPin ? 'Sending...' : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                                            Resend Code
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
