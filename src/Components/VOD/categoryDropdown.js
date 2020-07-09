import React, { Component } from 'react';
import {InputLabel, Select, MenuItem} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './VodComponent.scss';

class CategoryDD extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: this.props.category,
            category: this.props.category
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        let cat = e.target.value;
        this.props.history.push(`/category/${cat}/page/1`);
    }
    render(){
        const categories = [
            {
                name: "Comedy",
                category: "comedy"
            },
            {
                name: "Corona",
                category: "corona"
            },
            {
                name: "News",
                category: "news"
            },
            {
                name: "Viral",
                category: "viral"
            },
            {
                name: "Featured",
                category: "featured"
            },
            {
                name: "Programs",
                category: "programs"
            },
            {
                name: "Sports",
                category: "sports"
            },
            {
                name: "Entertainment",
                category: "entertainment"
            }
        ];
        return(
            <div className="categoryDDContainer">
                <InputLabel className="catLabel" htmlFor="select">Category</InputLabel>
                <Select id="select" className="catSelect" name="category" value={this.state.category} onChange={this.handleChange}>
                    {
                        categories.map(item =>
                            <MenuItem className="catMenuItem" value={item.category}>{item.name}</MenuItem>
                        )
                    }
                </Select>
            </div>
        );
    }
}
 
export default withRouter(CategoryDD);