import React from 'react'

let Message=(props)=>{
let value=props.formMessage ? 'Valid' : 'Invalid';
return (<h3 className="center">{value}</h3>);
}

export default Message;