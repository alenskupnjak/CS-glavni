import React from 'react';
import './example2.css';

import { Tooltip } from 'react-tooltip';

export default function App() {
	return (
		<React.Fragment>
			<div className="App">
				<h1 data-tooltip-id="app-title" style={{ backgroundColor: '#999' }}>
					Hello Tooltip Example
				</h1>
				<h2 data-tooltip-id="second-app-title" style={{ backgroundColor: '#999' }}>
					This is a basic example on how to use ReactTooltip
				</h2>
			</div>
			<div>
				<a data-tooltip-id="my-tooltip">◕‿‿◕</a>

				<a data-tooltip-id="my-tooltip">◕‿‿◕</a>
			</div>
			<Tooltip id="app-title" place="bottom" content="Hello world! I'm a Tooltip" />
			<Tooltip id="second-app-title" place="bottom" variant="info" content="I'm a info tooltip" />
			<Tooltip id="my-tooltip" place="top">
				<div>
					<h3>This is a very interesting header</h3>
					<p>Here's some interesting stuff:</p>
					<ul>
						<li>Some</li>
						<li>Interesting</li>
						<li>Stuff</li>
					</ul>
				</div>
			</Tooltip>
		</React.Fragment>
	);
}
