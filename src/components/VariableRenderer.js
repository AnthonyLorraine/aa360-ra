import {Dropdown, Nav, NavbarToggle, NavDropdown} from "react-bootstrap";
import {forwardRef} from "react";
import {getIconByType} from "../functions/Icons";

const VariableRenderer = ({variable, index}) => {

    const CustomDropdownToggle = forwardRef(({children, onClick}, ref) => (
        <a
            className={"text-muted"}
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    let variableIcon = getIconByType(variable.type.toString())
    variableIcon = variableIcon + " me-1";

    return (

        <li className="d-flex justify-content-between pe-3">
            <div className={"d-flex align-items-center"}>
                <i className={variableIcon}></i>
                <span className={"d-inline-block text-truncate small"} style={{maxWidth: 165 + "px"}} title={variable.name}>{variable.name}</span>
            </div>
            <Dropdown>
                <Dropdown.Toggle as={CustomDropdownToggle}
                                 className={"text-muted"}

                                 id={variable.type.toString() + "_" + index.toString()}>
                    <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header className={"text-body"}>
                        <div className={"fw-bold text-break text-wrap"} style={{maxWidth: 150 + "px"}}>{variable.name}</div>
                        <div className={"small fst-italic"}>{variable.description ? variable.description : "No Description"}</div>
                        <hr/>
                        <div className={"d-flex justify-content-between"}>
                            <div className={"small"}>Type</div>
                            <span className={"text-muted ps-2"}><i className={variableIcon}></i>{variable.type}</span>
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <div className={"small"}>Read Only</div>
                            <span className={"text-muted ps-2"}>{variable.readOnly ? "True" : "False"}</span>
                        </div>
                    </Dropdown.Header>
                </Dropdown.Menu>
            </Dropdown>
        </li>
    )
}


export default VariableRenderer;