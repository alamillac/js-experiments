/**
 * dog              = pooper + barker
 * cat              = pooper + meower
 * cleaningRobot    = driver + cleaner
 * murderRobot      = driver + killer
 * murderRobotDog   = driver + killer + barker
 */

//Behaviors
const barker = (state) => ({
    bark: () => console.log('Woof, I am ' + state.name)
});

const driver = (state) => ({
    drive: () => state.position = state.position + state.speed
});

const killer = (state) => ({
    kill: () => console.log('')
});

const murderRobotDog = (name) => {
    const state = {
        name,
        speed: 100,
        position: 0
    };

    return Object.assign(
        {},
        barker(state),
        driver(state),
        killer(state)
    );
};

barker({name: 'karo'}).bark();

const sniffles = murderRobotDog('sniffles');
sniffles.bark();
