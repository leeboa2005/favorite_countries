import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_ACCESS_URL = import.meta.env.VITE_UNSPLASH_ACCESS_URL;
const DEFAULT_IMAGE_URL = 'https://cdn.pixabay.com/photo/2019/12/21/13/53/sea-4710533_1280.jpg';

export const getCountryImage = async (countryName: string): Promise<string> => {
    interface UnsplashApiResponse {
        results: { urls: { small: string } }[];
    }
    try {
        const response = await axios.get<UnsplashApiResponse>(UNSPLASH_ACCESS_URL, {
            params: {
                query: countryName, // countryName을 검색
                client_id: UNSPLASH_ACCESS_KEY,
                per_page: 1, // 검색한 이미지 중 1개의 이미지 반환
            },
        });

        if (response.data.results.length > 0) {
            return response.data.results[0].urls.small; // 검색된 첫번째 이미지 1개를 반환
        } else {
            return DEFAULT_IMAGE_URL; // 이미지가 없을 경우 기본 이미지 반환
        }
    } catch (error) {
        const typedError = error as Error;
        if (axios.isAxiosError(typedError) && typedError.response?.status === 403) {
            console.warn('API 요청 한도를 초과했습니다. 기본 이미지를 반환합니다.');
            return DEFAULT_IMAGE_URL; // 403 오류 발생 시 기본 이미지 반환
        } else {
            console.error('이미지를 불러오는 중 오류가 발생했습니다:', error);
            return DEFAULT_IMAGE_URL; // 다른 오류 발생 시 기본 이미지 반환
        }
    }
};
