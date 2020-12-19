module.exports = {
  publicRuntimeConfig: {
    domain: process.env.DOMAIN,
  },
  serverRuntimeConfig: {
    movieApi: process.env.MOVIE_API,
  },
  images: {
    domains: ['iptvimagecache-playplus-prod-vip.han.telia.se']
  }
}
