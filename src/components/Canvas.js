import React, { Component, Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
// import Cable from './Cable';
const API = "http://localhost:4000/draw";

class Canvas extends React.Component {
  constructor (props) {
    super(props);
    this.canvasRef = React.createRef()
    this.state = {
      canvas: false,
      ctx: false,
      drawingFlag: false,
      prevX: 0,
      currX: 0,
      prevY: 0,
      currY: 0,
      dot_flag: false,
      x: 'black',
      y: 2,
      width: 400, // make this a prop
      height: 400, // make this a prop
      prevxArray: [],
      prevyArray: [],
      currentxArray: [],
      currentyArray:[],
      movement: {
        previousX: [],
        previousY: [],
        currentX: [],
        currentY: []
      }
    }
  }

  componentDidMount() {
    // getting ref to canvas html element w React ref, update state
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d')

    // set canvas width / height using hard-coded state
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    this.setState(
      {canvas, ctx},
      // test data to fill the canvas w a rectangle
      () => {
        this.state.ctx.fillStyle = 'lightgray';
        this.state.ctx.fillRect(20, 20, this.state.canvas.width, this.state.canvas.height)}
    )
  }

  handleMouseMoves = (event, action) => {
    event.persist()
    // console.log('moving the mouse', action, event)
    this.findxy(action, event)
  }

  findxy = (mouseAction, e) => {
    if (mouseAction === 'down') {

      this.setState(
        (state) => {return {
          prevX: state.currX,
          prevY: state.currY,
          currX: e.clientX - state.canvas.offsetLeft,
          currY: e.clientY - state.canvas.offsetTop,
          flag: true,
          dot_flag: true
        }},
        () => {
          if (this.state.dot_flag) {
            this.state.ctx.beginPath();
            this.state.ctx.fillStyle = this.state.x;
            this.state.ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
            this.state.ctx.closePath();

            this.setState({dot_flag: false})
          }
        }
      )
    } else if (mouseAction === 'up' || mouseAction === "out") {
        let data = {flag: false,
          movement: {...this.state.movement,
          previousX: this.state.prevxArray,
          previousY: this.state.prevyArray,
          currentX: this.state.currentxArray,
          currentY: this.state.currentyArray
        }}
        this.setState(data)

        fetch(API,{
          method: "POST",
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            data
          })
        })

    } else if (mouseAction === 'move' && this.state.flag) {
      this.setState(
        (state) => {
          return {
            prevX: state.currX,
            prevY: state.currY,
            currX: e.clientX - state.canvas.offsetLeft,
            currY: e.clientY - state.canvas.offsetTop,
          }
        },
        () => {
          this.draw()
        }
      )
    }
  }

  draw = () => {
    this.state.ctx.beginPath();
    this.state.ctx.moveTo(this.state.prevX, this.state.prevY);
    this.state.ctx.lineTo(this.state.currX, this.state.currY);
    //get movement datas into an object of arrays

    //end
    this.state.ctx.strokeStyle = this.state.x;
    this.state.ctx.lineWidth = this.state.y;
    this.state.ctx.stroke();
    this.state.ctx.closePath();
    //console.log("check calls")
    this.state.prevxArray.push(this.state.prevX);
    this.state.prevyArray.push(this.state.prevY);
    this.state.currentxArray.push(this.state.currX);
    this.state.currentyArray.push(this.state.currY);

  }

  handleRedraw = () =>{
    fetch(API)
    .then(resp => resp.json())
    .then(json =>{
      //console.log('check this json', json.data.movement)

      for(let i=0; i <json.data.movement.previousX.length; i++){
        // console.log("i am",i)
         this.state.ctx.beginPath();

         this.state.ctx.moveTo(json.data.movement.previousX[i], json.data.movement.previousY[i]);

         this.state.ctx.lineTo(json.data.movement.currentX[i], json.data.movement.currentY[i]);

         this.state.ctx.strokeStyle = this.state.x;
         this.state.ctx.lineWidth = this.state.y;
         this.state.ctx.stroke();
         this.state.ctx.closePath();
      }
    })
  }

  render() {

    return (
      <Fragment>
        {
          this.props.isDrawing ? null : <input type="button" value="show drawing" onClick={this.handleRedraw}/>
        }
        {
          this.props.isDrawing ?
            <canvas
            ref={this.canvasRef}
            onMouseMove={(event) => this.handleMouseMoves(event, 'move')}
            onMouseDown={(event) => this.handleMouseMoves(event, 'down')}
            onMouseUp={(event) => this.handleMouseMoves(event, 'up')}
            onMouseOut={(event) => this.handleMouseMoves(event, 'out')}
            />
          :
            <canvas
              ref={this.canvasRef} id='myCanvas'
            />
        }
      </Fragment>
    );
  }}

export default Canvas;
