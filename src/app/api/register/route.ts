import addUser from '@/lib/addUser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();

  await addUser(res);

  return NextResponse.json({ res });
}
