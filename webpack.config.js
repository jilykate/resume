const webpack = require('webpack');
path = require('path');


module.exports = {
    resolve: {
        root: path.resolve('public')
    },
    entry: './public/javascripts/index.js',
    output: {
        path: './public',
        filename: './bundle.js',
    },
    stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        loaders: [
            { 
        	   test: /vendor\/.+\.(jsx|js)$/,
  			   loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            },
            {
                test: /\.css$/, 
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
}
