import React from 'react';
import './App.css';

const Header = (props) => {
  console.log(props);
  const {title, totalPlayers} = props; //destruct assignment
  return (
      <header className="header">
        <h1 className="h1">{title}</h1>
        <span className="stats">Players: {totalPlayers}</span>
      </header>
  )
};

const Player = (props) => (
    <div className="player">
        <span className="player-name">
            <button className="remove-player" onClick={() => props.removePlayer(props.id)}>X</button>
          {props.name}
        </span>
      <Counter/>
    </div>
);

class Counter extends React.Component{
  constructor(){
    super();
    this.state = {
      score: 0
    };
    //this.incrementScore = this.incrementScore.bind(this);
  }

  //애로우펑션안의 this는 lexical this로써 자기자신을 가리키게 된다.
  handleScore = (delta) => {
    console.log('increment', this);

    // this.state.score += 1;
    // setState를 호출해야만 UI 렌더링이 된다.
    // this.setState({score: this.state.score + 1});
    this.setState(prevState => {
      return {score: prevState.score + delta}
    })
  }

  render() {
    return (
        <div className="counter">
          <button className="counter-action decrement" onClick={() => this.handleScore(-1)}> - </button>
          <span className="counter-score">{this.state.score}</span>
          <button className="counter-action increment" onClick={() => this.handleScore(1)}> + </button>
        </div>
    )
  }
}

class App extends React.Component {
  state = {
    players: [
      {name: 'LDK', id: 1},
      {name: 'HONG', id: 2},
      {name: 'KIM', id: 3},
      {name: 'PARK', id: 4},
    ]
  }

  handleRemovePlayer = (id) => {
    console.log('remove player', id);

    this.setState(prevState => ({
      players: prevState.players.filter(item => item.id !== id)
    }))
  }

  render() {
    return (
        <div className="scoreboard">
          <Header title="My Scoreboard" totalPlayers={11}/>
          {
            this.state.players.map(player => (
                <Player name={player.name} id={player.id} key={player.id}
                        removePlayer={this.handleRemovePlayer}/>
            ))
          }
        </div>
    )
  }
}

export default App;