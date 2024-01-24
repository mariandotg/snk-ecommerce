import Link from 'next/link';
import getAllShoes from '@/lib/getAllShoes';
import LoginInfo from '@/components/LoginInfo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import ShoeCard from '@/components/ShoeCard';

export default async function HomePage() {
  const shoes = await getAllShoes();
  const session = await getServerSession(authOptions);

  const renderShoes = () =>
    shoes.map((shoe) => (
      <li key={shoe.id}>
        <ShoeCard shoe={shoe} />
      </li>
    ));

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <LoginInfo />
      <p className='bg-red-800'>{session?.user?.email}</p>
      <ul className='max-w-2xl grid grid-cols-3 gap-4'>{renderShoes()}</ul>
    </main>
  );
}
