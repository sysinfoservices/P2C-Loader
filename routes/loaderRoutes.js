const express = require('express');
const loaderController = require('../controllers/loaderController');

const router = express.Router();

router.post('/assign-key', loaderController.assignKey);
router.post('/get-usermode', loaderController.getUsermode);
router.post('/get-kernelmode', loaderController.getKernelmode);

module.exports = router;
