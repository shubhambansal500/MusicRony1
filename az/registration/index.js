module.exports = async function (context, req) {
    try {
        let responseMessage = {
            status: 201,
            message: {}
        };
        let errorMessage = "Incorrect payload! Following inputs are incorrect or missing:";
        const errorMessageLength = errorMessage.length;

        /*Input validation starts */
        if (req.method == "POST") {
            if (!(req.body && req.body.email && req.body.first_name && req.body.last_name && req.body.user_type && req.body.gender && req.body.DOB && req.body.age)) {
                if (!req.body) throw new Error(errorMessage + " Payload.");
                if (!req.body.email) errorMessage += " email";
                if (!req.body.user_type) errorMessage += " userType";

                if (req.body.user_type != "S") {
                    if (!req.body.first_name) errorMessage += " firstName";
                    if (!req.body.last_name) errorMessage += " lastName";
                    if (!req.body.gender) errorMessage += " gender";
                    if (!req.body.DOB) errorMessage += " DOB";
                    if (!req.body.age) errorMessage += " age";
                }
                if (errorMessage.length != errorMessageLength) throw new Error(errorMessage);
            }
        }

        if (req.method == "GET") {
            if (!(req.query && req.query.emailId)) {
                errorMessage = "Bad Request! Please supply the valid parameters.";
                throw new Error(errorMessage);
            }
        }

        if (req.method == "PUT") {
            if (!(req.query && req.query.emailId && req.query.teacherId && req.query.instrument_id && req.query.is_active_student)) {
                errorMessage = "Bad Request! Please supply the valid parameters.";
                throw new Error(errorMessage);
            }
        }
        /*Input validation ends */

        if (typeof (req.body) != "object") req.body = {};

        const email = req.body.email;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const userType = req.body.user_type;
        const gender = req.body.gender;
        const DOB = req.body.DOB;
        const age = req.body.age;
        const months_of_experience = req.body.months_of_experience;
        const experience_level = req.body.experience_level;
        const instruments = req.body.instruments;
        const about_the_author = req.body.about_the_author;
        const video_links = req.body.video_links;
        const average_number_of_classes_per_week = req.body.average_number_of_classes_per_week;
        const teachers = req.body.teachers;
        const emailId = req.query.emailId;
        const teacherId = req.query.teacherId;
        const instrumentId = req.query.instrument_id;
        const isActiveStudent = req.query.is_active_student;
        const users = context.bindings.users;               //List of users

        /*Authentication starts */
        if (req.method == "GET") {
            if (users.find(element => element.email == emailId) && (users.find(element => element.email == emailId)).lock_id != true) {
                responseMessage.status = 200;
                responseMessage.message = users.find(element => element.email == emailId);
            }
            else {
                responseMessage.status = 403;
                responseMessage.message = "Forbidden! Either the user doesn't exist or has been locked."
            }
        }
        /*Authentication ends */

        /*Registration starts */
        if (req.method == "POST") {
            if (users.find(element => element.email == email)) {
                responseMessage.status = 409;
                responseMessage.message = "Username already registered!";
            }
            else {
                context.bindings.newUser = {
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    user_type: userType,
                    gender: gender,
                    DOB: DOB,
                    age: age,
                    lock_id: false,
                    teachers: teachers,
                    months_of_experience: months_of_experience,
                    experience_level: experience_level,
                    instruments: instruments,
                    about_the_author: about_the_author,
                    video_links: video_links,
                    average_number_of_classes_per_week: average_number_of_classes_per_week
                };
                responseMessage.message = {
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    user_type: userType
                };
            }
        }
        /*Registration ends */

        /*Student updatation starts */
        if (req.method == "PUT") {
            if (users.find(element => element.email == emailId) && (users.find(element => element.email == emailId)).lock_id != true) {
                let obj = users.find(element => element.email == emailId);
                const elementIndex = obj.teachers.findIndex(element => {
                    if (element.teacher_id == teacherId && element.instrument_id == instrumentId && element.is_active_student == false) {
                        return true
                    }
                });
                if (elementIndex != -1 && isActiveStudent == "true") {
                    obj.teachers[elementIndex].is_active_student = true;
                    context.bindings.newUser = obj;
                    responseMessage.status = 200;
                    responseMessage.message = obj;
                }
                else {
                    responseMessage.status = 400;
                    responseMessage.message = "No such teacher student instrument combination exist or the activation parameter is invalid."
                }
            }
            else {
                responseMessage.status = 403;
                responseMessage.message = "Forbidden! Either the user doesn't exist or has been locked."
            }
        }
        /*Student updatation ends */

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