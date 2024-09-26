import { Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpIcon from '../assets/signup-icon';
import LoginIcon from '../assets/login-icon';
import Layout from '../components/layout';

function Home() {
    return (
        <Layout>
            <div style={{
                position: 'relative',
                padding: '80px 20px',
                textAlign: 'center',
                borderBottom: '4px solid #007bff',
                overflow: 'hidden', // Ensures that the overlay stays within bounds
            }}>
                <div style={{
                    backgroundImage: `url('https://media.giphy.com/media/7FrOU9tPbgAZtxV5mb/giphy.gif')`,
                    backgroundSize: 'cover',
                    height: '400px', // Fixed height for the GIF
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1
                }} />

                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity here
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '400px', // Match this height with the GIF
                    width: '100%',
                    zIndex: 2
                }} />

                <div style={{ position: 'relative', color: 'white', zIndex: 3 }}>
                    <h1 style={{ fontSize: '2.5rem' }}>Bem-vindo ao EduLearn!</h1>
                    <p style={{ fontSize: '1.2rem' }}>Gerencie seus vídeos educacionais de forma simples e eficiente.</p>
                    <Button variant="primary" size="lg" className="mr-3" style={{ margin: '1em' }} href="/register">
                        Cadastrar
                        <SignUpIcon />
                    </Button>
                    <Button variant="secondary" size="lg" href="/login">
                        Login
                        <LoginIcon />
                    </Button>
                </div>
            </div>
            <section style={{ paddingInline: "20%", paddingBlock: "80px", backgroundColor: "white", }}>
                <Row className="justify-content-md-center">
                    <Col>
                        <h2>Sobre a Plataforma</h2>
                        <p>EduLearn é uma plataforma que conecta professores e alunos, permitindo que professores gerenciem seus vídeos educacionais de forma centralizada.</p>
                        <p>Os alunos podem acessar facilmente os conteúdos dos seus professores, garantindo uma melhor experiência de aprendizado.</p>
                    </Col>
                </Row>
            </section>
            <section style={{ backgroundColor: "rgb(150, 220, 255)", paddingInline: "20%", paddingBlock: "80px" }}>
                <Row className="justify-content-md-center">
                    <Col style={{ textAlign: "right" }}>
                        <h2>Mentoria Exclusiva</h2>
                        <p>Crie seu cadastro e tenha todo o conteúdo do professor escolhido ao alcance de um botão.</p>
                        <p>Leia comentários do professor sobre o conteúdo das aulas!</p>
                    </Col>
                </Row>
            </section>
            <section style={{ paddingInline: "20%", paddingBlock: "80px", backgroundColor: "white", }}>
                <Row className="justify-content-md-center">
                    <Col>
                        <h2>Acesso Personalizado</h2>
                        <p>Assista aos videos exclusivamente do seu professor pessoal!</p>
                        <p>Aprendizado fácil, rápido e intuitivo.</p>
                    </Col>
                </Row>
            </section>
        </Layout>
    );
};

export default Home;