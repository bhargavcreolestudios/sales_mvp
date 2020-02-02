const mongoose = require('mongoose');
const chalk = require('chalk');
const Customer = mongoose.model('customers');
const log = require('../config/helper');

module.exports = app => {
  app.get(`/api/customer`, async (req, res) => {
	let customers = await Customer.find();
	log(chalk.blueBright(JSON.stringify(customers,'', 2)));
	
    return res.status(200).send(customers);
  });

  app.post(`/api/customer`, async (req, res) => {
    // log(chalk.yellow(JSON.stringify(req.body)), 'request-body'); return;
	let customer = await Customer.create(req.body);
	log(chalk.yellow(JSON.stringify(customer)), 'request-body');
    return res.status(201).send({
      error: false,
      customer
    });
  });

  //   app.post(`/api/contact`, async (req, res) => {
  //     let customer = await Customer.create(req.body);
  //     return res.status(201).send({
  //       error: false,
  //       customer
  //     })
  // })
};
