
function setupAboutPage() {
    displayAbout()
    // const mainNode = document.querySelector('main');
    // const childNode = document.createElement('h1');
    // childNode.innerText = 'About';
    // mainNode.insertAdjacentElement('afterbegin', childNode);
}
 



function displayAbout(){

    const peopleList1 = [{
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
        }];
    const peopleList2 = [{
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
        }];    
    const peopleList3 = [{
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
            }];
    const peopleList4 = [{
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
            }];
    const peopleList5 = [{
            name:"Mike Wolford",
            image:"mike.jpg",
            link:"https://www.linkedin.com/in/james-m-wolford/"
            },
            {
            name:"John Wunderle",
            image:"john.jpg",
            link:"https://www.linkedin.com/in/wunderlejohn/"
            },
            {
            name:"Tech Elevator",
            image:"TELogo.jpg",
            link: "https://www.techelevator.com/"
            }];
    let cohert4 = [peopleList1,peopleList2,peopleList3,peopleList4,peopleList5];
     

    const main = document.querySelector('main');
    const title = document.createElement('h2');
    const divContainer = document.createElement('div');
    const carouseldiv = document.createElement('div');
    const cohertContainer = document.createElement('div');
    const controlDiv = document.createElement('div');
    const controlAnchorL = document.createElement('a');
    const controlIL = document.createElement('i');
    const controlAnchorR = document.createElement('a');
    const controlIR = document.createElement('i');
    const indicatorOl = document.createElement('ol');
    const indicatorLi1 = document.createElement('li');
    const indicatorLi2 = document.createElement('li');
    const indicatorLi3 = document.createElement('li');
    const indicatorLi4 = document.createElement('li');
    const indicatorLi5 = document.createElement('li');
    const lightboxDiv = document.createElement('div');

    lightboxDiv.setAttribute('id','mdb-lightbox-ui');
    

    controlAnchorL.classList.add('btn-floating');
    controlAnchorL.classList.add('btn-secondary');
    controlAnchorL.setAttribute('href','#carousel-with-lb');
    controlAnchorL.setAttribute('data-slide','prev');

    controlAnchorR.classList.add('btn-floating');
    controlAnchorR.classList.add('btn-secondary');
    controlAnchorR.setAttribute('href','#carousel-with-lb');
    controlAnchorR.setAttribute('data-slide','next');

    controlIL.classList.add('fas');
    controlIL.classList.add('fa-chevron-left');
    controlIR.classList.add('fas');
    controlIR.classList.add('fa-chevron-right');

    carouseldiv.setAttribute('id','carousel-with-lb');
    carouseldiv.classList.add(`carousel`);
    carouseldiv.classList.add(`slide`);
    carouseldiv.classList.add(`carousel-multi-item`);
    carouseldiv.setAttribute(`data-ride`,`carousel`);


    indicatorOl.classList.add('carousel-indicators');

    indicatorLi1.setAttribute('data-target','#carousel-with-lb');
    indicatorLi1.setAttribute('data-slide-to','0');
    indicatorLi1.classList.add('active');
    indicatorLi1.classList.add('secondary-color');

    indicatorLi2.setAttribute('data-target','#carousel-with-lb');
    indicatorLi2.setAttribute('data-slide-to','1');
    indicatorLi2.classList.add('secondary-color');

    indicatorLi3.setAttribute('data-target','#carousel-with-lb');
    indicatorLi3.setAttribute('data-slide-to','2');
    indicatorLi3.classList.add('secondary-color');

    indicatorLi4.setAttribute('data-target','#carousel-with-lb');
    indicatorLi4.setAttribute('data-slide-to','3');
    indicatorLi4.classList.add('secondary-color');

    indicatorLi5.setAttribute('data-target','#carousel-with-lb');
    indicatorLi5.setAttribute('data-slide-to','4');
    indicatorLi5.classList.add('secondary-color');

    controlDiv.classList.add('controls-top');

    // carouseldiv.classList.add(`carousel-fade`);
    cohertContainer.setAttribute('id','cohertContainer');

    divContainer.classList.add('carousel-inner');
    divContainer.classList.add('mdb-lightbox');
    divContainer.setAttribute('role','listbox');

    carouseldiv.insertAdjacentElement("afterbegin",divContainer);
    divContainer.insertAdjacentElement('afterbegin',lightboxDiv);
    carouseldiv.insertAdjacentElement('afterbegin',indicatorOl);
    indicatorOl.insertAdjacentElement('afterbegin',indicatorLi5);
    indicatorOl.insertAdjacentElement('afterbegin',indicatorLi4);
    indicatorOl.insertAdjacentElement('afterbegin',indicatorLi3);
    indicatorOl.insertAdjacentElement('afterbegin',indicatorLi2);
    indicatorOl.insertAdjacentElement('afterbegin',indicatorLi1);
    controlAnchorR.insertAdjacentElement('afterbegin',controlIR);
    controlDiv.insertAdjacentElement('afterbegin',controlAnchorR);
    controlAnchorL.insertAdjacentElement('afterbegin',controlIL);
    controlDiv.insertAdjacentElement('afterbegin',controlAnchorL);
    carouseldiv.insertAdjacentElement('afterbegin',controlDiv);
    main.insertAdjacentElement(`afterbegin`,cohertContainer);
    
    
    cohertContainer.insertAdjacentElement("afterbegin",carouseldiv);
    
    title.innerText = `Meet the Team`;
    cohertContainer.insertAdjacentElement(`afterbegin`,title);

    let isFirst = true;


    cohert4.forEach((lists)=>{
        // for(let x = 0;x<cohert4.length;i++){
       
        const cohertDiv = document.createElement('div');
        cohertDiv.classList.add(`carousel-item`)
        cohertDiv.classList.add(`text-center`)
        divContainer.insertAdjacentElement('beforeend',cohertDiv) 

        if(isFirst){
            cohertDiv.classList.add(`active`);
            isFirst = false;
        }
        for(let i = 0;i < lists.length;i++){

        
        const captionDiv = document.createElement('div');
        const figure = document.createElement('figure')
        const image = document.createElement(`img`);
        const links = document.createElement(`a`);
        const captionH3 = document.createElement('h3');

        captionDiv.classList.add('carousel-caption')

        links.setAttribute(`href`,`${lists[i].link}`)
        
        captionH3.classList.add('h3-responsive');
        captionH3.innerText = `${lists[i].name}`;

        figure.classList.add('col-md-4');
        figure.classList.add('d-md-inline-block');

        image.setAttribute('src',`/images/${lists[i].image}`);
        image.classList.add(`img-fluid`);
        image.classList.add('cohertImage');
        
        captionDiv.insertAdjacentElement('beforeend',captionH3);
        figure.insertAdjacentElement('beforeend',captionDiv);
        cohertDiv.insertAdjacentElement('beforeend',figure);
        figure.insertAdjacentElement('beforeend',links);
        links.insertAdjacentElement('beforeend',image);

        };
        


    });

};