'use client';

import {
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Box,
    Divider
} from '@mui/material';
import {
    Person as PersonIcon,
    MusicNote as MusicIcon
} from '@mui/icons-material';
import { useLesson } from '@/contexts/LessonContext';
import { getHymnUrl } from '@/utils/scriptureUtils';

export default function BasicInfo() {
    const { lessonData } = useLesson();

    return (
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
    );
}