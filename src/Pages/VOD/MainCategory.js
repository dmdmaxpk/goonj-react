import React, { Component } from 'react';
import AxiosInstance from '../../Utils/AxiosInstance';
import './vod.scss';
import Headlines from '../../Components/HomeSections/Headlines';

class MainCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCats: []
        }
        this.getSubCategories = this.getSubCategories.bind(this);
    }
    componentDidMount(){
        this.getSubCategories()
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.data !== nextProps.data || this.props.category !== nextProps.category) {
                window.location.reload();
        }
    }
    getSubCategories(){
        AxiosInstance.get(`/video?category=${this.props.category}&limit=10000`)
        .then(res=>{
            let data = res.data;
            let subCats = [];
            data.filter(item=>{
                if(!(subCats.includes(item.sub_category)) && item.sub_category !== 'Sandy Mandy')
                {
                    subCats.push(item.sub_category)
                }
            }
            )
            this.setState({subCats}, function(){
                subCats.map(item =>{
                    if(item){
                        AxiosInstance.get(`/video?sub_category=${item}`)
                        .then(res =>{
                            // console.log(res.data);
                            this.setState({
                                [item] : {subCategory: item, data: res.data}
                            })
                        })
                    }
                })
            })
        })
    }

    render(){
        return(
            <div className="">
                {this.state.subCats.length > 0 ?
                    this.state.subCats.map(item =>
                        this.state[item] ?
                            <div>
                                <Headlines category="" subCategory={item} title={item} limit={12} infinite={false} url={`/category/${this.props.category}/${item}/page/1`} classes="zeroPadding" viewMoreClass={this.state[item].data.length < 12 ? "hideVM" : ''} />
                            </div>
                        :
                            ''
                    )
                    :
                    ''
                }
            </div>
        );
    }
}
 
export default MainCategory;