const supertest = require('supertest');

// Mimic https responses to avoid being redirected all the time
const app = supertest.agent(require('app.js').app)
    .set('X-Forwarded-Proto', 'https');

before(function (done) {
	app.on('listening', function(){
		done();
	});
});

describe('Tests for static pages', ()=>{
	it('Init check', ()=>{
		return app.get('/').expect(200);
	}, 60000);

	it('Home page works', ()=>{
		return app.get('/').expect(200);
	}, 15000);

	it('Home page v3 works', ()=>{
		return app.get('/v3_preview').expect(200);
	});

	it('Changelog page works', ()=>{
		return app.get('/changelog').expect(200);
	});

	it('FAQ page works', ()=>{
		return app.get('/faq').expect(200);
	});

	it('robots.txt works', ()=>{
		return app.get('/robots.txt').expect(200);
	});
});
