// var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');

const marks = {
	'Darkstar': 'DARKSTAR',
	"Alien_Workshop": 'ALIENWORK',
	'Blind': 'BLIND'
}

const typesOfProducts = {
	"DK": "Decks",
	"WH": "Wheels"
}

Object.entries(typesOfProducts).forEach(product => {
	Object.entries(marks).forEach((entry) => {
		var URL = `https://www.skatewarehouse.com/${entry[0]}_Skateboard_Decks/catpage-DK${entry[1]}.html`;

		needle.get(URL, function(err, res){
			if (err) throw err;
			var $ = cheerio.load(res.body);

			var res = [];
			$('.product_wrapper').each(function(ind = 1, val) {
				let obj = {
					name: $(this).find('.name').text().trim(),
					sub: $(this).find('.color_name').text().trim(),
					price: $(this).find('.price').text().trim(),
					product_type: entry[0],
					quantity: Math.floor(Math.random() * 10),
					img: `../assets/skate-images/${entry[0].toLowerCase() + ind}`
				};
				res.push(obj);
			});
			fs.writeFileSync(`./${entry[0]}.json`, JSON.stringify(res));
	  	});
	});
});



// q.push(URL);