const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('/api');


describe('User endpoints', () => {

    describe('/POST /users', () => {
        it ('should create a new user', (done) => {
            let user = {
                username: 'abeeb',
                password: 'doyinabeeb'
            };
            api.post('/users/create')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.data).to.have.property('username');
                    expect(res.status).to.equal(200)
                })
        })
    })
});