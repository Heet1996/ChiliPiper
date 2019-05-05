import React,{Component} from 'react';
import Input from '../UI/Input/Input';

class Form extends Component
{
    constructor()
    {   super();
        this.state={
            Form:{
                Name:{
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validity:{
                        valid:false,
                        required:true,
                        min:3,
                        max:30,
                        letters:false
                    }
                },
                Email:{
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                    value:'',
                    validity:{
                        valid:false,
                        required:true,
                        isEmail:true
                    }   
                },
                Phone:{
                    elementConfig:{
                        type:'number',
                        placeholder:'Your Phone Number'
                    },
                    value:'',
                    validity:{
                        valid:false,
                        required:true,
                        max:10,
                        min:10
                    }
                },
                Url:{
                    elementConfig:{
                        type:'url',
                        placeholder:'Your Blog Url'
                    },
                    value:'',
                    validity:{
                        valid:false,
                        required:true,
                        url:true
                    }
                }
            },
            isFormValid:false
        }
    }
    //Not written by me
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
    isValid(val,rules)
    {   let isValid=true; 
        //Validation is required or not but in our case everything required.       
        if(rules.required)
        isValid=val.trim()!=='' && isValid;
        //Validating Email
        if(rules.isEmail)
        isValid=val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && isValid;
        //Validation of name length
        if(rules.min)
        isValid=val.length>=rules.min && isValid;
        if(rules.max)
        isValid=val.length<=rules.max && isValid
        if(rules.url)
        isValid=this.validURL(val) && isValid;

        return isValid;
    }
   
    isFormValid(e,Form)
    {   e.preventDefault();
        let updateForm={...Form};
        let isFormValid=true;
        for(let key in updateForm)
        isFormValid=updateForm[key].validity.valid&&isFormValid
        this.setState({isFormValid:isFormValid});
        this.props.formMessage(isFormValid);
        
    }
    inputHandler(e,id)
    {
        let val=e.target.value;
        let updateForm={...this.state.Form};
        let updatedFormElement={...this.state.Form[id]};
        updatedFormElement.value=val;
        updatedFormElement.validity.valid=this.isValid(val,updatedFormElement.validity);
        updateForm[id]=updatedFormElement;
        this.setState({Form:updateForm});

    }
    render()
    {   const formElementsArray=[];
        for(let key in this.state.Form)
        formElementsArray.push({
            id:key,
            config:this.state.Form[key]
        })
        let form=(
        <form className="col s12" onSubmit={(e)=>this.isFormValid(e,this.state.Form)}>
            {formElementsArray.map((el)=>
                { 
                return (<Input
                key={el.id}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                valid={el.config.validity.valid}
                changed={(e)=>this.inputHandler(e,el.id)}
                />)}
            )}
            <div class="center">
            <button className="btn waves-effect waves-light" type="submit" name="action">Validate
                <i className="material-icons right">send</i>
            </button>
            </div>
        </form>
    )
        return(
            <div className="row">
                {/* If there are conditons then display something else other than form  */}
                {form}
            </div>
        )
    }
}

export default Form;