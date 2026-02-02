import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import type { AppLayoutProps } from '@/types';

export default function AdminSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <AdminHeader breadcrumbs={breadcrumbs} />
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
