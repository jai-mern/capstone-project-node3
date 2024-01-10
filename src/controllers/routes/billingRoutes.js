const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Routes for Billing and Invoicing
router.post('/invoices', billingController.createInvoice);
router.get('/invoices', billingController.getAllInvoices);
router.get('/invoices/:invoiceId', billingController.getInvoiceById);

module.exports = router;
