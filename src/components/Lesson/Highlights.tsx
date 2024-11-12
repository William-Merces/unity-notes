'use client';

import { Box } from '@mui/material';
import { useLesson } from '@/contexts/LessonContext';
import ContentCard from '../UI/ContentCard';
import { SharePlatform } from '@/types';
import { shareContent } from '@/utils/share';

export default function Highlights() {
    const { lessonData } = useLesson();

    const handleShare = (content: string, title: string) => {
        const platforms: SharePlatform[] = ['facebook', 'twitter', 'whatsapp'];
        // Aqui você pode implementar um dialog de seleção de plataforma
        shareContent(platforms[0], { title, content });
    };

    return (
        <Box component="div">
            {lessonData.selections && lessonData.selections
                .filter(selection => selection.type === 'highlight')
                .map((highlight, index) => (
                    <ContentCard
                        key={highlight.id}
                        title={`Leitura ${highlight.order}`}
                        content={highlight.content}
                        subtitle={highlight.author ? `Compartilhado por: ${highlight.author}` : undefined}
                        onShare={() => handleShare(highlight.content, `Leitura ${highlight.order}`)}
                    />
                ))}
        </Box>
    );
}