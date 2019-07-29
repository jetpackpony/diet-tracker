import React from 'react';
import { Grommet } from 'grommet';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  }
};

function App() {
  return (
    <Grommet theme={theme} >
      <div className="food-journal">
        <div className="day-log">
          <div className="day-header">
            <div className="day-date">28 Jul 2019</div>
            <div className="day-calories">3584 ccal</div>
            <div className="day-protein">P: 44 g</div>
            <div className="day-fat">F: 134 g</div>
            <div className="day-net-carbs">NC: 23 g</div>
          </div>
          <div className="day-entry">
            <div className="entry-title">Cinnamon Rolls</div>
            <div className="entry-weight">230 g</div>
            <div className="entry-calories">670 ccal</div>
            <div className="entry-protein">53 g</div>
            <div className="entry-fat">23 g</div>
            <div className="entry-net-carbs">43 g</div>
          </div>
        </div>
      </div>
    </Grommet>
  );
}

export default App;
