// webpack을 사용하기 위해서 npm으로 webpack과 webpack-cli를 설치한 후, webpack의 환경설정을 해준다
// 추가로 node-sass도 설치
// loader 또한 각각 설치

// node module에서 path와 extract text webpack plugin(npm으로 설치)을 불러온다. 이 환경셜정 파일에서는 오로지 구식 자바스크립트만 쓰일 수 있으므로 import나 export 같은 최신 자바스크립트 문법을 사용할 수 없다
const path = require("path"); //지금 현재 위치
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

// webpack의 환경설정

// webpack의 모드
const MODE = process.env.WEBPACK_ENV; //env 사용  이름:WEBPACK_ENV packge.json에 적혀있음

// assets라는 이름의 폴더를 만들고 그 안에 js 파일과 css 파일의 경로를 위치
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// 위의 assets 폴더 안의 파일들이 packing된 후 저장될 곳
const OUTPUT_DIR = path.join(__dirname, "static");

// 본격적인 환경설정 부분
const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /|.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        // rules를 따르라 룰을 따르라
        // 정규표현식을 사용해서 scss 파일이 있는지 확인
        test: /\.(scss)$/, // 어떤 조건을 알아보라고할때 SCss로 끝나는 어떤 module(styles.scss)을 만나면되면
        // 아래의 loader들은 밑에서 위로 실행됌
        use: ExtractCSS.extract([
          // 최종적인 css파일을 불러옴
          {
            loader: "css-loader"
          },
          //   브라우저 호환성 등을 해결해주는 loader(이것도 자동으로 css파일을 알맞게 변환)
          {
            loader: "postcss-loader", // css를 받아서 우리가 애한테 주는 plugin을 가지고 CSS 호환 기능
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })]; // 시중 99.5%로 호환가능하게       broweserslist에서 확인 git
              }
            }
          },
          //   sass나 scss파일을 받아서 css파일로 변환
          {
            loader: "sass-loader" // SCSS받아서 일반 CSS로 변경
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },

  plugins: [new ExtractCSS("styles.css")] // 저장할 이름 넣기
};

module.exports = config;
