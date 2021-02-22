import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import ComponentList from './ComponentList';
import InputField from './InputField';
import PropertyList from './PropertyList';


const PropertyItem = ({ name, value, queryPath, handleChange: handleChangeOverride, handleSubmit: handleSubmitOverride }) => {
	const [isExpanded, setExpanded] = useState(false);
	const [isPropsShown, setIsPropsShown] = useState(false);
    const [newValue, setNewValue] = useState(value);

    const isValueAnObject = typeof value == 'object';

    useEffect(() => {
        setNewValue(value);
    }, [value]);

	const handleExpandClick = () => {
		setExpanded(!isExpanded);
	}

	const handleClick = () => {
		setIsPropsShown(!isPropsShown);
	}

    const handleSubmit = handleSubmitOverride || (async (e) => {
        e.preventDefault();
        const encodedValue = isValueAnObject ? JSON.stringify(newValue) : newValue;
        const url = `${queryPath}.${name}=${encodedValue}`;
        console.log('update properties', url);
        const json = await ky.get(url).json();
        console.log('update done', url, json);
    });

    const handleChange = handleChangeOverride || ((e) => {
        e.preventDefault();

        if (isValueAnObject) {
            const isValueANumber = typeof value[e.target.name] == 'number';
            const updatedValue = Object.assign({}, newValue, { [e.target.name]: isValueANumber ? parseFloat(e.target.value) : e.targetValue });
            setNewValue(updatedValue);
        }
        else {
            setNewValue(typeof value == 'number' ? parseFloat(e.target.value) : e.target.value);
        }
    });

    let valueComponent;

    if (name == 'components') {
        valueComponent = <ComponentList componentList={value} queryPath={queryPath} />;
    }
    else if (isValueAnObject) {
        valueComponent = <PropertyList queryPath={queryPath} data={newValue} handleSubmit={handleSubmit} handleChange={handleChange} />
    }
    else {
        valueComponent = <InputField name={name} value={newValue} handleSubmit={handleSubmit} handleChange={handleChange} />;
    }

	return <li>
		<div>{name}: {valueComponent}</div>
	</li>
}

export default PropertyItem;