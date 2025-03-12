import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { Service } from "../abstract/Service";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
require('dotenv').config()

export class ReservationsController extends Contorller {
    protected service: Service;

    constructor() {
        super();
        this.service = new PageService();
    }
    public async test(Request: Request, Response: Response) {
        await DB.connection?.query("USE lab_b310;");
        const sql = `
        SELECT 
            r.reservation_id, 
            s.student_id, 
            s.student_name, 
            se.row_label, 
            se.seat_number, 
            t.start_time, 
            t.end_time, 
            r.create_time
        FROM Reservations r
        LEFT JOIN Students s ON r.student_id = s.student_id
        LEFT JOIN Seats se ON r.seat_id = se.seat_id
        LEFT JOIN Timeslots t ON r.timeslot_id = t.timeslot_id
        ORDER BY r.create_time;
    `;

        const resp = await DB.connection?.query(sql);
        Response.send(resp)
    }
    
    }
