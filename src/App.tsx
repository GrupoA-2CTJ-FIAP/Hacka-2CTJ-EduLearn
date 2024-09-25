import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" style={{marginInline:'30px'}}>
        <Navbar.Brand href="#">EduLearn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Apply ms-auto to align the links to the right */}
            <Nav.Link href="register.html">Cadastrar</Nav.Link>
            <Nav.Link href="login.html">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Hero Section */}
      <div style={{ backgroundColor: '#343a40', color: 'white', padding: '80px 20px', textAlign: 'center', borderBottom: '4px solid #007bff' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Bem-vindo ao EduLearn!</h1>
        <p style={{ fontSize: '1.2rem' }}>Gerencie seus vídeos educacionais de forma simples e eficiente.</p>
        <Button variant="primary" size="lg" className="mr-3" href="register.html" style={{ margin: '1em' }}>
          Cadastrar
          <svg style={{ fill: 'white', width: '30px', marginLeft: '6px' }}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
        </Button>
        <Button variant="secondary" size="lg" href="login.html">
          Login
          <svg style={{ fill: 'white', width: '30px', marginLeft: '6px' }}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>
        </Button>
      </div>

      {/* About Section */}
      <Container className="mt-5 "> {/* Make the container fluid */}
        <Row className="justify-content-md-center">
          <Col>
            <h2>Sobre a Plataforma</h2>
            <p>EduLearn é uma plataforma que conecta professores e alunos, permitindo que professores gerenciem seus vídeos educacionais de forma centralizada.</p>
            <p>Os alunos podem acessar facilmente os conteúdos dos seus professores, garantindo uma melhor experiência de aprendizado.</p>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: '#343a40', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: 'auto' }}>
        <p>&copy; 2024 EduLearn. Todos os direitos reservados.</p>
        <p>Desenvolvido pelo Grupo A para o Hackathon do curso de Pós-Graduação "Coding & Tech Journey" da FIAP. Setembro 2024</p>
      </footer>
    </div>
  );
};

export default App;