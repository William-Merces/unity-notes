'use client';

import React, { useState } from 'react';
import { AppHeader } from './Layout/DynamicAppBar';
import {
    Box,
    Card,
    CardContent,
    Container,
    IconButton,
    Typography,
    BottomNavigation,
    BottomNavigationAction,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Paper,
    Divider
} from '@mui/material';
import {
    Book as BookIcon,
    ChatBubble as ChatIcon,
    Share as ShareIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    WhatsApp as WhatsAppIcon,
    Timer as TimerIcon,
    MusicNote as MusicIcon,
    Person as PersonIcon,
    Menu as MenuIcon,
    AddCircle as AddCircleIcon
} from '@mui/icons-material';
import { useLesson } from '../contexts/LessonContext';
import { shareContent } from '../utils/share';
import TalkSelector from './Lesson/TalkSelector';
import { getHymnUrl } from '../utils/scriptureUtils';

export default function UnityNotesContent() {
    const [value, setValue] = useState(0);
    const [shareDialog, setShareDialog] = useState(false);
    const [selectedContent, setSelectedContent] = useState<any>(null);
    const { lessonData } = useLesson();
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newScriptureRef, setNewScriptureRef] = useState('');

    const handleShare = (content: any) => {
        setSelectedContent(content);
        setShareDialog(true);
    };

    const handleSharePlatform = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
        if (selectedContent) {
            const text = selectedContent.content || selectedContent.text;
            const title = selectedContent.title || selectedContent.reference;

            shareContent(platform, { title, content: text });
        }
        setShareDialog(false);
    };

    const handleAddScripture = () => {
        // TODO: Implementar lógica para adicionar escritura
        setShowAddDialog(false);
        setNewScriptureRef('');
    };


    return (
        <Box component="div" sx={{ pb: 7 }}>
            <AppHeader date={lessonData.date} />

            <Container maxWidth="sm" sx={{ mt: 2 }}>
                {/* Seletor de Discurso */}
                <TalkSelector />

                {/* Informações Básicas */}
                <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" component="div">Orações</Typography>
                                }
                                secondary={
                                    <Box component="div">
                                        <Typography variant="body2" component="div">
                                            Primeira: {lessonData.prayers.opening}
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            Última: {lessonData.prayers.closing}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemIcon>
                                <MusicIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" component="div">Hinos</Typography>
                                }
                                secondary={
                                    <Box component="div">
                                        <Typography variant="body2" component="div">
                                            Primeiro: #{lessonData.hymns.opening.number} - {lessonData.hymns.opening.title}
                                            <Button
                                                href={getHymnUrl(lessonData.hymns.opening.number)}
                                                target="_blank"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            >
                                                Ver letra
                                            </Button>
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            Último: #{lessonData.hymns.closing.number} - {lessonData.hymns.closing.title}
                                            <Button
                                                href={getHymnUrl(lessonData.hymns.closing.number)}
                                                target="_blank"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            >
                                                Ver letra
                                            </Button>
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    </List>
                </Paper>

                {/* Destaques do Discurso */}
                {value === 0 && (
                    <Box component="div">
                        {lessonData.selections && lessonData.selections
                            .filter(selection => selection.type === 'highlight')
                            .map((highlight, index) => (
                                <Card key={highlight.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">Leitura {highlight.order}</Typography>
                                        <Typography variant="body1" component="div">{highlight.content}</Typography>
                                        {highlight.author && (
                                            <Typography variant="caption" component="div" color="text.secondary">
                                                Compartilhado por: {highlight.author}
                                            </Typography>
                                        )}
                                        <IconButton
                                            onClick={() => handleShare(highlight)}
                                            sx={{ mt: 1 }}
                                        >
                                            <ShareIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            ))}
                    </Box>
                )}

                {/* Perguntas */}
                {value === 1 && (
                    <Box component="div">
                        {lessonData.questions.map((question) => (
                            <Card key={question.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">Pergunta {question.id}</Typography>
                                    <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                                        {question.question}
                                    </Typography>
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
                                </CardContent>
                            </Card>
                        ))}
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Enviar pergunta anônima"
                            sx={{ mb: 2 }}
                        />
                    </Box>
                )}

                {/* Escrituras */}
                {value === 2 && (
                    <Box component="div">
                        {lessonData.selections && lessonData.selections
                            .filter(selection => selection.type === 'scripture')
                            .map((scripture, index) => (
                                <Card key={scripture.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Escritura {scripture.order} - {scripture.reference}
                                        </Typography>
                                        <Typography variant="body1" component="div">{scripture.content}</Typography>
                                        {scripture.author && (
                                            <Typography variant="caption" component="div" color="text.secondary">
                                                Compartilhado por: {scripture.author}
                                            </Typography>
                                        )}
                                        <IconButton
                                            onClick={() => handleShare(scripture)}
                                            sx={{ mt: 1 }}
                                        >
                                            <ShareIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddCircleIcon />}
                            fullWidth
                            onClick={() => setShowAddDialog(true)}
                            sx={{ mt: 2 }}
                        >
                            Adicionar Escritura
                        </Button>
                    </Box>
                )}
            </Container>

            {/* Navegação Inferior */}
            <Paper
                component="div"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1100
                }}
                elevation={3}
            >
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Destaques" icon={<BookIcon />} />
                    <BottomNavigationAction label="Perguntas" icon={<ChatIcon />} />
                    <BottomNavigationAction label="Escrituras" icon={<BookIcon />} />
                </BottomNavigation>
            </Paper>

            {/* Dialog de Compartilhamento */}
            <Dialog
                open={shareDialog}
                onClose={() => setShareDialog(false)}
                fullWidth
            >
                <DialogTitle>Compartilhar</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem button onClick={() => handleSharePlatform('facebook')}>
                            <ListItemIcon>
                                <FacebookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Facebook" />
                        </ListItem>
                        <ListItem button onClick={() => handleSharePlatform('twitter')}>
                            <ListItemIcon>
                                <TwitterIcon />
                            </ListItemIcon>
                            <ListItemText primary="Twitter" />
                        </ListItem>
                        <ListItem button onClick={() => handleSharePlatform('whatsapp')}>
                            <ListItemIcon>
                                <WhatsAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="WhatsApp" />
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>

            {/* Dialog para Adicionar Escritura */}
            <Dialog
                open={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                fullWidth
            >
                <DialogTitle>Adicionar Escritura</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Referência (ex: 1 Néfi 3:7)"
                        fullWidth
                        variant="outlined"
                        value={newScriptureRef}
                        onChange={(e) => setNewScriptureRef(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddDialog(false)}>Cancelar</Button>
                    <Button onClick={handleAddScripture} variant="contained">
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}