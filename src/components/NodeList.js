import Node from "./Node";

const NodeList = ({nodes}) => {

    return (
        <ul className={"list-unstyled ms-5"}>
            {nodes.map((node) =>(
                    <Node key={node.uid} node={node}/>
            ))}
        </ul>
    )
}


export default NodeList;