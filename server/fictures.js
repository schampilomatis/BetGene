if (Matches.find().count() === 0){
	var match1id = Matches.insert({
		hometeam: 'Juventus',
		awayteam: 'Olympiakos',
		competition: 'Champions League',
		date: 'simera',
		time: 7
	});


	var match2id = Matches.insert({
		hometeam: 'Man city',
		awayteam: 'Man u',
		competition: 'Premier League',
		date: 'simera',
		time: 8
	});

	var comment1id = Comments.insert({
		match_id: match1id,
		text: 'wraios assos!!'

	})

	
}