
// middleware to catch unresolving async promises

// export middleware function
module.exports = func => (req, res, next) => {
    // try to resolve promise, otherwise call next with error
    Promise.resolve(func(req, res, next)).catch(next);
}