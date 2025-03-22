import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center h-[calc(100vh_-_80px)] max-w-[800px] m-auto">
      <h1 className="text-5xl">Handcrafted-Haven</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dolorem
        error dolores voluptatum est dolorum ab, quibusdam omnis obcaecati
        consequuntur voluptatem quaerat iure facere aliquam? Vel quidem dolorum
        incidunt perspiciatis?
      </p>
      <button className='border border-[#2980B9] py-3 w-[150px] text-[#2980B9]'>Buy now</button>
      <Image src='/random.jpg' width={800} height={800} alt='Random image' />
    </section>
  );
}
