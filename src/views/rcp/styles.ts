import { styled } from "styled-components";
const Container = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    text-transform: capitalize;

    .top-container {
        display: flex;
        gap: 40px;

        width: 100%;
    }
    @media only screen and (max-width: 1200px) {
        width: 100%;
    }
    @media only screen and (max-width: 900px) {
        .top-container {
            flex-direction: column;
        }
    }
    @media only screen and (max-width: 600px) {
        margin: 30px auto;
        // width: 100vw;
    }
`;

export { Container };
