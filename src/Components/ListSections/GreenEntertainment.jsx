import React, { Component } from 'react';
import GreenDramas from '../GreenDramas/GreenDramas';

export default class GreenEntertainment extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    
    render() {
        const greenDramas = [
            // {playlistId: 'PLs2CG9JU32b6vqj8XCbS0GqeYWrIdF4T0', name: 'Kabli Pulao', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b5X5vMk5qRfUHR7PJpR9ht5', name: 'Jindo', thumbnail: 'JINDO.jpg'},
            // {playlistId: 'PLs2CG9JU32b4G9eUZ0CXVre0CXJgzOJbJ', name: 'Nauroz', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b5u89QIvVXowiDrBcFaCn6j', name: 'Jeevan Nagar', thumbnail: 'JEEVAN NAGAR.jpg'},
            {playlistId: 'PLs2CG9JU32b51JhgFUUEcgV8lh5kq_kAi', name: 'Tumharey Husn Kay Naam', thumbnail: 'TUMHAREY HUSN KAY NAAM.jpg'},
            {playlistId: 'PLs2CG9JU32b5UKvnzUVjQEZO95asLTgZ0', name: 'Standup Girl', thumbnail: 'STANDUP GIRL.jpg'},
            {playlistId: 'PLs2CG9JU32b4UwLrQVDkcXrJLf-GUXEPj', name: 'Idiot', thumbnail: 'IDIOT.jpg'},
            // {playlistId: 'PLs2CG9JU32b6IPJTflvjKk0qSswFpBo3p', name: 'Mohabbat Satrangi', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b45e7UA849qZ4NcRJSPMqTD', name: 'Serial Killer', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b4iAMLdzNQV3VEKxVM7XGl1', name: '22 Qadam', thumbnail: '22 QADAM.jpg'},
            // {playlistId: 'PLs2CG9JU32b4rScQ5TPxsUo33vgtrB1zy', name: 'Ek Jhooti Love Story', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b7iF3Iszyd63vxm47qeYysE', name: 'Akhara', thumbnail: 'AKHARA.jpg'},
            {playlistId: 'PLs2CG9JU32b7-TTBNOH7KRS7E74bWXjgJ', name: 'Mor Chaal', thumbnail: 'MOR CHAAL.jpg'},
            // {playlistId: 'PLs2CG9JU32b52Ul6IU80wdqFFCq1zZdv1', name: 'Shikaar', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b7HiOA-29HKwhzfVKmsi_Mj', name: 'Pagal Khana', thumbnail: 'PAGAL KHANA.jpg'},
            {playlistId: 'PLs2CG9JU32b4PcWmvVXa0kbRLsMRNixdu', name: 'Grey', thumbnail: 'GREY.jpg'},
            // {playlistId: 'PLs2CG9JU32b7XWJqPO_YPev5EbRG6HLH1', name: 'Honey Moon', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b5EOOJIO_LbupzzvN3Dfr8E', name: 'Daurr', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b7BIw3Z6xp-JdOBNENzUxSc', name: 'Wonderland', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b6rrpEHQCRsc-NLtuAeTJq1', name: 'Shanaas', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b7PXjJBeAqRyUFtLfnINHuM', name: 'Siyaah Series', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b6HPfEdy-xoq6eDdIuMBiRM', name: 'Breaking News', thumbnail: 'BREAKING NEWS.jpg'},
            // {playlistId: 'PLs2CG9JU32b7STz23L-FCtpwCgOLwcSkQ', name: 'College Gate', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b6ngAr1tG1ICVfkBeS-jHqf', name: 'Working Women', thumbnail: 'WORKING WOMEN.jpg'},
            // {playlistId: 'PLs2CG9JU32b4LNAnlbjT_TH0I2eDvl66N', name: 'Apney Hee Tou Hain', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b6JHOpemzKi-vi_SEjjv6Mp', name: 'Fatima Feng', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b4SRVIsZ7mnRUQxKhVZ-4lB', name: '101 Talaqain', thumbnail: 'channel02.png'},
            // {playlistId: 'PLs2CG9JU32b5Tn0j3JC9NtKx9RmDvlxoF', name: 'Gumn', thumbnail: 'channel02.png'},
            {playlistId: 'PLs2CG9JU32b58piMYxhV-4FbmEK4lfkSp', name: 'Raaz', thumbnail: 'RAAZ.jpg'},
            // {playlistId: '', name: 'Fanaa', thumbnail: 'FANAA - MAIN POSTER - 450x300.jpg'},
            
            

        
        ]

        return (
            <>
                <GreenDramas data={greenDramas} />
            </>
        )
    }
}
