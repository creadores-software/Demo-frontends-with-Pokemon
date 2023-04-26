//////////////////////////////////////////////////////////

$(document).ready(function () {

    $('#button-load').click(handle_load_pokemon_list);
    $('#button-clear').click(handle_clear_pokemon_list);
    $('#list table tbody').click(select_pokemon);
});

//////////////////////////////////////////////////////////

var pokemons = [];

//////////////////////////////////////////////////////////

function handle_load_pokemon_list(event)
{
    if(pokemons.length > 0)
    {
        alert("The pokemon list was already loaded!");
        return;
    }

    load_pokemons(show_pokemon_list);
}

//////////////////////////////////////////////////////////

function load_pokemons(callback) {
    var url = "https://pokeapi.co/api/v2/pokemon/";

    $.get(url, function (data) {
        pokemons = data.results;
        callback(pokemons);
    }).fail(function (error) {
        alert("Error " + error.status + ": " + error.responseText)
    });
}

//////////////////////////////////////////////////////////

function show_pokemon_list(data) {
    var table = $('#list table').children('tbody');

    data.forEach((pokemon, index) => {
        var tr = `<tr><td>${pokemon.name}</td></tr>`;
        table.append(tr);
    });
}

//////////////////////////////////////////////////////////

function handle_clear_pokemon_list(event)
{
    pokemons = [];

    $('#list table tbody tr').remove();
}

//////////////////////////////////////////////////////////

function select_pokemon(event) {
    var index = event.target.parentElement.sectionRowIndex;

    var url = pokemons[index].url;

    get_pokemon(url, show_pokemon);
}

//////////////////////////////////////////////////////////

function get_pokemon(url, callback) {
    $.get(url, function (data) {
        callback(data);
    })
    .fail(function (error) {
        alert("Error " + error.status + ": " + error.responseText)
    });
}

//////////////////////////////////////////////////////////

function show_pokemon(data) {
    var name = data.name;
    
    var image = data.sprites.other.dream_world.front_default;

    var abilities = data.abilities.map((element) => {
        return element.ability.name;
    });

    var types = data.types.map((element) => {
        return element.type.name;
    });

    $("#pokemon-photo img").attr('src', image);
    $("#pokemon-name").text(name);
    $("#pokemon-abilities").text(abilities.toString());
    $("#pokemon-types").text(types.toString());
}

//////////////////////////////////////////////////////////