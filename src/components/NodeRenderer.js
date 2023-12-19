import {useContext} from "react";
import {Card, CardBody, Col, Row} from "react-bootstrap";
import {getAction} from "../functions/Actions";
import PropertiesContext from "../context/PropertiesContext";

const NodeRenderer = ({node, parentNode}) => {
    let action = getAction(node)
    const { updateCurrentProperty } = useContext(PropertiesContext);

    let disabledState = (action.disabled || parentNode.disabled) === true
    let buttonWidth = disabledState ? 60 : 20
    const handleOnClick = (actionNode) => {
        updateCurrentProperty(actionNode)
    }

    return (
        <>
            <Card className={disabledState ? "bg-disabled text-body-secondary fst-italic mb-1" : "mb-1 node-effect"} onClick={()=>handleOnClick(action)}>
                <CardBody className={"p-1 ps-3"}>
                    <Row>
                        {action.renderNode()}
                        <Col style={{maxWidth: buttonWidth + "px"}} className={"text-end me-3 p-0"}>{disabledState && <i className="bi bi-slash-circle mx-2"></i>}<i className="bi bi-three-dots-vertical"></i></Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}


export default NodeRenderer;