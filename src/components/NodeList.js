import Node from "./Node";

const NodeList = ({nodes, parentNode}) => {

    return (
        <ul className={"list-unstyled ms-5"}>
            {nodes.map((node) =>(
                    <Node key={node.uid} node={node} parentNode={parentNode}/>
            ))}
        </ul>
    )
}


export default NodeList;