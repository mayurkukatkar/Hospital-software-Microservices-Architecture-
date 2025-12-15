import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    CreditCard,
    FlaskConical,
    Pill,
    Box,
    Settings,
    LogOut,
    ShieldPlus
} from 'lucide-react';
import { cn } from '../utils';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'EMR', href: '/emr', icon: FileText },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Laboratory', href: '/lab', icon: FlaskConical },
    { name: 'Pharmacy', href: '/pharmacy', icon: Pill },
    { name: 'Inventory', href: '/inventory', icon: Box },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
            <div className="flex h-16 items-center px-6 border-b border-gray-200">
                <ShieldPlus className="h-8 w-8 text-primary-600" />
                <span className="ml-3 text-xl font-bold text-gray-900">Mayur HMS</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://ui-avatars.com/api/?name=Admin+User&background=0D9488&color=fff"
                        alt=""
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">View Profile</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between px-2">
                    <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
