import { styled } from "styled-components";
const Container = styled.div`
    border: 1px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 40px;
    padding: 10px 15px;
    font-size: 1.2rem;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    min-height: 200px;
    @media only screen and (min-width: 900px) {
        width: 300px;
    }

    .players {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
    }
    .name {
        font-size: ${({ theme }) => theme.fontSize.md};
        text-transform: capitalize;
    }

    .placeholder {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${({ theme }) => theme.fontSize.md};
    }
`;

export { Container };
