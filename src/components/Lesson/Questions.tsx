'use client';

import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { Timer as TimerIcon } from '@mui/icons-material';
import { useLesson } from '@/contexts/LessonContext';
import ContentCard from '../UI/ContentCard';

export default function Questions() {
    const { lessonData } = useLesson();
    const [anonymousQuestion, setAnonymousQuestion] = useState('');

    const handleSubmitQuestion = () => {
        // Implementar lógica para enviar pergunta anônima
        setAnonymousQuestion('');
    };

    return (
        <Box component="div">
            {lessonData.questions.map((question) => (
                <ContentCard
                    key={question.id}
                    title={`Pergunta ${question.id}`}
                    content={question.question}
                    className="mb-4"
                >
                    {question.type === 'poll' && (
                        <Box component="div">
                            <Box component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TimerIcon sx={{ mr: 1 }} />
                                <Typography component="div">{question.timer}s</Typography>
                            </Box>
                            {question.options?.map((option, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >
                                    {option}
                                </Button>
                            ))}
                        </Box>
                    )}
                </ContentCard>
            ))}
            <TextField
                fullWidth
                variant="outlined"
                label="Enviar pergunta anônima"
                value={anonymousQuestion}
                onChange={(e) => setAnonymousQuestion(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                fullWidth
                variant="contained"
                onClick={handleSubmitQuestion}
                disabled={!anonymousQuestion.trim()}
            >
                Enviar Pergunta
            </Button>
        </Box>
    );
}