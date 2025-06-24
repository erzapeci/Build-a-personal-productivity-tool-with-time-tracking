const mongoose = require('mongoose');
const Task = require('../../models/Task');

describe('Task Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should create & save a task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test description',
      status: 'incomplete',
      userEmail: 'test@example.com',
    };

    const task = new Task(taskData);
    const saved = await task.save();

    expect(saved._id).toBeDefined();
    expect(saved.title).toBe(taskData.title);
  });
});
