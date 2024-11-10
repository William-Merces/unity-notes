interface ScriptureReference {
    book: string;
    chapter: number;
    verse: string;
}

export const parseScriptureReference = (reference: string): ScriptureReference | null => {
    // Regex para matches como "1 Néfi 3:7" ou "Alma 32:21-23"
    const regex = /^(\d\s+)?([A-ZÀ-Úa-zà-ú]+)\s+(\d+):(\d+(-\d+)?)$/;
    const match = reference.match(regex);

    if (!match) return null;

    return {
        book: `${match[1] || ''}${match[2]}`.trim(),
        chapter: parseInt(match[3]),
        verse: match[4]
    };
};

export const getScriptureUrl = (reference: ScriptureReference): string => {
    const baseUrl = 'https://www.churchofjesuschrist.org/study/scriptures';
    // Aqui você precisaria mapear os nomes dos livros para os URLs corretos
    // Este é um exemplo simplificado
    return `${baseUrl}/${encodeURIComponent(reference.book)}/${reference.chapter}?lang=por`;
};

export const getHymnUrl = (number: number): string => {
    return `https://www.churchofjesuschrist.org/study/manual/hymns/${number}?lang=por`;
};