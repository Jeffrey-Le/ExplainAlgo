export interface ProblemType {
    id?: number;
    question?: string,
    questionTitle?: string | null,
    difficulty?: DifficultyType,
    description?: string,
    example?: ExampleType,
    rubric?: object,
    created_at?: string,
    updated_at?: string,
    solutions: ProblemSolutionType[]
}

interface ExampleType {
    input?: string,
    output?: string
}

export interface ProblemSolutionType {
    id?: number,
    problem_id?: number,
    solution_text?: string,
    created_at?: string,
    updated_at?: string
}

export interface DifficultyType {
    id?: number,
    level?: string
}

export interface HistoryType {
    id?: number,
    user_id?: number,
    problem_id?: number,
    solution_id?: number,
    solved_at?: string,
    status?: string
}

export interface ProblemCategoryType {
    problem_id?: number,
    type_id?: number
}

export interface CategoryType {
    id?: number,
    type_name?: string
}

export interface UserType {
    id?: number,
    username?: string,
    email?: string,
    password_hash?: string,
    created_at?: string,
    updated_at?: string,
    role?: string
}
