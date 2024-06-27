import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchCountries } from '../api/countries';
import { getCountryImage } from '../api/unsplash';
import CountryList from '../components/CountryList';
import SearchBar from '../components/SearchBar';
import ScrollTopButton from '../components/ScrollTopButton';
import { Country } from '../types/Country';
import Lottie from 'react-lottie-player';
import airplaneAnimation from '../assets/loading-airplane.json';

const PageContainer = styled.div`
    width: var(--default-width);
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: var(--font-title-size);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--margin-medium);
`;

const NoResultsMessage = styled.p`
    margin-bottom: var(--margin-medium);
    font-size: var(--font-size-18);
    color: var(--text-gray-color);
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
`;

const Home: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]); // 국가 목록 상태
    const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]); // 좋아요한 국가 목록 상태
    const [searchCountry, setSearchCountry] = useState(''); // 검색어 상태
    const [flags, setFlags] = useState<{ [key: string]: string | null }>({}); // 국가 이미지 상태
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태

    // 즐겨찾기 토글 함수
    const handleToggleFavorite = (country: Country) => {
        // 이미 즐겨찾기에 있다면 제거
        if (favoriteCountries.includes(country)) {
            setFavoriteCountries(favoriteCountries.filter((fav) => fav.cca3 !== country.cca3));
        } else {
            // 없다면 추가
            setFavoriteCountries([...favoriteCountries, country]);
        }
    };

    // 검색어 함수
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCountry(event.target.value);
    };

    // 검색어에 맞는 국가 필터링
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    );

    // 즐겨찾기에 없는 국가 필터링
    const nonFavoriteCountries = filteredCountries.filter((country) => !favoriteCountries.includes(country));

    // 컴포넌트가 처음 렌더링될 때 국가 데이터를 가져옴
    useEffect(() => {
        const getCountries = async () => {
            try {
                // 각 국가 데이터를 가져옴
                const data = await fetchCountries();
                setCountries(data);

                // 각 국가에 대해 이미지를 가져옴
                const imagePromises = data.map(async (country: Country) => {
                    const url = await getCountryImage(country.name.common);
                    return { [country.name.common]: url };
                });

                // 모든 이미지를 동시에 가져와서 배열을 객체로 변환한 후 상태에 저장한다.
                const imageResults = await Promise.all(imagePromises);
                const imageMap = imageResults.reduce((acc, img) => ({ ...acc, ...img }), {});
                setFlags(imageMap);
                setIsLoading(false); // 데이터 로딩 완료
            } catch (error) {
                const typedError = error as Error;
                console.error('국가 또는 이미지를 불러오는 중 오류가 발생했습니다:', typedError);
                setIsLoading(false); // 오류 발생 시에도 로딩 상태를 해제
            }
        };
        getCountries();
    }, []);

    return (
        <PageContainer>
            <SearchBar value={searchCountry} onSearchChange={handleSearchChange} />
            <Title>Favorite Countries🛫</Title>
            {favoriteCountries.length > 0 ? (
                <CountryList
                    countries={favoriteCountries}
                    onToggleFavorite={handleToggleFavorite}
                    images={flags}
                    favoriteCountries={favoriteCountries}
                />
            ) : (
                <NoResultsMessage>Choose your favorite country.</NoResultsMessage>
            )}
            <Title>Countries🌍</Title>
            {isLoading ? (
                <LoadingContainer>
                    <Lottie animationData={airplaneAnimation} play loop style={{ height: '200px', width: '200px' }} />
                </LoadingContainer>
            ) : nonFavoriteCountries.length > 0 ? (
                <CountryList
                    countries={nonFavoriteCountries}
                    onToggleFavorite={handleToggleFavorite}
                    images={flags}
                    favoriteCountries={favoriteCountries}
                />
            ) : (
                <NoResultsMessage>No search results found.🤔</NoResultsMessage>
            )}
            <ScrollTopButton />
        </PageContainer>
    );
};

export default Home;
