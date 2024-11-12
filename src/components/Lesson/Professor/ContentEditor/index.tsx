import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/UI/tabs';
import QuoteEditor from './QuoteEditor';
import QuestionEditor from './QuestionEditor';
import ContentOrderList from '../ContentList/ContentOrderList';
import Scriptures from '../../Scriptures';
import { useLesson } from '@/contexts/LessonContext';

const ContentEditor = () => {
    const { lessonData } = useLesson();

    return (
        <div className="space-y-4">
            {/* Status do Conteúdo */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="text-lg font-semibold">
                        {lessonData.selections.filter(s => s.type === 'highlight').length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Citações</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="text-lg font-semibold">
                        {lessonData.selections.filter(s => s.type === 'scripture').length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Escrituras</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <div className="text-lg font-semibold">
                        {lessonData.questions.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Perguntas</div>
                </div>
            </div>

            {/* Abas de Conteúdo */}
            <Tabs defaultValue="quotes" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="quotes">Citações</TabsTrigger>
                    <TabsTrigger value="scriptures">Escrituras</TabsTrigger>
                    <TabsTrigger value="questions">Perguntas</TabsTrigger>
                    <TabsTrigger value="order">Ordem</TabsTrigger>
                </TabsList>

                <TabsContent value="quotes" className="space-y-4 mt-4">
                    <QuoteEditor />
                    <div className="space-y-2">
                        {lessonData.selections
                            .filter(s => s.type === 'highlight')
                            .map(quote => (
                                <div
                                    key={quote.id}
                                    className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20"
                                >
                                    <div className="font-medium mb-1">Citação {quote.order}</div>
                                    <div className="text-gray-700 dark:text-gray-300">{quote.content}</div>
                                </div>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="scriptures" className="mt-4">
                    <Scriptures />
                </TabsContent>

                <TabsContent value="questions" className="space-y-4 mt-4">
                    <QuestionEditor />
                    <div className="space-y-2">
                        {lessonData.questions.map(question => (
                            <div
                                key={question.id}
                                className="p-4 rounded-lg border border-purple-200 bg-purple-50 dark:bg-purple-900/20"
                            >
                                <div className="font-medium mb-1">
                                    {question.type === 'open' ? 'Discussão' : 'Enquete'} {question.id}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">{question.question}</div>
                                {question.type === 'poll' && (
                                    <div className="mt-2 space-y-1">
                                        {question.options?.map((option, index) => (
                                            <div
                                                key={index}
                                                className="text-sm text-gray-600 dark:text-gray-400"
                                            >
                                                • {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="order" className="mt-4">
                    <ContentOrderList />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ContentEditor;