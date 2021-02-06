import React from 'react'

import Pokocard from './poko-card'
import PokoList from './poko-name-list'
class App extends React.Component{
    state={
        value:''
    }
    
    render(){
        return(
            <>
           <h2 style={{fontWeight:'bold',textAlign:'center'}}>Pokemon Book </h2>
            <div  className='container mt-3'>
                <div className='row'>
                <div style={{borderRight:'2px solid black'}} className='col-md-4 offset-md-2 '>
                
                    <PokoList/>
                </div>
                <div className='col-md-4 offset-md-1 '>
                <Pokocard value={this.state.value}/>
                </div>
                </div>
                
            </div>
            </>
        )
    }
}
export default App;