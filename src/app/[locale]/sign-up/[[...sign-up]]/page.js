'use client';

import { SignUp } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignUp
          path={`/${locale}/sign-up`}
          routing="path"
          afterSignUpUrl={`/${locale}/create-post`}
          signInUrl={`/${locale}/sign-in`}
        />
      </div>
    </div>
  );
}
