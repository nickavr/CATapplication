import cogoToast from 'cogo-toast';

const MIN_MINUTES = 10;
const MAX_MINUTES = 60;
const MIN_QUESTIONS = 10;
const MAX_QUESTIONS = 50;
//TODO: pass as max question no. the actual no. from db

const validateInput = testData => {
    if (testData.usersForTest.length === 0) {
        cogoToast.error(`You must select at least one examinee.`, {
            hideAfter: 3,
            position: 'top-center',
            heading: 'No examinee selected',
        });
        return false;
    } else if (
        testData.maxMinutes < MIN_MINUTES ||
        testData.maxMinutes > MAX_MINUTES
    ) {
        cogoToast.error(
            `Minutes must be between ${MIN_MINUTES} and ${MAX_MINUTES}`,
            {
                hideAfter: 3,
                position: 'top-center',
                heading: 'Wrong minutes input',
            }
        );
        return false;
    } else if (
        testData.maxQuestions < MIN_QUESTIONS ||
        testData.maxQuestions > MAX_QUESTIONS
    ) {
        cogoToast.error(
            `Questions must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}`,
            {
                hideAfter: 3,
                position: 'top-center',
                heading: 'Wrong questions input',
            }
        );
        return false;
    }

    return true;
};

export default validateInput;
