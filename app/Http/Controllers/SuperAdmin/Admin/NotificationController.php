<?php

namespace App\Http\Controllers\SuperAdmin\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Display the notifications page.
     */
    public function index(): Response
    {
        return Inertia::render('superadmin/admin/notifications', [
            // Add your data here
            // 'unreadCount' => auth()->user()->unreadNotifications()->count(),
            // 'todayCount' => auth()->user()->notifications()->whereDate('created_at', today())->count(),
            // 'notifications' => auth()->user()->notifications()->latest()->paginate(20),
        ]);
    }
}
