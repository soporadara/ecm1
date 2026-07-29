import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
export default function Track() {
    const [trackingNumber, setTrackingNumber] = useState('');
    return (
        <>
            <Head><title>Track Parcel — MVM Logistic</title></Head>
            <section className="section"><div className="container-narrow">
                <div className="section-header">
                    <h1 className="section-title">Track Your Parcel</h1>
                    <p className="section-sub">Enter your tracking number to see the latest status of your shipment.</p>
                </div>
                <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={e => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number…"
                        className="form-input"
                        style={{ flex: 1, minWidth: 200 }}
                    />
                    <button className="btn-primary" disabled={!trackingNumber.trim()}>
                        Track →
                    </button>
                </div>
                <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem', marginTop: '1.5rem' }}>
                    Full tracking system coming soon. <Link href="/" style={{ color: '#4F46E5' }}>Back to home →</Link>
                </p>
            </div></section>
        </>
    );
}
