import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Employee from '@/models/Employee';

export async function GET() {
  try {
    await connectDB();
    const employees = await Employee.find();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const employee = new Employee(data);
    await employee.save();

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}
