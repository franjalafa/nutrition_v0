import { Link } from "@inertiajs/react";

export default function Pagination({links, current}) {
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-indigo-700 dark:text-indigo-200 text-xs " +
                        (link.active ? "bg-indigo-900 text-white " : " ") +
                        (!link.url ? "!text-gray-400 cursor-not-allowed " : "hover:bg-indigo-900 hover:text-white ")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}>
                </Link>
            ))}
        </nav>
    )
}
