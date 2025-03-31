const SubmissionCreationError = require('../errors/submissionCreationError');
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
            throw new SubmissionCreationError('Failed to create a submission in the repository');        
        }
        const response = await SubmissionProducer(submission);
        return {queueResponse: response, submissionRes};
    }
}

module.exports = SubmissionService;