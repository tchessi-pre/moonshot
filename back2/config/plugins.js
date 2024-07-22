module.exports = ({ env }) => ({
  upload: {
    provider: "local",
    providerOptions: {
      sizeLimit: 1000000, 
    },
  },

});
