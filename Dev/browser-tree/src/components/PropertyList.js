import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import PropertyItem from './PropertyItem';


const PropertyList = ({ data: existingData, queryPath, handleSubmit, handleChange }) => {
	const [data, setData] = useState(existingData || {});

    if (!existingData) {
        useEffect(() => {
            async function fetchData() {
                const url = queryPath;
                const json = await ky.get(`${url}`).json();
                setData(json[0]);
            }
    
            fetchData();
        }, []);
    }
    else {
        useEffect(() => {
            setData(existingData);
        }, [existingData]);
    }

	const items = [];
	
	Object.keys(data).forEach((propName) => {
		if (propName == 'children' || propName == 'name') {
			return null;
		}
		else {
			items.push(<PropertyItem
                name={propName}
                value={data[propName]}
                queryPath={queryPath}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />);
		}
	});
	
	return (
		<ul>
			{items}
		</ul>
	);
}

export default PropertyList;