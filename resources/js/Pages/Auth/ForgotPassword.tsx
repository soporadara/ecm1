import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import AuthModal from '../../Components/AuthModal';

export default function ForgotPassword() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <MainLayout title="Forgot Password">
            <Head title="Forgot Password" />
            <div className="min-h-screen bg-gray-50 dark:bg-[#12091f]">
                <AuthModal 
                    isOpen={isModalOpen} 
                    onClose={() => {
                        setIsModalOpen(false);
                        router.visit('/login');
                    }} 
                    initialMode="forgot" 
                />
            </div>
        </MainLayout>
    );
}
