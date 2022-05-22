require('dotenv').config()
const axios = require('axios')
const { assert } = require('chai')
const { expect } = require('chai').expect

const dataHelper  =  require('../utils/dataHelper');

const BASE_URL = 'https://gorest.co.in/public/v1'
let USERID = ''
let user = dataHelper.generateUser()

describe('CRUD Users', () => {

    it ('1. Create user', async() => {  

        const response = await axios.post(`${BASE_URL}/users`, user, dataHelper.getConfig())

        dataHelper.checkResponseCodeIsCreated(response)

        USERID = response.data.data.id
    })

    it ('2. Verify created user fields', async () => {

        const response = await axios.get(`${BASE_URL}/users/${USERID}`, dataHelper.getConfig())

        dataHelper.checkResponseCodeIsSuccess(response)

        let returnedUser = response.data.data 
        dataHelper.verifyUserDataIdentity(user, returnedUser)

    })

    it ('3. Update user info. Verify changes.', async () => {
        const response = await axios.patch(`${BASE_URL}/users/${USERID}`, user, dataHelper.getConfig())

        dataHelper.checkResponseCodeIsSuccess(response)

        let returnedUser = response.data.data 
        dataHelper.verifyUserDataIdentity(user, returnedUser)
    })

    it ('4. Delete user.', async () => {
        const response = await axios.delete(`${BASE_URL}/users/${USERID}`, dataHelper.getConfig())

        dataHelper.checkResponseCodeIsDeleted(response)

    })

    it ('5. Verify user deletion', async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${USERID}`, dataHelper.getConfig())
        }
        catch (error){}
    })
})

describe('Test headers', () => {

    it('Verify Content type header', async() =>{
        const response = await axios.get(`${BASE_URL}/users`, dataHelper.getConfig())
        assert.isTrue(response.headers.hasOwnProperty('content-type'), "Wrong content type")
        assert.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    })
})