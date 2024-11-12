// src/components/Lesson/Professor/ContentEditor/QuoteEditor.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { useLesson } from '@/contexts/LessonContext';

const QuoteEditor = () => {
    const { lessonData, addSelection } = useLesson();
    const [quote, setQuote] = useState('');

    const addQuote = () => {
        if (!quote.trim()) return;

        const newSelection = {
            type: 'highlight',
            content: quote.trim(),
            reference: lessonData.talk.title
        };

        addSelection(newSelection);
        setQuote('');
    };

    return (
        <Card>
            <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Adicionar Citação</h3>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Trecho do Discurso
                    </label>
                    <textarea
                        className="w-full min-h-[100px] p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="Digite aqui a citação do discurso..."
                    />
                </div>
                <button
                    onClick={addQuote}
                    disabled={!quote.trim()}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Adicionar Citação
                </button>
            </CardContent>
        </Card>
    );
};

export default QuoteEditor;