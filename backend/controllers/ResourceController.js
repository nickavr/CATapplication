const googleIt = require('google-it');

const putGoogleLinks = async topics => {
    let allLinks = [];
    try {
        for (let i = 0; i < topics.length; i++) {
            let result = await googleIt({ query: `${topics[i].topic_name}` });
            allLinks.push({ topic: topics[i].topic_name, links: result });
        }
        return allLinks;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getLinks = async (req, res) => {
    putGoogleLinks(req.body.topics).then(links => res.status(200).send(links));
};

module.exports = {
    getLinks,
};
