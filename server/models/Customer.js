const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    companyName: String,
    firstName: String,
    lastName: String,
    displayName: String,
    email: { type: String, unique: true, lowercase: true },
    phone: { type: String, trim: true},
    mobile: { type: String, trim: true},
    fax: { type: String, trim: true},
    other: { type: String, trim: true},
    accountRep: String,
    customerType: String,
    isSubCustomer: Boolean,
    subCustomer: {
    	parentCustomer: String,
    	billWithParent: String,
    	propertyType: String
    },
    address: {
    	billingAddress: String,
    	city: String,
    	state: String,
    	zipCode: String,
    },
    shippingAddressSame: Boolean,
    shipping: {
    	shippingAddress: String,
    	city: String,
    	state: String,
    	zipCode: String,
    },
    billingDetails: {
    	accountNo: String,
    	paymentTerms: String,
    	preferredPayment: String,
    	preferredDelivery: String,
    	openingBalance: { type: Number, default: 0 },
    	asOf: String,
    	reason: String,
    	taxResaleNo: String,
    	exemptionDetails: String,
    },
})

mongoose.model('customers', productSchema);