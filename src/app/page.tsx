'use client';

import dynamic from 'next/dynamic';
import MuiLayout from '@/components/Layout/MuiLayout';

const UnityNotesContent = dynamic(
  () => import('@/components/UnityNotesContent'),
  { ssr: false }
);

export default function Page() {
  return (
    <MuiLayout>
      <UnityNotesContent />
    </MuiLayout>
  );
}