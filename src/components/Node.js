import NodeList from "./NodeList";
import NodeRenderer from "./NodeRenderer";

const Node = ({node}) => {

    return (
        <>
            <li>
                <NodeRenderer node={node}/>
                {
                    node?.children ?
                        (<NodeList nodes={node.children}/>) : ("")
                }
                {
                    node?.branches ?
                        node.branches.map((branchNode, index) => (
                            <Node key={index} node={branchNode}/>
                        )): ("")
                }
            </li>
        </>
    )
}

export default Node;