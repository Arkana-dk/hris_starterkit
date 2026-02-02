import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SuperAdminSidebar } from '@/components/superadmin/superadmin-sidebar';
import { SuperAdminHeader } from '@/components/superadmin/superadmin-header';
import type { BreadcrumbItem } from '@/types';

type Props = {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export default function SuperAdminSidebarLayout({
    children,
    breadcrumbs = [],
}: Props) {
    return (
        <SidebarProvider>
            <SuperAdminSidebar />
            <SidebarInset>
                <SuperAdminHeader breadcrumbs={breadcrumbs} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
