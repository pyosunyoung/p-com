import {assignVars, createGlobalTheme, createGlobalThemeContract, globalStyle} from "@vanilla-extract/css";
//Contract 이런 테마를 만들겠다는 의미? 틀 느낌?
export const global = createGlobalThemeContract({
  background: {
    color: 'bg-color' //backgroud의 테마 이름을 정한 것.
  },
  foreground: {
    color: 'fg-color'
  },
})
createGlobalTheme(':root', global, {
  background: {
    color: 'rgb(255, 255, 255)' // 실제 값을 넣은 것. 이름은 bg color인데 그것의 실제값은 이것.
  },
  foreground: {
    color: 'rgb(0, 0, 0)'
  },
});
const darkGlobalTheme = { // 다크모드
  background: {
    color: 'rgb(0, 0, 0)'
  },
  foreground: {
    color: 'rgb(255, 255, 255)'
  },
}
globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: assignVars(global, darkGlobalTheme),// 미디어 쿼리 안에 변수가 들어있는 부분
    }
  }
})
globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
})
globalStyle('html', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      colorScheme: 'dark',
    }
  }
});
globalStyle('html, body', {
  maxWidth: '100dvw',
  overflowX: 'hidden',
})
globalStyle('body', {
  color: global.foreground.color //fg-color
})
globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
})
