const express = require('express');
const taskRouter = express.Router();
const supabase = require('../services/supabase-client');

taskRouter.get('/', async (req, res) => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

taskRouter.post('/', async (req, res) => {
  const newTask = req.body;
const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser();

if (userError) {
  console.error("Failed to get user", userError);
  return;
}

const newTaskWithUser = {
  ...newTask,
  user_id: user.id, // attach user ID here
};
const { data, error } = await supabase
  .from('tasks')
  .insert([newTaskWithUser])
  .select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

taskRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('tasks')
    .update(req.body)
    .eq('id', id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data[0]);
});

taskRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

module.exports=taskRouter;