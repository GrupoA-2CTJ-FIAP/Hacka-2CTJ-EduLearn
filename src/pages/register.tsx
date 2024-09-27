import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Layout from "../components/layout";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    const handleSwitchChange = () => {
        setIsTeacher((prev) => !prev);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registered:", { username, email, password });
    };

    return (
        <Layout>
            <Container style={{
                marginBlock: "auto",
                maxWidth: "400px"
            }}>
                <Card style={{ padding: "20px" }}>
                    <Card.Title><h2>Cadastrar Usuário</h2></Card.Title>
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
                                style={{marginBlock:"8px"}}
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
                            Cadastrar
                        </Button>
                    </Form>
                </Card>
            </Container>
        </Layout>
    );
};

export default Register;