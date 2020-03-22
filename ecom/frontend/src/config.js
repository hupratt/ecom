const config = {
  development: {
    srcPath: __dirname,
    appURL: "http://127.0.0.1:8000"
  },

  production: {
    appURL: "https://shop.lapetiteportugaise.eu"
  }
};

export default {
  ...config.base,
  ...config[process.env.NODE_ENV]
};
