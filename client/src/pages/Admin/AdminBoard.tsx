import axios from "axios";

import Container from "../../components/Container";
import InputBox from "../../components/InputBox";
import Box from "../../components/Box";
import Dropdown from "../../components/Dropdown";
import Form from "../../components/Form";

import "../../styles/admin.css";
import { useEffect, useState } from "react";

interface ProblemResponseType {
    title?: string,
    question?: string,
    difficulty?: string,
    description?: string,
    key_types?: Array<string>
    example?: object
}

type ProblemPostType = Omit<ProblemResponseType, 'title'> & {
    questionTitle?: string
}

interface PromptType {
    Prompt?: FormDataEntryValue,
    Problem?: FormDataEntryValue,
    Solution?: FormDataEntryValue
}

interface DataType {
    problem?: ProblemResponseType,
    solution?: {solution?: string},
    rubric?: object
}

function AdminBoard() {
    const [data, setData] = useState<DataType>({'problem': {}, 'solution': {}, 'rubric': {}});
    
    const [selectedType, setSelectedType] = useState<keyof DataType>('problem');

    useEffect(() => {
        console.log(data);
    }, [data]);


    const createNewEntry = async (prompt: PromptType) => {
        const allKeys = Object.keys(data) as (keyof DataType)[];

        let act = 1;
        
        while (act < 4) {
            if (act === 2 && prompt.Problem) {
                prompt.Problem = data.problem?.question;
            }

            if (act === 3 && prompt.Solution) {
                prompt.Solution = data.solution?.solution;
            }

            try {
                const response = await axios.post(`/api/problems/create?act=${act}`, prompt, {
                    headers: {
                        'Content-Type': 'application/json', // Explicitly set JSON
                    }
                });

                setData((prev) => {
                    const newData: DataType = prev;
                    newData[allKeys[act-1]] = response.data;

                    if (response.data.rubric)
                        newData[allKeys[act-1]] = response.data.rubric;

                    return newData;
                });
            }
            catch (error) {
                if (axios.isAxiosError(error))
                    console.error('Axios error:', error.response?.data);
        
                throw new Error('Failed to Peform a Problem Creation Method');
            }

            act++;
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const inputValue = formData.get('myInput');
      
        console.log(inputValue); // Logs the input value

        const prompt: PromptType = {
            "Prompt": `${inputValue}`,
            "Problem": `${inputValue}`,
            "Solution": `${inputValue}`,
        };

        if (selectedType === 'problem') {
            await createNewEntry(prompt);

            setData((prev) => {
                const newData: {problem?: ProblemPostType, solution?: {solution?: string}, rubric?: object} = prev;

                if (newData.problem)
                    newData.problem.questionTitle = prev.problem?.title;

                return newData;
            });


            const postRes = await axios.post(`/api/problems/add`, data, {
                headers: {
                    'Content-Type': 'application/json', // Explicitly set JSON
                },
                withCredentials: true
            });

            console.log(postRes.data);

            const successMsg = "Successfully created a new entry.";

            alert(successMsg);
            console.log(data);

            return;
        }

        try {
            const response = await axios.post(`/api/problems/create?act=${Object.keys(data).indexOf(selectedType)+1}`, prompt, {
                headers: {
                    'Content-Type': 'application/json', // Explicitly set JSON
                }
            });

            console.log(response.data);
            

            setData((prev) => ({
                ...prev,
                [selectedType]: response.data,
            }));
        }
        catch (error) {
            if (axios.isAxiosError(error))
                console.error('Axios error:', error.response?.data);
    
            throw new Error('Failed to Peform a Problem Creation Method');
        }
    };

    return (
        <>
            <Container classes="admin flex-col"> 
                <div style={{fontSize: '4vh', marginLeft: '5vh'}}> Admin Board </div>
                <Container style={{paddingLeft: '5vh', paddingRight: '5vh'}} classes="flex-col bg-blue-300 gap-10">
                    <Form onSubmit={handleSubmit} submitButtonText="Submit" type="container">
                        <Dropdown style={{fontSize: '3vh', marginTop: '3vh'}} classes="" setSelectedType={(value) => setSelectedType(value as keyof DataType)}>
                            <div > New Problem </div>
                            <div > Create Solution </div>
                            <div > Create Rubric </div>
                        </Dropdown>
                        <InputBox style={{maxWidth: '100%', width: '100%', height: '25vh'}}></InputBox>
                        <Box type="text"  style={{height: '20vh', marginTop: '15vh'}} classes="" >
                            {data[selectedType] ? <div><pre>{JSON.stringify(data[selectedType], null, 2) }</pre></div> : <div>None</div>}
                        </Box>
                    </Form>
                </Container>
            </Container>
        </>
    )
}

export default AdminBoard;