const axios = require('axios');
const cheerio = require('cheerio')
const express = require('express');
const app = express();

//Extraemos datos de una página web

const url = 'https://oscarranilla.github.io/OscarRanillaProjectBreak/index.html'

//acceder a nuestra pagina web a traves de axion 
// ese .then es lo que hacíamos con el //!FETCH Y SU RESPONSE

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            //nos traemos el titulo de la pagina con //!CHEERIO
            //con esto capturamos cada parte que necesitamos
            const $ = cheerio.load(html)

            

            const pageTitle = $('title').text()//ese .text es la forma en que
            //nos queremos traer el titulo

            //Vamos a coger todos los links y las imagenes 

            const links = [];
            const imgs = [];

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })
            
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                <h2>Imagenes</h2>
                <ul>
                ${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                </ul>
            `
            )
        }
    })
});

app.listen(3000, () => {
    console.log('express is listening on port http://localhost:3000');
});


