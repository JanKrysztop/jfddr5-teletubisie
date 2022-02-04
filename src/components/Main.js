import styled from "styled-components";
import "../styles.css";

const StyledMainContent = styled.main`
	grid-area: main;
	background-color: green;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Main = (props) => {
	return <StyledMainContent>{props.children}</StyledMainContent>;
};
