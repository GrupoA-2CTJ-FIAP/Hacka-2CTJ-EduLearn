import { useState, useRef, useEffect } from 'react';
import { Button, Container, Card, Table, Row, Col, Spinner, Form } from 'react-bootstrap';
import instance from '../services/supabase';

interface Video {
    id_video: number;
    nome_video: string;
    video_url: string;
    comentario: string;
}

const VideoContainer = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const videoRef = useRef<HTMLDivElement>(null);

    // States for editing
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>("");
    const [editedUrl, setEditedUrl] = useState<string>("");
    const [editedComment, setEditedComment] = useState<string>("");

    // Determine if the user is a teacher
    const [isTeacher, setIsTeacher] = useState<boolean>(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("sb-yhuhhyjrbuveavowpwlj-auth-token") || '""');
                let endpoint = "aluno";
                if (token.user.role === "teacher") {
                    endpoint = "professor";
                    setIsTeacher(true); // Set isTeacher to true if the user is a teacher
                }
                const response = await instance.get(`/videos/${endpoint}`, {
                    headers: { Authorization: `Bearer ${token.access_token}` }
                });
                const videoData = response.data.data;
                if (videoData.length > 0) {
                    setVideos(videoData);
                    setCurrentVideo(videoData[0]);
                } else {
                    setVideos([]);
                    setCurrentVideo(null);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
                alert("Erro ao buscar vídeos!");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleVideoChange = (video: Video) => {
        setCurrentVideo(video);
        setEditedName(video.nome_video);
        setEditedUrl(video.video_url);
        setEditedComment(video.comentario);
        setIsEditing(false);
        if (videoRef.current) {
            videoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleEdit = () => {
        if (currentVideo) {
            setEditedName(currentVideo.nome_video);
            setEditedUrl(currentVideo.video_url);
            setEditedComment(currentVideo.comentario);
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        if (currentVideo) {
            try {
                await instance.put(`/videos/${currentVideo.id_video}`, {
                    nome_video: editedName,
                    video_url: editedUrl,
                    comentario: editedComment,
                });

                // Update the videos state locally
                setVideos(videos.map(video =>
                    video.id_video === currentVideo.id_video
                        ? { ...video, nome_video: editedName, video_url: editedUrl, comentario: editedComment }
                        : video
                ));
                setCurrentVideo({ ...currentVideo, nome_video: editedName, video_url: editedUrl, comentario: editedComment });
                alert("Video updated successfully!");
            } catch (error) {
                console.error("Error updating video:", error);
                alert("Erro ao atualizar vídeo!");
            } finally {
                setIsEditing(false);
            }
        }
    };

    const handleDelete = async () => {
        if (currentVideo) {
            const confirmed = window.confirm("Tem certeza de que deseja excluir este vídeo?");
            if (confirmed) {
                try {
                    await instance.delete(`/videos/${currentVideo.id_video}`);

                    // Update the videos state locally
                    setVideos(videos.filter(video => video.id_video !== currentVideo.id_video));
                    setCurrentVideo(null); // Reset current video if it was deleted
                    alert("Video deleted successfully!");
                } catch (error) {
                    console.error("Error deleting video:", error);
                    alert("Erro ao excluir vídeo!");
                }
            }
        }
    };

    const handleBack = () => {
        setIsEditing(false); // Reset editing state
    };

    return (
        <Container className="text-center" style={{ position: 'relative' }}>
            {loading && (
                <div
                    style={{
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {!loading && (
                <Row className="mb-4">
                    <Col xs={12} md={8}>
                        {currentVideo ? (
                            <Card ref={videoRef}>
                                <Card.Title style={{ paddingBlock: "30px", fontWeight: "700", color: "rgb(0,200,250)", fontSize: "28px" }}>
                                    {currentVideo.nome_video}
                                </Card.Title>

                                {/* Display editing fields only if the user is a teacher and in edit mode */}
                                {isEditing && isTeacher ? (
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Nome do Vídeo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>URL do Vídeo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editedUrl}
                                                onChange={(e) => setEditedUrl(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Comentário</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                value={editedComment}
                                                onChange={(e) => setEditedComment(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSave}>Salvar</Button>
                                        <Button variant="secondary" onClick={handleBack} style={{ marginLeft: "10px" }}>Voltar</Button>
                                    </Form>
                                ) : (
                                    <>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${currentVideo.video_url}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}
                                        ></iframe>
                                        <Card.Text style={{ padding: "20px" }}>{currentVideo.comentario}</Card.Text>
                                        {isTeacher && (
                                            <>
                                                <Button variant="outline-secondary" onClick={handleEdit}>Editar</Button>
                                                <Button variant="outline-danger" onClick={handleDelete} style={{ marginLeft: "10px" }}>Excluir</Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </Card>
                        ) : (
                            <Card>
                                <Card.Body>
                                    <Card.Title>Nenhum vídeo disponível</Card.Title>
                                    <Card.Text>Seu professor ainda não postou nenhum vídeo. Entre em contato com nosso suporte ao aluno!</Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>

                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Header>Aulas</Card.Header>
                            <Table striped bordered hover>
                                <tbody>
                                    {videos.length > 0 ? (
                                        videos.map((video, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Button
                                                        variant="outline-primary"
                                                        onClick={() => handleVideoChange(video)}
                                                        className="w-100"
                                                        active={currentVideo?.video_url === video.video_url}
                                                    >
                                                        {video.nome_video}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>Nenhuma aula disponível</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default VideoContainer;