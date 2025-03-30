async function pingRequest(req, res) {
 
    
}

// TODO: Add validastion layer
async function createSubmission(req, res) {
    const response = await this.submissionService.addSubmission(req.body);
    console.log("Response from submission service", response);
    return res.status(201).send({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    })

}

module.exports =  {
    pingRequest,
    createSubmission
};