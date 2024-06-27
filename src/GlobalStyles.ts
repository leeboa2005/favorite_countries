import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --default-width: 1020px;
    --default-border: 1px solid #ddd;
    --text-color: #111827;
    --gray-color: #999;
    --white-color: #fff;
    --text-gray-color: #b7b7b7;
    --text-center: center;
    --font-title-size: 28px;
    --font-subtitle-size:24px;
    --font-size-18: 18px;
    --font-weight-bold: 700;
    --font-weight-semi-bold: 600;
    --font-weight-medium: 500;
    --font-weight-light: 300;
    --margin-medium: 30px;

    @media only screen and (max-width: 1068px) {
      --default-width: 700px;
    }

    @media only screen and (max-width: 734px) {
      --default-width: 85%;
      --font-title-size: 24px;
    }
  }

  body {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
}

input,button{
  font-family: "Noto Sans KR", sans-serif !important;
  border: none !important;
  outline: none !important;
  box-sizing: border-box;
}

`;

export default GlobalStyles;
