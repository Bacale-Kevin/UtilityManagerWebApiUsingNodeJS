const express = require('express');
const RoleController = require('../controllers/role');

const router = express.Router();

router.post('/create', RoleController.createRole);
router.get('/roles', RoleController.getRoles);


module.exports = router;
