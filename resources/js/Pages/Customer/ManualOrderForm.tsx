import { Head, Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, FileText, Home, Image as ImageIcon, MapPin, Plus, UploadCloud, X } from 'lucide-react';

type ProductForm = {
    name: string;
    description: string;
    quantity: number;
    type: string;
    color: string;
    size: string;
    customer_note: string;
    urls: string[];
    images: File[];
    pdfs: File[];
};

const blankProduct = (): ProductForm => ({
    name: '',
    description: '',
    quantity: 1,
    type: '',
    color: '',
    size: '',
    customer_note: '',
    urls: [''],
    images: [],
    pdfs: [],
});

const domainFromUrl = (url: string) => {
    try {
        return new URL(url).hostname;
    } catch {
        return '';
    }
};

function FileDropInput({
    id,
    label,
    files,
    accept,
    maxFiles,
    icon,
    onChange,
    onClear,
}: {
    id: string;
    label: string;
    files: File[];
    accept: string;
    maxFiles: number;
    icon: 'image' | 'pdf';
    onChange: (files: File[]) => void;
    onClear: () => void;
}) {
    const Icon = icon === 'image' ? ImageIcon : FileText;

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70">
            <div className="mb-3 flex items-center justify-between gap-3">
                <label htmlFor={id} className="font-black text-gray-800 dark:text-white">{label} ({files.length})</label>
                {files.length > 0 && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-red-600 dark:hover:bg-gray-900"
                        aria-label={`Clear ${label}`}
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                )}
            </div>
            <input
                id={id}
                type="file"
                multiple
                accept={accept}
                onChange={event => onChange(Array.from(event.target.files || []).slice(0, maxFiles))}
                className="sr-only"
            />
            <label
                htmlFor={id}
                className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-6 text-center transition hover:border-brand-primary hover:bg-red-50/40 focus-within:border-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/70"
            >
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2 text-sm font-black text-white transition hover:bg-brand-primary dark:bg-white dark:text-gray-950">
                    <UploadCloud className="h-4 w-4" aria-hidden="true" />
                    Choose files
                </span>
                <span className="mt-3 text-xs font-semibold text-gray-500">Select multiple files, up to {maxFiles}.</span>
            </label>
            {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                    {files.map((file, index) => (
                        <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                            <span className="truncate">{file.name}</span>
                            <span className="shrink-0 text-gray-400">{Math.ceil(file.size / 1024)} KB</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

type UserAddress = {
    id: number;
    address_line_1: string;
    address_line_2?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    address_notes?: string;
    is_default: boolean;
};

export default function ManualOrderForm({ auth, quoteMessages, limits }: any) {
    const { flash }: any = usePage().props;
    const [step, setStep] = useState<'edit' | 'review'>('edit');
    const formRef = useRef<HTMLFormElement>(null);
    const submittedOrder = flash?.submitted_order;
    const [showSuccessModal, setShowSuccessModal] = useState(Boolean(submittedOrder));
    // Phone parsing helpers
    const parsePhone = (phoneStr: string) => {
        if (!phoneStr) return { code: '+855', num: '' };
        if (phoneStr.startsWith('+84')) return { code: '+84', num: phoneStr.substring(3).replace(/^0+/, '') };
        if (phoneStr.startsWith('+856')) return { code: '+856', num: phoneStr.substring(4).replace(/^0+/, '') };
        if (phoneStr.startsWith('+855')) return { code: '+855', num: phoneStr.substring(4).replace(/^0+/, '') };
        return { code: '+855', num: phoneStr.replace(/^0+/, '') };
    };

    const initialPhone = parsePhone(auth?.user?.phone_e164 || '');
    const [phoneCode, setPhoneCode] = useState(initialPhone.code);
    const [phoneNum, setPhoneNum] = useState(initialPhone.num);
    const [expandedProducts, setExpandedProducts] = useState<boolean[]>([true]);

    const toggleProductExpanded = (index: number) => {
        setExpandedProducts(prev => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    // Multi-address state
    const savedAddresses: UserAddress[] = auth?.user?.addresses || [];
    const defaultAddress = savedAddresses.find((a: UserAddress) => a.is_default) || savedAddresses[0] || null;
    const [selectedAddressId, setSelectedAddressId] = useState<number | 'new'>(defaultAddress?.id ?? 'new');
    const [showNewAddressForm, setShowNewAddressForm] = useState(savedAddresses.length === 0);
    const [newAddress, setNewAddress] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        province: '',
        postal_code: '',
        address_notes: '',
        save_address_to_profile: true,
    });

    const activeAddress = selectedAddressId !== 'new'
        ? savedAddresses.find((a: UserAddress) => a.id === selectedAddressId) || null
        : null;

    const { data, setData, post, processing, errors, reset } = useForm({
        contact_email: auth?.user?.email || '',
        save_email_to_profile: false,
        contact_phone: auth?.user?.phone_e164 || '',
        save_phone_to_profile: false,
        address_line_1: defaultAddress?.address_line_1 || auth?.user?.address_line_1 || '',
        address_line_2: defaultAddress?.address_line_2 || auth?.user?.address_line_2 || '',
        city: defaultAddress?.city || auth?.user?.city || '',
        province: defaultAddress?.province || auth?.user?.province || '',
        postal_code: defaultAddress?.postal_code || auth?.user?.postal_code || '',
        delivery_notes: defaultAddress?.address_notes || auth?.user?.address_notes || '',
        save_address_to_profile: false,
        message: '',
        currency_code: auth?.user?.preferred_currency === 'VND' ? 'VND' : 'USD',
        confirmation: false,
        products: [blankProduct()],
    });

    const selectSavedAddress = (addr: UserAddress) => {
        setSelectedAddressId(addr.id);
        setShowNewAddressForm(false);
        setData((prev: any) => ({
            ...prev,
            address_line_1: addr.address_line_1,
            address_line_2: addr.address_line_2 || '',
            city: addr.city || '',
            province: addr.province || '',
            postal_code: addr.postal_code || '',
            delivery_notes: addr.address_notes || '',
        }));
    };

    const openNewAddressForm = () => {
        setSelectedAddressId('new');
        setShowNewAddressForm(true);
        setNewAddress({ address_line_1: '', address_line_2: '', city: '', province: '', postal_code: '', address_notes: '', save_address_to_profile: true });
    };

    const totals = useMemo(() => {
        const productCount = data.products.length;
        const totalQuantity = data.products.reduce((sum, product) => sum + Math.max(Number(product.quantity) || 0, 0), 0);

        return { productCount, totalQuantity };
    }, [data.products]);

    const updateProduct = (index: number, patch: Partial<ProductForm>) => {
        const products = [...data.products];
        products[index] = { ...products[index], ...patch };
        setData('products', products);
    };

    const addProduct = () => {
        if (data.products.length >= (limits?.max_products || 20)) return;
        const newIndex = data.products.length;
        setExpandedProducts(prev => [...prev, true]);
        setData('products', [...data.products, blankProduct()]);
        
        setTimeout(() => {
            document.getElementById(`product-card-${newIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    };

    const duplicateProduct = (index: number) => {
        if (data.products.length >= (limits?.max_products || 20)) return;
        const clone = { ...data.products[index], images: [], pdfs: [], urls: [...data.products[index].urls] };
        setExpandedProducts(prev => [...prev.slice(0, index + 1), true, ...prev.slice(index + 1)]);
        setData('products', [...data.products.slice(0, index + 1), clone, ...data.products.slice(index + 1)]);
        
        setTimeout(() => {
            document.getElementById(`product-card-${index + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    };

    const removeProduct = (index: number) => {
        if (data.products.length === 1) return;
        setExpandedProducts(prev => prev.filter((_, i) => i !== index));
        setData('products', data.products.filter((_, i) => i !== index));
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (step === 'edit') {
            setStep('review');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const fullPhone = phoneNum ? `${phoneCode}${phoneNum}` : '';
        data.contact_phone = fullPhone; // Update directly for the post payload

        post('/manual-order', {
            forceFormData: true,
            preserveScroll: true,
            onError: (submitErrors) => {
                if (!('confirmation' in submitErrors)) {
                    setStep('edit');
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            },
        });
    };

    if (!auth?.user) {
        return (
            <MainLayout title={quoteMessages?.page_title || 'Sign In Required'}>
                <Head title={quoteMessages?.page_title || 'Sign In Required'} />
                <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
                    <img 
                        src="https://img.freepik.com/premium-vector/cambodia-boy-greeting-character_51635-4309.jpg" 
                        alt="Cambodian Greeting" 
                        className="mb-8 h-64 w-auto object-contain" 
                    />
                    <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">
                        You need to sign in first before use Manual Order
                    </h2>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-login-modal'))}
                        className="mt-6 rounded-xl bg-brand-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    >
                        Sign up / Sign in click here
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={quoteMessages?.page_title || 'Create Manual Order'}>
            <Head title={quoteMessages?.page_title || 'Create Manual Order'} />

            {submittedOrder && showSuccessModal && (
                <div className="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-5">✓</div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">{quoteMessages?.success_title}</h2>
                        <p className="text-gray-500 mt-3">{quoteMessages?.success_description}</p>
                        <div className="mt-5 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                            <p className="text-sm text-gray-500">Order number</p>
                            <p className="font-mono font-bold text-lg text-gray-900 dark:text-white">{submittedOrder.order_number}</p>
                            <p className="text-xs uppercase tracking-wide text-brand-primary mt-1">{String(submittedOrder.status).replace('_', ' ')}</p>
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mt-1">{submittedOrder.currency_code || data.currency_code}</p>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href={`/my-orders/${submittedOrder.id}`} className="px-5 py-3 rounded-xl bg-brand-primary text-white font-bold">
                                {quoteMessages?.view_order_button_text || 'View Your Order'}
                            </Link>
                            <button onClick={() => { reset(); setStep('edit'); setShowSuccessModal(false); }} className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-bold">
                                {quoteMessages?.create_another_button_text || 'Create Another Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary">Logistics quotation</p>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white font-serif mt-2">{quoteMessages?.page_title || 'Create Manual Order'}</h1>
                        <p className="text-gray-500 mt-3 max-w-2xl">{quoteMessages?.intro}</p>
                    </div>
                    <Link href="/my-orders" className="inline-flex justify-center rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-3 font-bold hover:text-brand-primary">
                        My Orders
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                    <form ref={formRef} onSubmit={submit} className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">1</span>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white">Customer Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Full name</label>
                                    <input value={auth?.user?.name || ''} readOnly className="w-full rounded-xl border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 px-4 py-3" />
                                    <p className="text-xs text-gray-500 mt-1">Your name is taken from your account profile. <Link href="/profile" className="text-brand-primary">Edit Profile</Link></p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Customer ID</label>
                                    <input value={auth?.user?.customer_code || ''} readOnly className="w-full rounded-xl border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 px-4 py-3 font-mono" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Locked login email</label>
                                    <input type="email" value={auth?.user?.email || ''} readOnly className="w-full rounded-xl border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 px-4 py-3" />
                                    <p className="text-xs text-gray-500 mt-1">Your login email is protected and cannot be changed from this page.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Order contact email</label>
                                    <input type="email" value={data.contact_email} onChange={e => setData('contact_email', e.target.value)} className="w-full rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" />
                                    <label className="mt-3 flex items-center gap-3 text-xs font-semibold text-gray-500"><input type="checkbox" checked={data.save_email_to_profile} onChange={e => setData('save_email_to_profile', e.target.checked)} /> Save as preferred contact email</label>
                                    {errors.contact_email && <p className="text-red-500 text-xs mt-1">{errors.contact_email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Phone number</label>
                                    <div className="flex shadow-sm rounded-xl">
                                        <select 
                                            value={phoneCode} 
                                            onChange={e => setPhoneCode(e.target.value)}
                                            className="w-[100px] sm:w-[120px] rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-950 focus:border-brand-primary focus:ring-0 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-primary"
                                        >
                                            <option value="+855">🇰🇭 +855</option>
                                            <option value="+84">🇻🇳 +84</option>
                                            <option value="+856">🇱🇦 +856</option>
                                        </select>
                                        <input 
                                            type="tel" 
                                            value={phoneNum} 
                                            onChange={e => setPhoneNum(e.target.value.replace(/\D/g, ''))} 
                                            placeholder="12 345 678" 
                                            className="w-full rounded-r-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-950 placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-brand-primary"
                                        />
                                    </div>
                                    <label className="mt-3 flex items-center gap-3 text-xs font-semibold text-gray-500"><input type="checkbox" checked={data.save_phone_to_profile} onChange={e => setData('save_phone_to_profile', e.target.checked)} /> Save this phone number to my profile</label>
                                    {errors.contact_phone && <p className="text-red-500 text-xs mt-1">{errors.contact_phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* ── Delivery Address — Taobao-style ── */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">2</span>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white">Delivery Address</h2>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Select a delivery address for this order.</p>

                            {/* Saved address cards */}
                            {savedAddresses.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {savedAddresses.map((addr: UserAddress) => {
                                        const isSelected = selectedAddressId === addr.id;
                                        return (
                                            <button
                                                key={addr.id}
                                                type="button"
                                                onClick={() => selectSavedAddress(addr)}
                                                className={`relative text-left rounded-2xl border-2 p-4 transition-all duration-200 focus:outline-none ${
                                                    isSelected
                                                        ? 'border-brand-primary bg-brand-primary/5 shadow-md'
                                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-brand-primary/50 hover:shadow-sm'
                                                }`}
                                            >
                                                {isSelected && (
                                                    <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-white">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                    </span>
                                                )}
                                                {addr.is_default && (
                                                    <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-brand-primary">
                                                        <Home className="h-3 w-3" /> Default
                                                    </span>
                                                )}
                                                <p className="font-bold text-sm text-gray-900 dark:text-white leading-snug">{addr.address_line_1}</p>
                                                {addr.address_line_2 && <p className="text-xs text-gray-500 mt-0.5">{addr.address_line_2}</p>}
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {[addr.city, addr.province, addr.postal_code].filter(Boolean).join(', ')}
                                                </p>
                                                {addr.address_notes && (
                                                    <p className="mt-1 text-[11px] italic text-gray-400">{addr.address_notes}</p>
                                                )}
                                            </button>
                                        );
                                    })}

                                    {/* Add new address card */}
                                    <button
                                        type="button"
                                        onClick={openNewAddressForm}
                                        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 transition-all duration-200 focus:outline-none ${
                                            selectedAddressId === 'new'
                                                ? 'border-brand-primary bg-brand-primary/5'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary/50'
                                        }`}
                                    >
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                                            <Plus className="h-5 w-5" />
                                        </span>
                                        <span className="text-sm font-bold text-brand-primary">Add New Address</span>
                                    </button>
                                </div>
                            )}

                            {/* New address form — shown either when adding new or when no saved addresses */}
                            {(showNewAddressForm || savedAddresses.length === 0) && (
                                <div className="mt-4 rounded-2xl border border-brand-primary/30 bg-brand-primary/3 p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="h-5 w-5 text-brand-primary" />
                                        <h3 className="font-black text-gray-900 dark:text-white text-sm">
                                            {savedAddresses.length === 0 ? 'Enter Delivery Address' : 'Add New Address'}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold mb-1">Address line 1 <span className="text-brand-primary">*</span></label>
                                            <input
                                                value={savedAddresses.length === 0 ? data.address_line_1 : newAddress.address_line_1}
                                                onChange={e => {
                                                    if (savedAddresses.length === 0) {
                                                        setData('address_line_1', e.target.value);
                                                    } else {
                                                        const val = e.target.value;
                                                        setNewAddress(prev => ({ ...prev, address_line_1: val }));
                                                        setData('address_line_1', val);
                                                    }
                                                }}
                                                placeholder="House number, street, ward"
                                                className="w-full rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3"
                                            />
                                            {errors.address_line_1 && <p className="text-red-500 text-xs mt-1">{errors.address_line_1}</p>}
                                        </div>
                                        <input
                                            placeholder="Address line 2 (optional)"
                                            value={savedAddresses.length === 0 ? data.address_line_2 : newAddress.address_line_2}
                                            onChange={e => {
                                                if (savedAddresses.length === 0) setData('address_line_2', e.target.value);
                                                else { setNewAddress(prev => ({ ...prev, address_line_2: e.target.value })); setData('address_line_2', e.target.value); }
                                            }}
                                            className="rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3"
                                        />
                                        <input
                                            placeholder="City"
                                            value={savedAddresses.length === 0 ? data.city : newAddress.city}
                                            onChange={e => {
                                                if (savedAddresses.length === 0) setData('city', e.target.value);
                                                else { setNewAddress(prev => ({ ...prev, city: e.target.value })); setData('city', e.target.value); }
                                            }}
                                            className="rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3"
                                        />
                                        <input
                                            placeholder="Province / State"
                                            value={savedAddresses.length === 0 ? data.province : newAddress.province}
                                            onChange={e => {
                                                if (savedAddresses.length === 0) setData('province', e.target.value);
                                                else { setNewAddress(prev => ({ ...prev, province: e.target.value })); setData('province', e.target.value); }
                                            }}
                                            className="rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3"
                                        />
                                        <input
                                            placeholder="Postal code (optional)"
                                            value={savedAddresses.length === 0 ? data.postal_code : newAddress.postal_code}
                                            onChange={e => {
                                                if (savedAddresses.length === 0) setData('postal_code', e.target.value);
                                                else { setNewAddress(prev => ({ ...prev, postal_code: e.target.value })); setData('postal_code', e.target.value); }
                                            }}
                                            className="rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3"
                                        />
                                        <textarea
                                            placeholder="Delivery notes (optional)"
                                            value={savedAddresses.length === 0 ? data.delivery_notes : newAddress.address_notes}
                                            onChange={e => {
                                                if (savedAddresses.length === 0) setData('delivery_notes', e.target.value);
                                                else { setNewAddress(prev => ({ ...prev, address_notes: e.target.value })); setData('delivery_notes', e.target.value); }
                                            }}
                                            rows={2}
                                            className="md:col-span-2 rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3"
                                        />
                                    </div>
                                    <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-gray-500 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={savedAddresses.length === 0 ? data.save_address_to_profile : newAddress.save_address_to_profile}
                                            onChange={e => {
                                                if (savedAddresses.length === 0) setData('save_address_to_profile', e.target.checked);
                                                else setNewAddress(prev => ({ ...prev, save_address_to_profile: e.target.checked }));
                                            }}
                                            className="rounded"
                                        />
                                        Save this address to my profile for future orders
                                    </label>
                                </div>
                            )}

                            {/* Active address summary */}
                            {activeAddress && !showNewAddressForm && (
                                <div className="mt-4 flex items-start gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                                    <MapPin className="h-5 w-5 text-brand-primary mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">Delivering to:</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                            {activeAddress.address_line_1}
                                            {activeAddress.address_line_2 && `, ${activeAddress.address_line_2}`}
                                            {activeAddress.city && `, ${activeAddress.city}`}
                                            {activeAddress.province && `, ${activeAddress.province}`}
                                            {activeAddress.postal_code && ` ${activeAddress.postal_code}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">3</span>
                                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Requested Products</h2>
                                </div>
                                <button type="button" onClick={addProduct} className="rounded-xl bg-gray-900 text-white px-5 py-2.5 font-bold transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5">Add Another Product</button>
                            </div>

                            {data.products.map((product, index) => (
                                <div id={`product-card-${index}`} key={index} className="scroll-mt-24 group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-brand-primary/50 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 bg-gray-50/50 dark:bg-gray-800/50 transition-colors duration-300 group-hover:bg-brand-primary/5">
                                        <h3 className="font-black text-gray-900 dark:text-white transition-colors group-hover:text-brand-primary flex items-center gap-3 cursor-pointer" onClick={() => toggleProductExpanded(index)}>
                                            <button
                                                type="button"
                                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                aria-label={expandedProducts[index] ? "Collapse product" : "Expand product"}
                                            >
                                                <svg
                                                    className={`w-5 h-5 transform transition-transform duration-300 ${expandedProducts[index] ? 'rotate-180' : ''}`}
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            Product {index + 1}
                                            {!expandedProducts[index] && product.name && (
                                                <span className="text-sm font-semibold text-gray-500 ml-2 truncate max-w-[200px] md:max-w-xs block">
                                                    — {product.name}
                                                </span>
                                            )}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => duplicateProduct(index)} className="text-sm font-bold px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-green-500 hover:bg-green-500 hover:text-white hover:shadow-md">Duplicate</button>
                                            <button type="button" disabled={data.products.length === 1} onClick={() => removeProduct(index)} className="text-sm font-bold px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-red-600 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-red-600">Remove</button>
                                        </div>
                                    </div>
                                    
                                    <div className={`transition-all duration-500 overflow-hidden ${expandedProducts[index] ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="grid grid-cols-1 gap-5 px-6 pb-6 md:grid-cols-12 pt-5">
                                        <div className="rounded-2xl border border-brand-primary/20 bg-red-50/50 p-4 dark:bg-red-950/10 md:col-span-12">
                                            <div className="mb-2 flex items-center justify-between gap-3">
                                                <label className="block text-sm font-black text-gray-900 dark:text-white">Product name</label>
                                                <span className="rounded-full bg-brand-primary px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">Start here</span>
                                            </div>
                                            <input
                                                value={product.name}
                                                onChange={e => updateProduct(index, { name: e.target.value })}
                                                placeholder="Type the product name, item title, or what you want us to buy"
                                                className="w-full rounded-xl border-gray-200 bg-white px-4 py-4 text-base font-bold text-gray-950 shadow-sm placeholder:font-semibold placeholder:text-gray-400 focus:border-brand-primary focus:ring-brand-primary/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                            />
                                            <p className="mt-2 text-xs font-semibold text-gray-500">Example: white running shoes, phone case, dress, laptop stand.</p>
                                            {(errors as any)[`products.${index}.name`] && <p className="text-red-500 text-xs mt-1">{(errors as any)[`products.${index}.name`]}</p>}
                                        </div>
                                        <textarea placeholder="Product description" value={product.description} onChange={e => updateProduct(index, { description: e.target.value })} rows={3} className="md:col-span-12 rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" />
                                        <div className="md:col-span-4">
                                            <label className="block text-sm font-bold mb-1">Quantity</label>
                                            <div className="inline-flex h-12 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-all focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20">
                                                <button type="button" aria-label="Decrease quantity" disabled={product.quantity <= 1} onClick={() => updateProduct(index, { quantity: Math.max(1, product.quantity - 1) })} className="w-12 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-40">-</button>
                                                <input type="number" min={1} max={limits?.max_quantity || 999} value={product.quantity} onChange={e => updateProduct(index, { quantity: Math.max(1, Number(e.target.value) || 1) })} className="w-20 text-center border-x border-gray-200 dark:border-gray-700 focus:border-brand-primary focus:ring-0" />
                                                <button type="button" aria-label="Increase quantity" onClick={() => updateProduct(index, { quantity: Math.min(limits?.max_quantity || 999, product.quantity + 1) })} className="w-12 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">+</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/70 md:col-span-8 md:grid-cols-3">
                                            <input placeholder="Color" value={product.color} onChange={e => updateProduct(index, { color: e.target.value })} className="rounded-xl border-gray-200 bg-white dark:border-gray-700 px-4 py-3" />
                                            <input placeholder="Type, model, or material" value={product.type} onChange={e => updateProduct(index, { type: e.target.value })} className="rounded-xl border-gray-200 bg-white dark:border-gray-700 px-4 py-3" />
                                            <input placeholder="Size or dimensions" value={product.size} onChange={e => updateProduct(index, { size: e.target.value })} className="rounded-xl border-gray-200 bg-white dark:border-gray-700 px-4 py-3" />
                                        </div>
                                        <textarea placeholder="Product note" value={product.customer_note} onChange={e => updateProduct(index, { customer_note: e.target.value })} rows={2} className="md:col-span-12 rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" />
                                    </div>

                                    <div className="space-y-3 border-t border-gray-100 px-6 py-6 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold">Product URLs ({product.urls.filter(Boolean).length})</h4>
                                            <button type="button" onClick={() => updateProduct(index, { urls: [...product.urls, ''] })} className="text-sm font-bold text-brand-primary transition-colors hover:text-green-500">+ Add Another URL</button>
                                        </div>
                                        {product.urls.map((url, urlIndex) => (
                                            <div key={urlIndex} className="flex flex-col sm:flex-row gap-2">
                                                <input value={url} placeholder="https://supplier.example/product" onChange={e => updateProduct(index, { urls: product.urls.map((u, i) => i === urlIndex ? e.target.value : u) })} className="flex-1 rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 hover:border-brand-primary/50" />
                                                {domainFromUrl(url) && <a href={url} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl border border-gray-200 bg-white font-bold text-center shadow-sm transition-all hover:border-brand-primary hover:text-brand-primary">View {domainFromUrl(url)}</a>}
                                                <button type="button" onClick={() => updateProduct(index, { urls: product.urls.filter((_, i) => i !== urlIndex) })} className="px-5 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-red-600 font-bold transition-all hover:border-red-500 hover:bg-red-500 hover:text-white">Remove</button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 border-t border-gray-100 px-6 py-6 dark:border-gray-800 md:grid-cols-2">
                                        <FileDropInput
                                            id={`product-${index}-images`}
                                            label="Images"
                                            files={product.images}
                                            accept="image/*"
                                            maxFiles={limits?.max_images_per_product || 6}
                                            icon="image"
                                            onChange={files => updateProduct(index, { images: files })}
                                            onClear={() => updateProduct(index, { images: [] })}
                                        />
                                        <FileDropInput
                                            id={`product-${index}-pdfs`}
                                            label="PDF documents"
                                            files={product.pdfs}
                                            accept="application/pdf,.pdf"
                                            maxFiles={limits?.max_pdfs_per_product || 5}
                                            icon="pdf"
                                            onChange={files => updateProduct(index, { pdfs: files })}
                                            onClear={() => updateProduct(index, { pdfs: [] })}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Additional Notes</h2>
                            <textarea value={data.message} onChange={e => setData('message', e.target.value)} maxLength={2000} rows={4} placeholder="Tell us anything else we should know about the product, supplier, size, delivery, or special requirements." className="w-full rounded-xl border-gray-200 dark:border-gray-700 px-4 py-3" />
                            <p className="text-xs text-gray-500 mt-1">{data.message.length}/2000</p>
                        </div>

                        {step === 'review' && (
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-brand-primary p-6">
                                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Review and Submit</h2>
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <p><strong>Name:</strong> {auth?.user?.name}</p>
                                    <p><strong>Email:</strong> {data.contact_email}</p>
                                    <p><strong>Phone:</strong> {data.contact_phone}</p>
                                    <p><strong>Delivery address:</strong> {[data.address_line_1, data.address_line_2, data.city, data.province, data.postal_code].filter(Boolean).join(', ')}</p>
                                    <p><strong>Products:</strong> {totals.productCount}</p>
                                    <p><strong>Total quantity:</strong> {totals.totalQuantity}</p>
                                    <p><strong>Currency:</strong> {data.currency_code}</p>
                                    <p><strong>Logistics fee:</strong> {quoteMessages?.logistics_fee_notice}</p>
                                </div>
                                <p className="mt-4 text-sm text-gray-500">{quoteMessages?.pricing_disclaimer}</p>
                                <label className="mt-5 flex items-center gap-4 text-sm font-bold"><input type="checkbox" checked={data.confirmation} onChange={e => setData('confirmation', e.target.checked)} /> I confirm that the information above is correct.</label>
                                {errors.confirmation && <p className="text-red-500 text-xs mt-1">{errors.confirmation}</p>}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            {step === 'review' && <button type="button" onClick={() => setStep('edit')} className="px-6 py-3 rounded-xl border font-bold">Back to Edit</button>}
                            <button type="submit" disabled={processing || (step === 'review' && !data.confirmation)} className="px-8 py-3 rounded-xl bg-brand-primary text-white font-black disabled:opacity-50">
                                {processing ? 'Submitting...' : step === 'edit' ? 'Review Manual Order' : (quoteMessages?.submit_button_text || 'Submit Manual Order')}
                            </button>
                        </div>
                    </form>

                    <aside className="lg:sticky lg:top-24 h-fit bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white">Request Summary</h2>
                        <dl className="mt-5 space-y-3 text-sm">
                            <div className="flex justify-between"><dt>Products</dt><dd className="font-bold">{totals.productCount}</dd></div>
                            <div className="flex justify-between"><dt>Total quantity</dt><dd className="font-bold">{totals.totalQuantity}</dd></div>
                            <div className="flex justify-between"><dt>Currency</dt><dd className="font-bold">{data.currency_code}</dd></div>
                            <div className="flex justify-between"><dt>Logistics fee</dt><dd className="font-bold">Pending</dd></div>
                            <div className="rounded-xl bg-white p-3 text-xs font-semibold leading-5 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                                Product prices are hidden from customers until our team reviews and confirms them.
                            </div>
                        </dl>
                        <p className="mt-5 text-xs text-gray-500">{quoteMessages?.pricing_disclaimer}</p>
                        <div className="mt-5 grid grid-cols-1 gap-2">
                            <Link href="/my-orders" className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-center font-bold">My Orders</Link>
                            <Link href="/contact" className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-center font-bold">Contact Us</Link>
                        </div>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
}
