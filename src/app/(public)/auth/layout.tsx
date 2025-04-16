import { auth } from '@/config/auth';
import { redirect } from 'next/navigation';

export default async function page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user) {
    return redirect('/');
  }
  return <>{children}</>;
}
