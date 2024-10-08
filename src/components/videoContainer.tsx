import { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import VideoList from './videoList';
import VideoForm from './videoForm';
import instance from '../services/supabase';
import { useAuth } from "../hooks/useAuth";

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
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [teacherName, setTeacherName] = useState<string>('');
  const { checkSession, signOut } = useAuth();

  const fetchVideos = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem("sb-yhuhhyjrbuveavowpwlj-auth-token") || '""');
    if (token.user.role === "teacher") {
      setIsTeacher(true);
    }
    try {
      const response = await instance.get(`/videos/aluno`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      });
      const videoData = response.data.videos;
      setTeacherName(response.data.professor)
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
      const isSessionValid = await checkSession();
      if (!isSessionValid) {
        signOut();
      }
    } finally {
      setLoading(false);
    }
  }, [checkSession, signOut]); // Add the dependencies used inside the function

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]); // Now, fetchVideos is stable and can be safely added to the dependencies

  const handleRefresh = async () => {
    const isSessionValid = await checkSession();
    if (isSessionValid) {
      await fetchVideos();
    } else {
      signOut();
    }
  };

  const handleVideoChange = (video: Video) => {
    setCurrentVideo(video);
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
                    <VideoForm currentVideo={currentVideo} onSuccessfulAction={handleRefresh} />
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
            <VideoList
              videos={videos}
              currentVideo={currentVideo}
              handleVideoChange={handleVideoChange}
              isTeacher={isTeacher}
              teacherName={teacherName}
              onSuccessfulAction={handleRefresh}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VideoContainer;