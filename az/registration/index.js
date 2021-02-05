module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = req.body.username;
    const password = req.body.password;
    const retypePassword = req.body.retype_password;
    const userType = req.body.user_type;
    let responseMessage = {
        status: 201,
        message: {}
    };
    
    /*GET */
    if(!req.body.create) {
        if(context.bindings.users.find(element => element.username == name) && (context.bindings.users.find(element => element.username == name)).invalid_logins <= 4) {
            if((context.bindings.users.find(element => element.username == name)).password == password) {
                responseMessage.status = 200;
                responseMessage.message = context.bindings.users.find(element => element.username == name);
                context.bindings.newUser = {
                    id: (context.bindings.users.find(element => element.username == name)).id,
                    username: name,
                    password: password,
                    lock_id: false,
                    user_type: (context.bindings.users.find(element => element.username == name)).user_type,
                    invalid_logins: 0,
                    _rid: (context.bindings.users.find(element => element.username == name))._rid,
                    _self: (context.bindings.users.find(element => element.username == name))._self,
                    _etag: (context.bindings.users.find(element => element.username == name))._etag,
                    _attachments: (context.bindings.users.find(element => element.username == name))._attachments,
                    _ts: (context.bindings.users.find(element => element.username == name))._ts
                };
            }
            else{
                if((context.bindings.users.find(element => element.username == name)).invalid_logins + 1 <= 4) {
                    context.bindings.newUser = {
                        id: (context.bindings.users.find(element => element.username == name)).id,
                        username: name,
                        password: (context.bindings.users.find(element => element.username == name)).password,
                        lock_id: false,
                        user_type: (context.bindings.users.find(element => element.username == name)).user_type,
                        invalid_logins: (context.bindings.users.find(element => element.username == name)).invalid_logins + 1,
                        _rid: (context.bindings.users.find(element => element.username == name))._rid,
                        _self: (context.bindings.users.find(element => element.username == name))._self,
                        _etag: (context.bindings.users.find(element => element.username == name))._etag,
                        _attachments: (context.bindings.users.find(element => element.username == name))._attachments,
                        _ts: (context.bindings.users.find(element => element.username == name))._ts
                    };
                    responseMessage.status = 401;
                    responseMessage.message = "Unauthorized! Supplied password is incorrect.";
                }
                else {
                    context.bindings.newUser = {
                        id: (context.bindings.users.find(element => element.username == name)).id,
                        username: name,
                        password: (context.bindings.users.find(element => element.username == name)).password,
                        lock_id: true,
                        user_type: (context.bindings.users.find(element => element.username == name)).user_type,
                        invalid_logins: (context.bindings.users.find(element => element.username == name)).invalid_logins + 1,
                        _rid: (context.bindings.users.find(element => element.username == name))._rid,
                        _self: (context.bindings.users.find(element => element.username == name))._self,
                        _etag: (context.bindings.users.find(element => element.username == name))._etag,
                        _attachments: (context.bindings.users.find(element => element.username == name))._attachments,
                        _ts: (context.bindings.users.find(element => element.username == name))._ts
                    };
                    responseMessage.status = 401;
                    responseMessage.message = "Unauthorized! Supplied password is incorrect. Account has been locked.";
                }
            }
        }
        else{
            responseMessage.status = 403;
            responseMessage.message = "Forbidden! Either the user doesn't exist or has been locked."
        }
    }
    /*GET ends */

    /*POST */
    if(req.body.create) {
        if(context.bindings.users.find(element => element.username == name)) {
            responseMessage.status = 409;
            responseMessage.message = "Username already registered!";
        }
        else {
            if(password === retypePassword) {
                context.bindings.newUser = {
                    username: name,
                    password: password,
                    user_type: userType,
                    invalid_logins: 0,
                    lock_id: false
                };
                responseMessage.message = {
                    username: name,
                    user_type: userType
                };
            }
            else {
                responseMessage.status = 412;
                responseMessage.message = "Precondition Failed! Primary and Secondary passwords did not match.";
            }
        }
    }
    /*POST ends */

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: responseMessage.status,
        body: responseMessage
    };
}