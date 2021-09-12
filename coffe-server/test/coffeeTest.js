'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require('chai').expect;
const server = require('../app')

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




})