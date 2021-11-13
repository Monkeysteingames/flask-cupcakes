$('.delete-cupcake').click(deleteCupcake)

async function deleteCupcake() {
    const id = $(this).data('id')
    await axios.delete(`/api/cupcakes/${id}`)
    $(this).parent().remove()
}

async function getCupcakes() {
    const resp = await axios.get("http://127.0.0.1:5000/api/cupcakes")

    for (let cupcakeData of resp.data.cupcakes) {
        let cupcake = $(generateCupcakeHTML(cupcakeData));
        $('.list-group').append(cupcake);
    }
    $('.delete-cupcake').click(deleteCupcake)
}

function generateCupcakeHTML(cupcake) {
    return `
            <li class="list-group-item d-flex justify-content-between align-items-center">Flavor: ${cupcake.flavor}, Size:${cupcake.size}, Rating: ${cupcake.rating}
            <img src="${cupcake.image}" alt="cupcake image">
            <button class="delete-cupcake btn-sm btn-danger" data-id=${cupcake.id}>X</button>
            </li >
                `
}

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();

    let flavor = $('#form-flavor').val();
    let size = $('#form-size').val();
    let rating = $('#form-rating').val();
    let image = $('#form-image').val();

    const resp = await axios.post('http://127.0.0.1:5000/api/cupcakes', json = {
        flavor,
        size,
        rating,
        image
    });

    const cupcake = $(generateCupcakeHTML(resp.data.cupcake))
    $('.list-group').append(cupcake);
    $("#new-cupcake-form").trigger("reset");
})

$(getCupcakes);

