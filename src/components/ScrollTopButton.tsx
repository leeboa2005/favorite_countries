import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TopButton = styled.button<{ $isVisible: boolean }>`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: transparent;
    color: #333;
    border: none;
    padding: 10px 15px;
    font-size: 30px;
    cursor: pointer;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transition: opacity 0.3s ease;
    z-index: 100;
`;

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleScroll = () => {
        // 300px이상 내려갔을때
        setIsVisible(window.scrollY > 300);
    };

    // 버튼을 클릭하면 화면 맨 위로 올라감
    const scrollToTop: React.MouseEventHandler<HTMLButtonElement> = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        // 처음 화면에 나타날때 스크롤 이벤트 추가
        window.addEventListener('scroll', handleScroll);
        // 컴포넌트가 사라질 때 스크롤 이벤트를 제거
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <TopButton $isVisible={isVisible} onClick={scrollToTop}>
            ✈️
        </TopButton>
    );
};

export default ScrollToTopButton;
