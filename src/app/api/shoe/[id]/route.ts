import { getShoe } from '@/lib/getShoe';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const shoe = await getShoe(params.id);

  return NextResponse.json(shoe);
}
