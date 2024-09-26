import { useState } from 'react';
import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Container, Card } from 'react-bootstrap';

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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="text-center">
            <div className="video-container mb-4" style={{ position: "relative", width: "100%" }}>
                <Card style={{ margin: "20px" }}>
                    <Card.Title style={{ paddingBlock: "30px" }}>{currentVideo.videoName}</Card.Title>
                    <iframe
                        src={`https://www.youtube.com/embed/${currentVideo.videoUrl}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: "100%", height: "100%", top: "0", left: "0", aspectRatio: "16/9" }}
                    ></iframe>
                    <Card.Text style={{ padding: "20px" }}>{currentVideo.comment}</Card.Text>
                    {/* Button to toggle the OffCanvas */}
                    <Button variant="primary" onClick={handleShow}>
                        Aulas
                    </Button>
                </Card>
            </div>

            {/* OffCanvas for video list */}
            <Offcanvas show={show} onHide={handleClose} placement="bottom">
                <OffcanvasHeader closeButton>
                    <Offcanvas.Title>Aulas</Offcanvas.Title>
                </OffcanvasHeader>
                <OffcanvasBody>
                    {videos.map((video, index) => (
                        <Button
                            key={index}
                            variant="outline-primary"
                            onClick={() => {
                                setCurrentVideo(video);
                                handleClose();  // Close the OffCanvas after selecting a video
                            }}
                            className="d-block mb-2"
                            active={currentVideo.videoUrl === video.videoUrl}
                        >
                            {video.videoName}
                        </Button>
                    ))}
                </OffcanvasBody>
            </Offcanvas>
        </Container>
    );
};

export default VideoContainer;
