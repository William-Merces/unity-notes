'use client';

import { LessonProvider } from '@/contexts/LessonContext'

interface ClientProvidersProps {
    children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <LessonProvider>
            {children}
        </LessonProvider>
    )
}