import {Composition, delayRender, continueRender, random} from 'remotion';
import {MyMainComposition} from './MyMainComposition';
import { useState, useCallback, useEffect } from 'react';
// Each <Composition> is an entry in the sidebar!



export const RemotionRoot: React.FC = () => {
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
		const randomNumber = Math.floor(random(1) * len);
		
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
				response['videos'][Math.floor(random(1) * responseLen)][
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

	return (
		<>
			<Composition
				id="MyMainComp"
				component={MyMainComposition}
				defaultProps={{
					Quote: MyCalledQuote,
					Author: MyCalledQuoteAuthor,
					Video1: MyCalledVideo,
				}}
				
				durationInFrames={300}
				fps={30}
				width={1080}
				height={1920}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
		</>
	);
};
