var base = require('./basehoster');

var reHostname = /(youtube.com|youtu.be|youtube-nocookie.com)/i
var reVideoId = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;

function tryGetRemoteIdFromUrl(url) {
    if (!url.match(reHostname)) {
        return null;
    }

    var matches = url.match(reVideoId);
    if (matches && matches.length === 2 && matches[1].length === 11) {
        return matches[1];
    }

    return null;
}

module.exports = base('youtube', function(url) {
    var id = tryGetRemoteIdFromUrl(url);

    if (id) {
        return {
            id: id,
            url: 'http://www.youtube.com/watch?v=' + id
        };
    }

    return false;
});
