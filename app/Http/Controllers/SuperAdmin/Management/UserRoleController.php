<?php

namespace App\Http\Controllers\SuperAdmin\Management;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class UserRoleController extends Controller
{
    /**
     * Display the user roles management page.
     */
    public function index(): Response
    {
        return Inertia::render('superadmin/management/user-roles', [
            // Add your data here
            // 'roles' => Role::with('users')->get(),
            // 'permissions' => Permission::all(),
        ]);
    }
}
