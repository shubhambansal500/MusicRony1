module.exports = async function (context, req) {
    try {
        /*Input validation starts */
        if (!(req.query && req.query.teacherId && req.query.active)) {
            errorMessage = "Bad Request! Please supply the valid parameters.";
            throw new Error(errorMessage);
        }
        /*Input validation ends */

        const teacherId = req.query.teacherId;
        const students = context.bindings.users.filter(element => {
            if (element.user_type == "S") {
                if (element.teachers.filter(item => item.teacher_id == teacherId && item.is_active_student == (req.query.active == "true" ? true : false)).length > 0) return true;
            }
        });

        context.res = {
            status: 200,
            body: students
        };
    }
    catch (err) {
        context.res = {
            status: 400,
            body: err.message
        };
    }
}