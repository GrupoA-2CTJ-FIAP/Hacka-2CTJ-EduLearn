import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

interface Video {
    id_video: number;
    nome_video: string;
    video_url: string;
    comentario: string;
}

interface VideoFormProps {
    currentVideo?: Video | null;
}

const VideoForm: React.FC<VideoFormProps> = ({ currentVideo }) => {
    const [show, setShow] = useState(false);
    const [videoName, setVideoName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [videoComment, setVideoComment] = useState("");

    const handleClose = () => setShow(false);

    const handleShow = () => {
        if (currentVideo) {
            // Preload data if editing a video
            setVideoName(currentVideo.nome_video);
            setVideoUrl(currentVideo.video_url);
            setVideoComment(currentVideo.comentario);
        } else {
            // Reset the form if creating a new video
            setVideoName("");
            setVideoUrl("");
            setVideoComment("");
        }
        setShow(true); // Show the modal after setting/resetting the form fields
    };

    return (
        <>
            <Button
                style={{
                    backgroundColor: "rgb(0, 200, 250)",
                    width: "120px",
                    marginInline: "auto",
                    marginBottom: "20px"
                }}
                onClick={handleShow}
            >
                {currentVideo ? "Editar Aula" : "Nova Aula"}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentVideo ? "Editar Aula" : "Nova Aula"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formVideoName">
                            <Form.Label>Nome do Vídeo</Form.Label>
                            <Form.Control
                                type="text"
                                value={videoName}
                                onChange={(e) => setVideoName(e.target.value)}
                                placeholder="Insira o nome do vídeo"
                            />
                        </Form.Group>
                        <Form.Group controlId="formVideoUrl" className="mt-3">
                            <Form.Label>URL do Vídeo</Form.Label>
                            <Form.Control
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="Insira o URL do vídeo"
                            />
                        </Form.Group>
                        <Form.Group controlId="formVideoComment" className="mt-3">
                            <Form.Label>Comentário</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={videoComment}
                                onChange={(e) => setVideoComment(e.target.value)}
                                placeholder="Insira o comentário do vídeo"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {currentVideo && (
                        <Button variant="danger">
                            Excluir Aula
                        </Button>
                    )}
                    <Button style={{ backgroundColor: "rgb(0, 200, 250)" }}>
                        {currentVideo ? "Alterar Aula" : "Criar Aula"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VideoForm;