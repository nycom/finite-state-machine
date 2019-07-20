import React, {Component} from 'react';
import StateMachine from '../../FiniteStateMachine/FiniteStateMachine'
class FsmComponent extends Component {

    states = {
        CLOSED: 'CLOSED',
        OPENED: 'OPENED',
        LOCKED: 'LOCKED'
    };

    actions = {
        CLOSE: 'CLOSE',
        OPEN: 'OPEN',
        LOCK: 'LOCK',
        UNLOCK: 'UNLOCK'
    };

    config = [
        {
            initial: true,
            name: this.states.CLOSED,
            transitions: [
                { action: this.actions.OPEN, target: this.states.OPENED },
                { action: this.actions.LOCK, target: this.states.LOCKED }
            ]
        },
        {
            name: this.states.OPENED,
            transitions: [
                { action: this.actions.CLOSE, target: this.states.CLOSED }
            ]
        },
        {
            name: this.states.LOCKED,
            transitions: [
                { action: this.actions.UNLOCK, target: this.states.CLOSED }
            ]
        }
    ];
    constructor(props){
        super(props);
        this.stateMachine = new StateMachine(this.config);
        // this.stateMachine.create(this.config);
        this.stateMachine.start();
        this.state = {
            current: this.stateMachine.currentState.name
        }
    }

    handleChange = action => e => {
        this.stateMachine.action(action);
        console.log(this.stateMachine.currentState.transitions);
        this.setState({current: this.stateMachine.currentState.name})
    };

    render() {
        // console.log(this.stateMachine.currentState.transitions);
        const currentState = this.stateMachine.currentState;


        return (
            <div>
                <h1>{currentState.name}</h1>
                <button disabled={!(currentState.transitions[this.actions.OPEN])} onClick={this.handleChange(this.actions.OPEN)}>OPEN</button>
                <button disabled={!(currentState.transitions[this.actions.CLOSE])} onClick={this.handleChange(this.actions.CLOSE)}>CLOSE</button>
                <button disabled={!(currentState.transitions[this.actions.LOCK])} onClick={this.handleChange(this.actions.LOCK)}>LOCK</button>
                <button disabled={!(currentState.transitions[this.actions.UNLOCK])} onClick={this.handleChange(this.actions.UNLOCK)}>UNLOCK</button>
            </div>
        );
    }
}

export default FsmComponent;
