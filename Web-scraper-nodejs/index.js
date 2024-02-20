const cheerio = require("cheerio")
const axios = require("axios")


const  scrapeData = async () => {
    const axiosResponse = await axios.request({
        method: "GET",
        url :  "https://brightdata.com" ,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
    console.log(axiosResponse)
    const $ = cheerio.load(axiosResponse.data)

    const industries =[]
    $("section.cards")
    .find(".card").each((index, element) => {
        const pageUrl = $(element).attr("href")
        const img = $(element).find("img.attachment-full").attr("data-lazy-src")
        const name = $(element).find(".card__content div").text()
        if(pageUrl && name){
            const industry = {
                pageUrl: pageUrl,
                img: img,
                name: name
            }
            industries.push(industry)
        }
    })
    console.log(industries)
}

scrapeData()