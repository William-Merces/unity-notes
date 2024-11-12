'use client';

import React from 'react';
import { useLesson } from '@/contexts/LessonContext';
import { Share2, Bookmark, MessageCircle, Copy } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { Selection, SharePlatform } from '@/types';

export default function HighlightsSection() {
    const {
        lessonData,
        favorites,
        addFavorite,
        shareSelection,
        isDarkMode
    } = useLesson();

    const [showCopyAlert, setShowCopyAlert] = React.useState(false);

    const handleShare = async (selection: Selection) => {
        const buttons = [
            { 
                icon: <Share2 />, 
                label: 'Compartilhar', 
                action: () => shareSelection(selection) 
            },
            {
                icon: <Copy />, 
                label: 'Copiar texto', 
                action: () => {
                    navigator.clipboard.writeText(selection.content);
                    setShowCopyAlert(true);
                    setTimeout(() => setShowCopyAlert(false), 2000);
                }
            },
            { 
                icon: <MessageCircle />, 
                label: 'WhatsApp', 
                action: () => shareSelection(selection, 'whatsapp' as SharePlatform) 
            }
        ];

        // Implementar aqui a lógica para mostrar os botões em um menu
        const selectedButton = buttons[0]; // Temporário - implemente a seleção do botão
        selectedButton.action();
    };

    return (
        <div className="pb-16">
            <AnimatePresence>
                {showCopyAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed top-4 right-4 z-50"
                    >
                        <Alert className="bg-green-500 text-white">
                            Texto copiado com sucesso!
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="px-4 py-2 mb-4">
                <h2 className="text-lg font-semibold dark:text-white">
                    Destaques da Aula
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lessonData.talk.title}
                </p>
            </div>

            <div className="space-y-4 px-4">
                {lessonData.selections.map((selection, index) => (
                    <motion.div
                        key={selection.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={`
                            rounded-lg border p-4 
                            ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                            ${selection.type === 'scripture' ? 'border-l-4 border-l-blue-500' : ''}
                        `}>
                            <div className="flex justify-between items-start mb-2">
                                {selection.type === 'scripture' && (
                                    <span className="text-sm font-medium text-blue-500">
                                        {selection.reference}
                                    </span>
                                )}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => addFavorite(selection)}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Bookmark
                                            className={`w-5 h-5 ${
                                                favorites.find(f => f.id === selection.id)
                                                    ? 'fill-current text-blue-500'
                                                    : 'text-gray-400'
                                            }`}
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleShare(selection)}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Share2 className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                {selection.content}
                            </p>

                            {selection.author && (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Compartilhado por: {selection.author}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}