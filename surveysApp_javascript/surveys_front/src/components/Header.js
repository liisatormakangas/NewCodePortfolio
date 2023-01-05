import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../styling/landingPage.css';

const Header = () => {
    return (
        <Navbar className="navbar" variant="dark">
            <Container>
                <Navbar.Brand>SurveysApp!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/create">Create/Modify</Nav.Link>
                        <Nav.Link href="/answer">Answer</Nav.Link>
                        <Nav.Link href="/results">Results</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
export default Header;