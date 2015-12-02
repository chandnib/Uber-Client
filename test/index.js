var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var api =  supertest('http://localhost:3000');

var request = require('superagent');
var baseURL = 'http://localhost:3000';

describe('Uber Test app', function(){
	it('Server should say hello', function (done){
		request.get(baseURL+'/').end(function assert(err,res){
			//console.log(res);
			expect(err).to.not.be.ok;
			expect(res).to.have.property('status',200);
			done();
		});
	});
	
	it('Server should say hello', function (done){
		request.get(baseURL+'/').end(function assert(err,res){
			//console.log(res);
			expect(err).to.not.be.ok;
			expect(res).to.have.property('status',200);
			done();
		});
	});
});


/*var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Hello, World!');
});

// *** api routes *** //
router.get('/blobs', findAllBlobs);
router.get('/blob/:id', findBlobById);
router.post('/blobs', addBlob);
router.put('/blob/:id', updateBlob);
router.delete('/blob/:id', deleteBlob);

it('should list ALL blobs on /blobs GET', function(done) {
	  chai.request(server)
	    .get('/blobs')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});

module.exports = router;
*/