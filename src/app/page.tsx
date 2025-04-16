import CenteredSection from '@/ui/components/CenteredSection';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <CenteredSection>
      <h1 className='text-3xl'>Handcrafted-Haven</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dolorem
        error dolores voluptatum est dolorum ab, quibusdam omnis obcaecati
        consequuntur voluptatem quaerat iure facere aliquam? Vel quidem dolorum
        incidunt perspiciatis?
      </p>
      <Link
        href='/shop'
        className='border border-[#2980B9] py-3 w-[150px] text-[#2980B9] hover:bg-primary hover:text-text cursor-pointer text-center'
      >
        Buy now
      </Link>
      <Image src='/artesania.jpg' width={500} height={500} alt='Random image' />
    </CenteredSection>
  );
}
