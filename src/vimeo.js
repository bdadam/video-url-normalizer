var base = require('./basehoster');

var re = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;

function tryGetRemoteIdFromUrl(url) {
    //http://stackoverflow.com/questions/13286785/get-video-id-from-vimeo-url
    var match = url.match(re);
    if (match && match.length >= 4) {
        return match[3];
    }

    return null;
}

module.exports = base('vimeo', function(url) {
    var id = tryGetRemoteIdFromUrl(url);

    if (id) {
        return {
            id: id,
            url: 'http://vimeo.com/' + id
        };
    }

    return false;
});