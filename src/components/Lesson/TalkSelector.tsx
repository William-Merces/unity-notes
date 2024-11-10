'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Box,
    Tooltip
} from '@mui/material';
import {
    Add as AddIcon,
    ContentCopy as CopyIcon,
    Link as LinkIcon
} from '@mui/icons-material';
import { useLesson } from '@/contexts/LessonContext';
import type { Selection } from '@/types';

// Exemplo de estrutura de dados para os discursos
const conferenceBaseUrl = 'https://www.churchofjesuschrist.org/study/general-conference/2024/10/';
const talks = [
    {
        id: '11holland',
        title: 'A Paz que Ele Deixa Conosco',
        author: 'Jeffrey R. Holland',
        url: `${conferenceBaseUrl}11holland?lang=por`
    },
    // Adicionar mais discursos aqui
];

export default function TalkSelector() {
    const { lessonData, updateLesson } = useLesson();
    const [open, setOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [showSelectionTools, setShowSelectionTools] = useState(false);

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            setSelectedText(selection.toString());
            setShowSelectionTools(true);
        }
    };

    const handleAddHighlight = () => {
        const newHighlight = {
            id: Date.now(),
            type: 'highlight' as const,
            content: selectedText,
            order: lessonData.selections ? lessonData.selections.length + 1 : 1
        } satisfies Selection;

        updateLesson({
            selections: [...(lessonData.selections || []), newHighlight]
        });

        setShowSelectionTools(false);
        setSelectedText('');
    };

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Discurso da Semana
                    </Typography>

                    {lessonData.talk ? (
                        <>
                            <Typography variant="subtitle1">
                                {lessonData.talk.title}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {lessonData.talk.author}
                            </Typography>
                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LinkIcon />}
                                    href={lessonData.talk.url}
                                    target="_blank"
                                >
                                    Ver Discurso Completo
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setOpen(true)}
                                >
                                    Trocar Discurso
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                            startIcon={<AddIcon />}
                        >
                            Selecionar Discurso
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Ferramenta de Seleção */}
            {showSelectionTools && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 70,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1200,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 3,
                        p: 1,
                        display: 'flex',
                        gap: 1
                    }}
                >
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddHighlight}
                    >
                        Adicionar como Leitura {lessonData.selections.length + 1}
                    </Button>
                    <IconButton onClick={() => navigator.clipboard.writeText(selectedText)}>
                        <CopyIcon />
                    </IconButton>
                </Box>
            )}

            {/* Dialog de Seleção de Discurso */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Selecionar Discurso da Semana</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Buscar discurso"
                        variant="outlined"
                        size="small"
                    />
                    <List>
                        {talks.map((talk) => (
                            <ListItem
                                key={talk.id}
                                button
                                onClick={() => {
                                    updateLesson({ talk });
                                    setOpen(false);
                                }}
                            >
                                <ListItemText
                                    primary={talk.title}
                                    secondary={talk.author}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}