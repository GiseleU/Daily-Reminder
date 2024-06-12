export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const newTask = req.body;
    tasks.push(newTask);
    return res.status(201).json(newTask);
  } else if (req.method === 'DELETE') {
    const taskId = req.query.id; // or req.params.id, depending on your route setup
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      return res.status(204).json({ message: 'Task deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Task not found' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}