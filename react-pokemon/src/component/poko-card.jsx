import React, { createRef } from 'react'
import Loading from './loading'
import axios from 'axios'
class Pokocard extends React.Component{
    state={
        search:'pikachu',
        data:'',
        isLoading:true
        
    }
    go=createRef()
    searchValue=(event)=>{
        if(event.key==='Enter'){
            this.setState({search:event.target.value,isLoading:true})
            
        }
        setTimeout(()=>{
            console.log(this.state.search);
        },1000)
    }
    componentDidMount(){
        
        // let searchapi=process.env.REACT_APP_SEARAPI
        // console.log(searchapi);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
        .then(res=>{
            console.log(res);
            this.setState({data:res.data,isLoading:false})
        })
    }
    componentDidUpdate(preP,preS){
        if(preS.search!==this.state.search){
            console.log('componentDidUpdate');
            axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`)
        .then(res=>{
            console.log(res);
            this.setState({data:res.data,isLoading:false})
        })
        }
        console.log(this.go)
    }
    goTop=()=>{
        window.scroll(0,0)
    }
    
    render(){
        return(
            (this.state.isLoading?<Loading/>:( 
            <>
             <div className='mt-3'>
                <input placeholder='Seacrh Your Pokemon' className='form-control mx-auto' style={{width:'570px'}} onKeyPress={(event)=>this.searchValue(event)}/>
            </div>
            <div>
    <div className="card" style={{width: '18rem'}}>
    <img src={this.state.data.sprites.front_shiny} className="card-img-top" alt="..."/>
    <div className="card-body">
    <p className="card-text">I am {`${this.state.data.name}`}.</p>
    <div className='ability' style={{borderBottom:'2px solid black'}}>
    <p style={{fontWeight:'bold'}}>Ability</p>
    <ul>
    {
    this.state.data.abilities.map(sig =>
        <li>{sig.ability.name}</li>)
    }



    </ul>
    </div>
    <p style={{fontWeight:'bold'}}>Moves of {`${this.state.data.name}`}</p>
    <div>
    {this.state.data.moves.map(sig=>(<li style={{color:'black'}}>{sig.move.name}</li>))}
    </div>
    </div>
    </div>  

    </div>
    <button onClick={this.goTop} ref={this.go}>Go to the top</button>
            </>
    )))
        
}
}
export default Pokocard;


