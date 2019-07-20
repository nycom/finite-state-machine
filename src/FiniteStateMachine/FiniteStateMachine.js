import State from './State'

class StateMachine {

    constructor(config){
        this._states = {};
        this._initialState = null;
        if(config instanceof Array) {
            config.forEach(item => {
                const state = new State(item.name, item.transitions);
                const transitions = config.transitions;
                if(transitions) {
                    transitions.forEach(function(transition) {
                        state.addTransition(transition.action, transition.target);
                    });
                }
                this._addState(state, item.initial || false);
                return this;
            });
        }
    }

    start(){
        if ( !this._initialState ) {
            throw 'State Machine cannot start. No initialState states defined.';
        }
        this._transitionTo( this._initialState, null );
        return this;
    };

    get states() {
        return this._states;
    };

    get initialState() {
        return this._initialState;
    };
    get currentState() {
        return this._currentState;
    };

    getStatesAmount() {
        return Object.keys(this.states).length;
    }

    getStateByName(stateName) {
        return this._states[stateName];
    }

    action(action) {
        // Attempt to retrieve the new State
        const newStateTarget = this._currentState.getTarget(action);
        const newState = this._states[ newStateTarget ];
        // Only transition if there's a state associated with the action
        if( newState ) {
            this._transitionTo( newState, action );
        }
        return this;
    };
    _transitionTo( nextState) {
        this._currentState = nextState;
    };

    _addState( state, isInitial = false ) {
        if ( state === null || this._states[ state.name ]) {
            return null;
        }
        this._states[ state.name ] = state;
        if ( isInitial ) {
            this._initialState = state;
        }
        return state;
    };

    removeState( stateName ) {
        var state = this._states[ stateName ];
        if ( state === null ) {
            return null;
        }
        delete this._states[ stateName ];
        return state;
    };

}

export default StateMachine;
