import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';
import ky from 'ky';
import ComponentList from './ComponentList';
import InputField from './InputField';
import PropertyList from './PropertyList';


const PropertyItem = ({ name, value, queryPath, handleChange: handleChangeOverride, handleSubmit: handleSubmitOverride }) => {
    const [savedValue, setSavedValue] = useState(value);
    const [newValue, setNewValue] = useState(value);
    // this key forces the fields to update when new data is returned. this happens when an invalid value is submitted, which then
    // responds with the old value.
    const [itemKey, setItemKey] = useState(Math.random());

    const isValueAnObject = typeof value == 'object';

    useEffect(() => {
        setNewValue(value);
    }, [value]);

    useEffect(() => {
        if (typeof value == 'boolean' && savedValue != newValue) submit();
    }, [newValue]);

    const submit = async () => {
        const encodedValue = isValueAnObject ? JSON.stringify(newValue) : newValue;
        
        const nameValueSet = name == 'activeInHierarchy' ? `SetActive(${encodedValue})` : `${name}=${encodedValue}`;
        const url = `${queryPath}.${nameValueSet}`;

        console.log('update properties', url);
        const json = await ky.get(url).json();
        console.log('update done', url, json);
        setItemKey(Math.random());

        if (typeof value == 'boolean') {
            setSavedValue(newValue);
        }
        else {
            setSavedValue(json[0]);
            setNewValue(json[0]);
        }
    };

    const handleSubmit = handleSubmitOverride || ((e) => {
        e.preventDefault();
        submit();
    });

    const handleChange = handleChangeOverride || ((e) => {
        e.preventDefault();

        if (isValueAnObject) {
            const isValueANumber = typeof value[e.target.name] == 'number';
            const updatedValue = Object.assign({}, newValue, { [e.target.name]: isValueANumber ? parseFloat(e.target.value) : e.targetValue });
            setNewValue(updatedValue);
        }
        else if (typeof value == 'boolean') {
            setNewValue(!newValue);
        }
        else if (typeof value == 'number') {
            setNewValue(parseFloat(e.target.value));
        }
        else {
            setNewValue(e.target.value);
        }
    });

    let valueComponent;

    if (name == 'components') {
        valueComponent = <ComponentList componentList={value} queryPath={queryPath} />;
    }
    else if (isValueAnObject) {
        valueComponent = <PropertyList key={itemKey} queryPath={queryPath} data={newValue} handleSubmit={handleSubmit} handleChange={handleChange} />
    }
    else {
        valueComponent = <InputField key={itemKey} name={name} value={newValue} handleSubmit={handleSubmit} handleChange={handleChange} />;
    }

	return <li>
		<div>{name}: {valueComponent}</div>
	</li>
}

export default PropertyItem;