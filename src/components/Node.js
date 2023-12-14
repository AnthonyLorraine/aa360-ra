import NodeList from "./NodeList";
import NodeRenderer from "./NodeRenderer";

const Node = ({node}) => {

    return (
        <>
            <li>
                <NodeRenderer node={node} />
                {
                    node?.children ?
                        (<NodeList nodes={node.children} />) : ("")
                }
                {
                    node?.branches ?
                        node.branches.map((branchNode, index) => (
                            <ul className={"list-unstyled"} key={index}>
                                <Node node={branchNode} />
                            </ul>
                        )) : ("")
                }
            </li>
        </>
    )
}

export default Node;