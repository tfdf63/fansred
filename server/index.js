const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(cors());

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', (req, res) => {
  res.json({
    message: 'привет алтимат',
  });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
