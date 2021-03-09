module.exports = async function (context, req) {
    try {
        let responseMessage = {
            status: 201,
            message: {}
        };

        /* Validation starts */
        if (req.method == "POST") {
            if (!(req.body && req.body.class_name && req.body.email_id && req.body.instrument_id && req.body.charge_per_session && req.body.invitees && req.body.policy && req.body.start_date && req.body.end_date)) {
                let message = "Incorrect payload! Following inputs are incorrect or missing:";
                if (!req.body) throw new Error(message + " Payload");
                if (!req.body.class_name) message += " ClassTitle";
                if (!req.body.email_id) message += " hostEmail";
                if (!req.body.instrument_id) message += " instrumentId";
                if (!req.body.start_date) message += " startDate";
                if (!req.body.end_date) message += " endDate";
                if (!req.body.charge_per_session) message += " chargePerSession";
                if (!req.body.policy) message += " policy";
                if (!req.body.invitees) message += " invitees";
                throw new Error(message);
            }
        }

        if (req.method == "GET") {
            if (!(req.query && req.query.email_id)) {
                let errorMessage = "Bad Request! Please supply the following parameters:";
                if (!req.query) throw new Error(errorMessage + " Query params");
                if (!req.query.email_id) errorMessage += " hostEmail";
                throw new Error(errorMessage);
            }
        }
        /* Validation ends */

        if (!req.body) req.body = {};
        const classes = context.bindings.classes;
        const users = context.bindings.users;
        const instruments = context.bindings.instruments;
        const class_name = req.body.class_name;
        const email_id = req.method == "GET" ? req.query.email_id : req.body.email_id;
        const teacher_id = users.find(element => element.email == email_id) ? users.find(element => element.email == email_id).id : null;
        const instrument_id = req.method == "GET" ? req.query.instrument_id : req.body.instrument_id;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const description = req.body.description;
        const duration_in_minutes = req.body.duration_in_minutes;
        const recurrence = req.body.recurrence;
        const prerequisites = req.body.prerequisites;
        const level = req.body.level;
        const charge_per_session = req.body.charge_per_session;
        const policy = req.body.policy;
        const enable_recording = req.body.enable_recording;
        const invitees = req.body.invitees;

        if (req.method == "POST") {
            if (teacher_id && (instruments.find(element => element.id == instrument_id) ? instruments.find(element => element.id == instrument_id).id : null)) {
                let obj = {
                    class_name: class_name,
                    teacher_id: teacher_id,
                    email: email_id,
                    instrument_id: instrument_id,
                    start_date: start_date,
                    end_date: end_date,
                    description: description,
                    duration_in_minutes: duration_in_minutes,
                    recurrence: recurrence,
                    prerequisites: prerequisites,
                    level: level,
                    charge_per_session: charge_per_session,
                    policy: policy,
                    enable_recording: enable_recording,
                    invitees: invitees
                };
                context.bindings.newClass = obj;
                responseMessage.message = obj;
            }
            else {
                responseMessage.status = 400;
                responseMessage.message = "Incorrect host email or instrument_id.";
            }
        }

        if (req.method == "GET") {
            if (teacher_id && (instrument_id ? instruments.find(element => element.id == instrument_id).id : true)) {
                const arr = classes.filter(element => element.teacher_id == teacher_id);
                responseMessage.status = 200;
                responseMessage.message = instrument_id ? arr.filter(element => element.instrument_id == instrument_id) : arr;
            }
            else {
                responseMessage.status = 400;
                responseMessage.message = "Incorrect host email or instrument_id.";
            }
        }

        context.res = {
            status: responseMessage.status,
            body: responseMessage.message
        };
    }
    catch (err) {
        context.res = {
            status: 400,
            body: err.message
        };
    }
}