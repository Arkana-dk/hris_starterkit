<?php

namespace App\Http\Controllers\SuperAdmin\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('superadmin/admin/admin-dashboard', [
            // Add your data here
            // 'totalUsers' => User::count(),
            // 'activeSessions' => Session::where('last_activity', '>', now()->subMinutes(5))->count(),
            // 'systemStatus' => $this->getSystemStatus(),
            // 'pendingTasks' => Task::where('status', 'pending')->count(),
        ]);
    }
}
