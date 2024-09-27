import { useState, useRef } from 'react';
import { Button, Container, Card, Table, Row, Col } from 'react-bootstrap';

interface Video {
    videoName: string;
    videoUrl: string;
    comment: string;
}
const VideoContainer = () => {
    const videos = [
        {
            videoName: 'FIAPCAST - Startup One: mindset empreendedor na FIAP',
            videoUrl: '8dHkcJw1msI?si=oQxewRH8WZQkgj_8',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget arcu massa. Phasellus mattis mauris ut justo efficitur, ut iaculis ligula pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam malesuada mattis urna sit amet auctor. Fusce ornare velit tortor, id viverra tortor volutpat at. Aliquam tempus luctus fringilla. Aliquam erat volutpat. In porttitor ultrices nisl et rhoncus. Nullam luctus quam tellus, at suscipit dolor ultrices quis. In aliquam urna ut nisi porttitor cursus. Nam fringilla, eros at dignissim malesuada, lorem libero fringilla ante, in luctus turpis dui ac dolor. Pellentesque malesuada elementum sagittis. Sed dolor neque, vestibulum nec turpis id, vestibulum mattis quam.',
        },
        {
            videoName: 'FIAPCAST - Data Science e o Poder dos Dados',
            videoUrl: 'exe_FimBbnc?si=ISSiz_MKN43fjuzo',
            comment: 'Nunc non nulla volutpat, sollicitudin metus sit amet, scelerisque erat. Nunc vel massa rhoncus, porttitor metus at, pellentesque risus. Proin ipsum ex, tincidunt ut ligula vel, commodo molestie orci. Etiam vitae ex neque. Pellentesque ligula nisl, ornare vel ligula id, pretium egestas tellus. Aliquam vitae libero tellus. Pellentesque mollis id lacus at volutpat. Sed dignissim, ex eu ornare laoreet, diam nunc ullamcorper nulla, mattis tempor augue nisl et metus. Pellentesque interdum rhoncus justo. Nunc luctus rhoncus ex, quis congue enim euismod a. Donec lorem diam, suscipit at libero ut, vehicula efficitur eros. Aliquam ut magna sed neque consectetur sagittis. In sit amet gravida magna. Vestibulum faucibus dui magna, quis lacinia lorem imperdiet quis. Maecenas in ligula vehicula, maximus libero ac, rutrum massa. Proin et porttitor magna.',
        },
        {
            videoName: 'FIAPCAST - Profissão Dev',
            videoUrl: 'jWOQmSpzlXA',
            comment: 'Sed at lorem nec massa rutrum cursus ac a turpis. Phasellus malesuada nec enim quis porttitor. Sed eu nisl in quam dignissim pretium. Curabitur placerat id tellus sit amet bibendum. Maecenas id massa tincidunt, elementum mauris eget, auctor ante. Nunc nulla odio, fringilla ac lacus ac, aliquet egestas odio. Nunc sagittis nulla nulla, ac pretium enim elementum vel. Cras elit quam, mattis sed sapien sit amet, auctor ultricies odio. Suspendisse vitae vehicula nunc, nec rutrum sem. Praesent in lobortis nisi, nec facilisis libero. Nam volutpat leo at nisl dapibus efficitur quis id mauris.',
        },
    ];

    const [currentVideo, setCurrentVideo] = useState(videos[0]);
    const videoRef = useRef<HTMLDivElement>(null); // Create a ref for the video container

    const handleVideoChange = (video: Video) => {
        setCurrentVideo(video);
        if (videoRef.current) {
            videoRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to video
        }
    };

    return (
        <Container className="text-center">
            <Row className="mb-4">
                <Col xs={12} md={8}>
                    <Card ref={videoRef}>
                        <Card.Title style={{ paddingBlock: "30px", fontWeight: "700", color: "rgb(0,200,250)", fontSize: "28px" }}>{currentVideo.videoName}</Card.Title>
                        <iframe
                            src={`https://www.youtube.com/embed/${currentVideo.videoUrl}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}
                        ></iframe>
                        <Card.Text style={{ padding: "20px" }}>{currentVideo.comment}</Card.Text>
                    </Card>
                </Col>

                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>Aulas</Card.Header>
                        <Table striped bordered hover>
                            <tbody>
                                {videos.map((video, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => handleVideoChange(video)} // Use the new function to change video
                                                className="w-100"
                                                active={currentVideo.videoUrl === video.videoUrl}
                                            >
                                                {video.videoName}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VideoContainer;