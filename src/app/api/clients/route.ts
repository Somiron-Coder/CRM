import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Client from '@/models/Client';

export async function GET() {
  try {
    await connectDB();
    const clients = await Client.find();
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const client = new Client(data);
    await client.save();

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
