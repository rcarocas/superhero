function cargarGrafico(datos = [], name) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${name}`,
            fontFamily: "AnimeAce",
        },
        data: [{
            type: "pie",
            showInLegend: true,
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: datos
        }]
    });
    chart.render();
};

function obtenerData(id) {
    let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            let dataPoints = [];
            for (const [key, value] of Object.entries(powerstats)) {
                let dato = {
                    label: key.toUpperCase(),
                    y: value,
                    name: key.toUpperCase(),
                }

                dataPoints.push(dato);
            }
            cargarGrafico(dataPoints, datos.name);
            cargarCard(datos);
        })
        .fail(function () {
            alert("Error");
        })

}
$("form").on("submit", function (event) {

    event.preventDefault();
    const id = $("#formSuperhero").val()
    if(isNaN(id) || id<1 || id>732){
        alert("Ingresar un número entre 1 y 732")
    }
    else{
    obtenerData(id);}

});

function cargarCard(superhero) {
    $("#cardContainer").html(
        `<div class="card mb-3 overflow-scroll border-0" style="height: 370px; width: 100%;">
        <div class="row g-0">
          <div class="col-md-4 ">
            <img src="${superhero.image.url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body ">
              <h5 class="card-title anime-font">${superhero.name}</h5>
              <h6 class="card-subtitle">${superhero.biography["full-name"]}</h6>
              <p class="card-text">Alias: ${superhero.biography["aliases"]} </p>
              <p class="card-text">Primera aparición: ${superhero.biography["first-appearance"]} </p>
              <p class="card-text">Publicado por: ${superhero.biography["publisher"]} </p>
              <p class="card-text">Ocupación: ${superhero.work["occupation"]} </p>
              <p class="card-text">Conexiones: ${superhero.connections["group-affiliation"]} </p>
            </div>
          </div>
        </div>
      </div>`
    )
}
