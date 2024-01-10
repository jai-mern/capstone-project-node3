const Invoice = require('../models/invoiceModel');
const Product = require('../models/productModel');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  const { products } = req.body;

  try {
    // Check if all products exist
    const productIds = products.map((product) => product.productId);
    const existingProducts = await Product.find({ _id: { $in: productIds } });

    if (existingProducts.length !== products.length) {
      return res.status(400).json({ error: 'One or more products not found' });
    }

    // Calculate total amount
    const totalAmount = products.reduce((total, product) => {
      const selectedProduct = existingProducts.find(
        (p) => p._id.toString() === product.productId
      );
      return total + selectedProduct.price * product.quantity;
    }, 0);

    // Create invoice
    const newInvoice = new Invoice({
      products,
      totalAmount,
    });

    const savedInvoice = await newInvoice.save();
    res.json(savedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
