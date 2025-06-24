require('dotenv').config();
const mongoose = require('mongoose');
const TimeLog = require('../../models/TimeLog');

describe('TimeLog Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save a valid time log', async () => {
    const log = new TimeLog({
      userEmail: 'model@test.com',
      taskTitle: 'Task 1',
      startTime: new Date(),
      endTime: new Date(Date.now() + 10000)
    });

    const saved = await log.save();
    expect(saved._id).toBeDefined();
    expect(saved.taskTitle).toBe('Task 1');
  });

  it('should not allow endTime before startTime', async () => {
    const log = new TimeLog({
      userEmail: 'fail@test.com',
      taskTitle: 'Bad Log',
      startTime: new Date(),
      endTime: new Date(Date.now() - 10000)
    });

    await expect(log.save()).rejects.toThrow();
  });
});
