'use client'

import { useState } from 'react'
import { Talk } from '@/types'

interface TalkSelectorProps {
    onSelect: (talk: Talk) => void;
}

const conferenceTalks = [
    {
        title: "Conferência Geral Outubro de 2024",
        talks: [
            {
                id: "eyring-oct24",
                title: "Apoio às autoridades gerais, aos setentas de área e aos líderes gerais",
                author: "Henry B. Eyring",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/11eyring?lang=por"
                },
                {
                id: "andersen-oct24",
                title: "O triunfo da esperança",
                author: "Neil L. Andersen",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/12andersen?lang=por"
                },
                {
                id: "freeman-oct24",
                title: "Viver à altura de seus privilégios",
                author: "Emily Belle Freeman",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/13freeman?lang=por"
                },
                {
                id: "hirst-oct24",
                title: "Os favoritos de Deus",
                author: "Karl D. Hirst",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/14hirst?lang=por"
                },
                {
                id: "renlund-oct24",
                title: "Este é o meu evangelho — Esta é a minha igreja",
                author: "Dale G. Renlund",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/15renlund?lang=por"
                },
                {
                id: "homer-oct24",
                title: "Confiar no Pai",
                author: "David P. Homer",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/16homer?lang=por"
                },
                {
                id: "casillas-oct24",
                title: "Deus ama todos os Seus filhos",
                author: "Gregorio E. Casillas",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/17casillas?lang=por"
                },
                {
                id: "oaks-oct24",
                title: "Seguir a Cristo",
                author: "Dallin H. Oaks",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/18oaks?lang=por"
                },
                {
                id: "christofferson-oct24",
                title: "Enterrar nossas armas de rebelião",
                author: "D. Todd Christofferson",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/21christofferson?lang=por"
                },
                {
                id: "teixeira-oct24",
                title: "Ligados a Jesus Cristo: Tornar-se o sal da Terra",
                author: "José A. Teixeira",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/22teixeira?lang=por"
                },
                {
                id: "villar-oct24",
                title: "A mão do Senhor está pronta para nos ajudar",
                author: "Juan Pablo Villar",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/23villar?lang=por"
                },
                {
                id: "kearon-oct24",
                title: "Bem-vindos à Igreja da alegria",
                author: "Patrick Kearon",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/24kearon?lang=por"
                },
                {
                id: "buckner-oct24",
                title: "Sois meus amigos",
                author: "David L. Buckner",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/25buckner?lang=por"
                },
                {
                id: "goury-oct24",
                title: "Sê limpo",
                author: "D. Martin Goury",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/26goury?lang=por"
                },
                {
                id: "cavalcante-oct24",
                title: "O vento não deixou de soprar",
                author: "Aroldo B. Cavalcante",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/27cavalcante?lang=por"
                },
                {
                id: "soares-oct24",
                title: "Alinhar nossos desejos aos Dele",
                author: "Ulisses Soares",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/28soares?lang=por"
                },
                {
                id: "gong-oct24",
                title: "Santidade ao Senhor na vida diária",
                author: "Gerrit W. Gong",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/31gong?lang=por"
                },
                {
                id: "yee-oct24",
                title: "A alegria de nossa redenção",
                author: "Kristin M. Yee",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/32yee?lang=por"
                },
                {
                id: "mckay-oct24",
                title: "Hoje, ao profeta louvemos",
                author: "Kyle S. McKay",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/33mckay?lang=por"
                },
                {
                id: "alvarado-oct24",
                title: "Abraçar o dom do arrependimento dado pelo Senhor",
                author: "Jorge M. Alvarado",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/34alvarado?lang=por"
                },
                {
                id: "bednar-oct24",
                title: "No espaço de não muitos anos",
                author: "David A. Bednar",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/35bednar?lang=por"
                },
                {
                id: "holland-oct24",
                title: "Sou eu",
                author: "Jeffrey R. Holland",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/41holland?lang=por"
                },
                {
                id: "browning-oct24",
                title: "Buscar respostas para dúvidas espirituais",
                author: "Tracy Y. Browning",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/42browning?lang=por"
                },
                {
                id: "hales-oct24",
                title: "A mortalidade vale a pena!",
                author: "Brook P. Hales",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/43hales?lang=por"
                },
                {
                id: "budge-oct24",
                title: "Buscar ao Senhor de todo o coração",
                author: "L. Todd Budge",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/45budge?lang=por"
                },
                {
                id: "stevenson-oct24",
                title: "Dias inesquecíveis",
                author: "Gary E. Stevenson",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/44stevenson?lang=por"
                },
                {
                id: "wilcox-oct24",
                title: "Ó jovens de nobre estirpe",
                author: "Bradley R. Wilcox",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/46wilcox?lang=por"
                },
                {
                id: "eyring2-oct24",
                title: "A doutrina de Jesus Cristo é simples",
                author: "Henry B. Eyring",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/47eyring?lang=por"
                },
                {
                id: "uchtdorf-oct24",
                title: "Nutram as raízes, e os ramos crescerão",
                author: "Dieter F. Uchtdorf",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/51uchtdorf?lang=por"
                },
                {
                id: "wada-oct24",
                title: "As palavras de Cristo e o Espírito Santo nos levarão à verdade",
                author: "Takashi Wada",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/52wada?lang=por"
                },
                {
                id: "rasband-oct24",
                title: "Eis que eu sou a luz que levantareis",
                author: "Ronald A. Rasband",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/53rasband?lang=por"
                },
                {
                id: "cook-oct24",
                title: "Escrituras sagradas — O alicerce da fé",
                author: "Quentin L. Cook",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/54cook?lang=por"
                },
                {
                id: "alliaud-oct24",
                title: "Filhos e filhas de Deus",
                author: "Rubén V. Alliaud",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/55alliaud?lang=por"
                },
                {
                id: "egbo-oct24",
                title: "Concentrar-se em Jesus Cristo e em Seu evangelho",
                author: "I. Raymond Egbo",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/56egbo?lang=por"
                },
                {
                id: "nelson-oct24",
                title: "O Senhor Jesus Cristo voltará",
                author: "Russell M. Nelson",
                url: "https://www.churchofjesuschrist.org/study/general-conference/2024/10/57nelson?lang=por"
                }
        ]
    }
];

export default function TalkSelector({ onSelect }: TalkSelectorProps) {
    const [selectedSession, setSelectedSession] = useState<string>("")

    return (
        <div className="space-y-4">
            <div>
                <select 
                    className="w-full p-2 border rounded-lg"
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                >
                    <option value="">Selecione uma sessão</option>
                    {conferenceTalks.map((session) => (
                        <option key={session.title} value={session.title}>
                            {session.title}
                        </option>
                    ))}
                </select>
            </div>

            {selectedSession && (
                <div className="space-y-2">
                    {conferenceTalks
                        .find(s => s.title === selectedSession)
                        ?.talks.map((talk) => (
                            <button
                                key={talk.id}
                                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                                onClick={() => onSelect(talk)}
                            >
                                <div className="font-medium">{talk.title}</div>
                                <div className="text-sm text-gray-600">{talk.author}</div>
                            </button>
                        ))}
                </div>
            )}
        </div>
    )
}