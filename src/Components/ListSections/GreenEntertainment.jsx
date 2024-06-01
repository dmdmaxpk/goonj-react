import React, { Component } from 'react';
import GreenDramas from '../GreenDramas/GreenDramas';

export default class GreenEntertainment extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    
    render() {
        const greenDramas = [
            {playlistId: 'PLs2CG9JU32b6vqj8XCbS0GqeYWrIdF4T0', name: 'Kabli Pulao', thumbnail: 'KABLI PULAO.jpg'},
            {playlistId: 'PLs2CG9JU32b5X5vMk5qRfUHR7PJpR9ht5', name: 'Jindo', thumbnail: 'JINDO.jpg'},
            {playlistId: 'PLs2CG9JU32b4G9eUZ0CXVre0CXJgzOJbJ', name: 'Nauroz', thumbnail: 'NAUROZ.jpg'},
            {playlistId: 'PLs2CG9JU32b5u89QIvVXowiDrBcFaCn6j', name: 'Jeevan Nagar', thumbnail: 'JEEVAN NAGAR.jpg'},
            {playlistId: 'PLs2CG9JU32b51JhgFUUEcgV8lh5kq_kAi', name: 'Tumharey Husn Kay Naam', thumbnail: 'TUMHAREY HUSN KAY NAAM.jpg'},
            {playlistId: 'PLs2CG9JU32b5UKvnzUVjQEZO95asLTgZ0', name: 'Standup Girl', thumbnail: 'STANDUP GIRL.jpg'},
            {playlistId: 'PLs2CG9JU32b4UwLrQVDkcXrJLf-GUXEPj', name: 'Idiot', thumbnail: 'IDIOT.jpg'},
            {playlistId: 'PLs2CG9JU32b45e7UA849qZ4NcRJSPMqTD', name: 'Serial Killer', thumbnail: 'SERIAL KILLER.jpg'},
            {playlistId: 'PLs2CG9JU32b4iAMLdzNQV3VEKxVM7XGl1', name: '22 Qadam', thumbnail: '22 QADAM.jpg'},
            {playlistId: 'PLs2CG9JU32b4rScQ5TPxsUo33vgtrB1zy', name: 'Ek Jhooti Love Story', thumbnail: 'EK JHOOTI LOVE STORY.jpg'},
            {playlistId: 'PLs2CG9JU32b7iF3Iszyd63vxm47qeYysE', name: 'Akhara', thumbnail: 'AKHARA.jpg'},
            {playlistId: 'PLs2CG9JU32b7-TTBNOH7KRS7E74bWXjgJ', name: 'Mor Chaal', thumbnail: 'MOR CHAAL.jpg'},
            {playlistId: 'PLs2CG9JU32b6IPJTflvjKk0qSswFpBo3p', name: 'Shikar', thumbnail: 'SHIKAR.jpg'},
            {playlistId: 'PLs2CG9JU32b7HiOA-29HKwhzfVKmsi_Mj', name: 'Pagal Khana', thumbnail: 'PAGAL KHANA.jpg'},
            {playlistId: 'PLs2CG9JU32b4PcWmvVXa0kbRLsMRNixdu', name: 'Grey', thumbnail: 'GREY.jpg'},
            {playlistId: 'PLs2CG9JU32b7XWJqPO_YPev5EbRG6HLH1', name: 'Honey Moon', thumbnail: 'HONEY MOON.jpg'},
            {playlistId: 'PLs2CG9JU32b5EOOJIO_LbupzzvN3Dfr8E', name: 'Daurr', thumbnail: 'DAURR.jpg'},
            {playlistId: 'PLs2CG9JU32b7BIw3Z6xp-JdOBNENzUxSc', name: 'Wonderland', thumbnail: 'WONDERLAND.jpg'},
            {playlistId: 'PLs2CG9JU32b6rrpEHQCRsc-NLtuAeTJq1', name: 'Shanaas', thumbnail: 'SHANAAS.jpg'},
            {playlistId: 'PLs2CG9JU32b7PXjJBeAqRyUFtLfnINHuM', name: 'Siyaah Series', thumbnail: 'SIYAH SERIES.jpg'},
            {playlistId: 'PLs2CG9JU32b58piMYxhV-4FbmEK4lfkSp', name: 'Raaz', thumbnail: 'RAAZ.jpg'},
            {playlistId: 'PLs2CG9JU32b6HPfEdy-xoq6eDdIuMBiRM', name: 'Breaking News', thumbnail: 'BREAKING NEWS.jpg'},
            {playlistId: 'PLs2CG9JU32b7STz23L-FCtpwCgOLwcSkQ', name: 'College Gate', thumbnail: 'COLLEGE GATE.jpg'},
            {playlistId: 'PLs2CG9JU32b6ngAr1tG1ICVfkBeS-jHqf', name: 'Working Women', thumbnail: 'WORKING WOMEN.jpg'},
            {playlistId: 'PLs2CG9JU32b4LNAnlbjT_TH0I2eDvl66N', name: 'Apney Hee Tou Hain', thumbnail: 'APNEY HI TO HEIN.jpg'},
            {playlistId: 'PLs2CG9JU32b6JHOpemzKi-vi_SEjjv6Mp', name: 'Fatima Feng', thumbnail: 'FATIMA FENG.jpg'},
            {playlistId: 'PLs2CG9JU32b4SRVIsZ7mnRUQxKhVZ-4lB', name: '101 Talaqain', thumbnail: '101 - TALAQAIN.jpg'},
            {playlistId: 'PLs2CG9JU32b5Tn0j3JC9NtKx9RmDvlxoF', name: 'Gumn', thumbnail: 'GUMN.jpg'},
            {playlistId: 'PLs2CG9JU32b5L1Rt_IyZumpryulwW5r7D', name: 'Fanaa', thumbnail: 'FANAA.jpg '},
            // {playlistId: "PLBRFejfMt3Zmy9_cM7_CeBhc2Lflsej8I", name:"Voice Over Man", thumbnail:"VOM.jpg"},
            // {playlistId:"PLNGRp6zc1uUsXUQGAGcvyi5yMsYjMQ27D", name:"I Don't Know - Presented by Telenor 4G", thumbnail:"IDK.jpg"},
            // {playlistId:"PLNGRp6zc1uUv5imLTWsMlRC2kF30ucdEO", name:"To Be Honest 3.0 Presented by Telenor 4G", thumbnail:"TBH.jpg"}

        ]

        return (
            <>
                <GreenDramas data={greenDramas} />
            </>
        )
    }
}
