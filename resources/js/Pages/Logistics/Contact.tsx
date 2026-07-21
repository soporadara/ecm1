import { Head } from '@inertiajs/react';
export default function Contact() {
    return (
        <>
            <Head><title>Contact Us — PurchaseAsia</title></Head>
            <section className="section"><div className="container-narrow">
                <div className="section-header">
                    <h1 className="section-title">Contact Us</h1>
                    <p className="section-sub">Have a question? Our team is here to help.</p>
                </div>
                <div style={{ maxWidth: 480, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Your Name</label>
                            <input type="text" className="form-input" placeholder="John Smith" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-input" placeholder="you@example.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <select className="form-select">
                                <option>Purchase Request</option>
                                <option>Shipping Query</option>
                                <option>Parcel Issue</option>
                                <option>Payment</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea className="form-input" rows={5} placeholder="Describe your question or issue…" style={{ resize: 'vertical' }} />
                        </div>
                        <button className="btn-primary">Send Message →</button>
                    </div>
                </div>
            </div></section>
        </>
    );
}
