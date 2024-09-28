import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import Layout from "../components/layout";
import instance from '../services/supabase'

interface Teacher {
    id_usuario: string;
    nome_usuario: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isTeacher, setIsTeacher] = useState<boolean>(false);
    const [responsibleTeacher, setResponsibleTeacher] = useState<string>("");
    const [teachers, setTeachers] = useState<Teacher[]>([]); // State for teachers

    // Fetch teachers when component mounts
    useEffect(() => {
        const fetchTeachers = async () => {

            try {
                const response = await instance.get('/teacher');
                setTeachers(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching teachers:", error);
                alert("Erro ao buscar professores!");
            }
        };

        fetchTeachers();
    }, []);

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsTeacher(e.target.checked);
        setResponsibleTeacher(""); // Clear the selected teacher if the user toggles the switch
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await instance.post('signup', {
                "nome_usuario": username,
                "numero_documento": cpf,
                "email": email,
                "senha": password,
                "id_professor": isTeacher ? null : responsibleTeacher,
                "flag_professor": isTeacher
            })

            console.log("Registered successfully:");
            alert("Usuário cadastrado com sucesso!");
            navigate('/login');
        } catch (error) {
            console.error("Error registering:", error);
            alert("Erro ao cadastrar usuário!")
        }
    };

    return (
        <Layout>
            <Container style={{ marginBlock: "auto", maxWidth: "400px" }}>
                <Card style={{ padding: "20px" }}>
                    <Card.Title><h2>Cadastrar Usuário</h2></Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome Completo"
                                value={username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formIdentity">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email@exemplo.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                                style={{ marginBlock: "8px" }}
                            />
                            <Form.Select
                                aria-label="Selecione o professor responsável"
                                value={responsibleTeacher}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setResponsibleTeacher(e.target.value)}
                                disabled={isTeacher} // Disable if the user is a teacher
                                required={!isTeacher} // Require if the user is not a teacher
                            >
                                <option value="">Selecione o professor responsável</option>
                                {teachers.map(teacher => (
                                    <option key={teacher.id_usuario} value={teacher.id_usuario}>
                                        {teacher.nome_usuario}
                                    </option>
                                ))}

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