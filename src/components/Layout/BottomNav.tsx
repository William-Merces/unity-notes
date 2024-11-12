import React from 'react';
import { Book, Bookmark, MessageSquare, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BottomNavProps {
    value: number;
    onChange: (newValue: number) => void;
}

const BottomNav = ({ value, onChange }: BottomNavProps) => {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Configuração do swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && value < 3) {
            onChange(value + 1);
            vibrate();
        }
        if (isRightSwipe && value > 0) {
            onChange(value - 1);
            vibrate();
        }
    };

    const vibrate = () => {
        if (navigator.vibrate) {
            navigator.vibrate(5);
        }
    };

    const items = [
        { icon: Book, label: 'Aula' },
        { icon: Bookmark, label: 'Destaques' },
        { icon: MessageSquare, label: 'Discussão' },
        { icon: Settings, label: 'Ajustes' }
    ];

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe-area-bottom z-50"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="flex items-center justify-around h-16">
                {items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                onChange(index);
                                vibrate();
                            }}
                            className={`flex flex-col items-center justify-center w-full h-full transition-colors
                ${value === index
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            <Icon className={`w-6 h-6 mb-1 transition-transform duration-200 
                ${value === index ? 'scale-110' : 'scale-100'}`}
                            />
                            <span className="text-xs">{item.label}</span>

                            {value === index && (
                                <div className="absolute bottom-0 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;