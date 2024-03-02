
const express = require('express');
const {getCompanies, getCompany, createCompany ,updateCompany ,deleteCompany} = require('../Controllers/company');
const interviewsRouter=require('./interviewsession');
const router = express.Router();

const {protect,authorize} = require('../middleware/auth');
// const { getCompanies } = require('../Controllers/company');

router.use('/:companyID/interview/',interviewsRouter);

router.route('/').get(protect,getCompanies).post(protect,authorize('admin','user'),createCompany);
// router.route('/vacCenters').get(getVacCenters);
router.route('/:id').get(protect,getCompany).put(protect,authorize('admin','user'),updateCompany).delete(protect,authorize('admin','user'),deleteCompany);

module.exports = router;