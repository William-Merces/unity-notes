// src/components/Lesson/Scriptures.tsx
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLesson } from '@/contexts/LessonContext';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { parseScriptureReference } from '@/utils/scriptureUtils';

export default function Scriptures() {
    const { lessonData, addSelection, removeSelection } = useLesson();
    const [newScriptureRef, setNewScriptureRef] = React.useState('');
    const [newScriptureText, setNewScriptureText] = React.useState('');
    const [showDialog, setShowDialog] = React.useState(false);

    const handleAddScripture = () => {
        const reference = parseScriptureReference(newScriptureRef);
        if (!reference) {
            // TODO: Implementar feedback de erro
            return;
        }

        addSelection({
            type: 'scripture',
            content: newScriptureText,
            reference: newScriptureRef,
        });

        setNewScriptureRef('');
        setNewScriptureText('');
        setShowDialog(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Escrituras</h2>
                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                    <AlertDialogTrigger asChild>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Adicionar Escritura
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Adicionar Nova Escritura</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Referência
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    value={newScriptureRef}
                                    onChange={(e) => setNewScriptureRef(e.target.value)}
                                    placeholder="Ex: 1 Néfi 3:7"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Texto
                                </label>
                                <textarea
                                    className="w-full p-2 border rounded-lg min-h-[100px]"
                                    value={newScriptureText}
                                    onChange={(e) => setNewScriptureText(e.target.value)}
                                    placeholder="Digite o texto da escritura aqui..."
                                />
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleAddScripture}>
                                Adicionar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className="space-y-4">
                {lessonData.selections
                    .filter(selection => selection.type === 'scripture')
                    .map((scripture) => (
                        <Card key={scripture.id}>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-blue-600">
                                            Escritura {scripture.order} - {scripture.reference}
                                        </h3>
                                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                                            {scripture.content}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeSelection(scripture.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    );
}