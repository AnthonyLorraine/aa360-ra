import {getPropertyInformation} from "../functions/Properties";
import {useContext} from "react";
import PropertiesContext from "../context/PropertiesContext";
import {Col} from "react-bootstrap";

const PropertyRenderer = () => {
    let property = getPropertyInformation(useContext(PropertiesContext).currentProperty)

    return (
        <Col className={"container"}>
            {property.htmlElement}
        </Col>
    )
}


export default PropertyRenderer;