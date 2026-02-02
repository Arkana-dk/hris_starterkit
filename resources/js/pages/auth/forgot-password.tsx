// Components
import { Form, Head } from '@inertiajs/react';
import { Building2, Mail, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot Password - HRIS System" />

            <div className="flex min-h-screen">
                {/* Left Side - Branding */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 lg:flex lg:w-1/2">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '40px 40px',
                            }}
                        />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-white">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <Building2 className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    HRIS System
                                </h1>
                                <p className="text-sm text-blue-100">
                                    Human Resources Information System
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl leading-tight font-bold text-white">
                            Secure Password
                            <br />
                            Recovery
                        </h2>
                        <p className="max-w-md text-lg text-blue-100">
                            We'll send you a secure link to reset your password.
                            Your account security is our top priority.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm text-blue-100">
                        © 2026 HRIS System. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Forgot Password Form */}
                <div className="flex flex-1 items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="mb-8 text-center lg:hidden">
                            <div className="inline-flex items-center gap-2 text-gray-900 dark:text-white">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold">
                                    HRIS System
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-8">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    Reset Password
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Enter your email address and we'll send you
                                    a link to reset your password
                                </p>
                            </div>

                            {status && (
                                <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                                    <AlertDescription className="text-green-800 dark:text-green-200">
                                        {status}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Form {...email.form()} className="space-y-6">
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    autoFocus
                                                    placeholder="your.email@company.com"
                                                    className="h-12 border-gray-300 bg-gray-50 pl-11 dark:border-gray-600 dark:bg-gray-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="h-12 w-full bg-blue-600 text-base font-medium text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing && <Spinner />}
                                            Send Reset Link
                                        </Button>

                                        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                                            <TextLink
                                                href={login()}
                                                className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                                Back to Sign In
                                            </TextLink>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            Need help? Contact your HR administrator
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
