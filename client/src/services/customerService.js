import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`http://localhost:3030/api/customer`);
    return res.data || [];
  }
}