'use client';

import React from 'react';
import { Share, Copy, MessageCircle, Facebook, Twitter } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "../UI/alert-dialog";

interface ShareOption {
    icon: React.ReactNode;
    label: string;
    action: () => void;
    color?: string;
}

interface ShareMenuProps {
    onShare: () => Promise<void>;
    onCopy: () => void;
    text: string;
    url: string;
}

export default function ShareMenu({ onShare, onCopy, text, url }: ShareMenuProps) {
    const shareOptions: ShareOption[] = [
        {
            icon: <Share className="w-6 h-6" />,
            label: 'Compartilhar',
            action: onShare,
            color: 'text-blue-600'
        },
        {
            icon: <Copy className="w-6 h-6" />,
            label: 'Copiar texto',
            action: onCopy,
            color: 'text-gray-600'
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            label: 'WhatsApp',
            action: () => {
                window.open(`whatsapp://send?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
            },
            color: 'text-green-600'
        },
        {
            icon: <Facebook className="w-6 h-6" />,
            label: 'Facebook',
            action: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
            },
            color: 'text-blue-700'
        },
        {
            icon: <Twitter className="w-6 h-6" />,
            label: 'Twitter',
            action: () => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            },
            color: 'text-blue-400'
        }
    ];

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Share className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-0 gap-0 max-w-[90vw] sm:max-w-[400px]">
                <div className="p-4 border-b dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Compartilhar
                    </h3>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4">
                    {shareOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                option.action();
                                if (navigator.vibrate) navigator.vibrate(5);
                            }}
                            className="flex flex-col items-center justify-center gap-2"
                        >
                            <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${option.color}`}>
                                {option.icon}
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}