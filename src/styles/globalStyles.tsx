import GlobalStyles from '@mui/material/GlobalStyles';

const globalStyles = (
  <GlobalStyles
    styles={{
      'html, body, div#root': {
        height: '100dvh',
        caretColor: '#23D8F1',
      },
      '*': {
        '::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      'ul, ol, li': { padding: 0, margin: 0, listStyle: 'none', width: '100%' },
      a: {
        color: 'inherit',
        textDecoration: 'inherit',
      },
      form: {
        width: '100%',
      },
      /* 마우스 스크롤 이벤트를 통한 input type=number 입력값 업데이트 비활성화 */
      // Chrome, Safari, Edge, Opera
      'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      // Firefox
      'input[type=number]': {
        MozAppearance: 'textfield',
      },
      'input::-webkit-contacts-auto-fill-button': {
        visibility: 'hidden',
      },
    }}
  />
);

export default globalStyles;
