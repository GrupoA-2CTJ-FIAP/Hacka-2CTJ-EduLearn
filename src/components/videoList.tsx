import { Button, Table, Card, CardBody } from 'react-bootstrap';

interface Video {
    id_video: number;
    nome_video: string;
    video_url: string;
    comentario: string;
}

interface VideoListProps {
    videos: Video[];
    currentVideo: Video | null;
    handleVideoChange: (video: Video) => void;
    isTeacher: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ videos, currentVideo, handleVideoChange, isTeacher }) => {
    return (
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
            {isTeacher && (
                <CardBody>
                    <Button style={{backgroundColor:"rgb(0, 200, 250)",width:"120px",marginInline:"auto",marginBottom:"20px"}}>Nova Aula</Button>
                </CardBody>
            )}
        </Card>
    );
};

export default VideoList;