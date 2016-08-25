 import React from 'react';
 import AppBar from 'material-ui/lib/app-bar';
 import BlogNavBar from './NavBar.jsx'
 import LeftNav from 'material-ui/lib/left-nav';
 import randomColor from './utils/randomColor.jsx';
 var uuid = require('uuid');

export default class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            open:false
        }
    };

    render(){
        var appBarStyle = {
            position:"fixed",
            backgroundColor: randomColor.generate(),
            top:0,
            height:"64px",
            minHeight:"64px",
            maxHeight:"64px"
        };

        var navStyle = {
            "overflowX":"hidden"
        };

        return(
            <div>
                <AppBar
                    title={this.props.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap = {this.handleClickNavBar}
                    style = {appBarStyle}
                    zDepth = {2}
                />
                <LeftNav
                    style={navStyle}
                    docked={false}
                    width={400}
                    open={this.state.open}
                    onRequestChange={open => this.setState({open})}
                ><BlogNavBar url = {this.props.blogListUrl}  pageChangeHandler = {this.handlePageChange} avatar = {this.props.avatar}/>
                </LeftNav>
            </div>
        )
    };

    handleClickNavBar = () =>{
        //touggle the nav bar for display navigation
        this.setState({
            open: true
        });
    };

    handlePageChange =  function(pageGroup,id){
        console.log("click")
        this.setState({
            open: false
        });
        this.props.pageChangeHandler(pageGroup,id);
    }.bind(this);

}

