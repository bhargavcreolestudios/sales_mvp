const mongoose = require('mongoose');
const Customer = mongoose.model('customers');

module.exports = (app) => {
	
	app.get(`/api/customer`, async (req, res) => {
	    let customers = await Customer.find();
	    console.log(customers);
	    return res.status(200).send(customers);
  	});

  	app.post(`/api/customer`, async (req, res) => {
	    let customer = await Customer.create(req.body);
	    return res.status(201).send({
	      error: false,
	      customer
	    })
  	})
}