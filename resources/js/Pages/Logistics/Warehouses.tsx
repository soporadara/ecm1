import { Head, Link } from '@inertiajs/react';
export default function Warehouses() {
    return (
        <>
            <Head><title>Warehouses — MVM Logistic</title></Head>
            <section className="section"><div className="container-narrow">
                <div className="section-header">
                    <h1 className="section-title">Our Warehouses</h1>
                    <p className="section-sub">We operate warehouses in Asia to receive, inspect and consolidate your parcels.</p>
                </div>
                <div style={{ textAlign: 'center', color: '#6B7280', marginTop: '3rem' }}>
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏭</p>
                    <p>Warehouse details coming soon. <Link href="/" className="btn-outline btn-sm">← Back to Home</Link></p>
                </div>
            </div></section>
        </>
    );
}
