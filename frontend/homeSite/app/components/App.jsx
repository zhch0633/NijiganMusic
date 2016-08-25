import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Blog from'./Blog.jsx'
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import BlogNavBar from './NavBar.jsx'
import CircularProgress from 'material-ui/lib/circular-progress';
import Home from './Home.jsx';
import TitleBar from './TitleBar.jsx';

import randomColor from './utils/randomColor.jsx';
var uuid = require('uuid');

var $ = require ('jquery');

/**this is a block to show a blog with a bannar
 */

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open : false,
            url :this.props.url,
            location : window.location,
            blogListUrl : this.props.url + "api/blogs",
            blogPostUrl : this.props.url + "api/post?id=",
            categoryUrl : this.props.url + "api/categories",
            blogByCategoryUrl : this.props.url + "api/blogs?category=",
            avatar:this.props.avatar,
            firstLoad :true,
            page : window.location.pathname,
            blogID:"",
            titleBarTitle : "残相君.blog"
        };

        var that = this;
        if(window.location.pathname == "/"){
            this.state.page = "/home"
        }
        //for pop state
        window.onpopstate = function(event) {
            if(event.state !== null) {
                this.state.backStack = event;
                this.handlePageBack(event.state.pageGroup,event.state.searchID);
            }
        }.bind(that)
    };

    componentDidMount() {
        this.setState({loading:true});
        $.getJSON({
            url: this.state.url + "api/blogs",
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

        //once a blog is loaded at the first time ,do this
        if(window.location.pathname=="/blog"){
            this.handlePageChange("/blog",this.getParameterByName("id"));
            //push state to blog
        } else {
            //push state to home
            var shiftPage = {
                pageGroup:"/home",
                searchID:""
            };
            history.replaceState(shiftPage,"残相君博客:技术有点萌","home");
            this.setState({
                firstLoad : false
            })
        }
    }

    render() {
        var appBarStyle = {
            position:"fixed",
            backgroundColor: randomColor.generate(),
            top:0,
            height:"64px",
            minHeight:"64px",
            maxHeight:"64px"
        };

        var containerStyle = {

        };

        var mainContainer;

        //prepare for blog page or other pages
        if(this.state.loading){
            mainContainer = <CircularProgress style = {containerStyle}/>;
            this.state.titleBarTitle = "读取中..."
        } else if(this.state.page == "/home") {
            mainContainer = <Home avatar = {this.state.avatar} pageChangeHandler={this.handlePageChange} url={this.state.categoryUrl} blogByCategoryUrl = {this.state.blogByCategoryUrl} style = {containerStyle} />;
            this.state.titleBarTitle = "残相君.home"
        } else if(this.state.page == "/blog"){
            mainContainer = <Blog avatar = {this.state.avatar} blogContent = {this.state.blogContent} pageChangeHandler={this.handlePageChange} style = {containerStyle}/>;
            if(this.state.blogContent) {
                this.state.titleBarTitle = "Blog. " + this.state.blogContent.title
            } else{
                this.state.titleBarTitle = "读取失败"
            }
        }

        var navStyle = {
            "overflowX":"hidden"
        };

        return (
            <div>
                <TitleBar title = {this.state.titleBarTitle} blogListUrl={this.state.blogListUrl} pageChangeHandler={this.handlePageChange} avatar={this.state.avatar} />
                {mainContainer}
            </div>
        )
    }

    handleClickNavBar = () =>{
        //touggle the nav bar for display navigation
        this.setState({
            open: true
        });
    };

    getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        url = url.toLowerCase(); // This is just to avoid case sensitiveness
        name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    handlePageBack = function(pageGroup,id){
        console.log("back state " + pageGroup + " " +id);
        if(pageGroup=="/home") {
            this.shiftToHome();
        }
        if(pageGroup=="/blog"){
            this.shiftToBlog(id);
        }
    }.bind(this);

    handlePageChange =  function(pageGroup,id){
        var shiftPage = {
            pageGroup:pageGroup,
            searchID:id
        };
        console.log("push state" + this.state.page +" " + this.state.blogID);
        if(pageGroup=="/home"){
            this.shiftToHome();
            history.pushState(shiftPage,"残相君博客:技术有点萌","home")
        }
        if(pageGroup=="/blog"){
            this.shiftToBlog(id);
            var blogUrl = "blog" + "?id=" + id;
            //when first load ,replace a stack
            if(this.state.firstLoad) {
                history.replaceState(shiftPage, "残相君博客:技术有点萌", blogUrl);
                this.setState({
                    firstLoad : false
                })
            } else{
                history.pushState(shiftPage, "残相君博客:技术有点萌", blogUrl);
            }
        }
    }.bind(this);

    shiftToHome = () => {
        this.setState(
            {
                page:"/home",
                open:false
            }
        )
    };

    shiftToBlog = (id) =>{
        //first step set loading
        this.setState(
            {
                blogID: id,
                loading: true,
                open:false
            }
        );
        console.log("jump page");
        $.getJSON({
            url: this.state.blogPostUrl + id,
            useDefaultXhrHeader: false,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    page:"/blog",
                    loading:false,
                    blogContent: data[0]});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    page:"/blog",
                    loading:false,
                    data: "fail"
                });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
}
