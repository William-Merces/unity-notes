// src/components/Lesson/Professor/ContentEditor/QuestionEditor.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { useLesson } from '@/contexts/LessonContext';

const QuestionEditor = () => {
    const { addQuestion } = useLesson();
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<'open' | 'poll'>('open');
    const [options, setOptions] = useState(['']);
    const [timer, setTimer] = useState(30);

    const addNewQuestion = () => {
        if (!questionText.trim()) return;

        const newQuestion = {
            type: questionType,
            question: questionText.trim(),
            options: questionType === 'poll' ? options.filter(o => o.trim()) : undefined,
            timer: questionType === 'poll' ? timer : undefined
        };

        addQuestion(newQuestion);
        setQuestionText('');
        setOptions(['']);
        setTimer(30);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <Card>
            <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Adicionar Pergunta</h3>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tipo de Pergunta
                    </label>
                    <select
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as 'open' | 'poll')}
                    >
                        <option value="open">Discussão</option>
                        <option value="poll">Enquete</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pergunta
                    </label>
                    <textarea
                        className="w-full min-h-[100px] p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Digite aqui sua pergunta..."
                    />
                </div>

                {questionType === 'poll' && (
                    <>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Opções
                            </label>
                            {options.map((option, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder={`Opção ${index + 1}`}
                                        className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                                    />
                                    {options.length > 1 && (
                                        <button
                                            onClick={() => handleRemoveOption(index)}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            -
                                        </button>
                                    )}
                                    {index === options.length - 1 && (
                                        <button
                                            onClick={handleAddOption}
                                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tempo para Resposta (segundos)
                            </label>
                            <input
                                type="number"
                                min={5}
                                max={300}
                                value={timer}
                                onChange={(e) => setTimer(Number(e.target.value))}
                                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </>
                )}

                <button
                    onClick={addNewQuestion}
                    disabled={!questionText.trim()}
                    className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Adicionar Pergunta
                </button>
            </CardContent>
        </Card>
    );
};

export default QuestionEditor;