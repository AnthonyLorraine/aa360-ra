import {Link, Outlet} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import brandImage from "../static/media/logo512.png";
import {Button, Nav, NavDropdown} from "react-bootstrap";

const Layout = () => {
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to={"/aa360-ra"}>
                        <img
                            alt="Automation Anywhere Guides Logo"
                            src={brandImage}
                            width="30"
                            height="30"
                            className="d-inline-block align-top me-3"
                        />
                        A360 Guides
                    </Navbar.Brand>
                    <Nav className="me-auto ms-5">
                        <Nav.Link as={Link} to={"/aa360-ra"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/aa360-ra/date-time-formats"}>DateTime Formats</Nav.Link>
                        <Nav.Link href="/aa360-ra">Guides</Nav.Link>
                    </Nav>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button className="btn btn-link nav-link py-2 px-0 px-lg-2 d-flex align-items-center" id="theme-selector" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static"
                                    aria-label="Toggle theme">
                                <i className="bi bi-sun-fill" id="current-theme-icon"></i>
                                <span className="d-lg-none ms-2" id="toggle-theme-text">Toggle theme</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="toggle-theme-text">
                                <li>
                                    <button type="button" className="dropdown-item d-flex align-items-center active" data-bs-theme-value="light" aria-pressed="true">
                                        <i className="bi bi-sun-fill me-2 opacity-50"></i>
                                        Light
                                        <i className="bi bi-check2 ms-auto"></i>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                                        <i className="bi bi-moon-stars-fill me-2 opacity-50"></i>
                                        Dark
                                        <i className="bi bi-check2 ms-auto"></i>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="auto" aria-pressed="false">
                                        <i className="bi bi-circle-half me-2 opacity-50"></i>
                                        Auto
                                        <i className="bi bi-check2 ms-auto"></i>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Container>
            </Navbar>
            <Container className={"mt-5"}>
                <Outlet/>
            </Container>
        </>
    )
};

export default Layout;