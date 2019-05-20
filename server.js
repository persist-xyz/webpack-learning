const express = require('express')
const webpack = require('webpack')
const WebpacDevkMiddleware = require('webpack-dev-middleware')

let app = express()
const config = require('./webpack.pro')
const compiler = webpack(config)

app.use(WebpacDevkMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.listen('3000', () => {
    console.log('Example app listening on port 3000!\n');
})