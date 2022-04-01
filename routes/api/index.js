const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/user', userRoutes);
router.use('/reaction', reactionRoutes);

module.exports = router;
