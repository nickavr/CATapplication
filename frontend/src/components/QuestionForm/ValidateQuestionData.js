import cogoToast from 'cogo-toast';

export const validateQestionData = questionData => {
    if (questionData.questionText.length < 6) {
        printErrorMessage('Question text is too small', 'Wrong question text');
        return false;
    }
    if (questionData.difficulty <= 0 || questionData.difficulty > 10) {
        printErrorMessage(
            'Question difficulty must be between 1 and 10',
            'Wrong question difficulty'
        );
        return false;
    }
    if (questionData.topicName.length < 1) {
        printErrorMessage('You must provide a topic', 'Topic not provided');
        return false;
    }
    return true;
};

export const validateChoices = choicesArray => {
    let correctCounter = 0;
    if (choicesArray.length < 1) {
        printErrorMessage(
            'You must provide minimum two choices',
            'Few choices'
        );
        return false;
    }
    choicesArray.forEach(element => {
        if (element.isCorrect === true) {
            correctCounter++;
        }
        if (element.choiceText.length < 1) {
            printErrorMessage(
                'You must provide the choice text',
                'No choice text'
            );
            return false;
        }
    });
    if (correctCounter === 0) {
        printErrorMessage('Choose a correct answer', 'Select correct choice');
        return false;
    }
    if (correctCounter > 1) {
        printErrorMessage(
            'Choose only one correct answer',
            'Too many correct choices'
        );
        return false;
    }
    return true;
};

const printErrorMessage = (message, heading) => {
    cogoToast.error(`${message}`, {
        hideAfter: 3,
        position: 'top-center',
        heading: `${heading}`,
    });
};
