const { createLog, getLogs, deleteLog, updateLog } = require('../../controllers/timeLogController');
const TimeLog = require('../../models/TimeLog');

jest.mock('../../models/TimeLog');

describe('TimeLog Controller', () => {
  let res;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should create a log', async () => {
    const req = { body: { userEmail: 'test@test.com', taskTitle: 'Work', startTime: new Date(), endTime: new Date(Date.now() + 1000) } };
    TimeLog.create.mockResolvedValue(req.body);

    await createLog(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should get logs by userEmail', async () => {
    const req = { query: { userEmail: 'test@test.com' } };
    TimeLog.find.mockResolvedValue([{ taskTitle: 'Work' }]);

    await getLogs(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should delete a log', async () => {
    const req = { params: { id: '123' } };
    TimeLog.findByIdAndDelete.mockResolvedValue();

    await deleteLog(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Time log deleted' });
  });

  it('should update a log', async () => {
    const req = { params: { id: '123' }, body: { taskTitle: 'Updated' } };
    const updated = { _id: '123', taskTitle: 'Updated' };
    TimeLog.findByIdAndUpdate.mockResolvedValue(updated);

    await updateLog(req, res);
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});
