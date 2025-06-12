import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <SignUp 
        afterSignInUrl="/create-post" 
        afterSignUpUrl="/create-post" 
      />
    </div>
  );
}