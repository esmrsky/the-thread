/* ================= MIND & BODY — where scripture and neuroscience shake hands ================= */
const NEURO_PRIMER = [
  {
    label: 'Frame',
    title: 'Science can describe; Jesus gets to define',
    body: 'Brain research can notice patterns in attention, attachment, sleep, sound, and regulation. It cannot tell you who you are, what you are worth, or whether God has spoken. The Word keeps the steering wheel; science is a useful dashboard.',
    refs: ['Rom 12:2', 'Col 2:8', '1 Thess 5:21']
  },
  {
    label: 'Practice',
    title: 'Repeated attention becomes formation',
    body: 'Neuroplasticity gives language to something scripture already assumes: what you behold, rehearse, remember, sing, and obey starts shaping your reflexes. Grace does not bypass your habits; it retrains them from the inside out.',
    refs: ['2 Cor 3:18', 'Phil 4:8', 'Josh 1:8']
  },
  {
    label: 'Pace',
    title: 'The body belongs in discipleship',
    body: 'Sleep, food, breath, face-to-face joy, grief, worship, and quiet are not side quests. Scripture treats embodied life as holy ground, which means spiritual maturity often looks like truth landing in a regulated nervous system.',
    refs: ['Ps 23:2-3', '1 Kings 19:5-12', '1 Cor 6:19-20']
  }
];

const MIND = {
  intro: 'God wrote two testimonies that never contradict: the Word and the way he built you. The Bible talked about renewed minds, guarded hearts, sung deliverance, and rest millennia before anyone could scan a brain — and where honest science has caught up, it keeps finding the manual was right. This section keeps the treasure, skips the hype, and labels which is which.',
  blocks: [
    {
      name: 'Renewing the mind is a construction site', icon: 'brain',
      body: '<p>“Be transformed by the RENEWING of your mind” (Rom 12:2) — and it turns out minds physically renew. Neuroplasticity — the brain rewiring itself along the paths you repeatedly run — is settled, mainstream science. Thoughts you rehearse become roads; roads become highways; highways become “just who I am.”</p><p>Honest framing: neuroscience doesn’t prove Romans 12 (scripture doesn’t need a lab coat), but they rhyme loudly. What you behold, you become (2 Cor 3:18) — which means what you feed your attention is a discipleship decision. The renewal is real, gradual, and grace-powered: you’re not bullying your brain into holiness; you’re repaving it with truth.</p>',
      panelLabels: ['Scripture frame', 'Neuro lens'],
      refs: ['Rom 12:2', '2 Cor 3:18', 'Phil 4:8', 'Eph 4:22-24']
    },
    {
      name: 'Meditation: the lost art of muttering', icon: 'wind',
      body: '<p>The Hebrew word for meditate — <i>hagah</i> (Josh 1:8; Ps 1:2) — means to mutter, murmur, growl: a dove cooing, a lion rumbling over food (Isa 31:4). Biblical meditation isn’t emptying your mind; it’s FILLING it — repeating a small piece of scripture, out loud, until it gets stuck in you like a song. Filling versus emptying is the structural difference from Eastern practice, no caricature needed.</p><p>And here’s the plot twist: you already know how to meditate — worry IS meditation, just on the wrong text. (Clinicians call the dark version rumination, and it’s a well-documented driver of depression, while directed, content-full meditation measurably counters it.) The skill was never missing; it just needs a better script.</p><p>Practice: take one verse, not five chapters. Read it aloud slowly, several times. Whisper it on a walk, at red lights, falling asleep. Picture it. Ask what obeying it looks like today (Josh 1:8 aims at doing). Write it out. Repeat tomorrow.</p>',
      panelLabels: ['Biblical frame', 'Brain pattern', 'Practice path'],
      refs: ['Josh 1:8', 'Ps 1:2-3', 'Ps 119:15', 'Phil 4:8']
    },
    {
      name: 'Emotions: dashboard lights, not the driver', icon: 'heart',
      body: '<p>Jesus felt everything and hid none of it: gut-level compassion (<i>splanchnizomai</i> — the word means moved in your inward parts, and every time it appears it leads straight to action, e.g. Matt 9:36; Mark 1:41), zeal (John 2:17), exultant joy (Luke 10:21), troubled-to-the-soul grief (John 11:33-35; Matt 26:38). Emotions aren’t the flesh; they’re instrumentation on a being made in God’s image. They report what you believe and what you’ve met — they were never meant to steer.</p><p>Paul’s tool for the steering: “let the peace of Christ RULE in your hearts” (Col 3:15) — the Greek <i>brabeuō</i> is an athletic term: the umpire who makes the call between competing plays. Feel everything; let peace call the play. And “take every thought captive” (2 Cor 10:5 — in context, Paul demolishing arguments against the gospel) genuinely rhymes with what psychology calls cognitive reappraisal, one of the best-evidenced emotion-regulation moves there is: catch the thought, weigh it against truth, reroute. The Bible got to “you are not your first thought” a couple of millennia early.</p>',
      panelLabels: ['Jesus as model', 'Discernment tool'],
      refs: ['Col 3:15', '2 Cor 10:3-5', 'John 11:33-35', 'Prov 4:23']
    },
    {
      name: 'Joy is relational fuel', icon: 'light',
      body: '<p>“The joy of the LORD is your strength” (Neh 8:10) — and joy, it turns out, is relational before it’s circumstantial. Neurotheologian-adjacent researchers like Jim Wilder define it from attachment science: joy is what your brain does when it registers “someone is glad to be with me.” It’s the fuel for staying kind under stress, and it’s built face-to-face — which is why discipleship was never meant to be a solo reading program (that’s the thesis of Wilder’s <i>The Other Half of Church</i>).</p><p>Gratitude is joy’s pump, and it’s one of the most-replicated findings in positive psychology (started with Emmons & McCullough’s counting-blessings studies — real effects, modest sizes, no hype needed). The psalmist prescribed it first: “Bless the LORD, O my soul, and FORGET NOT all his benefits” (Ps 103:2) — literally a benefits-recall practice. Someone is glad to be with you (Zeph 3:17). Start the list there.</p>',
      panelLabels: ['Attachment lens', 'Gratitude practice'],
      refs: ['Neh 8:10', 'Ps 103:1-5', 'Zeph 3:17', '1 Thess 5:16-18']
    },
    {
      name: 'Your body is not the enemy', icon: 'rest',
      body: '<p>When Elijah crashed — suicidal, spent, hiding under a broom tree — God’s first intervention wasn’t a rebuke or even a sermon. It was a nap and a snack. Twice. THEN the gentle whisper (1 Kings 19:5-12). The order is the sermon: sometimes the most spiritual thing available to you is eight hours of sleep.</p><p>Science agrees loudly: sleep and mental health are locked in a two-way street (poor sleep feeds anxiety and depression; rest restores regulation) — among the most solid findings in this whole field. Scripture beat the meta-analyses: “He gives to his beloved SLEEP” (Ps 127:2), the Shepherd “MAKES me lie down” (Ps 23:2), and your body is a temple to steward, not a donkey to flog (1 Cor 6:19-20). Fasting, feasting, resting, moving — the manual treats bodies as holy equipment. Treat yours like the temple maintenance crew you are.</p>',
      panelLabels: ['Elijah pattern', 'Sleep and stewardship'],
      refs: ['1 Kings 19:5-12', 'Ps 127:2', 'Ps 23:2-3', '1 Cor 6:19-20']
    },
    {
      name: 'This is your brain on prayer', icon: 'temple',
      body: '<p>Neuroscientist Andrew Newberg brain-scanned people praying, and the results are genuinely fascinating — small studies, honestly labeled. Focused contemplative prayer lights UP the frontal lobes (effortful, directed attention). Speaking in tongues showed the OPPOSITE: decreased frontal-lobe activity — the self-directing, language-composing machinery going quiet — exactly matching what practitioners report: “it’s not me composing this.” (N=5, preliminary, and a scan can’t rule on the supernatural either way — it just shows the states are real and distinct.)</p><p>The fun part: Paul described both modes in one verse two thousand years early — “I will pray with my spirit, and I will pray with my mind ALSO” (1 Cor 14:14-15). Surrendered prayer and focused prayer. Different gears, same engine, both real. Use both.</p>',
      panelLabels: ['Brain scan note', 'Two prayer gears'],
      refs: ['1 Cor 14:14-15', 'Rom 8:26', 'Jude 1:20', 'Ps 46:10']
    },
    {
      name: 'Frequencies, sound & worship — treasure and ditch', icon: 'music',
      body: '<p>Sound genuinely moves the body: music therapy has strong clinical-trial evidence for lowering anxiety, pain, and stress hormones; group singing measurably synchronizes singers’ heart rhythms and breathing; peak musical moments trigger dopamine. Your nervous system was built to be sung to. Scripture uses that hardware constantly: David’s harp brought Saul real relief from a tormenting spirit (1 Sam 16:23); Elisha called for a minstrel BEFORE the prophetic word came (2 Kings 3:15); Paul and Silas held a midnight worship service in prison (Acts 16:25); you’re told to soak the word into each other through singing (Col 3:16).</p><p>The ditch is the pseudo-precision: “432 Hz is the universe’s tuning,” “528 Hz repairs DNA.” Honest status — the 528 “solfeggio” system traces to 1990s numerology, not antiquity, with no evidence and no plausible mechanism; 432-vs-440 has one small study with tiny, mostly non-significant effects. Even Jericho gets drafted into this — but the text says a shout and trumpets in one-time obedience, not acoustic engineering (Josh 6:20). And when modern teachers say God “has a frequency you tune into,” take it as a live metaphor for attention and attunement — often useful! — just not physics.</p>',
      panelLabels: ['Treasure', 'Ditch'],
      tv: {
        treasure: ['Worship and music measurably calm, bond, and strengthen — use them on purpose', 'Music before ministry: prepare your heart like Elisha did (2 Kings 3:15)', 'Sing scripture — melody is memory’s best glue (Col 3:16)', 'Songs in the night are warfare with a tune (Acts 16:25; Ps 32:7)'],
        ditch: ['Magic-number Hz claims (528 “DNA repair,” 432 mysticism) — no evidence, no mechanism', 'Reading Jericho as acoustic science instead of one-time obedience', 'Buying “biblical frequencies” products — scripture names no tuning standard', 'Letting sound-mysticism replace the actual Voice (Heb 1:1-2)']
      },
      refs: ['1 Sam 16:23', '2 Kings 3:15', 'Acts 16:25', 'Col 3:16']
    },
    {
      name: 'Hearing God without the weirdness', icon: 'ear',
      body: '<p>“My sheep hear my voice” (John 10:27) — in first-century pens, several flocks shared one enclosure overnight, and each sheep learned its own shepherd’s call by living with him. Recognition grows from relationship, not technique. When God met Elijah, he wasn’t in the wind, quake, or fire but in <i>qol demamah daqqah</i> — Hebrew for something like “a sound of thin silence” (1 Kings 19:12). The volume knob of heaven is set lower than panic can hear. Stillness isn’t optional equipment.</p><p>How it usually comes: Dallas Willard’s classic observation is that God’s voice most often arrives as a particular KIND of thought — one carrying his character: weighty but not frantic, kind but not flattering, never condemning, always scripture-shaped. Charismatic teachers like Mark Virkler add practical rails: quiet yourself, fix your inner eyes on Jesus, welcome the spontaneous flow of thoughts and pictures, and journal what comes so you can test it later.</p><p>Then TEST — impressions are never self-authenticating: (1) Does it square with scripture? (2) Does it smell like the fruit of the Spirit? (3) Does peace umpire it in (Col 3:15)? (4) Does it hold up over time and confirmation? (5) What do seasoned believers say (Prov 11:14)? God is never offended by testing; he invented it (1 Thess 5:19-21). Start with low-stakes obedience and let trust compound.</p>',
      panelLabels: ['Relationship first', 'How it often comes', 'Testing checklist'],
      refs: ['John 10:27', '1 Kings 19:11-13', '1 Thess 5:19-21', 'Prov 11:14']
    }
  ]
};

/* ================= LIBRARY — the pack list ================= */
const LIBRARY = {
  intro: 'A curated pack, not a warehouse — each item earns its weight. Quick honesty notes are included where a resource is bold, debated, or needs discernment; that’s not a knock, it’s a map habit. (Research notes behind this site live in the project’s research folder.)',
  shelves: [
    {
      title: 'See the whole story', icon: 'compass',
      items: [
        { kind: 'video', title: 'The Exodus Way', by: 'BibleProject', note: 'THE companion video for this site’s Pattern section — the road out of slavery, through the wilderness, into inheritance.', url: 'https://www.youtube.com/watch?v=dYPlBq8ELvA' },
        { kind: 'video', title: 'The Messiah', by: 'BibleProject', note: 'The promised-deliverer thread from Genesis 3 to Jesus in seven minutes.', url: 'https://www.youtube.com/watch?v=4iF7dtFcg_g' },
        { kind: 'video', title: 'Old Testament Summary', by: 'BibleProject', note: 'A whole-OT flyover that shows why the threads exist at all.', url: 'https://www.youtube.com/watch?v=ALsluAKBZ-c' },
        { kind: 'video', title: 'Jesus the Royal Priest', by: 'BibleProject', note: 'Eden, tabernacle, priesthood, and kingship braided into one payoff.', url: 'https://www.youtube.com/watch?v=LBr-blQxIm4' },
        { kind: 'video', title: 'Temple / Water of Life / Sabbath (theme videos)', by: 'BibleProject', note: 'Their whole themes collection maps almost 1:1 onto this site’s Threads section.', url: 'https://bibleproject.com/videos/collections/themes/' },
        { kind: 'video', title: 'Jesus in Every Book of the Bible', by: 'Gary Hamrick', note: 'A pastor walking the Christ-in-every-book survey — warm, systematic, shareable.', url: 'https://www.youtube.com/watch?v=5PybrsQE9Q8' }
      ]
    },
    {
      title: 'Grace & the new covenant', icon: 'covenant',
      items: [
        { kind: 'site', title: 'Escape to Reality', by: 'Paul Ellis', note: '1,000+ plain-English grace articles indexed by scripture — “the Wikipedia of grace.” Start with “The 9 Lies of Religion.”', url: 'https://escapetoreality.org/' },
        { kind: 'book', title: 'The Gospel in Ten Words', by: 'Paul Ellis', note: 'Loved, forgiven, saved, union, accepted, holy, righteous, dead to sin, new, royal — one chapter each. The identity primer.', url: 'https://escapetoreality.org/2012/09/17/the-gospel-in-ten-words/' },
        { kind: 'book', title: 'The Gospel in Twenty Questions', by: 'Paul Ellis', note: '“Does God make us sick to teach us?” and 19 other questions everyone actually asks.', url: 'https://escapetoreality.org/books/' },
        { kind: 'book', title: 'Stuff Jesus Never Said', by: 'Paul Ellis', note: 'What Jesus actually said vs. what religion assumes he said. Great first gift book.', url: 'https://escapetoreality.org/books/' },
        { kind: 'book', title: 'Letters from Jesus', by: 'Paul Ellis', note: 'The seven Revelation letters read as good news instead of threats.', url: 'https://escapetoreality.org/books/' },
        { kind: 'site', title: 'The Grace Commentary', by: 'Paul Ellis', note: 'Free verse-by-verse commentary with the covenant line kept clean on every page.', url: 'https://thegracecommentary.com/' },
        { kind: 'book', title: 'The Naked Gospel', by: 'Andrew Farley', note: 'A burnout-to-freedom case for unmixed new-covenant living; his Grace Message podcast continues the thread.', url: 'https://andrewfarley.org/' },
        { kind: 'book', title: 'The Normal Christian Life + Sit, Walk, Stand', by: 'Watchman Nee', note: 'Union-with-Christ classics from a man who paid full price for his faith. Sit before you walk; walk before you stand.', url: 'https://www.google.com/search?q=watchman+nee+sit+walk+stand' },
        { kind: 'book', title: 'Destined to Reign', by: 'Joseph Prince', note: 'Right believing over right behaving. Bold and global — also the most critiqued voice on this shelf (“cheap grace” objections); read with the Berean setting on (Acts 17:11).', url: 'https://www.josephprince.org/' },
        { kind: 'video', title: 'The Gospel in Ten Words (playlist)', by: 'Escape to Reality', note: 'Chapter-by-chapter companion videos for the ten words.', url: 'https://www.youtube.com/playlist?list=PLapuBLULA-iT1LyBderOdWDxZUCFKAKcM' }
      ]
    },
    {
      title: 'Healing', icon: 'lamb',
      items: [
        { kind: 'book', title: 'Christ the Healer', by: 'F.F. Bosworth', note: 'The 1924 classic the whole healing movement leans on — half scripture case, half objections answered.', url: 'https://www.google.com/search?q=christ+the+healer+bosworth' },
        { kind: 'book', title: 'God Wants You Well', by: 'Andrew Wommack', note: 'The strongest modern statement of healing-in-the-atonement. Bold; critics raise real pastoral cautions about blame when healing tarries — take the treasure, leave any condemnation (Rom 8:1).', url: 'https://www.awmi.net/' },
        { kind: 'book', title: 'Healing the Sick', by: 'T.L. Osborn', note: 'A million-copy healing-ministry classic, heavy on testimony. Recommended by Ellis.', url: 'https://www.google.com/search?q=healing+the+sick+tl+osborn' },
        { kind: 'book', title: 'Divine Healing Made Simple', by: 'Praying Medic', note: 'Practical and unweird — written by a working paramedic. Also an Ellis recommendation.', url: 'https://www.google.com/search?q=divine+healing+made+simple+praying+medic' }
      ]
    },
    {
      title: 'Mind, joy & the brain', icon: 'brain',
      items: [
        { kind: 'book', title: 'The Other Half of Church', by: 'Jim Wilder & Michel Hendricks', note: 'Why information-only discipleship stalls: joy, attachment, and the relational right brain. The safest science on this shelf.', url: 'https://lifemodelworks.org/the-other-half-of-church/' },
        { kind: 'book', title: 'Anatomy of the Soul', by: 'Curt Thompson, MD', note: 'A psychiatrist on attachment, shame, and being fully known — by people and by God.', url: 'https://curtthompsonmd.com/books/' },
        { kind: 'book', title: 'Rare Leadership', by: 'Marcus Warner & Jim Wilder', note: 'Remain relational, act like yourself, return to joy, endure well — the joy framework applied to leading.', url: 'https://lifemodelworks.org/' },
        { kind: 'book', title: 'How God Changes Your Brain', by: 'Andrew Newberg, MD', note: 'The neurotheology researcher’s accessible synthesis — early-stage science, honestly framed.', url: 'https://www.andrewnewberg.com/' },
        { kind: 'book', title: 'Switch On Your Brain', by: 'Dr. Caroline Leaf', note: 'Hugely popular “thoughts matter” teaching. The premise is fine; several of her specific stats and science claims are disputed by scientists — enjoy the direction, verify the details.', url: 'https://drleaf.com/' },
        { kind: 'video', title: 'The Neurobiology of Shame', by: 'Curt Thompson (Torrey Conference)', note: 'Shame, attachment, and healing — Thompson at his best.', url: 'https://www.youtube.com/watch?v=vdnVgKxhCxY' },
        { kind: 'video', title: 'God in the Brain', by: 'Andrew Newberg lecture', note: 'His SPECT research across prayer, meditation, and tongues, from the source.', url: 'https://www.youtube.com/watch?v=RZwcVDaHl-A' }
      ]
    },
    {
      title: 'Hearing God & meditation', icon: 'ear',
      items: [
        { kind: 'book', title: 'Hearing God', by: 'Dallas Willard', note: 'The gold standard: God’s voice as a conversational relationship, with real discernment rails.', url: 'https://www.google.com/search?q=hearing+god+dallas+willard' },
        { kind: 'book', title: '4 Keys to Hearing God’s Voice', by: 'Mark & Patti Virkler', note: 'Stillness, vision, spontaneity, journaling. Practical and widely used; pair it with the testing checklist — impressions always get weighed (1 Thess 5:21).', url: 'https://www.cwgministries.org/Four-Keys-to-Hearing-Gods-Voice' },
        { kind: 'video', title: 'The Bible as Jewish Meditation Literature', by: 'BibleProject', note: 'The hagah/muttering picture of meditation, beautifully explained.', url: 'https://www.youtube.com/watch?v=VhmlJBUIoLk' }
      ]
    },
    {
      title: 'Podcasts & feeds', icon: 'music',
      items: [
        { kind: 'podcast', title: 'The Deep End', by: 'Taylor Welch', note: '700+ episodes on identity, hearing God, beliefs (“frame”), and spirit-soul-body — plus frequency language used as metaphor. Wide-ranging guests from scholars to fringe; strong on identity and practice, so listen with your tester on (episodes #014, #026, #104 are good samplers).', url: 'https://podcasts.apple.com/us/podcast/the-deep-end-w-taylor-welch/id1500492987' },
        { kind: 'podcast', title: 'BibleProject Podcast', by: 'Tim Mackie & Jon Collins', note: 'Long-form walkthroughs of the same themes their videos sketch.', url: 'https://bibleproject.com/podcasts/the-bible-project-podcast/' },
        { kind: 'channel', title: 'The Grace Message', by: 'Andrew Farley', note: 'Live-caller grace theology — good reps for your own covenant reflexes.', url: 'https://www.youtube.com/channel/UCngAqvQikHu7RF9kVs8M29g' },
        { kind: 'channel', title: 'Escape to Reality on YouTube', by: 'Paul Ellis', note: 'The articles, in video form.', url: 'https://www.youtube.com/channel/UCIbd57q1HUkGsur6VwcqctQ' }
      ]
    }
  ]
};

/* ================= START HERE ================= */
const START = {
  bigIdea: [
    { t: 'It’s one story.', x: 'Sixty-six books, dozens of authors, ~1,500 years, three languages — and one plot that never loses its thread. That coherence is itself the first miracle you meet.' },
    { t: 'The plot is a Person.', x: 'Jesus’s own Bible study method: “beginning with Moses and all the Prophets, he interpreted to them in ALL the Scriptures the things concerning HIMSELF” (Luke 24:27). The OT is promise; the Gospels are arrival; the letters are what it means; Revelation is the wedding.' },
    { t: 'The story rhymes on purpose.', x: 'Patterns repeat — lambs, wells, deserts, thrones — because God teaches in echoes. Paul says the old stories happened “as examples… written down for OUR instruction” (1 Cor 10:11). Case studies, not trivia.' },
    { t: 'The hinge is “finished.”', x: 'Everything before the cross leans forward; everything after leans back. Get the covenants straight — what was promised vs. what is now DONE (Heb 8:6-13) — and 90% of confusing Christianity un-confuses.' },
    { t: 'You’re in the story now.', x: 'Same patterns, your life: an Egypt you left, a wilderness that forms you, a promised land to walk in — with the same God speaking the same identity over you. This manual exists so you can find your dot on the map.' }
  ],
  howTo: {
    title: 'How to not waste your Bible',
    tips: [
      { t: 'Read letters like letters.', x: 'Ephesians is a 20-minute read. Nobody reads mail three sentences a day for a month — sit down and read the whole thing; the argument only works whole.' },
      { t: 'Hunt the Lamb in the Old Testament.', x: 'Ask one question of every OT page: “where’s Jesus in this?” (Luke 24:27 says he’s there.) It turns the strangest chapters into treasure maps.' },
      { t: 'Meditate small instead of skimming big.', x: 'One verse muttered all week beats five chapters skimmed and forgotten (Ps 1:2-3). Depth transforms; volume just informs.' },
      { t: 'Check the covenant address.', x: 'Before applying a verse, ask: which covenant is this under, and what did the cross change about it? (Heb 8:13). Half of all confusion dies right here.' },
      { t: 'Let it become something within a day.', x: 'Insight has a shelf life: turn it into a prayer, an obedience, or a thank-you within 24 hours or it evaporates (James 1:22-25).' },
      { t: 'Come to Him, not just the book.', x: 'The Bible’s own warning label: “You search the Scriptures… yet you refuse to come to me” (John 5:39-40). The goal of the map is the Person. Always.' }
    ]
  },
  heroVerse: { text: '“And beginning with Moses and all the Prophets, he interpreted to them in all the Scriptures the things concerning himself.”', ref: 'Luke 24:27' }
};
