import { Navbar, Nav } from "react-bootstrap"

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" style={{ marginInline: '30px' }}>
            <Navbar.Brand href="/">EduLearn</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto"> {/* Apply ms-auto to align the links to the right */}
                    <Nav.Link href="register">Cadastrar</Nav.Link>
                    <Nav.Link href="login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header