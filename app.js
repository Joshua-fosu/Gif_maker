const apiKey = "VvdWwV9YU8QxkzNF7SlgvM1rTdLIflUS"
var limit = 50

main_page_dom = document.getElementById("main_page")

async function getTrendingGIFs() {
    var uri = "https://api.giphy.com/v1/gifs/trending?api_key=VvdWwV9YU8QxkzNF7SlgvM1rTdLIflUS&limit=100&rating=g"
    const response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=VvdWwV9YU8QxkzNF7SlgvM1rTdLIflUS&limit=50&rating=g")
    const result = await response.json()
    onLoadMainPage(result.data)
}


function addGifCard(gif) {
    const gif_image_url = gif.images.downsized.url

    main_page_dom.innerHTML +=
        `
    <div class="gif_card">
        <img src=${gif_image_url} alt="" class="gif_card_image"/>
    </div>
    `

}

async function updateSearchedGif(gif){
    const gif_image_url = gif.images.downsized.url

    main_page_dom.innerHTML +=
        `
    <div class="gif_card">
        <img src=${gif_image_url} alt="" class="gif_card_image"/>
    </div>
    `
}

async function onLoadMainPage(gifs) {
    var currlimit = limit
    count = 0
    await gifs.forEach(gif => {
        

        addGifCard(gif)

    });
}

window.addEventListener('scroll', this.loadMore);

window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        limit += 50
        getTrendingGIFs()
    }
};

const f = document.getElementById('form');
const q = document.getElementById('query');
f.addEventListener('submit', submitted);

async function submitted(event) {
    event.preventDefault();
    const uri = "https://api.giphy.com/v1/gifs/search?api_key=VvdWwV9YU8QxkzNF7SlgvM1rTdLIflUS&q="+q.value+ "&limit=100&offset=10&rating=g&lang=en"
    const response = await fetch(uri)
    const result = await response.json()
    main_page_dom.innerHTML = ``
    const result_data = result.data;
    console.log(result_data)
    await result_data.forEach(gif => {
        updateSearchedGif(gif)

    });
}





window.onload = () => {
    getTrendingGIFs()
}