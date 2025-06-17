const zod =  require("zod");

const createTodo = zod.object({
    title: zod.string().min(1, "Title is required"),
    description: zod.string().optional(),
    completed: zod.boolean().default(false),
});
const updateTodo = zod.object({
    title: zod.string().min(1, "Title is required").optional(),
    description: zod.string().optional(),
    completed: zod.boolean().optional(),
});

module.exports = {
    createTodo,
    updateTodo,
};