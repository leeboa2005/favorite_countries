import React from 'react';
import styled from 'styled-components';
import CountryCard from './CountryCard';
import { Country } from '../types/Country';

// props 타입 정의
interface CountryListProps {
    countries: Country[];
    onToggleFavorite: (country: Country) => void;
    images: { [key: string]: string | null };
    favoriteCountries: Country[];
}

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`;

const CountryList: React.FC<CountryListProps> = ({ countries, onToggleFavorite, images, favoriteCountries }) => {
    return (
        <List>
            {countries.map((country) => {
                return (
                    <CountryCard
                        key={country.cca3}
                        country={country}
                        onClickCard={() => onToggleFavorite(country)}
                        isFavorite={favoriteCountries.includes(country)}
                        imageUrl={images[country.name.common] || null}
                    />
                );
            })}
        </List>
    );
};

export default CountryList;
