import { Link } from '@inertiajs/react';

export default function TaresasPagination({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            {links.map((link, index) => {
                const isActive = link.active;
                const label = link.label
                    .replace('&laquo; Previous', '← Anterior')
                    .replace('Next &raquo;', 'Siguiente →');

                if (link.url === null) {
                    return (
                        <span
                            key={index}
                            className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveState
                        className={`px-4 py-2 text-sm rounded-md ${
                            isActive
                                ? 'bg-indigo-600 text-white font-medium'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}