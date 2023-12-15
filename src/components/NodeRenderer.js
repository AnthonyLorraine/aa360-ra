import {Card, CardBody, Col, Row} from "react-bootstrap";
import {getNodeInformation} from "../functions/Nodes";
import PropertiesContext from "../context/PropertiesContext";
import {useContext} from "react";

const NodeRenderer = ({node, parentNode}) => {
    let nodeData = getNodeInformation(node)

    const { updateCurrentProperty } = useContext(PropertiesContext);

    let disabledState =(node.disabled || parentNode.disabled) === true
    let buttonWidth = disabledState ? 60 : 20
    const handleOnClick = (node) => {
        updateCurrentProperty(node)
    }

    return (
        <>
            <Card className={disabledState ? "bg-disabled text-body-secondary fst-italic mb-1" : "mb-1 node-effect"} onClick={()=>handleOnClick(node)}>
                <CardBody className={"p-1 ps-3"}>
                    <Row>
                        {nodeData.informationHtml}
                        <Col style={{maxWidth: buttonWidth + "px"}} className={"text-end me-3 p-0"}>{disabledState && <i className="bi bi-slash-circle mx-2"></i>}<i className="bi bi-three-dots-vertical"></i></Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}


export default NodeRenderer;