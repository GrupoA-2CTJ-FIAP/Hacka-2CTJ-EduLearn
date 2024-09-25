import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Layout from "../components/layout";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    const handleSwitchChange = () => {
        setIsTeacher((prev) => !prev); // Toggle the switch state
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        console.log("Registered:", { username, email, password });
    };

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
                <h2>Cadastrar Usuário</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome Completo"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formIdentity">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CPF"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

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

                    <Form.Group controlId="formTeacherFlag">
                        <Form.Check
                            type="switch"
                            id="teacher-switch"
                            label="Professor"
                            checked={isTeacher}
                            onChange={handleSwitchChange}
                        />
                        <Form.Select aria-label="Default select example" disabled={isTeacher}>
                            <option>Selecione o professor responsável</option>
                            <option value="1">Abobrinha</option>
                            <option value="2">Utonio</option>
                            <option value="3">Carvalho</option>
                            <option value="4">Girafales</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginBlock: "20px" }}>
                        Register
                    </Button>
                </Form>
            </Container>
        </Layout>
    );
};

export default Register;