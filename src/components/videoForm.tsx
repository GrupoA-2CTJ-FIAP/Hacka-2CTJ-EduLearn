import { Button, Modal, Form, Spinner, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import instance from '../services/supabase';

interface Video {
    id_video: number;
    nome_video: string;
    video_url: string;
    comentario: string;
}

interface VideoFormProps {
    currentVideo?: Video | null,
    onSuccessfulAction: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ currentVideo, onSuccessfulAction }) => {
    const [show, setShow] = useState(false);
    const [videoName, setVideoName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [videoComment, setVideoComment] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the spinner

    const handleClose = () => setShow(false);

    async function handleDelete() {
        try {
            setLoading(true);
            const token = JSON.parse(localStorage.getItem("sb-yhuhhyjrbuveavowpwlj-auth-token") || '""');
            const response = await instance.delete(`/videos/${currentVideo?.id_video}`, {
                headers: { Authorization: `Bearer ${token.access_token}` }
            });
            console.log(response);
            alert("Aula excluída com sucesso!");
            onSuccessfulAction();
            handleClose();
        } catch (error) {
            console.error("Error deleting video:", error);
            alert("Erro ao excluir a aula!");
        } finally {
            setLoading(false);
        }
    }
    async function handleUpdate() {
        try {
            setLoading(true);
            const token = JSON.parse(localStorage.getItem("sb-yhuhhyjrbuveavowpwlj-auth-token") || '""');
            const updateData = {
                nome_video: videoName,
                video_url: "https://www.youtube.com/watch?v=" + videoUrl,
                comentario: videoComment
            };
            console.log(updateData)
            const response = await instance.put(`/videos/${currentVideo?.id_video}`, updateData, {
                headers: { Authorization: `Bearer ${token.access_token}` }
            });
            console.log(response);
            alert("Aula atualizada com sucesso!"); // Update alert message
            onSuccessfulAction(); // Call the success handler to refresh the list
            handleClose(); // Close modal after updating
        } catch (error) {
            console.error("Error updating video:", error);
            alert("Erro ao atualizar a aula!"); // Update error alert message
        } finally {
            setLoading(false); // Stop loading
        }
    }
    async function handleCreate() {
        try {
            setLoading(true);
            const token = JSON.parse(localStorage.getItem("sb-yhuhhyjrbuveavowpwlj-auth-token") || '""');
            const createData = {
                nome_video: videoName,
                video_url: videoUrl,
                comentario: videoComment
            };
            console.log(createData)
            const response = await instance.post(`/videos`, createData, {
                headers: { Authorization: `Bearer ${token.access_token}` }
            });
            console.log(response);
            alert("Aula criada com sucesso!");
            onSuccessfulAction();
            handleClose();
        } catch (error) {
            console.error("Error creating video:", error);
            alert("Erro ao criar a aula!");
        } finally {
            setLoading(false);
        }
    }

    const handleShow = () => {
        if (currentVideo) {
            setVideoName(currentVideo.nome_video);
            setVideoUrl(currentVideo.video_url);
            setVideoComment(currentVideo.comentario);
        } else {
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
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon3">
                                    https://youtube.com/watch/?v=
                                </InputGroup.Text>
                                <Form.Control aria-describedby="basic-addon3" type="text"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    placeholder="Insira o URL do vídeo" />
                            </InputGroup>
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
                        <>
                            <Button variant="danger" onClick={handleDelete} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" style={{ marginRight: '5px' }} />
                                        Excluindo...
                                    </>
                                ) : (
                                    "Excluir Aula"
                                )}
                            </Button>
                            <Button
                                style={{ backgroundColor: "rgb(0, 200, 250)" }}
                                onClick={handleUpdate}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Spinner as="span" animation="border" size="sm" style={{ marginRight: '5px' }} />
                                ) : (
                                    "Alterar Aula"
                                )}
                            </Button>
                        </>
                    )}
                    {!currentVideo && (
                        <Button
                            style={{ backgroundColor: "rgb(0, 200, 250)" }}
                            onClick={handleCreate}
                            disabled={loading}
                        >
                            {loading ? (
                                <Spinner as="span" animation="border" size="sm" style={{ marginRight: '5px' }} />
                            ) : (
                                "Criar Aula"
                            )}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VideoForm;