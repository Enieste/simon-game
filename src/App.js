import React from 'react';
import './App.css';
import waterfall from 'async/waterfall';
import Piesimon from './Piesimon';

const App = React.createClass({
  getInitialState() {
    return {
      gameStarted: false,
      steps: [],
      currentRound: 1,
      strictMode: false,
      userTurn: false,
      difficulty: 4,
      userClicksCounter: 0
    }
  },
  componentDidMount() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.audioCtx.createOscillator();
    this.gainNode = this.audioCtx.createGain();
    this.oscillator.type = 'sawtooth';
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
    this.gainNode.gain.value = 0;
    this.oscillator.start(0);
    this.freqValue = {
      0: 100,
      1: 200,
      2: 300,
      3: 400,
      4: 500,
      5: 600,
      6: 700,
      7: 800,
      8: 900,
      9: 1000
    };
  },
  startHandler() {
    this.setState({
      gameStarted: true
    });
    const game = Array.apply(null, Array(20)).map((_) => {
      return Math.floor(Math.random() * this.state.difficulty);
    });
    this.setState({
      steps: game
    }, () => this.play());
  },
  play() {
    if (this.state.currentRound === 21) {
      console.log("You win!");
      this.setState({
        gameStarted: false
      });
      return;
    }
    const currentSteps = this.state.steps.slice(0, this.state.currentRound).map((step, i) => {
      return (callback) => {
        this.timeoutHandler = setTimeout(() => {
          this.oscillator.frequency.value = this.freqValue[step];
          this.gainNode.gain.value = 0.02;
          this.setState({
            clicked: step
          });
          this.timeoutHandler = setTimeout(() => {
            this.gainNode.gain.value = 0;
            this.setState({
              clicked: false
            });
            callback();
          }, 500);
        }, 500);
      }
    });
    waterfall(currentSteps, () => {
      this.setState({
        userTurn: true
      })
    });
  },
  userClick(i) {
    const { steps, userClicksCounter, currentRound } = this.state;
    if (i === steps[userClicksCounter]) {
      this.setState({
        userClicksCounter: userClicksCounter + 1
      });
      if (userClicksCounter === currentRound - 1) {
        this.setState({
          userClicksCounter: 0,
          userTurn: false,
          currentRound: currentRound + 1
        }, () => this.play());
      }
    } else {
      this.setState({
        userClicksCounter: 0,
        userTurn: false
      }, () => this.play());
    }
  },
  mouseDown(i) {
    this.oscillator.frequency.value = this.freqValue[i];
    this.gainNode.gain.value = 0.02;
    this.setState({
      clicked: i
    });
  },
  mouseUp(button) {
    this.gainNode.gain.value = 0;
    this.setState({
      clicked: false
    });
    this.userClick(button)
  },
  raiseDifficultyHandler() {
    if (this.state.difficulty < 10) {
      this.setState({
        difficulty : this.state.difficulty + 1
      });
    }
  },
  reduceDifficultyHandler() {
    if (this.state.difficulty > 2) {
      this.setState({
        difficulty : this.state.difficulty - 1
      });
    }
  },
  handleRestart() {
    clearTimeout(this.timeoutHandler);
    this.setState({
      gameStarted: false,
      steps: [],
      userTurn: false,
      currentRound: 1,
      clicked: false
    });
  },
  render() {
    return (
      <div className="App">
        <div className="piechart">
          <div className="user-in">
            <div className="start-button" onClick={this.startHandler} disabled={this.state.gameStarted}>Start
            </div>
            <div className="restart" onClick={this.handleRestart}>Reset</div>
            <div className="control">
              <i className={`fa fa-arrow-circle-up fa-2x ${this.state.gameStarted ? 'inactive' : false}`} aria-hidden="true" onClick={this.state.gameStarted ? false : this.raiseDifficultyHandler}/><div className="noselect">Difficulty</div>
              <i className={`fa fa-arrow-circle-down fa-2x ${this.state.gameStarted ? 'inactive' : false}`} aria-hidden="true" onClick={this.state.gameStarted ? false : this.reduceDifficultyHandler}/>
            </div>
            <div className="display noselect">{this.state.gameStarted ? `${this.state.currentRound}/20` : this.state.difficulty}</div>
          </div>
          <Piesimon x={300} y={300} outerRadius={250} innerRadius={100}
                  data={Array.apply(null, Array(this.state.difficulty)).map((_) => {
                    return 10;
                    })
                  }
                  clicked={this.state.clicked}
                  userTurn={this.state.userTurn}
                  mouseDown={(i) => this.mouseDown(i)}
                  mouseUp={(i) => this.mouseUp(i)} />
          </div>
      </div>
    );
  }
});

export default App;

// State - [20 steps], current step(num), strictMode(bool), userTurn(bool)
// Start - 1) function makes random steps -> to state
// 2) slice steps according to current step
// 3) highlights step by step (auto click on buttons ?), then set userTurn on true
// 4) while userTurn is true - button can be clicked manually, onClick - highlight and check with sliced steps

// Sound on play()
// audiocontext sounds
// graph
// strict mode