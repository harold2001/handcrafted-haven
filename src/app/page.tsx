import CenteredSection from '@/ui/components/centeredSection';
import Image from 'next/image';

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
      <button className='border border-[#2980B9] py-3 w-[150px] text-[#2980B9]'>
        Buy now
      </button>
      <Image src='/artesania.jpg' width={500} height={500} alt='Random image' />
    </CenteredSection>
  );
}
