import axios from 'axios';

export default {
  getCustomers: async () => {
    let res = await axios.get(`http://localhost:3030/api/customer`);
    return res.data || [];
  },
  createCustomer: async payload => {
    let res = await axios.post(`http://localhost:3030/api/customer`, {
      ...payload
    });
    return res.data || null;
  },
  getContacts: async (id) => {
    let res = await axios.get(`http://localhost:3030/api/contact`, {
      params: {
        userId: id
      }
    });
    return res.data || [];
  },
  createContact: async payload => {
    let res = await axios.post(`http://localhost:3030/api/contact`, {
      ...payload
    });
    return res.data || null;
  },
  getCustomerTypes: async () => {
    let res = await axios.get(`http://localhost:3030/api/customer-type`);
    return res.data || [];
  },
  createCustomerType: async payload => {
    let res = await axios.post(`http://localhost:3030/api/customer-type`, {
      ...payload
    });
    return res.data || null;
  },
  getAccountRepresentatives: async () => {
    let res = await axios.get(`http://localhost:3030/api/accountRepresentative`);
    return res.data || [];
  },
  getLocations: async () => {
    let res = await axios.get(`http://localhost:3030/api/location`);
    return res.data || [];
  },
  
};
