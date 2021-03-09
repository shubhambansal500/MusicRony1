module.exports = async function (context, req) {
    try {
        let responseMessage = {
            status: 200,
            message: {}
        };

        if (!(req.query && req.query.teacher_id)) {
            let errorMessage = "Bad Request! Please supply the following parameters:";
            if (!req.query) throw new Error(errorMessage + " Query params");
            if (!req.query.teacher_id) errorMessage += " teacherId";
            throw new Error(errorMessage);
        }

        const teacher_id = req.query.teacher_id;
        const classes = context.bindings.classes.filter(element => element.teacher_id == teacher_id);
        let startDates = [];
        let endDates = [];
        let obj = {
            revenueOverall: 0,
            revenueCurrentMonth: 0,
            revenueMonthlyAverage: 0,
            anticipatedSessions: 0,
            anticipatedSessionsCurrentMonth: 0,
            anticipatedWorkHours: 0,
            anticipatedWorkHoursCurrentMonth: 0,
            totalSessionsConducted: 0,
            activeStudents: []
        }

        if (classes.length) {
            classes.map((element) => {
                let revenuePerSession = 0;
                startDates.push(new Date(element.start_date));
                endDates.push(new Date(element.end_date));
                element.invitees.map((invitee) => {
                    const activeParticipant = context.bindings.users.filter(user => {
                        if (user.email == invitee && user.user_type == "S") {
                            return user.teachers.find(item => {
                                if (item.teacher_id == teacher_id && item.instrument_id == element.instrument_id && item.is_active_student == true) {
                                    if (!obj.activeStudents.includes(invitee)) obj.activeStudents.push(invitee);
                                    return true;
                                }
                            });
                        }
                    }).length;

                    if (activeParticipant != 0) {
                        revenuePerSession += element.charge_per_session;
                    }
                });

                const currentMonth = new Date().getMonth();
                let start_date = new Date(element.start_date);

                while (start_date <= new Date(element.end_date)) {
                    if (element.recurrence.days.includes(start_date.getDay())) {
                        obj.revenueOverall += revenuePerSession;
                        obj.anticipatedSessions += 1;
                        obj.anticipatedWorkHours += (element.duration_in_minutes / 60);

                        if (currentMonth == start_date.getMonth()) {
                            obj.revenueCurrentMonth += revenuePerSession;
                            obj.anticipatedSessionsCurrentMonth += 1;
                            obj.anticipatedWorkHoursCurrentMonth += (element.duration_in_minutes / 60);
                        }

                        if (start_date <= new Date()) {
                            obj.totalSessionsConducted += 1;
                        }
                    }

                    start_date.setDate(start_date.getDate() + 1);
                }
            });

            const revenueDailyAverage = [obj.revenueOverall / ((endDates.sort()[endDates.length - 1].getTime() - startDates.sort()[0].getTime()) / (1000 * 60 * 60 * 24))];
            obj.revenueMonthlyAverage = (revenueDailyAverage * 30).toFixed(3) + " to " + (revenueDailyAverage * 31).toFixed(3);
            obj.activeStudents = obj.activeStudents.length;
            responseMessage.message = obj;
        }
        else {
            responseMessage.status = 400;
            responseMessage.message = "No matching teacherId found!"
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