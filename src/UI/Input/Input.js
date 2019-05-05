import React from 'react';
import classes from './Input.css';

//A prototype of input component if there are more then one type of input
//In our case only one input type is there 
const Input=(props)=>{
    let inputClasses=[];
    if(!props.valid)
    inputClasses.push(classes.Invalid);
    //You can use switch case here and assign inputElement to corresponding input type
    let inputElement=<input 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        className={inputClasses.join('')}   
        />
    return (
        <div className="row">
            <div className="input-filed col s6 offset-s3">
                {inputElement}
            </div>
        </div>
    )

}

export default Input;