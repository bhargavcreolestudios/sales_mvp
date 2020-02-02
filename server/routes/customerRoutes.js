const mongoose = require('mongoose');
const chalk = require('chalk');
const Customer = mongoose.model('customers');
const log = require('../config/helper');

module.exports = app => {
  app.get(`/api/customer`, async (req, res) => {
    let customers = await Customer.find();
    return res.status(200).send(customers);
  });

  app.post(`/api/customer`, async (req, res) => {
    log(chalk.yellow(JSON.stringify(req.body)), 'request-body');
    let customer = await Customer.create(req.body);
    log(chalk.yellow(JSON.stringify(customer)), 'request-body');
    return res.status(201).send({
      error: false,
      customer
    });
  });

  app.get(`/api/customer-detail`, async (req, res) => {
    try {
      let customer = await Customer.findById(req.query._id);
      return res.status(200).send(customer);
    } catch (error) {
      return res.status(204).send({});
    }
  });
  app.put(`/api/customer`, async (req, res) => {
	let data = req.body;
    log(chalk.green(data.payload), 'payload-body');
	
    let customer = await Customer.findOneAndUpdate(
      { _id: data._id },
      { "$set": { ...JSON.parse(data.payload) } },
      { omitUndefined: true }
    );
    log(chalk.yellow(customer), 'request-body');
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
