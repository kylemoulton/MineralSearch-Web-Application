import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputFormField from './common/InputFormField';
import { mineralSearchComplex } from '../actions';
import '../stylesheets/MineralSearchForm.css';

class MineralSearchForm extends Component {
    state = {
        categoriesRemaining: [
            "2v", 
            "Birefringence", 
            "Category", 
            "Class", 
            "Cleavage", 
            "Color", 
            "Crystal System", 
            "Dana", 
            "Diaphaneity", 
            "Dispersion", 
            "Fluorescence", 
            "Formula", 
            "Fracture", 
            "HM - Symbol", 
            "Habit", 
            "Luster", 
            "Mohs Hardness", 
            "Molar Mass", 
            "Name", 
            "Optical Properties", 
            "Pleochroism", 
            "Refractive", 
            "Solubility", 
            "Specific Gravity", 
            "Streak", 
            "Strunz", 
            "Symmetry", 
            "Tenacity", 
            "Twinning", 
            "Unit Cell"
        ],
        activeOptions: [],
        categorySelected: "select"        
    };

    handleSubmitSearch(formValues) {
        console.log(formValues);
        this.props.mineralSearchComplex(formValues);
    }

    handleChangeOption = (event) => {
        this.setState({
            categorySelected: event.target.value
        });    
    }

    renderCategoryOptions() {
        return this.state.categoriesRemaining.map(category => {
            return (<option key={category} value={category}>{category}</option>);
        });
    }

    renderSearchFields() {
        if (this.state.activeOptions.length > 0) {
            return this.state.activeOptions.map(category => {
                return (
                    <div key={`${category}Field`} className="fieldContainer">
                        <Field 
                            label={`${category}: `}
                            name={category}
                            component={InputFormField}
                        />
                        <button value={category} type="button" onClick={this.removeSearchField}>Remove Field</button>
                    </div>
                )
            });
        }
    }

    renderSubmitButton() {
        if (this.state.activeOptions.length > 0) {
            return <button type="submit">Search</button>;
        }
    }

    addSearchField = () => {
        if (this.state.categorySelected !== 'select') {
            let categoriesRemaining = this.state.categoriesRemaining;
            categoriesRemaining.splice(categoriesRemaining.indexOf(this.state.categorySelected), 1);
    
            let activeOptions = this.state.activeOptions;
            activeOptions.push(this.state.categorySelected);
    
            this.setState({
                activeOptions,
                categoriesRemaining,
                categorySelected: "select"
            });
        }
    }

    removeSearchField = (event) => {
        let activeOptions = this.state.activeOptions;
        activeOptions.splice(activeOptions.indexOf(event.target.value), 1);

        let categoriesRemaining = this.state.categoriesRemaining;
        categoriesRemaining.push(event.target.value);

        this.props.change(event.target.value, '');

        this.setState({
            activeOptions,
            categoriesRemaining: categoriesRemaining.sort()
        });
    };

    render() {
        return (
            <div className="mineralSearchContainer">
                <div>
                    <select 
                        label="Category"
                        name="categorySelect"
                        className="categorySelect"
                        value={this.state.categorySelected}
                        onChange={this.handleChangeOption}>
                        <option value="select">Select a category</option>
                        {this.renderCategoryOptions()}            
                    </select>
                    <button type="button" className="addSearchFieldBtn" onClick={this.addSearchField}>Add Search Field</button>
                </div>

                <form className="searchForm" onSubmit={this.props.handleSubmit(this.handleSubmitSearch.bind(this))}>
                    {this.renderSearchFields()}
                    {this.renderSubmitButton()}
                </form>

                <button onClick={() => console.log(this.props.minerals)}>Log minerals to console</button>
            </div>
        );
    }
}

function validate(values) {
    // return errors;
    return null;
}

function mapStateToProps(state) {
    return {
        minerals: state.minerals
    };
}

export default connect(mapStateToProps, { mineralSearchComplex })(reduxForm({
    validate,
    form: 'mineralSearchForm',
    // destroyOnUnmount: true
})(MineralSearchForm));