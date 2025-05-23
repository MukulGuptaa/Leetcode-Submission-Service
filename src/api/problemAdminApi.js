const axiosInstance = require('../config/axiosInstance');
const { PROBLEM_ADMIN_SERVICE_URL } = require('../config/serverConfig');
const PROBLEM_ADMIN_API_URL = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

async function fetchProblemDetails(problemId){
    try {
        const uri = PROBLEM_ADMIN_API_URL + `/problems/${problemId}`;
        const response = await axiosInstance.get(uri);
        return response.data;
    } catch (error) {
        console.error("Error fetching problem details:", error)        
        throw error;
    }
}

module.exports = {
    fetchProblemDetails
}