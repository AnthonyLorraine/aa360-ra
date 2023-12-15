import NodeList from "./NodeList";
import NodeRenderer from "./NodeRenderer";

const Node = ({node, parentNode}) => {

    return (
        <>
            <li>
                <NodeRenderer node={node} parentNode={parentNode} />
                {
                    node?.children ?
                        (<NodeList nodes={node.children} parentNode={node}/>) : ("")
                }
                {
                    node?.branches ?
                        node.branches.map((branchNode, index) => (
                            <ul className={"list-unstyled"} key={index}>
                                <Node node={branchNode} parentNode={node}/>
                            </ul>
                        )) : ("")
                }
            </li>
        </>
    )
}

export default Node;