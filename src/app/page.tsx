'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card/card';
import { Button } from '@/components/ui/button/button';
import { useRouter } from 'next/navigation';

interface Lesson {
    id: string;
    title: string;
    createdAt: string;
    teacher: {
        name: string;
    };
}

export default function Home() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('/api/lessons')
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setLessons(data);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleEdit = (lesson: Lesson) => {
        setEditingLesson(lesson);
        setNewTitle(lesson.title);
    };

    const handleSave = async () => {
        if (editingLesson) {
            const response = await fetch(`/api/lessons?id=${editingLesson.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...editingLesson, title: newTitle })
            });
            const data = await response.json();
            if (!data.error) {
                setLessons(lessons.map(lesson => (lesson.id === editingLesson.id ? data : lesson)));
                setEditingLesson(null);
            }
        }
    };

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/lessons?id=${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (!data.error) {
            setLessons(lessons.filter(lesson => lesson.id !== id));
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <Card className="p-8">
                        <div className="flex items-center justify-center">
                            <p className="text-lg">Carregando aulas...</p>
                        </div>
                    </Card>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-4">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold text-center">UNITY NOTES</h1>
                    <p className="text-lg text-center text-gray-600">Todos na mesma página</p>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Aulas Disponíveis</h2>
                    <Button onClick={() => router.push('/criar-aula')}>
                        Criar Nova Aula
                    </Button>
                </div>

                {lessons.length === 0 ? (
                    <Card>
                        <CardContent className="p-8">
                            <p className="text-center text-muted-foreground">
                                Nenhuma aula disponível no momento.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {lessons.map((lesson) => (
                            <Card
                                key={lesson.id}
                                className="cursor-pointer hover:bg-accent/50 transition-colors p-4"
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            {editingLesson && editingLesson.id === lesson.id ? (
                                                <input
                                                    type="text"
                                                    value={newTitle}
                                                    onChange={(e) => setNewTitle(e.target.value)}
                                                    className="border p-2"
                                                />
                                            ) : (
                                                <CardTitle>{lesson.title}</CardTitle>
                                            )}
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Professor: {lesson.teacher.name}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button onClick={() => router.push(`/ver-aula?id=${lesson.id}`)}>
                                                Ver
                                            </Button>
                                            {editingLesson && editingLesson.id === lesson.id ? (
                                                <>
                                                    <Button onClick={handleSave}>Salvar</Button>
                                                    <Button onClick={() => setEditingLesson(null)}>Cancelar</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button onClick={() => handleEdit(lesson)}>Renomear</Button>
                                                    <Button onClick={() => handleDelete(lesson.id)}>Excluir</Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(lesson.createdAt).toLocaleDateString('pt-BR')}
                                    </p>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}