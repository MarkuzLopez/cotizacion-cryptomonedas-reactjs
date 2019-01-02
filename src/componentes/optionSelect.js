import React, { Component } from 'react';

class OpcionSelect extends Component { 
    
    render() {
         const {id, name} = this.props.moneda;
        return (
            <option value={id} >{name}</option>
        )
    }
}

export default OpcionSelect;