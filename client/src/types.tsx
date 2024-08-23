interface ProblemType {
    id?: number;
    question?: string,
    question_title?: string,
    difficulty?:DifficultyType,
    created_at?: string,
    updated_at?: string,
    solutions: ProblemSolutionType[]
}

interface ProblemSolutionType {
    id?: number,
    problem_id?: number,
    solution_text?: string,
    created_at?: string,
    updated_at?: string
}

interface DifficultyType {
    id?: number,
    level?: string
}

interface HistoryType {
    id?: number,
    user_id?: number,
    problem_id?: number,
    solution_id?: number,
    solved_at?: string,
    status?: string
}

interface ProblemCategoryType {
    problem_id?: number,
    type_id?: number
}

interface CategoryType {
    id?: number,
    type_name?: string
}

interface UserType {
    id?: number,
    username?: string,
    email?: string,
    password_hash?: string,
    created_at?: string,
    updated_at?: string,
    role?: string
}

export type {ProblemType};