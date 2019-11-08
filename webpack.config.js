const path = require("path"); //지금 현재 위치
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV; //env 사용  이름:WEBPACK_ENV packge.json에 적혀있음
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

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
        test: /\.(scss)$/, // 어떤 조건을 알아보라고할때 SCss로 끝나는 어떤 module(styles.scss)을 만나면되면
        use: ExtractCSS.extract([
          // ExtractCSS plugin을 사용하도록 이 플로그인은 내부에서 또 plugin을 사용중 이유는 scss파일을 일반적인 css로 통역해서
          // 위아래 읽는거아니고 아래에서 위로 빌드함
          {
            loader: "css-loader" // webpack이 css를 이행할수있은 기능
          },
          {
            loader: "postcss-loader", // css를 받아서 우리가 애한테 주는 plugin을 가지고 CSS 호환 기능
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })]; // 시중 99.5%로 호환가능하게       broweserslist에서 확인 git
              }
            }
          },
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
