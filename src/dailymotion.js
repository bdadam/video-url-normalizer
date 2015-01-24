var base = require('./basehoster');

var re = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;

function tryGetRemoteIdFromUrl(url) {
    var m = url.match(re);
    return m ? m[5] || m[3] : null;
}

module.exports = base('dailymotion', function(url) {
    var id = tryGetRemoteIdFromUrl(url);

    if (id) {
        return {
            id: id,
            url: 'http://www.dailymotion.com/video/' + id
        };
    }

    return false;
});