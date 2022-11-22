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
import {loadFont} from '@remotion/google-fonts/Poppins';
import './Styles.css';
const {fontFamily} = loadFont('normal', {weights: ['400', '100']});
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
		const client = createClient(
			'563492ad6f91700001000001491ff09e5b194ec5bbf3c33fc9c4edb1'
    );
    let videoresponse = await client.videos.popular({ per_page: 1 }).then(videos => {setVideo(videos["videos"][0]["video_files"][0]["link"])});
    setQuote(data[randomNumber]['text']);
    setAuthor(data[randomNumber]['author']);
		continueRender(handle);
	}, [handle]);
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div>
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
				<AbsoluteFill style={{
					display: 'flex',
					color: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '10vh',
					textAlign: 'center',
					fontFamily,
				}}>
					<div id="quote">{MyCalledQuote}</div>
					<div id="author">{MyCalledQuoteAuthor}</div>
				</AbsoluteFill>

				<Video src={MyCalledVideo}></Video>
			</AbsoluteFill>
		</div>
	);
};
