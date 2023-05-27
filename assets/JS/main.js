let http = new XMLHttpRequest();

http.open('get', 'phones.json', true);

http.send();
http.onload = function (){
    if(this.readyState == 4 && this.status == 200){
        let products = JSON.parse(this.responseText);
        let output = "";
        for(let item of products){
            output += `
            <div id="devicesList">
          
				<img src="${item.slika.putanja}" alt="${item.slika.alt}" />
				<h3>${item.marka} ${item.model}</h3>
				<ul>
					<li>Ekran: ${item.specifikacije.ekran}</li>
					<li>RAM: ${item.specifikacije.RAM}</li>
					<li>Procesor: ${item.specifikacije.procesor}</li>
					<li>Operativni sistem: ${item.specifikacije.operativniSistem}</li>
					<li>Kamera:
						<ul>
							<li>Prednja kamera: ${item.specifikacije.kamera.prednja}</li>
							<li>Zadnja kamera: ${item.specifikacije.kamera.zadnja}</li>
						</ul>
					</li>

				</ul>
				<h4>${item.cena}</h4>
				<a class="korpaText" href="#" data-id="${item.id}">DODAJ U KORPU</a>
      </div> `
        }
        document.getElementById("devicesList").innerHTML = output;
    }
}