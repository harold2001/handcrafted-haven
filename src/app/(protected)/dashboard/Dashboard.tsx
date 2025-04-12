'use client';

import { Category } from '@/utils/types';

interface Props {
  categories: Category[];
}

export default function Dashboard({ categories }: Props) {
  console.log(categories);
  return <div>Dashboard</div>;
}
