import React, { useState } from 'react';
import styled from 'styled-components';
import { Country } from '../types/Country';
import { FaHeart, FaTimes } from 'react-icons/fa';

interface CountryCardProps {
    country: Country;
    onClickCard: (event: React.MouseEvent<HTMLDivElement>) => void;
    isFavorite: boolean;
    imageUrl: string | null;
}

const Card = styled.div`
    padding: 16px;
    border-radius: 8px;
    border: var(--default-border);
    background-color: var(--white-color);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

const FlagImage = styled.img`
    width: auto;
    height: 70px;
    margin-bottom: 8px;

    @media only screen and (max-width: 734px) {
        margin-top: 10px;
        margin-bottom: 15px;
    }
`;
//  Overlay 이미지 $isVisible props에 따라 투명도 조절
const HoverImage = styled.img<{ $isVisible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 2;
`;

// $isVisible props에 따라 투명도와 z-index 조절
const Content = styled.div<{ $isVisible: boolean }>`
    z-index: ${(props) => (props.$isVisible ? -1 : 1)};
    opacity: ${(props) => (props.$isVisible ? 0 : 1)};
    transition: opacity 0.3s ease, z-index 0.3s ease;

    h2 {
        font-weight: 500;
    }
`;

// $isVisible props에 따라 배경색과 투명도 조절
const Overlay = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    background: transparent;
    border: none;
    color: var(--white-color);
    font-size: var(--font-subtitle-size);
    cursor: pointer;
    z-index: 4;
`;

// CountryCardProps 타입의 props를 받음
const CountryCard: React.FC<CountryCardProps> = ({ country, onClickCard, isFavorite, imageUrl }) => {
    // isHovered 상태 정의 기본값은 false
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        // 호버 시 isHovered 상태를 true로 설정하고, 카드 클릭 시 onClickCard 함수 호출
        <Card onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClickCard}>
            {imageUrl && <HoverImage src={imageUrl} alt={country.name.common} $isVisible={isHovered} />}
            <Overlay $isVisible={isHovered}>
                <Button>{isFavorite ? <FaTimes /> : <FaHeart />}</Button>
            </Overlay>
            <Content $isVisible={isHovered}>
                <FlagImage src={country.flags.png} alt={`${country.name.common} flag`} />
                <h2>{country.name.common}</h2>
                <p>{country.capital}</p>
            </Content>
        </Card>
    );
};

export default CountryCard;
