/* ================= WALK IT OUT — new covenant life ================= */
const TEN_WORDS = ['Loved', 'Forgiven', 'Saved', 'Union', 'Accepted', 'Holy', 'Righteous', 'Dead to sin', 'New', 'Royal'];

const WALKING = {
  intro: 'The gospel isn’t just your ticket out of Egypt — it’s a whole new operating system. Most Christian frustration comes from running new-covenant life on old-covenant software: earning what’s already given, begging for what’s already yours, working toward an identity instead of from one. Here are the load-bearing walls of walking it out.',
  tenWordsNote: 'One good summary of who you now are — ten words, all already true, none earned (framework from Paul Ellis’s <i>The Gospel in Ten Words</i>): “In union with Christ you are loved, forgiven, saved, accepted, holy, righteous, dead to sin, new, and royal.” Not steps. Not levels. Pearls on one necklace.',
  pillars: [
    {
      name: 'Union: you are IN Christ', icon: 'thread',
      lie: 'God is up there somewhere; I connect when I perform well enough.',
      truth: 'You are in Christ — that’s your permanent address.',
      body: '“In Christ,” “in him,” “with him” — Paul can hardly write a paragraph without it (read Ephesians 1 and start circling). Union isn’t a mood you achieve in a good worship set; it’s the fact under your feet. His history became yours: crucified with him, raised with him, seated with him (Gal 2:20; Eph 2:5-6).',
      refs: ['John 15:4-5', 'Gal 2:20', 'Eph 1:3-14', 'Col 3:3'],
      practice: 'Read Ephesians 1:3-14 and circle every “in Christ / in him.” Then read your day through that address.'
    },
    {
      name: 'Righteousness is a gift, not a grade', icon: 'king',
      lie: 'God’s mood toward me tracks my latest performance.',
      truth: 'He was made sin so you’d be made righteousness. The swap already happened.',
      body: '“God made him who had no sin to be sin for us, so that in him we might become the righteousness of God” (2 Cor 5:21). Romans calls it “the GIFT of righteousness” and says the ones who RECEIVE it are the ones who reign in life (Rom 5:17). You can’t earn a gift; you can only take it — and then live like it’s true.',
      refs: ['2 Cor 5:21', 'Rom 5:17', 'Phil 3:9', 'Rom 4:5'],
      practice: 'The moment you blow it, say thank-you instead of hiding: “I’m still the righteousness of God in Christ.” That’s not license — that’s the advocate’s courtroom (1 John 2:1).'
    },
    {
      name: 'It is finished — so sit down', icon: 'rest',
      lie: 'God is mostly waiting for me to do more.',
      truth: 'The work is done. Your first job is to trust it.',
      body: 'There were no chairs in the tabernacle — priests stood, because the work was never done (Heb 10:11). Then Jesus offered one sacrifice for all time “and SAT DOWN” (Heb 10:12-14). Christianity is the only faith whose founder’s last word on your standing was “finished” (John 19:30). Everything you do now flows downhill from that — work FROM rest, never for it.',
      refs: ['Heb 10:11-14', 'John 19:30', 'Heb 4:9-11', 'Matt 11:28-30'],
      practice: 'Take a real weekly rest on purpose — not as a rule, but as a protest: a declaration that your world runs on His finished work, not your hustle.'
    },
    {
      name: 'Healed at the same cross', icon: 'lamb',
      lie: 'God sent this sickness to teach me something.',
      truth: 'Jesus is what God thinks about sickness — and he healed them all.',
      body: 'Jesus is “the exact imprint” of the Father (Heb 1:3), and his ministry record is unambiguous: he “went around doing good and healing ALL who were oppressed by the devil” (Acts 10:38) — sickness filed under oppression, not curriculum. Matthew explicitly ties his healing ministry to Isaiah 53: “He took up our infirmities and bore our diseases” (Matt 8:16-17; Isa 53:4-5; 1 Pet 2:24). Communion even puts it on the table: a body broken and blood shed, worth discerning (1 Cor 11:23-30). Honest footnotes: theologians genuinely debate how much arrives now versus at resurrection; faith and doctors are teammates, not rivals (1 Tim 5:23); and condemnation over unanswered healing is never from God — the same gospel says “no condemnation” (Rom 8:1). But start where Jesus stood: God is not the author of your sickness.',
      refs: ['Isa 53:4-5', 'Matt 8:16-17', '1 Pet 2:24', 'Acts 10:38', 'Matt 9:35'],
      practice: 'Pray from the promise, not for it: thank him for what the cross already covered, speak to the mountain (Mark 11:23-24), and take communion like it means something.'
    },
    {
      name: 'Sonship, not employment', icon: 'bride',
      lie: 'I’m God’s employee — useful, or unwanted.',
      truth: 'You’re a son or daughter in the house forever.',
      body: 'Both prodigal brothers missed the father’s heart — one ran from the house, one worked in it like a hired hand (“all these years I’ve been SLAVING for you,” Luke 15:29). Neither trusted the love. “You did not receive a spirit of slavery to fall back into fear, but the Spirit of adoption, by whom we cry Abba” (Rom 8:15). Service is what sons do because they’re loved — never how orphans earn a bed.',
      refs: ['Luke 15:11-32', 'Rom 8:15-17', 'Gal 4:6-7', 'John 15:15'],
      practice: 'Once a week, do something with God that produces nothing — no ministry output, no content, no résumé line. Sons get to just be home.'
    },
    {
      name: 'Pray from the throne, not the waiting room', icon: 'temple',
      lie: 'Prayer is begging a reluctant God to maybe act.',
      truth: 'Prayer is agreeing with a willing King — from a seated position.',
      body: 'You were “raised up with him and SEATED with him in the heavenly places” (Eph 2:6), so the invitation is to come to the throne “with confidence” — boldly, not groveling (Heb 4:16). Jesus explicitly ruled out the pagan strategy of wearing God down with word-count: “your Father knows what you need before you ask him” (Matt 6:7-8). Ask, believe you’ve received, act like the Father is good — because he is.',
      refs: ['Eph 2:6', 'Heb 4:16', 'Mark 11:24', 'Matt 7:9-11'],
      practice: 'Open prayers with identity and thanks instead of apologies and throat-clearing. Watch how it changes what you ask for.'
    },
    {
      name: 'Holiness is fruit, not the entry fee', icon: 'grapes',
      lie: 'Clean up first, then you can come close.',
      truth: 'You come close, and the closeness cleans you up.',
      body: '“Abide in me… apart from me you can do nothing” (John 15:4-5) — fruit grows from connection, never the other way around. The new covenant’s wildest clause: “I will put my Spirit within you and CAUSE you to walk in my statutes” (Ezek 36:27). Your part is the reckoning — count yourself dead to sin and alive to God (Rom 6:11) — and behavior follows belief the way a boat follows its rudder.',
      refs: ['John 15:4-5', 'Ezek 36:26-27', 'Rom 6:11-14', 'Phil 2:13'],
      practice: 'When a behavior won’t budge, stop whipping it. Find the lie underneath it (“God’s holding out on me,” “I’m on my own”) and put a truth there instead.'
    },
    {
      name: 'Grace is the trainer', icon: 'walk',
      lie: 'Too much grace makes people lazy and sinful.',
      truth: 'Grace is the only thing that has ever actually trained anyone.',
      body: '“The grace of God has appeared… TRAINING us to renounce ungodliness” (Titus 2:11-12) — grace isn’t the opposite of transformation; it’s the engine of it. “Sin shall not be your master, BECAUSE you are not under law but under grace” (Rom 6:14) — the verse everyone quotes backwards. And the hardest-working apostle credited his output the same way: “I worked harder than any of them — yet not I, but the grace of God with me” (1 Cor 15:10). Law pressures from outside; grace grows from inside.',
      refs: ['Titus 2:11-12', 'Rom 6:1-2,14', '1 Cor 15:10', 'Gal 5:22-23'],
      practice: 'Audit your motivations for a week: every “have to,” ask whether a “get to” is available. That swap is the whole gearbox.'
    }
  ]
};

/* ================= DETOURS — sincere wrong turns, marked on the map ================= */
const DETOURS = {
  intro: 'Every detour here is something sincere people do, usually with verses attached — that’s exactly what makes them sticky. None of this is written to sneer; most of us have parked at several of these addresses (your field-manual authors included). The test of a teaching was never sincerity or intensity. It’s freedom (Gal 5:1), fruit (Matt 7:16), and whether it makes God look like Jesus (Heb 1:3). Each card ends with the on-ramp back.',
  items: [
    {
      name: 'Covenant mixture',
      pull: 'It feels balanced — a little law to keep grace “safe,” Sinai’s rules with Calvary’s comfort. Most of us were handed this blend and never told there were two covenants in the cup.',
      cost: 'Galatians calls mixture “falling away from grace” (Gal 5:4) — not into wild sin, but into exhausting self-effort. You get the condemnation of the law without its power to save, and the language of grace without its rest. It’s why so much Christianity feels like a gym membership used out of guilt.',
      home: 'Learn which covenant you’re under. The old ran on “we will” (Ex 19:8) and broke; the new runs on “I will” (Jer 31:31-34; Heb 8:6-13) and can’t. Read Galatians in one sitting and let it be as blunt as it actually is.',
      refs: ['Gal 3:1-3', 'Gal 5:1-4', 'Heb 8:13', '2 Cor 3:6']
    },
    {
      name: 'The confession treadmill',
      pull: 'Keeping short accounts sounds humble — confess every sin fast or fellowship is broken and forgiveness lapses. It gives anxiety a liturgy.',
      cost: 'You end up sin-conscious instead of Son-conscious — the exact condition Hebrews says the old sacrifices produced and the cross was meant to end (Heb 10:1-2,14). Grace teachers argue 1 John 1:9 wasn’t issued as a maintenance formula for believers (a reading worth weighing — it is debated). What isn’t debated: “by one offering he has perfected for all time those who are being sanctified” (Heb 10:14).',
      cost2: '',
      home: 'Confession stays in your life — but as agreement with God (that’s what homologeo means) and honesty with people, not as a coin slot for forgiveness already purchased. When you sin: run TO him, not from him. The advocate’s office never closes (1 John 2:1).',
      refs: ['Heb 10:14', '1 John 2:1-2', 'Eph 1:7', 'Rom 8:1']
    },
    {
      name: '“Just a sinner saved by grace”',
      pull: 'It sounds humble, and half of it is gloriously true — you were saved by grace alone.',
      cost: 'The New Testament never addresses believers as “sinners” — it calls them saints, sons, a new creation, over and over, including the church in Corinth that was actively misbehaving (1 Cor 1:2). Identify as a sinner and you’ll fight sin as an insider losing home-field advantage. Sin-identity is a self-fulfilling prophecy.',
      home: 'Take the name you were given: saint — not because your record is clean but because His is, and you’re in Him. “The old has passed away; behold, the new has come” (2 Cor 5:17). Humility isn’t calling yourself dirt; it’s agreeing with God about what He made you.',
      refs: ['2 Cor 5:17', 'Eph 1:1', 'Rom 6:6', '1 Pet 2:9']
    },
    {
      name: 'Sickness as God’s curriculum',
      pull: 'It offers meaning for pain: “God gave me this illness to teach me patience.” And God truly does redeem everything — so the half-truth lands.',
      cost: 'It makes you fight for your healing with one hand while suspecting God is behind the sickness with the other — faith with the parking brake on. And it repaints the Father as someone Jesus never once resembled: Jesus took sickness OFF people everywhere he went (Matt 4:23-24; Acts 10:38). Job’s affliction, the go-to proof text, is explicitly attributed to Satan (Job 2:7).',
      home: 'Redeeming a thing and authoring it are different jobs. God works ALL things for good (Rom 8:28) — that’s salvage, not sourcing. Stand where Jesus stood: sickness is an enemy he carried away (Matt 8:17). Fight it with faith AND medicine, and drop the condemnation math either way (Rom 8:1).',
      refs: ['Acts 10:38', 'Matt 8:16-17', 'James 1:17', 'John 10:10']
    },
    {
      name: 'The performance treadmill',
      pull: 'Serving hard feels like loving God — and volume is measurable, while abiding isn’t. Churches often reward the treadmill with platforms.',
      cost: 'Burnout with a Bible verse on it. You become the older brother: technically in the house, functionally a slave, secretly resentful (“all these years I’ve been slaving… you never gave ME,” Luke 15:29). Jesus’s scariest sentence targets impressive output disconnected from relationship: “I never KNEW you” (Matt 7:22-23) — the résumé was real; the relationship wasn’t.',
      home: 'Mary and Martha (Luke 10:38-42): only one thing is needed, and it isn’t the kitchen. Recover “sitting” before “serving” — Watchman Nee’s summary of Ephesians: you SIT with Christ before you WALK worthy or STAND against anything. Fruit from love outlasts product from fear.',
      refs: ['Luke 10:38-42', 'John 15:5', 'Matt 11:28-30', 'Eph 2:8-10']
    },
    {
      name: 'End-times fever & date math',
      pull: 'It feels urgent and insider-y — decoding headlines, blood moons, and timelines. Fear is energizing, and “the end is near” has packed rooms for centuries.',
      cost: 'Every date set so far has gone 0-for-all-of-history, discipling millions into anxiety, hoarding, and canceled callings. Jesus was explicit: “It is not for you to know times or dates” (Acts 1:7) — then aimed his people at witness, not calculation. Fear-based prophecy teaching also quietly reverses the gospel: the end of the story becomes a threat instead of a wedding (Rev 19:7).',
      home: 'Hold the blessed hope (Titus 2:13) with open hands and a working calendar: plant fields, raise kids, build churches — “occupy till I come” (Luke 19:13). Live so ready that the timing is someone else’s problem.',
      refs: ['Acts 1:7', 'Matt 24:36', '1 Thess 5:1-11', 'Titus 2:13']
    },
    {
      name: 'Study as a destination',
      pull: 'Knowledge feels like growth — one more commentary, one more Greek word, one more podcast. And the Bible rewards study, so the detour wears a halo.',
      cost: 'Jesus diagnosed it in the most biblically literate people alive: “You search the Scriptures because you think that in them you have eternal life… yet you REFUSE TO COME TO ME” (John 5:39-40). Information without encounter puffs up (1 Cor 8:1) and quietly substitutes knowing-about for knowing. You can memorize the map and never take the trip.',
      home: 'Study with a destination: Him. Read to meet, not just to master — and let every insight become either prayer, obedience, or worship within 24 hours, or it evaporates (James 1:22-25). This whole site is a map; don’t live on it.',
      refs: ['John 5:39-40', '1 Cor 8:1-3', 'James 1:22-25', 'Phil 3:8']
    },
    {
      name: 'Begging prayers',
      pull: 'Desperation feels spiritual — surely volume, tears, and repetition prove sincerity, and God responds to proof.',
      cost: 'Jesus says that’s the pagan model: “they think they will be heard for their many words” (Matt 6:7). Begging rehearses an orphan story — a distant God who must be persuaded — so every prayer deepens the very insecurity it’s trying to fix. The prophets of Baal begged all day (1 Kings 18:26-29); Elijah prayed about thirty seconds from covenant confidence.',
      home: 'Pray like a son at a throne, not a beggar at a window: bold (Heb 4:16), brief when brief works, believing when you ask (Mark 11:24), persistent in faith rather than in panic (Luke 18:1-8 — persistence FOR justice, from trust). Your Father was willing before you knelt (Matt 6:8).',
      refs: ['Matt 6:7-8', 'Heb 4:16', 'Mark 11:24', 'Phil 4:6-7']
    },
    {
      name: 'Turn-or-burn evangelism',
      pull: 'Fear gets fast results, and it feels faithful — didn’t Jesus mention judgment? (He did.) Scaring people toward heaven seems efficient.',
      cost: 'It misstates the gospel’s engine: “God’s KINDNESS is intended to lead you to repentance” (Rom 2:4). Fear can start a sprint but can’t sustain a life — converts of terror often become either legalists or ex-Christians. And it exports the wrong portrait: the world hears sirens where heaven sent a wedding invitation (Luke 15:22-24).',
      home: 'Preach good news that’s actually news and actually good: finished work, open arms, a Father running. Warnings exist in scripture — inside a love story, not instead of one (John 3:16-17). Kindness converts deeper than dread.',
      refs: ['Rom 2:4', 'John 3:16-17', 'Luke 15:20-24', '1 John 4:18-19']
    },
    {
      name: 'The tithe tollbooth',
      pull: 'Ten percent feels like a clean deal: pay it and you’re blessed, skip it and Malachi 3 says you’re “robbing God.” Predictable religion is comfortable — and it funds budgets.',
      cost: 'It converts giving from worship into insurance, and God from Father into toll collector. Malachi was addressed to Israel under old-covenant terms; Paul — who wrote most of the letters — never once commands a tithe. Blessing already came in full at the cross (Eph 1:3); you can’t buy what you already own.',
      home: 'New-covenant giving is cheerful, purposed, and often wildly beyond ten percent — because it flows from security, not toward it (2 Cor 9:6-7). Want to tithe? Great. Want to give more, or differently? Also great. The percentage was never the point; the freedom is.',
      refs: ['2 Cor 9:6-7', 'Eph 1:3', 'Gal 3:13-14', 'Matt 23:23']
    },
    {
      name: 'Rabbit holes & secret codes',
      pull: 'Hidden knowledge is intoxicating — numerology, conspiracy timelines, Nephilim deep-dives, “what they don’t want you to know.” It feels like advanced class.',
      cost: 'Paul flagged it by name: “myths and endless genealogies, which promote speculations rather than the stewardship from God that is by faith” (1 Tim 1:4). The hours are real, the fruit isn’t — nobody was ever healed, freed, or made more loving by a chart of secret dates. And it trains appetite away from the gospel’s open secret: Christ in you (Col 1:26-27).',
      home: 'The mystery has been REVEALED — that’s the New Testament’s whole announcement (Eph 3:3-9). Enjoy patterns (this site is full of them) as windows toward Jesus, never tunnels away from him. If a teaching produces suspicion instead of love, it failed the test (1 Cor 13:2).',
      refs: ['1 Tim 1:4', 'Col 1:26-27', '1 Cor 13:2', '2 Tim 2:23']
    },
    {
      name: 'Lone-ranger faith',
      pull: 'After church hurt or church cringe, “just me and Jesus” feels clean — no politics, no hypocrites, no 9 a.m. call time. Half of it is even true: you don’t need a building to be loved.',
      cost: 'You were built with a relational half that doctrine alone can’t feed — joy, identity, and resilience form face-to-face (that’s not just theology; it’s attachment science). Isolated embers cool. “Let us not neglect meeting together” (Heb 10:24-25) isn’t attendance-taking; it’s a survival instruction for hearts.',
      home: 'Find your people, even if it’s small and unofficial — a table is church-shaped (Acts 2:46). Forgive the institution its scars without starving yourself of the body. You’re a member of one Body; members don’t thrive in jars (1 Cor 12:21-27).',
      refs: ['Heb 10:24-25', 'Acts 2:42-47', '1 Cor 12:21-27', 'Eccl 4:9-12']
    }
  ]
};
