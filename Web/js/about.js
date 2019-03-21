const cohert4 = [
    {
    name:"Chris Rupp",
    image:"chris.jpg"
    },
    {
    name:"Zachary Hall",
    image: "zachary.jpg"
    },
    {
    name:"Joe Knutson",
    image:"joe.jpg"
    },
    {
    name:"Garrick Kreitzer",
    image:"garrick.jpg"
    },
    {
    name:"Ben Loper",
    image:"ben.jpg"
    },
    {
    name:"Thomas Martinez",
    image:"thomas.jpg"
    },
    {
    name:"Josh Molczyk",
    image:"josh.jpg"
    },
    {
    name:"Brian Pleshek",
    image:"brian.jpg"
    },
    {
     name:"Patrick Reddy",
     image:"patrick.jpg"
    },
    {
    name:"Adam Smith",
    image:"adam.jpg"
    },
    {
    name:"William Terlep",
    image:"william.jpg"
    },
    {
    name:"Terri Ulloa",
    image:"terri.jpg"
    },
    {
    name:"Magic Mike Wolford",
    image:"mike.jpg"
    },
    {
    name:"John Wunderle",
    image:"john.jpg"
    }
]


function displayAbout(){
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
        const image = document.createElement(`IMG`);

        divContainer.insertAdjacentElement('afterbegin',cohertDiv) 

        image.setAttribute('src',`/images/${person.image}`);

        image.classList.add('cohertImage');
        aboutus.classList.add('cohertName');
        aboutus.innerText = `${person.name}`;

        cohertDiv.insertAdjacentElement('beforeend',aboutus);
        cohertDiv.insertAdjacentElement('beforeend',image);
    });

}

displayAbout();