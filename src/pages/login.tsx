import { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import Layout from "../components/layout";
import { useAuth } from "../hooks/useAuth"; // Import the custom useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const { signIn } = useAuth(); // Get the signIn function from useAuth
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Explicitly type the event parameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setLoading(true); // Show a loading state during the sign-in process
    setError(""); // Clear any previous errors

    const user = await signIn(email, password); // Call the signIn function

    if (user) {
        console.log(user)
      navigate("/dashboard"); // Redirect to the dashboard on successful login
    } else {
      setError("Failed to login. Please check your credentials.");
    }

    setLoading(false); // Stop the loading state
  };

  return (
    <Layout>
      <Container
        style={{
          margin: "60px",
          alignItems: "center",
          display: "flex",
          maxWidth: "95%",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        <h2>Acessar plataforma</h2>

        {/* Display an error message if login fails */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update the password state
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ marginBlock: "20px" }}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}