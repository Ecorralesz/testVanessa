import React from 'react';
import { Album } from '../types';
import './AlbumDetails.css';

interface AlbumDetailsProps {
    album: Album | null;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album }) => {
    if (!album) {
        return <div>No album selected.</div>;
    }

    return (
        <div className="album-details-container">
            <div className="album-image-container">
                <img src={album.strAlbumThumb} alt={`${album.strAlbum} cover`} className="album-image" />
                <div className="album-info-overlay">
                    <h1>{album.strAlbum}</h1>
                    <h2>{album.strArtist}</h2>
                    <p>Released: {album.intYearReleased}</p>
                    <p>{album.strDescriptionEN || "No description available."}</p>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetails;
