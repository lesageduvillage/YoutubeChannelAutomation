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
	Quote: string;
	Author: string;
}

export const MyMainComposition: React.FC = () => {
	//Get Data from file and transform it into a JSON OBJECT
	const [MyCalledQuote, setQuote] = useState();
	const [MyCalledQuoteAuthor, setAuthor] = useState();
	const [MyCalledVideo, setVideo] = useState();
	const [handle] = useState(() => delayRender());
	const fetchData = useCallback(async () => {
		//Calling the quote
		const quoteresponse = await fetch('https://type.fit/api/quotes');
		var data = await quoteresponse.json();
		const len = data.length;
		const randomNumber = Math.floor(Math.random() * len);
		//Lets get the video now
		const client = '563492ad6f91700001000001491ff09e5b194ec5bbf3c33fc9c4edb1';

		const Videodata = await fetch(
			`https://api.pexels.com/videos/search?query=surf&per_page=10`,
			{
				method: 'GET',
				headers: {
					Authorization: client, //use the apikey you have generated
				},
			}
		);
		const response = await Videodata.json();
		const responseLen = response['videos'].length;
		setVideo(
			String(
				response['videos'][Math.floor(Math.random() * responseLen)][
					'video_files'
				][0]['link']
			)
		);
		setQuote(data[randomNumber]['text']);
		setAuthor(data[randomNumber]['author']);
		continueRender(handle);
	}, [handle]);
	useEffect(() => {
		fetchData();
	}, [fetchData]);
	console.log(MyCalledVideo, 'test');
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
					<div id="quote">{MyCalledQuote}</div>
					<div id="author">{MyCalledQuoteAuthor}</div>
				</AbsoluteFill>
				<Video
					volume={0.5}
					src={
						MyCalledVideo ||
						'https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761'
					}
					style={{width: '3820px'}}
				></Video>
			</AbsoluteFill>
		</div>
	);
};
