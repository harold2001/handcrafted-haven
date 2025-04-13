import React from 'react';

interface Props {
  children: React.ReactNode;
  top?: boolean;
  className?: string;
}

export default function CenteredSection({
  children,
  top = false,
  className,
}: Props) {
  const justify = top ? '' : 'justify-center';

  return (
    <section
      className={`flex flex-col gap-8 items-center h-[calc(100vh_-_70px)] max-w-[800px] max-h-[1200px] m-auto p-4 ${justify} ${className}`}
    >
      {children}
    </section>
  );
}
