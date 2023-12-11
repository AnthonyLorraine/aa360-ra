import {Card, CardBody, Col, Row} from "react-bootstrap";
import {getIconByType} from "../functions/Icons";

const NodeRenderer = ({node}) => {
    let friendlyName = node?.packageName.toLowerCase() === node?.commandName.toLowerCase() ? node.packageName : node?.packageName + ": " + node?.commandName
    let icon = getIconByType(node.packageName)
    icon = icon + " me-2"

    return (
        <>
            <Card className={node.disabled ? "bg-disabled text-body-secondary fst-italic mb-2" : "mb-2"}>
                <CardBody className={"p-1 ps-3"}>
                    <Row className={""}>
                        <Col sm={5} className={"text-capitalize"}><i className={icon}></i>{friendlyName}</Col>
                        <Col>A</Col>
                        <Col sm={1} className={"text-end me-2"}>{node.disabled && <i className="bi bi-slash-circle me-2"></i>}<i className="bi bi-three-dots-vertical"></i></Col>
                    </Row>
                </CardBody>
            </Card>


        </>
    )
}


export default NodeRenderer;