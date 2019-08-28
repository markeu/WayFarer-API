import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../db/db';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(id) from buses', (err, result) => {
  const id = result.rows[0].max + 1;

  const validBus = {
    number_plate: 'NSR 122 TP',
    model: 'Volvo',
    year: 2098,
    manufacturer: 'GM',
    capacity: 18,
  };
  const editBus = {
    number_plate: 'NSR 122 TP',
    model: 'Toyota',
    year: 2098,
    manufacturer: 'Sedan',
    capacity: 18,
  };


  const User = {
    first_name: 'Mark',
    last_name: 'Lugard',
    email: 'obioma@gmail.com',
    password: 'hillary',
    is_admin: true,
  };

  describe('Bus test', () => {
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

    it('Should add valid bus details to the database', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('token', token)
        .send(validBus)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
    });

  
    it('Should Get all the buses', (done) => {
	  chai.request(app)
        .get('/api/v1/bus')
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
        .get('/api/v1/10/bus')
        .set('token', token)
		  .end((err, res) => {
          res.should.have.status(404);
          done();
		  });
	  });
    it('Should not edit bus when supplied inexistent item id', (done) => {
      chai.request(app)
        .patch('/api/v1/100/bus')
        .set('token', token)
        .send({ capacity: 4 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should update Bus', (done) => {
      chai.request(app)
        .patch(`/api/v1/${id}/bus`)
        .set('token', token)
        .send(editBus)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
		  });

    it('Should not be able to delete Items', (done) => {
      chai.request(app)
        .delete('/api/v1/100/bus')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
