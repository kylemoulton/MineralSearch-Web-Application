import React, { Component } from 'react';

class InputFormField extends Component {
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input {...this.props.input} />
                <div>
                    {this.props.touched && this.props.error}
                </div>
            </div>
        );
    }
}

export default InputFormField;