import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import SuperAdminLayout from '@/layouts/superadmin/superadmin-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'HR',
        href: '/superadmin/admin/hr',
    },
    {
        title: 'Generate Entitlements',
        href: '/superadmin/admin/hr/generate-entitlements',
    },
];

export default function GenerateEntitlements() {
    return (
        <SuperAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Generate Entitlements" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Generate Entitlements
                        </h1>
                        <p className="text-muted-foreground">
                            Generate hak cuti otomatis untuk karyawan
                        </p>
                    </div>
                </div>

                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-sm font-medium text-muted-foreground">
                            Form generate entitlements akan ditampilkan di sini
                        </p>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
