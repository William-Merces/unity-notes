// src/components/Lesson/Professor/ContentList/ContentOrderList.tsx
import React from 'react';
import { Card, CardContent } from '@mui/material';
import { useLesson } from '@/contexts/LessonContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Selection } from '@/types';

const ContentOrderList = () => {
    const { lessonData, updateLesson } = useLesson();

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(lessonData.selections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Atualiza a ordem dos itens
        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index + 1
        }));

        updateLesson({ selections: updatedItems });
    };

    const getTypeStyle = (type: Selection['type']) => {
        switch (type) {
            case 'highlight':
                return 'border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
            case 'scripture':
                return 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
            default:
                return 'bg-white dark:bg-gray-800';
        }
    };

    const getTypeLabel = (type: Selection['type']) => {
        switch (type) {
            case 'highlight':
                return 'Citação';
            case 'scripture':
                return 'Escritura';
            case 'student-highlight':
                return 'Contribuição';
            default:
                return 'Item';
        }
    };

    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Ordem do Conteúdo</h3>
                
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Arraste os itens para reordenar o conteúdo da aula
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="content-list">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-2"
                            >
                                {lessonData.selections.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={String(item.id)}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`p-3 rounded-lg border ${getTypeStyle(item.type)} cursor-move`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-medium mb-1">
                                                            {getTypeLabel(item.type)} {item.order}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            {item.content.length > 100
                                                                ? `${item.content.substring(0, 100)}...`
                                                                : item.content}
                                                        </div>
                                                        {item.reference && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                                {item.reference}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {lessonData.selections.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        Nenhum conteúdo adicionado ainda
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ContentOrderList;