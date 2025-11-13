import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Revenue from '@/models/Revenue';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const revenue = await Revenue.findById(id).populate('clientId');

    if (!revenue) {
      return NextResponse.json({ error: 'Revenue record not found' }, { status: 404 });
    }

    return NextResponse.json(revenue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch revenue record' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const data = await request.json();

    const revenue = await Revenue.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!revenue) {
      return NextResponse.json({ error: 'Revenue record not found' }, { status: 404 });
    }

    return NextResponse.json(revenue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update revenue record' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const revenue = await Revenue.findByIdAndDelete(id);

    if (!revenue) {
      return NextResponse.json({ error: 'Revenue record not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Revenue record deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete revenue record' }, { status: 500 });
  }
}
