import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
    state = {
        searchText: '',
        amount: 5,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '8770647-bec3c053b3757676b8485e554',
        images: []
    }

    getRequest = (valueCheck) => {
        if(valueCheck === '') this.setState({ images: [] }) 
        else {
            axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({ images: res.data.hits }))
                .catch(err => console.log(err));
        }
    }

    onTextChange = event => {
        let value = event.target.value;
        this.setState({ [ event.target.name ]: event.target.value }, this.getRequest(value))
    }

    onAmountChange = (event, index, value) => this.setState({ amount: value })

    render() {
        return (
            <div style={{ padding: '1%' }}>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search for images"
                />

                <br />

                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>

                <br />

                {
                    this.state.images.length > 0 ? ( <ImageResults images={this.state.images} /> ) : null
                }
                
            </div>
        )
    }
}

export default Search;