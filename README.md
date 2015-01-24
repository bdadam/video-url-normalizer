# video-url-normalizer

This npm package normalizes the URL of different video hosting services

This module is intended to be used to normalize the URLs of different video hosting sites.
The normalized URLs are not necessarily the canonical URLs of the videos.
Each valid video URL has an ID which is unique at its specific hoster.

Currently supported services:
	- Youtube
	- Dailymotion
	- Vimeo

## Usage
```JavaScript
var normalizeVideoUrl = require('video-url-normalizer');
var urlToVideo = 'http://www.youtube.com/watch?v=abcdefghijk&feature=feedrec_grec_index';

var obj = normalizeVideoUrl(urlToVideo);
assert(obj.hoster === 'youtube');
assert(obj.id === 'abcdefghijk');
assert(obj.url === 'http://www.youtube.com/watch?v=abcdefghijk');
```
