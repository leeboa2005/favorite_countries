import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1020px;
    margin: 20px 0;
    background-color: var(--white-color);
    border: var(--default-border);
    border-radius: 24px;
    padding: 8px 16px;
    box-shadow: 0 1px 6px rgba(152, 152, 152, 0.28);

    @media only screen and (max-width: 1068px) {
        max-width: 700px;
        padding: 4px 12px;
    }

    @media only screen and (max-width: 734px) {
        max-width: 90%;
    }
`;

const SearchIcon = styled(FaSearch)`
    margin-right: 8px;
    color: var(--gray-color);
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 8px;
    font-size: var(--font-size-18);
`;

interface SearchBarProps {
    value: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearchChange }) => {
    return (
        <SearchContainer>
            <SearchIcon />
            <SearchInput type="text" placeholder="Search for a country..." value={value} onChange={onSearchChange} />
        </SearchContainer>
    );
};

export default SearchBar;
