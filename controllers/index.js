const router = require('express').Router();
// require api, home, and dashboard routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboardRoutes');

// use each variable set the its route
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
