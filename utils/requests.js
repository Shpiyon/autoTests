const axios = require('axios')
const generateUser  =  require('../utils/dataHelper').generateUser
const checkResponseCodeIsCreated  =  require('../utils/dataHelper').checkResponseCodeIsCreated
const getConfig  =  require('../utils/dataHelper').getConfig
const BASE_URL = 'https://gorest.co.in/public/v1'

module.exports = {
    createUser,

}

async function createUser(){
    await Promise.resolve()
    const response = await axios.post(`${BASE_URL}/users`, generateUser, getConfig)
    checkResponseCodeIsCreated(response)

    return {
        USERID : response.data.data.id,
        USERNAME : response.data.data.name
    }
}