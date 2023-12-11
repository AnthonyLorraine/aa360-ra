import NodeList from "./NodeList";
import NodeRenderer from "./NodeRenderer";

const Node = ({node}) => {

    return (
        <>
            <NodeRenderer node={node}/>
            {
                node?.children ?
                    (<NodeList nodes={node.children}/>) : ("")
            }
        </>
    )
}


export default Node;