const computeArrayForPolar = (polarData, topics) => {
    let topicsData = [];
    topics.forEach(element => {
        topicsData.push({
            totalSum: polarData.filter(i => i.topicId === element.id).length,
            noCorrectAnswers: polarData.filter(
                i => i.topicId === element.id && i.isCorrect
            ).length,
            topic: element.topic_name,
        });
    });

    let labels = [];
    let data = [];

    topicsData.forEach(element => {
        labels.push(element.topic);
        data.push((element.noCorrectAnswers * 100) / element.totalSum);
    });

    let polarPlotObject = {
        labels: labels,
        datasets: [
            {
                label: 'Topics accuracy in %',
                data: data,
                backgroundColor: [`#f1c40f`],
                borderWidth: 1,
            },
        ],
    };
    console.log(polarPlotObject);

    return polarPlotObject;
};

const computeArrayForLine = lineData => {
    let labels = [];
    let data = [];

    lineData.forEach((element, i, arr) => {
        labels.push((i + 1).toString());
        data.push(element.currentAbility);
    });

    let lineCoordinatesDataArray = {
        labels: labels,
        datasets: [
            {
                data: data,
                label: 'Ability evolution',
                backgroundColor: `#f1c40f`,
                borderColor: `#f1c40f`,
            },
        ],
    };

    return lineCoordinatesDataArray;
};

module.exports = {
    computeArrayForPolar,
    computeArrayForLine,
};
