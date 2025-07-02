const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRouter=require('./routes/authRouter');
const taskRouter=require('./routes/taskRouter');
// ─── mount router ──────────────────────────────────────────
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);


app.listen(3000, () =>
  console.log('Server running at http://localhost:3000')
);
