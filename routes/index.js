var express = require('express');
var router = express.Router();
var models = require('../models');
var Promise = require('bluebird');
var Track = models.Track;
var Playlist = models.Playlist;

var Playlist = models.Playlist;
var Track = models.Track;

router.get('/', function(req, res, next){
	console.log('in the homepage')
	Track.findAll({
		order: 'id DESC'
	})
	.then(function(allTracks){
		res.render('index', {tracks: allTracks})
	})
	.catch(next)
})

router.post('/', function(req, res, next){
	Track.create({
  	title: req.body.title,
  	artist: req.body.artist,
  	link: req.body.link
	})
	.then(function(){
		res.redirect('/');
	})
})

router.get('/:id', function(req, res, next){
	Track.findOne({
		where: {
			id: req.params.id
		} 
	})
	.then(function(selectedTrack){
		selectedTrack.destroy();
	})	
	.then(function(){
		res.redirect('/');
	})
	.catch(next)
})
// router.get('/add', function (req, res, next){
// 	res.render('add')
// })

module.exports = router;