import {
	Composition,
	delayRender,
	continueRender,
	random,
	staticFile,
} from 'remotion';
import {MyMainComposition} from './MyMainComposition';
import {useState, useCallback, useEffect, useMemo} from 'react';
// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	//Get Data from file and transform it into a JSON OBJECT
	const MyQuote = staticFile('quote.json');

	const [quote, setQuote] = useState(null);
	const [author, setAuthor] = useState(null);
	const [handle] = useState(() => delayRender());

	const fetchData = useCallback(async () => {
		const response = await fetch(MyQuote);
		const json = await response.json();
		setQuote(json['quote']);
		setAuthor(json['author']);

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
					Quote: quote,
					Author: author,
				}}
				durationInFrames={500}
				fps={30}
				width={1080}
				height={1920}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
		</>
	);
};
