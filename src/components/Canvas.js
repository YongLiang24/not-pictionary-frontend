import React, { Component, Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';
// import Cable from './Cable';


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
      prevXArray: [],
      prevYArray: [],
      currXArray: [],
      currYArray: [],
      dot_flag: false,
      x: 'black',
      y: 2,
      width: 400, // make this a prop
      height: 400, // make this a prop
      // guessAnswer: ''
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
    //console.log('moving the mouse', action, event)
    this.findxy(action, event)

    if (action !== 'up') {this.sendDrawData()}

    // post updated state to API
  }

  sendDrawData = () => {
    const movement = {
      prevXArray: this.state.prevXArray,
      prevYArray: this.state.prevYArray,
      currXArray: this.state.currXArray,
      currYArray: this.state.currYArray,
    }

    fetch(API_ROOT + '/canvas', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(movement)
    })
      // .then(response)
  }

  findxy = (mouseAction, e) => {
    if (mouseAction == 'down') {
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
    } else if (mouseAction == 'up' || mouseAction == "out") {
        this.setState({flag: false})
    } else if (mouseAction == 'move' && this.state.flag) {
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
    this.state.ctx.strokeStyle = this.state.x; // update to not mutate state directly
    this.state.ctx.lineWidth = this.state.y; // update to not mutate state directly
    this.state.ctx.stroke();
    this.state.ctx.closePath();

    // store all
    const prevXArray = this.state.prevXArray.slice()
    prevXArray.push(this.state.prevX)
    const prevYArray = this.state.prevYArray.slice()
    prevYArray.push(this.state.prevY)
    const currXArray = this.state.currXArray.slice()
    currXArray.push(this.state.currX)
    const currYArray = this.state.currYArray.slice()
    currYArray.push(this.state.currY)

    this.setState({prevXArray, prevYArray, currXArray, currYArray})

  }

  handleReceivedDrawing = response => {
    //console.log('receiving drawing info', response)
    // this.draw(response)
    for(let i=0; i < response.currXArray.length; i++) {
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(response.prevXArray[i], response.prevYArray[i]);
      this.state.ctx.lineTo(response.currXArray[i], response.currYArray[i]);
      this.state.ctx.strokeStyle = this.state.x;
      this.state.ctx.lineWidth = this.state.y;
      this.state.ctx.stroke();
      this.state.ctx.closePath();
    }

  }

// handleGuessForm = (ev)=>{
//   ev.preventDefault()
//   //console.log(ev.target.guess.value)
//   this.setState({
//     guessAnswer: ev.target.guess.value
//   })
// }



  render() {
    if (this.props.isDrawing) {
      return (
        <Fragment>
          <canvas
           ref={this.canvasRef}
           onMouseMove={(event) => this.handleMouseMoves(event, 'move')}
           onMouseDown={(event) => this.handleMouseMoves(event, 'down')}
           onMouseUp={(event) => this.handleMouseMoves(event, 'up')}
           onMouseOut={(event) => this.handleMouseMoves(event, 'out')}
         />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <ActionCableConsumer
            channel={{channel: 'CanvasDrawingsChannel'}}
            onReceived={this.handleReceivedDrawing}
          />
          <canvas
            ref={this.canvasRef}
          />
        </Fragment>
      )
    }

  }}

export default Canvas;
