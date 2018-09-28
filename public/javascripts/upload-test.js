(function ($) {
    var r = new Flow({
        target: 'http://localhost:9000/api/v1/file/',
        chunkSize: 10 * 1024 * 1024,
        testChunks: false,
        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiItQWRtaW5pc3RyYXRvciIsIl9pc3N1ZWQiOjE1Mzc4NjM5NzQzODAsImlhdCI6MTUzNzg2Mzk3NCwiZXhwIjoxNTM3ODgxOTc0fQ.vfDsXTe6ExX127LGcJ5WDNR3ria_16Yggau8-BoutzA' // APIトークン
        }
    });
    // Flow.js isn't supported, fall back on a different method
    if (!r.support) {
        alert('not support Flow.js')
        return;
    }

    r.assignBrowse($('#upload-html-btn')[0], false, false, { accept: '.html' });
    r.assignBrowse($('#upload-image-btn')[0], false, false, { accept: '.jpg,.jpeg,.bmp,.gif,.png' });
    r.assignBrowse($('#upload-audio-btn')[0], false, false, { accept: '.wav,.mp3' });
    r.assignBrowse($('#upload-video-btn')[0], false, false, { accept: ".mpg,.mpeg,.m2p,.m2t,.mts,.m2ts" });

    r.on('fileAdded', function (file) {
        // console.log('file', file);
        $('.file-list').append(file.name+'<br/>');
    });

    r.on('filesSubmitted', function (file) {
        r.upload();
    });

    r.on('complete', function () {
        // console.log('complete');
    });

    r.on('fileSuccess', function (file, message) {
        console.log('fileSuccess', file, message);
        console.log('message', message);
        $.ajax({
            url:'http://localhost:9000/api/v1/file/complete/' + file.uniqueIdentifier+'/'+file.name,
            type:'get',
            headers: {
                'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiItQWRtaW5pc3RyYXRvciIsIl9pc3N1ZWQiOjE1Mzc4NjM5NzQzODAsImlhdCI6MTUzNzg2Mzk3NCwiZXhwIjoxNTM3ODgxOTc0fQ.vfDsXTe6ExX127LGcJ5WDNR3ria_16Yggau8-BoutzA' // APIトークン
            }
        })
        .done(function (data) {
            console.log(data);
            $('.file-info').text(JSON.stringify(data));
        });
    });

    r.on('fileError', function (file, message) {
        // console.log('fileError',message);
    });

    r.on('fileProgress', function (file) {
        // console.log('fileProgress');
    });

    r.on('uploadStart', function () {
        // console.log('uploadStart');
    });

    r.on('catchAll', function () {
        // console.log.apply(console, arguments);
    });

})(jQuery);