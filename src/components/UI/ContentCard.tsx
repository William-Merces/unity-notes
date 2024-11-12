'use client'

import React from 'react';
import { Share, Bookmark, BookmarkCheck, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

export type ContentCardType = 'scripture' | 'highlight' | 'student-highlight' | 'question' | 'default';

interface ContentCardProps {
    title: string;
    content: string;
    subtitle?: string;
    type?: ContentCardType;
    onShare?: () => void;
    isFavorite?: boolean;
    onFavorite?: () => void;
    className?: string;
    shareUrl?: string;
}

const ContentCard = ({
    title,
    content,
    subtitle,
    type = 'default',
    onShare,
    isFavorite = false,
    onFavorite,
    className = '',
    shareUrl
}: ContentCardProps) => {
    const [isBookmarked, setIsBookmarked] = useState(isFavorite);
    const [showShareAlert, setShowShareAlert] = useState(false);

    const handleShare = async () => {
        if (onShare) {
            onShare();
            return;
        }

        if (navigator.share && shareUrl) {
            try {
                await navigator.share({
                    title: title,
                    text: content,
                    url: shareUrl
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(`${title}\n\n${content}\n\n${shareUrl || ''}`);
            setShowShareAlert(true);
            setTimeout(() => setShowShareAlert(false), 2000);
        }
    };

    const handleFavorite = () => {
        setIsBookmarked(!isBookmarked);
        if (onFavorite) {
            onFavorite();
        }
    };

    const getTypeStyles = () => {
        switch (type) {
            case 'scripture':
                return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
            case 'highlight':
            case 'student-highlight':
                return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
            case 'question':
                return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
            default:
                return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div
                className={`rounded-xl border p-4 shadow-sm transition-all duration-200 
                ${getTypeStyles()}
                hover:shadow-md active:scale-[0.99]`}
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg dark:text-white">{title}</h3>
                    <div className="flex space-x-2">
                        {onFavorite && (
                            <button
                                onClick={handleFavorite}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {isBookmarked ? (
                                    <BookmarkCheck className="w-5 h-5 text-blue-500" />
                                ) : (
                                    <Bookmark className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                                )}
                            </button>
                        )}
                        <button
                            onClick={handleShare}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Share className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                        </button>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content}</p>

                {subtitle && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                )}

                {type === 'question' && (
                    <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>Toque para responder</span>
                    </div>
                )}
            </div>

            {showShareAlert && (
                <Alert className="absolute bottom-full left-0 right-0 mb-2 bg-green-50 dark:bg-green-900/20">
                    <AlertTitle>Copiado para a área de transferência!</AlertTitle>
                </Alert>
            )}
        </div>
    );
};

export default ContentCard;