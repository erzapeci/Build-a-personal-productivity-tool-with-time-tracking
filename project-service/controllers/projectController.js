const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, userEmail, createdAt, completedAt } = req.body;

    if (!title || !userEmail) {
      return res.status(400).json({ error: 'Title and userEmail are required' });
    }

    const project = await Project.create({
      title,
      description,
      userEmail,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      completedAt: completedAt ? new Date(completedAt) : undefined,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { userEmail } = req.query;
    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail is required' });
    }

    const projects = await Project.find({ userEmail });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
