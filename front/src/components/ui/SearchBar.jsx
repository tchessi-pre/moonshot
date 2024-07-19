// components/ui/SearchBar.js
import { useState } from 'react';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search logic here, e.g., redirect to search results page
        console.log('Search query:', searchQuery);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="p-2 text-black rounded-md"
            />
            <button type="submit" className="ml-2 p-2 bg-black-500 text-white rounded-md">Search</button>
        </form>
    );
};

export default SearchBar;