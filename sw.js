//checks if the browser supports Service Worker
if(navigator.serviceWorker){
  // if it does, registeres the Service Worker
  navigator.serviceWorker.register('/sw.js').then(function(reg){
    //if registration resolves
    console.log('Service Worker registered');
  }).catch (function (err){
    //if registration failes
    console.log ('Something went wrong: No Service Worker');
  });
}
