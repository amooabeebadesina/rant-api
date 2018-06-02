const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('localhost:3000/api');
const Randomstring = require('randomstring');


describe('User endpoints', () => {

    describe('/POST /users/create', () => {
        it ('should create a new user', (done) => {
            const user = {
                username: Randomstring.generate(8),
                faculty: 'Technology',
                password: Randomstring.generate(6),
            };
            api.post('/users/create')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal('success');
                    expect(res.body.data).to.have.property('token');
                    expect(res.body.data).to.have.property('profile');
                    done();
                })
        });

        it ('should refuse an existing username', (done) => {
            const user = {
                username: 'test',
                faculty: 'Technology',
                password: 'test',
            };
            api.post('/users/create')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal('error');
                    expect(res.body).to.have.property('msg');
                    done();
                })
        })

    })
});