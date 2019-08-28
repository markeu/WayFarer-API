import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../db/db';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(id) from trips', (err, result) => {
  const id = result.rows[0].max + 1;

  const validTrip = {
    bus_id: 1,
    origin: 'LAGOS',
    destination: 'UYO',
    fare: 560009,
    status: 'Cancelled',
  };

  const editTrip = {
    bus_id: 1,
    origin: 'GHANA',
    destination: 'AWKA',
    fare: 560009,
    status: 'ACTIVE',
  };


  const User = {
    first_name: 'Mark',
    last_name: 'Lugard',
    email: 'uch@gmail.com',
    password: 'mickey',
    is_admin: true,
  };

  describe('Trips test', () => {
    let token;
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(User)
        .end((err, res) => {
          token = res.body.data.token;
          done();
        });
    });

    it('Should add valid trips to the database', (done) => {
      chai.request(app)
        .post('/api/v1/trip')
        .set('token', token)
        .send(validTrip)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
    });

    // Test for get trip
    it('Should Get all the Trips', (done) => {
	  chai.request(app)
        .get('/api/v1/trip')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.have.a.property('data');
		    done();
        });
    });

    it('Should not Get a null items', (done) => {
      chai.request(app)
        .get('/api/v1/100/trip')
        .set('token', token)
		  .end((err, res) => {
          res.should.have.status(404);
          done();
		  });
	  });
    it('Should not edit trip when supplied inexistent trip id', (done) => {
      chai.request(app)
        .patch('/api/100/trip')
        .set('token', token)
        .send(validTrip)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('Should update trip', (done) => {
      chai.request(app)
        .patch(`/api/v1/${id}/trip`)
        .set('token', token)
        .send(editTrip)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
		  });

    it('Should not be able to delete Trip', (done) => {
      chai.request(app)
        .delete('/api/v1/100/trip')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
