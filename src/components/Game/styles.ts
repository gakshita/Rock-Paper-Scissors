import { styled } from "styled-components";
const GameStyles = styled.div`
    border: 1px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 40px;
    padding: 30px 40px;
    width: 100%;
    flex: 1;
    min-height: 500px;
    display: flex;
    flex-direction: column;

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        flex: 1;
    }
    .col {
        flex-direction: column;
        gap: 0px;
    }
    .circle {
        width: 150px;
        height: 150px;
        padding: 20px;
        border-radius: 50%;
        justify-content: center;
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 5px 5px #0000001a;
    }

    .pulse {
        animation: pulse-animation 1s infinite;
    }

    @keyframes pulse-animation {
        0% {
            box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
        }
        100% {
            box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
        }
    }

    .options {
        max-width: 350px;
        flex-wrap: wrap;
    }
    .options .circle,
    .result .circle {
        background-color: ${({ theme }) => theme.color.whiteBg};
        width: 100px;
        height: 100px;
        margin: auto;
        cursor: pointer;
        transition: 0.3s;
    }
    .options .circle:hover {
        transform: scale(1.05);
    }
    .result img,
    .options img {
        width: 50px;
    }

    .result .circle {
        cursor: default;
    }
    .red {
        border: 10px solid ${({ theme }) => theme.color.red};
    }
    .blue {
        border: 10px solid #4865f4;
    }
    .yellow {
        border: 10px solid #ec9e0e;
    }

    .desc {
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: ${({ theme }) => theme.fontSize.xl};
    }

    .waiting,
    .placeholder {
        background-color: ${({ theme }) => theme.color.blackBg} !important;
        border: 10px solid transparent;
    }

    .label {
        margin: 20px;
        font-size: ${({ theme }) => theme.fontSize.md};
    }
    .final-result {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .won {
        color: ${({ theme }) => theme.color.green};
    }
    .lost {
        color: ${({ theme }) => theme.color.red};
    }
    .choices {
        margin-bottom: 40px;
    }
`;

export { GameStyles };
