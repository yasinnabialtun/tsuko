import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-alabaster flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-charcoal mb-2">Tsuko Admin</h1>
                    <p className="text-charcoal/60">Yeni hesap oluşturun.</p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-charcoal hover:bg-black',
                            card: 'shadow-xl border border-black/5',
                            headerTitle: 'text-charcoal',
                            headerSubtitle: 'text-charcoal/60',
                            socialButtonsBlockButton: 'border-black/10',
                            formFieldInput: 'border-black/10 focus:border-clay focus:ring-clay/20',
                            footerActionLink: 'text-clay hover:text-clay/80'
                        }
                    }}
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
                    fallbackRedirectUrl="/admin"
                />
            </div>
        </div>
    );
}
