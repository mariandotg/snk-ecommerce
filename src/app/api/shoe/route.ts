import addShoe from '@/lib/addShoe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();

  await addShoe(res);

  return NextResponse.json({ res });
}
