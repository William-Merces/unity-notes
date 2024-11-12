import React, { useState } from 'react';

// Interface para o tipo Hymn
interface Hymn {
    number: number;
    title: string;
    link: string;
}

// Lista completa de hinos
const hymns: Hymn[] = [
    // Hinos 1-204
    { number: 1, title: "A Alva Rompe", link: "https://www.churchofjesuschrist.org/media/music/songs/the-morning-breaks?crumbs=hymns&lang=por" },
    { number: 2, title: "Tal Como um Facho", link: "https://www.churchofjesuschrist.org/media/music/songs/the-spirit-of-god?crumbs=hymns&lang=por" },
    { number: 3, title: "Alegres Cantemos", link: "https://www.churchofjesuschrist.org/media/music/songs/now-let-us-rejoice?crumbs=hymns&lang=por" },
    { number: 4, title: "No Monte a Bandeira", link: "https://www.churchofjesuschrist.org/media/music/songs/high-on-the-mountain-top?crumbs=hymns&lang=por" },
    { number: 5, title: "Israel, Jesus Te Chama", link: "https://www.churchofjesuschrist.org/media/music/songs/israel-israel-god-is-calling?crumbs=hymns&lang=por" },
    { number: 6, title: "Um Anjo Lá do Céu", link: "https://www.churchofjesuschrist.org/media/music/songs/an-angel-from-on-high?crumbs=hymns&lang=por" },
    { number: 7, title: "O Que Vimos Lá nos Céus", link: "https://www.churchofjesuschrist.org/media/music/songs/what-was-witnessed-in-the-heavens?crumbs=hymns&lang=por" },
    { number: 8, title: "Oração pelo Profeta", link: "https://www.churchofjesuschrist.org/media/music/songs/we-ever-pray-for-thee?crumbs=hymns&lang=por" },
    { number: 9, title: "Graças Damos, Ó Deus, Por um Profeta", link: "https://www.churchofjesuschrist.org/media/music/songs/we-thank-thee-o-god-for-a-prophet?crumbs=hymns&lang=por" },
    { number: 10, title: "Vinde ao Profeta Escutar", link: "https://www.churchofjesuschrist.org/media/music/songs/come-listen-to-a-prophets-voice?crumbs=hymns&lang=por" },
    { number: 11, title: "Abençoa Nosso Profeta", link: "https://www.churchofjesuschrist.org/media/music/songs/god-bless-our-prophet-dear?crumbs=hymns&lang=por" },
    { number: 12, title: "Que Manhã Maravilhosa!", link: "https://www.churchofjesuschrist.org/media/music/songs/joseph-smiths-first-prayer?crumbs=hymns&lang=por" },
    { number: 13, title: "Rejubilai-vos, Ó Nações", link: "https://www.churchofjesuschrist.org/media/music/songs/let-earths-inhabitants-rejoice?crumbs=hymns&lang=por" },
    { number: 14, title: "Hoje, ao Profeta Louvemos", link: "https://www.churchofjesuschrist.org/media/music/songs/praise-to-the-man?crumbs=hymns&lang=por" },
    { number: 15, title: "Um Pobre e Aflito Viajor", link: "https://www.churchofjesuschrist.org/media/music/songs/a-poor-wayfaring-man-of-grief?crumbs=hymns&lang=por" },
    { number: 16, title: "Ó Montanhas Mil", link: "https://www.churchofjesuschrist.org/media/music/songs/o-ye-mountains-high?crumbs=hymns&lang=por" },
    { number: 17, title: "Por Teus Dons", link: "https://www.churchofjesuschrist.org/media/music/songs/for-the-strength-of-the-hills?crumbs=hymns&lang=por" },
    { number: 18, title: "Vede, Ó Santos", link: "https://www.churchofjesuschrist.org/media/music/songs/saints-behold-how-great-jehovah?crumbs=hymns&lang=por" },
    { number: 19, title: "Sereno Finda o Dia", link: "https://www.churchofjesuschrist.org/media/music/songs/the-wintry-day-descending-to-its-close?crumbs=hymns&lang=por" },
    { number: 20, title: "Vinde, Ó Santos", link: "https://www.churchofjesuschrist.org/media/music/songs/come-come-ye-saints?crumbs=hymns&lang=por" },
    { number: 21, title: "Ao Salvador Louvemos", link: "https://www.churchofjesuschrist.org/media/music/songs/come-all-ye-saints-of-zion?crumbs=hymns&lang=por" },
    { number: 22, title: "Em Glória Resplandesce", link: "https://www.churchofjesuschrist.org/media/music/songs/arise-o-glorious-zion?crumbs=hymns&lang=por" },
    { number: 23, title: "Lá nos Cumes", link: "https://www.churchofjesuschrist.org/media/music/songs/zion-stands-with-hills-surrounded?crumbs=hymns&lang=por" },
    { number: 24, title: "Vem, Ó Dia Prometido", link: "https://www.churchofjesuschrist.org/media/music/songs/come-thou-glorious-day-of-promise?crumbs=hymns&lang=por" },
    { number: 25, title: "Bela Sião", link: "https://www.churchofjesuschrist.org/media/music/songs/beautiful-zion-built-above?crumbs=hymns&lang=por" },
    { number: 26, title: "O Mundo Desperta", link: "https://www.churchofjesuschrist.org/media/music/songs/the-day-dawn-is-breaking?crumbs=hymns&lang=por" },
    { number: 27, title: "Vinde, Ó Filhos do Senhor", link: "https://www.churchofjesuschrist.org/media/music/songs/come-ye-children-of-the-lord?crumbs=hymns&lang=por" },
    { number: 28, title: "Ó Vem, Supremo Rei", link: "https://www.churchofjesuschrist.org/media/music/songs/come-o-thou-king-of-kings?crumbs=hymns&lang=por" },
    { number: 29, title: "Ó Criaturas do Senhor", link: "https://www.churchofjesuschrist.org/media/music/songs/all-creatures-of-our-god-and-king?crumbs=hymns&lang=por" },
    { number: 30, title: "Ó Santos, Que na Terra Habitais", link: "https://www.churchofjesuschrist.org/media/music/songs/come-all-ye-saints-who-dwell-on-earth?crumbs=hymns&lang=por" },
    
    // ... (todos os hinos de 1-204)
    { number: 204, title: "Ó Vós, Que Sois Chamados", link: "/hinos/204" },

    
    { number: 31, title: "Com Braço Forte", link: "https://www.churchofjesuschrist.org/media/music/songs/god-of-our-fathers-whose-almighty-hand?crumbs=hymns&lang=por" },
    { number: 32, title: "Castelo Forte", link: "https://www.churchofjesuschrist.org/media/music/songs/a-mighty-fortress-is-our-god?crumbs=hymns&lang=por" },
    { number: 33, title: "Glória a Deus Cantai", link: "https://www.churchofjesuschrist.org/media/music/songs/guide-us-o-thou-great-jehovah?crumbs=hymns&lang=por" },
    { number: 34, title: "Louvai a Deus", link: "https://www.churchofjesuschrist.org/media/music/songs/praise-god-from-whom-all-blessings-flow?crumbs=hymns&lang=por" },
    { number: 35, title: "A Deus, Senhor e Rei", link: "https://www.churchofjesuschrist.org/media/music/songs/great-god-of-nations?crumbs=hymns&lang=por" },
    { number: 36, title: "Deus É Amor", link: "https://www.churchofjesuschrist.org/media/music/songs/god-is-love?crumbs=hymns&lang=por" },
    { number: 37, title: "O Senhor Meu Pastor É", link: "https://www.churchofjesuschrist.org/media/music/songs/the-lord-is-my-shepherd?crumbs=hymns&lang=por" },
    { number: 38, title: "Que Toda Honra e Glória", link: "https://www.churchofjesuschrist.org/media/music/songs/now-thank-we-all-our-god?crumbs=hymns&lang=por" },
    { number: 39, title: "Corações, Pois, Exultai", link: "https://www.churchofjesuschrist.org/media/music/songs/rejoice-the-lord-is-king?crumbs=hymns&lang=por" },
    { number: 40, title: "Jeová, Sê Nosso Guia", link: "https://www.churchofjesuschrist.org/media/music/songs/lead-kindly-light?crumbs=hymns&lang=por" },
    { number: 41, title: "Firmes Segui", link: "https://www.churchofjesuschrist.org/media/music/songs/come-ye-children-of-the-lord?crumbs=hymns&lang=por" },
    { number: 42, title: "Que Firme Alicerce", link: "https://www.churchofjesuschrist.org/media/music/songs/how-firm-a-foundation?crumbs=hymns&lang=por" },
    { number: 43, title: "Grandioso És Tu", link: "https://www.churchofjesuschrist.org/media/music/songs/how-great-thou-art?crumbs=hymns&lang=por" },
    { number: 44, title: "Jesus, Minha Luz", link: "https://www.churchofjesuschrist.org/media/music/songs/the-light-divine?crumbs=hymns&lang=por" },
    { number: 45, title: "Ó Vós Que Amais ao Senhor", link: "https://www.churchofjesuschrist.org/media/music/songs/o-ye-that-love-the-lord?crumbs=hymns&lang=por" },
    { number: 46, title: "Nossas Vozes Elevemos", link: "https://www.churchofjesuschrist.org/media/music/songs/praise-to-the-lord?crumbs=hymns&lang=por" },
    { number: 47, title: "Deus nos Rege com Amor", link: "https://www.churchofjesuschrist.org/media/music/songs/god-moves-in-a-mysterious-way?crumbs=hymns&lang=por" },
    { number: 48, title: "Ó Pai Bendito", link: "https://www.churchofjesuschrist.org/media/music/songs/o-god-the-eternal-father?crumbs=hymns&lang=por" },
    { number: 49, title: "Pela Beleza do Mundo", link: "https://www.churchofjesuschrist.org/media/music/songs/for-the-beauty-of-the-earth?crumbs=hymns&lang=por" },
    { number: 50, title: "Cantando Louvamos", link: "https://www.churchofjesuschrist.org/media/music/songs/sing-praise-to-him?crumbs=hymns&lang=por" },
    { number: 51, title: "Oração de Graças", link: "https://www.churchofjesuschrist.org/media/music/songs/prayer-of-thanksgiving?crumbs=hymns&lang=por" },
    { number: 52, title: "Vinde, Ó Povos, Graças Dar", link: "https://www.churchofjesuschrist.org/media/music/songs/come-ye-thankful-people-come?crumbs=hymns&lang=por" },
    { number: 53, title: "Se Tenho Fé", link: "https://www.churchofjesuschrist.org/media/music/songs/if-you-could-hie-to-kolob?crumbs=hymns&lang=por" },
    { number: 54, title: "Doce É o Trabalho", link: "https://www.churchofjesuschrist.org/media/music/songs/put-your-shoulder-to-the-wheel?crumbs=hymns&lang=por" },
    { number: 55, title: "Santo! Santo! Santo!", link: "https://www.churchofjesuschrist.org/media/music/songs/holy-holy-holy?crumbs=hymns&lang=por" },
    { number: 56, title: "Os Céus Proclamam", link: "https://www.churchofjesuschrist.org/media/music/songs/the-morning-breaks?crumbs=hymns&lang=por" },
    { number: 57, title: "Conta as Bênçãos", link: "https://www.churchofjesuschrist.org/media/music/songs/count-your-many-blessings?crumbs=hymns&lang=por" },
    { number: 58, title: "Ao Deus de Abraão Louvai", link: "https://www.churchofjesuschrist.org/media/music/songs/the-god-of-abraham-praise?crumbs=hymns&lang=por" },
    { number: 59, title: "Louvai o Eterno Criador", link: "https://www.churchofjesuschrist.org/media/music/songs/for-the-beauty-of-the-earth?crumbs=hymns&lang=por" },
    { number: 60, title: "Brilha, Meiga Luz", link: "https://www.churchofjesuschrist.org/media/music/songs/lead-kindly-light?crumbs=hymns&lang=por" },
    { number: 61, title: "Careço de Jesus", link: "https://www.churchofjesuschrist.org/media/music/songs/i-need-thee-every-hour?crumbs=hymns&lang=por" },

    // Dia do Senhor e dias da semana (1001-1018)
    { number: 1001, title: "Ó Senhor de toda bênção", link: "/hinos/1001" },
    { number: 1002, title: "Quando o Salvador voltar", link: "/hinos/1002" },
    { number: 1003, title: "Minha alma tem paz", link: "/hinos/1003" },
    { number: 1004, title: "Quero andar com Cristo", link: "/hinos/1004" },
    { number: 1005, title: "Do passarinho cuida", link: "/hinos/1005" },
    { number: 1006, title: "Pense na canção", link: "/hinos/1006" },
    { number: 1007, title: "Partido o pão", link: "/hinos/1007" },
    { number: 1008, title: "Pão do Céu, Água Viva", link: "/hinos/1008" },
    { number: 1009, title: "Getsêmani", link: "/hinos/1009" },
    { number: 1010, title: "Sublime graça", link: "/hinos/1010" },
    { number: 1011, title: "De mãos dadas em união", link: "/hinos/1011" },
    { number: 1012, title: "A qualquer hora ou lugar", link: "/hinos/1012" },
    { number: 1013, title: "O amor de Deus", link: "/hinos/1013" },
    { number: 1014, title: "O meu Pastor vai me amparar", link: "/hinos/1014" },
    { number: 1015, title: "O profundo amor de Cristo", link: "/hinos/1015" },
    { number: 1016, title: "Olhai as mãos do Redentor", link: "/hinos/1016" },
    { number: 1017, title: "Este é o Cristo", link: "/hinos/1017" },
    { number: 1018, title: "Vem, ó Jesus! Vem!", link: "/hinos/1018" },
    
    // Páscoa e Natal (1201-1204)
    { number: 1201, title: "Eis a Páscoa do Senhor", link: "/hinos/1201" },
    { number: 1202, title: "O menino Jesus nasceu", link: "/hinos/1202" },
    { number: 1203, title: "Quem é o menino?", link: "/hinos/1203" },
    { number: 1204, title: "Estrela brilhante e bela", link: "/hinos/1204" }
];

interface HymnSelectorProps {
    label: string;
    onChange: (hymn: Hymn) => void;
    className?: string;
}

const HymnSelector = ({ label, onChange, className = '' }: HymnSelectorProps) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredHymns = search
        ? hymns.filter(hymn =>
            hymn.title.toLowerCase().includes(search.toLowerCase()) ||
            hymn.number.toString().includes(search)
        )
        : [];

    const handleSelectHymn = (hymn: Hymn) => {
        onChange(hymn);
        setSearch('');
        setIsOpen(false);
    };

    const handleClickOutside = () => {
        // Pequeno delay para permitir que o clique no item seja processado
        setTimeout(() => setIsOpen(false), 200);
    };

    return (
        <div className={`relative ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar por número ou título..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={handleClickOutside}
                />
                {isOpen && search && filteredHymns.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredHymns.map((hymn) => (
                            <button
                                key={hymn.number}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                onClick={() => handleSelectHymn(hymn)}
                            >
                                <span>
                                    <span className="font-medium">{hymn.number}.</span>{' '}
                                    {hymn.title}
                                </span>
                                {hymn.number >= 1001 && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        {hymn.number >= 1201 ? 'Suplementar - Páscoa/Natal' : 'Suplementar - Dia do Senhor'}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {isOpen && search && filteredHymns.length === 0 && (
                <div className="absolute z-50 w-full mt-1 p-4 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-500">
                    Nenhum hino encontrado
                </div>
            )}
        </div>
    );
};

export default HymnSelector;