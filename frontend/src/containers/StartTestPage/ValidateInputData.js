import cogoToast from 'cogo-toast';

const MIN_MINUTES = 10;
const MAX_MINUTES = 60;
const MIN_QUESTIONS = 10;
const MAX_QUESTIONS = 50;

const validateInput = testData => {
    if (testData.usersForTest.length === 0) {
        cogoToast.error(`You must select at least one examinee.`, {
            hideAfter: 3,
            position: 'top-center',
            heading: 'No examinee selected',
        });
        return false;
    } else if (
        testData.minMinutes < MIN_MINUTES ||
        testData.minMinutes > MAX_MINUTES
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
        testData.minQuestions < MIN_QUESTIONS ||
        testData.minQuestions > MAX_QUESTIONS
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
