import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ImageResults extends Component {
    state = {
        open: false,
        currentImage: ''
    }

    handleOpen = img => {
        this.setState({ open: true, currentImage: img })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        let imageListRender;
        const images = this.props.images;

        if(images) {
            imageListRender = (
                <GridList cols={3}>
                    {
                        images.map(img => (
                            <GridTile
                                key={img.id}
                                title={img.tags}
                                subtitle={
                                    <span> by {img.user} </span>
                                }
                                actionIcon={
                                    <IconButton onClick={ () => this.handleOpen(img.largeImageURL) }>
                                        <ZoomIn color="white" />
                                    </IconButton> 
                                }
                            >
                                <img src={img.largeImageURL} />
                            </GridTile>
                        ))
                    }
                </GridList>
            );
        } else {
            imageListRender = null;
        }

        const dialogActions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]

        // return for render my component
        return (
            <div>
                {imageListRender}
                <Dialog 
                    actions={dialogActions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <img src={this.state.currentImage} style={{ width: '100%' }} />
                </Dialog>
            </div>
        )
    }
}

// ImageResults.prototype = {
//     images: PropTypes.array.isRequired
// }

export default ImageResults;