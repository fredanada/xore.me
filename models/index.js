var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/xore.me', {logging: false});

var Playlist = db.define('Playlist' , {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	}
},{
	getterMethod: { 
		route: function(){ return '/playlist/' + this.urlTitle }
	}
})

var Track = db.define('Track', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
	},
	artist: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	link: {
		type: Sequelize.STRING,
		allowNull: false,
		isUrl: true
	},
	status: {
		type: Sequelize.ENUM('played', 'unplayed'),
		defaultValue: 'unplayed'
	}
})

Playlist.beforeValidate(function(page){
	return page.urlTitle = generateUrlTitle(page.title);
});

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

Track.belongsTo(Playlist);

module.exports = {
	Playlist: Playlist,
	Track: Track
}