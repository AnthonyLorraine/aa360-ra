export const getVariable = (variableName) => {
    variableName = variableName.replaceAll("$", "")
    let variableList = JSON.parse(localStorage.getItem('json_data')).variables
    for (let i = 0; i < variableList.length; i++) {
        if (variableList[i].name === variableName)
            return variableList[i]
    }
}