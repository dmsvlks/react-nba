const proxy = require('http-proxy-middleware')
    
module.exports = function(app) {
  app.use(proxy('/api', { 
    target: 'http://data.nba.net/data/10s/prod/v1',  
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ""
    }
  }))
}