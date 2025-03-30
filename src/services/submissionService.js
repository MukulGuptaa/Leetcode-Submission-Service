const SubmissionProducer = require('../producers/submissionQueueProducer');
class SubmissionService {
    constructor(submissionRepository) {
        // inject here
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submission) {
        const submissionRes = this.submissionRepository.createSubmission(submission);
        if(!submissionRes) {
            // TODO: Add error handling here
            throw {messgae: "Not able to create submission"};
        }
        console.log(submissionRes);
        const response = await SubmissionProducer(submissionRes);
        return {queueResponse: response, submissionRes};
    }
}

module.exports = SubmissionService;