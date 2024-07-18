import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className='flex space-x-2'>
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded ${
                                page === currentPage
                                    ? 'bg-gray-600 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
