'use client'

import { useLesson } from '@/contexts/LessonContext'
import { Sun, Moon, Menu } from 'lucide-react'

interface DynamicAppBarProps {
    onMenuClick?: () => void;
}

export default function DynamicAppBar({ onMenuClick }: DynamicAppBarProps) {
    const { isDarkMode, toggleDarkMode, lessonData } = useLesson()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        {onMenuClick && (
                            <button
                                onClick={onMenuClick}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        )}
                        <h1 className="font-semibold">
                            {lessonData.title || 'Unity Notes'}
                        </h1>
                    </div>
                    
                    <button
                        onClick={toggleDarkMode}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}