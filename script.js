const imageConatiner =document.getElementById('image-container');
const loader =document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photoArray = [];

// Unsplash API

const count = 30;
const ApiKey = '66ahaH3E-67Dq1Pr6VfYvwD_ya12wsIFdWvVHiQ-wng';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`;


//  Check if all images were loaded 


function  imageloaded () {
   imagesLoaded++;

   if( imagesLoaded === totalImages ){
      ready = true ;
      loader.hidden = true ;
      console.log('ready =' , ready); 
      console.log('imagesLoaded =' , imagesLoaded); 
      console.log('totalImages =' , totalImages); 
   }
} 

// Helper Function to Set Attribute on DOM Elements 

function setAttribute(element , Attribute) {

   for ( const key in Attribute){
      element.setAttribute( key , Attribute[key]);
   }
}
 
// Create Elements for links & photos , add to the DOM  
 function dispayPhotos() {
   imagesLoaded = 0;
   totalImages = photoArray.length ; 
    // run function for each object of the photoArray
    photoArray.forEach( photo => {

      // Creat <a> o link to Unspash
      const item = document.createElement('a');
      // item.setAttribute('href' ,photo.links.html);
      // item.setAttribute('target' ,'_blank');
      setAttribute( item , {
        href: photo.links.html ,
        target: '_blank'
      } );
      // Creat <img> for fetched photo

      const img = document.createElement('img');
      // img.setAttribute('src' , photo.urls.regular);
      // img.setAttribute('alt' , photo.alt_description );
      // img.setAttribute('title' , photo.alt_description );
      // Put <img> inside <a> , then put both inside imageContainer Element 
      setAttribute( img , {
        src: photo.urls.regular ,
        alt: photo.alt_description , 
        title: photo.alt_description
      } ); 

      // Event Listener , check when each is finished loading 
      img.addEventListener("load", imageloaded);

      // Put <img> inside <a> , then put both inside imageContainer Element 
      item.appendChild(img);
      // appending the item to the imageConatiner (DOM)
      imageConatiner.appendChild(item); 
    
    } );

}

// GET Photos from Unsplash API 

async function getPhotos() {

   try {
      const respense = await fetch( apiUrl);
      photoArray = await respense.json();
      dispayPhotos();
      
   } catch {
    // catch the err here 
   }

}

// Check to see if scrolling near bottom of page , load More Photos
  // Note : body  -> document -> window
  // window.innerHeight : Total height of browser window
  // window.scrollY : Distance from top of page user scrolled
  // document.body.offHeight of everything in the body including wath is not withn view
  // 1000 : 1000px , we need to subsract from offseHeight,
  //                 to trigger event before bottom is reached .
window.addEventListener('scroll' , () => {
     if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready  ) {
       ready = false ; 
       console.log('ready =' , ready);
       getPhotos();
     }
   
});  
// On Load 
getPhotos(); 