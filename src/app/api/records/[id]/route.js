import { NextResponse } from 'next/server';
import { callMongoFunction } from '@/lib/mongo-app';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const record = await request.json();

    // Assumes you have a MongoDB App Function named 'updateRecord'
    // that takes the id and the new record data as arguments.
    const result = await callMongoFunction('updateRecord', { id, record });

    return NextResponse.json({ message: "Record updated successfully", ...result }, { status: 200 });
  } catch (e) {
    console.error("API Error updating record:", e);
    return NextResponse.json({ message: "Failed to update record", error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Assumes you have a MongoDB App Function named 'deleteRecord'
    // that takes the id as an argument.
    const result = await callMongoFunction('deleteRecord', { id });

    return NextResponse.json({ message: "Record deleted successfully", ...result }, { status: 200 });
  } catch (e) {
    console.error("API Error deleting record:", e);
    return NextResponse.json({ message: "Failed to delete record", error: e.message }, { status: 500 });
  }
}