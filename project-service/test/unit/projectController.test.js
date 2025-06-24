const { createProject } = require('../../controllers/projectController');
const Project = require('../../models/Project');

jest.mock('../../models/Project'); // e zëvendëson Modelin real me një mock

describe('createProject', () => {
  const mockReq = {
    body: {
      title: 'Unit Test Project',
      description: 'Test description',
      userEmail: 'test@example.com',
      createdAt: '2025-06-23T10:00:00Z',
      completedAt: '2025-06-24T10:00:00Z'
    }
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('duhet të krijojë një projekt kur të dhënat janë të plota', async () => {
    const mockProject = { ...mockReq.body, _id: 'fakeid123' };
    Project.create.mockResolvedValue(mockProject);

    await createProject(mockReq, mockRes);

    expect(Project.create).toHaveBeenCalledWith({
      title: 'Unit Test Project',
      description: 'Test description',
      userEmail: 'test@example.com',
      createdAt: new Date('2025-06-23T10:00:00Z'),
      completedAt: new Date('2025-06-24T10:00:00Z')
    });

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockProject);
  });

  it('duhet të kthejë 400 nëse mungon titulli ose userEmail', async () => {
    const badReq = { body: { description: 'No title', userEmail: '' } };

    await createProject(badReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Title and userEmail are required'
    });
  });

  it('duhet të kthejë 500 nëse ndodh një gabim i papritur', async () => {
    Project.create.mockRejectedValue(new Error('DB failure'));

    await createProject(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'DB failure'
    });
  });
});
