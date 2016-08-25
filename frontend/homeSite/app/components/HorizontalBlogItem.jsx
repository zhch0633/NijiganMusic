import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';



export default class HorizontalBlogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category:this.props.category,
            blogByCategoryUrl:this.props.blogByCategoryUrl,
            hovering:false
        }
    };

    render(){
       var blockStyle = {
           height : 270,
           maxWidth: 350,
           minWidth: 200,
           float:"left",
           margin:20,
           opacity:0.8,
           cursor:"pointer"
        };

        var hoveringStyle = {
            height : 270,
            maxWidth: 350,
            minWidth: 200,
            float:"left",
            margin:20,
            cursor:"pointer"
        };

        if(this.state.hovering) {
            return (
                <Card style={hoveringStyle }  onClick={this.handleClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} zDepth={4}>
                    <CardTitle title={this.props.blog.title} subtitle={this.props.blog.publishedDate.substring(0,10)} />
                    <CardText>
                    <div dangerouslySetInnerHTML={{__html:this.props.blog.brief}}></div>
                </CardText></Card>
            )
        } else {
            return (
                <Card style={blockStyle}  onClick={this.handleClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} zDepth={0}>
                    <CardTitle title={this.props.blog.title} subtitle={this.props.blog.publishedDate.substring(0,10)} />
                    <CardText>
                        <div dangerouslySetInnerHTML={{__html:this.props.blog.brief}}></div>
                    </CardText>
                </Card>
            )
        }
    }

    handleClick = (event)=>{
        this.props.pageChangeHandler("/blog", this.props.blog.id);
    };

    onMouseOver = (event) =>{
        this.setState({
            hovering: true
        });
    };

    onMouseOut = (event) =>{
        this.setState({
            hovering: false
        });
    }

}