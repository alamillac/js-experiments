function dog() {
    const sound = 'woof';
    return {
        talk() {
            console.log(sound);
        }
    }
}

const cat = () => {
    const sound = 'meaw';
    return {
        talk: () => console.log(sound)
    }
}

const sniffles = dog(),
    garfield = cat();

sniffles.talk();
garfield.talk();
