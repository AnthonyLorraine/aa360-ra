import {Card, CardBody, Col, Row} from "react-bootstrap";
import {getNodeInformation} from "../functions/Nodes";
import PropertiesContext from "../context/PropertiesContext";
import {useContext} from "react";

const NodeRenderer = ({node}) => {
    let nodeData = getNodeInformation(node)
    let buttonWidth = node.disabled ? 60 : 20
    const { updateCurrentProperty } = useContext(PropertiesContext);

    const handleOnClick = (node) => {
        updateCurrentProperty(node)
    }

    return (
        <>
            <Card className={node.disabled ? "bg-disabled text-body-secondary fst-italic mb-1" : "mb-1"} onClick={()=>handleOnClick(node)}>
                <CardBody className={"p-1 ps-3"}>
                    <Row>
                        {nodeData.informationHtml}
                        <Col style={{maxWidth: buttonWidth + "px"}} className={"text-end me-3 p-0"}>{node.disabled && <i className="bi bi-slash-circle mx-2"></i>}<i className="bi bi-three-dots-vertical"></i></Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}


export default NodeRenderer;