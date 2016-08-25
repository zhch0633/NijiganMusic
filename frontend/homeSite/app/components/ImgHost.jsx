import React from 'react';

/**
 * this is a imgHost for images to show in a clipped rect this clip
 * will clip out a image and react to image's height and fill the tar get page
 */
export default class ImgHost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src : props.src,
            height :props.height
        }
    };

    render() {
        var containerStyle = {
            width: '100%',
            height: '0',
            'paddingBottom': '30%',
            overflow: 'hidden'
        };

        if(this.state.height) {
            containerStyle.paddingBottom = this.state.height
        }

        var imgStyle = {
            width: '100%'
        };

        return (
            <div style={containerStyle}>
                <img style= {imgStyle} src= {this.state.src}/>
            </div>
        )
    }
}