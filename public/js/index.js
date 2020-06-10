function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);
    
        const findMe = () => {
        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');
        const lbl = document.getElementById('name');
    
        mapLink.href = '';
        mapLink.textContent = ''; 
        status.textContent = '';
    
    
        const success = async position => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(position.coords);
            status.textContent ='';

            const mood = lbl.value;

            video.loadPixels();
            const image64 = video.canvas.toDataURL();
    
            const data = {
                latitude,
                longitude,
                mood,
                image64
            }
    
            const option = {
             method: 'POST', // *GET, POST, PUT, DELETE, etc.
             headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            };
    
            const response = await fetch('/api', option);
            const data1 = await response.json();
            console.log(data1);
            
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
           
        }
    
        function error() {
        status.textContent = 'Unable to retrieve your location' ;
            }
    
        if(!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
            } 
        else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
            }
        
            
            
    
    
    }
    const btn = document.getElementById('findme');
    
    btn.addEventListener('click', findMe);

}

setup();


