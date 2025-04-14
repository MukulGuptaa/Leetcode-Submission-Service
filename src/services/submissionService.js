const { fetchProblemDetails } = require('../api/problemAdminApi');
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
        
        // STEP 1 : Hit the problem admin service and fetch the problem details
        const problemId = submission.problemId;
        const userId = submission.userId;

        const problemAdminApiResponse = await fetchProblemDetails(problemId);
        // console.log("1. Problem service response: \n",problemAdminApiResponse);
        if(!problemAdminApiResponse){
            throw new SubmissionCreationError('Failed to fetch problem details from problem service');
        }

        // console.log("\nProblem data response data: \n",problemAdminApiResponse.data);
        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submission.language.toLowerCase());

        // STEP 2 : Modify the submission payload received and make it a string that is runnable code (add code stubs to it)
        submission.code = languageCodeStub.startSnippet + "\n\n" + submission.code + "\n\n" + languageCodeStub.endSnippet;
        console.log(submission.code);


        // STEP 3 : Add the final entry in the db
        const submissionRes = await this.submissionRepository.createSubmission(submission);
        if(!submissionRes) {
            throw new SubmissionCreationError('Failed to create a submission in the repository');        
        }

        // STEP 4 : Add the submission payload in the redis queue.
        const response = await SubmissionProducer({
            [submissionRes._id] : {
                code: submission.code,
                language: submission.language,
                inputCase: problemAdminApiResponse.data.testCases[0].input,
                outputCase: problemAdminApiResponse.data.testCases[0].output,
                userId,
                submissionId: submissionRes._id,
            }
        });
        return {queueResponse: response, submissionRes};
    }
}

module.exports = SubmissionService;