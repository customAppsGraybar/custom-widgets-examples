import React, { useState } from "react"
import CSS from 'csstype'

export type WeatherType = 'sunny' | 'cloudy' | 'rain'

/**
 * React Component
 */
export interface WeatherCardProperties {
	color: string,
	location: string,
	date?: string,
	time?: string,
	temperature: string,
	alternateTemperature?: string,
	weather: WeatherType
}


export const WeatherCard: React.FC<WeatherCardProperties> = (props) => {

	const cardStyle: CSS.Properties = {
		display: 'block',
		color: 'white',
		boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.15)',
		borderRadius: '0.5rem',
		height: '14rem',
		minWidth: '25rem',
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		position: 'relative',
		backgroundColor: props.color,
	}

	const contentStyle: CSS.Properties = {
		display: 'flex',
		flexDirection: 'column',
		padding: '2rem'
	}
	
	const temperatureValueStyle: CSS.Properties = {
		fontSize: '2.6rem',
		fontWeight: 'bold',
		marginRight: '1rem'
	}

	const alternateDateValueStyle: CSS.Properties = {
		fontSize: '1.5rem',
		fontWeight: 'lighter'
	}

	const bottomInfoStyle: CSS.Properties = {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 'auto',
	}

	const infoLineValueStyle: CSS.Properties = {
		fontSize: '1.125rem',
		fontWeight: 'normal',
		lineHeight: '1.7rem'
	}

	const infoLineValueBoldStyle: CSS.Properties = {
		fontWeight: 'bold',
		fontSize: '1.5rem',
		lineHeight: '2rem',
	}

	const topLineStyle: CSS.Properties = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start'
	}


	const temperatureStyle: CSS.Properties = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}

	const weatherIconStyle: CSS.Properties = {
		marginLeft: 'auto',
		height: '6rem',
		filter: 'drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.2))'
	}

	const weatherIcon = './weather-icons/' + props.weather + '.svg'

	const infoButtonStyle: CSS.Properties = {
		position: 'absolute',
		right: '0',
		bottom: '0',
		marginRight: '0.8rem',
		marginBottom: '0.8rem',
		height: '1rem',
		cursor: 'pointer'
	}

	const infoBoxStyle: CSS.Properties = {
		display: 'block',
		position: 'absolute',
		left: '0',
		top: '0',
		bottom: '0',
		right: '0',
		borderRadius: '0.5rem',
		background: 'rgba(255, 255, 255, 0.8)',
		backdropFilter: 'blur(10px)',
	}

	const infoBoxContent: CSS.Properties = {
		color: 'black',
		position: 'relative',
		padding: '2rem',
		fontSize: '1rem',
		lineHeight: '1.2rem',
	}

	const [displayInfo, setDisplayInfo] = useState(false)
	
	const onInfoBtnClick = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setDisplayInfo(!displayInfo)
	  };

	return (
		<div style={cardStyle}>
			<div style={infoButtonStyle} onClick={onInfoBtnClick}><img src="./info.svg" /></div>
			<div style={contentStyle}>
				<div style={topLineStyle}>
					<div style={temperatureStyle}>
						<h1 style={temperatureValueStyle}>{props.temperature}</h1>
						<h2 style={alternateDateValueStyle}>{props.alternateTemperature}</h2>
					</div>
					<img style={weatherIconStyle} src={weatherIcon}/>
				</div>
				<div style={bottomInfoStyle}>
					<div><p style={infoLineValueStyle}>{props.time} · {props.location}</p></div>
					<div><p style={infoLineValueBoldStyle}>{props.date}</p></div>
				</div>
			</div>
			{displayInfo && (
				<div style={infoBoxStyle}>
					<div style={infoBoxContent}>
						Weather Icon Set by Osman Talha (Licensed under CC BY 4.0) and adapted by Staffbase.<br/><br/>
						Contains information from DATABASE NAME, which is made available here under the Open Database License (ODbL).
					</div>
					<div style={infoButtonStyle} onClick={onInfoBtnClick}><img src="./cross.svg" /></div>
				</div>
			)}
		</div>
	)
}