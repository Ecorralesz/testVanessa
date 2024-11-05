import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAlbums } from '../../api';
import { Album, Artist } from '../../types';
import Card from 'react-bootstrap/Card';
import './ArtistDetails.css';
import placeholderImage from '../assets/Qo5mfYDE5v-350.png';

interface ArtistDetailsProps {
    artists: Artist[];
    setSelectedAlbum: (album: Album) => void; // New prop for setting selected album
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ artists, setSelectedAlbum }) => {
    const { artistId } = useParams<{ artistId: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const navigate = useNavigate();

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

    // Navigate to album details page
    const handleAlbumClick = (album: Album) => {
        setSelectedAlbum(album); // Set the selected album
        navigate(`/${artistId}/${album.idAlbum}`); // Navigate to AlbumDetails with artistId and albumId
    };

    return (
        <div className='details'>
            <h2>{artist?.strArtist || ""}</h2>
            <img className='banner pb-5' src={artist?.strArtistBanner} alt="" />
            <h3> {artist?.strBiographyEN || ""}</h3>
            <h2>Albums</h2>
            <div className="album-grid">
                {albums.map((album) => (
                    <Card
                        key={album.idAlbum}
                        className="m-3"
                        style={{ cursor: 'pointer', maxWidth: '90%' }}
                        onClick={() => handleAlbumClick(album)} // Pass the whole album object
                    >
                        <Card.Img
                            variant="top"
                            src={album.strAlbumThumb || placeholderImage}
                            alt={`${album.strAlbum} cover`}
                            style={{ objectFit: 'cover', maxHeight: '20rem' }}
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
