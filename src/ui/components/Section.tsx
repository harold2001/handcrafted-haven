interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: Props) {
  return (
    <section className={`p-4 max-w-[1200px] m-auto ${className}`}>
      {children}
    </section>
  );
}
