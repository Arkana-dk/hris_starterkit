# Struktur Folder HRIS - Admin & SuperAdmin

## 📁 Struktur Folder yang Sudah Terorganisir

### 1. **Components** (`resources/js/components/`)

#### Admin Components (`components/admin/`)

```
admin/
├── admin-header.tsx      # Header untuk role Admin
└── admin-sidebar.tsx     # Sidebar dengan menu Admin
```

#### SuperAdmin Components (`components/superadmin/`)

```
superadmin/
├── superadmin-header.tsx      # Header untuk role SuperAdmin
└── superadmin-sidebar.tsx     # Sidebar dengan menu SuperAdmin
```

#### Shared Components (`components/`)

```
components/
├── nav-groups.tsx        # Komponen untuk render nav groups
├── nav-user.tsx          # Komponen user menu di sidebar
├── nav-main.tsx          # Komponen main navigation
├── breadcrumbs.tsx       # Komponen breadcrumbs
└── ui/                   # Komponen UI reusable (shadcn/ui)
```

---

### 2. **Layouts** (`resources/js/layouts/`)

#### Admin Layout (`layouts/admin/`)

```
admin/
└── admin-sidebar-layout.tsx    # Layout sidebar untuk Admin
```

#### SuperAdmin Layout (`layouts/superadmin/`)

```
superadmin/
└── superadmin-sidebar-layout.tsx    # Layout sidebar untuk SuperAdmin
```

#### Shared Layouts (`layouts/`)

```
layouts/
├── app/
│   └── app-layout.tsx           # Layout untuk user biasa
├── auth/
│   └── auth-layout.tsx          # Layout untuk authentication
└── settings/
    └── settings-layout.tsx      # Layout untuk settings pages
```

---

### 3. **Pages** (`resources/js/pages/`)

#### Admin Pages (`pages/admin/`)

```
admin/
└── dashboard.tsx         # Dashboard Admin
```

#### SuperAdmin Pages (`pages/superadmin/`)

```
superadmin/
├── admin/
│   ├── admin-dashboard.tsx    # Dashboard SuperAdmin untuk area admin
│   ├── hr/
│   │   └── hr.tsx             # HR pages untuk SuperAdmin
│   ├── payroll/
│   │   └── payroll.tsx        # Payroll pages untuk SuperAdmin
│   └── notifications.tsx      # Notifications untuk SuperAdmin
└── management/
    └── user-roles.tsx         # Management User Roles (SuperAdmin only)
```

---

## 🗂️ Penjelasan Struktur Role

### **Admin Role**

- **Akses**: Terbatas pada fungsi administratif umum
- **Menu Struktur**:
    - **OVERVIEW**: Dashboard
    - **PAYROLL**: Pay Runs, Pay Groups, Components, Audit
    - **HUMAN RESOURCES**:
        - Master Karyawan (Data Pegawai, Department, Group, Section)
        - Presensi & Pengajuan (Data Presensi, Pengajuan Absensi, Cuti, Lembur, dll)
        - Setting Operasional (Lokasi, Schedules, Shift, Transportasi)
        - Manajemen Cuti (Jenis, Kebijakan, Hak, Ledger, Laporan)

- **Komponen yang Digunakan**:
    - `AdminSidebar` - Sidebar dengan menu admin
    - `AdminHeader` - Header untuk admin
    - `AdminSidebarLayout` - Layout wrapper

### **SuperAdmin Role**

- **Akses**: Full access termasuk management dan admin area
- **Menu Struktur**:
    - **OVERVIEW**: Dashboard
    - **MANAGEMENT**: User Roles (exclusive untuk SuperAdmin)
    - **ADMIN AREA**: Semua menu yang sama dengan Admin role
        - Admin Dashboard
        - Payroll (sama dengan Admin)
        - HR (sama dengan Admin)
        - Notifications

- **Komponen yang Digunakan**:
    - `SuperAdminSidebar` - Sidebar dengan menu superadmin
    - `SuperAdminHeader` - Header untuk superadmin
    - `SuperAdminSidebarLayout` - Layout wrapper

---

## 📝 Cara Penggunaan

### Untuk Admin Pages

```tsx
import AdminSidebarLayout from '@/layouts/admin/admin-sidebar-layout';

export default function AdminDashboard() {
    return (
        <AdminSidebarLayout breadcrumbs={[...]}>
            {/* Content Admin */}
        </AdminSidebarLayout>
    );
}
```

### Untuk SuperAdmin Pages

```tsx
import SuperAdminSidebarLayout from '@/layouts/superadmin/superadmin-sidebar-layout';

export default function SuperAdminDashboard() {
    return (
        <SuperAdminSidebarLayout breadcrumbs={[...]}>
            {/* Content SuperAdmin */}
        </SuperAdminSidebarLayout>
    );
}
```

---

## ✅ Keuntungan Struktur Ini

1. **Terpisah dan Jelas**: Setiap role memiliki folder dan komponen sendiri
2. **Mudah Maintenance**: Perubahan di admin tidak mempengaruhi superadmin, dan sebaliknya
3. **Konsisten**: Struktur yang sama untuk kedua role
4. **Scalable**: Mudah untuk menambah role baru (misal: Manager, Employee)
5. **Reusable**: Komponen shared bisa digunakan di semua role

---

## 🔄 Routing Structure

### Admin Routes (Prefix: `/admin`)

```
/admin/dashboard
/admin/payroll/*
/admin/hr/*
```

### SuperAdmin Routes (Prefix: `/superadmin`)

```
/superadmin/admin/dashboard
/superadmin/admin/payroll/*
/superadmin/admin/hr/*
/superadmin/management/user-roles
```

---

## 📌 Catatan Penting

- **Admin** dan **SuperAdmin** memiliki komponen yang terpisah sepenuhnya
- Setiap role memiliki sidebar, header, dan layout sendiri
- Navigation items didefinisikan di dalam masing-masing sidebar component
- Breadcrumbs dapat dikustomisasi per page
- Semua komponen menggunakan TypeScript untuk type safety
