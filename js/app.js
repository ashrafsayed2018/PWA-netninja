// install banner 
let deferredPrompt;

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


window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault()
  deferredPrompt = e
})

const btnInstallApp = document.getElementById('btn-install-app')

if(btnInstallApp) {
  btnInstallApp.addEventListener('click', e => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice
      .then(choiceResult => {
        if(choiceResult.outcome === 'accepted') {
          console.log('user accepted A2HS prompt')
        } else {
          console.log('user dismissed A2HS prompt')
        }
        deferredPrompt = null
      })
    })
}