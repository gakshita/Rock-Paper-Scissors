import { styled } from "styled-components";
const PrimaryButton = styled.button`
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    background-color: white;
    color: black;
    margin-top: 20px;
    text-transform: uppercase;
`;
const SecondaryButton = styled.button``;
const StyledInput = styled.input`
    background-color: transparent;
    outline: none;
    border: 2px solid white;
    padding: 10px 15px;
    border-radius: 10px;
    width: 300px;
    font-size: 1.2rem;
`;

export { PrimaryButton, SecondaryButton, StyledInput };
