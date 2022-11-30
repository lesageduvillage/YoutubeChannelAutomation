import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	random,
	delayRender,
	continueRender,
	Video,
	Audio,
	staticFile,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Poppins';
import './Styles.css';
const {fontFamily} = loadFont('normal', {weights: ['300', '500']});
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
				<Video id='Video'
					volume={0.5}
					src={staticFile('video.mp4')}
					style={{width: '3820px', opacity: '0.7'}}
				></Video>
				<AbsoluteFill
					style={{
						display: 'flex',
						color: 'white',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						fontFamily,
						fontSize: '3vh',
						opacity: '1',
						textShadow: '10px 10px 20px black, 0 0 50px blue, 0 0 30px darkblue'
					}}
				>
					<div id="quote">{Quote}</div>
					<br></br>
					<div id="author">{Author}</div>
				</AbsoluteFill>
					<Audio src={staticFile('music.mp3')} startFrom={252} />
				
			</AbsoluteFill>
		</div>
	);
};
