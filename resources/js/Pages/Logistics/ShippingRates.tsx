import { Head, Link } from '@inertiajs/react';
export default function ShippingRates() {
    return (
        <>
            <Head><title>Shipping Rates — MVM Logistic</title></Head>
            <section className="section"><div className="container-narrow">
                <div className="section-header">
                    <h1 className="section-title">Shipping Rates</h1>
                    <p className="section-sub">International shipping rates from our warehouses to your country.</p>
                </div>
                <div style={{ textAlign: 'center', color: '#6B7280', marginTop: '3rem' }}>
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</p>
                    <p>Rate tables coming soon. <Link href="/" className="btn-outline btn-sm">← Back to Home</Link></p>
                </div>
            </div></section>
        </>
    );
}
