module.exports = async function (context, req) {
    try {
        let responseMessage = {
            status: 201,
            message: {}
        };

        if (!(req.body && req.body.class_id && req.body.teacher_id && req.body.attendees)) {
            let errorMessage = "Bad Request! Please supply the following parameters:";
            if (!req.body) throw new Error(errorMessage + " Body");
            if (!req.body.class_id) errorMessage += " classId";
            if (!req.body.teacher_id) errorMessage += " teacherId";
            throw new Error(errorMessage);
        }

        const class_id = req.body.class_id;
        const teacher_id = req.body.teacher_id;
        let _class = context.bindings.classes.filter(element => {
            if (element.teacher_id == teacher_id) {
                if (element.id == class_id) return true;
            }
        });

        if (_class) {
            _class.session_count += 1;
            _class.invitees.map(element => {
                if (req.body.attendess.includes(element.email)) {
                    element.attendance_count += 1;
                }
            });
            context.bindings.updateClass = _class;
            responseMessage.message = _class;
        }
        else {
            responseMessage.status = 400;
            responseMessage.message = "No class found for the provided parameters!"
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