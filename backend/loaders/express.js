const cors = require('cors');
const dashboardRoute = require('../routes/dashboard');

module.exports = async function (app, express) {

    app.use(cors());
    app.use(require('morgan')('dev'));
    app.use(express.json());

    // importing routes
    app.use('/dashboard', dashboardRoute);

    // invalid end point, not found
    app.use((req, res) => {
        const err = new Error(`404 not found`);
        res.status(404).send(err.message);
    })
    // ...More middlewares
    // Return the express app
    return app;
};