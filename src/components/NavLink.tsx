import { Link } from 'react-router-dom';

type LinkProps = {
	title: string;
	link: string;
	isActive: boolean;
};

export const NavLink = (props: LinkProps) => {
	const baseStyle =
		'flex items-center px-4 -mb-1 border-transparent border-b-2 hover:font-semibold hover:text-indigo-400 hover:border-indigo-400';
	const activeStyle =
		'flex items-center px-4 -mb-1 border-b-2 hover:font-semibold hover:text-indigo-400 hover:border-indigo-400';

	return (
		<li className="flex">
			<Link to={props.link} className={props.isActive ? activeStyle : baseStyle}>
				{props.title}
			</Link>
		</li>
	);
};
