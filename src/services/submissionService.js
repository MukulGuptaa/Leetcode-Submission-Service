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
        const submissionRes = await this.submissionRepository.createSubmission(submission); // This is coming as undefined.
        if(!submissionRes) {
            // TODO: Add error handling here
            throw {messgae: "Not able to create submission"};
        }
        const response = await SubmissionProducer(submission);
        return {queueResponse: response, submissionRes};
    }
}

module.exports = SubmissionService;