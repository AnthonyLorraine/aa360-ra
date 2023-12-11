import VariableRenderer from "./VariableRenderer";

const VariableList = ({variables}) => {
    // Separate the variables into groups
    const inputs = variables.filter((variable) => variable.input);
    const outputs = variables.filter((variable) => variable.output);
    const otherVariables = variables.filter((variable) => !variable.input && !variable.output);

    return (
        <>
            <div>
                <h5>Inputs</h5>
                <ul className={"list-unstyled fw-normal pb-1 small"}>
                    {inputs.map((variable, idx) => (
                        <VariableRenderer key={idx} index={idx} variable={variable}/>
                    ))}
                </ul>
            </div>
            <div>
                <h5>Outputs</h5>
                <ul className={"list-unstyled fw-normal pb-1 small"}>
                    {outputs.map((variable, idx) => (
                        <VariableRenderer key={idx} index={idx} variable={variable}/>
                    ))}
                </ul>
            </div>
            <div>
                <h5>Task Variables</h5>
                <ul className={"list-unstyled fw-normal pb-1 small"}>
                    {otherVariables.map((variable, idx) => (
                        <VariableRenderer key={idx} index={idx} variable={variable}/>
                    ))}
                </ul>
            </div>
        </>

    )
}


export default VariableList;