import React from 'react';
import { Modal } from 'antd';
import CustomerCreateForm from '../CustomerCreateForm';
class NewCustomer extends React.Component {
	constructor(props){
		super(props)
		console.log('here in');
	}
	state = {
		isOpen: this.props.isOpen
	}
	componentDidMount(){
		console.log('here');
	}
	handleCreate = () => {
		const { form } = this.formRef.props;
	    form.validateFields((err, values) => {
	    if (err) {
	    	return;
	    }
	    form.resetFields();
	    });
	}
	saveFormRef = formRef => {
	  this.formRef = formRef;
	}
	render() {
		const { isOpen } = this.state
		console.log(isOpen,'isOpen')
		return (
			<Modal
	          title="Customer Information"
	          visible={isOpen}
	          onOk={() => this.setState({ isOpen: false })}
	          onCancel={() => this.setState({ isOpen: false })}
	          footer={null}
	        >
	          <CustomerCreateForm
		        wrappedComponentRef={this.saveFormRef}
		        visible={isOpen}
		        onCancel={() => this.setState({ isOpen: false })}
		        onCreate={this.handleCreate}
			  />
	        </Modal>
		);
	}
}
export default NewCustomer