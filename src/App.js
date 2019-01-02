import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import axios from 'axios';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = { 
    monedas: [],
    cotizacion: {},
    monedaCotizada: '', 
    cargando: false
  }

  async componentDidMount() { 
    this.obtenerMonedas();
  }

  obtenerMonedas = async () => { 
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    await axios.get(url)
      .then(respuesta  => {         
        this.setState({ 
          monedas: respuesta.data.data
        })      
      })
      .catch( error => { 
        console.log(error);        
      })
  }

  /// cotizar una cryptop en base a una moneda
  obtenerValoresCrypto = async (monedas) =>  { 
    
    const {moneda, crypto } = monedas;
    
    const url = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${moneda}`;

    await axios.get(url) 
    .then(respuesta => {  
      this.setState({
        cargando: true
      })    
        setTimeout(() => {         
          this.setState({ 
            cotizacion: respuesta.data.data, 
            monedaCotizada: moneda,
            cargando: false
          })
        }, 3000);
    })
  }

  render() {
    const cargando = this.state.cargando;

    let resultado; 

    if(cargando) { 
      resultado = <div class="spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                  </div>
    } else  { 
       resultado = <Resultado 
                   cotizacion={this.state.cotizacion}
                   monedaCotizada={this.state.monedaCotizada}
                   />
    }

    return (
      <div className="App"> 
        <Header 
          titulo ="Cotiza Criptomonedas al instante"
        />
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light pb-4 contenido-principal">
            <Formulario 
              monedasForm={this.state.monedas}
              obtenerValoresCrypto={this.obtenerValoresCrypto}
            />
            {resultado}
          </div>
        </div>   
      </div>
    );
  }
}

export default App;
