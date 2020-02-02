import axios from "axios";

export default {
  getCustomers: async () => {
    let res = await axios.get(`http://localhost:3030/api/customer`);
    return res.data || [];
  },
  getCustomer: async id => {
    let res = await axios.get(`http://localhost:3030/api/customer-detail`, {
      params: {
        _id: id
      }
    });
    console.log(res, "ressss");
    return res.data || {};
  },
  createCustomer: async payload => {
    let res = await axios.post(`http://localhost:3030/api/customer`, {
      ...payload
    });
    return res.data || null;
  },
  updateCustomer: async (id, payload) => {
    let res = await axios.put(`http://localhost:3030/api/customer`, {
      _id: id,
      payload: JSON.stringify(payload)
    });
    return res.data || null;
  },
  getContacts: async id => {
    let res = await axios.get(`http://localhost:3030/api/contact`, {
      params: {
        userId: id
      }
    });
    return res.data || [];
  },
  createContact: async (userId, payload) => {
    let res = await axios.post(`http://localhost:3030/api/contact`, {
      userId: userId,
      ...payload
    });
    return res.data || null;
  },
  updateContact: async (id, payload) => {
    let res = await axios.put(`http://localhost:3030/api/contact`, {
      _id: id,
      payload: JSON.stringify(payload)
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
    let res = await axios.get(
      `http://localhost:3030/api/accountRepresentative`
    );
    return res.data || [];
  },
  getLocations: async () => {
    let res = await axios.get(`http://localhost:3030/api/location`);
    return res.data || [];
  }
};
