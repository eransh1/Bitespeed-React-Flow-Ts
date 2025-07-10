
const nodeTypeData={
    message:{title:'Send Message',bgColor:'#b2f0e5',value:'test message'}
};
export function getId (nodeType,count){
    return `${nodeType} ${count}`
};

export function returnInfoForNode(nodeType,count){
    return {...nodeTypeData[nodeType],value:`${nodeTypeData[nodeType].value} ${count}`,type:nodeType,id:getId(nodeType,count)}
}

export function getNumberOfNodesAvailableForParticularNodeType(arr,type){
return (arr.filter((node)=>node?.data?.type===type).length)+1
}