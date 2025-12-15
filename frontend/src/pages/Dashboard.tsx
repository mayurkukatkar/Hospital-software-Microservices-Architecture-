import { ArrowUpRight, ArrowDownRight, Users, Calendar, Activity, DollarSign } from 'lucide-react';

const stats = [
    { name: 'Total Patients', stat: '1,250', change: '+12%', changeType: 'increase', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Appointments Today', stat: '45', change: '+4%', changeType: 'increase', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Active Procedures', stat: '12', change: '-2%', changeType: 'decrease', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Revenue (Today)', stat: '$12.5k', change: '+23%', changeType: 'increase', icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Dashboard
            </h1>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className={classNames(item.bg, "absolute rounded-md p-3")}>
                                <item.icon className={classNames(item.color, "h-6 w-6")} aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <p
                                className={classNames(
                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                    'ml-2 flex items-baseline text-sm font-semibold'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                                ) : (
                                    <ArrowDownRight className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                                )}
                                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </dl>

            {/* Placeholder for Charts */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Hospital Output</h3>
                    <div className="mt-2 h-64 bg-gray-50 flex items-center justify-center border border-dashed border-gray-300 rounded">
                        <span className="text-gray-400">Chart Placeholder</span>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Department Occupancy</h3>
                    <div className="mt-2 h-64 bg-gray-50 flex items-center justify-center border border-dashed border-gray-300 rounded">
                        <span className="text-gray-400">Pie Chart Placeholder</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
