(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){e.exports=a(59)},36:function(e,t,a){},37:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(27),s=a.n(c),i=(a(36),a(2)),l=a(3),o=a(5),u=a(4),m=a(6),d=(a(37),a(11)),h=a(10),g="http://pictionaries.herokuapp.com/",p={"Content-Type":"application/json",Accept:"application/json"},f=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={availableGames:[],gameName:"",redirect:!1,currentGameId:"",currentGameMode:""},a.handleAddGames=function(e){e.preventDefault();var t=JSON.parse(localStorage.getItem("playerData")).playerId,n=e.target.id;fetch("".concat(g,"/game/").concat(n),{method:"PATCH",headers:p,body:JSON.stringify({playerId:t})}).then(a.setState({redirect:!0,currentGameId:n,currentGameMode:"draw"}))},a.handleJoiningGame=function(e){var t=JSON.parse(localStorage.getItem("playerData")).playerId,n=e.target.id;fetch("".concat(g,"/game/").concat(n),{method:"PATCH",headers:p,body:JSON.stringify({playerId:t})}).then(a.setState({redirect:!0,currentGameId:n,currentGameMode:"guess"}))},a.renderRedirect=function(){if(a.state.redirect)return r.a.createElement(h.a,{to:"/".concat(a.state.currentGameId,"/").concat(a.state.currentGameMode)})},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(g,"/game")).then(function(e){return e.json()}).then(function(t){return e.setState({availableGames:t})})}},{key:"render",value:function(){var e=this;return r.a.createElement(n.Fragment,null,this.renderRedirect(),r.a.createElement("h3",null,"Available Games:"),r.a.createElement("div",{className:"game-card-container"},this.state.availableGames.map(function(t){return r.a.createElement("div",{key:t.id,value:t,className:"game-card"},r.a.createElement("h4",null,"Game: ",t.id),r.a.createElement("h4",null,"Name: ",t.name),r.a.createElement("p",null,"Drawer_Id: ",t.drawer_id),r.a.createElement("button",{id:t.id,name:t.id,onClick:e.handleJoiningGame,className:"button"},"Play as a guess role"),r.a.createElement("button",{id:t.id,name:t.id,onClick:e.handleAddGames,className:"button"},"Play as a draw role"))})))}}]),t}(n.Component),v=(a(14),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).intervalCanvasDraw=function(){fetch(g+"/canvas").then(function(e){return e.json()}).then(function(e){for(var t=0;t<e[0].currXArray.length;t++)a.state.ctx.beginPath(),a.state.ctx.moveTo(e[0].prevXArray[t],e[0].prevYArray[t]),a.state.ctx.lineTo(e[0].currXArray[t],e[0].currYArray[t]),a.state.ctx.strokeStyle=a.state.x,a.state.ctx.lineWidth=a.state.y,a.state.ctx.stroke(),a.state.ctx.closePath()})},a.handleMouseMoves=function(e,t){e.persist(),a.findxy(t,e)},a.sendDrawData=function(){var e={currentGameId:a.props.gameId,prevXArray:a.state.prevXArray,prevYArray:a.state.prevYArray,currXArray:a.state.currXArray,currYArray:a.state.currYArray};fetch(g+"/canvas/1",{method:"PATCH",headers:p,body:JSON.stringify(e)})},a.findxy=function(e,t){"down"==e?a.setState(function(e){return{prevX:e.currX,prevY:e.currY,currX:t.clientX-e.canvas.offsetLeft,currY:t.clientY-e.canvas.offsetTop,flag:!0,dot_flag:!0}},function(){a.state.dot_flag&&(a.state.ctx.beginPath(),a.state.ctx.fillStyle=a.state.x,a.state.ctx.fillRect(a.state.currX,a.state.currY,2,2),a.state.ctx.closePath(),a.setState({dot_flag:!1}))}):"up"==e?(a.setState({flag:!1}),a.sendDrawData()):"move"==e&&a.state.flag&&a.setState(function(e){return{prevX:e.currX,prevY:e.currY,currX:t.clientX-e.canvas.offsetLeft,currY:t.clientY-e.canvas.offsetTop}},function(){a.draw()})},a.draw=function(){a.state.ctx.beginPath(),a.state.ctx.moveTo(a.state.prevX,a.state.prevY),a.state.ctx.lineTo(a.state.currX,a.state.currY),a.state.ctx.strokeStyle=a.state.x,a.state.ctx.lineWidth=a.state.y,a.state.ctx.stroke(),a.state.ctx.closePath();var e=a.state.prevXArray.slice();e.push(a.state.prevX);var t=a.state.prevYArray.slice();t.push(a.state.prevY);var n=a.state.currXArray.slice();n.push(a.state.currX);var r=a.state.currYArray.slice();r.push(a.state.currY),a.setState({prevXArray:e,prevYArray:t,currXArray:n,currYArray:r})},a.handleClear=function(){fetch(g+"/canvas/1",{method:"PATCH",headers:p,body:JSON.stringify({prevX:1,isClear:"true"})}).then(function(e){return e.json()}).then(function(e){console.log("change currentGameId",e)}),setTimeout(window.location.reload(),2e3)},a.canvasRef=r.a.createRef(),a.state={canvas:!1,ctx:!1,drawingFlag:!1,prevX:0,currX:0,prevY:0,currY:0,prevXArray:[],prevYArray:[],currXArray:[],currYArray:[],dot_flag:!1,x:"black",y:2,width:400,height:400,emptyArray:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current,a=t.getContext("2d");t.width=this.state.width,t.height=this.state.height,this.setState({canvas:t,ctx:a},function(){e.state.ctx.fillStyle="lightgray",e.state.ctx.fillRect(20,20,e.state.canvas.width,e.state.canvas.height)}),setInterval(this.intervalCanvasDraw,4e3);fetch(g+"/canvas/1",{method:"PATCH",headers:p,body:JSON.stringify({prevX:1,isClear:"true"})}).then(function(e){return e.json()}).then(function(e){console.log("change currentGameId",e)})}},{key:"render",value:function(){var e=this;return this.props.isDrawing?r.a.createElement(n.Fragment,null,r.a.createElement("canvas",{ref:this.canvasRef,onMouseMove:function(t){return e.handleMouseMoves(t,"move")},onMouseDown:function(t){return e.handleMouseMoves(t,"down")},onMouseUp:function(t){return e.handleMouseMoves(t,"up")},onMouseOut:function(t){return e.handleMouseMoves(t,"out")}}),r.a.createElement("button",{onClick:this.handleClear},"ClearImage")):r.a.createElement(n.Fragment,null,r.a.createElement("canvas",{ref:this.canvasRef}))}}]),t}(r.a.Component)),y=a(13),E=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.handleForm,name:"guess"},r.a.createElement("label",null,"New Guess:",r.a.createElement("input",{type:"text",name:"guess",required:!0})),r.a.createElement("input",{type:"submit",value:"Submit"})))},b=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.handleForm,name:"answer"},r.a.createElement("label",null,"Your Answer:",r.a.createElement("input",{type:"text",name:"answer",required:!0})),r.a.createElement("input",{type:"submit",value:"Send"})))},w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleClick=function(e){var t=e.target.id,n=e.target.name,r=e.target.value;fetch(g+"/game/".concat(a.props.gameId),{method:"PATCH",headers:p,body:JSON.stringify({guessIdx:t,guessAction:n,guessText:r})})},a.updateList=function(){fetch(g+"/game/".concat(a.props.gameId)).then(function(e){return e.json()}).then(function(e){a.setState({guessList:e.guesses,rejectedGuesses:e.rejectList,guessValue:e.guessInput}),e.is_won&&(alert("We have a winner, thank you for playing."),window.location="http://localhost:3000/games")})},a.handleAccept=function(e){var t=e.target.name;fetch(g+"/game/".concat(a.props.gameId),{method:"PATCH",headers:p,body:JSON.stringify({isReject:!0,guessAction:t})})},a.state={guessList:[],rejectedGuesses:[],guessValue:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){fetch(g+"/game/".concat(this.props.gameId),{method:"PATCH",headers:p,body:JSON.stringify({isClear:"true"})}),setInterval(this.updateList,3e3)}},{key:"render",value:function(){var e=this;return this.props.isDrawing?(this.acc||(this.acc=null),r.a.createElement(n.Fragment,null,this.acc,r.a.createElement("h4",null,"Guess List"),r.a.createElement("ul",null,this.state.guessList.map(function(t,a){return r.a.createElement("li",{key:a},t,r.a.createElement("button",{id:a,name:"Accept",onClick:e.handleAccept,value:t},"Accept"),r.a.createElement("button",{id:a,name:"Reject",onClick:e.handleClick,value:t},"Reject"))})))):(this.acc||(this.acc=null),r.a.createElement(n.Fragment,null,this.acc,r.a.createElement("h4",null,"Rejected Guess List"),r.a.createElement("ul",null,this.state.rejectedGuesses.map(function(e,t){return r.a.createElement("li",{key:t,style:{textDecoration:"line-through"}},e)}))))}}]),t}(n.Component),O=(n.Component,function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).handleGameForms=function(t){if(t.preventDefault(),"answer"===t.target.name)console.log("answerForm check",t.target.answer.value),e.setState({answerInput:t.target.answer.value,hideAnswerForm:!0});else{var a,n=t.target.name,r=t.target[n].value,c=JSON.parse(localStorage.getItem("playerData")).playerId,s=t.target.guess.value;fetch(g+"/game/".concat(e.props.gameId),{method:"PATCH",headers:p,body:JSON.stringify((a={},Object(y.a)(a,n,r),Object(y.a)(a,"playerId",c),Object(y.a)(a,"type","form"),Object(y.a)(a,"guessInput",s),a))})}},e.state={answerInput:"",hideAnswerForm:!1,answerString:"Your Answer: "},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return this.props.isDrawing?r.a.createElement(n.Fragment,null,this.state.hideAnswerForm?r.a.createElement("div",null,this.state.answerString," ",r.a.createElement("strong",null,this.state.answerInput)):r.a.createElement(b,{handleForm:this.handleGameForms}),r.a.createElement(w,{gameId:this.props.gameId,isDrawing:this.props.isDrawing,gameOver:this.props.gameOver,endGame:this.props.endGame})):r.a.createElement(n.Fragment,null,r.a.createElement(E,{handleForm:this.handleGameForms}),r.a.createElement(w,{gameId:this.props.gameId,isDrawing:this.props.isDrawing,gameOver:this.props.gameOver,endGame:this.props.endGame}))}}]),t}(n.Component)),j=function(e){document.getElementById("root").classList.add("body-opacity");return"timeUp"===e.endCondition?r.a.createElement("div",{className:"endGame"},r.a.createElement("h3",null,"Game Over!"),r.a.createElement("h5",null,"You ran out of time.")):"rightAnswer"===e.endCondition?r.a.createElement("div",{className:"endGame"},r.a.createElement("h3",null,"You won! Great job!")):void 0},A=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).endGame=function(e){console.log("end game"),a.setState({gameOver:!0,endCondition:e});var t={is_active:!1,endCondition:e};"timeUp"===e?t.is_won=!1:"rightAnswer"===e&&(t.is_won=!0),fetch(g+"/game/".concat(a.props.gameId),{method:"PATCH",headers:p,body:JSON.stringify(t)}).then().then()},a.renderRedirect=function(){if(a.state.redirect)return r.a.createElement(h.a,{to:"/games"})},a.renderEndGame=function(){if(a.state.gameOver)return r.a.createElement(j,{endCondition:a.state.endCondition})},a.state={gameOver:!1,redirect:!1,endCondition:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return this.props.isDrawing?r.a.createElement("div",{className:"gameContainer"},this.renderEndGame(),r.a.createElement("h2",null,"You are... Drawing"),r.a.createElement(v,{gameId:this.props.gameId,isDrawing:!0}),r.a.createElement(O,{gameId:this.props.gameId,isDrawing:!0,gameOver:this.state.gameOver,endGame:this.endGame})):r.a.createElement("div",{className:"gameContainer"},this.renderEndGame(),r.a.createElement("h2",null,"You are... Guessing"),r.a.createElement(v,{gameId:this.props.gameId,isDrawing:!1}),r.a.createElement(O,{gameId:this.props.gameId,isDrawing:!1,endGame:this.endGame}))}}]),t}(n.Component),I=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={playerName:"",playerId:"",redirect:!1},a.handleForm=function(e){e.preventDefault(),console.log("logging in",e.target.login.value);var t=e.target.login.value;fetch("".concat(g,"/player"),{method:"POST",headers:p,body:JSON.stringify({name:t})}).then(function(e){return e.json()}).then(function(e){var t={name:e.name,id:e.id};console.log("before setting state"),a.setState({playerName:t.name,playerId:t.id,redirect:!0})})},a.renderRedirect=function(){if(a.state.redirect)return localStorage.setItem("playerData",JSON.stringify(a.state)),r.a.createElement(h.a,{to:"/games"})},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"login"},this.renderRedirect(),r.a.createElement("h1",null,"Welcome to Not-Pictionary Online"),r.a.createElement("h4",null,r.a.createElement("em",null,"Draw with your friends... or strangers!")),r.a.createElement("form",{onSubmit:this.handleForm},r.a.createElement("label",null,"Player Name:",r.a.createElement("input",{type:"text",name:"login",required:!0})),r.a.createElement("input",{type:"submit",value:"Play!"})))}}]),t}(n.Component),G=function(){return r.a.createElement("nav",{className:"topNav"},r.a.createElement("ul",{className:"navMenu"},r.a.createElement("li",null,r.a.createElement(d.b,{to:"/games",activeClassName:"active"},"All Games")),r.a.createElement("li",null,r.a.createElement(d.b,{to:"/",activeClassName:"active"},"Log-out"))),r.a.createElement("h2",null,"Not-Pictionary Online"))},C=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement(d.a,null,r.a.createElement(h.b,{exact:!0,path:"/",component:I}),r.a.createElement(h.b,{exact:!0,path:"/games",render:function(){return r.a.createElement(n.Fragment,null,r.a.createElement(G,null),r.a.createElement(f,null))}}),r.a.createElement(h.b,{exact:!0,path:"/:id/draw",render:function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(G,null),r.a.createElement(A,{gameId:e.match.params.id,isDrawing:!0}))}}),r.a.createElement(h.b,{exact:!0,path:"/:id/guess",render:function(e){return r.a.createElement(n.Fragment,null,r.a.createElement(G,null),r.a.createElement(A,{gameId:e.match.params.id,isDrawing:!1}))}})))}}]),t}(n.Component),S=a(30),x=a.n(S);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=x()({basename:"/not-pictionary-frontend"});s.a.render(r.a.createElement(h.c,{history:N},r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.24c59002.chunk.js.map