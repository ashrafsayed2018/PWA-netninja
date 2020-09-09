// install the service worker 
 
self.addEventListener('install' , event => {
     console.log(event)
});


// activate event 

self.addEventListener('activate' , event => {
    console.log(event)
});