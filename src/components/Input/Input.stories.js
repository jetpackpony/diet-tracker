import React, { useReducer, useRef, useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './index';

storiesOf('Input', module)
  .add('default', () => (
    <div style={{ padding: "2rem", background: "var(--content-color)" }}>
      <div style={{ margin: "0 0 20px 0" }}>
        <Input labelText="Label" />
      </div>
      <div style={{ margin: "0 0 20px 0" }}>
        <Input />
      </div>
      <div style={{ margin: "0 0 20px 0" }}>
        <Input labelText="Label" align="right" suffixText="g." />
      </div>
      <div style={{ margin: "0 0 20px 0" }}>
        <Input labelText="Number" fieldType="number" align="right" suffixText="g." />
      </div>
      <div style={{ margin: "0 0 20px 0" }}>
        <Input labelText="Password" fieldType="password" />
      </div>
      <div style={{ margin: "0 0 20px 0" }}>
        <Input labelText="Date-time" fieldType="datetime-local" />
      </div>
    </div>
  ))
  .add('controlled', () => {
    const [value, setValue] = useState('');
    const onInput = (val) => setValue(val);
    return (
      <div style={{ padding: "2rem", background: "var(--content-color)" }}>
        <div style={{ margin: "0 0 20px 0" }}>
          <Input labelText="Label" value={value} onInput={onInput} onChange={onInput} />
        </div>
      </div>
    );
  })
  .add('controlled disabled', () => {
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const onInput = (val) => setValue(val);
    return (
      <div style={{ padding: "2rem", background: "var(--content-color)" }}>
        <div style={{ margin: "0 0 20px 0" }}>
          <Input labelText="Label" disabled={true} value="testme" onInput={onInput} onChange={onInput} />
        </div>
        <div style={{ margin: "0 0 20px 0" }}>
          <Input labelText="Label" disabled={true} />
        </div>
        <div style={{ margin: "0 0 20px 0" }}>
          <Input labelText="Label" disabled={disabled} value={value} onInput={onInput} onChange={onInput} />
          <button onClick={() => setDisabled(true)}>Disable</button>
          <button onClick={() => setDisabled(false)}>Enable</button>
          <button onClick={() => setValue("testme")}>Set Value</button>
        </div>
      </div>
    );
  })
  .add('controlled with ref', () => {
    const ref = useRef(null);
    const [value, setValue] = useState('');
    const onInput = (val) => setValue(val);
    return (
      <div style={{ padding: "2rem", background: "var(--content-color)" }}>
        <div style={{ margin: "0 0 20px 0" }}>
          <Input labelText="Label" ref={ref} value={value} onInput={onInput} onChange={onInput} />
          <button onClick={() => setValue("testme")}>Set Value</button>
        </div>
      </div>
    );
  })
  .add('controlled number', () => {
    const [value, setValue] = useState('');
    const onInput = (val) => setValue(val);
    return (
      <div style={{ padding: "2rem", background: "var(--content-color)" }}>
        <div style={{ margin: "0 0 20px 0" }}>
          <Input labelText="Label" fieldType="number" value={value} onInput={onInput} onChange={onInput} />
        </div>
      </div>
    );
  })