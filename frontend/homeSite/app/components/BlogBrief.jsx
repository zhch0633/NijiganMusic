/**
 * use this component to form a blog for show in blog site
 */

import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import ListItem from 'material-ui/lib/lists/list-item';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';

import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import randomColor from './utils/randomColor.jsx';

var $ = require ('jquery');

const styles = {
    popover: {
        padding: 0,
        maxWidth: 400
    }
};

const iconStyles = {
    marginRight: 24
};


export default class BlogBrief extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blog : props.content,
            editing: false,
            open: false,
            counter : this.props.counter,
            hovering : false,
            showingBlog : this.props.showingBlog,
            avatar:this.props.avatar
        }
    };

    render() {
        var showHover = false;
        if(this.state.blog.id){
            if(this.state.blog.id.valueOf() === this.props.showingBlog.valueOf()) {
                showHover = true;
            }
        }

        var headerStyle ={
            color: "white",
            backgroundColor : randomColor.generate()
        };

        var noMarginStyle ={
            margin:0,
            padding :0
        };

        var footColor = {
            backgroundColor: "#EEEEEE"
        };
        if(showHover) {
            return (
                <div onClick={this.handleClick} style={noMarginStyle}>
                    <ListItem
                        style={headerStyle}
                        onMouseOver={this.onMouseOver}
                    > {this.state.blog.title}
                    </ListItem>
                    <ListItem style = {footColor}>
                        <CardText  style = {footColor}>
                            <div dangerouslySetInnerHTML={{__html:this.state.blog.brief}}></div>
                        </CardText>
                        <CardHeader
                            style = {footColor}
                            title= "残相君~"
                            subtitle={this.state.blog.publishedDate}
                            avatar={this.state.avatar}
                        >
                        </CardHeader>
                    </ListItem>
                </div>
            );
        } else {
            return(
                <ListItem
                    onClick={this.handleClick}
                    onMouseOver={this.onMouseOver}
                >{this.state.blog.title}
                </ListItem>
            )
        }
    }

    handleClick = () =>{
        this.props.pageChangeHandler("/blog",this.state.blog.id);
    };

    onMouseOver = (event) =>{
        this.props.hoverChangeHandler(this.state.blog.id);
    };

    handleRequestClose = () => {
        this.setState({
            open: false

        });
    };
}

