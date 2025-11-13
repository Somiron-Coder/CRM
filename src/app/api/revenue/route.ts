import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Revenue from '@/models/Revenue';

export async function GET() {
  try {
    await connectDB();
    const revenues = await Revenue.find().populate('clientId');
    return NextResponse.json(revenues);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch revenues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const revenue = new Revenue(data);
    await revenue.save();

    return NextResponse.json(revenue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create revenue record' }, { status: 500 });
  }
}
