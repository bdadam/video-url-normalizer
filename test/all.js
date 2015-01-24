var expect = require('chai').expect;

var videoUrlNormalizer = require('../index');

describe('Youtube', function() {
    var differentFormsOfSameVideo = [
        'http://www.youtube.com/v/abcdefghijk?fs=1&hl=en_US&rel=0',
        'http://www.youtube.com/embed/abcdefghijk?rel=0',
        'http://www.youtube.com/watch?v=abcdefghijk&feature=feedrec_grec_index',
        'http://www.youtube.com/watch?v=abcdefghijk',
        'http://youtu.be/abcdefghijk',
        'http://www.youtube.com/watch?v=abcdefghijk#t=0m10s',
        'http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/abcdefghijk',
        'http://youtu.be/abcdefghijk',
        'http://www.youtube.com/embed/abcdefghijk',
        'http://www.youtube.com/v/abcdefghijk',
        'http://www.youtube.com/e/abcdefghijk',
        'http://www.youtube.com/watch?v=abcdefghijk',
        'http://www.youtube.com/?v=abcdefghijk',
        'http://www.youtube.com/watch?feature=player_embedded&v=abcdefghijk',
        'http://www.youtube.com/?feature=player_embedded&v=abcdefghijk',
        'http://www.youtube.com/user/IngridMichaelsonVEVO#p/u/11/abcdefghijk',
        'http://www.youtube-nocookie.com/v/abcdefghijk?version=3&hl=en_US&rel=0'
    ];

    it('must produce the same output for all forms of the video', function() {
        var normalizedUrlParts = differentFormsOfSameVideo.map(videoUrlNormalizer);
        normalizedUrlParts.forEach(function(obj){
            expect(obj).to.deep.equal({ hoster: 'youtube', id: 'abcdefghijk', url: 'http://www.youtube.com/watch?v=abcdefghijk' });
        });
    });

    it('must not touch invalid URLs', function() {
        var idIsTooShortUrl = 'http://www.youtube.com/watch?v=abcdefghij';
        expect(videoUrlNormalizer(idIsTooShortUrl)).to.deep.equal({ url: idIsTooShortUrl });
    });
});

describe('Dailymotion', function() {
    var differentFormsOfSameVideo = [
        "http://www.dailymotion.com/video/x44lvd_rates-of-exchange-like-a-renegade_music",
        "http://www.dailymotion.com/video/x44lvd",
        "http://www.dailymotion.com/hub/x44lvd_Galatasaray",
        "http://www.dailymotion.com/hub/xq9_Galatasaray#video=x44lvd",
        "http://www.dailymotion.com/video/x44lvd_hakan-yukur-klip_sport",
        "http://www.dailymotion.com/fr/relevance/search/gangnam+style/1#video=x44lvd"
    ];

    it('must produce the same output for all forms of the video', function() {
        var normalizedUrlParts = differentFormsOfSameVideo.map(videoUrlNormalizer);
        normalizedUrlParts.forEach(function(obj){
            expect(obj).to.deep.equal({ hoster: 'dailymotion', id: 'x44lvd', url: 'http://www.dailymotion.com/video/x44lvd' });
        });
    });
});

describe('Vimeo', function() {
    var differentFormsOfSameVideo = [
        "https://vimeo.com/11111111",
        "http://vimeo.com/11111111",
        "https://www.vimeo.com/11111111",
        "http://www.vimeo.com/11111111",
        "https://vimeo.com/channels/11111111",
        "http://vimeo.com/channels/11111111",
        "https://vimeo.com/channels/mychannel/11111111",
        "http://vimeo.com/channels/yourchannel/11111111",
        "https://vimeo.com/groups/name/videos/11111111",
        "http://vimeo.com/groups/name/videos/11111111",
        "https://vimeo.com/album/2222222/video/11111111",
        "http://vimeo.com/album/2222222/video/11111111",
        "https://vimeo.com/11111111?param=test",
        "http://vimeo.com/11111111?param=test"
    ];

    it('must produce the same output for all forms of the video', function() {
        var normalizedUrlParts = differentFormsOfSameVideo.map(videoUrlNormalizer);
        normalizedUrlParts.forEach(function(obj){
            expect(obj).to.deep.equal({ hoster: 'vimeo', id: '11111111', url: 'http://vimeo.com/11111111' });
        });
    });

    it('must not touch invalid URLs', function() {
        var invalidIdUrl = '"https://vimeo.com/11111asa111';
        expect(videoUrlNormalizer(invalidIdUrl)).to.deep.equal({ url: invalidIdUrl });
    });
});


describe('It must not touch unsupported URLs', function() {
    it('relative URL', function() {
        var relativeUrl = '/asdfgd/sdsdsdfsdcvbc/sdgsd';
        var justRandomYoutubeLikeIdUrl = 'http://example.com/watch?v=abcdefghijk';
        
        var urls = [
            relativeUrl,
            justRandomYoutubeLikeIdUrl
        ];

        urls.forEach(function(url) {
            expect(videoUrlNormalizer(url)).to.deep.equal({ url: url });
        });
    });
});
