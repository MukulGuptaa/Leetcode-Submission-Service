const SubmissionCreationError = require("../errors/submissionCreationError");

async function pingRequest(req, res) {
 
    
}

// TODO: Add validastion layer
async function createSubmission(req, res) {
    try {
        const response = await this.submissionService.addSubmission(req.body);
        return res.status(201).send({
            error: {},
            data: response,
            success: true,
            message: 'Created submission successfully'
        });
    } catch (error) {
        throw new SubmissionCreationError(error.message);
    }
    

}

module.exports =  {
    pingRequest,
    createSubmission
};