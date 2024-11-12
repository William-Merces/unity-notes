'use client'

import { useLesson } from '@/contexts/LessonContext'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

export function StudentView() {
    const { lessonData } = useLesson()

    if (!lessonData) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Aguardando dados da aula...</p>
            </div>
        )
    }

    return (
        <div className="space-y-4 p-4">
            {/* Título da Aula */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold text-center mb-6"
            >
                {lessonData.title || 'Aula da Escola Dominical'}
            </motion.div>

            {/* Discurso Tema */}
            {lessonData.talk && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="p-4">
                        <h3 className="font-semibold text-lg mb-2">Discurso da Semana</h3>
                        <p className="text-lg">{lessonData.talk.title}</p>
                        <p className="text-sm text-gray-600">{lessonData.talk.author}</p>
                    </Card>
                </motion.div>
            )}

            {/* Hino Inicial */}
            {lessonData.hymns.opening && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Hino Inicial</h3>
                        <p>
                            {lessonData.hymns.opening.number} - {lessonData.hymns.opening.title}
                        </p>
                    </Card>
                </motion.div>
            )}

            {/* Oração Inicial */}
            {lessonData.prayers.opening && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Oração Inicial</h3>
                        <p>{lessonData.prayers.opening}</p>
                    </Card>
                </motion.div>
            )}

            {/* Anúncios */}
            {lessonData.announcements && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Anúncios</h3>
                        <p className="whitespace-pre-wrap">{lessonData.announcements}</p>
                    </Card>
                </motion.div>
            )}

            {/* Hino Final */}
            {lessonData.hymns.closing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Hino Final</h3>
                        <p>
                            {lessonData.hymns.closing.number} - {lessonData.hymns.closing.title}
                        </p>
                    </Card>
                </motion.div>
            )}

            {/* Oração Final */}
            {lessonData.prayers.closing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card className="p-4">
                        <h3 className="font-semibold mb-2">Oração Final</h3>
                        <p>{lessonData.prayers.closing}</p>
                    </Card>
                </motion.div>
            )}
        </div>
    )
}