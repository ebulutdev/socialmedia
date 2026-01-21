const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Configuration
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

// Helper function to make API requests
async function makeApiRequest(params) {
  try {
    const formData = new URLSearchParams({
      key: API_KEY,
      ...params
    });

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw new Error('API request failed: ' + error.message);
  }
}

// Get service list
app.get('/api/services', async (req, res) => {
  try {
    const data = await makeApiRequest({ action: 'services' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user balance
app.get('/api/balance', async (req, res) => {
  try {
    const data = await makeApiRequest({ action: 'balance' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new order
app.post('/api/order', async (req, res) => {
  try {
    const { service, link, quantity, runs, interval } = req.body;
    
    if (!service || !link || !quantity) {
      return res.status(400).json({ error: 'Service, link, and quantity are required' });
    }

    const params = {
      action: 'add',
      service,
      link,
      quantity
    };

    if (runs) params.runs = runs;
    if (interval) params.interval = interval;

    const data = await makeApiRequest(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order status
app.get('/api/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const data = await makeApiRequest({ 
      action: 'status',
      order: orderId
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get multiple orders status
app.post('/api/orders/status', async (req, res) => {
  try {
    const { orders } = req.body;
    
    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ error: 'Orders array is required' });
    }

    const data = await makeApiRequest({ 
      action: 'status',
      orders: orders.join(',')
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create refill
app.post('/api/refill', async (req, res) => {
  try {
    const { order, orders } = req.body;
    
    const params = { action: 'refill' };
    
    if (orders && Array.isArray(orders)) {
      params.orders = orders.join(',');
    } else if (order) {
      params.order = order;
    } else {
      return res.status(400).json({ error: 'Order or orders array is required' });
    }

    const data = await makeApiRequest(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get refill status
app.post('/api/refill/status', async (req, res) => {
  try {
    const { refill, refills } = req.body;
    
    const params = { action: 'refill_status' };
    
    if (refills && Array.isArray(refills)) {
      params.refills = refills.join(',');
    } else if (refill) {
      params.refill = refill;
    } else {
      return res.status(400).json({ error: 'Refill or refills array is required' });
    }

    const data = await makeApiRequest(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel order
app.post('/api/cancel', async (req, res) => {
  try {
    const { orders } = req.body;
    
    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ error: 'Orders array is required' });
    }

    const data = await makeApiRequest({ 
      action: 'cancel',
      orders: orders.join(',')
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 socialmedia running on http://localhost:${PORT}`);
  console.log(`📡 API Key configured: ${API_KEY ? 'Yes' : 'No'}`);
});
