import { Button, Table, Card, CardBody } from 'react-bootstrap';
import VideoForm from './videoForm';

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
    isTeacher: boolean
    teacherName?: string | null;
    onSuccessfulAction: () => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, currentVideo, handleVideoChange, isTeacher, teacherName, onSuccessfulAction }) => {
    // Sort the videos alphabetically by 'nome_video'
    const sortedVideos = [...videos].sort((a, b) =>
        a.nome_video.localeCompare(b.nome_video)
    );

    return (
        <Card>
            <Card.Header>Aulas <span style={{ fontWeight: "700" }}>{"- " + teacherName}</span></Card.Header>
            <Table striped bordered hover>
                <tbody>
                    {sortedVideos.length > 0 ? (
                        sortedVideos.map((video, index) => (
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
                    <VideoForm onSuccessfulAction={onSuccessfulAction} />
                </CardBody>
            )}
        </Card>
    );
};

export default VideoList;