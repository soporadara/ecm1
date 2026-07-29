import { Head, Link } from '@inertiajs/react';

export default function HowItWorks() {
    return (
        <>
            <Head>
                <title>How It Works — MVM Logistic</title>
                <meta name="description" content="Learn how MVM Logistic purchases products from Taobao, Tmall, 1688, Alibaba, Pinduoduo and AliExpress and delivers them to you." />
            </Head>
            <section className="section">
                <div className="container-narrow">
                    <div className="section-header">
                        <h1 className="section-title">How It Works</h1>
                        <p className="section-sub">Everything you need to know about our purchasing and delivery process.</p>
                    </div>
                    <div style={{ textAlign: 'center', color: '#6B7280', marginTop: '3rem' }}>
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</p>
                        <p>Full guide coming soon. <Link href="/" className="btn-outline btn-sm">← Back to Home</Link></p>
                    </div>
                </div>
            </section>
        </>
    );
}
