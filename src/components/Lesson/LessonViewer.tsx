'use client'

import { useLesson } from '@/contexts/LessonContext';
import ContentCard, { ContentCardType } from '../UI/ContentCard';
import ShareMenu from '../UI/ShareMenu';
import { useRouter } from 'next/navigation';
import { Selection } from '@/types';

interface LessonViewerProps {
    showAlert: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export function LessonViewer({ showAlert }: LessonViewerProps) {
    const { lessonData, activeSection, favorites, addFavorite, shareSelection } = useLesson();
    const router = useRouter();

    if (!lessonData) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Carregando dados da aula...</p>
            </div>
        );
    }

    const handleShare = async (selection: Selection) => {
        if (!selection) return;

        try {
            await shareSelection(selection);
            showAlert('success', 'Conteúdo compartilhado!');
        } catch (error) {
            showAlert('error', 'Erro ao compartilhar', 'Tente novamente mais tarde');
        }
    };

    const renderBasicSection = () => {
        const talkSelection: Selection = {
            id: parseInt(lessonData.talk?.id || '0'),
            type: 'highlight',
            content: lessonData.talk?.title || '',
            order: 0
        };

        return (
            <div className="space-y-4">
                {lessonData.talk?.title && (
                    <ContentCard
                        title="Discurso da Semana"
                        content={lessonData.talk.title}
                        onShare={() => handleShare(talkSelection)}
                        type="highlight"
                    />
                )}
                {lessonData.hymns?.opening && (
                    <ContentCard
                        title="Hino Inicial"
                        content={`${lessonData.hymns.opening.number} - ${lessonData.hymns.opening.title}`}
                        type="default"
                    />
                )}
            </div>
        );
    };

    const renderHighlightsSection = () => {
        if (!lessonData.selections || lessonData.selections.length === 0) {
            return (
                <div className="text-center py-4">
                    <p>Nenhum destaque disponível</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {lessonData.selections.map((selection) => (
                    <ContentCard
                        key={selection.id}
                        title={selection.type === 'scripture' ? selection.reference || 'Referência' : 'Destaque'}
                        content={selection.content || 'Conteúdo não disponível'}
                        subtitle={selection.author}
                        onShare={() => handleShare(selection)}
                        type={selection.type}
                        isFavorite={favorites?.some(f => f.id === selection.id)}
                        onFavorite={() => addFavorite(selection)}
                    />
                ))}
            </div>
        );
    };

    const renderQuestionsSection = () => {
        if (!lessonData.questions || lessonData.questions.length === 0) {
            return (
                <div className="text-center py-4">
                    <p>Nenhuma pergunta disponível</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {lessonData.questions.map((question) => (
                    <ContentCard
                        key={question.id}
                        title="Pergunta para Discussão"
                        content={question.question}
                        type="question"
                    />
                ))}
            </div>
        );
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'basic':
                return renderBasicSection();
            case 'highlights':
                return renderHighlightsSection();
            case 'questions':
                return renderQuestionsSection();
            default:
                return (
                    <div className="text-center py-4">
                        <p>Selecione uma seção para visualizar o conteúdo</p>
                    </div>
                );
        }
    };

    return (
        <div className="pt-4">
            {renderContent()}
        </div>
    );
}

export default LessonViewer;