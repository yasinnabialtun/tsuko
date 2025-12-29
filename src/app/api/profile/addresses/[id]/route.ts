import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE Address
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Verify ownership
        const existing = await prisma.userAddress.findUnique({
            where: { id }
        });

        if (!existing || existing.userId !== userId) {
            return NextResponse.json({ error: 'Adres bulunamadı' }, { status: 404 });
        }

        await prisma.userAddress.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}

// PUT Address (Update)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Verify ownership
        const existing = await prisma.userAddress.findUnique({ where: { id } });
        if (!existing || existing.userId !== userId) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // If setting as default, update others first
        if (body.isDefault) {
            await prisma.userAddress.updateMany({
                where: { userId, id: { not: id } },
                data: { isDefault: false }
            });
        }

        const updated = await prisma.userAddress.update({
            where: { id },
            data: {
                title: body.title,
                recipientName: body.recipientName,
                phone: body.phone,
                address: body.address,
                city: body.city,
                district: body.district,
                zipCode: body.zipCode,
                isDefault: body.isDefault
            }
        });

        return NextResponse.json({ address: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
