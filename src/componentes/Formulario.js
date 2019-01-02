import React, { Component } from 'react';
import OpcionSelect from './optionSelect';

class Formulario extends Component {

    monedaRef = React.createRef();
    criptoRef = React.createRef();

    cotizarMonedas = (e) => { 
        e.preventDefault();

        //crear el objeto
        const cotizacion = {
            moneda: this.monedaRef.current.value,
            crypto: this.criptoRef.current.value
        }        
        
        // enviar por props
        this.props.obtenerValoresCrypto(cotizacion);
    }

    render() {
        return (
            <form onSubmit={this.cotizarMonedas} >
                <div className="form-group">
                    <label>Moneda: </label>
                    <select ref={this.monedaRef} className="form-control">
                        <option value="" disabled defaultValue > Elige tu moneda </option>
                        <option value="USD">Dolar Estadounidense </option>
                        <option value="MXN">Peso Mexicano </option>
                        <option value="GBP">Libras </option>
                        <option value="EUR">Euros </option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Criptomoneda</label>
                    <select ref={this.criptoRef} className="form-control">
                       {
                           Object.keys(this.props.monedasForm).map( key => (
                               <OpcionSelect 
                                 key={key}
                                moneda={this.props.monedasForm[key]}
                               />
                           ))
                       }                                           
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Cotizar" />
                </div>
            </form>
        )
    }
}

export default Formulario;