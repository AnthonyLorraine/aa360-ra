import {Link, Outlet} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import brandImage from "../static/media/logo512.png";
import {Dropdown, Nav} from "react-bootstrap";
import {getPreferredTheme, setTheme, showActiveTheme} from "../static/darkMode";

const Layout = () => {
    const setThemeReactButton = (event) => {
        let toggle = event.target
        const theme = toggle.getAttribute('data-bs-theme-value')
        localStorage.setItem('theme', theme)
        setTheme(theme)
        showActiveTheme(theme, true)
    }
    let currentTheme = getPreferredTheme()
    let currentThemeIcon = ""
    switch (currentTheme) {
        case "dark":
            currentThemeIcon = "bi-moon-stars-fill"
            break;
        case "light":
            currentThemeIcon = "bi-sun-fill"
            break;
        case "auto":
            currentThemeIcon = "bi-circle-half"
            break;
        default:
            currentThemeIcon = "bi-sun-fill"
            break
    }

    return (
        <>
            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>
                        <img
                            alt="Automation Anywhere Guides Logo"
                            src={brandImage}
                            width="30"
                            height="30"
                            className="d-inline-block align-top me-3"
                        />
                        A360 Guides
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <div className={"d-flex flex-column flex-md-row w-100 justify-content-md-between"}>
                            <Nav>
                                <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                                <Nav.Link as={Link} to={"/date-time-formats"}>DateTime Formats</Nav.Link>
                                <Nav.Link as={Link} to="/guides">Guides</Nav.Link>
                                <Nav.Link as={Link} to="/code-viewer">Code Viewer</Nav.Link>
                            </Nav>
                            <Nav className={"mb-2 mb-lg-0"}>
                                <Dropdown>
                                    <Dropdown.Toggle as={'li'}
                                                     className={"nav-link"}
                                                     bsPrefix={"dropdown"}
                                                     id="theme-selector"
                                                     data-bs-display="static"
                                                     aria-label="Toggle theme"
                                    >
                                        <i className={"d-none d-md-block bi " + currentThemeIcon} id="current-theme-icon"></i>
                                        <span className="d-md-none ms-md-2" id="toggle-theme-text">Toggle theme</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as={"ul"} align={"end"} aria-labelledby="toggle-theme-text">
                                        <Dropdown.Item as={'button'} className={"dropdown-item d-flex align-items-center"}
                                                       data-bs-theme-value="light"
                                                       onClick={setThemeReactButton}>
                                            <i className="bi bi-sun-fill me-2 opacity-50"></i>
                                            Light
                                            {currentTheme === "light" ?
                                                <i className="bi bi-check2 ms-auto"></i> : <i className="bi bi-check2 ms-auto d-none"></i>}
                                        </Dropdown.Item>
                                        <Dropdown.Item as={'button'} className={"dropdown-item d-flex align-items-center"}
                                                       data-bs-theme-value="dark"
                                                       onClick={setThemeReactButton}>
                                            <i className="bi bi-moon-stars-fill me-2 opacity-50"></i>
                                            Dark
                                            {currentTheme === "dark" ?
                                                <i className="bi bi-check2 ms-auto"></i> : <i className="bi bi-check2 ms-auto d-none"></i>}
                                        </Dropdown.Item>
                                        <Dropdown.Item as={'button'} className={"dropdown-item d-flex align-items-center"}
                                                       data-bs-theme-value="auto"
                                                       onClick={setThemeReactButton}>
                                            <i className="bi bi-circle-half me-2 opacity-50"></i>
                                            Auto
                                            {currentTheme === "auto" ?
                                                <i className="bi bi-check2 ms-auto"></i> : <i className="bi bi-check2 ms-auto d-none"></i>}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid={"md-fluid px-md-2"} className={"mt-md-3"}>
                <Outlet/>
            </Container>
        </>
    )
};

export default Layout;