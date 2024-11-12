export interface Hymn {
    number: number;
    title: string;
    link: string;
}

export interface Prayer {
    opening: string;
    closing: string;
}

export interface Scripture {
    reference: string;
    text: string;
}


export interface ClassInfo {
    name: string;
    type: 'quorum' | 'society';
    ward: string;
    stake: string;
}

export interface LessonData {
    title: string;
    date: string;
    classInfo: ClassInfo;
    talk: Talk;
    prayers: Prayer;
    hymns: {
        opening: Hymn;
        closing: Hymn;
    };
    announcements: string;
    selections: Selection[];
    questions: Question[];
}

export interface Question {
    id: number;
    type: 'open' | 'poll';
    question: string;
    options?: string[];
    timer?: number;
}

export interface Highlight {
    id: number;
    title: string;
    content: string;
}

export interface Talk {
    id: string;
    title: string;
    author: string;
    url: string;
    content?: string;
}

export interface Selection {
    id: number;
    type: 'highlight' | 'scripture' | 'student-highlight';
    content: string;
    author?: string;
    reference?: string;
    order: number;
}

export interface LessonData {
    title: string;
    date: string;
    talk: Talk;
    prayers: Prayer;
    hymns: {
        opening: Hymn;
        closing: Hymn;
    };
    announcements: string;
    selections: Selection[];
    questions: Question[];
}

export type SharePlatform = 'facebook' | 'twitter' | 'whatsapp';