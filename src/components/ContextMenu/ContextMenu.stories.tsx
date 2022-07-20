import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ContextMenu from './index';

storiesOf('ContextMenu', module)
  .add('default', () => (
    <ContextMenu
      items={[
        { title: "Delete", action: action("deleteRecord") },
        { title: "Clone", action: action("cloneRecord") },
      ]}
    >
      <div>Press here</div>
    </ContextMenu>
  ))
  .add('open', () => (
    <ContextMenu
      items={[
        { title: "Delete", action: action("deleteRecord") },
        { title: "Clone", action: action("cloneRecord") },
      ]}
      debugPos={{ x: "100px", y: "100px" }}
    >
      <div>Press here</div>
    </ContextMenu>
  ))
  .add('corners', () => (
    <>
      <ContextMenu
        items={[
          { title: "Delete", action: action("deleteRecord") },
          { title: "Clone", action: action("cloneRecord") },
        ]}
      >
        <div style={{ position: "fixed", top: 0, left: 0 }}>Press here</div>
      </ContextMenu>
      <ContextMenu
        items={[
          { title: "Delete", action: action("deleteRecord") },
          { title: "Clone", action: action("cloneRecord") },
        ]}
      >
        <div style={{ position: "fixed", bottom: 0, left: 0 }}>Press here</div>
      </ContextMenu>
      <ContextMenu
        items={[
          { title: "Delete", action: action("deleteRecord") },
          { title: "Clone", action: action("cloneRecord") },
        ]}
      >
        <div style={{ position: "fixed", bottom: 0, right: 0 }}>Press here</div>
      </ContextMenu>
      <ContextMenu
        items={[
          { title: "Delete", action: action("deleteRecord") },
          { title: "Clone", action: action("cloneRecord") },
        ]}
      >
        <div style={{ position: "fixed", top: 0, right: 0 }}>Press here</div>
      </ContextMenu>
    </>
  ))