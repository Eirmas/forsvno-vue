// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",
  entry: {
    quizVue: "./src/quiz.es6",
    stepperVue: "./src/stepper.es6",
    diagramVue: "./src/diagram.es6",
    storyVue: "./src/story.es6"
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.es6?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          "vue-loader"
        ]
      },
      {
        test: /(\.css$|\.sass$)/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: [".es6", ".js", ".vue"]
  },
  output: {
    publicPath: "/_/asset/forsvno:[hash]/",
    path: require("path").resolve(__dirname, "../forsvno/src/main/resources/assets"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js"
  }
};
