const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const TodosRouter = Router();

const todos = [
  {
    id: 1,
    userId: 1,
    task: "Wäsche waschen",
    isDone: true,
    dueDate: new Date("2024-03-03"),
  },
  {
    id: 2,
    userId: 1,
    task: "Müll rausbrigen",
    isDone: false,
    dueDate: new Date("2024-03-03"),
  },
  {
    id: 3,
    userId: 2,
    task: "Tanzen",
    isDone: false,
    dueDate: new Date("2024-03-03"),
  },
  {
    id: 4,
    userId: 2,
    task: "Auto fahren",
    isDone: true,
    dueDate: new Date("2024-03-03"),
  },
];

// GET REQUESTS
// /v1/todos/bytodoid
TodosRouter.get("/byid", (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  res.status(StatusCodes.OK).send("Get Todo by (todo) id");
});

// Alle Todos von einer UserId
TodosRouter.get("/byuserid", (req, res) => {
  // const userId = req.body.userId;
  const userId = req.query.userId;
  //const userId = parseInt(req.query.userId);

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Keine userID");
    return;
  }

  const userTodos = todos.filter((todo) => todo.userId == userId);

  res.status(StatusCodes.OK).json(userTodos);
  // res.status(StatusCodes.OK).send(JSON.stringify(userTodos)); //alternativ
});

// GET Alle Todos
TodosRouter.get("/all", (req, res) => {
  res.status(StatusCodes.OK).send(todos);
});

// PUT REQUESTS
TodosRouter.put("/mark", (req, res) => {
  const { id, isDone } = req.body;
  // const id = req.body.id;
  // const isDone = req.body.isDone;
  res.status(StatusCodes.OK).json({ id, isDone });
});
TodosRouter.put("/update", (req, res) => {
  res.status(StatusCodes.OK).send("Todo aktuallisieren");
});

// POST REQUESTS
TodosRouter.post("/create", (req, res) => {
  res.status(StatusCodes.OK).send("Erstellen eines Todos");
});

// DELETE REQUEST
TodosRouter.delete("/delete", (req, res) => {
  res.status(StatusCodes.OK).send("DELTE Todo");
});

module.exports = { TodosRouter };
