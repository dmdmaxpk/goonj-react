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
    LiveTvOutlined,
    FastfoodOutlined,
    SchoolOutlined,
    FilterListOutlinedIcon
    } from '@material-ui/icons';
import './VodComponent.scss';


class CategoryDD extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: this.props.category,
            category: this.props.category,
            dropdown: false,
            isLightTheme: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
    }
    componentDidMount() {
        // MTA
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.source = urlParams.get("source");

        // Theme checks
        if(this.source === 'mta2'){
            this.setState({isLightTheme: true});
        }
        else{
            this.setState({isLightTheme: false});
        }
    }

    handleChange(e) {
        let cat = e.target.value;
        this.setState({
            name: cat,
            category: cat
        });
        
        let path = `/category/${cat}/page/1`;
        
        if (this.state.isLightTheme) {
            path += '?source=mta2';
        }
        
        this.props.history.push(path);
    }
    
    openDropdown(){
        this.setState({
            dropdown: !this.state.dropdown
        })
    }
    render(){
        const categories = [
            // {
            //     name: "Comedy",
            //     icon: <img src={require('../../Assets/cp.png')} alt="Comedy Portal" />,
            //     category: "comedy"
            // },
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
                name: "Drama",
                icon: <LiveTvOutlined />,
                category: "drama"
            },
            {
                name: "Food",
                icon: <FastfoodOutlined />,
                category: "food"
            },
            {
                name: "Education",
                icon: <SchoolOutlined />,
                category: "education"
            }
        ];
        const { isLightTheme } = this.state;
        return(
            <div className="categoryDDContainer " onBlur={this.openDropdown}>
                <InputLabel className="catLabel" htmlFor="select" onClick={this.openDropdown}><font color = "#4aa6e5">Category filter</font> 
                <FilterListOutlined style={{ color: '#ABEA1F' }} />
                </InputLabel>
                <Select id="select" className="catSelect" style={{ visibility: "hidden"}} name="category" value={this.state.category} onChange={this.handleChange} open={this.state.dropdown} >
                    {
                        categories.map(item =>
                            <MenuItem className="catMenuItem" value={item.category}>{item.icon}{"  "} 
                                <span className="ml-2" style={{ color: isLightTheme ? "#87CEEB" : "white" }}>{item.name}</span> 
                            </MenuItem>
                        )
                    }
                </Select>
            </div>
        );
    }
}
 
export default withRouter(CategoryDD);