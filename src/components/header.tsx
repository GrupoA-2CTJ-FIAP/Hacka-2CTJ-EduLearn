import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TeacherIcon from "../assets/teacher-icon";

const Header = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/");
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: '20px' }}>
            <Navbar.Brand href="/" style={{ fontWeight: "700", fontSize: "48px" }}>
                <span style={{ color: "rgb(0,200,250)" }}>Edu</span>
                <span style={{ color: "lightgrey" }}>Learn</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto" style={{ paddingBlock: "30px", fontSize: "18px" }}>
                    {user ? (
                        <>
                            {user.role === "teacher" && (
                                <div style={{ display: "flex", alignItems: "center", color: "cyan",margin:"8px" }}>
                                    <p style={{ margin: 0 }}>Prof.</p>
                                    <TeacherIcon color="cyan"/>
                                </div>
                            )}
                            <Nav.Link style={{ cursor: 'pointer', color: 'white' }}>{user.email}</Nav.Link>
                            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Sair</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/register">Cadastrar</Nav.Link>
                            <Nav.Link href="/login" style={{ cursor: 'pointer', color: 'cyan' }}>Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar> 
    );
};

export default Header;