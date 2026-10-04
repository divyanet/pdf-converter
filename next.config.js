module.exports = {
  webpack: (config) => {
    config.resolve.alias.canvas = false; // pdfjs optional dep
    return config;
  },
};
