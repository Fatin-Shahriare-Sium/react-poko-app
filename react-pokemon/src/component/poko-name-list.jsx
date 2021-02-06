import React from 'react'
import axios from 'axios'
import Loading from './loading'
class PokoList extends React.Component{
    state={
        data:'',
        isLoading:true,
        serachV:'',
        findex:1,
        lindex:20,
        page:1,
        pagination:true
    }
    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=200')
        .then(res=>{
            console.log(res);
            this.setState({data:res.data.results,isLoading:false})
            setTimeout(() => {
                console.log(this.state.data);
            }, 1000);
        })
    }
    search=(event)=>{
        if(event.target.value===''){
            this.setState({pagination:true,serachV:''})
        }else{
            this.setState({serachV:event.target.value,pagination:false})
        }
            
     
    }
    next=()=>{
        if(this.state.page!==this.state.data.length/20){
            this.setState((state)=>{
                return {findex:state.findex+=20,lindex:state.lindex+=20,page:state.page+=1}
            })
        }
        
    }
    prev=()=>{
        if(this.state.page!==1){
            this.setState((state)=>{
                return {findex:state.findex-=20,lindex:state.lindex-=20,page:state.page-=1}
            })
        }
        
    }
    show=()=>{
        if(this.state.serachV===''){
            
            let list=this.state.data.slice(this.state.findex,this.state.lindex)
            return (<div>
                     <ul>
                     {
                      list.map(sig=>(<li>{sig.name}</li>))
                     }
                    </ul>
            </div>)
        }else{
            
            let take=this.state.data.filter(sig =>sig.name.toLowerCase().includes(this.state.serachV.toLowerCase()))
            
            return (
                <div>
                 <ul>
                 {
                  take.map(sig=>(<li>{sig.name}</li>))
                 }
                </ul>
        </div>
            )
        }
       
    }
    render(){
        return(
            
            (
                this.state.isLoading ? <Loading/> : <div>
                    <p>Pokemon List</p>
                    <input className='form-control' onChange={(event)=>this.search(event)}/>
                    {this.show()}
                    <div className='pagination' style={(this.state.pagination?{display:'flex'}:{display:'none'})}  >
                    <button className='btn btn-dark' onClick={this.prev}>Previous</button>
                    <p>{this.state.page} 0f {this.state.data.length/20}</p>
                    <button className='btn btn-dark' onClick={this.next}>Next</button>
                    </div>
                </div>
            )
                
            
        
        )
    }
}
export default PokoList;