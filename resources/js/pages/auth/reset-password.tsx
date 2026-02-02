import { Form, Head } from '@inertiajs/react';
import { Building2, Lock, Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Reset Password - HRIS System" />

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
                            Create New
                            <br />
                            Password
                        </h2>
                        <p className="max-w-md text-lg text-blue-100">
                            Choose a strong password to keep your account
                            secure. Make sure it's unique and at least 8
                            characters long.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm text-blue-100">
                        © 2026 HRIS System. All rights reserved.
                    </div>
                </div>

                {/* Right Side - Reset Password Form */}
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
                                    Reset Your Password
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Enter your new password below
                                </p>
                            </div>

                            <Form
                                {...update.form()}
                                transform={(data) => ({
                                    ...data,
                                    token,
                                    email,
                                })}
                                resetOnSuccess={[
                                    'password',
                                    'password_confirmation',
                                ]}
                                className="space-y-6"
                            >
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
                                                    autoComplete="email"
                                                    value={email}
                                                    readOnly
                                                    className="h-12 border-gray-300 bg-gray-100 pl-11 dark:border-gray-600 dark:bg-gray-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password"
                                                className="font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                New Password
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    autoComplete="new-password"
                                                    autoFocus
                                                    placeholder="••••••••"
                                                    className="h-12 border-gray-300 bg-gray-50 pl-11 dark:border-gray-600 dark:bg-gray-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password_confirmation"
                                                className="font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Confirm Password
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    autoComplete="new-password"
                                                    placeholder="••••••••"
                                                    className="h-12 border-gray-300 bg-gray-50 pl-11 dark:border-gray-600 dark:bg-gray-900"
                                                />
                                            </div>
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="h-12 w-full bg-blue-600 text-base font-medium text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                                            disabled={processing}
                                            data-test="reset-password-button"
                                        >
                                            {processing && <Spinner />}
                                            Reset Password
                                        </Button>

                                        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                                Password must be at least 8
                                                characters
                                            </p>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            Your password will be securely encrypted
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
