const request = async () => {
 const response = await fetch('/api');
 const data = await response.json();
 for(value of data){
    const root =  document.createElement("p");
    const geo = document.createElement("h5");
    const mood = document.createElement("h5");
    const timestamp = document.createElement("h5");
    const image  = document.createElement("img");

    geo.textContent =  `Latitude: ${value.latitude} °, Longitude: ${value.longitude} °`;
    mood.textContent = `mood: ${value.mood}`;
    const datestring = new Date(value.timestamp).toLocaleString();
    timestamp.textContent = `TimeStamp: ${datestring}`;
    image.src = value.image64;
    image.alt = "image";

    root.append(geo, mood, timestamp,image);
    document.body.append(root);
     
     
 };
} 

document.getElementById('btn').addEventListener('click', request);

