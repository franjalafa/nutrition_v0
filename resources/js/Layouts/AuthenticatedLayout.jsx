import { useState } from 'react';
import { MoonStars, SunHorizon, CaretDown, DotsThreeOutlineVertical, ArrowCircleLeft, ArrowCircleRight, UserList } from "@phosphor-icons/react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [expanded, setExpanded] = useState(false);

    let expandedMode = localStorage.getItem('expandedMode');
    const enableExpandedMode = () => {
        localStorage.setItem('expandedMode', 'active');
    }
    const disableExpandedMode = () => {
        localStorage.setItem('expandedMode', false);
    }

    if (expandedMode === true) enableExpandedMode();
    const toggleExpanded = () => {
        expandedMode = localStorage.getItem('expandedMode');
        (expandedMode !== 'active') ? enableExpandedMode() : disableExpandedMode();
        setExpanded(!expanded);
    }


    let darkmode = localStorage.getItem('darkmode');
    const enableDarkmode = () => {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkmode', 'active');
    }
    const disableDarkmode = () => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkmode', null);
    }

    if (darkmode === 'active') enableDarkmode();
    const toggleDarkMode = () => {
        darkmode = localStorage.getItem('darkmode');
        (darkmode !== 'active') ? enableDarkmode() : disableDarkmode();
        setIsDark(!isDark);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="fixed top-0 z-50 w-full bg-violet-200 border-b border-gray-200 dark:bg-violet-800 dark:border-violet-600">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" /> */}
                                    <img src="https://img.logoipsum.com/332.svg" alt="" className={`overflow-hidden transition-all`} />
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-200 bg-violet-200 dark:bg-violet-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <div className='mx-1'>
                                                    <CaretDown size={12} color="#ab4276" fill="currentcolor" weight="bold" />
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <div className="ms-3 relative">
                                <button onClick={toggleDarkMode}>
                                    {isDark
                                        ? <SunHorizon color="#FACA15" weight="fill" size={28} />
                                        : <MoonStars color="#374151" weight="fill" size={28} />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside className='fixed h-screen top-0 pt-[20px] py-3'>
                <div className='flex justify-end items-end relative left-5 top-10 z-10 overflow-hidden transition-all'>
                    {/* <img src="https://img.logoipsum.com/332.svg" alt="" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-14"}`} /> */}
                    <button className='p-1.5 rounded-lg' onClick={toggleExpanded}>
                        {expanded ? <ArrowCircleLeft size={28} weight="fill" color="#818cf8" /> : <ArrowCircleRight size={28} weight="fill" color="#818cf8" />}
                    </button>
                </div>
                <nav className={`h-screen relative flex flex-col pt-14 bg-violet-200 dark:bg-violet-800 dark:border-r dark:border-r-violet-500 overflow-hidden transition-all ${expanded ? "w-52" : "w-14"}`}>
                    <div className={`flex items-center p-4 text-slate-800 rounded-lg hover:bg-gray-100 hover:text-indigo-700 dark:text-white dark:hover:bg-gray-700 dark:hover:hover:text-indigo-400 group
                        ${expanded
                            ? ""
                            : "justify-center"
                        }
                    `}>
                        <Link href={route('dashboard')}>
                            <DotsThreeOutlineVertical size={22} />
                        </Link>
                        <Link href={route('dashboard')}>
                            {expanded &&
                                <span className="flex items-center ms-3">Dashboard</span>
                            }
                        </Link>
                    </div>
                    <div className={`flex items-center p-4 text-slate-800 rounded-lg hover:bg-gray-100 hover:text-indigo-700 dark:text-white dark:hover:bg-gray-700 dark:hover:hover:text-indigo-400 group
                        ${expanded
                            ? ""
                            : "justify-center"
                        }
                    `}>
                        <Link href={route('patient.index')}>
                            <UserList size={22}/>
                        </Link>
                        <Link href={route('patient.index')}>
                            {expanded &&
                                <span className="ms-3">Pacientes</span>
                            }
                        </Link>
                    </div>
                </nav>
            </aside>

            <div className="py-20 sm:ml-64 overflow-hidden transition duration-150">
                {header && (
                    <header>
                        {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div> */}
                        <div className={`bg-white dark:bg-gray-800 shadow p-3 rounded-md mr-10 z-10 ${expanded
                                ? " "
                                : " absolute left-24 w-[88.8%] pr-10"
                            }
                        `}>
                            {header}
                        </div>
                    </header>
                )}

                <main className={`${expanded
                        ? " pt-2 pr-10"
                        : " absolute left-24 w-11/12 pr-10 pt-16"
                    }
                `}>
                    {children}
                </main>
            </div>
        </div>
    );
}
