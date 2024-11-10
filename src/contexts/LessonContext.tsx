'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { LessonData } from '../types';

interface LessonContextType {
    lessonData: LessonData;
    updateLesson: (newData: Partial<LessonData>) => void;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);
const defaultLessonData: LessonData = {
    title: "A Importância da Oração",
    date: "10 de Novembro, 2024",
    talk: {
        id: "default",
        title: "Selecione um discurso",
        author: "",
        url: ""
    },
    prayers: {
        opening: "João Silva",
        closing: "Maria Santos"
    },
    hymns: {
        opening: {
            number: 1,
            title: "Oração do Profeta",
            link: "https://www.churchofjesuschrist.org/music/library/hymns/the-morning-breaks?lang=por"
        },
        closing: {
            number: 140,
            title: "Que Firme Alicerce",
            link: "https://www.churchofjesuschrist.org/music/library/hymns/how-firm-a-foundation?lang=por"
        }
    },
    selections: [],
    questions: [
        {
            id: 1,
            type: "open",
            question: "Como a oração fortaleceu seu testemunho?"
        },
        {
            id: 2,
            type: "poll",
            question: "Com que frequência você ora?",
            options: [
                "Várias vezes ao dia",
                "Uma vez ao dia",
                "Algumas vezes por semana",
                "Raramente"
            ],
            timer: 60
        }
    ]
};

export function LessonProvider({ children }: { children: ReactNode }) {
    const [lessonData, setLessonData] = useState<LessonData>(defaultLessonData);

    const updateLesson = (newData: Partial<LessonData>) => {
        setLessonData(prev => ({ ...prev, ...newData }));
    };

    return (
        <LessonContext.Provider value={{ lessonData, updateLesson }}>
            {children}
        </LessonContext.Provider>
    );
}

export function useLesson() {
    const context = useContext(LessonContext);
    if (context === undefined) {
        throw new Error('useLesson must be used within a LessonProvider');
    }
    return context;
}