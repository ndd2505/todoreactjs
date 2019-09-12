import React from 'react';
import './App.css';
import Clock from './clock.js';
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {List: [
      {thing:'wake up',complete: false, id: 1},
      {thing:'brushteeth',complete: false, id: 2},
       {thing:'go to work',complete: false, id: 3}
     ], adddata: '', deleted: [] };
    this.refbut = React.createRef();
    this.undotodo = this.undotodo.bind(this)
  }
  componentDidMount(){
    this.refbut.current.focus();
  }
  updating = (event) => {
    this.setState({
      adddata: event.target.value
    })
    
  }
  adding = () =>{
    var newid = this.state.List.slice().pop().id +1
    this.state.List.push({thing: this.state.adddata, complete: false, id: newid})
    this.state.deleted.splice(0, this.state.deleted.length)
    this.setState(this.state)
    console.log(...this.state.List)
    this.refbut.current.value = '' 
  }
  entering = (e)=> {
    if(e.keyCode === 13){
      this.adding()
    }
  }
  done(i){
    // var donestate = this.state.List.slice();
    // // donestate[i-1].complete = !this.state.List[i-1].complete; 
    // console.log(donestate.find(1).id);
    // this.setState({List: donestate})
    function donestate(list){
      return list.id === i;
    }
    var targetedid = this.state.List.find(donestate)
    targetedid.complete = !targetedid.complete
    this.setState(this.state)
    console.log(this.state.List.find(donestate))
  }
  deltodo(i){
    var delstate = this.state.List.splice(i, 1);
    this.state.deleted.push(...delstate);
    this.setState({List: this.state.List});
    console.log(...this.state.deleted)
  }
  delall(i){
    var delstate = this.state.List.splice(i, this.state.List.length);
    this.state.deleted.push(...delstate);
    this.setState({List: this.state.List});
    console.log(...this.state.deleted, this.state.List.length)
  }
  undotodo(){
    var limit = this.state.deleted.length -1;
    console.log(this.state.deleted[limit])
    this.state.List.push(this.state.deleted[limit])
    this.state.deleted.splice(limit, 1)
    this.state.List.sort(function(a,b){return a.id-b.id})
    this.setState(this.state)
  }

  render(){
    return(
      <div>
      <table className="table" >
        <thead>
          <tr>
            <th>List</th>
            <Controlbut delall={()=>{this.delall(0)}} clickundo={this.undotodo} disableundo={this.state.deleted.length===0}/>
          </tr>
        </thead>
        <tbody >
            {this.state.List.map((listtodo,index) => (
              <tr key={index}>
              <th style={{textDecoration: listtodo.complete ? 'line-through white' : ''}}>
                <h2>{listtodo.thing}</h2>
              </th>
              <Buttonact listtodo={listtodo} clickdone={()=>{this.done(listtodo.id)}} clickdel={()=>{this.deltodo(index)}}/>  
              </tr>
            )
            )}
          
          <tr>
              <Clock />
            <th>
              <Input reff={this.refbut} keydown={this.entering} changing={this.updating}/>
            </th>
          </tr>
          
          
        </tbody>
      </table>
      </div>
    )
  }
}
function Input(props){
  return(
    <input ref={props.reff} type='text' placeholder="What's your plan..." onKeyDown={props.keydown} onChange={props.changing}/>

  )
}
function Buttonact(props){
  return(
    <th>
        <button className={props.listtodo.complete ? 'btn btn-primary' : 'btn btn-warning'} onClick={props.clickdone}>{props.listtodo.complete ? 'Done' : 'Undone'}</button>
        <button className='btn btn-danger' onClick={props.clickdel}>Detele</button>
    </th>
  )
}
function Controlbut(props){
  return(
    <th>
    <button className='btn btn-light' disabled={props.disableundo} onClick={props.clickundo}>Undo</button>
    <button className='btn btn-danger' onClick={props.delall}>Deleteall</button>
    </th>
  )
}
export default App ;
