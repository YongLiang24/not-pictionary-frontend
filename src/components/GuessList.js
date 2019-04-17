import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
class GuessList extends Component{
 constructor(){
   super()
   this.state = {
    guessList: []
   }
 }

 componentDidMount(){
   fetch(API_ROOT+`/game/${this.props.gameId}`)
   .then(resp => resp.json())
   .then(json =>{
     // this.setState({
     //   guessList: json
     // })
     console.log("game",json)
   })
 }
render(){
  return(
    <div>
    <li>{this.props.inputList} </li>
    </div>
  )
}

}
export default GuessList
