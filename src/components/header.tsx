import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth"; // Import the useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Header = () => {
    const { user, signOut } = useAuth(); // Get user and signOut from the Auth context
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/");
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return (
        <Navbar bg="light" expand="lg" style={{ marginInline: '30px' }}>
            <Navbar.Brand href="/">EduLearn</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {user ? (
                        <>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Sair</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/register">Cadastrar</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;