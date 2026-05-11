import Todo from "../Models/todoSchema.js";

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    const todo = await Todo.create({ title, user: req.user.id });

    res.status(200).json({ success: true, todo });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Param ID:", id);
    console.log("User ID from token:", req.user.id);

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },{
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      todo: updatedTodo,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    // const {id} = req.params
    const todos = await Todo.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await Todo.findOneAndDelete({ user: req.user.id });

    res.status(200).json("deleted successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or unauthorized",
      });
    }

    todo.completed = !todo.completed;

    const updatedTodo = await todo.save();

    return res.status(200).json({
      success: true,
      todo: updatedTodo,
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export { createTodo, updateTodo, getAllTodo, deleteTodo, toggleTodo };
