import React from 'react';
import BlogItem from './BlogItem.jsx'
import CircularProgress from 'material-ui/lib/circular-progress';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false,
            showingBlog :"empty"
        };

    }

    componentDidMount() {
        this.setState({loading:true});
        $.getJSON({
            url: this.props.url,
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
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        const data = this.state.data;

        var divStyle = {
            overflow:"hidden"
        };

        if(data) {
            return (
                <div style={divStyle}>
                    {data.map(blog => <BlogItem key={blog.id} content={blog} showingBlog = {this.state.showingBlog} avatar = {this.props.avatar}
                                                pageChangeHandler={this.props.pageChangeHandler}
                                                hoverChangeHandler={this.handleHoverChange}/>)}
                </div>
            );
        } else {
            return (
                <CircularProgress/>
            )
        }
    }

    handleHoverChange =  function(blog){
        if(this.state.showingBlog!= blog) {
            this.setState(
                {
                    showingBlog: blog
                }
            )
        }
    }.bind(this);
}