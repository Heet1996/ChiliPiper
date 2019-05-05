import React,{Component} from 'react';
import HOC from './hoc/HOC';
import Form from './Component/Form';
import Message from './Component/Message';

class App extends Component {
  constructor()
  {
    super();
    this.state={isFormValid:false}
  }
  formMessage=(valid=false)=>{
    
    this.setState({isFormValid:valid});
  }
  render()
  {
    return (
      <div>
        <h3 className="center">A simple form</h3>
        <HOC>
          <Form formMessage={this.formMessage}></Form>
          <Message formMessage={this.state.isFormValid}></Message>
        </HOC>
      </div>
    )
  }
      
  
}

export default App;
