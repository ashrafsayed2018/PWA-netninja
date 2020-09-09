if('serviceWorker' in navigator) {

    // register the service worker 
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('../sw.js') // this is promise which deals with async task 
        .then(function (success) {  
            console.log('service worker is registered' , success)
        })
        .catch(function (err) {
            console.log(err + " in service worker registeration ")
        })
      });
}