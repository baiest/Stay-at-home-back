const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const server = require("../api.js");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Task API', () =>{

    /*
        Test the GET route
    */
    describe("GET /", () =>{
        it("It should GET info", (done) => {
            chai.request('http://localhost:3000')
            .get("/")
            .end((err, response) =>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('paciente');
                response.body.should.have.property('login');                               
                done();                
            });
        });

        it("It should NOT GET info", (done) => {
            chai.request('http://localhost:3000')
            .get("/.")
            .end((err, response) =>{
                response.should.have.status(404);               
                done();                
            });
        });


    });

    describe("GET /paciente/get", () =>{
        it("It should GET all pacientes registered", (done) => {
            chai.request('http://localhost:3000')
            .get("/")
            .end((err, response) =>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('paciente');
                response.body.should.have.property('login');                               
                done();                
            });
        });    
    });


    /*
        Test the POST route
    */

    
    
    /*
        Test the PATCH route
    */
});

