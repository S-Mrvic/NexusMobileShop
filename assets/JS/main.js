//Adding devices from json file to HTML

let http = new XMLHttpRequest();

http.open("get", "phones.json", true);

http.send();
http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);
    let output = "";
    for (let item of products) {
      output += `
            <div id="devicesList">
                <div class="block">
				<img src="${item.slika.putanja}" alt="${item.slika.alt}" />
				<h3>${item.marka} ${item.model}</h3>
				<ul>
					<li>Display:  ${item.specifikacije.ekran}</li>
					<li>RAM: ${item.specifikacije.RAM}</li>
                    <li>Memory: ${item.specifikacije.memorija}
					<li>Proccesor: ${item.specifikacije.procesor}</li>
					<li>OS: ${item.specifikacije.operativniSistem}</li>
					<li>Camera:
						<ul>
							<li>Front: ${item.specifikacije.kamera.prednja}</li>
							<li>Rear: ${item.specifikacije.kamera.zadnja}</li>
						</ul>
					</li>
				</ul>
				<h4>${item.cena} <span>RSD</span></h4>
				<a class="chartText" href="#cart" data-id="${item.id}">ADD TO CART</a>
                </div>
            </div> `;
    }
    document.getElementById("devicesList").innerHTML = output;
  }
};
