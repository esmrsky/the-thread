/* ================= THE PATTERN — Egypt → Wilderness → Promised Land ================= */
const PATTERN = {
  intro: 'The Bible’s master pattern: God brings people out of bondage, forms them in a wilderness, and walks them into an inheritance. It happened to a nation once — and Paul says it was written down on purpose: “These things happened to them as examples, and they were written down for OUR instruction” (1 Cor 10:11). The Old Testament is a case-study library, and one of its biggest lessons is this three-season map. You are on it somewhere right now.',
  seasons: [
    {
      id: 'egypt', name: 'Egypt', cvar: '--s-egypt', icon: 'pyramid',
      sub: 'Bondage — the life that raised you',
      rows: [
        { k: 'What it is', v: 'The system you were born into or built before God got your attention: slavery with a paycheck, identity assigned by pharaohs (culture, family, fear, sin).' },
        { k: 'It feels like', v: 'Familiar. Predictable. Leeks and onions on the table (Num 11:5) — real comfort, real chains.' },
        { k: 'God’s move', v: 'Deliverance. Done TO you, not by you — nobody fights their own way out of Egypt. “Stand still and see the salvation of the LORD” (Ex 14:13).' },
        { k: 'The exit', v: 'Overnight, through blood and water (Ex 12; 1 Cor 10:1-2). Getting out of Egypt takes one night. Getting Egypt out of you takes the next season.' }
      ]
    },
    {
      id: 'desert', name: 'The Wilderness', cvar: '--s-desert', icon: 'dune',
      sub: 'Formation — where identity gets settled',
      rows: [
        { k: 'What it is', v: 'The in-between. Deut 8:2 gives the syllabus: “to humble you, to test you, to know what was in your heart.” Not punishment — formation.' },
        { k: 'It feels like', v: 'Slow, hidden, repetitive. Daily bread but no visible progress. This is where almost everyone panics and either builds a calf or plans a trip back to Egypt.' },
        { k: 'God’s move', v: 'Fathering. He speaks identity BEFORE testing it — Israel is called “my firstborn son” (Ex 4:22) before Sinai; Jesus hears “my beloved Son” (Matt 3:17) before the wilderness. The desert doesn’t decide who you are; it reveals whether you believe who He said you are.' },
        { k: 'Provision', v: 'Manna, daily. Water from rocks. Clothes that don’t wear out (Deut 8:4). Strange, humble, and never late.' }
      ]
    },
    {
      id: 'land', name: 'The Promised Land', cvar: '--s-land', icon: 'grapes',
      sub: 'Inheritance — living what He promised',
      rows: [
        { k: 'What it is', v: 'The assignment and inheritance you were delivered FOR — fruitfulness, authority, giving instead of surviving. Not heaven: it has giants in it.' },
        { k: 'It feels like', v: 'Battles fought FROM victory rather than for it. “Every place the sole of your foot treads, I have given you” (Josh 1:3) — given, then walked.' },
        { k: 'God’s move', v: 'Partnership. The Jordan parts only after the priests step in (Josh 3:13-17). The Red Sea was done TO you; the Jordan is done WITH you.' },
        { k: 'Provision', v: 'Manna stops the day they eat the land’s produce (Josh 5:12). Not abandonment — promotion. Provision changes shape by season.' }
      ]
    }
  ],
  insights: [
    { t: 'The exit is fast; the formation is slow.', x: 'One night out of Egypt; forty years getting Egypt out of them. Conversion is instant — renewal takes seasons (Rom 12:2). Don’t despise the slow part; it’s load-bearing.' },
    { t: 'Identity comes before the test, never after it.', x: '“You are my beloved Son” (Matt 3:17) — before a single miracle or sermon. Then the very first attack: “IF you are the Son of God…” (Matt 4:3). The wilderness doesn’t ask what you can do. It asks whether you believe what the Voice said.' },
    { t: 'Jesus re-ran Israel’s whole journey — and passed.', x: 'Carried into Egypt as a child (“out of Egypt I called my son,” Hos 11:1 / Matt 2:15), forty days in the wilderness matching forty years, answering every temptation from Deuteronomy 6–8 — Israel’s exact exam, retaken and aced. At the transfiguration, Moses and Elijah discuss His coming death — Luke calls it His “EXODUS” (Luke 9:31, Greek exodos). The cross is the true exodus.' },
    { t: 'Two crossings, two baptisms.', x: 'Red Sea: out of slavery — God does it while you stand still (Ex 14:13-14). Jordan: into inheritance — nothing moves until feet get wet (Josh 3:13). Paul calls the first crossing a baptism (1 Cor 10:2). Deliverance is received; inheritance is stepped into.' },
    { t: 'An 11-day trip took 40 years.', x: 'Deut 1:2 quietly notes: it’s eleven days from Horeb to Kadesh-barnea. The delay wasn’t geography — it was unbelief (Heb 3:19). The promise never expired; the generation did. God’s promises don’t have deadlines, but wandering has a cost.' },
    { t: 'The giants were never the problem; the mirror was.', x: 'Ten spies: “We seemed like grasshoppers IN OUR OWN EYES, and so we were in theirs” (Num 13:33). Same giants, same God — Caleb just did different math (“they are bread for us,” Num 14:9). Your self-image sets your ceiling more than your circumstances do.' },
    { t: 'Manna is seasonal; don’t build a theology on a season.', x: 'Manna in the desert, produce in the land (Josh 5:12). When provision changes shape, it usually means the season changed — read the map before assuming God left.' },
    { t: 'The presence was in every season.', x: 'The pillar of cloud and fire showed up IN the wilderness (Ex 13:21-22) and never once left. The promised land is not where God starts loving you. He’s in the desert, on purpose, with you.' },
    { t: 'You can camp at the wrong address.', x: 'Some wanted to go back to Egypt (Num 14:4). Some settled east of the Jordan, close enough to see the land but not in it (Num 32). And a whole generation died within walking distance of the promise. The land is entered by rest and faith, not by intensity (Heb 4:9-11) — and it’s always still on offer: “TODAY, if you hear his voice” (Heb 4:7).' }
  ],
  cases: [
    { name: 'Israel', sub: 'the master case study', p1: '400 years of slavery — bricks, quotas, and a pharaoh who decides your worth (Ex 1).', p2: '40 years of manna, water from rocks, and a syllabus called Deuteronomy 8:2 — humbled, tested, fathered.', p3: 'Jordan parts, Jericho falls, and the fight is FROM promise, not for it (Josh 1:3).' },
    { name: 'Joseph', sub: 'the pit-to-palace arc', p1: 'Favored and naive in his father’s house; then the pit and the slave caravan (Gen 37).', p2: 'Potiphar’s house and prison — 13 years where “the word of the LORD tested him” (Ps 105:19).', p3: 'Palace at 30: feeding nations, forgiving brothers — “you meant evil; God meant good” (Gen 50:20).' },
    { name: 'Moses', sub: 'the 40-40-40 life', p1: '40 years as a prince of Egypt — power, education, and a murder that proved zeal isn’t readiness (Ex 2).', p2: '40 years keeping sheep in Midian — the résumé God was actually building (Ex 3:1).', p3: '40 years leading the exodus, face-to-face with God, “as a man speaks to his friend” (Ex 33:11).' },
    { name: 'David', sub: 'anointed long before crowned', p1: 'Overlooked in Jesse’s house — the kid they didn’t bother calling in from the field (1 Sam 16:11).', p2: 'Anointed, then hunted — years of caves, Adullam, and psalms written on the run (1 Sam 22–26).', p3: 'Crowned at Hebron, then Jerusalem — a shepherd’s heart with a king’s authority (2 Sam 5).' },
    { name: 'Ruth', sub: 'famine to family tree', p1: 'Moab: famine, three funerals, and a mother-in-law who renamed herself “Bitter” (Ruth 1).', p2: 'Gleaning leftover barley in a stranger’s field — faithful obscurity, one row at a time (Ruth 2).', p3: 'Redeemed and married by Boaz — grandmother of kings, name in the genealogy of Jesus (Ruth 4; Matt 1:5).' },
    { name: 'Elijah', sub: 'hidden before public', p1: 'Gilead obscurity — a nobody from nowhere with one conviction: “the LORD before whom I stand” (1 Kings 17:1).', p2: 'Cherith’s drying brook and a widow’s empty pantry — provision lessons in hiding (1 Kings 17).', p3: 'Carmel: one prayer, fire falls, a nation turns (1 Kings 18).' },
    { name: 'Peter', sub: 'the compressed desert', p1: 'Boats and nets and a temper — competence in a small pond (Luke 5).', p2: 'One catastrophic night: three denials, a rooster, and bitter weeping — his whole wilderness in a weekend (Luke 22:54-62).', p3: 'Breakfast on the beach, restored three times, then Pentecost: one sermon, three thousand people (John 21; Acts 2).' },
    { name: 'Paul', sub: 'zeal, then formation, then fire', p1: 'Rising star of the Pharisees — impeccable credentials aimed in exactly the wrong direction (Phil 3:4-6).', p2: 'Damascus, then Arabia, then roughly a decade of Tarsus silence before the story needs him (Gal 1:17-18; Acts 11:25).', p3: 'The apostle to the nations — letters from prisons that became half the New Testament.' },
    { name: 'Jesus', sub: 'the pattern, perfected', p1: 'A refugee child in Egypt (Matt 2:14-15) and thirty years of Nazareth obscurity — a carpenter nobody quoted.', p2: 'Forty days, no bread, one open question: “IF you are the Son…” Answered entirely from Deuteronomy (Matt 4:1-11).', p3: 'Ministry in the Spirit’s power (Luke 4:14) — and His death called His “exodus” (Luke 9:31): the crossing that opens the land for everyone.' },
    { name: 'You', sub: 'same map, your dot', p1: 'Whatever raised you and named you before Jesus did — the systems, wounds, and paychecks of the old life.', p2: 'The unglamorous middle you may be in right now: daily bread, identity questions, no highlight reel. It is not punishment. It is formation — and He speaks sonship over you IN it, not after it.', p3: 'The inheritance side: walking in freedom, health, assignment, and rest — giants included, outcome not in doubt (Rom 8:37).' }
  ]
};
