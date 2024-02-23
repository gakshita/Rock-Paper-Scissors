import { useState } from "react";
import { PrimaryButton, StyledInput } from "../../styles";
import { Container } from "./styles";
import { useDispatch } from "react-redux";
import { addPlayer } from "../../app/playerSlice";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = uuidv4();
        // Add player to store
        dispatch(addPlayer({ name, id }));
        // Set session storage
        sessionStorage.setItem("id", id);
    };

    return (
        <Container onSubmit={handleSubmit}>
            <StyledInput
                value={name}
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            ></StyledInput>
            <PrimaryButton>Login</PrimaryButton>
        </Container>
    );
};

export default Login;
