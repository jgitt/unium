import { h } from 'preact';
import styled from 'styled-components';

const Root = styled.button`
	padding: 0;
	margin: 0;
	border: none;
	background: transparent;
	width: 20px;
	cursor: pointer;
`;

const NoChildren = styled.div`
	display: inline-block;
	width: 20px;
`;

const ExpandCollapseButton = ({ hasChildren, isExpanded, onClick }) => {
	if (hasChildren) {
		return <Root onClick={onClick}>{isExpanded ? '-' : '+'}</Root>;
	}
	else {
		return <NoChildren>&nbsp;</NoChildren>
	}
}

export default ExpandCollapseButton;