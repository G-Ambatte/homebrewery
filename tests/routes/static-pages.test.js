const supertest = require('supertest');

// Mimic https responses to avoid being redirected all the time
const app = supertest.agent(require('app.js').app)
    .set('X-Forwarded-Proto', 'https');

request(app)
	.get('/')
	.expect(200)
	.end(function(err, res) {
		if(err) throw err;
	});

describe('Tests for static pages', ()=>{
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
