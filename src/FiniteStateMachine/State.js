/*
 * State
 */

class State {
    constructor(name, transitions){
        this._transitions = {};
        this._name = name;
        if(transitions) {
            transitions.forEach(transition => {
                this.addTransition(transition.action, transition.target);
            });
        }
    }

    get name() {
        return this._name;
    }

    get transitions() {
        return this._transitions;
    }

    addTransition(action, target) {
        if ( this.getTarget( action ) ) {
            return;
        }
        this._transitions[ action ] = target;
    };

    removeTransition(action) {
        this._transitions[ action ] = null;
    };

    getTarget(action)	{
        return this._transitions[ action ];
    };
}

export default State;
