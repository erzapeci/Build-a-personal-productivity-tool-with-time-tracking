const { createTask } = require('../../controllers/taskController');
const Task = require('../../models/Task');

jest.mock('../../models/Task'); // Mock modelin

describe('Task Controller - createTask', () => {
  const mockReq = {
    body: {
      title: 'Unit Test Task',
      description: 'Unit test description',
      userEmail: 'unit@example.com',
    },
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create task successfully', async () => {
    const mockTask = { ...mockReq.body, _id: 'fakeid123' };
    Task.create.mockResolvedValue(mockTask);

    await createTask(mockReq, mockRes);

    expect(Task.create).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockTask);
  });

  it('should handle errors gracefully', async () => {
    Task.create.mockRejectedValue(new Error('DB Error'));

    await createTask(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'DB Error' });
  });
});
