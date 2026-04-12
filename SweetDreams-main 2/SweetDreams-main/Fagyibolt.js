function fullname(){
    let nev = document.getElementById("fullname").value;
    alert("Szia "+nev+"!");
}

function telnumber(){
    let phonenumber = document.getElementById("telnumber").value;
    alert("A telefonszámod "+phonenumber+"!");
}

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll(".fagyi-kep").forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});


function renderRendelesek(adatok) {
  const container = document.getElementById("rendelesLista");
  if (!container) return;
  let html = "<h2>Fagylaltok</h2><div class='lista'>";
  adatok.fagylaltok.forEach(f => {
    html += `<div class="item">
      <strong>${f.nev}</strong><br>
      Kis gombóc: ${f.kis} Ft &nbsp;|&nbsp; Nagy gombóc: ${f.nagy} Ft
    </div>`;
  });
  html += "</div>";

  html += "<h2>Kiegészítők</h2><div class='lista'>";
  adatok.kiegeszitok.forEach(k => {
    html += `<div class="item"><strong>${k.nev}</strong> - ${k.ar} Ft</div>`;
  });
  html += "</div>";

  container.innerHTML = html;
}

function renderAllergenek(adatok) {
  const container = document.getElementById("allergenTabla");
  if (!container) return;
  let html = "<h2>Allergén információk</h2><div class='lista'>";
  adatok.allergenek.forEach(a => {
    html += `<div class="item"><strong>${a.termek}:</strong> ${a.allergenek}</div>`;
  });
  html += "</div>";
  container.innerHTML = html;
}


document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll(".gallery-item img").forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            
            lightbox.style.zIndex = "9999";
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});


async function OrderNow() {
    const rendeles = {
        nev: document.getElementById("fullname").value,
        telefonszam: document.getElementById("telnumber").value,
        fagylaltok: [], 
        kiegeszitok: [], 
        vegosszeg: szamoldKiAzOsszeget()
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/rendeles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rendeles)
        });
        
        if (response.ok) {
            alert('Rendelés sikeresen leadva!');
            window.location.href = 'Rendelések.html';
        }
    } catch (error) {
        console.error('Hiba a rendelés leadásakor:', error);
        alert('Hiba történt a rendelés leadásakor!');
    }
}
