import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <MainLayout title="Privacy Policy" description="How MVM Logistics protects your data">
            <Head title="Privacy Policy - MVM Logistics" />
            
            <div className="bg-white dark:bg-gray-950 py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <div className="mx-auto w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                            <Shield className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl font-serif">Privacy Policy</h1>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Effective Date: August 2026
                        </p>
                    </div>
                    
                    <div className="prose prose-lg dark:prose-invert prose-brand mx-auto text-gray-600 dark:text-gray-400">
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to MVM Logistics ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                            use our cross-border logistics services, or request product purchasing on our platform.
                        </p>

                        <h2>2. Information We Collect</h2>
                        <p>We collect personal information that you voluntarily provide to us when registering for an account, expressing an interest in obtaining information about our services, or participating in activities on our platform. The personal information we collect may include the following:</p>
                        <ul>
                            <li><strong>Personal Details:</strong> Name, email address, phone numbers (including WhatsApp/Telegram), and customer ID.</li>
                            <li><strong>Shipping Information:</strong> Delivery addresses, billing addresses, and cross-border destination details.</li>
                            <li><strong>Order Information:</strong> Details regarding the products you request us to purchase on your behalf, receipts, and order statuses.</li>
                        </ul>

                        <h2>3. How We Use Your Information</h2>
                        <p>We use personal information collected via our platform for a variety of business purposes described below:</p>
                        <ul>
                            <li>To facilitate account creation and logon process through Google Firebase Authentication.</li>
                            <li>To fulfill and manage your logistics and manual orders, payments, and receipts.</li>
                            <li>To communicate with you regarding your shipments, delays, customs clearance, or delivery updates.</li>
                            <li>To provide customer support and respond to your inquiries.</li>
                        </ul>

                        <h2>4. Sharing Your Information</h2>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. 
                            Specifically, we may need to process your data or share your personal information with third-party delivery partners, customs agencies, and warehousing operators required to complete your cross-border shipments.
                        </p>

                        <h2>5. Data Security</h2>
                        <p>
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. 
                            Your authentication data is securely managed by Google Firebase Authentication.
                        </p>

                        <h2>6. Contact Us</h2>
                        <p>
                            If you have questions or comments about this notice, you may contact our customer support team or reach out to us via Telegram or WhatsApp.
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
