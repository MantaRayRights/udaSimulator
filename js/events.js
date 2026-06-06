import {state} from './state.js';
import {derivePassive} from './state.js';
import {udaLife} from './rules.js';
import {eventLogger} from './ui.js';

// Listen to the browser events and update the state accordingly.
// These rules defines what happens after a click
// I don't know how to connect the buttons yet! Just put them there first
export function events(){
    document.getElementById('workButton').addEventListener('click', () => {
    if (state.sleep <= 30){
        eventLogger("Uda is not progressing because he is too sleepy.")
    }

    if (state.mood <= 30){
        eventLogger("Uda is not progressing because he is too sad.")
    }
    
    state.active = 'working';
    });

    document.getElementById('eatButton').addEventListener('click', () => {
    if (state.money <= 0) return;
    eventLogger("Uda couldn't afford to eat.");

    if (state,money <= 10) {
        //add popup "no money for the next meal..."
    }

    state.active = 'eating';
    });

    document.getElementById('sleepButton').addEventListener('click', () => {
    if (state.mood <= 10) return;
    eventLogger("Uda is too sad to sleep.");

    state.active = 'sleeping';
    });

    document.getElementById('drinkButton').addEventListener('click', () => {
    if (state.money <= 0) return;
    eventLogger("Uda couldn't afford to drink.");

    if (state.hp <= 10) {
        eventLogger("Are you sure?")
    }

    state.active = 'drinking';
    })

    // Add idleButton everywhere else!
    document.getElementById('idleButton').addEventListener('click', () => {
    if (state.mood <= 30) {
        eventLogger("Why Uda couldn't be happy?")
    } else if (state.sleep <= 30) {
        eventLogger("Why Uda couldn't sleep?")
    } else {
        eventLogger("Uda wants to be happy.")
    }
    };