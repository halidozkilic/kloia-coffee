'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = require('chai').expect;
const server = require('../app')

const {singleCoffeById , newCoffee , fakeCoffee , updateCoffee , updateCoffeeFake, search} = require('../mockData/testData')

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

    /**
     * Test the POST coffee
     */
    describe("POST /coffee", () => {
        it("It should POST a new coffee", (done) => {
            const coffee = newCoffee
            chai.request(server)
                .post("/coffee")
                .send(coffee)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('coffee');
                    response.body.coffee.should.be.a('object');
                    expect(response.body.code).to.equal(200);
                    done();
                });
        });

        it("It should NOT POST a new coffee without the title and category", (done) => {
            const coffee = fakeCoffee
            chai.request(server)
                .post("/coffee")
                .send(coffee)
                .end((err, response) => {
                    response.should.have.status(400);    //  return res.status(400).json({code: 400, message: "Invalid Input", requiredField:errors})
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('requiredField');
                    response.body.requiredField.should.be.a('array');
                    expect(response.body.code).to.equal(400);
                    expect(response.body.message).to.equal("Invalid Input");
                    done();
                });
        });
    });

    /**
     * Test the UPDATE coffee (by id)
     */
    describe("PUT /coffee/:id", () => {
        it("It should PUT an existing coffee", (done) => {
            const coffeId = singleCoffeById.id
            const coffee = updateCoffee
            chai.request(server)
                .put("/coffee/" + coffeId)
                .send(coffee)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('success');
                    response.body.should.have.property('updatedCoffee');
                    response.body.updatedCoffee.should.be.a('object');
                    expect(response.body.code).to.equal(200);
                    expect(response.body.message).to.equal("Updated a single coffee");
                    done();
                });
        });

        it("It should NOT UPDATE an existing coffee with a missing data", (done) => {
            const coffeId = singleCoffeById.id
            const coffee = updateCoffeeFake
            chai.request(server)
                .put("/coffee/" + coffeId)
                .send(coffee)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('requiredField');
                    response.body.requiredField.should.be.a('array');
                    expect(response.body.code).to.equal(400);
                    expect(response.body.message).to.equal("Invalid Input");
                    done();
                });
        });

        it("It should NOT UPDATE an non-existing coffee because of wrong id", (done) => {
            const coffeId = singleCoffeById.fakeId
            const coffee = updateCoffee
            chai.request(server)
                .put("/coffee/" + coffeId)
                .send(coffee)
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

    /**
     * Test the DELETE a single coffee (by id)
     */
    describe("DELETE /coffee/:id", () => {
        it("It should DELETE an existing coffee", (done) => {
            const coffeeId = singleCoffeById.id
            chai.request(server)
                .delete("/coffee/" + coffeeId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('success');
                    response.body.should.have.property('deletedCoffee');
                    response.body.deletedCoffee.should.be.a('object');
                    expect(response.body.code).to.equal(200);
                    expect(response.body.message).to.equal("Deletes a single coffee");
                    done();
                });
        });

        it("It should NOT DELETE a coffee that is not exist", (done) => {
            const coffeeId = singleCoffeById.fakeId
            chai.request(server)
                .delete("/coffee/" + coffeeId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('error');
                    expect(response.body.code).to.equal(404);
                    expect(response.body.message).to.equal("Not Found");
                    done();
                });
        });
    });

    /**
     * Test the SEARCH a single coffee (query)
     */
    describe("SEARCH /coffee/search/:id", () => {
        it("It should SEARCH ", (done) => {
            const query = search.query
            chai.request(server)
                .get("/coffee/search/" + query)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('code');
                    response.body.should.have.property('message');
                    response.body.should.have.property('coffees');
                    response.body.coffees.should.be.a('array');
                    expect(response.body.code).to.equal(200);
                    expect(response.body.message).to.equal("search completed successfully.");
                    done();
                });
        });
    });
})