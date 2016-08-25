/**
 * use this component to show a blog category
 */
import React from 'react';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import LinearProgress from 'material-ui/lib/linear-progress';

import HorizontalBlogItem from './HorizontalBlogItem.jsx'
var uuid = require('uuid');


export default class CategoryBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category:this.props.category,
            blogByCategoryUrl:this.props.blogByCategoryUrl
        }
    };

    componentDidMount() {
        this.setState({loading:true});
        $.getJSON({
            url: this.props.blogByCategoryUrl + this.state.category.key,
            useDefaultXhrHeader: false,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    loading:false,
                    data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    loading:false,
                    data: "fail"
                });
                console.error(this.props.blogByCategoryUrl, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        var categoryPaperStyle ={
            position: "absolute",
            transform:"translate(10px,-10px)",
            height:"40px",
            width :"120px",
            zIndex:1
        };

        var categoryButtonStyle = {
            height:"40px",
            width :"120px"
        };

        var absoluteDiv = {
            margin:20,
            marginTop:50,
            width :"100%"
        };

        var leftArrange = {
            float:"left",
            paddingTop:30,
            width :"100%"
        };

        var divStyle = {
            width: '100%',
            marginTop:20,
            background:"white",
            marginButtom:20
        };

        if(this.state.data) {
            if(this.state.data[0]) {
                var firstBlog = this.state.data[0];
                divStyle = {
                    width: '100%',
                    backgroundImage: "url(\"" +firstBlog.image.url + "\")",
                    marginTop:20,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    marginButtom:20
                };
                return (
                    <Paper style={divStyle} key={this.state.category.id} zDepth={1}>
                        <div style={leftArrange} className="alphaBack">
                            {this.state.data.map(blog => <HorizontalBlogItem key={uuid.v1()} blog={blog} pageChangeHandler = {this.props.pageChangeHandler}/>)}
                        </div>
                        <Paper style={categoryPaperStyle} zDepth={2} src={firstBlog.image.url}
                               children={<FlatButton label={this.state.category.name} style={categoryButtonStyle} primary={true}/>}/>
                    </Paper>
                )
            } else {
                return (
                    <Paper style={divStyle} key={this.state.category.id} zDepth={1}>
                        <div style={absoluteDiv}><p>空的</p></div>
                        <Paper style={categoryPaperStyle} zDepth={2}
                               children={<FlatButton label={this.state.category.name} style={categoryButtonStyle} primary={true}/>}/>
                    </Paper>
                )
            }
        } else {
            return (
                <Paper style={divStyle} key={this.state.category.id} zDepth={1}>
                    <div style={absoluteDiv}><LinearProgress mode="indeterminate"/></div>
                    <Paper style={categoryPaperStyle} zDepth={2}
                           children={<FlatButton label={this.state.category.name} style={categoryButtonStyle} primary={true}/>}/>
                </Paper>
            )
        }
    }
}

