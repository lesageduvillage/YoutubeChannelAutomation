import {Composition} from 'remotion';
import {MyMainComposition} from './MyMainComposition';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyMainComp"
				component={MyMainComposition}
				durationInFrames={300}
				fps={30}
				width={1080}
				height={1920}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
		</>
	);
};
