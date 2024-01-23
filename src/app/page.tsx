import Link from 'next/link';
import getAllShoes from '@/lib/getAllShoes';
import LoginInfo from '@/components/LoginInfo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function HomePage() {
  const test = await getAllShoes();
  console.log('ENV FN', test);
  const sesion = await getServerSession(authOptions);
  console.log('sesion', { sesion });
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <LoginInfo />
      <p className='bg-red-800'>{sesion?.user?.email}</p>
      {JSON.stringify(test)}
      <ul className='max-w-2xl grid grid-cols-3 gap-4'>
        {test.map((shoe) => (
          <li key={shoe.id}>
            <Link
              href={`/${shoe.id}`}
              className='w-full h-full flex flex-col gap-3'
            >
              <img src={shoe.images[0]} />
              <div className='flex flex-col gap-2'>
                <h6 className='font-medium text-base'>{shoe.name}</h6>
                <span className='font-bold text-base'>${shoe.price}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
