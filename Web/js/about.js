function setupAboutPage() {
    displayAbout()
    // const mainNode = document.querySelector('main');
    // const childNode = document.createElement('h1');
    // childNode.innerText = 'About';
    // mainNode.insertAdjacentElement('afterbegin', childNode);
}






function displayAbout(){

    const cohert4 = [
        {
        name:"Chris Rupp",
        image:"chris.jpg",
        link:"https://www.linkedin.com/in/chris-rupp-9267702/"
        },
        {
        name:"Zachary Hall",
        image: "zachary.jpg",
        link:"https://www.linkedin.com/in/zachary-l-hall/"
        },
        {
        name:"Joe Knutson",
        image:"joe.jpg",
        link:"https://www.linkedin.com/in/jknutson101/"
        },
        {
        name:"Garrick Kreitzer",
        image:"garrick.jpg",
        link:"https://www.linkedin.com/in/garrickkreitzer/"
        },
        {
        name:"Ben Loper",
        image:"ben.jpg",
        link:"https://www.linkedin.com/in/benjamin-loper/"
        },
        {
        name:"Thomas Martinez",
        image:"thomas.jpg",
        link:"https://www.linkedin.com/in/atm117/"
        },
        {
        name:"Josh Molczyk",
        image:"josh.jpg",
        link:"https://www.linkedin.com/in/joshuamolczyk/"
        },
        {
        name:"Brian Pleshek",
        image:"brian.jpg",
        link:"https://www.linkedin.com/in/brianpleshek/"
        },
        {
         name:"Patrick Reddy",
         image:"patrick.jpg",
         link:"https://www.linkedin.com/in/preddy1987/"
        },
        {
        name:"Adam Smith",
        image:"adam.jpg",
        link:"https://www.linkedin.com/in/adamjsmith7411/"
        },
        {
        name:"William Terlep",
        image:"william.jpg",
        link:"https://www.linkedin.com/in/william-t-0b647a178/"
        },
        {
        name:"Terri Ulloa",
        image:"terri.jpg",
        link:"https://www.linkedin.com/in/terri-ulloa/"
        },
        {
        name:"Mike Wolford",
        image:"mike.jpg",
        link:"https://www.linkedin.com/in/james-m-wolford/"
        },
        {
        name:"John Wunderle",
        image:"john.jpg",
        link:"https://www.linkedin.com/in/wunderlejohn/"
        }
    ];
    
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    const divContainer = document.createElement('div');
    divContainer.classList.add('cohertContainer')
    main.insertAdjacentElement("afterbegin",divContainer);
    title.innerText = `About Us\n`;
    main.insertAdjacentElement(`afterbegin`,title);
    cohert4.forEach((person)=>{
        const cohertDiv = document.createElement('div');
        const aboutus = document.createElement(`p`);
        const image = document.createElement(`img`);
        const link = document.createElement(`a`);

        link.setAttribute(`href`,`${person.link}`)


        divContainer.insertAdjacentElement('afterbegin',cohertDiv) 

        image.setAttribute('src',`/images/${person.image}`);

        image.classList.add('cohertImage');
        aboutus.classList.add('cohertName');
        aboutus.innerText = `${person.name}`;


        cohertDiv.insertAdjacentElement('beforeend',aboutus);
        cohertDiv.insertAdjacentElement('beforeend',link);
        link.insertAdjacentElement('beforeend',image);
    });

}