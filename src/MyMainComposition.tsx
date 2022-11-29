import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	random,
	delayRender,
	continueRender,
	Video,
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
						fontSize: '10vh',
						textAlign: 'center',
						fontFamily, 
					}}
				>
					<div id="quote">{Quote}</div>
					<div id="author">{Author}</div>
				</AbsoluteFill>
				<Video
					volume={0.5}
					src={  Video1 ||
					'https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761'
					}
					style={{width: '3820px'}}
				></Video>
			</AbsoluteFill>
		</div>
	);
};
