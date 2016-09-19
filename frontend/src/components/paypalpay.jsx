import React from 'react';
import Redirect from '../tools/redirectjquery'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class PaypalPayView extends React.Component {
    constructor(props) {
        super(props);

        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleMerchantNameChange = this.handleMerchantNameChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const style = {
            margin: 12
        };

        return (
            <div>
                <label>Place your Order</label>
                <TextField
                    id="productName"
                    floatingLabelText="Product Name"
                    fullWidth={true}
                    onChange={this.handleProductNameChange}
                />
                <TextField
                    id="merchantName"
                    hintText="put any thing"
                    floatingLabelText="Merchant Name"
                    defaultValue = "dsa"
                    fullWidth={true}
                    onChange={this.handleMerchantNameChange}
                />
                <TextField
                    id="moneyAmont"
                    hintText="10.00"
                    floatingLabelText="Money Amount"
                    fullWidth={true}
                    onChange={this.handleAmountChange}
                />

                <RaisedButton label="Pay" secondary={true} style={style} onTouchTap={this.handleSubmit}/>
            </div>
        )
    }

    handleProductNameChange(e){
        this.setState({
            product: e.target.value
        });
    }

    handleMerchantNameChange(e){
        this.setState({
            merchant: e.target.value
        });
    }

    handleAmountChange(e){
        this.setState({
            amount: e.target.value
        });
    }

    handleSubmit(e){
        var dataModel = {
            'business': 'herschelgomez@xyzzyu.com',
            'cmd': '_xclick',
            'item_name':'Mi 4 I',
            'currency_code':'USD',
            'type':'solid',
            'design':'colorful',
            'amount':"30.00"
        };

        dataModel.item_name = this.state.product;
        dataModel.merchant = this.state.merchant;
        dataModel.amount = this.state.amount;

        $.redirect('https://www.paypal.com/cgi-bin/webscr',dataModel,"_blank");
    }
}
