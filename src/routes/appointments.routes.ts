import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointments: Appointment[] = []; // TO DO add db

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const checkAppontmentSchedule = appointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (checkAppontmentSchedule) {
    return response
      .status(400)
      .json({ message: 'This schedule has already been scheduled' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
