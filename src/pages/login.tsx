import { Button, Container, Form } from "react-bootstrap";
import Layout from "../components/layout";

export default function Login() {
    return (
        <Layout>
            <Container style={{
                margin: "60px",
                alignItems: "center",
                display: "flex", // Use flexbox
                maxWidth: "95%",
                flexDirection: "column", // Align items in a column
                justifyContent: "center", // Center items vertically
                textAlign: "left", // Center text
            }}>
                <h2>Acessar plataforma</h2>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email@exemplo.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginBlock: "20px" }}>
                        Login
                    </Button>
                </Form>
            </Container>

        </Layout>)
}