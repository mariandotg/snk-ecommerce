import Link from 'next/link';
import { shoes } from '../../shoes';

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ul className='max-w-2xl grid grid-cols-3 gap-4'>
        {shoes.map((shoe) => (
          <li key={shoe.id}>
            <Link
              href={`/${shoe.id}`}
              className='w-full h-full flex flex-col gap-3'
            >
              <img src='https://nikearprod.vtexassets.com/arquivos/ids/762016-800-800?v=638316084472370000&width=800&height=800&aspect=true' />
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
