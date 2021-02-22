import { h } from 'preact';
import styled from 'styled-components';
import GameObjectList from './components/GameObjectList';


const Root = styled.ul`
	margin: 0 0 0 10px;
	padding: 0;
    list-style-type: none;
`;

const App = () => {
	return (
		<Root>
			<GameObjectList queryPath="http://localhost:8342/q/scene" />
		</Root>
	);
}

export default App;