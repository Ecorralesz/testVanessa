import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query.toLocaleLowerCase());
    };

    return (
        <InputGroup className="mb-3 mt-3 vw-100 ps-5 pe-5">
            <Form.Control
                placeholder="Search for an artist"
                aria-label="Search input"
                aria-describedby="search-button"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-secondary" id="search-button" onClick={handleSearch}>
                Search
            </Button>
        </InputGroup>
    );
};

export default SearchBar;
