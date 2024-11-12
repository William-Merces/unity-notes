// src/components/UnityNotesContent.tsx
import { useState } from 'react';
import { useLesson } from '@/contexts/LessonContext';
import BottomNav from './Layout/BottomNav';
import DynamicAppBar from './Layout/DynamicAppBar';
import AlertMessage from './UI/AlertMessage';
import { LessonViewer } from './Lesson/LessonViewer';
import { motion, AnimatePresence } from 'framer-motion';

export default function UnityNotesContent() {
    const { activeSection, setActiveSection } = useLesson();
    const [alert, setAlert] = useState<{
        show: boolean;
        type: 'success' | 'error' | 'info';
        title: string;
        message?: string;
    }>({ show: false, type: 'info', title: '' });

    const showAlert = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
        setAlert({ show: true, type, title, message });
        setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 3000);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <DynamicAppBar />

            <AlertMessage
                show={alert.show}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onHide={() => setAlert(prev => ({ ...prev, show: false }))}
            />

            <main className="flex-1 container mx-auto px-4 pb-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <LessonViewer showAlert={showAlert} />
                    </motion.div>
                </AnimatePresence>
            </main>

            <BottomNav
                value={['basic', 'highlights', 'questions', 'scriptures'].indexOf(activeSection)}
                onChange={(newValue) => {
                    const sections = ['basic', 'highlights', 'questions', 'scriptures'];
                    setActiveSection(sections[newValue] as any);
                    if (navigator.vibrate) navigator.vibrate(5);
                }}
            />
        </div>
    );
}