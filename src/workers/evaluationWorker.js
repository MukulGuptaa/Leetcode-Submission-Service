const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queueName){
    new Worker('EvaluationQueue', async (job) => {
        if(job.name == "EvaluationJob"){

            console.log("Evaluation job data: ", job.data)


            const response = await axios.post('http://localhost:5600/sendPayload', {
                userId: job.data.userId,
                payload: job.data
            });
            console.log("Response from socket server: ", response);
        }
    }, {connection: redisConnection});
}



module.exports = evaluationWorker;