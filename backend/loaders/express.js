const cors = require('cors');

module.exports = async function (app) {

    app.use(cors());
    app.use(require('morgan')('dev'));
    
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });

    // ...More middlewares
    // Return the express app
    return app;
};