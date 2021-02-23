import { h } from 'preact';
import styled from 'styled-components';
import GameObjectList from './components/GameObjectList';
import './style';


const Root = styled.div`
	margin: 0 0 0 10px;
	padding: 0;
`;

const App = () => {
	return (
		<Root>
			<GameObjectList queryPath="http://localhost:8342/q/scene" />
		</Root>
	);
}

export default App;