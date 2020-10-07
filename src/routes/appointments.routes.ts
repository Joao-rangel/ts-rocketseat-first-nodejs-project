import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

const appointments = []; // enquanto não associa ao db

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const checkAppontmentSchedule = appointments.find(appointment =>
    isEqual(appointment, parsedDate),
  );

  if (checkAppontmentSchedule) {
    return response
      .status(400)
      .json({ message: 'This schedule has already been scheduled' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointments);
});

export default appointmentsRouter;
