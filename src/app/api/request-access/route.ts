import { NextRequest, NextResponse } from 'next/server';

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const response = await fetch(`${backendURL}/request-access`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to communicate with backend" }, { status: 500 });
    }
}
