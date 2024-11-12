'use client'

import { LessonSetup } from '@/components/Lesson/LessonSetup'
import DynamicAppBar from '@/components/Layout/DynamicAppBar'

export default function ProfessorPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <DynamicAppBar />
            
            <main className="flex-1 container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6">Configuração da Aula</h1>
                <LessonSetup />
            </main>
        </div>
    )
}