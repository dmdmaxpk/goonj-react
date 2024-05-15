import React, { Component } from 'react';
import shortfilms from '..\shortFilms&DW\ShortFilms';

export default class DigitalWorld extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    
    render() {
        const digitalworldcontent = [
            {playlistId: '13R9FsYFPNFG7Y2toM-hcEneAEsuh4cIq', name: 'Dusri Shadi', thumbnail: 'Dusri Shadi.jpg'},
            {playlistId: '1WQXYcpaC2uHdXjpjwq0JcNhRM-eEqH9T', name: 'Move On', thumbnail: 'Move On.jpg'},
            {playlistId: '1WZeafdNasgFJCOiPlCtWmzcdOqaYchr9', name: 'Washing Machine', thumbnail: 'Washing Machine.jpg'},
            {playlistId: '14XfDVtVuU0TjpyRddn4fhc4nevJv8SQf', name: 'Marriage on Divorce', thumbnail: 'Marriage on Divorce.jpg'},
            {playlistId: '1tPcbxkr-LJmz6NY1AVrasLcm0GXD9oiQ', name: 'Injection', thumbnail: 'Injection.jpg'},
            {playlistId: '18szX7ZnVG1028qvQV98H6kK7aoAF-tpj', name: 'Dhoka', thumbnail: 'Dhoka.jpg'},
            {playlistId: '1U9mG7c7YKBcNh4xUY_L5Ny1GIlW3TwuW', name: 'False Truth', thumbnail: 'False Truth.jpg'},
            {playlistId: '1PnyWmEOp407Z_Mr1G5BxLrueJA7I6G3y', name: 'Underestimate', thumbnail: 'Underestimate.jpg'},
            {playlistId: '1NDMp2TUjCLuasanEQi-yW3FRznoOLCll', name: 'Munna Electrician', thumbnail: 'Munna Electrician.jpg'},
            {playlistId: '147LTvLdOy7HgtEY6DZ-AD6pl9FSz1pDm', name: 'doll', thumbnail: 'doll.mp4'},
            


        ]

        return (
            <>
                <DigitalWorld data={digitalworldcontent} />
            </>
        )
    }
}
