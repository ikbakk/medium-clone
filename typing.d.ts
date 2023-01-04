export interface Post {
	_id: string;
	title: string;
	author: {
		name: string;
		image: string;
	};
	description: string;
	mainImage: {
		asset: {
			url: string;
		};
	};
	slug: {
		current: string;
	};
	body: object[];
}
