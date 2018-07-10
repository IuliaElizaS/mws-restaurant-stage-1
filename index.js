// when the Service Worker is installed creates a cache called 'restaurantsV1'
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open('cacheV1').then(function(){
      console.log('cache created');
    }).catch(function () {
      console.log('failed to create cache');
    })
  );
})

//when a request is made
self.addEventListener('fetch', function(evt){
    evt.respondWith(
        //opens the cache
        caches.open('cacheV1').then(function(cache){
          //searches for the matched request in the cache
          return caches.match(evt.request).then(function(response){
            //if it resolves, it returns the response
            if(response) {
              return response;
            }else{
              //if it doesn't find the requested data in the cache, fetches it from the network
              return fetch(evt.request).then(function (response){
                //and adds a clone of the response to the cache
                cache.put(evt.request, response.clone());
                return response;
              });
            }
        });
      })
    )
});
