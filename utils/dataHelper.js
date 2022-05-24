const { assert } = require("chai")
const { faker } = require('@faker-js/faker')

const TOKEN = process.env.TOKEN
const successCode = 200
const createdCode = 201
const deletedCode = 204
const notFoundCode = 404

module.exports = {
    generateUser,
    generatePost,
    checkResponseCodeIsSuccess,
    checkResponseCodeIsCreated,
    checkResponseCodeIsDeleted,
    checkResponseCodeIsNotFound,
    getConfig,
    verifyUserDataIdentity
}

function generateUser(){
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        gender: faker.name.gender(true).toLowerCase(),
        status: "inactive"   
    }
}
function generatePost(userId){
    return {
        user_id: userId,
        title: faker.company.bsNoun(),
        body: faker.lorem.sentence(5),   
    }
}

function checkResponseCodeIsSuccess(response){
    return assert.equal(response.status, successCode)
}

function checkResponseCodeIsCreated(response){
    return assert.equal(response.status, createdCode)
}

function checkResponseCodeIsDeleted(response){
    return assert.equal(response.status, deletedCode)
}

function checkResponseCodeIsNotFound(error){
    return assert.equal(error.response.status, notFoundCode)
}

function getConfig(){
    let config = {
        headers:{
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
        }
    }
    return config
}

function verifyUserDataIdentity(setUserObj, returnedUserObj){
    delete returnedUserObj.id
    return assert.deepEqual(setUserObj, returnedUserObj)
}