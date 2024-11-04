import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ArtistList from './components/ArtistList';
import ArtistDetails from './components/ArtistDetails';
import { searchArtists } from './api';
import { Artist } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootswatch/dist/zephyr/bootstrap.min.css';

const App = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async (query: string) => {
        if (query.toLowerCase() !== 'coldplay') {
            setShowModal(true);
            setArtists([]); // Clear results if search is not "Coldplay"
            return;
        }
        const results = await searchArtists(query);
        setArtists(results ?? []);
    };

    return (
        <Router>
            <Container fluid className="d-flex justify-content-center vh-100 vw-100">
                <Row className="text-center">
                    <Col>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <SearchBar onSearch={handleSearch} />
                                        <ArtistList artists={artists} />
                                    </>
                                }
                            />
                            <Route
                                path="/:artistId"
                                element={<ArtistDetails artists={artists} />}
                            />
                        </Routes>
                    </Col>
                </Row>
                
                {/* Modal Component */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please try searching for "Coldplay".</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Router>
    );
};

export default App;
