import React from 'react';
import { Artist } from '../../types';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './ArtistList.css';

interface ArtistListProps {
  artists: Artist[];
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
  const navigate = useNavigate();

  const handleArtistSelect = (artist: Artist) => {
    navigate(`/${artist.idArtist}`);
  };

  return (
    <div className="artist-list text-center">
      <div className="artist-grid">
        {artists.map((artist) => (
          <Card
            key={artist.idArtist}
            onClick={() => handleArtistSelect(artist)}
            className="m-3"
            style={{ cursor: 'pointer', maxWidth: '90%' }}
          >
            <Card.Img
              variant="top"
              src={artist.strArtistLogo}
              alt={`${artist.strArtist} logo`}
              style={{ objectFit: 'cover', maxHeight: '150px' }}
            />
            <Card.Body>
              <Card.Title>{artist.strArtist}</Card.Title>
              <Card.Text>{artist.strGenre || 'Genre not available'}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{artist.strCountry}</small>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
