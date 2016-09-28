$(document).ready(function () {

    // append dynamic querystring to the login form
    var $loginIframe = $('#loginIframe');
    if ($loginIframe.length > 0) {
        $loginIframe.attr('src', $loginIframe.attr('src') + '?test=' + new Date().getTime());
    }

});