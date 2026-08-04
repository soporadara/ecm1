import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
    return (
        <MainLayout title="Terms of Service" description="Terms and conditions for using MVM Logistics">
            <Head title="Terms of Service - MVM Logistics" />
            
            <div className="bg-white dark:bg-gray-950 py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <div className="mx-auto w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl font-serif">Terms of Service</h1>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Effective Date: August 2026
                        </p>
                    </div>
                    
                    <div className="prose prose-lg dark:prose-invert prose-brand mx-auto text-gray-600 dark:text-gray-400">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you and MVM Logistics concerning your access to and use of our website and cross-border logistics applications. 
                            By accessing our services, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service.
                        </p>

                        <h2>2. Logistics & Manual Order Services</h2>
                        <p>
                            MVM Logistics provides product purchasing and cross-border delivery services. When you create a "Manual Order," you are requesting us to purchase goods on your behalf and/or arrange for their transportation.
                        </p>
                        <ul>
                            <li><strong>Estimates:</strong> Pricing and logistics fees shown during the manual order creation are estimates. Final costs are verified by our team and provided via receipts before final processing.</li>
                            <li><strong>Prohibited Items:</strong> You agree not to use our services to transport illegal, hazardous, or restricted goods in accordance with Cambodian and international customs laws.</li>
                            <li><strong>Customs & Duties:</strong> You are responsible for ensuring that the items you import comply with local regulations. MVM Logistics will assist in customs clearance where applicable, but any unforeseen duties or taxes remain your responsibility.</li>
                        </ul>

                        <h2>3. User Registration</h2>
                        <p>
                            You may be required to register with the site. You agree to keep your password and Google Authentication credentials confidential. 
                            We reserve the right to remove, reclaim, or change a username you select if we determine that such username is inappropriate.
                        </p>

                        <h2>4. Payment and Billing</h2>
                        <p>
                            Payments for manual orders and logistics fees are currently handled offline. Our team will verify your request and provide payment instructions. 
                            Orders will not be fully processed or shipped until payment is confirmed.
                        </p>

                        <h2>5. Modifications and Interruptions</h2>
                        <p>
                            We reserve the right to change, modify, or remove the contents of our services at any time or for any reason at our sole discretion without notice. 
                            We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the platform.
                        </p>

                        <h2>6. Contact Information</h2>
                        <p>
                            In order to resolve a complaint regarding the service or to receive further information regarding the use of the services, please contact us directly.
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
