'use strict';
// Config object for this module
// httpsPort is the port that requests will be directed to
// reassign if that's not what you want
exports.options = {
    httpsPort: 443
};

// Middleware to redirect to https
// not sure if this is buggy or not
exports.redirectToHttpsMiddleware = function(req, res, next) {
    if (!req.secure) {
        console.log('Redirecting insecure request to https');
        var newPath = 'https://' + req.get('host').split(':')[0] + ':' + exports.options.httpsPort || 443 + req.url;

        console.log(newPath);

        //FYI this should work for local development as well
        return res.redirect(newPath);
    }
    next();
};
