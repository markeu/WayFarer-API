import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../db/db';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(booking_id) from bookings', (err, result) => {
  const id = result.rows[0].max + 1;

  const validBus = {
    trip_id: 1,
    user_id: 1,
    bus_id: 1,
    seat_number: 7,
    first_name: 'uche',
    last_name: 'mark',
  };


  const User = {
    first_name: 'Mark',
    last_name: 'Lugard',
    email: 'ob@gmail.com',
    password: 'hillary',
    is_admin: true,
  };

  describe('Bookings test', () => {
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

    it('Should add valid booking details to the database', (done) => {
      chai.request(app)
        .post('/api/v1/bookings')
        .set('token', token)
        .send(validBus)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
    });


    it('Should Get all the bookings', (done) => {
	  chai.request(app)
        .get('/api/v1/bookings')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.have.a.property('data');
		    done();
        });
    });

    it('Should be able to delete Items', (done) => {
      chai.request(app)
        .delete('/api/v1/1/bookings')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });


    it('Should not be able to delete Items', (done) => {
      chai.request(app)
        .delete('/api/v1/100/bookings')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
