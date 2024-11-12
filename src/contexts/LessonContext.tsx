'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { LessonData, Selection, SharePlatform, Talk } from '../types';

interface LessonContextType {
    lessonData: LessonData;
    updateLesson: (newData: Partial<LessonData>) => void;
    favorites: Selection[];
    addFavorite: (selection: Selection) => void;
    removeFavorite: (selectionId: number) => void;
    activeSection: 'basic' | 'highlights' | 'questions' | 'scriptures';
    setActiveSection: (section: 'basic' | 'highlights' | 'questions' | 'scriptures') => void;
    shareSelection: (selection: Selection, platform?: SharePlatform) => Promise<void>;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const defaultLessonData: LessonData = {
    title: '',
    date: new Date().toISOString(),
    classInfo: {
        name: 'Quórum de Élderes',
        type: 'quorum',
        ward: 'Ala Sumaré',
        stake: 'Estaca Vitória da Conquista'
    },
    talk: {
        id: '',
        title: '',
        author: '',
        url: ''
    },
    hymns: {
        opening: {
            number: 0,
            title: '',
            link: ''
        },
        closing: {
            number: 0,
            title: '',
            link: ''
        }
    },
    prayers: {
        opening: '',
        closing: ''
    },
    announcements: '',
    selections: [],
    questions: []
};

export const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({ children }: { children: ReactNode }) {
    const [lessonData, setLessonData] = useState<LessonData>(defaultLessonData);
    const [favorites, setFavorites] = useState<Selection[]>([]);
    const [activeSection, setActiveSection] = useState<'basic' | 'highlights' | 'questions' | 'scriptures'>('basic');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    const updateLesson = (newData: Partial<LessonData>) => {
        setLessonData(prev => ({ ...prev, ...newData }));
    };

    const addFavorite = (selection: Selection) => {
        setFavorites(prev => {
            if (prev.find(f => f.id === selection.id)) return prev;
            return [...prev, selection];
        });
    };

    const removeFavorite = (selectionId: number) => {
        setFavorites(prev => prev.filter(f => f.id !== selectionId));
    };

    const generateShareText = (selection: Selection) => {
        let text = '';
        switch (selection.type) {
            case 'highlight':
                text = `"${selection.content}"\n\nDa aula: ${lessonData.title}`;
                break;
            case 'scripture':
                text = `${selection.reference}\n"${selection.content}"\n\nCompartilhado via Unity Notes`;
                break;
            case 'student-highlight':
                text = `Pensamento compartilhado por ${selection.author}:\n"${selection.content}"`;
                break;
        }
        return text;
    };

    const shareSelection = async (selection: Selection, platform?: SharePlatform) => {
        const shareText = generateShareText(selection);

        if (navigator.share) {
            try {
                await navigator.share({
                    title: lessonData.title,
                    text: shareText,
                    url: window.location.href
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else if (platform) {
            const urls = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`,
                twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`,
                whatsapp: `whatsapp://send?text=${encodeURIComponent(shareText + '\n' + window.location.href)}`
            };

            window.open(urls[platform], '_blank');
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <LessonContext.Provider
            value={{
                lessonData,
                updateLesson,
                favorites,
                addFavorite,
                removeFavorite,
                activeSection,
                setActiveSection,
                shareSelection,
                isDarkMode,
                toggleDarkMode
            }}
        >
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