"use client"

import { redirect } from 'next/navigation';
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

export default function DashboardPage() {
    const { user, error, isLoading } = useUser();
    if (error) {
        toast.error(error.message)
        redirect('/auth/login')
    }
    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-4xl font-bold mt-8">Dashboard</h1>
            {isLoading && <Spinner />}
            {user && (
                <p className="mt-4 text-lg">Welcome to your dashboard, {user.nickname}!</p>

            )}
            {error && <p className="mt-4 text-lg">{error.message}</p>}
        </div>
    );
}