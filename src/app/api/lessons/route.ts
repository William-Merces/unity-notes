import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const lessonData: Prisma.LessonCreateInput = {
            title: "Nova Aula",
            firstHymn: body.firstHymn,
            firstPrayer: body.firstPrayer,
            announcements: body.announcements || null,
            lastHymn: body.lastHymn,
            lastPrayer: body.lastPrayer,
            discourse: body.discourse,
            discoursePath: '',
            teacherId: "cm437iq2m0000ttpwvv6xbnpx",
            slides: {
                create: body.slides.map((slide: any, index: number) => ({
                    order: index,
                    content: slide.content,
                    resources: {
                        create: slide.resources?.map((resource: any) => ({
                            type: resource.type,
                            content: resource.content || resource.question || '',
                            reference: resource.reference || null,
                            options: resource.options
                                ? JSON.stringify(resource.options)
                                : null
                        })) || []
                    }
                }))
            }
        };

        const lesson = await prisma.lesson.create({
            data: lessonData,
            include: {
                slides: {
                    include: {
                        resources: true
                    }
                }
            }
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Erro ao criar aula:', error);
        return NextResponse.json(
            { error: 'Erro ao criar aula' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const lessons = await prisma.lesson.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                teacher: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar aulas' },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, title, firstHymn, firstPrayer, announcements, lastHymn, lastPrayer, discourse, slides } = body;

        const lesson = await prisma.lesson.update({
            where: { id },
            data: {
                title,
                firstHymn,
                firstPrayer,
                announcements,
                lastHymn,
                lastPrayer,
                discourse,
                slides: {
                    deleteMany: {},
                    create: slides.map((slide: any, index: number) => ({
                        order: index,
                        content: slide.content,
                        resources: {
                            create: slide.resources?.map((resource: any) => ({
                                type: resource.type,
                                content: resource.content || resource.question || '',
                                reference: resource.reference || null,
                                options: resource.options
                                    ? JSON.stringify(resource.options)
                                    : null
                            })) || []
                        }
                    }))
                }
            },
            include: {
                slides: {
                    include: {
                        resources: true
                    }
                }
            }
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Erro ao atualizar aula:', error);
        return NextResponse.json(
            { error: 'Erro ao atualizar aula' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID da aula não fornecido' },
                { status: 400 }
            );
        }

        await prisma.lesson.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Aula excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir aula:', error);
        return NextResponse.json(
            { error: 'Erro ao excluir aula' },
            { status: 500 }
        );
    }
}