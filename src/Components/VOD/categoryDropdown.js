import React, { Component } from 'react';
import {InputLabel, Select, MenuItem} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {
    VolumeUpOutlined,
    SportsCricketOutlined,
    FeaturedPlayListOutlined,
    RadioOutlined,
    ErrorOutlineOutlined,
    TvOutlined,
    MovieOutlined,
    FilterListOutlined,
    LiveTvOutlined
    } from '@material-ui/icons';
import './VodComponent.scss';

class CategoryDD extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: this.props.category,
            category: this.props.category,
            dropdown: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
    }
    handleChange(e){
        let cat = e.target.value;
        this.setState({
            name: cat,
            category: cat
        })
        this.props.history.push(`/category/${cat}/page/1`);
    }
    openDropdown(){
        this.setState({
            dropdown: !this.state.dropdown
        })
    }
    render(){
        const categories = [
            {
                name: "Comedy",
                icon: <img src={require('../../Assets/cp.png')} alt="Comedy Portal" />,
                category: "comedy"
            },
            {
                name: "Corona",
                icon: <ErrorOutlineOutlined />,
                category: "corona"
            },
            {
                name: "News",
                icon: <RadioOutlined />,
                category: "news"
            },
            {
                name: "Viral",
                icon: <VolumeUpOutlined />,
                category: "viral"
            },
            {
                name: "Featured",
                icon: <FeaturedPlayListOutlined />,
                category: "featured"
            },
            {
                name: "Programs",
                icon: <TvOutlined />,
                category: "programs"
            },
            {
                name: "Sports",
                icon: <SportsCricketOutlined />,
                category: "sports"
            },
            {
                name: "Entertainment",
                icon: <MovieOutlined />,
                category: "entertainment"
            },
            {
                name: "Dramas",
                icon: <LiveTvOutlined />,
                category: "drama"
            }
        ];
        return(
            <div className="categoryDDContainer " onBlur={this.openDropdown}>
                <InputLabel className="catLabel" htmlFor="select" onClick={this.openDropdown}><font color = "#4aa6e5">Category filter</font> <FilterListOutlined /> </InputLabel>
                <Select id="select" className="catSelect" name="category" value={this.state.category} onChange={this.handleChange} open={this.state.dropdown} style={{visibility: "hidden"}}>
                    {
                        categories.map(item =>
                            <MenuItem className="catMenuItem" value={item.category}>{item.icon}{"  "} <span className="ml-2">{item.name}</span></MenuItem>
                        )
                    }
                </Select>
            </div>
        );
    }
}
 
export default withRouter(CategoryDD);