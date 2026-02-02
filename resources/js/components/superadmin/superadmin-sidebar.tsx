import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Shield,
    Users,
    Briefcase,
    UserCog,
    Bell,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavGroups } from '@/components/nav-groups';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavGroup } from '@/types';

const superAdminNavGroups: NavGroup[] = [
    {
        title: 'OVERVIEW',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'MANAGEMENT',
        items: [
            {
                title: 'User Roles',
                href: '/superadmin/management/user-roles',
                icon: Users,
            },
        ],
    },
    {
        title: 'ADMIN AREA',
        items: [
            {
                title: 'Admin Dashboard',
                href: '/superadmin/admin/dashboard',
                icon: Shield,
            },
            {
                title: 'Payroll',
                href: '/superadmin/admin/payroll',
                icon: Briefcase,
                items: [
                    {
                        title: 'Pay Runs (Wizard)',
                        href: '/superadmin/admin/payroll/pay-runs',
                    },
                    {
                        title: 'Pay Groups',
                        href: '/superadmin/admin/payroll/pay-groups',
                    },
                    {
                        title: 'Group Components',
                        href: '/superadmin/admin/payroll/group-components',
                    },
                    {
                        title: 'Pay Components',
                        href: '/superadmin/admin/payroll/pay-components',
                    },
                    {
                        title: 'Component Rates',
                        href: '/superadmin/admin/payroll/component-rates',
                    },
                    {
                        title: 'Audit',
                        href: '/superadmin/admin/payroll/audit',
                    },
                ],
            },
            {
                title: 'HR',
                href: '/superadmin/admin/hr',
                icon: UserCog,
                items: [
                    // MASTER KARYAWAN
                    {
                        title: 'MASTER KARYAWAN',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Data Pegawai',
                        href: '/superadmin/admin/hr/data-pegawai',
                    },
                    {
                        title: 'Department',
                        href: '/superadmin/admin/hr/department',
                    },
                    {
                        title: 'Group',
                        href: '/superadmin/admin/hr/group',
                    },
                    {
                        title: 'Section',
                        href: '/superadmin/admin/hr/section',
                    },
                    // PRESENSI & PENGAJUAN
                    {
                        title: 'PRESENSI & PENGAJUAN',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Data Presensi',
                        href: '/superadmin/admin/hr/data-presensi',
                    },
                    {
                        title: 'Pengajuan Absensi',
                        href: '/superadmin/admin/hr/pengajuan-absensi',
                    },
                    {
                        title: 'Cuti (Requests)',
                        href: '/superadmin/admin/hr/cuti-requests',
                    },
                    {
                        title: 'Lembur',
                        href: '/superadmin/admin/hr/lembur',
                    },
                    {
                        title: 'Pindah Shift',
                        href: '/superadmin/admin/hr/pindah-shift',
                    },
                    {
                        title: 'Rekap Presensi',
                        href: '/superadmin/admin/hr/rekap-presensi',
                    },
                    // SETTING OPERASIONAL
                    {
                        title: 'SETTING OPERASIONAL',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Setting Lokasi Absensi',
                        href: '/superadmin/admin/hr/setting-lokasi-absensi',
                    },
                    {
                        title: 'Work Schedules',
                        href: '/superadmin/admin/hr/work-schedules',
                    },
                    {
                        title: 'Shift',
                        href: '/superadmin/admin/hr/shift',
                    },
                    {
                        title: 'Transportasi (OT)',
                        href: '/superadmin/admin/hr/transportasi',
                    },
                    // MANAJEMEN CUTI
                    {
                        title: 'MANAJEMEN CUTI',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Jenis Cuti',
                        href: '/superadmin/admin/hr/jenis-cuti',
                    },
                    {
                        title: 'Kebijakan Cuti',
                        href: '/superadmin/admin/hr/kebijakan-cuti',
                    },
                    {
                        title: 'Hak Cuti (Entitlements)',
                        href: '/superadmin/admin/hr/hak-cuti',
                    },
                    {
                        title: 'Generate Entitlements',
                        href: '/superadmin/admin/hr/generate-entitlements',
                    },
                    {
                        title: 'Ledger Cuti',
                        href: '/superadmin/admin/hr/ledger-cuti',
                    },
                    {
                        title: 'Laporan Cuti',
                        href: '/superadmin/admin/hr/laporan-cuti',
                    },
                ],
            },
            {
                title: 'Notifications',
                href: '/superadmin/admin/notifications',
                icon: Bell,
            },
        ],
    },
];

export function SuperAdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <AppLogo />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        HRIS SuperAdmin
                                    </span>
                                    <span className="truncate text-xs">
                                        Super Admin Panel
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavGroups groups={superAdminNavGroups} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
