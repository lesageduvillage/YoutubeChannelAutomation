import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	random,
	delayRender,
	continueRender,
	Video,
	staticFile,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/ArchivoBlack';
import './Styles.css';
const {fontFamily} = loadFont('normal');
import {useState, useCallback, useEffect} from 'react';
import {createClient} from 'pexels';

export interface Quote {
	Quote?: string;
	Author?: string;
	Video1?: string;
}

export const MyMainComposition: React.FC<Quote> = ({Quote, Author, Video1}) => {
	return (
		<div>
			<AbsoluteFill
				style={{
					display: 'flex',
					color: 'black',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<AbsoluteFill
					style={{
						display: 'flex',
						color: 'black',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: '12vh',
						textAlign: 'center',
						fontFamily,
					}}
				>
					<div id="quote">{Quote}</div>
					<div id="author">{Author}</div>
				</AbsoluteFill>
				<Video
					volume={0.5}
					src={staticFile('video.mp4')}
					style={{width: '3820px'}}
				></Video>
			</AbsoluteFill>
		</div>
	);
};
