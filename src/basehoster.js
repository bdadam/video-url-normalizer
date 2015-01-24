module.exports = function(name, normalizeVideoUrl) {
    
    var hoster = {
        name: name,
        normalizeVideoUrl: function(url) {
            var normalizedUrlParts = normalizeVideoUrl(url);
            if (normalizedUrlParts) {
                return {
                    hoster: name,
                    id: normalizedUrlParts.id,
                    url: normalizedUrlParts.url
                };
            }
        }
    };

    return hoster.normalizeVideoUrl;
}