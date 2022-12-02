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
	spring
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Poppins';
import './Styles.css';
const {fontFamily} = loadFont('normal', {weights: ['300', '500']});
import {useState, useCallback, useEffect} from 'react';
import {createClient} from 'pexels';

export interface Quote {
	Quote: string;
	Author?: string;
	Video1?: string;
}

export const MyMainComposition: React.FC<Quote> = ({Quote, Author, Video1}) => {

	let QuoteList = Quote.split(" ");
	const Listlen : number = QuoteList.length;

	const frame = useCurrentFrame();
	const { fps, durationInFrames} = useVideoConfig();
	// Function that does the animation of the text
	function scale(i: number){
		return spring({
			fps,
			frame : frame - i * ((durationInFrames/3)/Listlen),
			durationInFrames: (durationInFrames/3)/Listlen
		});
	}
	const fadeout = interpolate(frame, [durationInFrames - 100, durationInFrames], [1, 0], {extrapolateLeft:"clamp" });
	var QuoteWords = QuoteList.map(function(word, i) {
    // This is just an example - your return will pull information from `line`
    // Make sure to always pass a `key` prop when working with dynamic children: https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    return (
      <div key={i} style={{transform: `scale(${scale(i)})`}}>{word}</div>
    );
  });
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
						color: 'black',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						fontFamily,
						fontSize: '70px',
						opacity: '1',
						textShadow: '10px 10px 20px white, 0 0 50px white, 0 0 30px white'
					}}
				>
<div id="quote" style={{display: 'flex', flexDirection: "row", width: "1080px", gap: "20px", flexWrap:"wrap", justifyContent: "center", opacity:fadeout }}>{QuoteWords}</div>
					<br></br>
					<div id="author" style={{opacity: fadeout}}>{Author}</div>
				</AbsoluteFill>
					<Audio src={staticFile('music.mp3')} startFrom={1000} />
				
			</AbsoluteFill>
		</div>
	);
};
