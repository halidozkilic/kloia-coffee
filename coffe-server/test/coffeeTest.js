'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require('chai').expect;
const server = require('../app')

const {singleCoffeById } = require('../mockData/testData')


//Assertion
chai.should()
chai.use(chaiHttp);




describe('Coffee API', () => {

    /**
     * Test the GET all coffees
     */
    describe("GET /coffee", () => {
        it("It should GET all the coffees", (done) => {
            chai.request(server)
                .get("/coffee")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });

        it("It should NOT GET all the coffees", (done) => {
            chai.request(server)
                .get("/coffeess")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    /**
     * Test the GET coffee (by id)
     */
    describe("GET /coffee/:id", () => {
        it("It should GET a single coffee by ID", (done) => {
            const coffeeId  = singleCoffeById.id
            chai.request(server)
                .get("/coffee/" + coffeeId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('success');
                    response.body.should.have.property('message');
                    response.body.should.have.property('coffee');
                    response.body.coffee.should.be.a('object');
                    expect(response.body.success).to.equal(true);
                    expect(response.body.code).to.equal(200);
                    done();
                });
        });

        it("It should NOT GET a single coffee by fakeID", (done) => {
            const coffeeId = singleCoffeById.fakeId
            chai.request(server)
                .get("/coffee/" + coffeeId)
                .end((err, response) => {

                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('error');
                    expect(response.body.code).to.equal(404);
                    expect(response.body.message).to.equal("Not Found");
                    done();
                });
        });

    });





})