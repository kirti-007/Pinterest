const navSlide = () => {
    const lines = document.querySelector('.lines');
    const nav = document.querySelector('.navLink');
    
    lines.addEventListener('click',() => {
        nav.classList.toggle('nav-active');
        
    //Line Animation
    lines.classList.toggle('toggle');
    });
   
}

navSlide();

// const container = document.querySelector('.container');

// const limit = 4;
// const pagecount = 1;

// const getpost = async () => {
//     const images = await fetch(`https://api.unsplash.com/photos/?client_id=IaGxXR-UqbArFORMGQEorDttGSjIXD9mB29m80Pyp4U_limit=${limit}${pagecount}`);
//     // console.log(images);
//     const data = await images.json();

//     data.map((celement, index) => {
//         const htmldata = `
//         <div class="box">
//             <a href="ttps://oriontralelblog.com/wp-content/uploads/2019/08/IMG_6310.jpg" >
//             <img src="${celement.src}" alt="image"></a>
//             <div class="caption">Lorem ipsum </div>
//         </div> 
//         `
//         container.insertAdjacentHTML('beforeend',htmldata);
//     })
// }