module.exports = function(url) {
    var hosters = [
        require('./src/youtube'),
        require('./src/dailymotion'),
        require('./src/vimeo')
    ];

    for (var i = 0, l = hosters.length; i < l; i++) {
        var norm = hosters[i](url);
        if (norm) {
            return norm;
        }
    }

    return { url: url };
}