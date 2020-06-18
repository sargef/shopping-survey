import React, { Component } from 'react';
import './App.css';
import {Row, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import { withRouter } from 'react-router';
import Input from './Components/UI/Input/Input';

class VoteForm extends Component{
    constructor(props){
      super(props);

      // this.state = {
      //     name: '',
      //     email: '',
      //     gender: '',
      //     age: '',
      //     courses: [],
      //     note: '',
      //     complete: false,
      // }
      this.state = {
          controls:{
            name: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Enter your name...'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
              },
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'example@email.com'
              },
              value: '',
              validation: {
                required: true,
                isEmail: true
              },
              valid: false,
              touched: false
            },
            gender: {
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'Gender',
                options: [
                  {
                    value: 'Female',
                    displayValue: 'Female'
                  },
                  {
                    value: 'Male',
                    displayValue: 'Male'
                  },
                  {
                    value: 'Prefer not to say',
                    displayValue: 'Prefer not to say'
                  }
                ]
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            age: {
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'Age',
                options: [
                  {
                    value: 'Under 20',
                    displayValue: 'Under 20'
                  },
                  {
                    value: '20-29',
                    displayValue: '20-29'
                  },
                  {
                    value: '30-39',
                    displayValue: '30-39'
                  },
                  {
                    value: '40-49',
                    displayValue: '40-49'
                  },
                  {
                    value: 'Above 50',
                    displayValue: 'Above 50'
                  }
                ]
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
             question1: { 
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'Are you the main grocery shopper in your household?',
                options: [
                  {
                    value: 'Yes',
                    displayValue: 'Yes'
                  },
                  {
                    value: 'No',
                    displayValue: 'No'
                  }
                ]
              },
              value: [],
              validation: {
                required: true
              },
              valid: false,
              touched: false,
            },
            courses: {
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'How many times per week do you do grocery shopping?',
                options: [
                  {
                    value: '0-1',
                    displayValue: '0-1'
                  },
                  {
                    value: '2-3',
                    displayValue: '2-3'
                  },
                  {
                    value: '4-5',
                    displayValue: '4-5'
                  },
                  {
                    value: '6+',
                    displayValue: '6+'
                  }
                ]
              },
              value: [],
              validation: {
                required: true
              },
              valid: false,
              touched: false,
            },
            question3: {
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'Have you ever used technology to do your grocery shopping?',
                options: [
                  {
                    value: 'Yes',
                    displayValue: 'Yes'
                  },
                  {
                    value: 'No',
                    displayValue: 'No'
                  }
                ]
              },
              value: [],
              validation: {
                required: true
              },
              valid: false,
              touched: false,
            },
         },
        complete: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkComplete = this.checkComplete.bind(this);
  
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules){
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        
        if (rules.isEmail){
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    
    inputChangeHandler = (event, controlName) => {
      this.setState({validationState: null});
      let array;
      if (controlName === 'courses'){
        array = this.state.controls[controlName].value;
        array.indexOf(event.target.value) === -1? array.push(event.target.value):array.splice(array.indexOf(event.target.value), 1);
      }

      const updateControls = {
          ...this.state.controls,
          [controlName]: {
              ...this.state.controls[controlName],
              value: controlName === 'courses'? array : event.target.value,
              valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true
          }
      }
      this.setState({controls: updateControls});
  }
  
  handleChange(event){
    this.validationState();
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'courses'){
      value = this.state.courses;
      value.indexOf(target.value) === -1? value.push(target.value):value.splice(value.indexOf(target.value), 1);
    }

    this.setState({[name]: value});
  }
    validationState(){
        let count = 0;
        for (let key in this.state.controls){
          if (this.state.controls[key].validation.required && this.state.controls[key].valid){
            count++
          }
        } 
        return count >= 7? false : true;
    }
    checkComplete(event){        

      const emptyRemind = [];
        for (let item in this.state){
          if (this.state[item].length === 0 && item!== 'question1'){
            emptyRemind.push(item)
          }
        }
      if (emptyRemind.length > 0){
        this.setState({complete: false});
      }else {
        this.setState({complete: true});
      }
    }
    
    handleSubmit(e){
        alert('Successfully submitted, Thank you');
        const resultsArray = {};
        for (let key in this.state.controls){
          resultsArray[key] = this.state.controls[key].value;
        }
        e.preventDefault();
        this.props.addSurvey(resultsArray);
        this.props.history.push('/Thankyou');
    }

    render(){

      const formElementsArray = [];
      for (let key in this.state.controls){
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        })
      }
 
      let form = formElementsArray.map(formElement => {
    
        return(
          <FormGroup key={formElement.id}>
          <Row>

          <ControlLabel>{(() => { switch (formElement.id) {
            case "question1": 
            return "Are you the main grocery shopper in your household?"
            .toUpperCase();
            case "courses": 
            return "How many times per week do you do grocery shopping?"
            .toUpperCase();
            case "question3": 
            return "Have you ever used technology to do your grocery shopping?"
            .toUpperCase();
            default: return ((formElement.id)
            .toUpperCase())
            }
          })()}
          </ControlLabel>
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
          </Row>
          </FormGroup>
      );
    }
  );
        return(
          <Row>
            <form className="Form" onSubmit={(e) => {
              e.preventDefault();
               //eslint-disable-next-line
              if(confirm('Are you sure you want to submit?')){this.handleSubmit(e);}
            }}>
              {form}
              
              <Row>
              <Button className="button" bsSize="large" type="submit" block disabled={this.validationState()}> {/*disabled={this.validationState()}*/}
                SUBMIT
              </Button>
              </Row>
            </form>
          </Row>
        );
    }
}

export default withRouter(VoteForm);
