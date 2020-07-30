const request = require('postman-request');

const geocode = (address, MPUrl, MPapiKey, callback) => {
    const mapBoxRequest = `${MPUrl}/${encodeURIComponent(
        address
    )}.json?access_token=${MPapiKey}`;

    request({ url: mapBoxRequest, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Try again with a different search', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
