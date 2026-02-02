import { Link } from '@inertiajs/react';
import { LayoutGrid, Users, Briefcase } from 'lucide-react';
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
import AppLogo from '@/components/app-logo';

const adminNavGroups: NavGroup[] = [
    {
        title: 'OVERVIEW',
        items: [
            {
                title: 'Dashboard',
                href: '/admin/dashboard',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'PAYROLL',
        items: [
            {
                title: 'Payroll',
                href: '/admin/payroll',
                icon: Briefcase,
                items: [
                    {
                        title: 'Pay Runs (Wizard)',
                        href: '/admin/payroll/pay-runs',
                    },
                    {
                        title: 'Pay Groups',
                        href: '/admin/payroll/pay-groups',
                    },
                    {
                        title: 'Group Components',
                        href: '/admin/payroll/group-components',
                    },
                    {
                        title: 'Pay Components',
                        href: '/admin/payroll/pay-components',
                    },
                    {
                        title: 'Component Rates',
                        href: '/admin/payroll/component-rates',
                    },
                    {
                        title: 'Audit',
                        href: '/admin/payroll/audit',
                    },
                ],
            },
        ],
    },
    {
        title: 'HUMAN RESOURCES',
        items: [
            {
                title: 'HR',
                href: '/admin/hr',
                icon: Users,
                items: [
                    // MASTER KARYAWAN
                    {
                        title: 'MASTER KARYAWAN',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Data Pegawai',
                        href: '/admin/hr/data-pegawai',
                    },
                    {
                        title: 'Department',
                        href: '/admin/hr/department',
                    },
                    {
                        title: 'Group',
                        href: '/admin/hr/group',
                    },
                    {
                        title: 'Section',
                        href: '/admin/hr/section',
                    },
                    // PRESENSI & PENGAJUAN
                    {
                        title: 'PRESENSI & PENGAJUAN',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Data Presensi',
                        href: '/admin/hr/data-presensi',
                    },
                    {
                        title: 'Pengajuan Absensi',
                        href: '/admin/hr/pengajuan-absensi',
                    },
                    {
                        title: 'Cuti (Requests)',
                        href: '/admin/hr/cuti-requests',
                    },
                    {
                        title: 'Lembur',
                        href: '/admin/hr/lembur',
                    },
                    {
                        title: 'Pindah Shift',
                        href: '/admin/hr/pindah-shift',
                    },
                    {
                        title: 'Rekap Presensi',
                        href: '/admin/hr/rekap-presensi',
                    },
                    // SETTING OPERASIONAL
                    {
                        title: 'SETTING OPERASIONAL',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Setting Lokasi Absensi',
                        href: '/admin/hr/setting-lokasi-absensi',
                    },
                    {
                        title: 'Work Schedules',
                        href: '/admin/hr/work-schedules',
                    },
                    {
                        title: 'Shift',
                        href: '/admin/hr/shift',
                    },
                    {
                        title: 'Transportasi (OT)',
                        href: '/admin/hr/transportasi',
                    },
                    // MANAJEMEN CUTI
                    {
                        title: 'MANAJEMEN CUTI',
                        href: '#',
                        isLabel: true,
                    },
                    {
                        title: 'Jenis Cuti',
                        href: '/admin/hr/jenis-cuti',
                    },
                    {
                        title: 'Kebijakan Cuti',
                        href: '/admin/hr/kebijakan-cuti',
                    },
                    {
                        title: 'Hak Cuti (Entitlements)',
                        href: '/admin/hr/hak-cuti',
                    },
                    {
                        title: 'Generate Entitlements',
                        href: '/admin/hr/generate-entitlements',
                    },
                    {
                        title: 'Ledger Cuti',
                        href: '/admin/hr/ledger-cuti',
                    },
                    {
                        title: 'Laporan Cuti',
                        href: '/admin/hr/laporan-cuti',
                    },
                ],
            },
        ],
    },
];

export function AdminSidebar() {
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
                                        HRIS Admin
                                    </span>
                                    <span className="truncate text-xs">
                                        Admin Panel
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavGroups groups={adminNavGroups} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
