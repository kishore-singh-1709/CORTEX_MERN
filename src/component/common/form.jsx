import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = { 
        data: {},
        errors:{}
     }
    
     handleChange = (e) => {
        const { target:input } = e;
        const errors = {...this.state.errors};
        errors[input.name] = this.validateProperty(input);
        const data = {...this.state.data};
         data[input.name] = input.value;
         this.setState({ data, errors });
     }

     validateProperty = ({name, value}) => {
        const obj = {[name]: value}; //user input obj
        if(this.schema[name]) {
        const schema = {[name]: this.schema[name] }; // obj schema for exact field
        const {error} = Joi.validate(obj,schema);
        return error ? error.details[0].message : null;
        }
     }

     validate = () =>{
        const errors = {};
        const optional = {abortEarly: false};
        const {error} = Joi.validate( this.state.data, this.schema, optional);
        if(error) {
            for(let e of error.details){
                console.log(`${e.path} : ${e.message}`);
                errors[e.path] = e.message;
            }
        }
        return Object.keys(errors).length === 0 ? null : errors; // validation methods must send error or null
     }

     handleSubmit = (e) =>{
        e.preventDefault();
        const errors = this.validate(); //Form Validation
        this.setState({ errors: errors || {} }); //validation return -> null handling done here
        this.doSubmit();
    }

    renderFormButton = (label) => {
        return <button type="submit" className="btn btn-primary" >{label}</button>;
    }

    renderInput = ( name, label, type='text' ) => {
        //Default type -> Text
        const { data, errors } = this.state;
        return <Input 
                type={type}
                name={name}
                label={label} 
                value={data[name]} 
                error={errors[name]} 
                onChange={this.handleChange} />;
    }

    renderSelect = (name, label, options) => {
        const {data, errors} = this.state;
        return <Select
                    name={name}
                    value={data[name]}
                    label={label}
                    options={options}
                    onChange={this.handleChange}
                    error={errors[name]} />;
    }
}
 
export default Form;