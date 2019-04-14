import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas'

class App extends Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     updatedMove: []
  //   }
  // }
  // autoDraw = ()=>{
  //   fetch('http://localhost:4000/draw')
  //   .then(resp => resp.json())
  //   .then(json =>{
  //     const canvas = document.getElementById('myCanvas');
  //     const ctx = canvas.getContext('2d');
  //     for(let i=0; i <json.data.movement.previousX.length; i++){
  //       console.log("i am",i)
  //        ctx.beginPath();
  //        ctx.moveTo(json.data.movement.previousX[i], json.data.movement.previousY[i]);
  //        ctx.lineTo(json.data.movement.currentX[i], json.data.movement.currentY[i]);
  //        ctx.strokeStyle = 'black';
  //        ctx.lineWidth = 2;
  //        ctx.stroke();
  //        ctx.closePath();
  //     }
  //   })
  // }
  autoDraw = () =>{
    console.log("test setinterval")
    fetch("http://localhost:4000/draw")
    .then(resp => resp.json())
    .then(json=>{
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      for(let i=0; i <json.data.movement.previousX.length; i++){
        // console.log("i am",i)
         ctx.beginPath();
         ctx.moveTo(json.data.movement.previousX[i], json.data.movement.previousY[i]);
         ctx.lineTo(json.data.movement.currentX[i], json.data.movement.currentY[i]);
         ctx.strokeStyle = 'black';
         ctx.lineWidth = 2;
         ctx.stroke();
         ctx.closePath();
       }
    })
  }



  render() {
    setInterval(()=>this.autoDraw(), 4000)
    return (
      <Fragment>

        <Canvas
          isDrawing={true}

        />
        <Canvas
          isDrawing={false}
        />

      </Fragment>
    );
  }
}

export default App;
