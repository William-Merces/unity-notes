'use client'

import { useState } from 'react'
import { useLesson } from '@/contexts/LessonContext'
import HymnSelector from './HymnSelector'
import TalkSelector from './TalkSelector'
import { Talk, Hymn } from '@/types'

export function LessonSetup() {
    const { updateLesson, lessonData } = useLesson()
    const [formData, setFormData] = useState({
        title: lessonData.title || '',
        openingPrayer: lessonData.prayers.opening || '',
        closingPrayer: lessonData.prayers.closing || '',
        announcements: lessonData.announcements || ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        if (field === 'openingPrayer' || field === 'closingPrayer') {
            updateLesson({
                prayers: {
                    ...lessonData.prayers,
                    [field === 'openingPrayer' ? 'opening' : 'closing']: value
                }
            })
        } else {
            updateLesson({
                [field]: value
            })
        }
    }

    const handleTalkSelect = (talk: Talk) => {
        updateLesson({ talk })
    }

    const handleHymnSelect = (type: 'opening' | 'closing', hymn: Hymn) => {
        updateLesson({
            hymns: {
                ...lessonData.hymns,
                [type]: hymn
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Título da Aula */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Título da Aula
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Digite o título da aula"
                />
            </div>

            {/* Seletor de Discurso */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Discurso Tema
                </label>
                <TalkSelector onSelect={handleTalkSelect} />
            </div>

            {/* Hino Inicial */}
            <HymnSelector 
                label="Hino Inicial"
                onChange={(hymn) => handleHymnSelect('opening', hymn)}
            />

            {/* Oração Inicial */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Oração Inicial
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={formData.openingPrayer}
                    onChange={(e) => handleInputChange('openingPrayer', e.target.value)}
                    placeholder="Nome de quem fará a oração"
                />
            </div>

            {/* Anúncios */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Anúncios
                </label>
                <textarea
                    className="w-full p-2 border rounded-lg min-h-[100px]"
                    value={formData.announcements}
                    onChange={(e) => handleInputChange('announcements', e.target.value)}
                    placeholder="Digite os anúncios aqui"
                />
            </div>

            {/* Hino Final */}
            <HymnSelector 
                label="Hino Final"
                onChange={(hymn) => handleHymnSelect('closing', hymn)}
            />

            {/* Oração Final */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Oração Final
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={formData.closingPrayer}
                    onChange={(e) => handleInputChange('closingPrayer', e.target.value)}
                    placeholder="Nome de quem fará a oração"
                />
            </div>
        </div>
    )
}