module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const instumentId = req.query.instrumentId;
    const instruments = context.bindings.instruments;
    let responseMessage = {
        status: 200,
        message: {}
    };

    /*GET starts */
    if (instumentId) {
        responseMessage.message = instruments.find(element => element.id == instumentId);
        if(typeof(responseMessage.message) == "undefined") responseMessage.status = 404;
    }
    else {
        responseMessage.message = instruments;
    }
    /*GET ends */

    context.res = {
        status: responseMessage.status,
        body: responseMessage.message
    };
}