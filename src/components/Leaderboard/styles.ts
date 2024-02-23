import { styled } from "styled-components";
const LeaderStyles = styled.div`
    border: 1px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 40px;
    min-height: 300px;
    // padding: 30px 40px;

    table {
        width: 100%;
        border-radius: 40px;
        height: 100%;
    }
    .table-head {
        background-color: ${({ theme }) => theme.color.blackBg};
        color: ${({ theme }) => theme.color.white};
        padding: 10px 0;
    }
    th {
        padding: 20px 0;
    }
    table {
        border-collapse: seperate;
        border-spacing: 0;
    }

    td {
        text-transform: capitalize;
    }
    tr th,
    tr td {
        padding: 20px;
        // border-right: 1px solid #000;
        border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
    }

    /* border radius */
    tr th:nth-child(1) {
        border-radius: 40px 0 0 0;
    }

    tr th:nth-last-child(1) {
        border-radius: 0 40px 0 0;
    }

    // tr:nth-last-child(1) td:nth-child(1) {
    //     border-radius: 0 0 0 40px;
    // }

    // tr:nth-last-child(1) td:nth-last-child(1) {
    //     border-radius: 0 0 40px 0;
    // }
`;

export { LeaderStyles };
