const webpack = require('webpack');
const path = require('path');
let dir = process.cwd();//获取当前程序运行的目录
let baseConfig = {
    entry:{
        bundle: dir+'/src/main.js'
    },
    output:{
        filename:'[name].js',
        path: dir+'/dist',
        chunkFilename:"[name].bundle.js"
    },
    module:{
        rules:[
            {
                test:/(\.js|\.jsx)$/,
                use:['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.(jpg|png|gif|eot|woff|woff2|svg|ttf)$/,
                use:['file-loader']
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins:[]
}

module.exports=baseConfig



// new webpack.DefinePlugin({
//     'NODE.ENV':JSON.stringify("development")
// })
