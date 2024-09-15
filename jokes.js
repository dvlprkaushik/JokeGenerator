const classNames = {
    container: 'container',
    textBox: 'text-box',
    response_setup: 'response-setup',
    response_punch: 'response-punch',
    sample_Generate : 'sample-generate',
    generate: 'generate'
};

const container = document.querySelector(`.${classNames.container}`);
const textBox = document.querySelector(`.${classNames.textBox}`);
const response_Setup = document.querySelector(`.${classNames.response_setup}`);
const response_Punch = document.querySelector(`.${classNames.response_punch}`);
const sample_Generate = document.querySelector(`.${classNames.sample_Generate}`);
const generateBtn = document.querySelector(`.${classNames.generate}`);

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const displayJoke = (setup, punchline) => {
    const words_setup = setup.split(" ");
    const words_punch = punchline.split(" ");
    
    response_Setup.innerHTML = '';
    response_Punch.innerHTML = '';

    words_setup.forEach((value, index) => {
        setTimeout(() => {
           response_Setup.innerHTML += value + " ";
        }, index * 100);
    });

    words_punch.forEach((value, index) => {
        setTimeout(() => {
            response_Punch.innerHTML += value + " ";
        }, (index + words_setup.length) * 100);
    });
};

const jokeGenerator = async () => {
    const jokeApiURL = 'https://raw.githubusercontent.com/dvlprkaushik/DiverseAPIBox/master/Jokes.json';
    try {
        const response = await fetch(jokeApiURL);
        const data = await response.json();
        
        // Generate a random ID between 1 and 50
        const randomId = getRandomIntInclusive(1, 50);
        console.log(randomId);
        // Find the joke with the random ID
        const joke = data.jokes.find(joke => joke.id === randomId);
        
        if (joke) {
            displayJoke(joke.setup, joke.punchline);
        } else {
            textBox.innerHTML = 'No joke found.';
        }
    } catch (err) {
        console.error('Error fetching joke:', err);
        textBox.innerHTML = 'Failed to load joke.';
    }
};

// Initialize event listener
generateBtn.addEventListener('click', () => {
    sample_Generate.style.display = 'none'
    jokeGenerator();
});
