const mongoose = require('mongoose');
const chalk = require('chalk');
const Customer = mongoose.model('customers');
const Contact = mongoose.model('contacts');
const log = require('../config/helper');

module.exports = app => {
  app.get(`/api/customer`, async (req, res) => {
    let customers = await Customer.find();
    return res.status(200).send(customers);
  });

  app.post(`/api/customer`, async (req, res) => {
    let customer = await Customer.create(req.body);
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
    let customer = await Customer.findOneAndUpdate(
      { _id: data._id },
      { $set: { ...JSON.parse(data.payload) } },
      { omitUndefined: true }
    );
    return res.status(201).send({
      error: false,
      customer
    });
  });

  app.get(`/api/contact`, async (req, res) => {
    try {
      let userId = req.query.userId;
	  let contacts = await Contact.find({ userId });
	  log(contacts, 'contactscontacts')

      if (contacts.length > 0) {

        return res.status(200).send({
          error: false,
          contacts
        });
      } else {
        return res.status(204).send({
          error: false,
          contacts
        });
      }
    } catch (error) {
      return res.status(204).send({
        error: true
      });
    }
  });

  app.post(`/api/contact`, async (req, res) => {
    try {
      let contact = await Contact.create(req.body);
      return res.status(201).send({
        error: false,
        contact
      });
    } catch (error) {
      return res.status(204).send({
        error: true
      });
    }
  });

  app.put(`/api/contact`, async (req, res) => {
    let data = req.body;
    let contact = await contact.findOneAndUpdate(
      { _id: data._id },
      { $set: { ...JSON.parse(data.payload) } },
      { omitUndefined: true }
    );
    return res.status(201).send({
      error: false,
      contact
    });
  });
};
