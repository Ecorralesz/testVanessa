import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbums } from '../api';
import { Album, Artist } from '../types';
import Card from 'react-bootstrap/Card';
import './ArtistDetails.css';
import placeholderImage from '../assets/Qo5mfYDE5v-350.png'; 

interface ArtistDetailsProps {
    artists: Artist[];
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ artists }) => {
    const { artistId } = useParams<{ artistId: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);

    // Find the specific artist using artistId
    const artist = artists.find((artist) => artist.idArtist === artistId);

    useEffect(() => {
        if (artistId) {
            fetchAlbums(artistId).then((data) => setAlbums(data || []));
        }
    }, [artistId]);

    // Function to truncate strings
    const truncate = (text: string, length: number) => {
        if (!text) return "";
        return text.length > length ? text.slice(0, length) + '...' : text;
    };

    return (
        <div className='details'>
            <h2>{artist?.strArtist || "Artist Not Found"}</h2>
            <h3>{artist?.strBiographyEN || ""}</h3>
            <h2>Albums</h2>
            <div className="album-grid">
                {albums.map((album) => (
                    <Card key={album.id} className="m-3" style={{ cursor: 'pointer', maxWidth: '90%' }}>
                        <Card.Img
                            variant="top"
                            src={album.strAlbumThumb || placeholderImage}
                            alt={`${album.strAlbum} cover`}
                            style={{ objectFit: 'cover', maxHeight: '150px' }}
                        />
                        <Card.Body>
                            <Card.Title>{truncate(album.strAlbum, 100)}</Card.Title>
                            <Card.Text>{truncate(album.strDescriptionEN, 100)}</Card.Text>
                            <Card.Text>{album.intYearReleased || 'Year not available'}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ArtistDetails;
