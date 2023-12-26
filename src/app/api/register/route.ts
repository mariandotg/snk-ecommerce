import addUser from '@/lib/addUser';

export async function POST(request: Request) {
  const res = await request.json();

  await addUser(res);

  return Response.json({ res });
}
