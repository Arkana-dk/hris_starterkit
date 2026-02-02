import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem, SharedData } from '@/types';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

export function AdminHeader({ breadcrumbs = [] }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();
    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2"
                                >
                                    <Menu className="size-5" />
                                    <span className="sr-only">
                                        Toggle navigation menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80">
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        <Link href={dashboard()}>
                                            <AppLogo />
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 flex flex-col gap-1">
                                    {mainNavItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={toUrl(item.href)}
                                            className={cn(
                                                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800',
                                                isCurrentUrl(item.href)
                                                    ? activeItemStyles
                                                    : 'text-neutral-700 dark:text-neutral-400',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="size-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <div className="mr-4 flex items-center">
                        <Link href={dashboard()} className="hidden lg:block">
                            <AppLogo />
                        </Link>
                        <Link href={dashboard()} className="lg:hidden">
                            <AppLogoIcon />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            {mainNavItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <Link
                                        href={toUrl(item.href)}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            'flex items-center gap-2',
                                            whenCurrentUrl(
                                                item.href,
                                                activeItemStyles,
                                            ),
                                        )}
                                    >
                                        {item.icon && (
                                            <item.icon className="size-4" />
                                        )}
                                        {item.title}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="ml-auto flex items-center gap-2">
                        {/* Search Button */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hidden md:inline-flex"
                                    >
                                        <Search className="size-4" />
                                        <span className="sr-only">Search</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Search (⌘K)</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {/* Right Navigation Items */}
                        <div className="hidden md:flex md:items-center md:gap-1">
                            {rightNavItems.map((item) => (
                                <TooltipProvider key={item.title}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="size-4" />
                                                    )}
                                                    <span className="sr-only">
                                                        {item.title}
                                                    </span>
                                                </a>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative size-9 rounded-full"
                                >
                                    <Avatar className="size-9">
                                        <AvatarImage
                                            src={auth.user.avatar_url}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="text-xs">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <UserMenuContent />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <div className="border-b border-sidebar-border/40 bg-sidebar/30">
                    <div className="mx-auto px-4 py-3 md:max-w-7xl">
                        <Breadcrumbs items={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
