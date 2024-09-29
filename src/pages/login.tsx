import { useState } from "react";
import { Button, Container, Form, Alert, Card, Spinner } from "react-bootstrap";
import Layout from "../components/layout";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"; 

export default function Login() {
  const { signIn } = useAuth(); 
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(""); 

    const user = await signIn(email, password); 

    if (user) {
      console.log(user)
      navigate("/dashboard");
    } else {
      setError("Failed to login. Please check your credentials.");
    }

    setLoading(false); 
  };

  return (
    <Layout>
      <Container
        style={{
          marginBlock:"auto",
          maxWidth:"400px"
        }}
      >

        {error && <Alert variant="danger">{error}</Alert>}
        <Card style={{ padding: "20px" }}>
          <Card.Title><h2>Acessar plataforma</h2></Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{backgroundColor:"rgb(0, 200, 250)",width:"120px",marginInline:"auto",marginBlock:"20px"}}
              disabled={loading} 
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {' '}Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </Form>
        </Card>
      </Container>
    </Layout>
  );
}