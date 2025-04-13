interface Props {
  children: React.ReactNode;
}

export default function Section({ children }: Props) {
  return <section className='p-4 max-w-[1200px] m-auto'>{children}</section>;
}
