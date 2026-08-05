import React, { useEffect, useState, useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'signin' | 'signup' | 'forgot';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
    const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Login Form
    const loginForm = useForm({
        email: '',
        password: '',
        remember: true,
    });

    // Signup Form
    const signupForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Forgot Password Flow State
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotPin, setForgotPin] = useState(['', '', '', '', '', '']);
    const [forgotPassword, setForgotPassword] = useState('');
    const [forgotPasswordConfirmation, setForgotPasswordConfirmation] = useState('');
    const [forgotStep, setForgotStep] = useState<'email' | 'pin' | 'password'>('email');
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMessage, setForgotMessage] = useState<string | null>(null);
    const [forgotError, setForgotError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);
    const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setMode(initialMode);
        } else {
            document.body.style.overflow = '';
            loginForm.reset();
            signupForm.reset();
            
            // Reset forgot flow
            setForgotEmail('');
            setForgotPin(['', '', '', '', '', '']);
            setForgotPassword('');
            setForgotPasswordConfirmation('');
            setForgotStep('email');
            setForgotMessage(null);
            setForgotError(null);
            setShowPassword(false);
            setShowConfirmPassword(false);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, initialMode]);

    if (!isOpen) return null;

    const submitLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loginForm.post('/auth/login', {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    const submitSignup = (e: React.FormEvent) => {
        e.preventDefault();
        signupForm.post('/auth/register', {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    // Forgot Password Methods
    const handlePinChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        const newPin = [...forgotPin];
        // Handle paste
        if (value.length > 1) {
            const pasted = value.slice(0, 6).split('');
            for (let i = 0; i < pasted.length; i++) {
                if (index + i < 6) newPin[index + i] = pasted[i];
            }
            setForgotPin(newPin);
            const nextIndex = Math.min(index + pasted.length, 5);
            pinRefs.current[nextIndex]?.focus();
            return;
        }

        newPin[index] = value;
        setForgotPin(newPin);

        if (value && index < 5) {
            pinRefs.current[index + 1]?.focus();
        }
    };

    const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !forgotPin[index] && index > 0) {
            pinRefs.current[index - 1]?.focus();
        }
    };

    const submitForgotEmail = async (event: React.FormEvent) => {
        event.preventDefault();
        setForgotLoading(true);
        setForgotMessage(null);
        setForgotError(null);

        try {
            await axios.post('/forgot-password/send-pin', { email: forgotEmail });
            setForgotStep('pin');
            setCountdown(120);
            setForgotMessage('A 6-digit PIN has been sent to your email.');
        } catch (err: any) {
            setForgotError(err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'An error occurred. Please try again.');
        } finally {
            setForgotLoading(false);
        }
    };

    const submitForgotPin = async (event: React.FormEvent) => {
        event.preventDefault();
        const fullPin = forgotPin.join('');
        if (fullPin.length !== 6) {
            setForgotError('Please enter all 6 digits.');
            return;
        }

        setForgotLoading(true);
        setForgotMessage(null);
        setForgotError(null);

        try {
            await axios.post('/forgot-password/verify-pin', { email: forgotEmail, pin: fullPin });
            setForgotStep('password');
            setForgotMessage('PIN verified. Please enter your new password.');
        } catch (err: any) {
            setForgotError(err.response?.data?.message || err.response?.data?.errors?.pin?.[0] || 'Invalid PIN.');
            setForgotPin(['', '', '', '', '', '']);
            pinRefs.current[0]?.focus();
        } finally {
            setForgotLoading(false);
        }
    };

    const submitForgotPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        setForgotLoading(true);
        setForgotMessage(null);
        setForgotError(null);

        try {
            await axios.post('/forgot-password/reset', { 
                email: forgotEmail, 
                pin: forgotPin.join(''), 
                password: forgotPassword, 
                password_confirmation: forgotPasswordConfirmation 
            });
            setForgotMessage('Password reset successfully!');
            setTimeout(() => {
                setMode('signin');
                setForgotStep('email');
                setForgotMessage(null);
            }, 2000);
        } catch (err: any) {
            setForgotError(err.response?.data?.message || err.response?.data?.errors?.password?.[0] || 'Failed to reset password.');
        } finally {
            setForgotLoading(false);
        }
    };

    const GoogleIcon = () => (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-950 rounded-3xl max-w-4xl w-full flex overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
                {/* Left Side Branding */}
                <div className="hidden md:flex w-1/2 bg-gray-50 dark:bg-gray-900 p-12 border-r border-gray-100 dark:border-gray-800 flex-col justify-center relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md">
                            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-cover" />
                        </span>
                        <span className="text-[13px] font-black text-gray-400 tracking-[0.2em] uppercase">Customer Portal</span>
                    </div>

                    <h2 className="text-4xl lg:text-[42px] font-black text-[#0c162c] dark:text-white leading-[1.05] mb-6 tracking-tight">
                        Manual orders, tracking, and receipts in one place.
                    </h2>
                    
                    <p className="text-[#64748b] dark:text-gray-400 text-[17px] font-medium leading-relaxed max-w-[90%]">
                        Create requests faster and follow your shipment from review to delivery.
                    </p>

                    <div className="mt-12 flex flex-wrap gap-3">
                        <span className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-bold flex items-center gap-2 text-gray-600"><svg className="w-3.5 h-3.5 text-[#ff5b4f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg> Fast</span>
                        <span className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-bold flex items-center gap-2 text-gray-600"><svg className="w-3.5 h-3.5 text-[#ff5b4f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg> Secure</span>
                        <span className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-bold flex items-center gap-2 text-gray-600"><svg className="w-3.5 h-3.5 text-[#ff5b4f]" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" /></svg> Track</span>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>

                    {mode !== 'forgot' && (
                        <div className="mb-8">
                            <p className="text-gray-500 font-bold mb-6 text-center">Sign in to create Manual Orders and track your deliveries.</p>
                            
                            <div className="flex bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl mb-8 relative">
                                <div 
                                    className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-brand-primary rounded-xl transition-all duration-300 ease-out shadow-sm ${mode === 'signin' ? 'left-1.5' : 'left-[calc(50%+1px)]'}`}
                                ></div>
                                <button 
                                    type="button" 
                                    onClick={() => setMode('signin')}
                                    className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${mode === 'signin' ? 'text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Sign In
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setMode('signup')}
                                    className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${mode === 'signup' ? 'text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <a 
                                href="/auth/google" 
                                className="w-full flex items-center justify-center gap-3 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm"
                            >
                                <GoogleIcon />
                                <span>Continue with Google</span>
                            </a>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-800"></div></div>
                                <div className="relative flex justify-center"><span className="px-4 text-xs font-black uppercase tracking-[0.2em] text-gray-400 bg-white dark:bg-gray-950">OR CONTINUE WITH EMAIL</span></div>
                            </div>
                        </div>
                    )}

                    {mode === 'forgot' && (
                        <div className="mb-8">
                            <h2 className="text-[26px] font-black text-[#0c162c] dark:text-white mb-2">Reset Password</h2>
                            <p className="text-gray-500 font-bold mb-6 text-[15px] leading-relaxed">
                                {forgotStep === 'email' && 'Enter your email address and we will send you a 6-digit PIN to reset your password.'}
                                {forgotStep === 'pin' && 'Enter the 6-digit PIN sent to your email address.'}
                                {forgotStep === 'password' && 'Enter your new password below.'}
                            </p>

                            {forgotMessage && <div className="mb-6 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] p-4 text-sm font-bold text-[#059669] dark:text-emerald-400">{forgotMessage}</div>}
                            {forgotError && <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-bold text-red-600 dark:text-red-400">{forgotError}</div>}
                        </div>
                    )}

                    {mode === 'signin' && (
                        <form onSubmit={submitLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2">Email address</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={loginForm.data.email}
                                    onChange={e => loginForm.setData('email', e.target.value)}
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                />
                                {loginForm.errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{loginForm.errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        required 
                                        value={loginForm.data.password}
                                        onChange={e => loginForm.setData('password', e.target.value)}
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-4 pr-11 py-3.5 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" checked={loginForm.data.remember} onChange={e => loginForm.setData('remember', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary dark:bg-gray-800" />
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition">Remember me</span>
                                </label>
                                <button type="button" onClick={() => setMode('forgot')} className="text-sm font-bold text-brand-primary hover:text-brand-secondary focus:outline-none">Forgot password?</button>
                            </div>
                            <button 
                                type="submit" 
                                disabled={loginForm.processing}
                                className="w-full mt-4 bg-brand-primary hover:bg-brand-secondary active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-[0_8px_20px_-8px_rgba(var(--brand-primary-rgb),0.5)] hover:shadow-[0_12px_24px_-8px_rgba(var(--brand-primary-rgb),0.6)] transition-all disabled:opacity-50 disabled:active:scale-100"
                            >
                                {loginForm.processing ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    )}

                    {mode === 'signup' && (
                        <form onSubmit={submitSignup} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={signupForm.data.name}
                                    onChange={e => signupForm.setData('name', e.target.value)}
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                />
                                {signupForm.errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{signupForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2">Email address</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={signupForm.data.email}
                                    onChange={e => signupForm.setData('email', e.target.value)}
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                />
                                {signupForm.errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{signupForm.errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        required 
                                        value={signupForm.data.password}
                                        onChange={e => signupForm.setData('password', e.target.value)}
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-4 pr-11 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        required 
                                        value={signupForm.data.password_confirmation}
                                        onChange={e => signupForm.setData('password_confirmation', e.target.value)}
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-4 pr-11 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {signupForm.errors.password && <p className="text-red-500 text-xs mt-1 font-bold">{signupForm.errors.password}</p>}
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={signupForm.processing}
                                className="w-full mt-4 bg-brand-primary hover:bg-brand-secondary active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-[0_8px_20px_-8px_rgba(var(--brand-primary-rgb),0.5)] hover:shadow-[0_12px_24px_-8px_rgba(var(--brand-primary-rgb),0.6)] transition-all disabled:opacity-50 disabled:active:scale-100"
                            >
                                {signupForm.processing ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    )}

                    {mode === 'forgot' && (
                        <div className="space-y-5">
                            {forgotStep === 'email' && (
                                <form onSubmit={submitForgotEmail} className="space-y-6">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0c162c] dark:text-white mb-2">Email address</label>
                                        <input 
                                            type="email" 
                                            required 
                                            value={forgotEmail}
                                            onChange={e => setForgotEmail(e.target.value)}
                                            className="w-full bg-[#f4f6f8] dark:bg-gray-900 border-transparent rounded-[14px] px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-[#ff5b4f] focus:border-transparent transition text-gray-900 font-medium"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={forgotLoading}
                                        className="w-full bg-[#ff5b4f] hover:bg-[#ff4538] text-white font-black text-[15px] py-4 rounded-[14px] shadow-sm transition disabled:opacity-50"
                                    >
                                        {forgotLoading ? 'Sending...' : 'Send PIN Code'}
                                    </button>
                                </form>
                            )}

                            {forgotStep === 'pin' && (
                                <form onSubmit={submitForgotPin} className="space-y-6">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0c162c] dark:text-white mb-3 text-center">Enter 6-Digit PIN</label>
                                        <div className="flex justify-center gap-2">
                                            {forgotPin.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) => { pinRefs.current[index] = el; }}
                                                    type="text"
                                                    maxLength={6}
                                                    value={digit}
                                                    onChange={(e) => handlePinChange(index, e.target.value)}
                                                    onKeyDown={(e) => handlePinKeyDown(index, e)}
                                                    className="h-12 w-11 sm:h-14 sm:w-12 rounded-[14px] border-transparent bg-[#f4f6f8] dark:bg-gray-900 text-center text-xl font-black focus:bg-white focus:border-transparent focus:ring-2 focus:ring-[#ff5b4f]"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={forgotLoading || forgotPin.join('').length !== 6}
                                        className="w-full bg-[#ffb6b0] hover:bg-[#ff5b4f] text-white font-black text-[15px] py-4 rounded-[14px] shadow-sm transition disabled:opacity-50"
                                        style={forgotPin.join('').length === 6 ? { backgroundColor: '#ff5b4f' } : {}}
                                    >
                                        {forgotLoading ? 'Verifying...' : 'Verify PIN'}
                                    </button>
                                    <div className="text-center mt-4">
                                        {countdown > 0 ? (
                                            <p className="text-sm font-bold text-gray-400">Resend code in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={submitForgotEmail}
                                                className="text-sm font-bold text-brand-primary hover:text-brand-secondary hover:underline focus:outline-none"
                                            >
                                                Resend Verification Code
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}

                            {forgotStep === 'password' && (
                                <form onSubmit={submitForgotPassword} className="space-y-5">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0c162c] dark:text-white mb-2">New Password</label>
                                        <input 
                                            type="password" 
                                            required 
                                            value={forgotPassword}
                                            onChange={e => setForgotPassword(e.target.value)}
                                            className="w-full bg-[#f4f6f8] dark:bg-gray-900 border-transparent rounded-[14px] px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-[#ff5b4f] focus:border-transparent transition font-medium"
                                            minLength={8}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0c162c] dark:text-white mb-2">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            required 
                                            value={forgotPasswordConfirmation}
                                            onChange={e => setForgotPasswordConfirmation(e.target.value)}
                                            className="w-full bg-[#f4f6f8] dark:bg-gray-900 border-transparent rounded-[14px] px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-[#ff5b4f] focus:border-transparent transition font-medium"
                                            minLength={8}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={forgotLoading}
                                        className="w-full mt-2 bg-[#ff5b4f] hover:bg-[#ff4538] text-white font-black text-[15px] py-4 rounded-[14px] shadow-sm transition disabled:opacity-50"
                                    >
                                        {forgotLoading ? 'Saving...' : 'Save New Password'}
                                    </button>
                                </form>
                            )}
                            
                            <div className="mt-6 text-center">
                                <button 
                                    type="button" 
                                    onClick={() => setMode('signin')}
                                    className="text-[13px] font-bold text-[#64748b] hover:text-[#0c162c] dark:hover:text-white transition-colors"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
