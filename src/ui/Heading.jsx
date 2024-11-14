import styled, { css } from 'styled-components';

// импортируем встроенную функцию css из библиотеки styled-components для подсветки синтаксиса CSS и выполнения динамического кода
// const test = css`
//     text-align: center;
//     ${10 > 5 && 'background-color: white'}
// `;

const Heading = styled.h1`
    ${(props) =>
        props.as === 'h1' &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.as === 'h2' &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.as === 'h3' &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}

    line-height: 1.4;
`;

export default Heading;
