import React from 'react';
import ColorSet from '@app/theme/colorSet';
import { Tooltip } from 'react-tooltip';
import { Box } from '@mui/material';
import uuid from '@app/util/uuid';

export default function LastFiveResults({ cell }) {
	const homeTeam = cell.homeTeam;
	const idTooltip = uuid();

	return (
		<Box className="last-five-results">
			{cell &&
				cell.lastFive.map((data, ind) => {
					if (data.res === 'D') {
						return (
							<Box
								className="five-results"
								title={data.toolTip}
								key={ind}
								sx={{ backgroundColor: ColorSet().grey[500] }}
							>
								<a data-tooltip-id={idTooltip}>{data.res}</a>
							</Box>
						);
					} else if (data.res === 'W') {
						return (
							<Box
								className="five-results"
								title={data.toolTip}
								key={ind}
								sx={{ backgroundColor: ColorSet().greenAccent[600] }}
							>
								<a data-tooltip-id={idTooltip}>{data.res}</a>
							</Box>
						);
					} else {
						return (
							<Box
								className="five-results"
								title={data.toolTip}
								key={ind}
								sx={{ backgroundColor: ColorSet().redAccent[600] }}
							>
								<a data-tooltip-id={idTooltip}>{data.res}</a>
							</Box>
						);
					}
				})}
			<Tooltip id={idTooltip} place="top" className="toolTip">
				<ul>
					{cell.lastFive.map((data, idx) => {
						const team = data.toolTip.split('-');
						if (team[0] === homeTeam) {
							return (
								<li key={idx}>
									<span style={{ color: ColorSet().greenAccent[500] }}>{homeTeam}</span>-
									<span>
										{team[1]} {team[2]}
									</span>
								</li>
							);
						} else {
							return (
								<li key={idx}>
									<span>{team[0]}</span>-<span style={{ color: ColorSet().greenAccent[500] }}>{homeTeam} </span>
									<span>{team[2]}</span>
								</li>
							);
						}
					})}
				</ul>
			</Tooltip>
		</Box>
	);
}
