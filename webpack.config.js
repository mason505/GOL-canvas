module.exports = {
    entry: "./src/main.jsx",
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }

};
