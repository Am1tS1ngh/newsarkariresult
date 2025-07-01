import { NextResponse } from 'next/server';
import { callMongoFunction } from '@/lib/mongo-app';

export async function POST(request) {
  try {
    const { action, payload } = await request.json();

    switch (action) {
      case 'getAllRecords':
        const { searchTerm } = payload || {};

        const records = await callMongoFunction('getAllRecords', { searchTerm });
        return NextResponse.json(records,{ status: 200 });

      case 'getRecordDetails':
        const { title_slug } = payload || {};

        const details = await callMongoFunction('getRecordDetails', { title_slug });
        return NextResponse.json(details,{ status: 200 });
      
      case 'addRecord':
        const { record: newRecord } = payload;
        const addResult = await callMongoFunction('addRecord', { record: newRecord });
        return NextResponse.json({ message: "Record created successfully", ...addResult }, { status: 201 });

      case 'updateRecord':
        const { id: updateId, record: updatedRecord } = payload;

        const updateResult = await callMongoFunction('updateRecord', { id: updateId, record: updatedRecord });
        return NextResponse.json({ message: "Record updated successfully", ...updateResult }, { status: 200 });

      case 'deleteRecord':
        const { id: deleteId } = payload;
        const deleteResult = await callMongoFunction('deleteRecord', { id: deleteId });
        return NextResponse.json({ message: "Record deleted successfully", ...deleteResult }, { status: 200 });

      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (e) {
    console.error(`API Error during action:`, e);
    return NextResponse.json({ message: "An API error occurred", error: e.message }, { status: 500 });
  }
}