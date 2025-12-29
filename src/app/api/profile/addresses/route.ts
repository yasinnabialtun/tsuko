import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const addresses = await prisma.userAddress.findMany({
            where: { userId },
            orderBy: { isDefault: 'desc' }
        });

        return NextResponse.json({ addresses });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, recipientName, phone, address, city, district, zipCode, isDefault } = body;

        // Validation
        if (!title || !recipientName || !phone || !address || !city) {
            return NextResponse.json({ error: 'Eksik alanlar var.' }, { status: 400 });
        }

        // If this is default, unset others
        if (isDefault) {
            await prisma.userAddress.updateMany({
                where: { userId },
                data: { isDefault: false }
            });
        }

        const newAddress = await prisma.userAddress.create({
            data: {
                userId,
                title,
                recipientName,
                phone,
                address,
                city,
                district,
                zipCode,
                isDefault: isDefault || false
            }
        });

        return NextResponse.json({ address: newAddress }, { status: 201 });
    } catch (error) {
        console.error('Address create error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
