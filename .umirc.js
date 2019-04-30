export default {
    plugins: [
      [
        'umi-plugin-react', {
          antd: true,
        }
      ],
    ],
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        "pathRewrite": { "^/api" : "" }
      }
    }
  }