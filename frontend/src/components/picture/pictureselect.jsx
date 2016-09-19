import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class PictureSelectView extends React.Component {

    constructor(props) {
        super(props);

        //bind function context to this
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const style = {
            margin: 12
        };

        const exampleImageInput = {
            cursor: 'pointer',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                width: '100%',
                opacity: '0'
        };

        var canupload = 1;

        if(typeof FileReader ==='undefined'){
            canupload = 0;
        }

        if(canupload ===1) {
            return (
                <RaisedButton label="Select Picture" secondary={true} style={style} onTouchTap={this.handleSubmit}>
                    <input id="imageButton" style={exampleImageInput} type="file"/>
                </RaisedButton>
            )
        } else {
            return (
                <RaisedButton label="Select Picture" disabled={true} style={style} onTouchTap={this.handleSubmit}/>
            )
        }
    }

    handleSubmit(e){

    }
}