const staticCacheName = "static-site-v4";
const daynamicCacheName   = "site-daynamic-v1";
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/manifest.json',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
    

]

// function to limit the size daynamic cache 

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            // if(keys.length > size) {
            //     cache.delete(keys[0]).then(limitCacheSize(name,size))
            // }
             while(keys.length > size) { cache.delete(keys[0]) }
        })
    })
}

// install the service worker 
  
self.addEventListener('install' , event => {
    //  console.log(event)

    event.waitUntil(

        caches.open(staticCacheName)
        .then(cache => {
            console.log('caching shell asset ')
            cache.addAll(assets)
        })
    );
    


});


// activate event 

self.addEventListener('activate' , event => {
    // console.log(event)
    // delete the old cache version
    event.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys) 
     
            return Promise.all(keys.filter(key => key != staticCacheName &&  key != daynamicCacheName)
            .map(key => caches.delete(key))
            )
    
        })
    )
});


// fetch event

self.addEventListener('fetch', event => {
    // console.log('fetch event' , event) 

    event.respondWith(
        caches.match(event.request)
        .then(cacheRes => {
          return  cacheRes || fetch(event.request).then(fetchRes => {

              // dsynamic cache the pages which the user visit 

              return caches.open(daynamicCacheName).then(cache => {
                 cache.put(event.request.url,fetchRes.clone());
                 limitCacheSize(daynamicCacheName,1)
                 return fetchRes;
              });  
          });
        }).catch(() => {
            if(event.request.url.includes('.html')) {
                
               return caches.match('/pages/fallback.html')
            }
        })
    );
})
