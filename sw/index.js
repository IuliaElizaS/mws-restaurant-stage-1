// when the Service Worker is installed creates a cache called 'restaurants-v1'
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open('restaurants-v1').then(function(cahe){
        console.log('cache created')
    }).catch(function (err) {
      console.log(err);
    })
  );
})

//when a request is made 
self.addEventListener('fetch', function(evt){
    evt.respondWith(
      //searches for the matched request in the cache
      caches.match(evt.request).then(function(response) {
        //if it resolves, it returns the response
        if(response) return response;
        //if it doesn't find in the cache the requested data, fetches it from the network and adds it to the cache
        return fetch(evt.request).then(function(returned) {
          cache.put(evt.request, returned);
        }).catch(function(error) {
          console.log(error);
        });
      })
    );
});
