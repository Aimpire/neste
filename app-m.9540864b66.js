
/* En JS-feil skal aldri gi en hvit flate. Vises en gang, paa engelsk og urdu
   (de to stoerste gruppene), med én knapp: last siden paa nytt. */
const visFeil = function(){
  if(document.getElementById("jsfeil") || !document.body) return;
  document.documentElement.removeAttribute("aria-busy"); document.documentElement.classList.add("klar");
  const d = document.createElement("div"); d.id = "jsfeil"; d.setAttribute("role", "alert");
  d.style.cssText = "position:fixed;left:0;right:0;bottom:0;inset:auto 0 0 0;z-index:99;padding:14px 16px;background:#14101C;color:#F2EFEA;border-top:1px solid #FFD166;font:15px/1.5 system-ui,sans-serif;display:flex;gap:12px;align-items:center;flex-wrap:wrap";
  const t = document.createElement("span"); t.textContent = "Something went wrong. Reload the page. \u2014 \u06a9\u0686\u06be \u063a\u0644\u0637 \u06c1\u0648 \u06af\u06cc\u0627\u06d4 \u0635\u0641\u062d\u06c1 \u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u06be\u0648\u0644\u06cc\u06ba\u06d4";
  const b = document.createElement("button"); b.type = "button"; b.textContent = "Reload";
  b.style.cssText = "margin-inline-start:auto;padding:9px 16px;min-height:40px;border:0;border-radius:999px;background:#FFD166;color:#14101C;font-weight:700;cursor:pointer";
  b.onclick = function(){ location.reload(); };
  d.appendChild(t); d.appendChild(b); document.body.appendChild(d);
};
window.addEventListener("error", visFeil);
window.addEventListener("unhandledrejection", visFeil);   /* promise-stier (liste, pakke) - funn A5 */

const C = {"brand":{"name":"Aimpire","name_ur":"Aimpire","description":"The guide to opening your account, step by step — English, Norsk, हिन्दी, العربية, اردو. Honest about the risks."},"hero":{"en":{"line1":"Start here.","line2":"Aim for it.","sub":"Learn trading honestly. Get started safely, step by step. Copy Sonic — with the risk in plain sight."}},"sponsor":{"en":{"goes_to":"You will be connected to","fingerprint":"link ends","change":"Change","none_title":"No sponsor link yet? Start in the Aimpire chat.","back_title":"Welcome back","none_body":"Join the chat and say hi in your country's group (or in ❓ Questions). The moderators will help you get started. Already got a link from someone? Open this page from that link instead.","none_foot":"Inviting people yourself? Get your own link, so everyone you invite reaches you.","conflict":"You already have an invite from {A}. This one is from {B}. Who invited you?","keep":"{A}","use":"{B}","by":"{N} invited you","register":"Register with us now","via":"Through {N}'s link","name_ph":"Your first name","name_lab":"Shown to the people you invite","double_check":"Is this the right person? If you are the one inviting others, sign up from your own link instead — not from someone else's. Once your account is created, it cannot be moved.","own_cta":"Inviting others? Make your own app page","own_link":"Make your own app page","own_link_hint":"Have an account and want to invite others? Apply for your own app page — once it is approved, everyone you invite is linked to you.","self_warn":"This is your own leader link. Sign up through the link of the person who invited you — your own link is for the people you invite.","short_check":"Inviting people yourself? Use your own link, not this one.","not_you":"Not invited by {N}? Open the link your own sponsor sent you.","checking":"Checking your invitation…","not_yet":"Not registered yet?","more_q":"Wrong sponsor?","own_wait_t":"This is your own link — it is waiting for approval","own_wait_b":"Your name will appear here as soon as the founder approves it. You do not need to apply again. Your sponsor is still the person who invited you.","chat_cta":"Join the Aimpire chat","follow":"Follow {N}"}},"sections":{"start":{"en":"The short version"},"platform":{"en":"Where things live"},"earn":{"en":"How earning works"},"values":{"en":"What the name means"},"video":{"en":"Watch first"},"docs":{"en":"Guides that already exist"},"help":{"en":"When you are stuck"},"leaders":{"en":"Make your own app page"},"guide":{"en":"Opening your account, step by step"},"learn":{"en":"The words, if you want them"},"platform_gate":{"en":"Locked until your sponsor link is set, so your account doesn't end up without a sponsor."},"amplify":{"en":"Sonic — what it is, and what you agree to"},"ib":{"en":"How you earn, if you want to"},"tools":{"en":"Tools"},"apps":{"en":"Apps"},"faq":{"en":"Questions and answers"},"withdraw":{"en":"Taking money out"},"results":{"en":"What Sonic has done, month by month"},"calculator":{"en":"Your amount, run through the record"},"bonus":{"en":"Bonuses and incentives: what each one takes"}},"steps":{"en":["Use your sponsor's link","Create your account","Create your broker account — only with this button","Verify your identity","Wait for approval","Install the two apps","Put money in","Connect to Sonic copy trading","See your account in MetaTrader 5","Join the group"]},"earn":{"en":{"intro":"Optional. Four ways it can pay, and one warning: your real numbers live only in your IB Portal — never in a chat message.","items":[["Rebate per lot","Part of the trading cost comes back on every lot your team trades. Paid on activity. No trading, no rebate."],["Profit share","When a strategy closes a winning trade, the profit is split. The person whose money is in the account keeps the largest share."],["Team bonus","As people you introduced start trading, more levels of the structure can open. Your IB Portal shows which are open and which are still locked — the numbers on that screen are the ones that count."],["Pools and campaigns","Leader pools and seasonal campaigns come and go. Read the current terms before you count on one."]],"warning":"Trading involves real risk, and most retail accounts lose money. What you earn here depends on actual activity — there is no guaranteed income, and it can be nothing. We would rather be honest with you about that from the start."}},"values":{"en":[["A","Aspire","Dream big and go after it. Ambition is the starting point, not the reward."],["I","Inspire","Share what you learn, including what went wrong. Lift the person next to you."],["M","Meritocracy","Work and skill get recognised. Where you come from does not decide what you can become."],["E","Empire","Built together, or not at all. Everyone belongs and everyone contributes."]]},"leaders":{"en":{"title":"Your fixed Aimpire link","body":"Tap the button below, copy your Partner link in the IB Portal, and paste it here. It looks like copyxapp.com/auth/register?e=…&a=1. Once you're approved, you get one fixed link with your name — nobody can change it.","placeholder":"Paste your Partner link here","button":"Get my link","ok":"Copied. This is your fixed link — send it privately to the people you invite. Never post it in the group.","bad":"That is not your Partner link. Copy it from IB Portal → Profile — it looks like copyxapp.com/auth/register?e=…&a=1. Links from the CopyX app itself are not accepted.","name_hint":"Your first name goes in the request. Approved leaders' names show to the people they invite.","pending":"You are not approved yet. Tap «Apply for approval» and your name and link go to the founder.","apply":"Apply for approval","applied":"Sent ✓ You will get your link by email as soon as you are approved.","apply_fail":"It could not be sent. Check your connection and try again.","pending_line":"You are not on the approved list yet. The request has been copied — send it to the founder. Once you are added, paste your link here again.","applied_wait":"You've got a receipt by email, and you'll get one more email when you're approved. Nothing after an hour? Check spam, or ask the person who invited you.","why":"Only use the Partner link from the IB Portal. A link from anywhere else won't connect your members correctly.","mail_ph":"Your email","mail_hint":"We email you when your link goes live. Nothing else.","spons_ph":"Who invited you? (first name)","spons_hint":"Write who invited you to Aimpire — your sponsor's first name.","portal_btn":"Open my IB Portal profile","bio_title":"📲 Put it in your bio","bio_body":"Put the link in your Instagram or TikTok bio. Whoever taps it sees your name and gets you as their sponsor. Keep the bio honest: no income promises.","bio_copy":"Copy link for my bio","bio_done":"Copied ✓","saved":"Your link — saved on this phone","sent_btn":"Application sent ✓","sending":"Sending …","share_btn":"Share link","share_msg":"Join Aimpire through my link — step by step, in your language. Open it in Chrome or Safari, not inside the app:","share_short":"Share","kit":{"t":"Leader toolbox","lede":"Stuck? Here is what you need when you explain Aimpire.","items":[["Explain Sonic","Flow, numbers and an example"],["The setup guide","Show the steps to someone new"],["IB and bonuses","Levels and the bonus staircase"],["Questions & answers","Answers to what people ask"],["Market hours","When the market is open"],["IB Portal","Your real numbers"]],"mine_d":"Your link, sharing and your profile","apply_d":"Apply for your own link here"},"st_wait_t":"Application sent ✓","st_wait_b":"No need to tap again. Your link comes by email as soon as you are approved.","st_ok_t":"Approved ✓ — your link works","again":"Apply with a different Partner link?","is_sponsor":"This is your sponsor's link, not your own. Copy your own Partner link from the IB portal (the button above).","qr":{"btn":"Make an invite card with QR","title":"{N} invites you","sub":"Learn trading step by step, in your own language.","scan":"Scan with your camera and open in Chrome or Safari.","risk":"Trading involves risk. No income is promised.","saved":"Card saved"},"list":{"show":"Show me in the leader list (optional)","show_h":"New members without a sponsor can then choose you. Only your first name and the languages and country you pick are shown.","langs":"Languages you can help in","country":"Your country (optional)","pick_btn":"Choose your leader","pick_t":"Choose the leader you want to start with","pick_lede":"Everyone here is an approved Aimpire leader. The order is random every time. Pick someone who speaks your language.","all":"All languages","go":"Choose","none":"No leaders in this language yet. Tap «All languages»."},"linkname":{"lbl":"Your link name","ok":"Available ✓","taken":"Taken. Suggestions:","hint":"Only a–z and numbers, 3–20 characters. First name, nickname or name + country."},"sos":{"t":"Social media (optional)","hint":"Shown next to your name so people can follow you. Just your username.","wa":"Your WhatsApp number will be visible to everyone who sees your name.","prof_t":"Your profile","prof_lede":"Add or change your social media. Use the email you applied with.","save":"Save profile","saved":"Saved ✓","err_mail":"Enter the email you applied with.","el":"Element X: your full ID, e.g. name:matrix.org — it is on your profile in the app. People can then message you directly.","sent":"Sent {T}. It shows for everyone in a few minutes – nothing more to do.","visible":"✓ Visible to everyone now."},"src":{"warn":"Do not use the link from the CopyX app – it looks the same, but it does not connect people to you. Only the Partner link from the IB Portal (Profile) works – not SonicFunnel.","chk":"My link is from the AiTech IB Portal, not from the CopyX app","need":"Tick the box to confirm the link is from the IB Portal."},"mail_same":"Already got your link? Use the same email, and your profile is updated instead of a new application."}},"risk":{"en":"Trading involves risk and you can lose the money you put in. Nothing here is financial advice, and no income is promised. Use only money you can afford to lose, and check the rules that apply where you live."},"legal":{"en":"Aimpire is a learning community. We are not a broker, we do not take deposits, we do not manage anyone's money, and we do not give financial advice.\n\nThe rules for trading with a broker in another country are not the same everywhere, and in some countries they are restricted. Find out what applies where you live before you put money in — that decision, and what follows from it, is yours. Leaders here share what they have learned; they do not advise, and they do not handle anyone's money. Everything shared in the community — charts, examples, signals — is for learning, so you can judge for yourself; it is never a recommendation to buy or sell.\n\nThe prices in the app come from gold-api.com, and the row with indices and currency pairs is an embedded ticker from TradingView. When it loads, the request goes to TradingView with your IP address, as it does with any website you visit. The news comes from Forex Factory."},"links":{"main":[{"url":"__REF__","primary":true,"en":["Create your account","Through your sponsor's link"]},{"url":"https://instagram.com/aim.pire","en":["Instagram","@aim.pire — what we are up to"],"icon":"assets/logo-ig.png"}],"platform":[{"url":"https://www.copyxapp.com","en":["CopyX","The copy-trading platform"]},{"url":"https://portal.tagmarkets.com/login?brd=1&wp=4","en":["Tag Markets","Deposits, withdrawals and ID check"],"icon":"assets/logo-tag.png"},{"url":"https://aitech.ibportal.io/profile","en":["IB Portal (AiTech)","Your team, your commissions, your real numbers"],"icon":"assets/logo-aitech.png"}],"video":[{"url":"","en":["Signing up","Three minutes, start to finish"]},{"url":"","en":["Finishing KYC","Which documents, and why they ask"]},{"url":"#steg-7","en":["Making a deposit","Getting money onto the account"]},{"url":"https://drive.google.com/file/d/1KrEU9XkoVflSNhCXUtmHzx-wY0q_RBB1/view","en":["Connecting CopyX","Linking your broker account"]},{"url":"","en":["Taking money out","Do this early, with a small amount"]}],"docs":[{"url":"https://intercom.help/tag-markets/en/articles/10088332-how-to-change-your-account-password","en":["Changing your password","The broker's own guide, with pictures"]},{"url":"","en":["Start here guide","PDF, English"]},{"url":"","en":["Start here guide","PDF, Urdu"]},{"url":"#les-size","en":["Pips and lot size","How much one move actually costs you"]},{"url":"#les-mind","en":["Trading psychology","The part nobody wants to read"]},{"url":"#les-time","en":["When the market moves","Sessions, overlaps and the daily change"]},{"url":"#les-gold","en":["Gold: what moves it","Four drivers, and why one move has many reasons"]},{"url":"#les-candle","en":["Reading a candlestick","Four prices in one shape"]},{"url":"#les-corr","en":["Two trades can be one","Why spreading out is not always spreading risk"]},{"url":"#les-swap","en":["Swap: the cost of holding overnight","Why buying and selling can cost different amounts"]},{"url":"#les-regime","en":["Three kinds of market","Up, down and sideways — and why one method doesn't fit all three"]}],"help":[{"url":"__ASK__","en":["Ask your sponsor","The person who invited you"]},{"url":"#chat","en":["Ask the group","Anyone in the group can answer"]},{"url":"https://www.tagmarkets.com/","en":["Tag Markets support","Chat or WhatsApp on tagmarkets.com, or a ticket under Support in the Tag Markets portal — for your account, deposits and withdrawals"]},{"url":"#faq","en":["Common questions","Answered once, properly"]}],"tools":[{"url":"https://www.myfxbook.com/members/SonicExperts/sonic-ai/12076857","en":["Myfxbook results","Month by month, with the drawdown next to it"],"icon":"assets/logo-mfx.png"},{"url":"https://www.myfxbook.com/forex-calculators/position-size","en":["Position size calculator","How many lots fit your stop and the risk you chose"],"icon":"assets/logo-mfx.png"},{"url":"https://www.myfxbook.com/forex-calculators/pip-calculator","en":["Pip calculator","What one pip is worth in dollars at your lot size"],"icon":"assets/logo-mfx.png"},{"url":"https://www.forexfactory.com/calendar","en":["Economic calendar","When the market is about to move, and why"],"icon":"assets/logo-ff.png"},{"url":"https://matrix.to/#/%23aimpire:matrix.org","en":["Aimpire group","Questions and news — opens in Element X"],"icon":"assets/app-element.jpg"},{"url":"https://instagram.com/aim.pire","en":["Instagram","@aim.pire — what we are up to"],"icon":"assets/logo-ig.png"}]},"guide":{"en":{"lede":"Steps 1–4 take about fifteen minutes. Have your ID card or passport ready.\nThen you wait for approval. The rest you do when it suits you — the page remembers where you stopped.","steps":[["Use your sponsor's link","Open the link your sponsor sent you — their own link, not one from a group.\nRight below you see your sponsor's name and a six-character code — then you are on the right link.\nNo such line? Ask your sponsor to send you their link before you go on.",{"check":"Your sponsor's name and the code show right below. If nothing shows, no sponsor is attached to you."}],["Create your account","Tap «Register with us now» right below. CopyX opens in a new tab.\nFill in the form the way the numbers on the picture show, wait for «Verifying…» to finish, then press Sign Up.\nOpen the email you get and tap the confirmation link. Not in your inbox? Check spam.",{"img":"assets/shot-register.jpg","alt":"The CopyX sign-up form","marks":[{"n":1,"x":24,"y":32,"t":"Your real name. It must match the ID you upload later, or verification fails."},{"n":2,"x":24,"y":45,"t":"A password you use nowhere else. Not your email password."},{"n":3,"x":9,"y":66,"t":"Tick both. Read them first — they say you can lose money."},{"n":4,"x":50,"y":87,"t":"If you see this yellow box, your link was missing the invite code. Go back and open your sponsor's link instead."},{"n":5,"x":24,"y":56,"t":"This is set to Albania for everyone. Change it — the phone code follows it."}],"check":"You tapped the link in the email and are asked to log in."}],["Create your broker account — only with this button","Just confirmed your email? Log in to CopyX (copyxapp.com) with the button below — the same email and password you signed up with. Scroll down to the third green box, CopyX Registration.\nThe first time, the button in the box says Register to CopyX. Press it — that is how your Tag Markets account is created. Once it is done, the button says Login to CopyX.\nDo not create the Tag Markets account anywhere else — an account made elsewhere is not linked to your sponsor.",{"video":{"url":"https://drive.google.com/file/d/1KrEU9XkoVflSNhCXUtmHzx-wY0q_RBB1/view","label":"Watch this step"},"note":"The box says it too: use only that button.","img":"assets/shot-copyx-register.jpg","alt":"The CopyX Registration box after logging in at copyxapp.com","marks":[{"n":1,"x":34,"y":37,"t":"Read this line. It tells you to create the broker account from here, not anywhere else."},{"n":2,"x":13,"y":71,"t":"This is the button. The first time it says Register to CopyX. This picture was taken afterwards, so here it says Login to CopyX."},{"n":3,"x":50,"y":90,"t":"The warning in yellow: do not create the Tag Markets account any other way than with this button, or it will not be linked."}],"check":"The button in the box now says Login to CopyX — your Tag Markets account is created and linked. From now on you log in to Tag Markets directly, with the same username and password."}],["Verify your identity","Log in to Tag Markets with the button below and open Upload Documents.\nYou need your ID card or passport, plus a face scan.\nPhotograph the document in good light with all four corners visible — a blurry photo is the usual reason for rejection.",{"img":"assets/shot-kyc.jpg","alt":"The Upload Documents panel","marks":[{"n":1,"x":50,"y":44,"t":"Pick the document type here first. Nothing uploads until you do."},{"n":2,"x":50,"y":75,"t":"This yellow line is normal before you upload. It is not an error."},{"n":3,"x":90,"y":5,"t":"Validate means the broker has not checked your documents yet."}],"check":"The yellow «upload» line is gone and your document shows as submitted. «Validate» only means the broker has not looked yet. You don't need to press anything."}],["Wait for approval","Approval usually takes a short while.\nUntil then you cannot deposit — the notice on the wallet page in Tag Markets is normal, not an error.",{"img":"assets/shot-wallet-kyc.jpg","alt":"The wallet page showing that KYC must be completed first","marks":[{"n":1,"x":50,"y":30,"t":"This pink line means verification is still pending. It disappears once your documents are approved."}],"check":"The pink line on the wallet page is gone and Deposit can be pressed."}],["While you wait: install the two apps","Use the wait to install two apps, from the official stores only — the buttons below go straight there.\nMetaTrader 5, to see your account (step 9).\nElement X, for the Aimpire group (step 10).\nTag Markets and CopyX run in your browser. Never install a «Tag Markets app» someone sends you.",{"appcards":true,"check":"Both apps open on your phone. You do not need to log in yet."}],["Put money in","Have the crypto ready in your wallet first — the address you get works for about 15 minutes.\nIn the Tag Markets portal, press Deposit and choose the amount and the crypto. Send a little more than $10, for example $12 on a low-fee network — fees are taken on the way, and at least $10 has to arrive.\nPress copy next to the address, paste it into your wallet (Binance, RedotPay or similar) and check that the first four and last four characters match.\nTime ran out? Get a new address — never reuse the old one.\nSend the crypto only to the address the Tag Markets portal shows you — never to a person, not even your sponsor or a leader.",{"note":"Pick the same network in your wallet as the payment page shows.\nCheapest: Solana and Polygon (under a cent), then BNB (BEP20, 10–30 cents) and TRON (TRC20, around $1–1.5). Ethereum (ERC20) costs the most. Bitcoin and Polkadot also work — Arbitrum does not.\nWe recommend crypto: it arrives within 2–3 hours. A card takes 6–8 working days and is often declined; bank transfer exists only in the EU (from $500). Check what is allowed where you live.","check":"The amount shows on the wallet page in the Tag Markets portal, usually within 2–3 hours. Your wallet may show «Pending» for a while — up to 24 hours. Still missing after that? Check the transaction in your wallet, and ask your sponsor.","clip":{"src":"assets/video/steg6-innskudd.mp4","poster":"assets/video/steg6-innskudd.jpg","secs":71},"p2p":true}],["Connect to Sonic copy trading","This step starts the copying — until then, nothing trades.\nLog in to Tag Markets with the button below and choose CopyX in the menu (not copyxapp.com). Find SONIC and press Details. The card shows the terms: 30 % performance fee, one month minimum, no management fee and no joining fee.\nPress Connect, enter your amount (minimum $10) and choose Amplify.\nUnder Community Token type #Aitech, press Verify, enter 000000 in Hash and press Submit.\nTick both boxes and press Copy Now.",{"note":"With the token the account trades at 24× — our $109 traded as $2,616. A 4.2 % drop in the trading balance uses up your deposit, and at 5 % the account closes by itself. Put in an amount you can afford to lose.","codes":[{"label":"Community token","value":"#Aitech"},{"label":"Hash","value":"000000"}],"check":"«CopyX Account Created» appears — press Continue, and SONIC shows on your dashboard. Amount $0? Submit did not go through — do Connect again from the start, and ask your sponsor if it happens again.","clip":{"src":"assets/video/steg7-sonic.mp4","poster":"assets/video/steg7-sonic.jpg","secs":65},"quiz":{"q":"Your deposit trades at 24×. The trading balance falls 4.2 %. How much of your deposit is left?","a":["Almost all of it","None of it"],"right":1,"why":"None of it. At 24×, a 4.2 % fall in the balance is your whole deposit — our $109 traded as $2,616. The account closes by itself at 5 %. The amount you put in is the part you control."}}],["See your account in MetaTrader 5","In the Tag Markets portal open MT5 Credentials: account number, Master Password, Investor Password.\nIn MetaTrader 5 add an existing account, search for T.M. Financials Ltd and choose TMFinancials-Server.\nYour login is the account number, and the password is the Investor Password — you see everything but cannot trade by accident. Then you see Balance, Equity and Free Margin.",{"note":"The Master Password can trade; the Investor Password can only look. Never give anyone your Master Password. If someone needs to check your results, give them the Investor Password.","apps":{"lede":"Install MetaTrader 5 for your phone:","items":[{"os":"Android","url":"https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"},{"os":"iPhone","url":"https://apps.apple.com/app/metatrader-5/id413251709"}]},"check":"Balance matches the Tag Markets portal and is 24 times the amount you connected to Sonic in step 8 — our $109 showed as $2,616. Not 24 times? Stop and ask your sponsor.","clip":{"src":"assets/video/steg8-mt5.mp4","poster":"assets/video/steg8-mt5.jpg","secs":51},"vpn":{"t":"Can't find T.M. Financials Ltd in the search? In Pakistan and some other countries the network blocks the search. Turn on the free 1.1.1.1 app from Cloudflare while you search, and turn it off once the account is added. In Norway, the UK and similar countries you don't need it.","h":"Free: 1.1.1.1 (Cloudflare)"}}],["Join the group","Questions get answered in the group — nobody there started out knowing anything.\nAdding more money later? Add a little at a time.",{"apps":{"lede":"Install Element X — that exact app, not Element Classic and not another chat app. Make an account, any username. Then come back here and tap Join the Aimpire group.","items":[{"os":"Android","url":"https://play.google.com/store/apps/details?id=io.element.android.x"},{"os":"iPhone","url":"https://apps.apple.com/app/element-x/id1631335820"}]},"join":{"url":"https://matrix.to/#/%23aimpire:matrix.org","label":"Join the Aimpire group"},"check":"You can read the messages, not just see the group's name."}]],"quiz_t":"Quick check","quiz_again":"Have another look —","phases":[["Set up",0,3],["Waiting",4,5],["Running",6,9]]}},"langs":[{"code":"en","label":"English","dir":"ltr","font":"latin"},{"code":"no","label":"Norsk","dir":"ltr","font":"latin"},{"code":"hi","label":"हिन्दी","dir":"ltr","font":"deva"},{"code":"ar","label":"العربية","dir":"rtl","font":"naskh"},{"code":"ur","label":"اردو","dir":"rtl","font":"naskh"},{"code":"ar_rm","label":"Roman Arabic","dir":"ltr","font":"latin","bcp":"ar-Latn","roman_of":"ar"},{"code":"ur_rm","label":"Roman Urdu","dir":"ltr","font":"latin","bcp":"ur-Latn","roman_of":"ur"}],"earn_shot":{"img":"assets/shot-commission.jpg","alt":{"en":"The commissions overview in the IB Portal"},"marks":{"en":[{"n":1,"x":22,"y":55,"t":"This is where your real numbers live. If a figure in a chat message does not match this screen, this screen is right."}]}},"places":{"title":{"en":"Two places you use, one login"},"lede":{"en":"One login for everything: CopyX (copyxapp.com) and Tag Markets use the same username and password. Knowing what each place is for spares you most of the confusion."},"items":{"en":[["CopyX (copyxapp.com)","You sign up here (step 2) and link the broker account with Register to CopyX (step 3)."],["Tag Markets","The broker — the company that holds your money. ID, deposit, Sonic (CopyX in the menu), MT5 and withdrawals happen here, from step 4."],["IB Portal (AiTech)","Only if you invite others: your team and your numbers. Same login."]]}},"guide_ui":{"en":{"copy":"Copy","copied":"Copied","progress":"{done} of {total} steps done","reset":"Clear","check":"You know it worked when","mark":"Mark this step done","marked":"Done — tap to undo","left":"{n} left","next":"Next: {t}","all_done":"All {total} steps done. You are set up.","all_done_go":"Next: how Sonic works","watch":"See it on screen — {s} seconds","stuck":"Stuck? Ask your sponsor — the person who sent you the link — or in the Aimpire group (the ❓ Questions room), in any language.","ask_btn":"Ask {N} for help","ask_msg":"Hi {N}, I need help with step {n} of 10 in the Aimpire guide: «{t}». Can you help me?","read_btn":"Read aloud","read_stop":"Stop","ask_gen":"Hi {N}, I need a little help with Aimpire. Do you have a moment?","portal_btn":"Log in to CopyX","cont_label":"Your setup · step {n} of {total}","cont_go":"Continue where you left off","tm_btn":"Log in to Tag Markets"},"_stuck_url":"https://matrix.to/#/%23aimpire-questions:matrix.org"},"learn":{"intro":{"en":"You do not need any of this to let Sonic run. It is here for when you want to understand what you are looking at. Tap any word to open it."},"labels":{"en":["Example","Why it matters","Formula"]},"terms":{"en":[["Pip","The unit a price moves in — the fourth decimal on most pairs.","On EUR/USD, 1.0850 → 1.0851 is one pip. At 0.01 lots that is $0.10.","Every target and result you hear is quoted in pips, and a number of pips means nothing until you know the lot size behind it.","pip value = lots × $10   (USD-quoted pair)","pip"],["Point","A tenth of a pip. Some platforms quote points instead.","«+500 points» on EUR/USD is 50 pips. At 0.01 lots that is $5, not $500.","This is the mix-up that makes a modest result look ten times bigger. Check the unit before you compare your numbers to anyone's.","pips = points ÷ 10",""],["Spread","The gap between the buy price and the sell price. You pay it the moment you enter.","Buy 1.08515, sell 1.08500 is 1.5 pips. At 0.01 lots, $0.15 per trade.","Every trade starts behind by the spread, win or lose. Ten trades a day on a small account is a real cost.","spread cost = spread in pips × pip value","spread"],["Lot size","How much you trade. This decides what one move is worth — and it is not the same number on every instrument.","EUR/USD: 1.00 lot ≈ $10 per pip, 0.01 ≈ $0.10. Gold (XAUUSD): 1.00 lot = 100 oz, so a $1 move is $100.","This is the one number that decides whether an ordinary move is an irritation or the end of the account — and the figure differs per instrument. Sonic's own record shows it trades gold, not a currency pair. Before you size anything, check the real value: in MT5, open the symbol's Specification (on a computer, right-click the symbol).","pip/point value = lots × contract size × tick     EURUSD → $10 · XAUUSD → $100","lot"],["Leverage and margin","Leverage is how big a position you may hold. Margin is the part of your money locked while it is open.","A 0.01 lot EUR/USD position is about $1,085 of currency. At 1:300 that ties up roughly $3.60 of yours.","Higher leverage does not reduce risk. It only frees margin so you are allowed to open more.","margin = lots × 100,000 × price ÷ leverage",""],["Balance and equity","Balance is money from trades already closed. Equity is that plus or minus everything still open.","Balance $100, one trade 40 pips against you at 0.01 lots (−$4) → equity $96.","Balance is history. Equity is where you actually stand. A floating loss is a real loss not yet written down.","equity = balance + open profit − open loss",""],["Margin call and stop out","When equity falls far enough against the margin your trades need, the broker closes them for you.","A $100 account carrying a $60 floating loss has $40 of equity left.","At a stop out you do not choose the exit. The loss is locked in at that moment, often at the worst point.","margin level = (equity ÷ used margin) × 100 %",""],["Stop-loss","A standing instruction to close at a price you picked in advance, so the loss stops growing.","Buy at 1.0850 with a stop at 1.0830 is 20 pips. At 0.01 lots, $2 at risk — decided before you entered.","Without one, the size of your loss is set by how long you can stand to look at it.","risk = stop in pips × pip value",""],["Limit and stop orders","A limit waits for a better price. A stop only triggers once price pushes through a level.","Price 1.0850. Buy Limit 1.0830 fills if price falls. Buy Stop 1.0870 fills if price rises.","Signals are posted in this shorthand: Buy Limit, Buy Stop, Sell Limit, Sell Stop. Pick the wrong one of the four and it either never triggers, or opens your trade at the wrong moment."],["Risk per trade","The money — not the pips — you accept losing on one trade.","$100 account, 0.01 lots, 20-pip stop = $2 at risk. That is 2 percent.","On a $100 account the smallest tradable size already risks several percent per trade. The «risk 1 percent» advice does not fit yet.","lots = risk in $ ÷ (stop in pips × $10)","size"],["Drawdown","How far equity has fallen from its highest point, in percent.","$100 down to $60 is 40 percent down. Getting back to $100 needs a 67 percent gain, not 40.","Losses and recoveries are not symmetrical. A run of small losses can leave you needing a return you have never produced.","gain needed = loss ÷ (1 − loss)   →   40 % lost needs 67 % back","dd"],["Compounding","Leaving gains in, so position size grows with the balance instead of staying fixed.","$100 at 5 percent a month, profit left in, is about $180 after a year rather than $160.","It is the honest argument for patience on a small account — and the engine of every unrealistic plan you will be shown.","final = start × (1 + rate)^periods",""]]},"fig_ui":{"en":{"drag":"Drag to move the price","gold":"Gold: think in dollars, not pips. Check your broker's contract size."}}},"academy":{"title":{"en":"Aimpire Academy"},"lead":{"en":"Longer lessons, one honest topic at a time. Everything here is for learning — nothing is advice."},"lessons":[{"id":"size","title":{"en":"Pips and lot size"},"sub":{"en":"How much one move actually costs you"},"blocks":{"en":[["What a pip is worth","On EUR/USD a pip is the fourth decimal: 1.0850 → 1.0851. With 1.00 lot a pip is about $10; with 0.01 lot, about $0.10. Gold is quoted differently: with 1.00 lot, a $1 move in the gold price is about $100 — so think in dollars, not pips, for gold and oil."],["The formula","Two lines, and they decide the size — not your mood. Always round down to the smallest lot step, usually 0.01.","Risk in $ = account × risk % / 100\nLots = risk in $ / (stop distance in pips × pip value per lot)"],["A real sum with small money","Account $100, risk 2 % = $2. Stop 20 pips away on EUR/USD. That is 0.01 lots — the smallest size there is. This is why small accounts have no room for wider stops or bigger sizes: the sum sets the size, not courage.","$2 / (20 × $10) = 0.01 lots"],["The 0.01 floor","If the formula gives less than 0.01 — say account $50 and a 40-pip stop → 0.0025 lots — then even the smallest size risks more than you chose. The honest options: a closer stop with a reason, or letting that trade go. Forcing 0.01 anyway makes your risk % a wish, not a setting."],["Points are not pips","Some platforms count in points: 10 points = 1 pip. A «100 points» move is 10 pips. Mixing them up makes every sum wrong by a factor of ten — check which one your platform shows."],["Check your platform","Contract sizes differ between brokers, especially for oil and indices. In MT5: right-click the symbol → Specification. Two minutes that protect every sum you will ever make."],["What leverage changes — and what it does not","Leverage decides how much of your money the broker sets aside as margin to open a trade — not what a pip is worth. 0.01 lot of EUR/USD is about $1,085 of currency: at 1:500 that needs about $2.17 of margin, at 1:30 about $36. The profit or loss per pip is the same $0.10 either way. What high leverage changes is how small a balance can open a big size — and how fast a losing run reaches the stop-out level, where the broker closes your trades for you. Limits on leverage differ from country to country — check what applies where you live.","Margin = lots × contract size × price / leverage\n0.01 × 100,000 × 1.0850 / 500 = $2.17"]]},"quiz":{"en":{"q":"Account $100, risk 2 %, stop 20 pips on EUR/USD. What size fits?","a":["0.01 lot","0.10 lot","1.00 lot"],"right":0,"why":"$2 ÷ (20 pips × $10 per lot) = 0.01 lot. With 0.10 lot the same stop would cost $20 — a fifth of the account."}}},{"id":"mind","title":{"en":"Trading psychology"},"sub":{"en":"The part nobody wants to read"},"blocks":{"en":[["Losing and recovering are not symmetrical","Lose 10 % and you need 11 % to get back. Lose 50 % and you need 100 %. This is why the first job is never «win more» — it is «lose small». Every rule in this community about small risk comes from this one sum."],["How to recognise an income claim","Posts that show a bot, a balance and a dream have a pattern: a best month, but no test period, no largest loss, no result on data the system never saw. One question punctures most of them: «where is the test?» When one widely shared «AI bot» was rebuilt exactly as described and run on three years of real data, it lost 82 %."],["Ask for the test, not the screenshot","A screenshot shows a moment. A test has a period, a largest drawdown, and results on data the system never saw. Fewer than 20 trades is not a record, it is a tendency. These questions are not rude — anyone with something real answers them gladly."],["News windows","Around big scheduled news (rate decisions, jobs numbers) the price can jump and the spread widen. A calm habit: know this week's «High» events from the calendar, and expect the 15 minutes before and after to be wild. Not a rule we enforce — a habit that saves beginners from their worst prices."],["The tool is not the decision","Copy trading and AI tools can watch, read and suggest — but the account, the risk and the decision stay yours. Use the tool to understand more, never to look away. If you cannot explain why a position is open, that is the signal to learn — not to add money."],["When it hurts","After a loss the strongest urge is to win it back at once — same day, bigger size. That urge has emptied more accounts than any bad strategy. The habit that works: write the loss down, close the platform, and come back tomorrow with the same small risk as always."]]},"quiz":{"en":{"q":"You lost 50 %. How much must you gain to get back to where you started?","a":["50 %","100 %","75 %"],"right":1,"why":"Half of $100 is $50, and $50 has to double to reach $100 again. Losing and recovering are not symmetrical."}}},{"id":"time","title":{"en":"When the market moves"},"sub":{"en":"Sessions, overlaps and the daily change"},"blocks":{"en":[["A market that almost never sleeps","Currencies trade around the clock from Sunday evening to Friday evening, New York time. About $9.6 trillion changes hands each day (BIS, April 2025), and three quarters of it goes through trading desks in the United Kingdom, the United States, Singapore and Hong Kong. That is why the working hours of those places matter to you."],["Four sessions","Sydney, Tokyo, London and New York each have their own working day. The market tends to be calmer when only one of them is open, and busier when two overlap. The clock under Tools shows all four in your own time, and it adjusts by itself when Europe and the US change to winter time."],["The overlap","When London and New York are both open, more people trade at the same time, and prices often move further in those hours. That makes them good hours to watch and learn — and it also means a stop can be reached faster."],["The daily change","At 17:00 New York a new trading day starts. A position you hold past that moment pays or earns swap. Many brokers charge three days of swap on Wednesday, to cover the weekend. Check the swap for your instrument in MT5 before you keep a trade open overnight."],["News can beat the clock","A scheduled release, such as an interest-rate decision, can move a quiet hour more than a busy one. Look at the week's High events in the news calendar, and remember that its times are New York time."],["What this is not","Busy hours are not «good hours to trade». They are hours when more happens, in both directions. Knowing them helps you understand what you see — it does not tell you what to do."]]},"quiz":{"en":{"q":"London and New York are both open. What does that usually mean?","a":["Prices are sure to rise during those hours","More trading, often bigger moves both ways","The market is quiet and moves little"],"right":1,"why":"More trading at the same time often means bigger moves, in both directions. A stop can be reached faster too."}}},{"id":"gold","title":{"en":"Gold: what moves it"},"sub":{"en":"Four drivers, and why one move has many reasons"},"blocks":{"en":[["Why gold, here","The strategy described in this hub trades gold (XAU/USD), not a currency pair. Gold behaves differently from EUR/USD — in what moves it, in how big a move is, and in what it costs to hold."],["Four kinds of driver","The World Gold Council sorts what moves gold into four groups: economic expansion, risk and uncertainty, opportunity cost (for example interest rates and the dollar), and momentum (money flowing in or out, and how traders are positioned). Usually several of them pull at the same time."],["One month, several reasons","In September 2026 gold fell 8.5 %, to $4,176. In the same month the US 10-year interest rate rose by 0.53 percentage points and the dollar index rose 2 % — and yet about $10 billion flowed into gold funds (World Gold Council, 7 October 2026). A single headline rarely explains a move."],["Think in dollars, not pips","On gold, a $1 move in the price is about $100 for 1.00 lot and about $1 for 0.01 lot. Platforms and websites count «pips» and «points» on gold in different ways, so the same move can show up as very different numbers. The dollar amount is what reaches your account."],["Holding gold overnight","Gold has its own swap rate, separate from the currency pairs. Check the swap for XAU/USD in MT5 before you keep a gold trade open overnight, and check which day your broker charges three days."],["What this is not","Knowing the drivers helps you understand a move after it has happened. It does not tell you where gold goes next — nobody can promise that."]]},"quiz":{"en":{"q":"The gold price moves $1. Roughly what is that for 0.01 lot?","a":["$0.01","$1","$100"],"right":1,"why":"About $1 for 0.01 lot and about $100 for 1.00 lot. On gold, think in dollars, not pips."}}},{"id":"candle","title":{"en":"Reading a candlestick"},"sub":{"en":"Four prices in one shape"},"blocks":{"en":[["What one candlestick is","Each candlestick on a chart is one slice of time — one minute, one hour or one day, depending on the timeframe you choose. It shows four prices from that slice: where it opened, the highest, the lowest, and where it closed."],["Body and wicks","The thick part, the body, runs from the open to the close. The thin lines above and below, the wicks, reach to the highest and lowest price. A long wick means the price went that far and came back within the same slice of time."],["Colour","If the close is higher than the open, the candlestick is usually green or white; if it is lower, usually red or black. Platforms let you change the colours, so read the open and close rather than trusting the colour alone."],["The timeframe changes the picture","The same hour can look calm on a daily chart and wild on a one-minute chart. When two people talk about «the chart», first ask which timeframe they mean."],["Try it in MT5","Open any symbol in MT5, choose candlesticks as the chart type, and look at one candlestick's open, high, low and close — on a computer by pointing at it, on a phone with the crosshair. Switch between M1, H1 and D1 and watch how the same price moves look different."],["What this is not","A candlestick shows what has already happened. Names of candlestick «patterns» are everywhere online, but no single candlestick tells you what comes next — treat any such claim as something to test, not something to follow."]]},"quiz":{"en":{"q":"A long wick above a candlestick shows that…","a":["the price is sure to fall next","the price went that high and came back","the platform showed a wrong price"],"right":1,"why":"A candlestick shows what happened in its slice of time — not what comes next."}}},{"id":"corr","title":{"en":"Two trades can be one"},"sub":{"en":"Why spreading out is not always spreading risk"},"blocks":{"en":[["Two pairs, one bet","EUR/USD and GBP/USD are two different pairs, but both have the US dollar on the same side. From October 2025 to October 2026 they moved in the same direction on 210 of 251 trading days — about 84 % (US Federal Reserve data, via FRED)."],["What that means for your risk","If you buy both, you have not spread your risk — you have placed roughly the same bet twice, on the dollar falling. Two trades that each risk 2 % can behave like one trade that risks close to 4 %."],["Pairs that move apart","When the dollar sits on the other side of a pair, as in USD/JPY, that pair often moves the opposite way to EUR/USD. So buying EUR/USD and selling USD/JPY is also, in large part, the same bet twice."],["The links change","These are tendencies, not rules. They shift over months and can break on a single news day. A figure from last year describes last year."],["A simple habit","Before you open a second trade, ask which currency you are really betting on in each one. If it is the same currency twice, add up the risk as if it were one trade."],["What this is not","Correlation tells you how pairs have moved together. It does not tell you which way either of them goes next."]]},"quiz":{"en":{"q":"You buy EUR/USD and GBP/USD and risk 2 % on each. Roughly how much is at risk?","a":["About 2 %, because the risk is split","Close to 4 %, as they often move together","Nothing, because they cancel each other out"],"right":1,"why":"They moved the same way on 210 of 251 days in the past year. Often it is one bet placed twice."}}},{"id":"swap","title":{"en":"Swap: the cost of holding overnight"},"sub":{"en":"Why buying and selling can cost different amounts"},"blocks":{"en":[["What swap is","A position you keep open past 17:00 New York pays or earns swap for that night. It is an interest charge: holding a pair overnight means borrowing one currency and holding the other, and the broker adds its own margin on top."],["Buy and sell differ","The swap for buying and for selling the same instrument is usually not the same — one can be minus while the other is plus. The broker's own help centre listed XAU/USD at −42.14 points per night for buying and +21.92 for selling, and says «All the Swaps are shown in Points» (article dated 27 July 2024 — today's values can be different)."],["Three nights on one day","To cover the weekend, swap is charged three times on one weekday. Many brokers use Wednesday; check which day yours uses."],["Where you see it","In MT5, open the instrument's Specification to see «Swap long» and «Swap short». After the first night, the Swap column on your open trade shows what you actually paid or earned, in your account's own currency."],["Small numbers add up","A swap that looks small for one night can grow large over weeks, and on a small account it can eat a real share of the balance. Before you plan to hold a trade for days, multiply the nightly swap by the nights."],["What this is not","A plus swap is not free money. One normal price move can be far bigger than many nights of swap — the swap only tells you the cost or credit of waiting."]]},"quiz":{"en":{"q":"Where in MT5 can you see the swap for buying and for selling an instrument?","a":["In Specification: Swap long and Swap short","In the news calendar","Only by asking the broker"],"right":0,"why":"Specification shows both. After the first night, the Swap column on your open trade shows what you actually paid or earned."}}},{"id":"regime","title":{"en":"Three kinds of market"},"sub":{"en":"Up, down and sideways — and why one method doesn't fit all three"},"blocks":{"en":[["Three things price can do","Over a period, price can go up, go down, or move back and forth without getting anywhere. The same method can make money in one of these and lose in another."],["Uptrend and downtrend","In an uptrend, each new high is above the last one, and so is each low. In a downtrend, the highs and lows get lower each time. For scale: in September 2026 gold fell 8.5 %, according to the World Gold Council. A fall on its own is not a downtrend — the test is whether the highs and lows got lower."],["Sideways","When price moves between a ceiling and a floor without breaking out, it is called sideways, or a range. It looks calm, but methods that follow the trend often do poorly here."],["Why the method matters","A grid is orders placed at fixed steps above and below a price. Set up to catch a trend, it does best when price runs one way and does poorly when price chops back and forth. Set up for a sideways market it is the opposite: it gains while price swings, but can build an ever bigger losing position if price keeps running one way."],["The trap: buying more as it falls","Methods that buy more each time price falls lower the average entry price — but they also raise the amount at stake. If the fall continues, each further step down costs more than the one before. That is why such methods need a limit where they stop."],["See it yourself","Open the gold chart under «Tools» → «Market hours», pick the daily chart (1D) and look at the last 20 candlesticks. Are the highs rising, falling, or roughly level? You only see the answer afterwards — the market does not announce when it changes."],["What this is not","Naming the market describes what has happened. It does not say what happens tomorrow, and it is not a signal to buy or sell."]]},"quiz":{"en":{"q":"A method buys more gold every time the price falls $10. Which market is most dangerous for it?","a":["A market moving sideways","A fall that keeps going without turning","A calm uptrend"],"right":1,"why":"Each new buy puts more at stake. If price doesn't turn, the loss grows with every step — that is why such methods need a stop."}}}]},"amplify":{"items":{"en":[["What Sonic is, and the choice that is yours","Sonic is the strategy your account copies: its trades run in your account by themselves. It only runs amplified, on Amplify — there is no smaller version to start with. So the choice that protects you is the amount.\n\nPut in less if any of these is true: losing all of it would change your month; you have never watched a trade go against you; this is your first trading account.\n\nStart with an amount you could lose completely, and watch it for a few weeks. If you add money later, know that an upgrade restarts the 30-day clock on your deposit."],["Amplify: you trade a multiple of your deposit","Amplify is a funded account: you trade a multiple of what you put in, and it is real money. The broker's standard multiple is 12×; with the Aimpire token it is 24×.\n\nIn our own test, $109 became a trading balance of $2,616. The multiple works on losses exactly as it does on gains."],["When the account closes, in the platform's own words","«If the manager loses more than 10% of starting balance, your account will be liquidated.»\n\nWith the token, the form adds: «By using a token code, your Amplify account draw down limit will change to 5% of your starting balance.»\n\nIn money: your $109 trades as $2,616. A fall of 1 ÷ 24 = 4.2 % in that balance equals your whole $109 — before the 5 % line is even reached. The line is a hard trigger: the account closes by itself, with no waiting for prices to come back. That is why the amount matters most."],["The Aimpire token: #Aitech, then 000000","The community token field is where Aimpire's token goes. Type #Aitech, press Verify, then enter 000000 in the Hash field that appears. Without a valid token the account opens at 12× with the 10 % line, instead of 24× with the 5 % line. Check that the tick shows before you press Copy Now."],["What the platform says about who is responsible","Before you can submit, you tick a box that says trades on CopyX are provided by traders unaffiliated with Tag Markets, and that Tag Markets bears no responsibility or liability for the trades or their outcomes. Read it before you tick it. It means the broker holding your money is not answerable for what the strategy does with it."],["What you keep when it makes money","The presentation gives the split as 70 / 5 / 25, marked «per trade»: 70 % of the profit to you, 5 % to the developers who run the system, 25 % to what it calls «the team» — «How the bonus model is drawn» shows that part. On the Sonic card it shows as a 30 % performance fee, with no management fee and no joining fee.\n\nSo $100 of profit is about $70 to you — less if the fee is taken on each winning trade rather than on the net result. The card says «Schedule 1 Week» but does not say whether the fee is worked out on each trade or on the week's net result. Ask your sponsor.\n\nPublished results, Myfxbook included, show the strategy's own account. The 30 % fee is charged to followers, so it is not taken out of those curves."],["The rules, from the broker's own help centre","You can withdraw profits at any time, any hour, any day; the broker says the payout then takes 1–3 working days.\n\nYour original deposit can only be taken out 30 days after your first trade — not 30 days after you paid in — and taking it out closes the account immediately. Upgrading the account starts that 30-day clock again.\n\nThere is no daily loss limit, only the 10 % line (5 % with the community token), and you may hold as many of these accounts as you want."],["Commission and leverage, measured on your own money","Commission on an amplified account is $10 per lot on forex and metals, charged when the trade closes. For indices and crypto the broker's own help articles give two different answers: one says $10 per lot on everything, another says $1 on indices and nothing on crypto.\n\nThe form shows leverage 1:30, but it applies to the multiplied balance. Measured against your own deposit, 24 × 30 = 720:1 — more than the 1:500 of a standard account, not less. At 12× it is 360:1."]]},"compare":{"cols":["12×","24×"],"en":{"title":"12× or 24× — the same $100","rows":[["Trades as","$1,200","$2,400"],["The account closes after a loss of","10 %","5 %"],["A fall that takes your whole $100","8.3 %","4.2 %"],["Token","None","#Aitech + 000000"]],"note":"Gains are 12 or 24 times larger too. The record's deepest dip, 0.86 %, would have been about 10 % or 21 % of your deposit."}}},"ib":{"en":{"lede":"This part is optional. You can open an account, let Sonic run, and never introduce a single person. Nothing on the platform requires it. It is here because people ask how it works, and because half-explained money is how communities go wrong.","blocks":[["What an IB actually is","The broker already charges a spread and a commission on every trade, whether you introduced anyone or not. An Introducing Broker gets a share of what the broker earns. That is the usual mechanism across the industry, and it is not a separate fee on the person you introduced. On Sonic there is one more thing to know: part of what the people above you earn comes from the member's own 30 % performance fee. The fee is the same either way, but it is the member who pays it."],["Why the levels are locked","The plan has ten generations. They start locked. Your IB Portal shows two lines that decide everything: «# of Directs with active Trading account» and «Generations unlocked». Generations open only when your directs — the people you introduced yourself — have active trading accounts. Until then, the level-based streams pay nothing on the locked levels. How they open, according to the Tag Markets presentation other teams use: you need at least $250 in trading yourself, which opens the first three levels. Levels four to ten open as up to ten people you introduced directly each have $250 in trading. The portal does not show the rate per level.","lock"],["Two programmes: international and Europe","AiTech's own presentation of 3 October 2026 shows two versions of the programme. The international one, for members outside Europe, pays on ten levels: 2.5 % of each trade's profit per level, and per lot $2.00, $1.50, $1.00, $1.00 and then $0.50 on levels five to ten — up to $8.50 per lot in all. The European one pays on one level only: 2.5 % that can rise to 22.5 % with volume, $2.00 per lot that can rise to $6.50, and a general bonus of $2.00 per lot plus a bonus payment. In the CopyX app that general bonus has steps at $10,000, $50,000, $200,000 and $500,000 of team volume.\n\nThe broker's own help centre documents a third table for its amplified accounts — $3.00, $1.20 and $0.60 on three levels. That table may belong to Tag Markets' own partner plan rather than AiTech's. The same help centre says a trade only counts for commission if it stays open for at least 3 minutes.","ladder"],["How the bonus model is drawn","The presentation draws it in five parts. First the split of every trade's profit: 70 % stays with the member, 5 % goes to the developers, and 25 % is shared ten levels down in the structure — the 2.5 % per level above. Then the per-lot commission, the leader pools with an ambassador rate of $2.00 per lot, «CPA» on the new money deposited in your network, and incentives.\n\nFor CPA and the pools the presentation and the portal show how much volume each step needs — see «The nine streams, by name». When each of the ten levels opens depends on your directs, as «The lock nobody explains» describes. Ask your sponsor to show you your own figures in the IB Portal before you count on any of it. The presentation marks the programme «subject to local restrictions» and «only available to professional Influencer»."],["A worked example with real sizes","Suppose twenty members each put in $100. At 24× each trades as $2,400. Copying the strategy's own volume — about 4.5 lots a month on about $130,000 — twenty such accounts trade about 1.7 lots a month between them. At $2.00 per lot on the first level, that is about $3.30 a month, and only once that level is open.\n\nThe volume comes from the strategy and from how much your members put in, not from anything you control. Run the number for your own team, not the one in someone's screenshot."],["The formula, so you can put your own numbers in","monthly rebate ≈ members × trades each × lots per trade × rate per lot. Every part after the ≈ sign is yours to check: the lot size depends on your leverage, and the rate depends on which programme your agreement is under. Put in your own numbers and the answer is yours, not someone else's claim."],["The nine streams, by name","So you recognise them in the portal rather than in a chat message: Lot Commissions, Profit Share, CPA Earnings, Leader Pool 1 and 2, Sonic Pool, Profit Pool, NeoFX Pool and Super Sonic Bonus. «CPA Earnings» is not paid per person. It is a monthly percentage of the new money your whole team deposits — from 1 % at $10,000 to 7.5 % at $100,000,000 — counted after a «50% rule», so no more than half may come from your strongest line, and paid as the difference to anyone below you who qualifies too. One overview slide in the presentation calls it a payment per qualified registration; the portal and the presentation's own table show it as a percentage of deposits. Leader Pool 1 starts at $500,000 of team volume, Leader Pool 2 at $1,000,000. Payouts are made in USDT."],["What is not promised","No income is guaranteed and it can be zero. Everything above depends on other people depositing and trading, which depends on them choosing to, which you do not control. Treat it as a share of activity that may happen, not as a plan."],["Your own link — before you register","Is this the right person? If you are the one inviting others, sign up from your own link instead — not from someone else's. Once your account is created, it cannot be moved.","ledere"]],"unverified":"These are the programme's published rates, not what you will be paid. What you actually earn shows in your own IB Portal — check it there before you repeat a number to anyone.","lock_cap":"Ten generations. Zero open until directs with active accounts unlock them.","ladder_cap":"AiTech, international: $2.00 · $1.50 · $1.00 · $1.00, then $0.50 on levels 5–10 — up to $8.50 per lot"}},"menu":{"en":{"lede":"Pick the part you need now — the rest stays here.","back":"All sections","items":[["earn","Sonic","The strategy that trades for you — record, calculator and withdrawals."],["start","Get set up","From link to account — ten short steps."],["ib","Invite friends — get commission","When people you invite trade, you get commission — plus bonuses and campaigns. See exactly how it works and what it takes."],["tools","Tools","Market clock, risk, journal and apps."],["learn","Academy","Pips, lots and candlesticks — made simple."],["chat","The group in Element X","Ask and learn together with the others."],["calc","Try your amount","What the history would have given you."],["faq","Questions & answers","What everyone asks — with search."]],"wotd":"Word of the day","wotd_more":"Read more","badge":"Academy complete — great work! 🏅","tabs":["Home","Start","Products","Academy","Tools"],"more":"More"}},"share":{"label":{"en":"Recommend to a friend"},"text":{"en":"I'm learning trading with Aimpire — step by step, in your own language. Have a look: {LINK}\n(Open it in Chrome or Safari, not inside the app.)"},"hint":{"en":"Know someone who wants to learn trading? Share Aimpire — it takes ten seconds."},"item":{"en":{"btn":"Send to a friend","msg":"“{T}”, explained short and simple: {LINK}"}}},"search":{"ph":{"en":"Search the whole guide…"},"none":{"en":"Nothing found — try another word, or ask in ❓ Questions."},"close":{"en":"Close"},"answer":{"en":"Answer"},"popular":{"en":"What people ask"},"more":{"en":"Read it all"},"related":{"en":"Related"},"didyou":{"en":"Did you mean"},"recent":{"en":"Your recent searches"}},"install":{"title":{"en":"Turn Aimpire into an app"},"body":{"en":"Add it to your home screen — then it opens with one tap, and you never need the link again."},"button":{"en":"Add to home screen"},"how":{"en":"How"},"ios":{"en":"iPhone: 1) Tap the Share icon ⎙ (bottom of Safari). 2) Choose «Add to Home Screen». Done — the icon is now on your phone."},"android":{"en":"Chrome: tap ⋮ at the top, then «Add to Home screen»."},"inapp":{"en":"Opened inside WhatsApp or Element? Tap ⋮ and choose «Open in Chrome» (or Safari) first."},"open_chrome":{"en":"Open in Chrome"},"later":{"en":"Not now"},"inapp_bar":{"en":"You opened Aimpire inside {APP}. Open it in your browser so it remembers your sponsor and your progress."},"inapp_any":{"en":"an app"},"inapp_ios":{"en":"Tap ⋯ or ••• at the top, then «Open in browser»."}},"apps_page":{"list":[{"key":"mt5","name":"MetaTrader 5","android":"https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5","ios":"https://apps.apple.com/app/metatrader-5/id413251709","icon":"assets/app-mt5.jpg"},{"key":"element","name":"Element X","android":"https://play.google.com/store/apps/details?id=io.element.android.x","ios":"https://apps.apple.com/app/element-x/id1631335820","join":"https://matrix.to/#/%23aimpire:matrix.org","icon":"assets/app-element.jpg"}],"en":{"lede":"Two apps, both free. You can install them now — the guide tells you when you need each one.","mt5":"Shows your account and every trade Sonic opens for you. You log in with the details from step 9.","element":"The chat app the Aimpire group uses. Install it before you press the join link in step 10 — the link opens inside the app.","browser":"Tag Markets and CopyX run in your browser. There is no app to install for them.","warn":"Install only from Google Play or the App Store, through these links. If anyone sends you an app file or a «Tag Markets app», do not install it — fake apps are a common way people lose their login and their money.","join_note":"Installed it? Then join:","join":"Join the Aimpire group"}},"faq":{"en":{"lede":"Short answers to what people ask. Search, or tap a question.","search":"Search the questions","none":"No question matches that. Ask in the Aimpire group — someone has usually wondered the same.","items":[["Is this a scam?","It is a fair question, and you should ask it about anything involving money.\n\nWhat you can check yourself: your money sits with the broker, never with Aimpire or your sponsor; profit can be withdrawn whenever you ask; and the rules on this page are quoted from the broker's and the platform's own pages.\n\nSo put in only what you can afford to lose completely. Nobody can promise you that the strategy keeps making money.\n\nCheck for yourself: look at the history on Myfxbook (under Sonic → Record), and withdraw a small amount early — then you know withdrawals work before you put in more."],["Is it halal?","That is for you to decide — scholars see trading differently. Here is how it works in practice:\n\n⏱️ A trade lasts about 4 hours on average — Sonic trades within the day.\n🚫 The strategy account shows $0 in interest (swap) on Myfxbook.\n🕌 The broker also has an Islamic account type, without swap.\n🧾 There are small fees, like commission per lot. Those are fees, not interest."],["Who holds my money?","The broker, Tag Markets — not Aimpire and not your sponsor. Never send money to a person, and only deposit from inside your own portal."],["How much do I need to start?","The minimum is $10, both for the deposit and for connecting Sonic. Start with an amount you could lose completely, and watch it for a few weeks before you decide on more. Note: $10 has to arrive after the fees, so send a little more."],["Is this allowed in my country?","Rules differ between countries and change, so check your own before you deposit — we cannot give legal advice. Two separate things matter.\n\nThe broker's own list: the broker publishes an up-to-date list on its own website of where it operates. That list can change, so read it at the source before you register — don't rely on anyone's summary, including ours.\n\nYour own country's rules: these are about you, not the broker. Check what your central bank or financial regulator says about sending money abroad for trading, and ask your bank if you are unsure. In Pakistan this is covered by the State Bank's EPD Circular Letter No. 08 of 2022 — read it before you deposit. The broker's list says nothing about that."],["Which apps do I need?","Two, both free: MetaTrader 5 to see your account, and Element X for the Aimpire group. Install them from the official stores only. Tag Markets and CopyX run in your browser."],["How long does approval take?","The broker says verification «just takes a few minutes», with delays when demand is high or documents are incomplete. You need an ID document and a face scan. If it is rejected, the reason comes by email from SumSub. Use any waiting time for step 6, the apps."],["What does 24× mean for me?","With the Aimpire token your money trades 24 times larger: in our own test, $109 became a trading balance of $2,616. Gains and losses are both 24 times larger. A fall of 4.2 % in that balance is your whole deposit, and the account closes at 5 %."],["What does it cost?","The Sonic strategy takes a 30 % performance fee on profit, so you keep about 70 % of the profit — the Amplify section explains why it can be less. There is no management fee and no joining fee. On Amplify accounts the broker also charges $10 per lot in commission on forex and metals. Then there are the costs any trade has: the spread, swap on positions held overnight, and network fees when you deposit or withdraw crypto."],["Can I withdraw my money?","Profits: yes, you can withdraw them at any time, any day. Your deposit: only 30 days after your first trade, and taking it out closes the account immediately. An upgrade starts those 30 days again. The broker says payouts take 1–3 working days. The steps are under «Sonic» → «Withdrawals»."],["Can I reinvest my profit?","Yes. In CopyX open Follower Hub, then Strategies, press Reinvest on the strategy, enter the amount and press Upgrade. Know this first: the broker says an upgrade restarts the 30 days before your deposit can be taken out."],["Is there a daily loss limit?","No daily limit. There is one total limit: 10 % of the starting balance, or 5 % with the Aimpire token. Reach it and the account is closed automatically."],["Is the profit guaranteed?","No. Nothing here is guaranteed. Published results — Myfxbook included — are past results from the strategy's own account, without the fee you pay — not a forecast."],["How do I know the token worked?","Look at the balance in MetaTrader 5: with the token it is 24 times what you put in. If it is not, stop and ask your sponsor before you do anything else."],["Someone says I need eCredits, or must send crypto, to get 24×.","Not through Aimpire. Our token is #Aitech with the code 000000, and you send nothing for it. The platform also has an «#eCredits» route: there you send as many eCredits as you invest to a wallet address, so $100 means 100 eCredits on top of your deposit.\n\nIf anyone asks you to send money or crypto anywhere other than your own deposit page, stop and ask your sponsor."],["Can I have more than one account?","Yes. The broker says you may hold as many as you want, as long as each one follows the rules."],["My deposit has not arrived.","Check the transaction in your own wallet first — the portal cannot show money that never reached it. Your wallet's own estimate can say up to 24 hours. After that, send your sponsor the transaction ID, never a screenshot of your login."],["I chose the wrong network.","A wrong network can mean the money never arrives — wallets warn of «permanent loss of funds». Contact your wallet's own support with the transaction ID straight away. Nobody in Aimpire can reverse a crypto transfer."],["Someone says they are support and asks for my password.","Do not give it — not to support, not to a leader, not to anyone. Aimpire will never ask for it. If someone needs to see your results, give them the Investor Password: it can only look, not trade."],["I forgot my password.","The broker has its own guide for changing it, under «Get set up» → «Guides that already exist». Never ask anyone in a chat to reset it for you."],["Do I have to invite other people?","No. You can open an account, let Sonic run and never introduce anyone. Earning as an introducing broker is optional, and nothing on the platform requires it."],["How do I get a statement for my taxes?","The MetaTrader 5 terminal on a Windows computer can export it: open the History tab at the bottom, right-click, choose Export and save it as HTML, then print that to PDF. Keep the receipts for every deposit and withdrawal too. The rules depend on your country, and we cannot give tax advice."],["Where do I get help?","First this page. Then your sponsor — the person who invited you — for anything about your account. If money does not arrive or something seems wrong, your sponsor takes it further. And ask in the Aimpire group: someone has usually had the same question."],["When does the market move the most?","Around scheduled news. The economic calendar marks each release with an expected impact, and the strongest — like interest-rate decisions — are marked High. The minutes around a High release can move prices fast, in both directions, and spreads often widen. Many wait out about 15 minutes on each side of a High release before judging anything. Note: the calendar feed shows New York time, so convert it to your own clock. You find the calendar under Tools."],["I see an old version of the page","If a button at the top says a new version is ready, tap it. Otherwise close every Aimpire tab in your browser and open the link again from your sponsor's message. Still the old page? Reload it once — on a phone, pull the page down. As a last check you can open the link in a private window (Chrome: Incognito, Safari: Private), but a private window forgets your sponsor and your progress when you close it."]]}},"withdraw":{"en":{"lede":"Profit can come out any time; the deposit only 30 days after your first trade, and taking it out closes the account. The path has three parts, and the middle one is only needed the first time. Do it once early, with a small amount, so you know it works before you rely on it.","parts":[["From Amplify to your Tag wallet","On the Dashboard, open AMPLIFY. Profit you can take out is shown under AVAILABLE. Press WITHDRAW, enter the amount, press WITHDRAW again, then CONTINUE. The back office reviews it, so it can take a while to appear in your Tag Markets Wallet — refresh the page."],["First time only: add your own wallet","Open TAG WALLET → YOUR CRYPTO WALLETS → ADD A CRYPTO WALLET. Fill in the owner's name, choose CRYPTO, add your billing details and the address of your own wallet, enter your dashboard password and press SUBMIT CRYPTO WALLET. It shows PENDING VALIDATION — usually 5 to 45 minutes, up to 24 hours."],["From your Tag wallet to your own wallet","TAG WALLET → WITHDRAWALS. Enter the amount and press SUBMIT REQUEST, tick the box, press «Your attention is required. Please click here», enter the wallet you verified, and choose CRYPTOCHILL — without it the withdrawal is not processed and you have to start again. Check the details and press WITHDRAW."]],"facts":"The broker's minimum withdrawal is $10 on Ethereum (ETH), BNB (BSC) and Bitcoin (BTC), and $50 on Tron (TRX). A network fee is deducted, and it depends on the network — so what arrives is roughly the amount minus the network fee. The broker says Amplify payouts take 1–3 working days, and crypto withdrawals 2–24 hours for amounts up to $999, up to 48 hours for amounts up to $4,999, and up to 72 hours above that. Profit in CopyX can also be taken out from Follower Hub, Strategies, Withdraw; it then lands in your Tag Markets wallet. Withdrawals go back first to the method you deposited with, newest deposit first — if you deposited by card, the withdrawal goes to the card first."}},"results":{"source":"https://www.myfxbook.com/members/SonicExperts/sonic-ai/12076857","months":[["2024-11",1.12,0.13],["2024-12",1.18,0.15],["2025-01",1.23,0.17],["2025-02",1.25,0.1],["2025-03",1.06,0.21],["2025-04",1.26,0.81],["2025-05",1.78,0.6],["2025-06",1.18,0.71],["2025-07",1.45,0.5],["2025-08",1.61,0.42],["2025-09",1.63,0.15],["2025-10",1.17,0.0],["2025-11",0.91,0.03],["2025-12",1.16,0.0],["2026-01",0.61,0.0],["2026-02",0.55,0.03],["2026-03",0.8,0.0],["2026-04",1.26,0.0],["2026-05",1.09,0.0],["2026-06",1.06,0.01],["2026-07",1.17,0.02],["2026-08",0.88,0.0],["2026-09",1.04,0.0],["2026-10",0.42,0.01]],"stats":["+30.58 %","+1.13 %","−0.86 %","634","82–83 %"],"en":{"lede":"From the strategy's own Myfxbook record — a standard Tag Markets account at 1:500 — from 3 November 2024 to 14 October 2026. Each bar is one month's gain; the mark below it is that month's largest dip. The 30 % fee you pay is not taken out of these figures. Past results, not a forecast.","stats":["In total","Average month","Largest dip","Trades","Win rate"],"legend":["gain","largest dip"],"notes":["No losing month in 24 — which also means this record has not yet been tested by one.","Losing days happen: 49 of the 427 daily readings. The worst, −0.64 % on 3 June 2025, is about −15 % of your deposit in one day at 24×; the deepest dip, −0.86 %, about −21 %.","The average loss ($134.97) is bigger than the average win ($93.37). The high win rate carries the result, so a run of losses costs more than a run of wins earns.","The account closes at 5 %. The record's deepest dip, 0.86 %, is about a sixth of that distance.","Dips here are measured on each day's closing balance; inside a day they can go deeper. The record has gaps — the longest is 20 August to 12 September 2025 — and each counts as a single reading.","The strategy card inside CopyX labels 0.26 % as «Max DD». A slide in AiTech's presentation calls 0.26 % the average drawdown and 0.86 % the deepest. Myfxbook's deepest is 0.86 %, and that is the one we use."],"formula":"Effect on your deposit = the account's fall in % × 24.","link":"Check it yourself on Myfxbook","read":"Figures read on 15 October 2026.","table":"Show the numbers","method_t":"How these numbers are measured"},"method_from":4},"calculator":{"live":true,"multiple":24,"wipe":4.2,"worst_day":0.64,"periods":[6,12,23],"en":{"lede":"Enter an amount. This shows what the record would have left you, after all costs — the past applied to your money, not a forecast.","amount":"Amount you put in ($)","period":"Period","periods":["Last 6 months","Last 12 months","All 23 full months"],"total":"What you would have kept, over the period","months":"Your best and worst month","risk":"The same 24× on the way down","risks":["A fall of 4.2 % in the trading balance takes all {A}; the account closes at 5 %.","The record's worst day (−0.64 %) would have cost {D} of your {A} in one day.","The record has no losing month, so this calculator cannot show you one. That is exactly why it is not a forecast."],"method":"Method: each month = amount × 24 × (that month's gain − commission − fee). The commission is estimated from the lots Myfxbook shows, on a $130,000 account; if the strategy account already pays the same commission, the real cost is lower. Small amounts cannot copy exactly: at about 0.17 lot per trade on $130,000, a deposit below roughly $330 at 24× would need trades smaller than 0.01 lot, the usual minimum. How CopyX handles that is not published.","disclaimer":"Past results applied to your amount — not a guarantee, not advice. Only put in what you could lose completely.","rows":["Before costs","Commission, $10 per lot","Performance fee, 30 %","What you keep"],"range":"Two numbers, because nobody publishes how the 30 % is settled. Taken weekly on the net result, you keep the higher one. Taken on every winning day, you keep the lower one. Per trade, it could be lower still.","how":"How this is worked out","periods_short":["6 months","12 months","All 23"],"best":"Best month","worst":"Worst month","avg":"Monthly average","of_dep":"{p} on {A}","share":{"link":"Share the numbers","img":"Save as image","hint":"Send it as a link or an image. Whoever opens it sees the same numbers, costs and warnings.","msg":"How much of {A} would have been left in Sonic after all costs, with the warnings: {LINK}","copied":"Link copied","card_amt":"Starting amount","card_k":"Kept after all costs","card_note":"Past results applied to an amount. Not a promise, not advice. You can lose everything you put in.","saved":"Image saved"}},"costs":[["2024-11",1.12,0.011,0.359,0.421],["2024-12",1.177,0.016,0.257,0.485],["2025-01",1.232,0.021,0.462,0.467],["2025-02",1.246,0.022,0.372,0.438],["2025-03",1.059,0.038,0.279,0.484],["2025-04",1.255,0.04,0.424,0.936],["2025-05",1.78,0.037,0.74,0.882],["2025-06",1.181,0.055,0.68,1.141],["2025-07",1.448,0.061,0.384,0.904],["2025-08",1.606,0.042,0.606,0.711],["2025-09",1.633,0.107,0.463,0.532],["2025-10",1.166,0.04,0.419,0.348],["2025-11",0.905,0.016,0.271,0.281],["2025-12",1.159,0.027,0.334,0.346],["2026-01",0.611,0.015,0.195,0.183],["2026-02",0.549,0.029,0.164,0.174],["2026-03",0.802,0.043,0.205,0.24],["2026-04",1.263,0.038,0.343,0.377],["2026-05",1.094,0.037,0.395,0.326],["2026-06",1.058,0.025,0.285,0.318],["2026-07",1.166,0.029,0.379,0.355],["2026-08",0.878,0.024,0.251,0.262],["2026-09",1.041,0.024,0.279,0.311]],"balance_assumed":130000},"bonuses":{"en":{"lede":"Most of these need a team volume very few people ever reach — they are here as information, not as a goal. Each card shows what the programme offers and what it asks of you.","labels":["What you get","What it takes"],"items":[["Profit sharing","2.5 % of each trade's profit, on each of ten levels. Paid weekly, in USDT.","At least $250 in trading yourself, which opens the first three levels. Levels four to ten open as people you introduced directly each have $250 in trading — up to ten of them. This rule is from a presentation other teams use; the portal itself only shows directs and unlocked levels."],["Lot commission","Per lot traded: $2.00, $1.50, $1.00, $1.00, then $0.50 on levels five to ten — up to $8.50 per lot. Paid weekly.","The same open levels as profit sharing. The broker's help centre adds that a trade only counts for commission if it stays open for at least 3 minutes."],["CPA Earnings","A monthly percentage of the new money deposited in your network: 1 %, 2 %, 3.5 %, 5 %, and on up to 7.5 %.","$10,000 of new deposits in a month for 1 % (from your direct level), then $50,000, $200,000 and $1,000,000, up to $100,000,000 for 7.5 %. Counted after the 50 % rule, and paid as the difference to anyone below you who qualifies too."],["Leader Pool 1","A share of a monthly pool. The presentation gives an ambassador rate of $2.00 per lot.","$500,000 of team volume in a month after the 50 % rule — no more than $250,000 of it from your strongest line."],["Leader Pool 2","A share of a second monthly pool.","$1,000,000 of team volume in a month after the 50 % rule — no more than $500,000 per share from your strongest line."],["General bonus (European programme)","$2.00 per lot plus a bonus payment.","Steps at $10,000, $50,000, $200,000 and $500,000 of team volume, after the 50 % rule. Shown in the CopyX app."],["October prize draw (Sonic Referral Challenge)","Prizes of $10,000 each, drawn from tickets.","One ticket for every 2 new people you introduce directly in October who each reach at least $250. No cap on tickets."],["Travel voucher","A $2,000 travel voucher or the same in USDT, once a year.","$50,000 of new monthly active balance in your whole network, three months in a row, not counting your directs' own deposits. The portal adds «50/50» without explaining it — most likely the same 50 % rule as above, so no more than half from your strongest line. Ask your sponsor to confirm."],["Watch award (Leader Pool 1)","A luxury watch worth up to $15,000.","Qualify for Leader Pool 1 two months in a row."],["Watch award (Leader Pool 2)","A luxury watch worth up to $25,000.","Qualify for Leader Pool 2 two months in a row."],["Home award (Leader Pool 2)","A home worth up to $1,200,000.","Qualify for Leader Pool 2 with at least three shares of $1,000,000 each, six months in a row."],["Sonic Pool, Profit Pool, NeoFX Pool, Super Sonic Bonus","Listed by name in the IB Portal.","Their conditions are not shown in the portal or the presentation. Ask your sponsor before you count on any of them."]],"note":"Cash payouts are made in USDT, only to accounts that qualify, and the programme is marked «subject to local restrictions». The international programme applies outside Europe. None of this is income you can count on. Figures from AiTech's presentation of 3 October 2026, the IB Portal and the CopyX app, read on 15 October 2026; the rule for opening levels comes from a presentation other teams use."}},"p2p":{"video":"https://youtu.be/P3C9WztzEas"},"jump":{"en":{"results":"Track record","calc":"Calculator","withdraw":"Withdrawals","ib":"IB & bonuses","sonic":"Sonic","hours":"Market hours","sizing":"Size & risk","journal":"Journal","toolkit":"Links & apps"}},"ui_labels":{"labels":["Sign Up","Register to CopyX","CopyX Registration","Login to CopyX","Deposit","Details","Connect","Verify","Submit","Copy Now","Continue","WITHDRAW","CONTINUE","SUBMIT REQUEST","Withdraw","Express","Paid","Community Token","Hash","MT5 Credentials","Master Password","Investor Password","Balance","Equity","Free Margin","AVAILABLE","TAG WALLET","WITHDRAWALS","Pending","Validate","Follower Hub","Strategies","Dashboard","Reinvest","YOUR CRYPTO WALLETS"],"gloss":{}},"alt_compare":{"en":{"title":"Bank, fund or Sonic — side by side","lede":"The same questions for three places to keep money. Sonic's record shows the highest return of the three and no losing month in its 24 months — but a record that short is no promise, and Sonic is the only one of the three where you can lose everything.","cols":["Bank savings","Index fund","Sonic"],"rows":[["What you can lose","Nothing, up to the guarantee ¹","It fell 57 % in 2007–09 ²","All of it"],["Return so far","Follows the central bank rate ¹","9 % a year since 1987; 13.4 % over 10 years ²","About 14.7 % a year (+30.6 % in total) ³"],["Length of the record","Decades","38 years","Under 2 years"],["Getting money out","Any time","A few days","Profit in 1–3 working days; deposit 30 days after your first trade, and it closes the account"],["Costs","Usually none","A yearly fund fee","30 % of profit + $10 per lot + spread"],["Suits money you","need soon","can leave for years","could lose completely"]],"notes":["¹ Bank deposits are guaranteed up to NOK 2 million per person per bank in Norway, and up to PKR 1,000,000 in Pakistan. Savings rates follow the central bank rate: 4.50 % in Norway (Norges Bank, 23 September 2026) and 11.5 % in Pakistan (State Bank of Pakistan, 14 September 2026).","² MSCI World index, in US dollars, before fund fees: 9.02 % a year from December 1987 to September 2026, and 13.37 % a year over the last 10 years. Its largest fall was 57.46 %, from October 2007 to March 2009.","³ The strategy's own Myfxbook account at 1:500, 3 November 2024 to 14 October 2026, before the 30 % fee and the $10-per-lot commission. Your own account is on Amplify, where gains and losses are 24 times larger — the calculator shows what that means for your amount."],"disclaimer":"This compares published figures. It is not financial advice and not a recommendation, and past results are no guarantee of future results. Figures are in US dollars; exchange rates can raise or lower them in your currency. Tag Markets states that 80 % of retail investor accounts incur losses."}},"leader_signup":{"_readme":"Founders Google-skjema og publiserte liste over godkjente (B-016). Skjemaet tar imot soeknaden; arket «Aimpire – ledere (godkjenn her)» er der founder huker av «Approved». Tomt form-felt = lederverktoeyet faller tilbake til ledere.txt-linja.","form":"https://docs.google.com/forms/d/e/1FAIpQLSew3TQFfh54TazjiF2S5UHsNquzUuDvRSS3jK-IKRO8CNw25g/formResponse","name_field":"entry.1588080115","link_field":"entry.1299161573","approved_csv":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQCUbvpu8cXdh-V-XkfvqAevZlabu876V-j8HNNd_qJGDOpPhbwVukJa--Vum5QWLuyQwEQM9Y5gMSc/pub?gid=2115650304&single=true&output=csv","mail_field":"entry.1642551334","lang_field":"entry.1056248770","sponsor_field":"entry.2086565291","list_field":"entry.1871979288","langs_field":"entry.828440085","country_field":"entry.1205341809","list_csv":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQCUbvpu8cXdh-V-XkfvqAevZlabu876V-j8HNNd_qJGDOpPhbwVukJa--Vum5QWLuyQwEQM9Y5gMSc/pub?gid=701578159&single=true&output=csv","names_csv":"https://docs.google.com/spreadsheets/d/e/2PACX-1vQCUbvpu8cXdh-V-XkfvqAevZlabu876V-j8HNNd_qJGDOpPhbwVukJa--Vum5QWLuyQwEQM9Y5gMSc/pub?gid=22159740&single=true&output=csv","linkname_field":"entry.699427348","social_fields":{"element":"entry.7880601","whatsapp":"entry.91318364","instagram":"entry.1874927608","tiktok":"entry.1424645354","snapchat":"entry.2134073042"}},"canonical":"https://aimpire.github.io/","analytics":{"_readme":"Cloudflare Web Analytics: ingen cookies, ingen IP lagret. Lim inn token fra dash.cloudflare.com -> Web Analytics -> Add site. Tomt = ingen maaling, ingen skript lastes.","cf_token":""},"sessions":{"hours":[["sydney","Australia/Sydney",7,16,"#15D8C4"],["tokyo","Asia/Tokyo",9,18,"#C21FBF"],["london","Europe/London",8,17,"#1B4FD8"],["newyork","America/New_York",8,17,"#E3B505"]],"en":{"title":"Market hours in your time","lede":"The currency market runs in four big sessions. These are their usual hours, shown in your phone's own time.","open":"Open","closed":"Closed","closes_in":"closes in {T}","opens_in":"opens in {T}","hm":"{H} h {M} min","overlap":"London and New York overlap {A}–{B} your time — usually the most active hours of the day.","rollover":"A new trading day starts at 17:00 New York, which is {A} your time. Positions held past it pay or earn swap.","weekend":"The currency market is closed for the weekend. It opens again at 17:00 New York on Sunday — {A} your time.","note":"These hours are a convention, not a rule. Gold and other instruments can follow their own hours — check Specification in MT5.","cities":{"sydney":"Sydney","tokyo":"Tokyo","london":"London","newyork":"New York"},"asleep":"Asleep","now_open":"🟢 Open now: {L}","now_asleep":"😴 Asleep: {L}","now_none":"😴 All four sessions are asleep right now.","now_weekend":"😴 Weekend — all four sessions are asleep.","local":"{T} there","you":"Your time: {T} · {Z}","mk":"Markets now","news_t":"Next big news","news_in":"in {T}","news_none":"No more big news this week.","news_tip":"Prices can jump around news like this. Many traders take extra care 15 minutes before and after.","news_share":{"btn":"Share this week's big news","title":"Big news this week","tz":"Times in {Z}","tip":"Around big news, the price can move fast both ways. Many traders don't trade from 15 minutes before the news until 15 minutes after.","msg":"This week's big news for currencies and gold, with times: {LINK}","saved":"Image saved"}}},"possize":{"inst":[["eurusd","EUR/USD",10,"pip"],["gbpusd","GBP/USD",10,"pip"],["audusd","AUD/USD",10,"pip"],["xauusd","XAU/USD",100,"usd"]],"en":{"title":"Position size calculator","lede":"How big a trade is when you decide in advance how much you are willing to lose. Arithmetic, not advice.","bal":"Account balance ($)","risk":"Risk per trade (%)","inst":"Instrument","stop_p":"Stop distance (pips)","stop_d":"Stop distance (gold price, $)","r_usd":"You risk","lots":"Size","floor":"Below the smallest size (0.01). Even 0.01 lot would risk {X} here — {P} of your account.","check":"Contract sizes differ between brokers. Check Specification in MT5 before you trade.","formula":"lots = risk in $ ÷ (stop × value of 1.00 lot), rounded down to 0.01","gold":"Gold"}},"streaks":{"en":{"title":"Losing streaks — try it yourself","lede":"Even a sound method has long runs of losses. Pick the numbers and see 1,000 random runs of 100 trades each. This is a dice game, not a forecast.","win":"Win rate (%)","rr":"Win size compared with loss size (×)","risk":"Risk per trade (%)","run":"Run again","streak":"Longest losing streak (typical)","dd50":"Runs that fell 50 % below the start","end_below":"Runs that ended below the start","note":"Each trade here is a coin with your win rate — real trades are not that tidy. The point is the shape: losing streaks are normal, and the risk per trade decides whether you get through them.","median":"Middle line (median)"}},"journal":{"en":{"title":"Trading journal","lede":"Write down each trade: what, why, and what happened. It is stored only on this phone — nobody else can see it.","inst":"Instrument","dir":"Direction","buy":"Buy","sell":"Sell","lots":"Size (lot)","res":"Result ($, minus for a loss)","note":"Why did you enter, and what did you learn?","add":"Save trade","empty":"No trades yet.","count":"{N} trades · {W} won · {L} lost","total":"Total result","export":"Download as CSV","clear":"Delete all","confirm":"Delete all trades on this phone?","warn":"Never write passwords or account numbers here. Download a copy now and then — the browser can clear what it stores.","del":"Delete","curve":"Your result over time"}},"theme_ask":{"en":{"title":"Light or dark?","body":"Choose how Aimpire looks on your phone. You can switch any time with ◐.","light":"Light","dark":"Dark","close":"Close"}},"update_ready":{"en":"A new version of Aimpire is ready"},"ibq":{"en":{"title":"How you earn, in short","lede":"You share your link. People who join through it trade. You get a small part: an amount per lot from the broker, and a share of the profit on their trades.","flow":[["You","share your link"],["Your friend","opens an account and trades"],["You","earn a little from their trades"]],"flow_note":"Your friend pays no extra fees for this.","steps_t":"Get started in 3 steps","steps":[["Have $250 trading yourself","That opens the first three levels of your team."],["Share your own link","Everyone who joins through your link lands in your team."],["Follow it in the IB Portal","As up to ten people you invited directly reach $250, levels 4 to 10 open. Your numbers are always in the portal."]],"portal":"Open the IB Portal","ladder_t":"The ten levels","ladder_cap":"What you get per lot on each level. Levels 1–3 open with your own $250, the rest as your team grows. The portal shows which levels are actually open for you.","open":"Open with $250","grow":"Opens as your team grows","ex_t":"Example","ex":[["Ali","has $250 trading"],["Sara","joins through Ali's link"]],"ex_body":"Sara is on Ali's level 1, which is open. Every time Sara trades 1 lot, Ali gets $2.00. If Sara makes $100 on a trade, she keeps $70 and Ali gets $2.50.","honest":"These rates are from the international programme (outside Europe); Europe has its own programme. No income is guaranteed. What you actually get is shown in your IB Portal.","more":"All details, bonuses and sources","lv_t":"What do level 1, 2 and 3 mean?","lv":[["Level 1","The people you invite yourself"],["Level 2","The people they invite"],["Level 3","The next ones after that"]],"lv_more":"… and so on down to level 10. You get a part from every level that is open.","un_t":"How you unlock more levels","un":[["You have $250 trading","Levels 1–3 open"],["People you invited directly reach $250","Levels 4–10 open step by step, with up to ten such people"]],"un_note":"The IB Portal always shows how many levels are open for you.","st_t":"Bigger bonuses: the staircase","st_a":"New deposits in your team during one month","st_a_lbl":"CPA","cpa":[["$10,000","1%"],["$50,000","2%"],["$200,000","3.5%"],["$1,000,000","5%"]],"st_b":"Team volume during one month","pools":[["$500,000","Leader Pool 1"],["$1,000,000","Leader Pool 2"]],"rule":"At most half can come from one branch. Help several people in your team get going, not just one.","rb_t":"A higher rebate per lot?","rb":"In the international programme the rate is fixed per level, so you get more by opening more levels. In the European programme the rate rises with volume: from $2.00 to $6.50 per lot, and from 2.5% to 22.5% of the profit.","va_t":"It's the amount that counts, not the headcount","va_l":"You earn from deposits and trading, not from how many people sign up. Nobody is paid per person.","va_cmp":[["1 person","deposits $10,000"],["1,000 people","deposit $10 each"]],"va_eq":"The same $10,000 in new deposits","va_note":"It is the amount that counts, not how many people. But the branch rule applies either way: at most half is counted from any one branch (see the tip below).","va_lv_t":"Which level the volume comes from matters too","va_lv":[["Level 1","$2.00 per lot"],["Levels 5–10","$0.50 per lot"]],"va_lv_note":"The same lot pays four times as much when it is traded on level 1 as on level 5.","va_tip":"Tip: for the bonuses, at most half can come from one branch. So two people with $5,000 each in separate branches count for more than one person with $10,000."}},"short":{"s-amplify":{"en":{"title":"Sonic in 30 seconds","lede":"Sonic is a strategy that trades for you, automatically, in your own account.","flow":[["💵","You deposit","for example $100"],["⚡","Amplify multiplies it","24× with the Aimpire token"],["🤖","Sonic trades","automatically, in your account"]],"chips":[["24×","trading size with token"],["≈ 70%","of the profit is yours"],["4.2%","drop in the 24× balance ≈ your whole deposit"]],"steps_t":"The Aimpire token in 3 steps","steps":[["Type #Aitech","in the token field, and tap Verify"],["Type 000000","in the Hash field that appears"],["Look for the tick","before you tap Copy Now"]],"ex_t":"Example","ex":"In our own test, $109 became a trading balance of $2,616. The multiple works on losses exactly as on gains.","tip":"Start with an amount you could lose, and watch it for a few weeks.","more":"All details about Sonic","live_t":"All 24 months in profit — the latest is still running","live_cap":"Monthly gain on the strategy's own account (Myfxbook), before the fee. Past results, not a forecast.","calc_t":"Try your own amount","calc_l":"You deposit","calc_trade":"Sonic trades with","calc_note":"Your whole deposit equals {P} of the trading amount. That is why the amount is your most important choice.","split_t":"Of every gain","split":[["You keep","70%"],["Fee","30%"]],"split_note":"No joining fee and no management fee.","chart_t":"Gold right now (XAUUSD)","chart_note":"The market Sonic trades, live from TradingView. For learning — not a signal to buy or sell.","chart_load":"Show live chart"}},"s-withdraw":{"en":{"title":"Take money out in 3 steps","lede":"Profit can be taken out at any time. Your deposit only 30 days after your first trade — and taking it out closes the account.","flow":[["📈","Amplify","WITHDRAW under AVAILABLE"],["👛","Tag wallet","the money lands here first"],["🔐","Your wallet","choose CRYPTOCHILL"]],"chips":[["$10","minimum (ETH, BNB, BTC)"],["1–3 days","working days from Amplify"],["2–24 h","crypto under $1,000"]],"steps_t":"First time only","steps":[["Add your own wallet","TAG WALLET → YOUR CRYPTO WALLETS"],["Wait for approval","usually 5–45 minutes"]],"tip":"Do it once early, with a small amount, so you know it works.","more":"All details about withdrawals"}},"s-results":{"en":{"title":"The results, in short","lede":"The strategy's own history on Myfxbook, November 2024 to October 2026.","chips":[["24","months without a losing month"],["0.86%","deepest dip"],["5%","the line that closes the account"]],"ex_t":"How to read it","ex":"At 24×, a dip of 0.86% is about −21% of your deposit. The deepest dip is about a sixth of the way to the 5% line.","tip":"Past results, not a forecast. The 30% fee is not deducted.","more":"All numbers and caveats"}},"s-guide":{"en":{"path":[["🔗","Link"],["📝","Account"],["🪪","ID"],["⏳","Approved"],["💵","Deposit"],["🤖","Sonic"]],"chips":[["~15 min","steps 1–4"],["ID card","have it ready"],["10 steps","the page remembers where you are"]]}},"s-leaders":{"en":{"path":[["🔑","Open the IB Portal"],["📋","Copy your Partner link"],["✍️","Paste + your name"],["🔗","Get your link"]]}},"s-calc":{"en":{"title":"Your amount, worked out from the history","lede":"Type an amount and see what the history would have given you, after all costs.","tip":"Past results, not a guarantee. Only put in what you could lose completely.","more":"How it is worked out, and the risk"}}},"products":{"en":{"title":"Products","lede":"Aimpire's tools in one place. Sonic is the first — more are coming.","items":[{"cat":"earn","name":"Sonic","badge":"Live","desc":"The copy-trading strategy that trades for you, automatically, in your own account.","cta":"See how it works","facts":["Start from $10","Fee: 30 % of profit","You can lose it all"]}],"more_t":"More on the way","more_d":"We are building more tools. They will show up here when they are ready."}},"tape":{"en":{"closed":"closed","news":"News","imp_hi":"High impact","imp_mid":"Medium impact"}},"margin":{"en":{"title":"How much does a gold trade tie up?","lede":"Margin is the money the broker holds aside while your trade is open. See what a gold trade ties up — and what a $1 move in gold means for you. A calculation, not advice.","lots":"Size (lot)","lev":"Leverage","price":"Gold price — live, you can change it","levs":[[30,"1:30"],[100,"1:100"],[500,"1:500"]],"out_margin":"Margin held aside","out_val":"Value you control","out_move":"When gold moves $1","move_v":"{X} for you, up or down","check":"A contract is usually 100 ounces per 1.00 lot, and leverage depends on your account. Check Specification in MT5 before you trade.","formula":"margin = lot × 100 × gold price ÷ leverage"}},"fib":{"en":{"title":"Fibonacci levels","lede":"Many traders look at these levels after a big move. Enter the top and the bottom — the levels are maths, not a signal.","lo":"Low (lowest price)","dir":"The move went","up":"Up","down":"Down","note":"These are levels many people watch, not places where price must turn. Use them to learn, never as a buy or sell signal."}},"community":{"en":{"title":"The community in Element X","lede":"The Aimpire group is a space with several rooms. Here is how to find your way.","rooms":[["👋 Start here","Begin here: the guide and the first steps."],["📣 Announcements","Official Aimpire updates. Only the founder and moderators post here."],["❓ Questions","Ask anything, in any language."],["🇵🇰 Pre-launch","The main chat for Pakistan, in Urdu."],["📓 Results & lessons","Screenshots and numbers from real accounts — the losing days as well as the good ones."]],"tips":[["🌏","Join the Aimpire space with the button below. The rooms above are open to everyone in the space."],["🧵","Turn on threads in the Labs section of Element X settings. Then you can answer inside a thread and conversations stay tidy."],["🔔","You decide the notifications for each room yourself, in that room's settings."],["🛡️","Nobody from Aimpire asks for your password or for money in a private message. If someone does, report it in ❓ Questions."],["🔗","Links to the hub: open them in Chrome or Safari, not inside Element."]],"cta":"Open Aimpire in Element X","note":"Element X is still adding features for spaces and threads, so some buttons may look slightly different on your phone."}},"legal_more":{"en":"About Aimpire and your responsibility"},"learn_live":{"en":{"title":"Free live lessons","body":"Tag Markets runs live sessions with professional traders several times a week, among them gold and indices, forex and crypto. Education, not signals – in English. You find the times and sign-up under Academy → Live Sessions in the Tag Markets portal."}},"goals":{"en":{"t":"What do you want to do?","items":[["📝","Open an account","#start"],["💵","Deposit money","#steg-7"],["📊","See my account","#steg-9"],["💸","Withdraw money","#withdraw"],["🙋","Get help","#faq"],["🔗","Invite others","ledere.html"]]}},"lang_ask":{"_readme":"#145/#148: velkomstport ved første åpning. Hilsenen i hvert språk ER valget. Ikke per språk-nøkler (språket er ikke valgt ennå).","rows":[["en","Welcome","English","🇬🇧"],["no","Velkommen","Norsk","🇳🇴"],["hi","स्वागत है","हिन्दी","🇮🇳"],["ar","أهلاً وسهلاً","العربية","🇸🇦"],["ur","خوش آمدید","اردو","🇵🇰"]],"script":{"for_urdu":{"a":"خوش آمدید","a_d":"اردو حروف میں","b":"Khush aamdeed","b_d":"Roman Urdu · A B C","q":"آپ کیسے پڑھنا چاہتے ہیں؟","q_rm":"Aap kaise parhna chahte hain?"},"for_arabic":{"a":"أهلاً وسهلاً","a_d":"بالحروف العربية","b":"Ahlan wa sahlan","b_d":"Roman Arabic · A B C","q":"كيف تفضّل أن تقرأ؟","q_rm":"Kayfa tufaddil an taqra'?"}}},"update_go":{"en":"Update now"},"halal":{"en":{"title":"Is it halal?","lede":"That is for you to decide — scholars see trading differently. Here is how it works in practice:","items":[["⏱️","How long a trade lasts","A trade lasts about 4 hours on average — Sonic trades within the day."],["🚫","Interest (swap)","The strategy account shows $0 in interest (swap) on Myfxbook."],["🕌","Islamic account","The broker also has an Islamic account type, without swap."],["🧾","Fees","There are small fees, like commission per lot. Those are fees, not interest."]]}},"market":{"en":{"title":"Prices and news","lede":"Live prices and this week's important news, in your own time. Tap a news item for details.","prices":"Live prices","news":"This week's news","next":"Next big news","fc":"Forecast","prev":"Previous","none":"No more big news this week.","src":"Prices: gold-api.com · News: Forex Factory"}},"tour":{"en":{"welcome":["Welcome to Aimpire 👋","Let me take you on a short tour of the app, so you know where everything is. It takes less than a minute."],"leader":["Your leader","This shows who invited you. Always register with the button here, so you end up with the right person."],"own":["Want to invite others?","Here you can make your own page with your own link. Everyone you invite ends up with you."],"menu":["The menu at the bottom","Everything is here. The button in the middle always takes you home. Now let's take a walk – follow along!"],"start":["Start: how to get going","Step by step: account, deposit and Sonic. Tick a step when it is done – the app remembers where you are."],"prod":["Products","Here you'll find Sonic and what else Aimpire offers – with minimum amounts, costs and risk shown openly."],"calc":["The Sonic calculator","Try your own numbers and see what can happen – including how much you could lose. A calculation, not a promise."],"tools":["Tools","Live prices, this week's news, market hours and how big a trade should be. All whenever it suits you."],"learn":["Academy","Short explanations of the words, and lessons at your own pace. Everything here is learning – not advice."],"top":["Language and search","At the top you can change the language and search for words or questions any time."],"done":["You're all set! 🎉","Take it at your own pace. You can find the tour again under More at the bottom."],"ui":{"next":"Next","done":"Done","skip":"Skip","of":"{n} of {N}","replay":"Take the tour again","back":"Back"},"c1":["1. Choose the amount","Tap an amount, or drag the slider. Try $250, for example – you can tap now."],"c2":["2. Choose the period","6 months, 12 months or all months. Tap one and watch the numbers change."],"c3":["3. What you would have had","Shows what your amount would have become if you had followed Sonic in that period, after costs. The percentage shows the change. This is history – not a guarantee."],"c4":["4. Month by month","The chart shows how the amount would have gone up and down each month. It doesn't only go up."],"c5":["5. Best and worst month","Here you can see the best and the worst month. Always look at the worst one too."],"c6":["6. The risk","Tap here to see how it is calculated and what you could lose. Read this before you deposit money."],"risk":{"t":"Important – please read","items":["Trading is risky. You can lose everything you deposit.","Aimpire is learning and community – not financial advice.","Past results are no guarantee of future results.","Only deposit money you can afford to lose.","It is your own responsibility to check that it is allowed where you live."],"ok":"I have read and understood this","wait":"You can tick the box in {s} sec."},"more":["More","The rest is here: the calculator, news, questions, the group, your own progress – and a light or dark screen."]}},"ldbtn":{"en":{"other":"Leaders","mine":"My page"}},"growth":{"en":{"title":"See your own progress","lede":"The numbers are already on your phone. Here is where to find them and how to work out where you stand. Nothing is sent to us.","mt5_t":"In the MetaTrader 5 app","mt5":["Open MetaTrader 5 and log in to your account.","Tap History at the bottom.","Choose the period at the top.","At the bottom you see Deposit (deposits minus withdrawals), Profit (gain or loss) and Balance (what you have now)."],"portal_t":"In the Tag Markets portal (easiest)","portal":["Open Tag Wallet. Net Deposits is what you have put in, minus withdrawals.","Open Accounts → Account Summary and tap + next to your Real account. Equity is the value now, including open trades.","Do not tap Real, Demo or Social Trading at the top. They open a new account.","If there is money left in Tag Wallet (Balance at the top), add it to the value now."],"calc_t":"Work out where you stand","dep":"Put in: Net Deposits or Deposit ($)","bal":"Value now: Equity or Balance ($)","up":"Up {D} ({P}) on what you put in.","down":"Down {D} ({P}) on what you put in.","even":"Exactly where you started.","need":"Fill in both numbers.","note":"Calculated only on your phone. Not saved, not sent.","warn":"Balance does not include open trades, Equity does. What happened before says nothing certain about the future. Never type a password here.","more":"My progress","img":"Screenshot, numbers hidden"}},"welcome":{"en":{"full":"See the whole app","back":"Back to start","done":"Take it at your own pace. Open the rest of the app with «See the whole app» at the bottom of the page."}},"packs":{"no":"8501e5934f","hi":"c9952981da","ar":"b9369c8e0d","ur":"b48fb2bb90","ar_rm":"61a10028af","ur_rm":"82ed80b101"}};
/* «member» eller «leaders». Samme fil, samme CSS, to adresser: medlemmene
   skal ikke se lederverktoeyet i det hele tatt, og lederne trenger ikke
   scrolle gjennom guiden for aa finne det. */
const PAGE = "member";
document.documentElement.setAttribute("data-page", PAGE);

/* An IB's sign-up link carries an opaque token (?e=...), not their IB number,
   so the whole link travels as ?ref= and only these hosts are accepted. */
/* Bare vertene partnerlenken faktisk kommer fra (IB Portal -> Profile). */
const REF_ALLOWED_HOSTS = ["copyxapp.com","www.copyxapp.com"];
const REF_HOUSE = "";

let lang = C.langs[0].code, sponsorUrl = null, pendingRef = null, sponsorName = "", pendingConflict = null;
let EGEN_VENTER = false;   /* #152: telefonen åpner sin egen lederlenke før den er godkjent */
const $ = id => document.getElementById(id);
const conf = code => C.langs.find(l => l.code === code) || C.langs[0];
function store(k,v){ try{ v===null?localStorage.removeItem(k):localStorage.setItem(k,v); }catch(e){} }
function load(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }

/* Nothing becomes an href unless it is plain http(s). */
function safeUrl(u){
  try{ const p = new URL(String(u), location.href).protocol;
       return p === "https:" || p === "http:"; }catch(e){ return false; }
}
/* Images belong to this page. Anything off-origin is skipped. */
function sameOrigin(u){
  try{ return new URL(String(u), location.href).origin === location.origin; }catch(e){ return false; }
}
function validRef(raw){
  if(!raw) return null;
  const rs = String(raw).trim();
  /* Usynlige tegn (zero-width fra WhatsApp-kopiering), ikke-ASCII og #fragment:
     skjemaet avviser dem stille, og megleren mister koblingen (gjennomgang 17.10, funn 5). */
  if(/[^\x21-\x7E]/.test(rs)) return null;
  let u;
  try{ u = new URL(rs); }catch(e){ return null; }
  if(u.hash) return null;
  if(u.protocol !== "https:") return null;
  if(REF_ALLOWED_HOSTS.indexOf(u.hostname) === -1) return null;
  /* Founder 16.10 (#49): bare partnerlenken slik IB Portal -> Profile gir den,
     copyxapp.com/auth/register?e=<noekkel>&a=1. CopyX-appens egne delings-
     lenker og alt annet avvises - fast regel, ingen overvaaking. */
  if(!REF_PATTERN.test(u.pathname + u.search)) return null;
  return u;
}
const REF_PATTERN = /^\/auth\/register\?e=[A-Za-z0-9_%.+\/=-]{20,}&a=1$/;
/* «by» kommer fra URL-en og er dermed kontrollert av den som laget lenka.
   Den settes alltid med textContent, aldri innerHTML — men den filtreres
   ogsaa: bare bokstaver i et hvilket som helst skriftsystem, mellomrom,
   bindestrek og apostrof, og maks 24 tegn. Da kan et «navn» verken bli
   markup, en URL eller et avsnitt. */
function cleanName(raw){
  if(!raw) return "";
  let t = String(raw).trim().slice(0, 48);
  /* RegExp-objekt, ikke literal: paa motorer uten \p{} (Chrome < 64, Safari < 11.1) ville en
     literal gi SyntaxError ved innlasting og drepe hele siden (funn A7). */
  try{ t = t.replace(new RegExp("[^\\p{L}\\p{M} '\\-]", "gu"), ""); }
  catch(e){ t = t.replace(/[^A-Za-zÀ-ÿ '\-]/g, ""); }
  t = t.replace(/\s+/g, " ").trim().slice(0, 24);
  return t;
}
function fingerprint(u){
  const t = u.searchParams.get("e") || u.search || u.pathname;
  return String(t).replace(/[^A-Za-z0-9]/g,"").slice(-6).toUpperCase();
}

/* Godkjente ledere (founder 15.10, B-014/B-015). Lista er filen ledere.txt
   ved siden av siden - den eneste kilden, og bare founder redigerer den (fra
   mobilen paa GitHub). Én linje per leder: «Fornavn | partnerlenke». Lederens
   kode i lenka (?l=) regnes ut av partnerlenka, saa founder aldri lager koder.
   Gamle selvlagde ?ref=-lenker gjelder ikke lenger (B-015). */
let REG = [], REG_FRESH = false, REG_VENTER = false, sponsorVerified = false;
function refKey(u){ return u ? u.hostname + "|" + (u.searchParams.get("e") || u.pathname + u.search) : ""; }
/* #164: navnet i lenken, f.eks. «asma-pbv4ta». Bare a-z/0-9 (æøå gjøres om); et navn i
   arabisk/urdu-skrift gir ingen latinsk del, og da brukes bare koden - lenken virker uansett. */
function navnSlug(n){
  let t = String(n || "").toLowerCase().replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a");
  try{ t = t.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); }catch(e){}
  t = t.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if(t.length > 20){ const kutt = t.slice(0, 21).lastIndexOf("-"); t = kutt > 2 ? t.slice(0, kutt) : t.slice(0, 20); }
  return t.replace(/-+$/, "");
}
function ledParam(id, navn){ const sl = navnSlug(navn); return sl ? sl + "-" + id : id; }
/* #164: kode -> navnelenke («asma») fra den publiserte fanen «Navnelenker». Lastes én gang. */
let NAVNEKART = null;
const NAVN_OPPTATT = {};
/* #172 (founder 19.10 03:20 «folk kan promotere seg selv … insta, whatsapp, snap»): lederens egne
   kanaler, frivillig og offentlige. Bare brukernavn/nummer kommer fra arket; adressen bygges HER,
   saa ingen kan legge inn en vilkaarlig lenke (phishing). Samme regler som skriptet (SOSIALE). */
const SOSIAL = [   /* #176: Element X foerst - der kan man skrive direkte til lederen i communityet */
  ["element", "Element X", /^[a-z0-9._=\-\/]+:[a-z0-9.\-]+\.[a-z]{2,}$/, function(h){ return "https://matrix.to/#/@" + h; }, "@"],
  ["whatsapp", "WhatsApp", /^[0-9]{8,15}$/, function(h){ return "https://wa.me/" + h; }, "+"],
  ["instagram", "Instagram", /^[a-z0-9._]{1,30}$/, function(h){ return "https://www.instagram.com/" + h + "/"; }, "instagram.com/"],
  ["tiktok", "TikTok", /^[a-z0-9._]{2,24}$/, function(h){ return "https://www.tiktok.com/@" + h; }, "tiktok.com/@"],
  ["snapchat", "Snapchat", /^[a-z0-9._-]{3,15}$/, function(h){ return "https://www.snapchat.com/add/" + h; }, "snapchat.com/add/"]];
const PROFIL = {};
function rensSosial(type, raa){
  let t = String(raa || "").trim().toLowerCase(); if(!t) return "";
  if(type === "element") t = t.replace(/^https?:\/\/matrix\.to\/#\//, "").replace(/^@/, "").split(/[?\s]/)[0];
  else if(type === "whatsapp") t = t.replace(/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com\/send\?phone=)\/?/, "").replace(/[^0-9+]/g, "").replace(/^\+/, "").replace(/^00/, "");
  else t = t.replace(/^https?:\/\/(www\.)?/, "").replace(/^(instagram\.com|tiktok\.com|snapchat\.com\/add|t\.me|telegram\.me)\//, "").replace(/^@/, "").split(/[/?#\s]/)[0];
  const S = SOSIAL.find(function(x){ return x[0] === type; });
  return S && S[2].test(t) ? t : "";
}
const SOS_IKON = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
  tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.6 2.6 2.4 4.2 5 4.5"/>',
  snapchat: '<path d="M12 3c3 0 5 2.2 5 5.2V11l2 .8-2 1.2c-.8 2-2.6 3.5-5 3.5s-4.2-1.5-5-3.5l-2-1.2 2-.8V8.2C7 5.2 9 3 12 3z"/><path d="M8 19.5c1.2.6 2.5 1 4 1s2.8-.4 4-1"/>',
  whatsapp: '<path d="M4 20l1.3-4A8 8 0 1 1 8.2 19z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2z" fill="currentColor" stroke="none"/>',
  element: '<path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8.5 10.5h7M8.5 13h4"/>'
};
function sosIkon(type){
  const sv = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sv.setAttribute("viewBox", "0 0 24 24"); sv.setAttribute("fill", "none"); sv.setAttribute("stroke", "currentColor");
  sv.setAttribute("stroke-width", "1.8"); sv.setAttribute("stroke-linecap", "round"); sv.setAttribute("stroke-linejoin", "round"); sv.setAttribute("aria-hidden", "true");
  sv.innerHTML = SOS_IKON[type] || ""; return sv;
}
/* Rad med lederens kanaler. liten = bare runde ikoner (lederlista). null hvis lederen ikke har lagt inn noe. */
function sosRad(id, navn, liten){
  const P = PROFIL[id]; if(!P || !P.length) return null;
  const r = el("div", "sosrad" + (liten ? " liten" : ""));
  P.forEach(function(p){
    const S = SOSIAL.find(function(x){ return x[0] === p[0]; }); if(!S) return;
    const a = el("a", "sos sos-" + p[0]); a.href = S[3](p[1]); a.target = "_blank"; a.rel = "noopener noreferrer";
    a.title = S[1]; a.setAttribute("aria-label", (navn || "") + " \u00b7 " + S[1]);
    a.appendChild(sosIkon(p[0])); if(!liten) a.appendChild(el("span", null, S[1]));
    a.addEventListener("click", function(ev){ ev.stopPropagation(); });
    r.appendChild(a);
  });
  return r;
}
function hentNavnekart(fersk){
  const F = C.leader_signup || {};
  if(!F.names_csv) return Promise.resolve(NAVNEKART || {});
  if(NAVNEKART && !fersk) return Promise.resolve(NAVNEKART);
  /* #213 G1: to kall samtidig ga to hentinger av samme ark - den andre venter naa paa den foerste.
     #262: fersk=true henter paa nytt (profilen sjekker om arket har faatt endringen). */
  if(hentNavnekart.p && !fersk) return hentNavnekart.p;
  return hentNavnekart.p = fetch(F.names_csv + (F.names_csv.indexOf("?") < 0 ? "?" : "&") + "t=" + (fersk ? Date.now() : Math.floor(Date.now() / 300000)), { cache: "no-store" })
    .then(function(r){ return r.ok ? r.text() : ""; })
    .then(function(t){ const k = {}, ant = {}; const linjer = String(t || "").split(/\r?\n/);
      const hode = (linjer[0] || "").split(",").map(function(x){ return x.trim().toLowerCase(); });
      linjer.slice(1).forEach(function(l){ const f = l.split(","); const sl = (f[0] || "").trim().toLowerCase(), id = (f[1] || "").trim().toLowerCase();
      /* #172: kolonnene etter slug,code er lederens kanaler (frivillig) - valideres her paa nytt */
      if(/^[a-z0-9]{6}$/.test(id)){ const P = []; SOSIAL.forEach(function(S){ const i = hode.indexOf(S[0]); const v = i > 1 ? rensSosial(S[0], f[i]) : ""; if(v) P.push([S[0], v]); }); if(P.length) PROFIL[id] = P; }
      /* #169: «x» = navnet er fast tildelt en leder som ikke er aktiv - opptatt, men peker ingen steder. */
      if(/^[a-z0-9]{1,30}$/.test(sl)) NAVN_OPPTATT[sl] = 1;
      if(/^[a-z0-9]{1,30}$/.test(sl) && /^[a-z0-9]{6}$/.test(id)){ k[id] = sl; ant[sl] = (ant[sl] || 0) + 1; } });
      /* et navn som staar mer enn én gang, brukes ikke - da deles ?l=navn-kode i stedet */
      Object.keys(k).forEach(function(id){ if(ant[k[id]] > 1) delete k[id]; }); NAVNEKART = k; return k; })
    .catch(function(){ hentNavnekart.p = null; return {}; });   /* feilet -> neste kall proever paa nytt, som foer */
}
/* Lederens delbare lenke: base + «asma» naar navnet finnes, ellers base + «?l=asma-kode». «rest» er
   andre parametre (ca=…&lang=…) uten «?». */
function lederUrl(base, id, navn, rest){
  const sl = NAVNEKART && NAVNEKART[id];
  if(sl) return base + sl + (rest ? "?" + rest : "");
  return base + "?l=" + ledParam(id, navn) + (rest ? "&" + rest : "");
}
function codeOf(u){
  const s = refKey(u); let h = 0x811c9dc5;
  for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return ("00000" + h.toString(36)).slice(-6);
}
function parseReg(text){
  const out = [], seen = {};
  String(text || "").split(/\r?\n/).forEach(function(line){
    let t = line.trim(); if(!t || t[0] === "#") return;
    /* Google-arket leverer CSV: «Sara,https://...» og felt i anfoerselstegn. */
    t = t.replace(/^"|"$/g, "").replace(/","/g, " | ").replace(/^([^,|]{1,40}),(?=https:\/\/)/, "$1 | ");
    /* Tilgivende for redigering paa mobil: lenka er det som starter med
       https://, navnet er alt foran den - «Sara | lenke», «Sara - lenke» og
       «Sara lenke» virker likt. */
    const cut = t.indexOf("https://"); if(cut < 1) return;
    const name = cleanName(t.slice(0, cut).replace(/[|;:,\-\u2013\u2014\s]+$/, "")), u = validRef(t.slice(cut).split(/[\s,"]/)[0]);
    if(!name || !u) return;
    const id = codeOf(u); if(seen[id]) return; seen[id] = true;
    out.push({ id: id, name: name, link: u.href });
  });
  return out;
}
function leaderById(id){ return id ? REG.find(function(x){ return x.id === id; }) || null : null; }
/* #94 (B-033, 17.10): arket publiserer ikke lenger fornavn og partnerlenke i klartekst,
   men én kryptert rad per leder: «id,chiffer». Noekkelen avledes av lederens egen kode
   (?l=) med PBKDF2 - bare den som har koden, kan lese akkurat den lederen. Samme
   regnestykke som google/send-lenke.gs (kryptertRad_), bevist likt i node. Den
   dekrypterte lenka maa gi samme kode tilbake, ellers forkastes raden. */
const ENC_SALT = "aimpire-v1", ENC_ITER = 10000;
let ENC = [];
function parseEnc(text){
  const ut = [];
  String(text || "").split(/\r?\n/).forEach(function(l){
    const m = l.trim().replace(/"/g, "").match(/^([0-9a-f]{32}),([A-Za-z0-9+\/=]{20,})$/);
    if(m) ut.push({ h: m[1], c: m[2] });
  });
  return ut;
}
async function encNokler(kode){
  const te = new TextEncoder();
  const km = await crypto.subtle.importKey("raw", te.encode(kode), "PBKDF2", false, ["deriveBits"]);
  const t = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: te.encode(ENC_SALT), iterations: ENC_ITER, hash: "SHA-256" }, km, 256));
  const id = Array.from(t.slice(0, 16)).map(function(x){ return ("0" + x.toString(16)).slice(-2); }).join("");
  const kin = new Uint8Array(34); kin.set(t); kin.set(te.encode("|k"), 32);
  return { id: id, key: new Uint8Array(await crypto.subtle.digest("SHA-256", kin)) };
}
async function encDekrypter(key, b64){
  const ct = Uint8Array.from(atob(b64), function(ch){ return ch.charCodeAt(0); });
  const ut = new Uint8Array(ct.length);
  for(let i = 0; i < ct.length; i += 32){
    const blk = new Uint8Array(33); blk.set(key); blk[32] = i / 32;
    const ks = new Uint8Array(await crypto.subtle.digest("SHA-256", blk));
    for(let j = 0; j < 32 && i + j < ct.length; j++) ut[i + j] = ct[i + j] ^ ks[j];
  }
  return new TextDecoder().decode(ut);
}
/* Kodene denne telefonen faktisk trenger: lenken, husket sponsor, ventende ?l= og lederens egen. */
function kjenteKoder(){
  const k = [];
  try{ const l = new URLSearchParams(location.search).get("l"); if(l) k.push(String(l).toLowerCase().replace(/[^a-z0-9]/g, "")); }catch(e){}
  [load("aimpire.leader"), load("aimpire.leader.venter"), load("aimpire.me")].forEach(function(x){ if(x) k.push(x); });
  return k.filter(function(x, i, a){ return /^[0-9a-z]{6}$/.test(x) && a.indexOf(x) === i; });
}
async function sikreLedere(koder){
  if(!ENC.length || !(window.crypto && crypto.subtle)) return;
  for(const kode of koder){
    if(!/^[0-9a-z]{6}$/.test(kode) || leaderById(kode)) continue;
    try{
      const n = await encNokler(kode);
      const rad = ENC.find(function(e){ return e.h === n.id; });
      if(!rad) continue;
      const del = (await encDekrypter(n.key, rad.c)).split("\n");
      if(del[0] !== "AIM1") continue;
      const navn = cleanName(del[1] || ""), u = validRef(del[2] || "");
      if(!navn || !u || codeOf(u) !== kode) continue;
      REG.push({ id: kode, name: navn, link: u.href });
      /* Bare lederne denne telefonen allerede kjenner, lagres - for rask start uten nett. */
      let kjent = []; try{ kjent = JSON.parse(localStorage.getItem("aimpire.regk") || "[]"); }catch(e){}
      kjent = kjent.filter(function(x){ return x.id !== kode; }); kjent.push({ id: kode, name: navn, link: u.href });
      store("aimpire.regk", JSON.stringify(kjent.slice(-10)));
    }catch(e){}
  }
}
/* Lagret kopi foerst (rask start, virker uten nett), saa ferske lista. */
try{
  const raa = JSON.parse(localStorage.getItem("aimpire.reg") || '""');
  REG = parseReg(raa); ENC = parseEnc(raa);
  JSON.parse(localStorage.getItem("aimpire.regk") || "[]").forEach(function(x){
    const u = validRef(x && x.link); if(u && codeOf(u) === x.id && !leaderById(x.id)) REG.push({ id: x.id, name: cleanName(x.name), link: u.href });
  });
}catch(e){}
function loadReg(){
  /* Med kode i lenka og ingen husket liste: vent lenger (tregt nett i Pakistan
     maalt 1,5-3 s paa bredbaand, mer paa 3G). Kommer lista etter fristen, brukes
     den straks likevel - foer ble den kastet og medlemmet saa «ingen sponsor»
     (gjennomgang 17.10, funn 1). */
  let harKode = false, kode0 = ""; try{ kode0 = String(new URLSearchParams(location.search).get("l") || "").toLowerCase().replace(/[^a-z0-9]/g, ""); harKode = !!kode0; }catch(e){}
  const ukjent = harKode && !leaderById(kode0);
  REG_VENTER = ukjent;
  const budsjett = ukjent ? 12000 : 6000;
  const timeout = new Promise(function(res){ setTimeout(function(){ res(undefined); }, budsjett); });
  /* Tre kilder (#267): Google-arket (fasit), ledere.txt (manuell), ledere-reserve.csv
     (SNAP fra sist bygg - samme moenster som navnelenker-reserve). SNAP brukes bare
     naar arket ikke svarer, og bare hvis den er yngre enn 7 dager. */
  const one = function(u, maaVaereCsv){ return fetch(u, { cache: "no-store" })
    .then(function(r){
      if(!r.ok) return null;
      /* Google svarer 200 med HTML naar publiseringen er stoppet eller krever innlogging;
         det er ikke en tom liste, det er «ukjent» (gjennomgang 16.10, funn 2). */
      if(maaVaereCsv && !/text\/csv|text\/plain/i.test(r.headers.get("content-type") || "")) return null;
      return r.text();
    }).catch(function(){ return null; }); };
  const SNAP_MAX_DAGER = 7;
  const snapOk = function(t){
    if(t === null || t === undefined) return null;
    const m = String(t).match(/^#\s*baked:(\d{4}-\d{2}-\d{2})/m);
    if(!m) return t;   /* eldre fil uten dato: bruk likevel (bedre enn ingen) */
    const dager = (Date.now() - Date.parse(m[1] + "T00:00:00Z")) / 86400000;
    return dager <= SNAP_MAX_DAGER ? t : null;
  };
  const LS = C.leader_signup || {};
  /* #267: arket som henger (Pakistan/blokkert CDN) maa ikke holde hele Promise.all.
     Lokal SNAP og ledere.txt faar svare; arket droppes etter 3,5 s (maalt normalt ~1,1 s). */
  const medFrist = function(p, ms){
    return Promise.race([p, new Promise(function(res){ setTimeout(function(){ res(null); }, ms); })]);
  };
  const get = Promise.all([
    one((location.pathname.indexOf("/guide/") === 0 ? "/ledere.txt" : "ledere.txt") + "?t=" + Date.now()),   /* etter cutover ligger huben i /guide/, men lista founder redigerer er rot-fila */
    LS.approved_csv ? medFrist(one(LS.approved_csv, true), 3500) : Promise.resolve(null),
    one("ledere-reserve.csv?t=" + Date.now())
  ]).then(function(r){
    const lokal = r[0], ark = r[1], snap = snapOk(r[2]);
    /* Fersk fra arket: bruk den (+ manuell reserve). */
    if(ark !== null) return (lokal || "") + "\n" + ark;
    /* #267: arket nede/blokkert - SNAP (eller ledere.txt) saa ny ?l= fortsatt dekrypteres.
       Mangler begge: null = behold aimpire.reg fra localStorage (gjennomgang 16.10, funn 4). */
    if(snap !== null || lokal !== null) return (lokal || "") + "\n" + (snap || "");
    return null;
  });
  const bruk = function(text){
    if(text !== undefined) REG_VENTER = false;
    if(text === null || text === undefined) return false;
    store("aimpire.reg", JSON.stringify(text));
    REG = parseReg(text); ENC = parseEnc(text); REG_FRESH = true;
    /* #276: SNAP/ark erstatter REG — behold lokal regk (kjente ledere paa denne
       telefonen) saa B-023-konflikt fortsatt finner husket sponsor. */
    try{
      JSON.parse(localStorage.getItem("aimpire.regk") || "[]").forEach(function(x){
        const u = validRef(x && x.link);
        if(u && codeOf(u) === x.id && !leaderById(x.id)) REG.push({ id: x.id, name: cleanName(x.name), link: u.href });
      });
    }catch(e){}
    return true;
  };
  return Promise.race([get, timeout]).then(function(text){
    if(text === undefined){
      /* Fristen gikk: vis «sjekker invitasjonen» i stedet for «ingen sponsor» til svaret
         kommer, og bruk svaret naar det kommer (funn B1/A8). */
      REG_VENTER = harKode && !leaderById(kode0);
      get.then(function(sen){
        REG_VENTER = false;
        const ok = bruk(sen);
        return sikreLedere(kjenteKoder()).then(function(){ try{ initSponsor(); render(); }catch(e){} return ok; });
      });
      return false;
    }
    const ok = bruk(text);
    return sikreLedere(kjenteKoder()).then(function(){ return ok; });
  });
}

/* Bestemmes ved lasting. Foerste godkjente sponsor staar: en ny lenke senere
   bytter den ikke, og det finnes ingen «Endre»-knapp. Fjerner founder en leder
   fra lista, faller sponsoren bort ved neste besoek. Den egentlige laasen er hos
   megleren saa snart medlemmet har registrert seg via lenka. */
function initSponsor(){
  store("aimpire.ref", null); store("aimpire.by", null);
  /* #152 opprydding: før 18.10 kunne egen lederlenke lagre lederen SELV som sponsor (Sajid). Det kan
     aldri være riktig - fjern det, så neste åpning av den riktige sponsorens lenke kobler riktig. */
  if(load("aimpire.leader") && load("aimpire.leader") === load("aimpire.me")) store("aimpire.leader", null);
  const q = new URLSearchParams(location.search);
  /* Founder 16.10 kveld: den noeytrale lenken (uten ?l=) skal vaere noeytral. Foer
     ble den husket lederen brukt ogsaa der, saa alle som hadde trykket paa én
     leders lenke i gruppa «ble sendt til» den lederen etterpaa. Naa: sponsor bare
     naar lenken baerer en kode; den huskede lederen tilbys som ett trykk. Med
     kode gjelder fortsatt foerste sponsor (B-015). */
  /* Koden vaskes: stor/liten bokstav og et paahengt tegn fra WhatsApp (۔ ، . mellomrom)
     skal ikke gi «ingen sponsor» (gjennomgang 17.10, funn A6). */
  /* #267/#276 B-023: ?l= fra URL, ellers ventende kode (aimpire.leader.venter) naar
     SNAP/ark svarer etter at lista manglet. */
  let kode = String(q.get("l") || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if(!kode){
    const vent = load("aimpire.leader.venter");
    if(vent && /^[a-z0-9]{6}$/.test(vent)) kode = vent;
  }
  const gammelId = load("aimpire.leader");
  const husket = leaderById(gammelId);
  /* Den installerte appen paa egen telefon er ikke en delt lenke: der gjelder den
     huskede lederen, ellers aapner appen alltid uten sponsor (funn A3). */
  const egenApp = q.get("src") === "pwa" || (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  const fraUrl = leaderById(kode) || (egenApp && !kode ? husket : null);
  /* B-023 (founder 16.10 21:37): kobling bare via lenken en leder sender. Er en annen
     leder husket fra foer, SPOERRES det hvem som inviterte - ingen vinner stille.
     Unntak: lederen aapner sin EGEN lenke (e-posten ber om det) - da er det ikke en
     invitasjon, og selvvarselet under sponsoren sier fra (gjennomgang 17.10, funn 3). */
  const egen = !!(fraUrl && load("aimpire.me") && fraUrl.id === load("aimpire.me"));
  pendingConflict = (fraUrl && husket && husket.id !== fraUrl.id && !egen) ? { a: husket, b: fraUrl } : null;
  /* #276 B-023: laast id i localStorage + annen verifisert ?l= — aldri stille vinner.
     Mangler husket i REG ennå (SNAP/ENC underveis, eller SNAP uten den raden): behold
     aimpire.leader, legg ny kode i venter. «Faller bort» (fjernet leder) gjelder bare
     naar lista er fersk OG ingen ny konkurrerende ?l= prøver å kapre. */
  const laastMotNy = !!(gammelId && fraUrl && gammelId !== fraUrl.id && !egen && !pendingConflict);
  /* #152 (founder 18.10 17:48, Sajid via Najmas lenke): egen lenke som ennå ikke er godkjent ga en
     tom side uten navn og uten valg. Nå: sier fra at den venter, og sponsoren (Najma) står urørt. */
  EGEN_VENTER = !!(kode && load("aimpire.me") === kode && !leaderById(kode) && REG_FRESH);
  const lr = fraUrl && !pendingConflict && !laastMotNy ? fraUrl : null;
  if(lr){
    sponsorUrl = validRef(lr.link); sponsorName = lr.name; sponsorVerified = true;
    /* Første gang denne telefonen kobles til en sponsor: en liten feiring ved navnet. */
    if((!husket || husket.id !== lr.id) && !egen){
      setTimeout(function(){ feirVed(document.querySelector("#spon .who"), 20); vibrer(10); }, 650);
    }
    /* #152: egen lenke er ikke en invitasjon - den skal aldri overskrive sponsoren denne telefonen har. */
    if(!egen){ store("aimpire.leader", lr.id); store("aimpire.leader.venter", null); }
  } else {
    sponsorUrl = null; sponsorName = ""; sponsorVerified = false;
    /* #155 F9: ukjent kode betyr ikke «fjernet» (dekrypteringen kan ha feilet) - sponsoren glemmes ikke stille. */
    /* #267 B + lokal review #276: husk ?l= i aimpire.leader.venter — rør ALDRI
       aimpire.leader før koden er verifisert (leaderById). Ellers er !leaderById(gammel)
       alltid sann naar lista mangler, og en ny ?l= kaprer laast sponsor (B-023). */
    if(kode && /^[a-z0-9]{6}$/.test(kode) && load("aimpire.me") !== kode){
      store("aimpire.leader.venter", kode);
    }
  }
  if(pendingConflict){
    store("aimpire.leader.venter", null);
    try{ history.replaceState(null, "", location.pathname + "?l=" + pendingConflict.b.id + location.hash); }catch(e){}
    return;
  }
  /* Koden blir staaende i adressefeltet, saa et bokmerke eller en deling
     tar sponsoren med seg. Gamle ?ref=-lenker vaskes bort. */
  const id = sponsorVerified ? lr.id : "";
  const want = id ? "?l=" + id : "";
  if(PAGE !== "leaders" && location.search !== want && (id || q.has("ref") || q.has("by"))){
    try{ const lq = want && /\?l=/.test(want) ? (want + "&lang=" + encodeURIComponent(lang)) : want; history.replaceState(null, "", location.pathname + lq + location.hash); }catch(e){}   /* funn 10: behold spraaket */
  }
}
/* Hvilke steg som er gjort. Lagres lokalt per leser - aldri sendt noe sted. */
function doneSet(){
  /* Steg 6 (appene) kom inn 15.10. Avkryssing lagret foer det, for steg 6-9,
     flyttes ett hakk, saa ingen ser feil steg som gjort. Kjoeres én gang. */
  if(load("aimpire.done.v") !== "2"){
    const gml = (load("aimpire.done") || "").split(",").filter(function(x){ return x !== ""; });
    store("aimpire.done", gml.map(function(x){ const n = +x; return String(n >= 5 ? n + 1 : n); }).join(",") || null);
    store("aimpire.done.v", "2");
  }
  const raw = load("aimpire.done") || "";
  return new Set(raw.split(",").filter(function(x){ return x !== ""; }));
}
/* Et langt steg er mange smaa handlinger. Hver linje kan hukes av for seg, saa
   man ser hvor man er midt i steget - og slipper aa holde tretten trykk i hodet.
   Ingen nye tekster: linjene finnes allerede. */
function subSet(){
  const raw = load("aimpire.sub") || "";
  return new Set(raw.split(",").filter(function(x){ return x !== ""; }));
}
function subSave(set){ store("aimpire.sub", Array.from(set).join(",") || null); }
function toggleSub(idx, n, total){
  const set = subSet(), k = idx + ":" + n;
  if(set.has(k)) set.delete(k); else set.add(k);
  subSave(set);
  /* Alle linjer huket av = steget er gjort. Fjerner man én, er det ikke det. */
  let gjort = 0;
  for(let i = 0; i < total; i++) if(set.has(idx + ":" + i)) gjort++;
  const d = doneSet(), ks = String(idx);
  if(gjort === total) d.add(ks); else d.delete(ks);
  store("aimpire.done", Array.from(d).join(",") || null);
  render();
}
const LESIKON = { size: "\uD83D\uDCCF", mind: "\uD83E\uDDE0", time: "\uD83D\uDD52", gold: "\uD83E\uDE99", candle: "\uD83D\uDD6F\uFE0F", corr: "\uD83D\uDD17", swap: "\uD83C\uDF19", regime: "\uD83D\uDCC8" };
/* Skjermbilder: trykk = stort bilde; trykk paa en forklaring = lys opp pekeren. */
document.addEventListener("click", function(e){
  const t = e.target;
  const box = t.closest && t.closest(".shotbox");
  if(box){ box.remove(); return; }
  const shot = t.closest && t.closest(".shot");
  if(shot && !shot.closest(".shotbox")){
    const ov = document.createElement("div"); ov.className = "shotbox"; ov.setAttribute("role", "dialog");
    ov.appendChild(shot.cloneNode(true)); document.body.appendChild(ov); return;
  }
  const li = t.closest && t.closest(".keys li");
  if(li){
    const ul = li.parentNode, i = Array.prototype.indexOf.call(ul.children, li);
    let fig = ul.previousElementSibling; while(fig && !fig.classList.contains("shot")) fig = fig.previousElementSibling;
    if(!fig) return;
    const pins = fig.querySelectorAll(".pin");
    pins.forEach(function(p){ p.classList.remove("lys"); }); ul.querySelectorAll("li").forEach(function(x){ x.classList.remove("lys"); });
    if(pins[i]){ pins[i].classList.add("lys"); li.classList.add("lys"); fig.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(function(){ pins[i].classList.remove("lys"); li.classList.remove("lys"); }, 2600); }
  }
});
document.addEventListener("keydown", function(e){ if(e.key === "Escape"){ const b = document.querySelector(".shotbox"); if(b) b.remove(); } });
function quizBox(Q, idx, G){
  const d = el("div", "qz");
  d.appendChild(el("b", "qzt", G.quiz_t || ""));
  d.appendChild(el("p", null, Q.q));
  const svar = load("aimpire.quiz." + idx);
  const vis = function(valgt){
    [...d.querySelectorAll(".qzb")].forEach(function(b){
      b.setAttribute("aria-pressed", String(+b.dataset.i === valgt));
      /* Funn 9: feil svar laaser ikke - man kan proeve igjen. */
      b.disabled = valgt === Q.right || +b.dataset.i === valgt;
    });
    const gammel = d.querySelector(".qzw"); if(gammel) gammel.remove();
    const w = el("p", "qzw");
    if(valgt !== Q.right && G.quiz_again) w.appendChild(el("b", null, G.quiz_again + " "));
    w.appendChild(document.createTextNode(Q.why));
    d.appendChild(w);
  };
  Q.a.forEach(function(tekst, i){
    const b = el("button", "qzb", tekst); b.type = "button"; b.dataset.i = String(i);
    b.onclick = function(){ store("aimpire.quiz." + idx, String(i)); vis(i); if(i === Q.right){ feirVed(b, 18); vibrer(12);
      if(String(idx).indexOf("les-") === 0) setTimeout(function(){ try{ render(); }catch(e){} }, 900); } };
    d.appendChild(b);
  });
  if(svar !== null && svar !== "") vis(+svar);
  return d;
}
function actions(txt, idx){
  if(txt.indexOf("\n") === -1) return el("p", null, txt);
  const rows = txt.split("\n").filter(function(s){ return s.trim(); });
  const set = subSet();
  const ul = el("ul", "acts subs");
  rows.forEach(function(s, n){
    const li = document.createElement("li");
    const on = set.has(idx + ":" + n);
    const b = el("button", "sub", on ? "\u2713" : "");
    b.type = "button";
    b.setAttribute("aria-pressed", String(on));
    b.setAttribute("aria-label", s.slice(0, 60));
    b.onclick = function(){ toggleSub(idx, n, rows.length); };
    li.appendChild(b);
    li.appendChild(el("span", null, s));
    if(on) li.className = "on";
    ul.appendChild(li);
  });
  return ul;
}
/* Feiringer v2 (founder 17.10 05:21: «ikke noe feiringer»). v1 var 12 små firkanter i
   0,8 s, og bare ved avhuking - i praksis usett. v2: større gnister med tyngdekraft, et
   en liten «✓ 3/10»-pille når et steg krysses av (ingen konfetti – guiden har innskuddssteget, #327) (tall og tegn,
   ingen tekst - virker likt på alle fem språk). Brukes ved: avhuket steg, alle steg,
   riktig quizsvar, kopiert kode, ny sponsor koblet, ledersøknad sendt.
   Redusert bevegelse: ingen partikler, men pillen og vibrasjonen vises fortsatt. */
const FEST_FARGER = ["#15D8C4", "#C21FBF", "#FBE16B", "#1B4FD8", "#E04DDE", "#FFFFFF"];
function stilleBevegelse(){
  try{ return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); }catch(e){ return false; }
}
function partikkel(x, y, farge, str){
  const d = document.createElement("i");
  const rund = Math.random() < .45;
  d.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;width:" + str + "px;height:" +
    (rund ? str : Math.round(str * 1.6)) + "px;border-radius:" + (rund ? "50%" : "2px") + ";background:" + farge +
    ";pointer-events:none;will-change:transform,opacity";
  /* Eget lag som klipper ved skjermkanten: partikler som fløy ut, gjorde siden bredere og
     sidelengs-drabar paa telefon (founder 18.10 00:01). */
  let lag = document.getElementById("fxlag");
  if(!lag){ lag = document.createElement("div"); lag.id = "fxlag"; lag.setAttribute("aria-hidden", "true"); document.body.appendChild(lag); }
  lag.appendChild(d);
  return d;
}
function gnist(x, y, antall){
  try{
    if(stilleBevegelse() || !Element.prototype.animate) return;
    for(let j = 0; j < antall; j++){
      const d = partikkel(x, y, FEST_FARGER[j % FEST_FARGER.length], 5 + Math.round(Math.random() * 4));
      const v = (j / antall) * 6.283 + Math.random() * .7;
      const r = 50 + Math.random() * 70;
      const dx = Math.cos(v) * r, dy = Math.sin(v) * r - 40;
      d.animate([
        { transform: "translate(-50%,-50%) translate(0,0) rotate(0)", opacity: 1 },
        { transform: "translate(-50%,-50%) translate(" + dx + "px," + dy + "px) rotate(" + (180 + Math.random() * 200) + "deg)", opacity: 1, offset: .55 },
        { transform: "translate(-50%,-50%) translate(" + dx * 1.15 + "px," + (dy + 70 + Math.random() * 50) + "px) rotate(" + (360 + Math.random() * 200) + "deg)", opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.75,.35,1)" }).onfinish = function(){ d.remove(); };
    }
  }catch(e){}
}
function konfetti(){
  try{
    if(stilleBevegelse() || !Element.prototype.animate) return;
    const n = innerWidth < 600 ? 70 : 110;
    for(let j = 0; j < n; j++){
      const x = Math.random() * innerWidth;
      const d = partikkel(x, -16, FEST_FARGER[j % FEST_FARGER.length], 6 + Math.round(Math.random() * 4));
      const fall = innerHeight + 40, drift = (Math.random() - .5) * 160;
      d.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: "translate(" + drift + "px," + fall + "px) rotate(" + (540 + Math.random() * 540) + "deg)", opacity: .9 }
      ], { duration: 2200 + Math.random() * 1600, delay: Math.random() * 600, easing: "cubic-bezier(.25,.6,.45,1)", fill: "backwards" })
        .onfinish = function(){ d.remove(); };
    }
  }catch(e){}
}
function pille(tekst){
  try{
    let p = document.getElementById("pille");
    if(!p){ p = document.createElement("div"); p.id = "pille"; p.setAttribute("aria-hidden", "true"); document.body.appendChild(p); }
    p.textContent = tekst;
    p.classList.remove("vis"); void p.offsetWidth; p.classList.add("vis");
    clearTimeout(p._t); p._t = setTimeout(function(){ p.classList.remove("vis"); }, 1900);
  }catch(e){}
}
/* Vibrer bare etter at brukeren har trykket på siden - ellers blokkerer nettleseren kallet
   og logger en feil (målt 17.10: sponsorfeiringen ved sideinnlasting). */
function vibrer(m){ try{ if(navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(m); }catch(e){} }
function feirVed(node, antall){
  if(!node) return;
  const r = node.getBoundingClientRect();
  gnist(r.left + r.width / 2, r.top + r.height / 2, antall);
}
document.addEventListener("visibilitychange", function(){
  document.documentElement.classList.toggle("paused", document.hidden);
});
/* Tiende besoek (kundegjennomgang 17.10 23:58): har kunden alt opprettet kontoen (steg 2),
   er «Registrer deg» ikke neste handling lenger - den store knappen blir «Fortsett: <neste
   steg>», og registreringen blir en liten lenke (ikke borte: kan trengs igjen). */
/* #136 (founder 18.10 04:21: «gir lite mening … finn en annen design og løsning, ikke fjern»):
   i stedet for en fargepille med «Neste: …» et kort som svarer paa det medlemmet lurer paa naar
   det kommer tilbake: hvor er jeg (oppsettet, steg X av 10, 10 biter), hvilket steg (ikon + navn),
   og hva gjoer jeg (Fortsett der du slapp). Hele kortet er ett trykk og aapner steget. */
const STEG_IKON = ["\uD83D\uDD17", "\uD83D\uDCDD", "\uD83D\uDD0C", "\uD83E\uDEAA", "\u23F3", "\uD83D\uDCF2", "\uD83D\uDCB5", "\uD83E\uDD16", "\uD83D\uDCCA", "\uD83D\uDCAC"];
function fortsettKnapp(){
  const d = doneSet(); if(!d.has("1")) return null;
  const G = C.guide[lang] || C.guide.en, U = C.guide_ui[lang] || C.guide_ui.en;
  const n = G.steps.findIndex(function(_, i){ return !d.has(String(i)); });
  const total = G.steps.length;
  const gjort = G.steps.filter(function(_, i){ return d.has(String(i)); }).length;
  const b = el("button", "fortkort"); b.type = "button";
  const ik = el("span", "fk-ik", n === -1 ? "\u2705" : (STEG_IKON[n] || "\u2022")); ik.setAttribute("aria-hidden", "true"); b.appendChild(ik);
  const tx = el("span", "fk-tx");
  if(n === -1){
    tx.appendChild(el("small", null, (U.all_done || "").replace("{total}", total)));
    tx.appendChild(el("b", null, U.all_done_go || ""));
  } else {
    tx.appendChild(el("small", null, (U.cont_label || "{n}/{total}").replace("{n}", n + 1).replace("{total}", total)));
    tx.appendChild(el("b", null, String(G.steps[n][0]).split(/\s+[\u2014\u2013]\s+/)[0]));
  }
  const seg = el("span", "fk-seg"); seg.setAttribute("aria-hidden", "true");
  for(let i = 0; i < total; i++) seg.appendChild(el("i", d.has(String(i)) ? "on" : (i === n ? "nu" : null)));
  tx.appendChild(seg);
  if(n !== -1 && U.cont_go) tx.appendChild(el("span", "fk-go", U.cont_go + " \u203A"));
  b.appendChild(tx);
  b.setAttribute("aria-label", tx.textContent);
  b.onclick = function(){ setView(n === -1 ? "earn" : "start"); };
  return b;
}
/* #136: reservelenken under fortsett-kortet. Kortet staar foerst (den som har huket av steg 1-2 er
   registrert); «Ikke registrert ennaa?» foran gjoer at en ny person som faar se siden paa en annens
   telefon, fortsatt finner registreringen. */
function litenReg(href, tekst){
  const SP = C.sponsor[lang] || C.sponsor.en;
  const a = el("a", "dlink regsmall"); a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
  if(SP.not_yet) a.appendChild(el("span", "ny", SP.not_yet + " "));
  a.appendChild(el("span", "rg", tekst));
  return a;
}
/* Stemme for spraaket, eller null. Romanisert urdu/arabisk har ingen egen stemme -> null. */
function stemmeFor(kode){
  try{
    if(!window.speechSynthesis || /_rm$/.test(kode)) return null;
    const want = kode === "no" ? /^(nb|no|nn)\b/i : new RegExp("^" + kode + "\\b", "i");
    const v = speechSynthesis.getVoices().filter(function(x){ return want.test(x.lang.replace("_", "-")); });
    return v.find(function(x){ return x.localService; }) || v[0] || null;
  }catch(e){ return null; }
}
try{ if(window.speechSynthesis) speechSynthesis.onvoiceschanged = function(){ try{ if(view === "start") render(); }catch(e){} }; }catch(e){}
/* Bygger banen for lyspunktet i piksler: SVG-en strekkes (preserveAspectRatio none), saa
   koordinatene skaleres til lagets faktiske stoerrelse. Tegnes paa nytt bare ved ny stoerrelse. */
function neonKomet(){
  try{
    /* Samme bane som foer, men som transform-punkter (grafikkortet) i stedet for offset-path. */
    const ro = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(ro || !document.body.animate) return;
    document.querySelectorAll(".neon .nt").forEach(function(nt, ix){
      const sv = nt.querySelector("svg"), p = sv && sv.querySelector("path.g1"); if(!p || !p.getTotalLength) return;
      const W = nt.offsetWidth, H = nt.offsetHeight; if(!W || !H) return;
      /* #215: profilert 19.10 (CPU x6): 625 ms ved oppstart, og «resize» kommer hver gang adresselinja paa Android
         skjules/vises under scrolling -> ny utregning midt i scrollen (hakking). Samme stoerrelse = ingenting aa gjoere. */
      if(nt._nkW === W && nt._nkH === H && nt.querySelector(".ncomet")) return; nt._nkW = W; nt._nkH = H;
      /* Punktene langs kurven avhenger bare av kurven (SVG-enheter), ikke av skjermen: regnes ut én gang og huskes.
         Ny hoeyde (adresselinja) = bare gange med ny skala. (Maalt: getPointAtLength 3,6 s av 3,8 s ved 10 skift.) */
      if(!p._nkPkt || p._nkPkt.length < 41){
        /* #204: 41 x getPointAtLength = ett hakk paa 350 ms paa billig Android. Regnes 6 om gangen i ledige oeyeblikk;
           kometen starter naar alle er klare (et par sekunder - ingen merker at den kommer litt senere). */
        if(p._nkJobb) return; p._nkJobb = true; const L = p.getTotalLength(), N = 40; p._nkPkt = p._nkPkt || [];
        const bit = function(){ const stopp = Math.min(N, p._nkPkt.length + 5); for(let i = p._nkPkt.length; i <= stopp; i++){ const q = p.getPointAtLength(L * i / N); p._nkPkt.push([q.x, q.y]); }
          p._nkJobb = false; nt._nkW = null; if(p._nkPkt.length > N) neonKomet(); else { p._nkJobb = true; (window.requestIdleCallback || setTimeout)(bit); } };
        (window.requestIdleCallback || setTimeout)(bit); return;
      }
      const sx = W / 1600, sy = H / 100, rammer = p._nkPkt.map(function(q){ return { transform: "translate(" + (q[0] * sx).toFixed(1) + "px," + (q[1] * sy).toFixed(1) + "px)" }; });
      let k = nt.querySelector(".ncomet"); if(!k){ k = document.createElement("i"); k.className = "ncomet"; k.setAttribute("aria-hidden", "true"); nt.appendChild(k); }
      if(k._anim) k._anim.cancel();
      k._anim = k.animate(rammer, { duration: ix ? 15000 : 11000, delay: ix ? -6000 : 0, iterations: Infinity, easing: "linear" });
    });
  }catch(e){}
}
window.addEventListener("load", function(){ setTimeout(function(){ (window.requestIdleCallback || setTimeout)(neonKomet); }, 400); });   /* #215: naar nettleseren er ledig */
let NK_T = null; window.addEventListener("resize", function(){ clearTimeout(NK_T); NK_T = setTimeout(neonKomet, 300); }, { passive: true });
function toggleStep(i){
  const set = doneSet(), k = String(i);
  const paa = !set.has(k);
  if(paa){
    const t = document.querySelector("#st-" + i + " .tick");
    feirVed(t, 22);
    vibrer(12);
  }
  if(paa) set.add(k); else set.delete(k);
  store("aimpire.done", Array.from(set).join(","));
  const G0 = C.guide[lang] || C.guide.en;
  if(paa){
    /* #327: ingen konfetti/feiring for guiden – den inneholder innskuddssteget (B-034, B-049: feiring bare der noe er lært eller oppnådd). Bare tellingen. */
    pille("\u2713 " + set.size + "/" + G0.steps.length);
  }
  /* Haken paa sirkelen gjelder hele steget: alle linjene foelger med. */
  const G = C.guide[lang] || C.guide.en, st = G.steps[i];
  if(st){
    const rows = String(st[1]).split("\n").filter(function(x){ return x.trim(); });
    const sub = subSet();
    rows.forEach(function(_, n){ if(paa) sub.add(i + ":" + n); else sub.delete(i + ":" + n); });
    subSave(sub);
  }
  render();
  /* Ferdig med et steg: ta medlemmet til TOPPEN av neste steg. Uten dette ble
     skjermen staaende der haken var, og man havnet nederst i neste steg
     (funnet 17.10 22:15, mobil 375 px). */
  if(paa){
    setTimeout(function(){
      const li = document.querySelector("#guide li.current");
      if(!li) return;
      const r = li.getBoundingClientRect();
      if(r.top < 60 || r.top > innerHeight * 0.55)
        li.scrollIntoView({ behavior: stilleBevegelse() ? "auto" : "smooth", block: "start" });
    }, 60);
  }
}
function clearSteps(){ store("aimpire.done", null); store("aimpire.sub", null); render(); }

function copyCode(btn, value, label){
  function done(){
    const tag = btn.querySelector(".c");
    if(tag) tag.textContent = (C.guide_ui[lang] || C.guide_ui.en).copied;
    feirVed(btn, 10); vibrer(8);
  }
  try{
    navigator.clipboard.writeText(value).then(done, function(){ fallback(); });
  }catch(e){ fallback(); }
  function fallback(){
    try{
      const t = document.createElement("textarea");
      t.value = value; t.setAttribute("readonly","");
      t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      const ok = document.execCommand("copy"); document.body.removeChild(t);
      if(ok) done();   /* funn A10: ingen «Copied» uten kopi */
    }catch(e2){}
  }
}

function destination(){
  return sponsorUrl
    ? { url:sponsorUrl.href, host:sponsorUrl.hostname, fp:fingerprint(sponsorUrl) }
    : { url:REF_HOUSE, host:null, fp:null };
}

/* Funn 3: utklippstavlen er sperret i mange app-nettlesere - et avvist løfte skal ikke gi «Noe gikk galt». */
function klipp(t){ try{ return navigator.clipboard.writeText(t).then(function(){ return true; }, function(){ return false; }); }catch(e){ return null; } }
function makeLink(){
  /* Funn 4: dobbelttrykk mens lista lastes sendte soeknaden to ganger (Mateen). */
  if(window.__ldSending || window.__ldVenter) return;
  window.__ldVenter = true;
  const hb0 = $("ld-btn"); if(hb0 && !hb0.classList.contains("sent")) hb0.disabled = true;
  (REG_FRESH ? Promise.resolve() : loadReg())
    .then(function(){ const u = validRef($("ld-in").value); return u ? sikreLedere([codeOf(u)]) : null; })
    .then(function(){ window.__ldVenter = false; if(hb0 && !hb0.classList.contains("sent")) hb0.disabled = false; makeLinkNow(); },
          function(){ window.__ldVenter = false; if(hb0) hb0.disabled = false; });
}
/* Lederens lenke skal kunne kopieres med ett trykk - ogsaa der utklippstavlen
   er sperret i innebygde nettlesere (founder 17.10). */
function visLenke(ut, verdi, aktiv){   /* aktiv = lederen er godkjent, lenka virker */
  const UI = C.guide_ui[lang] || C.guide_ui.en;
  const kode = el("code", "mylink", verdi);
  kode.setAttribute("dir", "ltr");
  ut.appendChild(kode);
  const kb = el("button", "copyb"); kb.type = "button";
  kb.appendChild(el("span", "c", UI.copy || "Copy"));
  kb.onclick = function(){ copyCode(kb, verdi, "link"); };
  ut.appendChild(kb);
  /* Del-knapp (founder 17.10 19:12): telefonens egen delingsmeny - WhatsApp, Instagram,
     kontakter, SMS. Uten den (PC): WhatsApp, Telegram, SMS og e-post. Meldingen sier
     alltid «åpne i Chrome eller Safari» (minne: hub-lenker deles aldri uten den linja). */
  /* Founder 17.10 19:14: bare del en lenke som virker - ikke foer godkjenning. */
  if(aktiv && /^https?:\/\//.test(verdi)) delKnapp(ut, verdi, "copyb shareb");
}
/* Del-knapp (founder 17.10 19:12): telefonens egen delingsmeny - WhatsApp, Instagram,
   kontakter, SMS. Uten den (PC): WhatsApp, Telegram, SMS og e-post. Meldingen sier
   alltid «åpne i Chrome eller Safari» (minne: hub-lenker deles aldri uten den linja). */
/* #227 (Mateen 19.10: «ask Mateen for help … only refreshes at his screen and doesn't allow him to send a message
   elsewhere»): foer gikk knappen rett til wa.me med window.open - uten valg, og i nettlesere inne i apper (Element,
   Instagram) blir window.open ofte en navigering i samme vindu. Naa: samme meny som «Del lenken» - ekte lenker.
   WhatsApp gaar rett til lederen naar nummeret finnes (#172), ellers til valgfri kontakt. */
/* #227 (founder 19.10: «det stod ikke hvilken task og sted han trengte hjelp med»): meldingen faar med
   1) steget i guiden de staar paa (foerste ugjorte, samme tekst som guideknappen bruker: ask_msg), og
   2) hvor i appen de er: visning › fane › seksjonen paa skjermen, pluss en lenke rett dit (#visning).
   Bare navn som allerede vises i appen - ingen ny oversettelse. */
function hjelpSted(){
  const M = C.menu && (C.menu[lang] || C.menu.en) || {}, J = C.jump && (C.jump[lang] || C.jump.en) || {};
  const it = (M.items || []).find(function(x){ return x[0] === view; });
  const deler = [view in TBREKKE_TEKST && M.tabs ? M.tabs[TBREKKE_TEKST[view]] : (it ? it[1] : view)];
  if(TABS[view] && J[tab]) deler.push(J[tab]);
  try{ const midt = innerHeight * 0.4; let best = null;
    document.querySelectorAll(".sec").forEach(function(sc){ if(!sc.offsetParent) return; const r = sc.getBoundingClientRect();
      if(r.top <= midt && r.bottom > 80){ const h = sc.querySelector("h2"); if(h && h.textContent.trim()) best = h.textContent.trim(); } });
    if(best && deler.indexOf(best) < 0) deler.push(best); }catch(e){}
  return "\uD83D\uDCCD " + deler.join(" \u203A ") + "\n" + location.origin + location.pathname + "#" + view;
}
function hjelpTekst(navn){
  const U = C.guide_ui[lang] || C.guide_ui.en, G = C.guide[lang] || C.guide.en;
  let t = U.ask_gen.replace("{N}", navn);
  try{ const d = doneSet(), f = G.steps.findIndex(function(_, i){ return !d.has(String(i)); });
    if(f >= 0 && U.ask_msg) t = U.ask_msg.replace("{N}", navn).replace("{n}", f + 1).replace("{t}", G.steps[f][0]); }catch(e){}
  return t + "\n\n" + hjelpSted();
}
function spoerMeny(knapp, tekst, waNr, navn){
  const gml = knapp.nextElementSibling;
  if(gml && gml._spoer){ const var_ = !gml.hidden; gml.remove(); if(var_) return; }
  const U = C.guide_ui[lang] || C.guide_ui.en, L = C.leaders[lang] || C.leaders.en;
  const meny = el("div", "sharemenu"); meny._spoer = true;
  const enc = encodeURIComponent(tekst);
  const url = typeof sponsorUrl === "string" && /^https?:\/\//.test(sponsorUrl) ? sponsorUrl : location.origin + location.pathname;
  [["WhatsApp" + (waNr && navn ? " \u00b7 " + navn : ""), "https://wa.me/" + (waNr || "") + "?text=" + enc],
   ["Telegram", "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + enc],
   ["SMS", "sms:?&body=" + enc]].forEach(function(p){
    const a = el("a", null, p[0]); a.href = p[1]; a.target = "_blank"; a.rel = "noopener noreferrer"; a.dir = "auto"; meny.appendChild(a); });
  if(navigator.share){ const d = el("button", null, L.share_short || L.share_btn || "Share"); d.type = "button";
    d.onclick = function(){ navigator.share({ text: tekst }).catch(function(){}); }; meny.appendChild(d); }
  const k = el("button", null, U.copy || "Copy"); k.type = "button";
  k.onclick = function(){
    const pr = navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(tekst) : Promise.reject();
    pr.then(function(){ k.textContent = U.copied || "Copied"; }).catch(function(){ try{ window.prompt(U.copy || "Copy", tekst); }catch(e){} });
  };
  meny.appendChild(k);
  knapp.after(meny);
}
function delKnapp(ut, verdi, cls, kort){
  const L = C.leaders[lang] || C.leaders.en;
  const msg = (L.share_msg || "") + "\n" + verdi;
  const sb = el("button", cls); sb.type = "button";
  sb.appendChild(el("span", "c", (kort && L.share_short) || L.share_btn || "Share"));
  sb.setAttribute("aria-label", L.share_btn || "Share");
  const meny = el("div", "sharemenu"); meny.hidden = true;
  const enc = encodeURIComponent(msg);
  [["WhatsApp", "https://wa.me/?text=" + enc], ["Telegram", "https://t.me/share/url?url=" + encodeURIComponent(verdi) + "&text=" + encodeURIComponent(L.share_msg || "")],
   ["SMS", "sms:?&body=" + enc], ["E-mail", "mailto:?subject=Aimpire&body=" + enc]].forEach(function(p){
    const a2 = el("a", null, p[0]); a2.href = p[1]; a2.target = "_blank"; a2.rel = "noopener noreferrer"; meny.appendChild(a2);
  });
  sb.onclick = function(){
    if(navigator.share){ navigator.share({ title: "Aimpire", text: L.share_msg || "", url: verdi }).catch(function(e){ if(!e || e.name !== "AbortError") meny.hidden = false; }); }
    else { meny.hidden = !meny.hidden; }
  };
  ut.appendChild(sb); ut.appendChild(meny);
  return sb;
}
function markerFeil(id){
  const inp = $(id); if(!inp) return;
  inp.classList.add("felt-feil");
  inp.addEventListener("input", function en(){ inp.classList.remove("felt-feil"); inp.removeEventListener("input", en); });
  inp.focus();
}
/* 19.10: lokal testing (127.0.0.1 / localhost / *.test) skal ALDRI sende til det ekte Google-skjemaet -
   en test sendte en «Testleder»-rad til arket. Lokalt lagres innsendingen bare i window.__testSkjema. */
function sendSkjema(url, body){
  if(/^(127\.|localhost$|\[::1\]$)|\.(test|localhost)$/.test(location.hostname)){
    (window.__testSkjema = window.__testSkjema || []).push(String(body));
    return Promise.resolve();
  }
  return fetch(url, { method: "POST", mode: "no-cors", body: body });
}
function makeLinkNow(){
  const u = validRef($("ld-in").value), out = $("ld-out"), L = C.leaders[lang] || C.leaders.en;
  out.hidden = false; out.textContent = "";
  const b = document.createElement("b");
  if(!u){ out.className = "out bad"; b.textContent = L.bad; out.appendChild(b); markerFeil("ld-in"); return; }
  /* #155 F2: limte medlemmet inn SPONSORENS lenke, ble den lagret som «min» og sponsoren gikk tapt. */
  if(codeOf(u) === load("aimpire.leader") && L.is_sponsor){ out.className = "out bad"; b.textContent = L.is_sponsor; out.appendChild(b); markerFeil("ld-in"); return; }
  /* Lenken skal alltid baere Aimpire-adressen. Lages den fra den gamle
     adressen, ville den ellers ha baaret founders brukernavn videre til alle
     han inviterer. Lokalt beholder vi local host, ellers kunne ingen teste. */
  function hubBase(){
    const h = location.hostname;
    const lokal = !h || h === "localhost" || h === "127.0.0.1"
      || /\.local$/.test(h) || /^\d+\.\d+\.\d+\.\d+$/.test(h);
    const kanon = C.canonical || "";
    if(!lokal && kanon) return kanon.replace(/\/+$/, "") + "/";
    return location.origin + location.pathname.replace(/(ledere|index)\.html$/, "");
  }
  const lr = leaderById(codeOf(u));
  let text;
  if(lr){
    text = lederUrl(hubBase(), lr.id, lr.name);
    store("aimpire.me", lr.id);
    out.className = "out"; b.textContent = L.ok;
  } else {
    const nm = cleanName($("ld-name").value);
    if(!nm){ out.className = "out bad"; b.textContent = L.name_hint; out.appendChild(b); markerFeil("ld-name"); return; }
    /* E-posten brukes bare til én beskjed: at lenka er godkjent og virker. */
    const mail = String($("ld-mail").value || "").trim();
    const F = C.leader_signup || {};
    if(F.mail_field && !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(mail)){
      out.className = "out bad"; b.textContent = L.mail_hint; out.appendChild(b); markerFeil("ld-mail"); return;
    }
    /* Skjemaet krever «hvem inviterte deg» (founder 16.10). Mangler det, avviser
       Google innsendingen stille - derfor stoppes det her, med beskjed. */
    const spons = cleanName($("ld-spons").value);
    if(F.sponsor_field && !spons){ out.className = "out bad"; b.textContent = L.spons_hint || L.name_hint; out.appendChild(b); markerFeil("ld-spons"); return; }
    /* #193: ny soeknad krever avkryssing for at lenken er fra IB-portalen */
    const sk = $("ld-srcchk");
    if(sk && L.src && !sk.checked){ out.className = "out bad"; b.textContent = L.src.need; out.appendChild(b); const kk = $("ld-srcok"); if(kk){ kk.classList.add("feil"); kk.scrollIntoView({ block: "center" }); } return; }
    /* #172: et kanalfelt som ikke er et gyldig brukernavn/nummer stopper innsendingen med rød kant. */
    if(sosUgyldig("ld-sos-")){ const d = document.querySelector("#ld-sos details"); if(d) d.open = true; sosUgyldig("ld-sos-"); out.hidden = true; return; }
    if(F.form && F.name_field && F.link_field){
      /* Ikke godkjent: soeknaden gaar rett til founders Google-skjema med ett
         trykk. Lederen ser aldri skjemaet. */
      /* Founder 17.10 19:00: ÉN knapp. «Hent lenken min» sender soeknaden direkte og blir
         til «Søknad sendt ✓» - ingen ekstra «Søk om godkjenning» etter. Samme lenke
         sendes bare én gang fra denne telefonen (Mateen sendte tre ganger). */
      const hb = $("ld-btn");
      const allerede = load("aimpire.applied") === codeOf(u);
      const go = { disabled: false };
      const send = function(){
        go.disabled = true; if(hb){ hb.disabled = true; hb.textContent = L.sending || "…"; }
        const body = new URLSearchParams(); body.set(F.name_field, nm); body.set(F.link_field, u.href);
        if(F.mail_field && mail) body.set(F.mail_field, mail);
        if(F.sponsor_field && spons) body.set(F.sponsor_field, spons);
        /* Spraaket lederen leser siden paa foelger med, saa e-posten kommer paa
           det samme spraaket. Romanisert urdu/arabisk regnes som urdu/arabisk. */
        if(F.lang_field) body.set(F.lang_field, baseOf(lang));
        /* #161: frivillig - bare med naar lederen selv har krysset av. */
        /* #167: oensket lenkenavn (bare hvis gyldig; skriptet sjekker ledig paa nytt ved godkjenning) */
        if(F.linkname_field){ const ln = rensLenkenavn(($("ld-lenkenavn") || {}).value); if(ln.length >= 3) body.set(F.linkname_field, ln); }
        sosVerdier("ld-sos-").forEach(function(x){ body.set(x[0], x[1]); });   /* #172 frivillig */
        if(F.list_field){ const v = listeValg(); body.set(F.list_field, v.ja ? "yes" : "no");
          if(v.ja && F.langs_field && v.sp.length) body.set(F.langs_field, v.sp.join(" "));
          if(v.ja && F.country_field && v.land) body.set(F.country_field, v.land); }
        window.__ldSending = true;
        sendSkjema(F.form, body)
          .then(function(){
            window.__ldSending = false;
            /* Lenken finnes allerede: koden regnes ut av partnerlenka. Lederen
               faar den med én gang og trenger ingen e-post - den begynner aa
               virke i det founder huker av. */
            out.textContent = ""; out.className = "out";
            store("aimpire.applied", codeOf(u));
            if(hb){ hb.disabled = true; hb.textContent = L.sent_btn || L.applied; hb.classList.add("sent"); }
            /* #166 (founder 19.10): ingen lenke foer godkjenning - den virker ikke ennaa og skaper
               uro. Lederen faar den i godkjennings-e-posten, og her naar siden ser at den er godkjent. */
            out.appendChild(el("b", null, L.applied));
            out.appendChild(el("p", "vnote", L.applied_wait || ""));
            store("aimpire.me", codeOf(u)); store("aimpire.me.navn", nm);
            feirVed(out, 26); vibrer([12, 50, 12]);
            ldStatus();
          })
          .catch(function(){
            window.__ldSending = false;
            if(hb){ hb.disabled = false; hb.textContent = L.button; }
            out.hidden = false; out.className = "out bad"; out.textContent = ""; out.appendChild(el("b", null, L.apply_fail));   /* #155 F4 */
          });
      };
      if(allerede){
        /* Allerede sendt herfra: vis lenken og knappen som «sendt», uten ny innsending. */
        out.className = "out"; out.textContent = "";
        if(hb){ hb.disabled = true; hb.textContent = L.sent_btn || L.applied; hb.classList.add("sent"); }
        out.appendChild(el("b", null, L.applied));
        out.appendChild(el("p", "vnote", L.applied_wait || ""));
        return;
      }
      out.hidden = true;
      send();
      return;
    }
    /* Uten skjema: linja founder limer inn i ledere.txt, ferdig kopiert. */
    text = nm + " | " + u.href;
    out.className = "out wait"; b.textContent = L.pending_line || L.pending;
  }
  out.appendChild(b);
  visLenke(out, text, !!lr);
  if(lr) bioBoks(out, text);
  klipp(text);
}
/* #95 (founder 17.10 15:35): lederen skal slippe aa soeke paa nytt. Har denne
   telefonen laget eller faatt en lederlenke foer, vises den med en gang oeverst
   paa ledersiden - med kopier og bio-boksen. Ingenting sendes noe sted. */
/* #152 (founder 18.10 17:48 «mange trykker på søk-knappen for mye»): når denne telefonen har søkt,
   skjules hele skjemaet. Øverst: grønn hake og status - venter eller godkjent. Liten lenke for å søke på nytt. */
function ldStatus(){
  const me = load("aimpire.me"), tool = document.querySelector("#s-leaders .tool"), L = C.leaders[lang] || C.leaders.en;
  if(!me || !tool || !L.st_wait_t) return;
  tool.classList.add("ldsendt"); document.documentElement.classList.add("ldsendt");
  let st = $("ld-status");
  if(!st){ st = el("div", "ldstatus"); st.id = "ld-status"; tool.insertBefore(st, tool.firstChild); }
  st.textContent = "";
  const ok = !!leaderById(me);
  st.classList.toggle("ok", ok);
  /* #233: tilstand paa siden - godkjent («Min side») eller venter (stripen viser hvor langt man er kommet) */
  document.documentElement.classList.toggle("ldok", ok); document.documentElement.classList.toggle("ldvent", !ok);
  try{ const LB = C.ldbtn && (C.ldbtn[lang] || C.ldbtn.en), h = $("t-leaders");
    if(h){ if(!h.dataset.orig) h.dataset.orig = h.textContent; h.textContent = ok && LB && LB.mine ? LB.mine : h.dataset.orig; }
    const pa = document.querySelectorAll("#sh-s-leaders .shpath li");
    pa.forEach(function(li, i){ li.classList.toggle("ok", !ok && i < pa.length - 1); li.classList.toggle("naa", !ok && i === pa.length - 1); }); }catch(e){}
  st.appendChild(el("span", "ldv", "\u2713"));
  const tx = el("div", "ldtx"); tx.appendChild(el("b", null, ok ? L.st_ok_t : L.st_wait_t));
  if(!ok) tx.appendChild(el("p", null, L.st_wait_b));
  st.appendChild(tx);
  tool.querySelectorAll(".ldagain").forEach(function(x){ x.remove(); });
  const ig = el("button", "ldagain", L.again); ig.type = "button";
  ig.onclick = function(){ store("aimpire.me", null); store("aimpire.applied", null);   /* #155 F3/F6: et nytt forsøk skal kunne sendes, og neste tegning skal ikke skjule skjemaet igjen */
    tool.classList.remove("ldsendt"); document.documentElement.classList.remove("ldsendt", "ldok", "ldvent"); st.remove();
    try{ const h = $("t-leaders"); if(h && h.dataset.orig) h.textContent = h.dataset.orig; document.querySelectorAll("#sh-s-leaders .shpath li").forEach(function(li){ li.classList.remove("ok", "naa"); }); }catch(e){}
    const i = $("ld-in"); if(i) i.focus(); };
  tool.appendChild(ig);
}
function visLagretLenke(){
  const me = load("aimpire.me"), out = $("ld-out"), L = C.leaders[lang] || C.leaders.en;
  if(!me || !out || !L.saved || (out.childNodes.length && !out.hidden)) return;
  const h = location.hostname, lokal = !h || h === "localhost" || h === "127.0.0.1" || /^\d+\.\d+\.\d+\.\d+$/.test(h);
  const base = (!lokal && C.canonical) ? C.canonical.replace(/\/+$/, "") + "/" : location.origin + location.pathname.replace(/(ledere|index)\.html$/, "");
  /* #166: lenken vises bare naar lederen er godkjent. Foer det viser ldStatus «søknaden er sendt». */
  const vis = function(){
    if(out.querySelector(".copyb")) return;
    const url = lederUrl(base, me, (leaderById(me) || {}).name || load("aimpire.me.navn"));
    out.hidden = false; out.textContent = ""; out.className = "out";
    out.appendChild(el("b", null, L.saved));
    visLenke(out, url, true);
    bioBoks(out, url);
    qrBoks(out, url);
    profilBoks(out, me);   /* #172 */
    ldStatus();
  };
  ldStatus();
  /* Navnekartet foerst, saa lenken som vises er navnelenken (aimpire.github.io/asma). */
  hentNavnekart().then(function(){ return REG_FRESH && leaderById(me) ? null : (REG_FRESH ? null : loadReg()); })
    .then(function(){ return leaderById(me) ? null : sikreLedere([me]); })
    .then(function(){ if(leaderById(me)) vis(); }).catch(function(){});
}
/* #157: invitasjonskort med QR for ledere som moeter folk ansikt til ansikt. QR-koderen
   (assets/qrcode.min.js, MIT) lastes foerst ved trykk. Lenken er lederens egen ?l= uten
   spraak, saa den som skanner faar velge spraak selv i porten. */
function qrBoks(out, url){
  const L = C.leaders[lang] || C.leaders.en, Q = L.qr; if(!Q || out.querySelector(".qrb")) return;
  const kn = el("button", "copyb qrb", Q.btn); kn.type = "button";
  kn.onclick = function(){ kn.disabled = true;
    qrLast().then(function(){ return qrKort(url, Q); }).then(function(b){ kn.disabled = false; if(!b) return;
      delBilde(b, "aimpire-invite.png", url + aapneLinje(), function(){ kn.textContent = Q.saved; setTimeout(function(){ kn.textContent = Q.btn; }, 2600); }); },
      function(){ kn.disabled = false; }); };
  out.appendChild(kn);
}
function qrLast(){
  if(window.qrcode) return Promise.resolve();
  return new Promise(function(ok, feil){ const sc = document.createElement("script"); sc.src = "assets/qrcode.min.js"; sc.onload = ok; sc.onerror = feil; document.head.appendChild(sc); });
}
function qrKort(url, Q){
  const W = 1080, H = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const x = cv.getContext("2d"), rtl = document.documentElement.dir === "rtl";
  const face = getComputedStyle(document.body).fontFamily, num = '"Archivo",' + face;
  const me = load("aimpire.me"), lr = leaderById(me), navn = (lr && lr.name) || "";
  const ferdig = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load("800 64px Archivo"), document.fonts.load("600 40px " + face)]).catch(function(){}) : Promise.resolve();
  return ferdig.then(function(){
    const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#0B1630"); g.addColorStop(1, "#1C0B2A"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    const lg = x.createLinearGradient(80, 0, W - 80, 0); lg.addColorStop(0, "#15D8C4"); lg.addColorStop(.55, "#1B4FD8"); lg.addColorStop(1, "#C21FBF");
    x.fillStyle = lg; x.fillRect(0, 0, W, 12);
    x.textAlign = "center"; x.direction = "ltr"; x.font = "800 56px " + num; x.fillStyle = "#fff"; x.fillText("Aimpire", W / 2, 130);
    x.direction = rtl ? "rtl" : "ltr";
    const tittel = navn ? Q.title.replace("{N}", navn) : "Aimpire";
    let ts = 74; do{ x.font = "800 " + ts + "px " + face; ts -= 4; }while(x.measureText(tittel).width > W - 160 && ts > 40);
    x.fillStyle = lg; x.fillText(tittel, W / 2, 250);
    x.font = "600 38px " + face; x.fillStyle = "rgba(255,255,255,.82)"; x.fillText(Q.sub, W / 2, 320);
    /* QR: hvit flate med stille sone, svarte moduler - leses av alle kameraer */
    const q = qrcode(0, "M"); q.addData(url); q.make();
    const n = q.getModuleCount(), S = 700, cell = Math.floor(S / (n + 8)), side = cell * (n + 8), qx = (W - side) / 2, qy = 390;
    x.fillStyle = "#fff"; x.beginPath(); if(x.roundRect) x.roundRect(qx, qy, side, side, 28); else x.rect(qx, qy, side, side); x.fill();
    x.fillStyle = "#0B1630";
    for(let r = 0; r < n; r++) for(let k = 0; k < n; k++) if(q.isDark(r, k)) x.fillRect(qx + (k + 4) * cell, qy + (r + 4) * cell, cell, cell);
    let y = qy + side + 80;
    let ss = 38; do{ x.font = "700 " + ss + "px " + face; ss -= 2; }while(x.measureText(Q.scan).width > W - 140 && ss > 24);
    x.fillStyle = "#fff"; x.fillText(Q.scan, W / 2, y);
    x.direction = "ltr"; x.font = "700 32px " + num; x.fillStyle = "#15D8C4"; x.fillText(url.replace(/^https?:\/\//, ""), W / 2, y + 62);
    x.direction = rtl ? "rtl" : "ltr"; x.font = "600 30px " + face; x.fillStyle = "#FFD27A"; x.fillText(Q.risk, W / 2, H - 70);
    return new Promise(function(res){ cv.toBlob(res, "image/png"); });
  });
}
/* #93 (founder 17.10 14:53): lederlenken kan ligge i bioen paa Instagram/TikTok.
   Den som trykker, faar lederen som sponsor og kan starte uten aa skrive foerst.
   Banneret under (inAppBanner) faar dem trygt ut av app-nettleseren med ?l= intakt. */
function bioBoks(out, url){
  const L = C.leaders[lang] || C.leaders.en;
  if(!L.bio_title) return;
  const bx = el("div", "bio");
  bx.appendChild(el("b", null, L.bio_title));
  bx.appendChild(el("p", null, L.bio_body));
  const bt = el("button", null, L.bio_copy); bt.type = "button";
  bt.onclick = function(){ const p = klipp(url); if(p) p.then(function(ok){ if(ok) bt.textContent = L.bio_done; }); };
  bx.appendChild(bt);
  out.appendChild(bx);
}

function el(tag, cls, text){
  const n = document.createElement(tag);
  if(cls) n.className = cls;
  if(text !== undefined) n.textContent = text;
  return n;
}

function rowsFor(items, dest){
  const frag = document.createDocumentFragment();
  const list = el("div","rows");
  let any = false;
  items.forEach(function(i){
    /* #131: «Spør sponsoren din» var en rad uten lenke og ble aldri vist. Nå er den
       en knapp som deler en ferdig melding til sponsoren (samme som i guiden). */
    if(i.url === "__ASK__"){
      const UA = C.guide_ui[lang] || C.guide_ui.en, pr = i[lang] || i.en;
      if(!sponsorName || !UA.ask_gen) return;
      any = true;
      const b = el("button", "row"); b.type = "button";
      b.appendChild(el("span", "t", (UA.ask_btn || pr[0]).replace("{N}", sponsorName)));
      b.appendChild(el("span", "s", pr[1])); b.appendChild(el("span", "go", "\u203A"));
      b.onclick = function(){ const tekst = hjelpTekst(sponsorName);
        const spId = sponsorUrl ? codeOf(sponsorUrl) : load("aimpire.leader");
        const wa = (PROFIL[spId] || []).find(function(p){ return p[0] === "whatsapp"; });
        spoerMeny(b, tekst, wa && wa[1], sponsorName); };   /* #227 */
      list.appendChild(b); return;
    }
    const href = i.url === "__REF__" ? dest.url : i.url;
    if(!href || !safeUrl(href)) return;
    const pair = i[lang] || i.en;
    any = true;
    const a = el("a", i.primary ? "slab" : "row");
    a.href = href;
    /* En intern lenke (#faq) bytter visning paa samme side - ny fane ville
       gitt to kopier av siden og mistet spraaket i localStorage-hoppet. */
    if(href.charAt(0) !== "#"){ a.target = "_blank"; a.rel = "noopener noreferrer"; }
    /* Tjenestens eget ikon, saa man kjenner igjen hvor man havner. */
    if(i.icon && sameOrigin(i.icon) && !i.primary){
      const im = el("img","ri"); im.loading = "lazy"; im.decoding = "async";
      im.src = i.icon; im.alt = ""; im.width = 30; im.height = 30; a.appendChild(im); a.classList.add("ico");
    }
    a.appendChild(el("span","t",pair[0]));
    /* Hovedknappen sier hvem sin lenke den aapner («Through Najma's link»),
       ikke bare «your sponsor's» - founder 16.10, tydelighet om hvem som verver. */
    const SV = C.sponsor && (C.sponsor[lang] || C.sponsor.en);
    const sub = (i.primary && sponsorName && SV && SV.via) ? SV.via.replace("{N}", sponsorName) : pair[1];
    a.appendChild(el("span","s",sub));
    if(i.primary){ frag.appendChild(a); }
    else { a.appendChild(el("span","go","›")); list.appendChild(a); }
  });
  if(list.children.length) frag.appendChild(list);
  return any ? frag : null;
}

/* Steg medlemmet har aapnet med ett trykk, saa en ny render (hvert hakk) ikke lukker dem (funn A4). */
const OPEN_STEPS = new Set();
/* Gjennomgang 17.10 20:32 (funn 6): én feil i en del skal ikke tomme resten av siden. */
function safe(f){ try{ f(); }catch(e){ try{ console.error(e); }catch(_){ } } }
function render(){
  /* Funn 12: det leseren har aapnet, skal ikke lukke seg naar siden tegnes paa nytt. */
  const aapne = Array.prototype.map.call(document.querySelectorAll("details[open][id]"), function(d){ return d.id; });
  try{ renderInner(); } finally {
    aapne.forEach(function(id){ const d = document.getElementById(id); if(d) d.open = true; });
  }
}
function renderInner(){
  const dest = destination();

  /* #100: toppen er forhaandstegnet. Samme tekst settes ikke paa nytt - en ny tekstnode teller som
     en ny tegning og flyttet «hovedinnholdet» (LCP) til etter hele skriptet. */
  [["h1", C.hero[lang].line1], ["h2", C.hero[lang].line2], ["hsub", C.hero[lang].sub]].forEach(function(p){
    const e = $(p[0]); if(e && e.textContent !== p[1]) e.textContent = p[1]; });

  Object.keys(C.sections).forEach(function(k){
    const h = $("t-" + k);
    if(!h) return;
    h.textContent = C.sections[k][lang] || C.sections[k].en;
    h.appendChild(document.createElement("b"));
  });

  const S = C.sponsor[lang] || C.sponsor.en;
  const sp = $("spon"); sp.textContent = ""; let sosPlass = null;
  if(dest.host){
    sp.hidden = false;
    if(sponsorName){
      const av = el("span","avi", Array.from(sponsorName.trim())[0] || ""); av.setAttribute("aria-hidden","true");
      sp.appendChild(av);
      sp.appendChild(el("strong","who", S.by.replace("{N}", sponsorName)));
      if(sponsorVerified){ const v = el("span","ok","\u2713"); v.setAttribute("aria-hidden","true"); sp.appendChild(v); }
      /* Founder 17.10 19:13: del-knappen rett ved siden av lederens navn. Deler
         lederens faste ?l=-lenke (samme som lederen selv deler), ikke partnerlenka. */
      if(sponsorVerified){ const h0 = location.hostname, lok = !h0 || h0 === "localhost" || h0 === "127.0.0.1" || /^\d+\.\d+\.\d+\.\d+$/.test(h0);
        const base0 = (!lok && C.canonical) ? C.canonical.replace(/\/+$/, "") + "/" : location.origin + location.pathname.replace(/(ledere|index)\.html$/, "");
        const holder = document.createDocumentFragment();
        const pill = delKnapp(holder, lederUrl(base0, codeOf(sponsorUrl), (leaderById(codeOf(sponsorUrl)) || {}).name), "sharepill", true);
        const meny0 = pill.nextSibling;
        sp.appendChild(pill);                         /* pillen paa samme rad som navnet */
        if(meny0){ meny0.classList.add("spmenu"); sp.appendChild(meny0); } }
      /* #172: lederens egne kanaler under navnet - «Følg Asma». Hentes fra navnelenke-fanen. */
      if(sponsorVerified && S.follow){ const spId = codeOf(sponsorUrl), plass = el("div", "sosplass"), spNavn = sponsorName;
        sosPlass = plass;
        hentNavnekart().then(function(){ const r = sosRad(spId, spNavn); if(!r || !plass.isConnected) return;
          plass.appendChild(el("span", "sosf", S.follow.replace("{N}", spNavn))); plass.appendChild(r); }); }
    }
    /* #254: «koblet til … / lenken ender på …» samlet i én detaljlinje, så CSS kan sette den UNDER handlingen. */
    const spdet = el("span", "spdet");
    spdet.appendChild(document.createTextNode(S.goes_to + " "));
    spdet.appendChild(el("strong",null,dest.host));
    spdet.appendChild(document.createTextNode(" " + S.fingerprint + " "));
    spdet.appendChild(el("span","fp",dest.fp));
    sp.appendChild(spdet);
    if(sosPlass){ sp.appendChild(sosPlass); sosPlass = null; }   /* #172: kanalene under linja, ikke midt i den */
    /* Egen lenke: bitteliten og diskret, ytterst til hoeyre paa raden (founder 17.10 03:36). */
    /* #109 (founder 18.10 05:33 «A ser riktig ut … ditt beste»): «Ikke invitert av …», «Inviterer du
       selv …» og «Min egen lenke» var tre linjer som alle vanlige medlemmer maatte lese forbi.
       Naa én liten lukket rad nederst i kortet; samme tekst og lenke bak ett trykk. */
    /* #141 (founder 18.10 15:20): «inviterer du selv?» laa bak en sammenfoldet rad, og soeknaden kom
       aldri opp. Naa: én lenke som sier akkurat hva som skjer og gaar rett til soeknaden (ledere.html),
       og «Feil sponsor?» som egen liten rad. */
    const spMer = (S.more_q && S.not_you && sponsorName) ? el("details", "spmore") : null;
    if(spMer){ spMer.appendChild(el("summary", null, S.more_q)); }
    if(S.own_cta || S.own_link){
      const og = el("div", "owngrp");
      const t4 = el("a", "owncta", (S.own_cta || S.own_link) + " \u203A");   /* pila peker framover også fra høyre til venstre */ t4.href = "ledere.html";
      og.appendChild(t4);
      spMer ? (spMer._own = og) : sp.appendChild(og);
    }
    sp.appendChild(document.createTextNode(" "));
    /* Founder 16.10: «under der det står hvem leder som inviterte dem … en knapp
       registrer deg hos oss nå» - rett til lederens registreringsskjema. Ikke naar
       lederen staar paa sin egen lenke (selvhenvisning), se under. */
    /* Founder 17.10 02:26: registreringsknappen vises OGSAA paa egen lenke - det er
       det kunden skal trykke naar lederen viser siden fram. Egen-notatet under
       sier fortsatt at lederen selv ikke skal bruke den (B-025). */
    if(S.register && safeUrl(dest.url)){
      const brk = el("span","brk"); brk.setAttribute("aria-hidden","true");
      sp.appendChild(brk);   /* tvunget linjeskift: knappen staar alltid UNDER raden */
      const fk = fortsettKnapp();
      if(fk){ sp.appendChild(fk); sp.appendChild(litenReg(dest.url, S.register)); }
      else {
      const rb = el("a","slab reg");
      rb.href = dest.url; rb.target = "_blank"; rb.rel = "noopener noreferrer";
      rb.appendChild(el("span","t", S.register));   /* uten undertekst - navnet staar i raden over (03:36) */
      sp.appendChild(rb);
      }
    }
    /* Founder 16.10: den som selv inviterer andre, skal ikke registrere seg
       under en annen - da maa det rettes i ettertid, og det skaper uenighet.
       Én rolig linje under, og en vei til egen lenke. */
    /* Selvhenvisning (#9, verving-svindel rad 1): lagde lederen sin lenke paa
       denne telefonen, og staar naa paa sin egen - si det rett ut. Dekker bare
       samme enhet; resten maa IB-portalen se. */
    /* #152: lenken som VISES (ikke den lagrede sponsoren - den overskrives ikke lenger av egen lenke). */
    const me = load("aimpire.me"), visesId = sponsorUrl ? codeOf(sponsorUrl) : null;
    if(me && visesId === me){
      /* Egen lenke: ingenting ekstra - forklaringen bor i IB-delen, og den
         bittelille pillen sitter i navneraden (founder 17.10 03:36). */
    } else if(S.short_check || S.double_check){
      /* Founder 16.10 (#50): kort linje her - feilen kan bare stoppes idet man
         registrerer seg. Den fulle forklaringen ligger under IB. */
      /* B-023: ogsaa medlemmet som ble «fanget» av feil lenke skal se veien ut. */
      /* #141: i «Feil sponsor?» staar bare veien til riktig sponsor - egen app-side har sin egen lenke. */
      const dc = spMer ? el("p", "dcheck", S.not_you.replace("{N}", sponsorName))
                       : el("p", "dcheck", (sponsorName && S.not_you ? S.not_you.replace("{N}", sponsorName) + " " : "") + (S.short_check || S.double_check));
      if(spMer) spMer.appendChild(dc); else sp.appendChild(dc);
    }
    if(spMer){ if(spMer._own) sp.appendChild(spMer._own); if(spMer.children.length > 1) sp.appendChild(spMer); }
  } else { sp.hidden = true; }

  const none = $("notice-none"), cf = $("notice-conflict");
  none.hidden = !(!sponsorUrl && !REF_HOUSE && !pendingRef);
  if(!none.hidden){
    const venter = REG_VENTER && S.checking;
    /* #76 / founder 17.10 13:25 («sterkere, ikke svakere»): husker telefonen en
       sponsor, sier overskriften «Velkommen tilbake» - ikke «aapne fra sponsorens
       lenke», som motsa navnet og haken rett under. Avsnittet som ber om lenken
       skjules da av samme grunn. Uten husket sponsor er alt som foer. */
    const huskTop = leaderById(load("aimpire.leader"));
    const huskU = huskTop && validRef(huskTop.link);
    const tilbake = !venter && !!(S.back_title && S.register && huskU && safeUrl(huskU.href));
    $("nn-t").textContent = venter ? S.checking : (EGEN_VENTER && S.own_wait_t) ? S.own_wait_t : (tilbake ? S.back_title : S.none_title);
    $("nn-b").textContent = venter ? "" : (EGEN_VENTER && S.own_wait_b) ? S.own_wait_b : (tilbake ? "" : S.none_body);
    $("nn-f").textContent = (venter || EGEN_VENTER) ? "" : S.none_foot;
    /* Ogsaa her, foer noen har en sponsor: veien til egen lenke (founder 16.10).
       Den ligger UTENFOR avsnittene, saa den staar ogsaa paa forsiden, der
       avsnittene i varselet er skjult. */
    const old3 = none.querySelector(".dlink"); if(old3) old3.remove();
    const oldReg = $("nn-reg"); if(oldReg) oldReg.remove();
    const oldWho = $("nn-who"); if(oldWho) oldWho.remove();
    const oldOwn = $("nn-own"); if(oldOwn) oldOwn.remove();
    none.querySelectorAll(".ownhint, a.dlink[href='ledere.html']").forEach(function(x){ x.remove(); });   /* ingen dubletter ved ny tegning */
    /* Founder 17.10 03:28: registreringen via partnerlenken skal vaere STOR her,
       «min egen lenke» liten. Den store finnes bare naar telefonen husker en
       sponsor - det er B-022s «tilbys som ett trykk», aldri en stille kobling:
       knappen gaar rett til partner-registreringen og binder ingenting. */
    if(!venter && S.register){
      const husket3 = leaderById(load("aimpire.leader"));
      const u3 = husket3 && validRef(husket3.link);
      if(u3 && safeUrl(u3.href)){
        const who3 = el("div", "spon nnwho"); who3.id = "nn-who";
        const av3 = el("span", "avi", Array.from(husket3.name.trim())[0] || ""); av3.setAttribute("aria-hidden", "true");
        who3.appendChild(av3);
        who3.appendChild(el("strong", "who", S.by.replace("{N}", husket3.name)));
        const ok3 = el("span", "ok", "\u2713"); ok3.setAttribute("aria-hidden", "true");
        who3.appendChild(ok3);
        none.appendChild(who3);
        const fk3 = fortsettKnapp();
        if(fk3){ fk3.id = "nn-reg"; none.appendChild(fk3); none.appendChild(litenReg(u3.href, S.register)); }
        else {
        const rb3 = el("a", "slab reg"); rb3.id = "nn-reg";
        rb3.href = u3.href; rb3.target = "_blank"; rb3.rel = "noopener noreferrer";
        rb3.appendChild(el("span", "t", S.register));   /* navnet staar i raden over (03:36) */
        none.appendChild(rb3);
        }
      }
    }
    /* B-037 (founder 18.10 22:57): uten sponsor havner ingen automatisk hos founder. Den store
       knappen sender en helt ny besoekende til chatten (#chat), der de skriver i landsgruppa og
       faar en leders lenke. «Lag din egen app-side» blir den lille pillen under. */
    const oldChat = $("nn-chat"); if(oldChat) oldChat.remove();
    const oldPick = $("nn-pick"); if(oldPick) oldPick.remove();
    const LT = (C.leaders[lang] || C.leaders.en).list;
    if(!venter && !EGEN_VENTER && !$("nn-reg") && LT && LEDERLISTE && LEDERLISTE.length){
      const pk = el("button", "slab reg"); pk.type = "button"; pk.id = "nn-pick"; pk.appendChild(el("span", "t", LT.pick_btn));
      pk.onclick = visLedervelger; none.appendChild(pk);
      if(!tilbake) $("nn-t").textContent = LT.pick_t;   /* overskriften peker paa lista, ikke chatten */
    }
    if(!venter && !EGEN_VENTER && !$("nn-reg") && !$("nn-pick") && S.chat_cta){
      const ch = el("a", "slab reg"); ch.id = "nn-chat"; ch.href = "#chat";
      ch.appendChild(el("span", "t", S.chat_cta)); none.appendChild(ch);
    }
    if(S.own_link){
      /* Med stor knapp over (registrering eller chat): liten pille. */
      const harStor = !!$("nn-reg") || !!$("nn-chat") || !!$("nn-pick");
      /* Med lederlista som hovedknapp: chatten blir en liten pille ved siden av. */
      if($("nn-pick") && S.chat_cta){ const cl = el("a", "dlink", S.chat_cta); cl.href = "#chat"; cl.id = "nn-chat"; none.appendChild(cl); }
      const a3 = harStor ? el("a", "dlink", S.own_link) : el("a", "slab reg", null);
      if(!harStor){ a3.id = "nn-own"; a3.appendChild(el("span", "t", S.own_link)); }
      a3.href = "ledere.html";
      /* Founder 17.10 17:38: liten forklaring over knappen, for den som allerede er registrert. */
      if(S.own_link_hint) none.appendChild(el("p", "ownhint", S.own_link_hint));   /* founder 17:55: alltid rett over knappen */
      none.appendChild(a3);
    }
  }
  /* To ledere paa samme telefon: spoer hvem som inviterte (B-023). Til det er
     svart, vises verken sponsorlinje eller «uten sponsor»-varsel. */
  cf.hidden = !pendingConflict;
  const shellEl = document.querySelector(".shell"); if(shellEl) shellEl.classList.toggle("conflict", !!pendingConflict);
  if(pendingConflict){
    const A = pendingConflict.a, B = pendingConflict.b;
    sp.hidden = true; none.hidden = true;
    $("nc-t").textContent = S.conflict.replace("{A}", A.name).replace("{B}", B.name);
    const kb = $("nc-keep"), ub = $("nc-use");
    /* Samme fornavn paa begge: legg til et kort kjennetegn fra lenken, ellers er valget umulig (funn 4). */
    const likeNavn = A.name === B.name;
    const merkeA = likeNavn ? A.name + " · " + fingerprint(validRef(A.link)) : A.name;
    const merkeB = likeNavn ? B.name + " · " + fingerprint(validRef(B.link)) : B.name;
    /* #174 (founder 19.10 03:36 «drit stygg»): to rader som i lederlista - avatar, navn, pil. */
    const valg = function(knapp, navn, tekst){ knapp.textContent = "";
      const av = el("span", "avi", Array.from(String(navn).trim())[0] || ""); av.setAttribute("aria-hidden", "true");
      knapp.appendChild(av); knapp.appendChild(el("span", "ncn", tekst)); const pil = el("span", "ncp", "\u203A"); pil.setAttribute("aria-hidden", "true"); knapp.appendChild(pil); };
    valg(kb, A.name, (S.keep || "{A}").replace("{A}", merkeA)); valg(ub, B.name, (S.use || "{B}").replace("{B}", merkeB));
    kb.onclick = function(){ store("aimpire.leader", A.id); store("aimpire.leader.venter", null); try{ history.replaceState(null, "", location.pathname + "?l=" + A.id + location.hash); }catch(e){} initSponsor(); render(); };
    ub.onclick = function(){ store("aimpire.leader", B.id); store("aimpire.leader.venter", null); initSponsor(); render(); };
  }

  /* #155 (gjennomgang 19.10): «Velkommen tilbake» - telefonen husker lederen, men lenken mangler ?l=.
     Hjem tilbyr da registrering via lederens lenke (B-022, ett trykk). Start maa gjoere det samme:
     steg 2 sa «trykk Registrer under», uten knapp, og innloggingene sto som «laast». */
  const huskReg = sponsorUrl ? null : (function(){ const h = leaderById(load("aimpire.leader")); const u = h && validRef(h.link); return u && safeUrl(u.href) ? u : null; })();
  ["main","platform","video","docs","help","tools"].forEach(function(key){
    const host = $(key + "-links"); if(!host) return;
    host.textContent = "";
    /* CopyX og meglerportalen er veier INN til registrering. Staar de aapne
       foer sponsorlenka er satt, kan noen opprette konto uten at noen er
       knyttet til den - og guidens eget steg 3 sier nettopp at man ikke
       skal det. De vises derfor foerst naar lenka finnes. */
    if(key === "platform" && !sponsorUrl && !huskReg){
      const sec0 = $("s-platform");
      if(sec0){
        sec0.hidden = false;
        host.appendChild(el("p","vnote", C.sections.platform_gate[lang] || C.sections.platform_gate.en));
      }
      return;
    }
    const frag = rowsFor(C.links[key], dest);
    if(frag) host.appendChild(frag);
    const sec = $("s-" + key);
    if(sec && key !== "main") sec.hidden = !frag;
  });

  /* Steg 1 («bruk sponsorens lenke») ER gjort naar sponsoren er bekreftet - kryss det av
     én gang automatisk (kundegjennomgang 17.10). Fjerner kunden haken, respekteres det. */
  try{ if(sponsorVerified && !load("aimpire.s0auto")){ const d0 = doneSet(); if(!d0.has("0")){ d0.add("0"); store("aimpire.done", Array.from(d0).join(",")); const G0 = C.guide[lang] || C.guide.en, sb = subSet(); String(G0.steps[0][1]).split("\n").filter(function(x){ return x.trim(); }).forEach(function(_, n){ sb.add("0:" + n); }); subSave(sb); } store("aimpire.s0auto", "1"); } }catch(e){}
  try{ document.querySelector(".shell").classList.toggle("harkonto", doneSet().has("1")); }catch(e){}
  const G = C.guide[lang] || C.guide.en;
  /* Ingen gjentakelse (17.10): ledeteksten sier det samme som de tre faktaboksene
     (~15 min, ID-kort, siden husker). Finnes boksene, staar det bare der. */
  { const SG = C.short && C.short["s-guide"] && (C.short["s-guide"][lang] || C.short["s-guide"].en);
    const gld = $("guide-lede"); gld.textContent = G.lede; gld.hidden = !!(SG && SG.chips && SG.chips.length); }
  const gl = $("guide"); gl.textContent = "";
  const U = C.guide_ui[lang] || C.guide_ui.en;
  const done = doneSet();
  /* Fokusmodus (lederfeedback 16.10, «mye skrift»): bare det foerste ugjorte
     steget staar aapent. Ferdige og kommende steg er én linje - tittel og
     tall - og aapnes med ett trykk. Teksten er den samme; den vises naar den
     trengs. */
  const first = G.steps.findIndex(function(_, i){ return !done.has(String(i)); });
  G.steps.forEach(function(st, idx){
    const li = document.createElement("li");
    const isDone = done.has(String(idx));
    if(isDone) li.className = "done";
    if(idx === first) li.classList.add("current");
    else { li.classList.add("folded"); if(OPEN_STEPS.has(idx)) li.classList.add("open"); }

    li.id = "st-" + idx;
    const tick = el("button","tick", isDone ? "\u2713" : String(idx + 1));
    tick.type = "button";
    tick.setAttribute("aria-pressed", String(isDone));
    tick.setAttribute("aria-label", st[0]);
    tick.onclick = function(){ toggleStep(idx); };
    li.appendChild(tick);

    const h3 = el("h3",null,null);
    /* Ikon per steg, samme som reisekartet (founder 17.10 21:16 «fortsett slik»). */
    const STEGIKON = ["\uD83D\uDD17", "\uD83D\uDCDD", "\uD83D\uDD0C", "\uD83E\uDEAA", "\u23F3", "\uD83D\uDCF2", "\uD83D\uDCB5", "\uD83E\uDD16", "\uD83D\uDCCA", "\uD83D\uDCAC"];
    if(STEGIKON[idx]) h3.appendChild(el("span", "sti", STEGIKON[idx]));
    h3.appendChild(document.createTextNode(st[0]));
    if(idx !== first){
      h3.tabIndex = 0; h3.setAttribute("role","button"); h3.setAttribute("aria-expanded", String(OPEN_STEPS.has(idx)));
      const apne = function(){ const on = li.classList.toggle("open"); if(on) OPEN_STEPS.add(idx); else OPEN_STEPS.delete(idx); h3.setAttribute("aria-expanded", String(on)); };
      h3.onclick = apne; h3.onkeydown = function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); apne(); } };
    }
    li.appendChild(h3);
    li.appendChild(actions(st[1], idx));
    /* #102 (founder 18.10 00:10/01:23): sponsorkortet staar bare paa Hjem. Paa Start ligger
       registreringsknappen der handlingen skjer - i steg 2 - i stedet for oeverst paa siden. */
    /* Steg 1 viser sponsoren INNE i steget (founder 18.10 01:38): navn, sjekkmerke, lenkekoden og
       registreringsknappen i nøktern størrelse - så man kan starte herfra. Før pekte teksten til
       «øverst på siden», men det kortet står bare på Hjem nå (#102). */
    if(idx === 0 && sponsorUrl){
      const SP = C.sponsor[lang] || C.sponsor.en, dst = destination();
      const bx = el("div", "stegspon");
      const rad = el("div", "ssrow");
      rad.appendChild(el("span", "avi", Array.from(String(sponsorName || "?").trim())[0] || "?"));
      rad.appendChild(el("strong", null, SP.by.replace("{N}", sponsorName || "")));
      if(sponsorVerified){ const ok = el("span", "ok", "\u2713"); ok.setAttribute("aria-hidden", "true"); rad.appendChild(ok); }
      bx.appendChild(rad);
      if(dst.fp){ const fp = el("div", "ssfp"); fp.appendChild(el("span", null, String(SP.fingerprint || "").replace(/^[\s,\u060C\u00B7]+/, "") + " ")); const kd = el("code", null, dst.fp); kd.dir = "ltr"; fp.appendChild(kd); bx.appendChild(fp); }
      const rg = el("a", "slab reg stegreg liten"); rg.href = dst.url; rg.target = "_blank"; rg.rel = "noopener noreferrer";
      rg.appendChild(el("span", "t", SP.register)); bx.appendChild(rg);
      li.appendChild(bx);
    }
    if(idx === 1 && (sponsorUrl || huskReg)){
      const SP = C.sponsor[lang] || C.sponsor.en;
      const rg = el("a", "slab reg stegreg"); rg.href = sponsorUrl ? destination().url : huskReg.href; rg.target = "_blank"; rg.rel = "noopener noreferrer";
      rg.appendChild(el("span", "t", SP.register)); li.appendChild(rg);
    }
    /* #135 (founder 18.10 04:21): steg 3 skjer i IB-portalen (AiTech) - knappen dit staar i
       steget, ikke bare i «Hvor alt ligger». Omriss: det er innlogging, ikke registrering. */
    /* #151 (founder 18.10 17:30 «alle steps skal gi logisk mening og skikkelig veiledning»): knappen står
       rett under punktet som sier hvor man skal - ikke etter hele lista. Merkenavnet (copyxapp / Tag Markets)
       er likt på alle språk, så det finner riktig punkt uten oversettelse. */
    const settInn = function(knapp, merke){
      const rad = Array.from(li.querySelectorAll(".subs > li")).find(function(r){ return r.textContent.indexOf(merke) !== -1; });
      if(rad){ const holder = el("li", "subbtn"); holder.appendChild(knapp); rad.after(holder); } else li.appendChild(knapp);
    };
    if(idx === 2 && U.portal_btn){
      const pb = el("a", "slab own stegreg"); pb.href = "https://copyxapp.com/auth/login";   /* #151: medlemmer logger inn på copyxapp.com (der de registrerte seg), ikke partnerportalen */ pb.target = "_blank"; pb.rel = "noopener noreferrer";
      pb.appendChild(el("span", "t", U.portal_btn + " \u2197")); settInn(pb, "copyxapp");
    }
    /* #135 (founder 18.10 04:58): én innlogging for CopyX, IB-portalen og Tag Markets - etter steg 3
       logger medlemmet inn direkte i Tag Markets. ID (4), godkjenning (5), innskudd (7), Sonic i CopyX (8)
       og MT5 Credentials (9) skjer der, saa knappen staar i de stegene. Adressen fra links.platform. */
    if((idx === 3 || idx === 4 || idx === 6 || idx === 7 || idx === 8) && U.tm_btn){
      const tmL = (C.links.platform || []).find(function(x){ return /portal\.tagmarkets\.com/.test(x.url || ""); });
      if(tmL && safeUrl(tmL.url)){
        const tb = el("a", "slab own stegreg"); tb.href = tmL.url; tb.target = "_blank"; tb.rel = "noopener noreferrer";
        tb.appendChild(el("span", "t", U.tm_btn + " \u2197")); settInn(tb, "Tag Markets");
      }
    }
    const x = st[2];
    if(x && x.note) li.appendChild(lines(x.note, "vnote"));
    /* #198: steg 9 (se kontoen) -> «Se din egen utvikling» (portalen + kalkulator, #181). */
    if(idx === 8 && C.growth){ const GR = C.growth[lang] || C.growth.en;
      const gb = el("button", "slab ghost grgo"); gb.type = "button"; gb.appendChild(el("span", "t", "\uD83D\uDCCA " + GR.title));
      gb.onclick = function(){ tab = "journal"; setView("tools"); setTimeout(function(){ const g = $("s-growth"); if(g) g.scrollIntoView({ block: "start" }); }, 80); };
      li.appendChild(gb); }
    /* VPN-tips for land der nettet blokkerer MT5-soeket (founder 17.10 21:23). Kun hjelp til soeket. */
    if(x && x.vpn){
      const vb = el("div", "vpnbox"); vb.appendChild(el("p", null, x.vpn.t));
      const rd = el("div", "vpnbtns"); rd.appendChild(el("b", null, "\uD83D\uDEE1\uFE0F " + x.vpn.h));
      [["iPhone", "https://apps.apple.com/app/id1423538627"], ["Android", "https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone"]].forEach(function(p){
        const a = el("a", "vpnb", p[0]); a.href = p[1]; a.target = "_blank"; a.rel = "noopener noreferrer"; rd.appendChild(a); });
      vb.appendChild(rd); li.appendChild(vb);
    }
    /* Kort sjekk paa det steget som avgjoer hvor mye man risikerer. Aldri
       paakrevd, og et feil svar faar en vennlig ny sjanse - ikke en kjeft. */
    if(x && x.quiz) li.appendChild(quizBox(x.quiz, idx, G));

    /* Verdier som maa skrives tegn for tegn skal kunne kopieres, ikke
       leses ut av et avsnitt og tastes paa nytt paa en telefon. */
    if(x && x.apps && x.apps.items){
      li.appendChild(el("p","vnote",x.apps.lede));
      const row = el("div","apps");
      x.apps.items.forEach(function(a){
        if(!safeUrl(a.url)) return;
        const lnk = el("a",null,a.os);
        lnk.href = a.url; lnk.target = "_blank"; lnk.rel = "noopener noreferrer";
        row.appendChild(lnk);
      });
      if(row.children.length) li.appendChild(row);
    }

    /* Gruppelenka kommer TIL SLUTT i steget - etter appen og kontoen.
       Laa den oeverst paa siden, var den en handling ingen kunne utfoere. */
    if(x && x.join && safeUrl(x.join.url)){
      const j = el("a","joinbtn",x.join.label);
      j.href = x.join.url; j.target = "_blank"; j.rel = "noopener noreferrer";
      li.appendChild(j);
    }

    if(x && x.codes && x.codes.length){
      const row = el("div","codes");
      x.codes.forEach(function(code){
        const b = el("button"); b.type = "button";
        b.appendChild(el("span","k",code.label));
        const v = el("span","v",code.value);
        v.setAttribute("dir","ltr");
        b.appendChild(v);
        b.appendChild(el("span","c",U.copy));
        b.onclick = function(){ copyCode(b, code.value, code.label); };
        row.appendChild(b);
      });
      li.appendChild(row);
    }
    if(x && x.video && safeUrl(x.video.url)){
      const row = el("div","langs");
      const a = el("a",null,x.video.label);
      a.href = x.video.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      row.appendChild(a);
      li.appendChild(row);
    }
    /* No video in this language yet. Say so, rather than offering another
       language — a list of every language except yours reads as an insult. */
    if(x && x.soon) li.appendChild(el("p","soon",x.soon));
    if(x && x.img && sameOrigin(x.img)){
      const fig = el("div","shot");
      const im = document.createElement("img");
      im.loading = "lazy"; im.src = x.img; im.alt = x.alt || "";
      fig.appendChild(im);
      (x.marks || []).forEach(function(m){
        const pin = el("span","pin",String(m.n));
        pin.style.insetInlineStart = m.x + "%"; pin.style.top = m.y + "%";
        fig.appendChild(pin);
      });
      li.appendChild(fig);
      if(x.marks && x.marks.length){
        const ul = el("ul","keys");
        x.marks.forEach(function(m){ ul.appendChild(el("li",null,m.t)); });
        li.appendChild(ul);
      }
    }
    if(x && x.appcards){ const ac = el("div","stepapps"); appCards(ac, false); li.appendChild(ac); }
    /* Opptaket av steget. Et stillbilde med spill-knapp; videoen hentes
       foerst ved trykk, og bildet er lazy - saa menyen og lesere uten behov
       for video betaler ingenting. Lyd finnes ikke, derfor muted. */
    if(x && x.clip && sameOrigin(x.clip.src) && sameOrigin(x.clip.poster)){
      const fb = el("button","clipf");
      fb.type = "button";
      const im = el("img"); im.loading = "lazy"; im.decoding = "async"; im.src = x.clip.poster; im.alt = "";
      fb.appendChild(im);
      fb.appendChild(el("span","play", (U.watch || "").replace("{s}", x.clip.secs)));
      fb.onclick = function(){
        const v = document.createElement("video");
        v.className = "clip"; v.src = x.clip.src; v.poster = x.clip.poster;
        v.controls = true; v.autoplay = true; v.muted = true; v.playsInline = true;
        v.setAttribute("playsinline", "");
        fb.replaceWith(v);
      };
      li.appendChild(fb);
    }
    /* Har du ikke USDT ennaa? Founders egen Binance P2P-guide - bare paa
       urdu, Roman Urdu og hindi, der Easypaisa/JazzCash gir mening. */
    if(x && x.p2p && C.p2p && C.p2p[lang]) li.appendChild(p2pBox(C.p2p[lang], C.p2p.video));
    /* Settes inn til slutt saa den staar under bildet og markoerene. */
    if(x && x.check){
      const ck = el("p","chk");
      ck.appendChild(el("b", null, U.check));
      ck.appendChild(document.createTextNode(x.check));
      li.appendChild(ck);
    }
    /* Den tydelige avkryssingen. Sirkelen virket ogsaa, men ingen visste at
       et stegnummer kunne trykkes paa. Knappen staar der steget er ferdig:
       rett under «du vet at det virket naar». */
    const mk = el("button","markd", isDone ? U.marked : U.mark);
    mk.type = "button";
    mk.setAttribute("aria-pressed", String(isDone));
    mk.onclick = function(){ toggleStep(idx); };
    li.appendChild(mk);
    /* Staar du fast? Ett trykk til Questions-rommet (founder 16.10: alt skal
       vaere lett). Lenken bygges bare naar rommet har offentlig alias i content. */
    if(U.stuck && C.guide_ui._stuck_url && safeUrl(C.guide_ui._stuck_url)){
      const sa = el("a","stuck", U.stuck); sa.href = C.guide_ui._stuck_url; sa.target = "_blank"; sa.rel = "noopener noreferrer";
      li.appendChild(sa);
    }
    /* «Spoer sponsoren om hjelp» (18.10, BE Club-laerdom K-117: folk faller av naar de staar
       fast alene). Bare paa steget man er paa, og bare naar sponsoren er kjent. Aapner
       telefonens delingsmeny med ferdig tekst - kunden velger mottaker og sender selv. */
    const spN = sponsorName || ((leaderById(load("aimpire.leader")) || {}).name || "");
    /* «Les opp» (18.10): telefonens egen stemme, gratis og uten nett. Bare naar det finnes en
       stemme for AKKURAT dette spraaket - aldri hindi-stemme for urdu (minne hindi≠urdu). */
    if(idx === first && U.read_btn && stemmeFor(lang)){
      const rb = el("button", "lesopp", U.read_btn); rb.type = "button";
      rb.onclick = function(){
        if(speechSynthesis.speaking){ speechSynthesis.cancel(); rb.textContent = U.read_btn; return; }
        const tekst = st[0] + ". " + String(st[1]).replace(/[«»]/g, "").split("\n").filter(function(x){ return x.trim(); }).join(". ");
        const u = new SpeechSynthesisUtterance(tekst); u.voice = stemmeFor(lang); u.lang = u.voice.lang; u.rate = 0.95;
        u.onend = u.onerror = function(){ rb.textContent = U.read_btn; };
        speechSynthesis.cancel(); speechSynthesis.speak(u); rb.textContent = U.read_stop || "\u25A0";
      };
      li.appendChild(rb);
    }
    if(idx === first && spN && U.ask_btn && U.ask_msg){
      const ab = el("button", "askspon", U.ask_btn.replace("{N}", spN)); ab.type = "button";
      ab.onclick = function(){
        const tekst = U.ask_msg.replace("{N}", spN).replace("{n}", idx + 1).replace("{t}", st[0]) + "\n\n" + hjelpSted();   /* #227 */
        /* #172: har lederen lagt inn WhatsApp, gaar spoersmaalet rett til henne/ham. */
        const spId = sponsorUrl ? codeOf(sponsorUrl) : load("aimpire.leader");
        const wa = (PROFIL[spId] || []).find(function(p){ return p[0] === "whatsapp"; });
        spoerMeny(ab, tekst, wa && wa[1], spN);   /* #227: meny med ekte lenker i stedet for window.open */
        vibrer(8);
      };
      li.appendChild(ab);
    }
    gl.appendChild(li);
  });

  const nDone = G.steps.filter(function(_, i){ return done.has(String(i)); }).length;
  const pr = $("prog");
  pr.hidden = false;
  const total = G.steps.length, left = total - nDone;
  /* Ti steg i ett tall foeles langt. Etappen man staar i er kort og naaelig:
     «Kom i gang · 2 av 4». Hele tallet staar fortsatt ved siden av. */
  let topp = U.progress.replace("{done}", nDone).replace("{total}", total) +
    (left && U.left ? " \u00b7 " + U.left.replace("{n}", left) : "");
  if(G.phases && G.phases.length){
    const foerste = G.steps.findIndex(function(_, i){ return !done.has(String(i)); });
    const i = foerste === -1 ? G.steps.length - 1 : foerste;
    const f = G.phases.find(function(p){ return i >= p[1] && i <= p[2]; });
    if(f){
      const iAlt = f[2] - f[1] + 1;
      let gjort = 0;
      for(let k = f[1]; k <= f[2]; k++) if(done.has(String(k))) gjort++;
      /* Etappens NAVN gjoer maalet naert; TALLET er det samme overalt (toppstripa,
         streken): foer sto det «0 av 4» over en strek som fyltes etter 10. */
      topp = f[0] + " \u00b7 " + U.progress.replace("{done}", nDone).replace("{total}", total);
    }
  }
  $("prog-t").textContent = topp;
  $("prog-i").style.width = Math.round((nDone / total) * 100) + "%";
  /* Segmentert strek: én bit per steg, luft mellom etappene, steget man er paa pulserer. */
  { const bar = $("prog-i").parentNode; let sg = bar.querySelector(".segs");
    if(!sg){ sg = el("span", "segs"); bar.appendChild(sg); }
    sg.textContent = ""; bar.classList.add("segbar");
    const nesteI = G.steps.findIndex(function(_, i){ return !done.has(String(i)); });
    G.steps.forEach(function(_, i){
      const b = el("i", done.has(String(i)) ? "on" : i === nesteI ? "nu" : "");
      if(G.phases && G.phases.some(function(ph){ return ph[1] === i && i > 0; })) b.classList.add("ny");
      sg.appendChild(b);
    }); }
  /* Toppstripa: samme tall, alltid synlig mens man scroller. */
  const mp = $("minip");
  if(mp){
    mp.hidden = false;
    $("minip-t").textContent = nDone + " / " + total;
    $("minip-b").style.width = Math.round((nDone / total) * 100) + "%";
  }
  /* Neste steg som ikke er gjort - ett trykk dit. Alle gjort: videre til Sonic,
     som er neste del i menyen. */
  const nx = $("prog-n");
  if(nx){
    nx.textContent = "";
    const first = G.steps.findIndex(function(_, i){ return !done.has(String(i)); });
    if(first === -1 && U.all_done){
      nx.appendChild(el("span","alld", U.all_done.replace("{total}", total)));
      const go = el("button","nextb", U.all_done_go);
      go.type = "button"; go.onclick = function(){ setView("earn"); };
      nx.appendChild(go);
      /* #157: toppen av reisen er der folk helst anbefaler videre (peak-end). Samme tekst og
         lenkeregel som «Anbefal til en venn», men her, i oeyeblikket de er ferdige. */
      const SH = C.share && C.share.label && (C.share.label[lang] || C.share.label.en), SHH = C.share && C.share.hint && (C.share.hint[lang] || C.share.hint.en);
      if(SH && PAGE !== "leaders"){
        const bx = el("div", "alldsh"); if(SHH) bx.appendChild(el("p", null, SHH));
        const sb = el("button", "sendv", SH); sb.type = "button";
        sb.onclick = function(){ const tpl = (C.share.text && (C.share.text[lang] || C.share.text.en)) || "{LINK}", m = tpl.replace("{LINK}", delLenke("", ""));
          if(navigator.share){ navigator.share({ text: m }).catch(function(){}); return; }
          window.open("https://wa.me/?text=" + encodeURIComponent(m), "_blank", "noopener"); };
        bx.appendChild(sb); nx.appendChild(bx);
      }
    }
    /* «Neste: …»-knappen er tatt bort (18.10): neste steg staar aapent rett under, og Start
       hopper selv dit. Den samme handlingen ligger paa Hjem («Neste: …»-hovedknappen). */
  }
  const pb = $("prog-r");
  pb.textContent = U.reset; pb.hidden = nDone === 0; pb.onclick = clearSteps;

  /* Three places, three names. This block existed in content.json in every
     language for a day without ever being drawn - nothing referenced it. */
  /* Amplify og token. Alt er portalens egne formuleringer, hentet fra
     founders skjermopptak — ikke omskrevet. Likvidasjonsregelen staar
     ordrett fordi en parafrase ville myket den opp. */
  const AM = C.amplify, as_ = $("s-amplify");
  if(AM && AM.items && (AM.items[lang] || AM.items.en)){
    as_.hidden = false;
    $("t-amplify").textContent = C.sections.amplify[lang] || C.sections.amplify.en;
    $("t-amplify").appendChild(document.createElement("b"));
    const au = $("amplify"); au.textContent = ""; au.className = "places amp";
    const CP = AM.compare && (AM.compare[lang] || AM.compare.en);
    /* Aatte avsnitt etter hverandre leses ikke paa en telefon. De to som
       avgjoer noe - hva Sonic er, og naar kontoen stenger - staar aapne.
       Resten aapnes med ett trykk. Ingen risikosetning kan foldes bort:
       de staar i de to aapne. Ingen nye tekster. */
    const ALLTID_APEN = [0];
    (AM.items[lang] || AM.items.en).forEach(function(it, i){
      const li = document.createElement("li");
      if(ALLTID_APEN.indexOf(i) !== -1){
        li.appendChild(el("h3",null,it[0]));
        li.appendChild(el("p",null,it[1]));
      } else {
        const d = el("details","fold");
        const sm = document.createElement("summary");
        sm.appendChild(el("h3",null,it[0]));
        d.appendChild(sm);
        d.appendChild(el("p",null,it[1]));
        li.appendChild(d);
      }
      au.appendChild(li);
      if(i === 1 && CP){
        const v = el("li","vs");
        v.appendChild(el("h3", null, CP.title));
        const n = el("div","vsnum"); n.dir = "ltr";
        n.appendChild(el("span", null, AM.compare.cols[0])); n.appendChild(el("i")); n.appendChild(el("span", null, AM.compare.cols[1]));
        v.appendChild(n);
        /* Etiketten paa egen linje, verdiene rett under hvert sitt store tall. */
        CP.rows.forEach(function(r){
          const row = el("div","vsrow"); row.dir = "ltr";
          const lab = el("span", null, r[0]); lab.dir = "auto"; row.appendChild(lab);
          row.appendChild(el("b", null, r[1])); row.appendChild(el("b", null, r[2]));
          v.appendChild(row);
        });
        v.appendChild(el("p","vsnote", CP.note));
        au.appendChild(v);
      }
    });
  } else { as_.hidden = true; }

  const PL = C.places;
  const ps = $("s-places");
  if(PL && PL.items && PL.items[lang]){
    ps.hidden = false;
    $("t-places").textContent = (PL.title[lang] || PL.title.en);
    $("t-places").appendChild(document.createElement("b"));
    $("places-lede").textContent = (PL.lede[lang] || PL.lede.en);
    const pu = $("places"); pu.textContent = "";
    const navn = [];
    (PL.items[lang] || PL.items.en).forEach(function(it){
      navn.push(it[0]);
      const li = document.createElement("li");
      li.appendChild(el("h3",null,it[0]));
      li.appendChild(el("p",null,it[1]));
      pu.appendChild(li);
    });
    /* Founder 18.10 00:07 «hvorfor saa langt mellom steg 1 og 2»: tre store bokser foran guiden
       ble for mye. Én sammenfoldet linje med navnene; trykk for forklaringen. */
    let pf = $("pl-fold");
    if(!pf){ pf = el("details", "plfold"); pf.id = "pl-fold"; pf.appendChild(el("summary")); const inn = el("div", "plin"); pf.appendChild(inn);
      inn.appendChild($("places-lede")); inn.appendChild(pu); ps.appendChild(pf); }
    const sm = pf.querySelector("summary"); sm.textContent = "";
    sm.appendChild(el("b", null, (PL.title[lang] || PL.title.en))); sm.appendChild(el("span", null, navn.join(" \u00b7 ")));
  } else { ps.hidden = true; }

  const E = C.earn[lang] || C.earn.en;
  $("earn-lede").textContent = E.intro;
  const le = $("earn-list"); le.textContent = "";
  E.items.forEach(function(it, i){
    const li = document.createElement("li");
    li.id = "earn-" + i;
    li.appendChild(el("h3",null,it[0]));
    li.appendChild(el("p",null,it[1]));
    le.appendChild(li);
  });
  const es = C.earn_shot;
  const eh = $("earn-shot"); eh.textContent = "";
  if(es && es.img && sameOrigin(es.img)){
    const fig = el("div","shot");
    const im = document.createElement("img");
    im.loading = "lazy"; im.src = es.img; im.alt = (es.alt && (es.alt[lang] || es.alt.en)) || "";
    fig.appendChild(im);
    const mk = (es.marks && (es.marks[lang] || es.marks.en)) || [];
    mk.forEach(function(m){
      const pin = el("span","pin",String(m.n));
      pin.style.insetInlineStart = m.x + "%"; pin.style.top = m.y + "%";
      fig.appendChild(pin);
    });
    eh.appendChild(fig);
    if(mk.length){
      const ul = el("ul","keys");
      mk.forEach(function(m){ ul.appendChild(el("li",null,m.t)); });
      eh.appendChild(ul);
    }
  }
  $("earn-warn").textContent = E.warning;

  const tl = $("tiers"); tl.textContent = "";
  (C.values[lang] || C.values.en).forEach(function(v){
    const li = document.createElement("li");
    /* Was a single 2rem letter in one of four bright colours, which read as
       a children's alphabet chart. The word carries the idea; the acronym
       survives because the initial is marked inside it. */
    const box = document.createElement("div");
    const word = String(v[1] || "");
    const h3 = el("h3");
    h3.appendChild(el("span","ini",word.slice(0,1)));
    h3.appendChild(document.createTextNode(word.slice(1)));
    box.appendChild(h3);
    box.appendChild(el("p",null,v[2]));
    li.appendChild(box); tl.appendChild(li);
  });

  /* Ordlista: valgfri fordybing, plassert etter guiden. Tall-eksemplene
     laases til venstre-til-hoeyre saa «0.01 lot» ikke snus i RTL. */
  /* Smaa figurer til ordlista. Hver viser ÉN ting, og tallene i dem er de
     samme som i eksempelteksten over — ellers maa leseren oversette. */
  function pipLinjal(){
    const FU = (C.learn.fig_ui && (C.learn.fig_ui[lang] || C.learn.fig_ui.en)) || {};
    const w = el("div", "pipr"); w.setAttribute("dir", "ltr"); w.setAttribute("data-noswipe", "");
    let inst = "fx", lot = 0.01, n = 4;
    const r1 = el("div", "prad"), r2 = el("div", "prad");
    const pris = el("div", "ppris"), hint = el("div", "pnote"), res = el("div", "pres"), note = el("div", "pnote");
    hint.setAttribute("dir", "auto"); note.setAttribute("dir", "auto");
    const sl = document.createElement("input"); sl.type = "range"; sl.min = "-10"; sl.max = "10"; sl.step = "1"; sl.value = "4"; sl.className = "pslide";
    sl.setAttribute("aria-label", FU.drag || "Drag");
    const kr = function(v){ return (v < 0 ? "\u2212$" : "+$") + Math.abs(v).toFixed(2); };
    const tegn = function(){
      r1.querySelectorAll("button").forEach(function(b){ b.classList.toggle("on", b._v === inst); });
      r2.querySelectorAll("button").forEach(function(b){ b.classList.toggle("on", b._v === lot); });
      pris.textContent = "";
      const del = function(s){ pris.appendChild(document.createTextNode(s.slice(0, -1))); pris.appendChild(el("b", null, s.slice(-1))); };
      let verdi, linje;
      if(inst === "fx"){
        del((1.3).toFixed(4)); pris.appendChild(document.createTextNode("  \u2192  ")); del((1.3 + n * 0.0001).toFixed(4));
        const pv = lot * 10; verdi = n * pv;
        linje = (n > 0 ? "+" : n < 0 ? "\u2212" : "") + Math.abs(n) + " pips \u00d7 $" + pv.toFixed(2) + " = " + kr(verdi);
        note.textContent = "";
      } else {
        const a = 4350, b2 = 4350 + n;
        const p1 = String(a), p2 = String(b2);
        pris.appendChild(document.createTextNode(p1.slice(0, -1))); pris.appendChild(el("b", null, p1.slice(-1))); pris.appendChild(document.createTextNode(".00  \u2192  "));
        pris.appendChild(document.createTextNode(p2.slice(0, -1))); pris.appendChild(el("b", null, p2.slice(-1))); pris.appendChild(document.createTextNode(".00"));
        verdi = n * lot * 100;
        linje = (n < 0 ? "\u2212$" : "$") + Math.abs(n) + " \u00d7 " + lot.toFixed(2) + " lot \u2248 " + kr(verdi);
        note.textContent = FU.gold || "";
      }
      res.textContent = linje; res.className = "pres" + (verdi > 0 ? " pos" : verdi < 0 ? " neg" : "");
    };
    [["fx", "EUR/USD"], ["gull", "XAU/USD"]].forEach(function(x){ const b = el("button", null, x[1]); b.type = "button"; b._v = x[0];
      b.onclick = function(){ inst = x[0]; tegn(); }; r1.appendChild(b); });
    [0.01, 0.1, 1].forEach(function(v){ const b = el("button", null, v.toFixed(2) + " lot"); b.type = "button"; b._v = v;
      b.onclick = function(){ lot = v; tegn(); }; r2.appendChild(b); });
    sl.oninput = function(){ n = parseInt(sl.value, 10) || 0; tegn(); };
    hint.textContent = FU.drag || "";
    [r1, r2, pris, sl, hint, res, note].forEach(function(x){ w.appendChild(x); });
    tegn();
    return w;
  }
  function learnFig(kind){
    const S = function(t,a){ return svgEl(t,a); };
    if(kind === "pip"){
      /* #256 (founder 20.10 «ikke alltid det hjelper å lese … grafiske eksempler … du kan animere»): en pip-linjal man drar
         på. Velg EUR/USD eller gull og lot, dra prisen og se pips og dollar, også i minus (tap like synlig som gevinst, B-030).
         Tall: EURUSD $10 per pip per 1,00 lot (K-165). Gull i dollar (UTTREKK linje 53); 100 unser per lot er vanlig (K-167),
         men sjekk megleren. Faller tilbake til den gamle figuren om noe feiler. */
      try{ const r = pipLinjal(); if(r) return r; }catch(e){}
      const g = S("svg",{viewBox:"0 0 320 56",role:"img","aria-label":"One pip is the fourth decimal"});
      g.appendChild(S("line",{x1:10,y1:34,x2:310,y2:34,stroke:"var(--rule)","stroke-width":"1.5"}));
      [[60,"1.0850"],[250,"1.0851"]].forEach(function(p,i){
        g.appendChild(S("circle",{cx:p[0],cy:34,r:5,fill:i?"var(--gold)":"var(--chalk-dim)"}));
        const t=S("text",{x:p[0],y:52,"text-anchor":"middle",fill:"var(--chalk-dim)","font-size":"10"});
        t.textContent=p[1]; g.appendChild(t);
      });
      const l=S("text",{x:155,y:18,"text-anchor":"middle",fill:"var(--chalk)","font-size":"11","font-weight":"700"});
      l.textContent="\u20661 pip = $0.10 at 0.01 lot\u2069"; g.appendChild(l);
      return g;
    }
    if(kind === "lot"){
      const rows=[["1.00","$10.00",100],["0.10","$1.00",34],["0.01","$0.10",12]];
      const g=S("svg",{viewBox:"0 0 320 "+(rows.length*24+4),role:"img","aria-label":"Lot size decides pip value"});
      rows.forEach(function(r,i){
        const y=i*24+3;
        const a=S("text",{x:0,y:y+13,fill:"var(--chalk-dim)","font-size":"11"}); a.textContent=r[0]; g.appendChild(a);
        g.appendChild(S("rect",{x:42,y:y+2,width:r[2]*1.5,height:14,rx:2,fill:"var(--gold)",opacity:"0.55"}));
        const b=S("text",{x:42+r[2]*1.5+7,y:y+13,fill:"var(--chalk)","font-size":"11","font-weight":"700"});
        b.textContent=r[1]+" / pip"; g.appendChild(b);
      });
      return g;
    }
    if(kind === "spread"){
      const g=S("svg",{viewBox:"0 0 320 52",role:"img","aria-label":"Spread is the gap you pay on entry"});
      g.appendChild(S("rect",{x:40,y:18,width:120,height:14,rx:2,fill:"var(--gold)",opacity:"0.3"}));
      g.appendChild(S("rect",{x:160,y:18,width:34,height:14,fill:"var(--ember)",opacity:"0.65"}));
      g.appendChild(S("rect",{x:194,y:18,width:86,height:14,rx:2,fill:"var(--gold)",opacity:"0.3"}));
      [[100,"sell 1.08500"],[177,"gap"],[237,"buy 1.08515"]].forEach(function(p){
        const t=S("text",{x:p[0],y:46,"text-anchor":"middle",fill:"var(--chalk-dim)","font-size":"10"});
        t.textContent=p[1]; g.appendChild(t);
      });
      const l=S("text",{x:177,y:12,"text-anchor":"middle",fill:"var(--chalk)","font-size":"10","font-weight":"700"});
      l.textContent="1.5 pips = $0.15"; g.appendChild(l);
      return g;
    }
    if(kind === "size"){
      const g=S("svg",{viewBox:"0 0 320 66",role:"img","aria-label":"Working out position size from risk"});
      [["$2 risk",0],["÷ 20 pips",88],["÷ $10",176],["= 0.01 lot",250]].forEach(function(p,i){
        const t=S("text",{x:p[1],y:30,fill:i===3?"var(--gold-soft)":"var(--chalk)","font-size":"12",
          "font-weight":i===3?"700":"400"});
        t.textContent=p[0]; g.appendChild(t);
      });
      g.appendChild(S("line",{x1:0,y1:42,x2:310,y2:42,stroke:"var(--rule)","stroke-width":"1"}));
      const n=S("text",{x:0,y:60,fill:"var(--chalk-dim)","font-size":"10"});
      n.textContent="decide the money first, then the size"; g.appendChild(n);
      return g;
    }
    if(kind === "dd"){
      const g=S("svg",{viewBox:"0 0 320 76",role:"img","aria-label":"Losses and recoveries are not symmetrical"});
      g.appendChild(S("rect",{x:40,y:8,width:112,height:18,rx:2,fill:"var(--ember)",opacity:"0.6"}));
      const a=S("text",{x:158,y:22,fill:"var(--chalk)","font-size":"11","font-weight":"700"});
      a.textContent="40 % down"; g.appendChild(a);
      g.appendChild(S("rect",{x:40,y:38,width:188,height:18,rx:2,fill:"var(--gold)",opacity:"0.6"}));
      const b=S("text",{x:234,y:52,fill:"var(--chalk)","font-size":"11","font-weight":"700"});
      b.textContent="67 % back"; g.appendChild(b);
      const n=S("text",{x:0,y:72,fill:"var(--chalk-dim)","font-size":"10"});
      n.textContent="$100 → $60 → needs $100 again"; g.appendChild(n);
      return g;
    }
    return null;
  }

  const LN = C.learn, ls = $("s-learn");
  if(LN && LN.terms && (LN.terms[lang] || LN.terms.en)){
    ls.hidden = false;
    $("learn-lede").textContent = LN.intro[lang] || LN.intro.en;
    /* #107 (founder 18.10): «live»-tilbud som faktisk finnes - Tag Markets' gratis live-undervisning
       (sett i portalen 18.10, K-128/K-130). Tider vises ikke her (tidssone ikke oppgitt) - de staar
       der man melder seg paa. */
    { const LV = C.learn_live && (C.learn_live[lang] || C.learn_live.en), host = $("learn-live");
      const tmL = (C.links.platform || []).find(function(x){ return /portal\.tagmarkets\.com/.test(x.url || ""); });
      if(host && LV){ host.textContent = ""; host.hidden = false;
        host.appendChild(el("b", null, "\uD83D\uDD34 " + LV.title)); host.appendChild(el("p", null, LV.body));
        if(tmL && safeUrl(tmL.url)){ const U = C.guide_ui[lang] || C.guide_ui.en; const a = el("a", "slab own"); a.href = tmL.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.appendChild(el("span", "t", (U.tm_btn || "Tag Markets") + " \u2197")); host.appendChild(a); } } }
    const lab = LN.labels[lang] || LN.labels.en;
    const host = $("learn-list"); host.textContent = ""; host.className = "learn";
    (LN.terms[lang] || LN.terms.en).forEach(function(t, i){
      const dt = document.createElement("details");
      const sm = el("summary", null, t[0]);
      dt.appendChild(sm);
      const bd = el("div","body");
      bd.appendChild(el("p","one",t[1]));
      const dl = document.createElement("dl");
      dl.appendChild(el("dt",null,lab[0]));
      dl.appendChild(el("dd","ex",t[2]));
      dl.appendChild(el("dt",null,lab[1]));
      dl.appendChild(el("dd",null,t[3]));
      if(t[4] && lab[2]){
        dl.appendChild(el("dt",null,lab[2]));
        const fx = el("dd","fx",t[4]); fx.setAttribute("dir","ltr");
        dl.appendChild(fx);
      }
      bd.appendChild(dl);
      if(t[5]){
        const lf = el("div","lfig");
        const made = learnFig(t[5]);
        if(made){ lf.appendChild(made); bd.appendChild(lf); }
      }
      { const sv = sendVenn(t[0], "ord-" + i); if(sv) bd.appendChild(sv); }
      dt.appendChild(bd);
      dt.id = "ord-" + i;
      host.appendChild(dt);
    });
    /* Academy: lengre leksjoner under ordlista, samme fold-moenster. Hver
       leksjon er [overskrift, avsnitt]-par; ingen av dem er raad (B-018). */
    const A = C.academy, ah = $("academy"); ah.textContent = "";
    const at = $("aca-t"), al = $("aca-lede");
    if(A && A.lessons && A.lessons.length){
      at.hidden = false; al.hidden = false;
      at.textContent = (A.title && (A.title[lang] || A.title.en)) || "Academy";
      al.textContent = (A.lead && (A.lead[lang] || A.lead.en)) || "";
      let antFerdig = 0;
      A.lessons.forEach(function(les, i){
        const dt = document.createElement("details");
        /* Founder 17.10 20:15 «visuelle ting»: ikon, nummer og hake naar quizen er riktig. */
        const Qd = les.quiz && (les.quiz[lang] || les.quiz.en);
        const ferdig = Qd && String(load("aimpire.quiz.les-" + (les.id || i))) === String(Qd.right);
        if(ferdig) antFerdig++;
        const sm = el("summary", ferdig ? "done" : null);
        const ik = el("span", "lic", LESIKON[les.id] || "\uD83D\uDCD8"); ik.appendChild(el("b", null, String(i + 1))); sm.appendChild(ik);
        const tx = el("span", "ltx"); tx.appendChild(el("span", "lt", (les.title[lang] || les.title.en)));
        const sub = les.sub && (les.sub[lang] || les.sub.en);
        if(sub) tx.appendChild(el("span", "sub", sub));
        sm.appendChild(tx);
        if(ferdig) sm.appendChild(el("span", "lok", "\u2713"));
        dt.appendChild(sm);
        const bd = el("div", "les");
        (les.blocks[lang] || les.blocks.en).forEach(function(bl){
          bd.appendChild(el("h4", null, bl[0]));
          bd.appendChild(el("p", null, bl[1]));
          /* Formler staar paa egen linje, alltid venstre-til-hoeyre - i RTL-flyt
             ville «= account × risk / 100» ellers blitt lest baklengs. */
          if(bl[2]){ const fx = el("p", "fx", bl[2]); fx.setAttribute("dir", "ltr"); bd.appendChild(fx); }
        });
        /* Ett øvingsspørsmål per leksjon (research #71: å teste seg gir bedre husking enn å lese på nytt). */
        if(les.quiz){ const Qz = les.quiz[lang] || les.quiz.en; if(Qz) bd.appendChild(quizBox(Qz, "les-" + (les.id || i), C.guide[lang] || C.guide.en)); }
        { const sv = sendVenn(les.title[lang] || les.title.en, "les-" + (les.id || i)); if(sv) bd.appendChild(sv); }
        dt.appendChild(bd);
        dt.id = "les-" + (les.id || i);
        ah.appendChild(dt);
      });
      /* Framdrift over leksjonene: «3 / 7» med stripe. */
      const pr = el("div", "lpro"); const bar = el("i"); const f = el("b"); f.style.width = (antFerdig / A.lessons.length * 100) + "%"; bar.appendChild(f);
      pr.appendChild(bar); pr.appendChild(el("span", null, antFerdig + " / " + A.lessons.length + " \u2713"));
      ah.prepend(pr);
      /* Merke naar alle leksjonene er fullfoert. */
      const MM = C.menu && (C.menu[lang] || C.menu.en);
      if(antFerdig === A.lessons.length && MM && MM.badge){ const bd = el("div", "lbadge", MM.badge); ah.prepend(bd); }
    } else { at.hidden = true; al.hidden = true; }
  } else { ls.hidden = true; }

  /* Alt unntatt lederverktoeyet skjules paa ledersiden, og motsatt. */
  if(PAGE === "leaders"){
    document.querySelectorAll(".sec").forEach(function(sec){
      if(sec.id !== "s-leaders") sec.hidden = true;
    });
    const h = document.querySelector(".hero"); if(h) h.hidden = true;
    visLagretLenke();
    ldStatus();
  } else {
    const ls = $("s-leaders"); if(ls) ls.hidden = true;
  }

  /* Figurene tegnes her, ikke lastes ned. De foelger temaet fordi de
     bruker CSS-variablene direkte. */
  function svgEl(t, attrs){
    const n = document.createElementNS("http://www.w3.org/2000/svg", t);
    Object.keys(attrs || {}).forEach(function(k){ n.setAttribute(k, attrs[k]); });
    return n;
  }
  function figLock(){
    const s = svgEl("svg", {viewBox:"0 0 320 74", role:"img",
      "aria-label":"Ten generations, none unlocked"});
    for(let i = 0; i < 10; i++){
      const x = i * 31 + 2;
      s.appendChild(svgEl("rect", {x:x, y:16, width:26, height:30, rx:3,
        fill:"none", stroke:"var(--rule)", "stroke-width":"1.5", "stroke-dasharray":"3 3"}));
      const t = svgEl("text", {x:x + 13, y:60, "text-anchor":"middle",
        fill:"var(--chalk-dim)", "font-size":"10"});
      t.textContent = String(i + 1);
      s.appendChild(t);
    }
    const c = svgEl("text", {x:2, y:10, fill:"var(--ember)", "font-size":"11", "font-weight":"700"});
    c.textContent = "0 / 10";
    s.appendChild(c);
    return s;
  }
  function figLadder(){
    /* AiTechs internasjonale stige (presentasjonen 03.10.2026, s. 21): ti nivaaer,
       inntil $8.50 per lot. Bredde relativt til nivaa 1 ($2.00 = 100). */
    const rows = [["1","$2.00",100],["2","$1.50",75],["3","$1.00",50],["4","$1.00",50],
      ["5","$0.50",25],["6","$0.50",25],["7","$0.50",25],["8","$0.50",25],["9","$0.50",25],["10","$0.50",25]];
    const s = svgEl("svg", {viewBox:"0 0 320 " + (rows.length * 26 + 6), role:"img",
      "aria-label":"Per-lot ladder across ten levels"});
    rows.forEach(function(r, i){
      const y = i * 26 + 4;
      const lv = svgEl("text", {x:0, y:y + 14, fill:"var(--chalk-dim)", "font-size":"11"});
      lv.textContent = r[0]; s.appendChild(lv);
      s.appendChild(svgEl("rect", {x:42, y:y + 3, width:r[2] * 1.5, height:14, rx:2,
        fill:"var(--gold)", opacity:(0.3 + (r[2] / 100) * 0.5).toFixed(2)}));
      const am = svgEl("text", {x:42 + r[2] * 1.5 + 7, y:y + 14,
        fill:"var(--chalk)", "font-size":"11", "font-weight":"700"});
      am.textContent = r[1]; s.appendChild(am);
    });
    return s;
  }

  const IB = C.ib, ibs = $("s-ib");
  if(IB && (IB[lang] || IB.en)){
    const B = IB[lang] || IB.en;
    ibs.hidden = false;
    $("ib-lede").textContent = B.lede;
    const ih = $("ib-body"); ih.textContent = ""; ih.className = "ib";
    B.blocks.forEach(function(bl){
      const sec = document.createElement("section");
      sec.appendChild(el("h3", null, bl[0]));
      sec.appendChild(el("p", null, bl[1]));
      if(bl[2] === "lock" || bl[2] === "ladder"){
        const fig = el("div","fig");
        fig.appendChild(bl[2] === "lock" ? figLock() : figLadder());
        fig.appendChild(el("p","cap", bl[2] === "lock" ? B.lock_cap : B.ladder_cap));
        sec.appendChild(fig);
        if(bl[2] === "ladder") sec.appendChild(el("p","flag", B.unverified));
      }
      if(bl[2] === "ledere"){
        /* Founder 17.10: soeknaden om egen lenke skal vaere en ekte handling ogsaa
           her, i samme form som resten - ikke en naken tekstlenke. */
        const SP = C.sponsor && (C.sponsor[lang] || C.sponsor.en);
        const a = el("a","slab own"); a.href = "ledere.html";
        a.appendChild(el("span","t", (SP && SP.own_link) || "ledere"));
        sec.appendChild(a);
      }
      ih.appendChild(sec);
    });
  } else { ibs.hidden = true; }

  const L = C.leaders[lang] || C.leaders.en;
  /* Lenken til IB Portal i teksten er trykkbar (founder 16.10) - ingen skal
     skrive den av. Bare https-lenker paa godkjente verter blir lenker. */
  { const bd = $("ld-body"); bd.textContent = "";
    String(L.body || "").split(/(https:\/\/[^\s«»()]+)/).forEach(function(bit){
      if(/^https:\/\//.test(bit) && safeUrl(bit)){ const a = el("a", "dlink ldlink", bit.replace(/^https:\/\//, "")); a.href = bit; a.target = "_blank"; a.rel = "noopener noreferrer"; bd.appendChild(a); }
      else bd.appendChild(document.createTextNode(bit));
    }); }
  /* Knappen til IB-portalen (founder 17.10 05:34: ledere ringer og spør hvor partnerlenken
     ligger). Stor nok til å se ut som en knapp, liten nok til ikke å konkurrere med «Søk». */
  { const pt = $("ld-portal-t"); if(pt) pt.textContent = L.portal_btn || (C.leaders.en.portal_btn || "IB Portal"); }
  /* Synlige etiketter over feltene (founder 17.10 03:49: detaljene paa partnersiden).
     Samme tekster som foer laa som ledetekst - de forsvant i det man begynte aa skrive. */
  safe(listeSkjema); safe(lenkenavnSkjema); safe(sosSkjema); safe(kildeSkjema); safe(renderHalal);
  /* #242: samme e-post = profiloppdatering, ikke ny søknad (B-044). Står fast under e-postfeltet. */
  safe(function(){ const m = $("ld-mail"); if(!m || !L.mail_same) return;
    let n = $("ld-mailsame"); if(!n){ n = el("p", "hint ldsame"); n.id = "ld-mailsame"; m.after(n); }
    n.textContent = L.mail_same; });
  [["ld-in", L.placeholder], ["ld-name", S.name_ph], ["ld-mail", L.mail_ph || ""], ["ld-spons", L.spons_ph || ""]]
    .forEach(function(par){
      const inp = $(par[0]); if(!inp) return;
      let lab = document.getElementById(par[0] + "-lab");
      if(!lab){
        lab = document.createElement("label");
        lab.id = par[0] + "-lab"; lab.className = "flab"; lab.htmlFor = par[0];
        inp.parentNode.insertBefore(lab, inp);
      }
      lab.textContent = par[1];
      inp.placeholder = "";
    });
  $("ld-hint").textContent = L.name_hint;
  /* Hvorfor nettopp partnerlenka fra IB-portalen (founder 16.10): en lenke
     kopiert et annet sted kobler ikke medlemmet til Tag Markets. */
  const lw = $("ld-why"); if(lw) lw.textContent = L.why || "";
  { const hb = $("ld-btn"); if(!hb.classList.contains("sent")) hb.textContent = L.button; else hb.textContent = L.sent_btn || L.applied;
    if(!hb.dataset.vakt){ hb.dataset.vakt = "1";
      ["ld-in","ld-name","ld-mail","ld-spons"].forEach(function(id){ const i = $(id); if(i) i.addEventListener("input", function(){
        const vu = validRef($("ld-in").value); if(hb.classList.contains("sent") && (!vu || load("aimpire.applied") !== codeOf(vu))){ hb.classList.remove("sent"); hb.disabled = false; hb.textContent = (C.leaders[lang] || C.leaders.en).button; } }); }); } }

  safe(renderLdKit);
  $("risk").textContent = C.risk[lang] || C.risk.en;
  /* Ansvarsfraskrivelsen staar under risikolinja, i samme rolige vekt. Den skal
     kunne leses, ikke skremme - derfor egen blokk og ikke en lengre risikolinje. */
  safe(renderKeep);
  try{ inAppBanner(); }catch(e){}
  safe(renderSearch);
  /* #130: risikolinja over staar alltid synlig; den lange forklaringen gjentok seg
     nederst paa hver fane. Den ligger nå bak ett trykk - samme tekst, ikke kortere. */
  const lg = $("legal"); lg.textContent = "";
  const lgd = el("details", "legald"); lgd.id = "legal-d";
  lgd.appendChild(el("summary", null, (C.legal_more && (C.legal_more[lang] || C.legal_more.en)) || "Aimpire"));
  String((C.legal && (C.legal[lang] || C.legal.en)) || "").split("\n\n")
    .forEach(function(t){ if(t.trim()) lgd.appendChild(el("p", null, t.trim())); });
  lg.appendChild(lgd);
  /* Aimpire har eksistert siden 2022 - ikke «startet i aar». */
  /* #180 (founder 19.10 04:19): «2022–2026» hoeres ut som om vi sluttet i 2026 - «2022 – i dag». */
  { const NAA = { en: "present", no: "i dag", hi: "अब तक", ur: "اب تک", ar: "حتى الآن", ur_rm: "ab tak", ar_rm: "hatta al-an" };
    const yr = $("yr"), ord = NAA[lang] || NAA[baseOf(lang)] || NAA.en;
    yr.textContent = "2022 \u2013 " + ord; yr.dir = /[\u0600-\u06FF]/.test(ord) ? "rtl" : "ltr"; }

  safe(renderApps);
  safe(renderResults);
  safe(renderAlt);
  utsett("earn", renderCalc);
  try{ temaTekst(); }catch(e){}
  utsett("tools", renderSessions);
  /* #204: oektlinja (121 ms paa billig Android: ~40 formatToParts) tegnes rett etter foerste bilde - plassen er reservert (min-height), saa ingenting hopper */
  setTimeout(function(){ try{ oektVis(); }catch(e){} }, 0);
  try{ renderPos(); }catch(e){}
  try{ renderMargin(); }catch(e){}
  try{ renderFib(); }catch(e){}
  try{ renderCommunity(); }catch(e){}
  /* #100: tapsrekke-simulatoren (~0,3 s) tegnes foerst naar Verktoey vises. */
  utsett("tools", renderStreak);
  try{ renderGrowth(); }catch(e){}
  try{ renderJournal(); }catch(e){}
  safe(renderWithdraw);
  safe(renderBonuses);
  safe(renderIbq);
  safe(renderShort);
  safe(renderFaq);
  safe(renderMenu);
  safe(markUiLabels);
  safe(markTerms);
  safe(isolateFigures);
  safe(ibAkkordion);
  applyView();
  /* #100: foerste tegning ferdig - vis resten (toppen var forhaandstegnet). */
  document.documentElement.classList.add("klar");
}

/* Tall med tegn i hoeyre-til-venstre-tekst. $, x, % og : er «svake» tegn i
   Unicode-bidi og havner paa feil side av tallet: $109 ble vist som 109$, 12x
   som x12 - og 1:30 kan bli 30:1, som snur betydningen. Hver slik bit pakkes
   i usynlige isolater (LRI ... PDI) saa den alltid leses venstre-til-hoeyre.
   Kjoeres paa hver render, saa nytt innhold dekkes uten at noen husker det. */
const FIGURE_RX = new RegExp([
  "\\d[\\d,.]*(?::\\d+)?(?:\\s?[\\u00f7\\u00d7=]\\s?\\d[\\d,.]*(?::\\d+)?)+(?:\\s?%)?",  // 1 / 24 = 4.2 %, 24 x 30 = 720:1 (hele formelen)
  "[+\\u2212]?\\$\\s?\\d[\\d,.]*",       // $109  $2,616  $0.60  \u2212$5
  "\\d[\\d,.]*\\s?\\u00d7",              // 12x  24x
  "\\u00d7\\s?\\d[\\d,.]*",              // x 0.70
  "[+\\u2212]?\\d[\\d,.]*\\s?%",          // 10%  5 %  +30.6 %  \u22120.86 %
  "\\d+(?:\\s?/\\s?\\d+)+",              // 70 / 5 / 25
  "\\d+:\\d+",                           // 1:30  1:500
  "#[A-Za-z][A-Za-z0-9]*",                 // #Aitech
  "@[A-Za-z0-9_][A-Za-z0-9_.]*[A-Za-z0-9_]"  // @aim.pire
].join("|"), "g");
/* Slideren fyrer mange ganger per sekund; én gjennomgang per bilde holder (funn A13). */
let isoPlanlagt = false;
function planleggIsolering(){
  if(isoPlanlagt) return; isoPlanlagt = true;
  (window.requestAnimationFrame || function(f){ setTimeout(f, 16); })(function(){ isoPlanlagt = false; isolateFigures(); });
}
function isolateFigures(){
  if(document.documentElement.dir !== "rtl") return;
  const root = document.querySelector(".shell");
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function(n){
      const p = n.parentNode;
      if(!p || p.closest("svg, script, style, [dir=ltr]")) return NodeFilter.FILTER_REJECT;
      if(n.data.indexOf("\u2066") !== -1) return NodeFilter.FILTER_REJECT;
      FIGURE_RX.lastIndex = 0;
      return FIGURE_RX.test(n.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(function(n){
    n.data = n.data.replace(FIGURE_RX, function(m){ return "\u2066" + m + "\u2069"; });
  });
}

/* Knapper og felt slik de STAAR paa skjermen hos megleren og i appene - paa
   engelsk, fordi det er det medlemmet ser. Founder 15.10: ingen skal sitte og
   gjette om «Next» er «aage». Hver knapp blir en liten knapp i teksten, og paa
   hindi/urdu/arabisk faar den foerste forekomsten i hvert avsnitt en kort
   forklaring i parentes. Selve oversettelsene endres ikke. */
const UI_ROOTS = "#s-guide, #s-withdraw, #s-amplify, #s-faq";
/* Fagordene staar paa engelsk i alle spraak (sidens egen regel), saa de kan
   finnes likt overalt. Foerste gang et ord dukker opp i et avsnitt, blir det
   trykkbart og aapner forklaringen i Laer. Ingen nye tekster: forklaringene
   finnes allerede paa fem spraak. */
const ORD = { pip: 0, pips: 0, point: 1, points: 1, spread: 2, lot: 3, lots: 3,
  leverage: 4, margin: 4, balance: 5, equity: 5, "stop-loss": 7, drawdown: 10 };
function markTerms(){
  const L = C.learn && (C.learn.terms[lang] || C.learn.terms.en); if(!L) return;
  const rx = new RegExp("(^|[^A-Za-z0-9-])(" + Object.keys(ORD).sort(function(a, b){ return b.length - a.length; }).join("|") + ")(?![A-Za-z0-9-])", "gi");
  document.querySelectorAll("#s-guide, #s-amplify, #s-withdraw").forEach(function(root){
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        const p = n.parentNode;
        if(!p || p.closest("h2, h3, summary, button, a, .ui, .gl, .codes, .qz, svg")) return NodeFilter.FILTER_REJECT;
        rx.lastIndex = 0;
        return rx.test(n.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = []; while(w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(function(n){
      const blokk = n.parentNode.closest("li, p, dd, div") || n.parentNode;
      const sett = blokk.__ord || (blokk.__ord = new Set());
      const frag = document.createDocumentFragment(); let sist = 0, m;
      rx.lastIndex = 0;
      while((m = rx.exec(n.data))){
        const at = m.index + m[1].length, ord = m[2], nokkel = ord.toLowerCase();
        if(sett.has(nokkel)){ continue; }
        sett.add(nokkel);
        frag.appendChild(document.createTextNode(n.data.slice(sist, at)));
        const b = el("button", "ordb", ord); b.type = "button";
        b.onclick = function(){ apneOrd(ORD[nokkel]); };
        frag.appendChild(b);
        sist = at + ord.length;
      }
      if(!sist) return;
      frag.appendChild(document.createTextNode(n.data.slice(sist)));
      n.parentNode.replaceChild(frag, n);
    });
  });
}
function apneOrd(i){
  setView("learn");
  setTimeout(function(){
    const d = $("ord-" + i); if(!d) return;
    d.open = true;
    d.scrollIntoView({ block: "center" });
  }, 60);
}
function markUiLabels(){
  const U = C.ui_labels; if(!U || !U.labels || !U.labels.length) return;
  const G = (U.gloss && U.gloss[lang]) || {};
  const esc = function(t){ return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
  const rx = new RegExp("(^|[^A-Za-z0-9])(" + U.labels.slice().sort(function(a, b){ return b.length - a.length; }).map(esc).join("|") + ")(?![A-Za-z0-9])", "g");
  document.querySelectorAll(UI_ROOTS).forEach(function(root){
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        const p = n.parentNode;
        if(!p || p.closest("h2, h3, summary, button, a, .ui, .codes, svg")) return NodeFilter.FILTER_REJECT;
        rx.lastIndex = 0;
        return rx.test(n.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = []; while(w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(function(n){
      const block = n.parentNode.closest("li, p, dd, div") || n.parentNode;
      const seen = block.__ui || (block.__ui = new Set());
      const frag = document.createDocumentFragment(); let last = 0, m;
      rx.lastIndex = 0;
      while((m = rx.exec(n.data))){
        const at = m.index + m[1].length, lab = m[2];
        frag.appendChild(document.createTextNode(n.data.slice(last, at)));
        const chip = el("span", "ui", lab); chip.dir = "ltr"; frag.appendChild(chip);
        if(G[lab] && !seen.has(lab)){ seen.add(lab); frag.appendChild(el("span", "gl", " (" + G[lab] + ")")); }
        last = at + lab.length;
      }
      frag.appendChild(document.createTextNode(n.data.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  });
}

/* Apper: samme knapper som i steg 8 og 9, og URL-ene er de samme -
   de ligger ett sted i innholdet. */
/* Sonic sin historikk fra Myfxbook: gevinst opp, maanedens stoerste dupp ned,
   paa SAMME skala - saa forholdet synes uten aa lese tall. Tidsaksen er
   venstre-til-hoeyre ogsaa paa urdu og arabisk, som grafer vanligvis er. */
/* Bank, fond eller Sonic: samme spoersmaal for tre steder aa ha penger.
   Avkastning og risiko staar paa samme rad - aldri avkastning alene. */
function renderAlt(){
  const A = C.alt_compare && (C.alt_compare[lang] || C.alt_compare.en), host = $("alt");
  if(!host) return;
  if(!A){ host.hidden = true; return; }
  host.hidden = false; host.textContent = "";
  host.appendChild(el("h3", null, A.title));
  host.appendChild(el("p", "lede", A.lede));
  const h = el("div", "alth"); A.cols.forEach(function(c){ h.appendChild(el("b", null, c)); }); host.appendChild(h);
  A.rows.forEach(function(r){
    const row = el("div", "altrow"); row.appendChild(el("span", null, r[0]));
    r.slice(1).forEach(function(v){ row.appendChild(el("b", null, v)); });
    host.appendChild(row);
  });
  A.notes.forEach(function(n){ host.appendChild(el("p", "vnote vsnote", n)); });
  host.appendChild(el("p", "disc", A.disclaimer));
}
function renderResults(){
  const R = C.results, host = $("rs-fig");
  if(!R || !host) return;
  const T = R[lang] || R.en;
  $("rs-lede").textContent = T.lede;
  const NS = "http://www.w3.org/2000/svg";
  const mk = function(tag, a){ const n = document.createElementNS(NS, tag); for(const k in a) n.setAttribute(k, a[k]); return n; };
  const W = 330, base = 92, k = 40, n = R.months.length, slot = (W - 12) / n, bw = Math.max(4, slot * 0.6);
  const svg = mk("svg", {viewBox: "0 0 " + W + " 150", role: "img", "aria-label": T.lede});
  svg.appendChild(mk("line", {x1: 4, x2: W - 4, y1: base, y2: base, stroke: "var(--rule)", "stroke-width": 1}));
  /* Aarstallet staar midt under sitt eget aar, med skillestrek mellom aarene.
     Et aar med bare to maaneder (2024) skal ikke kollidere med det neste. */
  const span = {};
  let pekt = null;
  R.months.forEach(function(m, i){
    const x = 6 + i * slot + (slot - bw) / 2, g = Math.max(0, m[1]), dd = Math.max(0, m[2]);
    svg.appendChild(mk("rect", {x: x, y: base - g * k, width: bw, height: Math.max(0.5, g * k), rx: 1.5, fill: "var(--gold)"}));
    if(dd > 0) svg.appendChild(mk("rect", {x: x, y: base + 2, width: bw, height: Math.max(1, dd * k), rx: 1.5, fill: "var(--ember)"}));
    /* Trykk paa en maaned og se tallene hennes - avlesningen er bare tall, lik paa alle spraak. */
    const hit = mk("rect", {x: 6 + i * slot, y: 6, width: slot, height: base + 36, fill: "transparent"});
    hit.style.cursor = "pointer";
    const tt = document.createElementNS(NS, "title");
    tt.textContent = m[0] + "  +" + m[1].toFixed(2) + " %  \u2212" + m[2].toFixed(2) + " %";
    hit.appendChild(tt);
    hit.addEventListener("click", function(){
      if(!pekt){ pekt = el("p", "rs-pick"); pekt.setAttribute("dir", "ltr"); host.appendChild(pekt); }
      pekt.textContent = m[0] + "   +" + m[1].toFixed(2) + " %   \u2212" + m[2].toFixed(2) + " %";
    });
    svg.appendChild(hit);
    const y = m[0].slice(0, 4);
    if(!span[y]) span[y] = [i, i]; else span[y][1] = i;
  });
  Object.keys(span).forEach(function(y, j){
    const a = span[y][0], b = span[y][1], x0 = 6 + a * slot, x1 = 6 + (b + 1) * slot;
    if(j > 0) svg.appendChild(mk("line", {x1: x0, x2: x0, y1: base + 40, y2: base + 54, stroke: "var(--edge-ui)"}));
    const tx = mk("text", {x: (x0 + x1) / 2, y: base + 52, "font-size": 10, "text-anchor": "middle", fill: "var(--chalk-dim)", "font-family": "Montserrat, sans-serif"});
    tx.textContent = (b - a < 3) ? "\u2019" + y.slice(2) : y; svg.appendChild(tx);
  });
  const top = mk("text", {x: 4, y: base - 2 * k - 2, "font-size": 9, fill: "var(--chalk-dim)", "font-family": "Montserrat, sans-serif"});
  top.textContent = "2 %"; svg.appendChild(top);
  svg.appendChild(mk("line", {x1: 22, x2: W - 4, y1: base - 2 * k, y2: base - 2 * k, stroke: "var(--rule)", "stroke-dasharray": "2 3"}));
  host.textContent = ""; host.appendChild(svg);
  const lg = $("rs-leg"); lg.textContent = "";
  [["var(--gold)", T.legend[0]], ["var(--ember)", T.legend[1]]].forEach(function(p){
    const sw = el("i"); sw.style.background = p[0]; lg.appendChild(sw); lg.appendChild(el("span", null, p[1]));
  });
  const dl = $("rs-stat"); dl.textContent = "";
  T.stats.forEach(function(lbl, i){ const w = el("div"); w.appendChild(el("dt", null, lbl)); w.appendChild(el("dd", null, R.stats[i])); dl.appendChild(w); });
  const ul = $("rs-notes"); ul.textContent = "";
  /* #162: risikonotatene staar aapent; hvordan tallene er maalt og avstemt (hull, CopyX vs Myfxbook)
     ligger i en fold - aapent skapte det «hvilket tall lyver?» hos leseren. */
  const mf = (C.results && C.results.method_from) || T.notes.length;
  T.notes.slice(0, mf).forEach(function(nt){ ul.appendChild(el("li", null, nt)); });
  const gml = $("rs-method"); if(gml) gml.remove();
  if(T.notes.length > mf && T.method_t){
    const d = el("details", "fold rsmethod"); d.id = "rs-method"; d.appendChild(el("summary", null, T.method_t));
    const u2 = el("ul", "rsnotes"); T.notes.slice(mf).forEach(function(nt){ u2.appendChild(el("li", null, nt)); }); d.appendChild(u2);
    ul.after(d);
  }
  $("rs-formula").textContent = T.formula;
  $("rs-tabsum").textContent = T.table;
  const tb = $("rs-tab"); tb.textContent = "";
  const hr = el("tr"); ["", T.legend[0], T.legend[1]].forEach(function(h){ hr.appendChild(el("th", null, h)); }); tb.appendChild(hr);
  R.months.forEach(function(m){ const tr = el("tr"); tr.appendChild(el("td", null, m[0])); tr.appendChild(el("td", null, "+" + m[1].toFixed(2) + " %")); tr.appendChild(el("td", null, (m[2] ? "−" : "") + m[2].toFixed(2) + " %")); tb.appendChild(tr); });
  const a = $("rs-link");
  if(safeUrl(R.source)){ a.href = R.source; a.textContent = T.link; } else { a.removeAttribute("href"); a.textContent = ""; }
  /* Kilden som knapp øverst (#66): medlemmet ser med en gang at tallene kan sjekkes,
     og lenken viser alltid dagens tall - et skjermbilde ville vært utdatert i morgen. */
  { const sb = $("rs-src"); if(sb){ if(safeUrl(R.source)){ sb.href = R.source; $("rs-src-t").textContent = T.link; sb.hidden = false; } else sb.hidden = true; } }
  $("rs-read").textContent = T.read;
}
/* Kalkulatoren legger historikkens EKTE maaneder paa medlemmets beloep:
   beholdt = beloep x 24 x maanedens gevinst x 0,70, profitten tatt ut hver
   maaned (ingen renters rente). Nedsiden staar like stort ved siden av, og
   den sier selv hvorfor den ikke er en prognose. Vises bare naar founder
   har slaatt den paa (calculator.live) - compliance-porten i CLAUDE.md. */
let calcPeriod = 12;
/* #156: lest foer sponsorlogikken rydder adressen (den fjerner alt annet enn l og lang). */
const KALK_Q = (function(){ try{ return new URLSearchParams(location.search); }catch(e){ return null; } })();
/* Øktklokke: tid i byens sone -> øyeblikk; alt vises i telefonens egen tid. */
/* #204: Intl.DateTimeFormat er dyrt aa lage (maalt: oektlinja + klokka ~250 ms paa billig Android, mest her). Én formaterer per sone, gjenbrukes. */
const TZ_FMT = {};
function tzFmt(tz, n){ const k = tz + "|" + n; return TZ_FMT[k] || (TZ_FMT[k] = new Intl.DateTimeFormat("en-US", n === 1
  ? { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }
  : { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })); }
function tzOff(tz, d){
  const p = tzFmt(tz, 1).formatToParts(d);
  const g = function(t){ return +p.find(function(x){ return x.type === t; }).value; };
  return (Date.UTC(g("year"), g("month") - 1, g("day"), g("hour") % 24, g("minute"), g("second")) - Math.floor(d.getTime() / 1000) * 1000) / 60000;
}
function vegg(tz, y, m, d, hh, mm){
  const gjett = Date.UTC(y, m, d, hh, mm);
  let t = gjett - tzOff(tz, new Date(gjett)) * 60000;
  const o2 = tzOff(tz, new Date(t)); t = gjett - o2 * 60000;
  return new Date(t);
}
function dagI(tz, d){
  const p = tzFmt(tz, 2).formatToParts(d);
  const g = function(t){ return p.find(function(x){ return x.type === t; }).value; };
  return { y: +g("year"), m: +g("month") - 1, d: +g("day"), wd: g("weekday"), h: +g("hour"), mi: +g("minute") };
}
function klokke(d){ return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }
let ssTimer = null;
/* #92 v2 (founder 17.10 14:50: «mer levende … vaer innovativ», 14:51: «avansert = techen»).
   Et 24-timers urskive i SVG: hver oekt er en bue som lyser naar den er aapen, viseren
   gaar rundt med din tid, London+New York-overlappen glitrer, og klokka i midten tikker.
   Kortene og stripen paa startskjermen teller ned hvert sekund. Alt er SVG + CSS -
   ingen biblioteker - og «redusert bevegelse» paa telefonen skrur av animasjonene. */
let SS = null, MKNOW = null;
const SVGNS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs){ const e = document.createElementNS(SVGNS, tag); for(const k in attrs) e.setAttribute(k, attrs[k]); return e; }
function nedtelling(ms){
  const s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  return h + ":" + String(m).padStart(2, "0") + ":" + String(x).padStart(2, "0");
}
/* Varighet i korte merkelapper: «t» er norsk; ellers den internasjonale «h»
   (funnet 17.10: arabisk viste «23t 55m»). */
function varighet(h, mi){ return (h ? h + (baseOf(lang) === "no" ? "t " : "h ") : "") + mi + "m"; }
/* #207 (founder 19.10: «A»). TradingView-kurslinje (K-137, B-042): NAS100, DJ30, SPX500 og populaere valutapar, som
   founder ba om («nas100 dj30 spx500 … andre populære valutaer», «spinne til høyre eller venstre»). Lastes foerst etter
   at appen er aapnet (ikke paa foerste visning, #204), og med «Datasparing» paa bare naar man trykker.
   Gull, soelv og krypto staar allerede i vaar egen rad - ikke dobbelt. Bytter farge med lys/moerk. */
const TV_SYM = [["FOREXCOM:NSXUSD", "NAS100"], ["FOREXCOM:DJI", "DJ30"], ["FOREXCOM:SPXUSD", "SPX500"], ["FX_IDC:EURUSD", "EURUSD"],
  ["FX_IDC:GBPUSD", "GBPUSD"], ["FX_IDC:USDJPY", "USDJPY"], ["FX_IDC:AUDUSD", "AUDUSD"], ["FX_IDC:USDCAD", "USDCAD"],
  ["FX_IDC:USDCHF", "USDCHF"], ["FX_IDC:NZDUSD", "NZDUSD"], ["FX_IDC:GBPJPY", "GBPJPY"], ["FX_IDC:EURJPY", "EURJPY"]];
let TV_TEMA = "";
function tvTape(){
  const box = $("tvtape"); if(!box || PAGE === "leaders") return;
  const tema = document.documentElement.getAttribute("data-theme") || "dark";
  if(TV_TEMA === tema && box.querySelector(".tradingview-widget-container")) return;
  TV_TEMA = tema; box.textContent = ""; box.hidden = false;
  const w = el("div", "tradingview-widget-container"); w.appendChild(el("div", "tradingview-widget-container__widget"));
  const cr = el("div", "tradingview-widget-copyright"); const a = el("a", null, "TradingView"); a.href = "https://www.tradingview.com/"; a.target = "_blank"; a.rel = "noopener nofollow noreferrer"; cr.appendChild(a); w.appendChild(cr);
  const sc = document.createElement("script"); sc.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"; sc.async = true;
  sc.textContent = JSON.stringify({ symbols: TV_SYM.map(function(x){ return { proName: x[0], title: x[1] }; }), showSymbolLogo: false, isTransparent: true, displayMode: "compact", colorTheme: tema === "light" ? "light" : "dark", locale: "en" });
  w.appendChild(sc); box.appendChild(w);
}
var TV_VENT = false;   /* var, ikke let: applyView kan kjøre før denne linja (ingen TDZ-feil) */
function tvStart(){
  const box = $("tvtape"); if(!box || PAGE === "leaders" || box.childNodes.length) return;
  /* #254: skjult på Hjem - ikke hent tredjepartsdata i det skjulte (billig Android, dyr mobildata). Startes når en trading-fane vises. */
  if(box.offsetParent === null && !box.hidden){ TV_VENT = true; return; } TV_VENT = false;
  let spar = false; try{ spar = !!(navigator.connection && navigator.connection.saveData); }catch(e){}
  if(spar){ box.hidden = false; const b = el("button", "tvlast", "\uFF0B NAS100 \u00b7 DJ30 \u00b7 SPX500 \u00b7 EURUSD \u2026"); b.type = "button";
    b.setAttribute("aria-label", "Show more prices (TradingView)"); b.onclick = tvTape; box.appendChild(b); return; }
  tvTape();
  /* Plassen er reservert fra start (ingen hopp). Kommer TradingView ikke (blokkert/nede), skjules raden. */
  setTimeout(function(){ if(!box.querySelector("iframe")) box.hidden = true; }, 15000);
}
window.addEventListener("load", function(){ setTimeout(function(){ try{ (window.requestIdleCallback || setTimeout)(function(){ try{ tvStart(); }catch(e){} }); }catch(e){} }, 2500); });
try{ new MutationObserver(function(){ if(TV_TEMA) try{ tvTape(); }catch(e){} }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] }); }catch(e){}
/* #205: hvilke oekter er aapne akkurat naa - samme timer og regler som klokka i Verktøy, men uten aa tegne den. */
function oektVis(){
  const b = $("oekt"), K = C.sessions; if(!b || !K || !K.hours || PAGE === "leaders") return;
  const T = K[lang] || K.en, nu = new Date(), ny = dagI("America/New_York", nu);
  const helg = (ny.wd === "Fri" && ny.h >= 17) || ny.wd === "Sat" || (ny.wd === "Sun" && ny.h < 17);
  const apne = []; let forst = null;
  if(!helg) K.hours.forEach(function(h){
    const d = dagI(h[1], nu);
    for(let k = -1; k <= 0; k++){ const base = new Date(Date.UTC(d.y, d.m, d.d + k));
      const a = vegg(h[1], base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), h[2], 0), z = vegg(h[1], base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), h[3], 0);
      if(a <= nu && nu < z){ const o = { navn: T.cities[h[0]] || h[0], farge: h[4], a: a, z: z }; apne.push(o); if(!forst || z < forst.z) forst = o; break; } }
  });
  /* #214 (founder «grønne dotten var stygg»): ingen emoji. Rolig pulserende prikk (merkefarge), én brikke per aapen
     oekt i samme farge som klokka i Verktøy, og en tynn linje for hvor langt oekta som stenger foerst har kommet.
     Tekstene er de samme som foer (emoji tas bort i koden), saa ingen ny oversettelse trengs. */
  const uten = function(t){ return String(t || "").replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\s]+/u, ""); };
  b.textContent = ""; b.classList.toggle("sover", !apne.length);
  const r1 = el("span", "r1"); r1.appendChild(el("i", "puls"));
  if(apne.length){
    const mal = uten(T.now_open), i = mal.indexOf("{L}");
    r1.appendChild(el("span", "lab", (i > 0 ? mal.slice(0, i) : mal).replace(/[:\s]+$/, "")));
    apne.forEach(function(o){ const c = el("span", "okchip"); c.style.setProperty("--c", o.farge); c.appendChild(el("i")); c.appendChild(document.createTextNode(o.navn)); r1.appendChild(c); });
  } else r1.appendChild(el("span", "lab", uten(helg ? T.now_weekend : T.now_none)));
  b.appendChild(r1);
  if(forst && T.closes_in){ const ms = forst.z - nu, pst = Math.max(0, Math.min(100, (nu - forst.a) / (forst.z - forst.a) * 100));
    const r2 = el("span", "r2"); const bar = el("i", "bar"); bar.style.setProperty("--c", forst.farge); const fyll = el("b"); fyll.style.width = pst.toFixed(1) + "%"; bar.appendChild(fyll); r2.appendChild(bar);
    r2.appendChild(el("span", "st", forst.navn + " " + T.closes_in.replace("{T}", "\u2066" + varighet(Math.floor(ms / 36e5), Math.floor(ms % 36e5 / 6e4)) + "\u2069"))); b.appendChild(r2); }
  if(!apne.length && T.opens_in){
    /* #225: naar alt sover (natt eller helg) - hvem aapner naar? Helg: foerste oekt som er aapen naar markedet aapner
       soendag 17:00 New York. Ellers: foerste aapning etter naa. Samme tekst som klokka (opens_in). */
    let fra = nu.getTime();
    if(helg){ const dd = ny.wd === "Fri" ? 2 : ny.wd === "Sat" ? 1 : 0, u = new Date(Date.UTC(ny.y, ny.m, ny.d + dd));
      fra = vegg("America/New_York", u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate(), 17, 0).getTime(); }
    let neste = null;
    K.hours.forEach(function(h){
      const d = dagI(h[1], new Date(fra));
      for(let k = -1; k <= 2; k++){ const base = new Date(Date.UTC(d.y, d.m, d.d + k));
        const a = vegg(h[1], base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), h[2], 0).getTime(), z = vegg(h[1], base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), h[3], 0).getTime();
        const start = (a <= fra && fra < z) ? fra : (a > fra ? a : 0);
        if(start){ if(!neste || start < neste.start) neste = { navn: T.cities[h[0]] || h[0], farge: h[4], start: start }; break; } }
    });
    if(neste){ const ms = Math.max(0, neste.start - nu.getTime());
      const r2 = el("span", "r2"); const ch = el("span", "okchip"); ch.style.setProperty("--c", neste.farge); ch.appendChild(el("i")); ch.appendChild(document.createTextNode(neste.navn)); r2.appendChild(ch);
      r2.appendChild(el("span", "st", T.opens_in.replace("{T}", "\u2066" + varighet(Math.floor(ms / 36e5), Math.floor(ms % 36e5 / 6e4)) + "\u2069"))); b.appendChild(r2); }
  }
  const go = el("span", "go", "\u203A"); go.setAttribute("aria-hidden", "true"); b.appendChild(go);
  b.onclick = function(){ aapneMarked(); };
  b.hidden = false;
}
setInterval(function(){ if(!document.hidden){ try{ oektVis(); }catch(e){} if(view === "tools") try{ vaktOppdater(); }catch(e){} } }, 60000);
function renderSessions(){
  const K = C.sessions, sec = $("s-sessions");
  /* Gull-charten under klokka (founder 22:58): her ser den som laerer markedet, markedet. */
  try{ const Q = C.short && C.short["s-amplify"] && (C.short["s-amplify"][lang] || C.short["s-amplify"].en);
    const hc = $("ss-chart"), ht = $("ss-chart-t"), hn = $("ss-chart-n");
    if(Q && Q.chart_t && hc){ ht.textContent = Q.chart_t; ht.hidden = false; hn.textContent = Q.chart_note || ""; hn.hidden = !Q.chart_note;
      if(!hc.firstChild) hc.appendChild(gullChart()); } }catch(e){}
  if(!K || !sec) return;
  const T = K[lang] || K.en, nu = new Date();
  $("t-sessions").textContent = T.title; $("ss-lede").textContent = T.lede; $("ss-note").textContent = T.note;
  const ny = dagI("America/New_York", nu);
  const helg = (ny.wd === "Fri" && ny.h >= 17) || ny.wd === "Sat" || (ny.wd === "Sun" && ny.h < 17);
  const midnatt = new Date(nu); midnatt.setHours(0, 0, 0, 0);
  const dagSlutt = new Date(midnatt.getTime() + 864e5);
  const liste = $("ss-list"); liste.textContent = "";
  const ltr = function(t){ return "⁦" + t + "⁩"; };
  const zz = T.asleep || T.closed;
  const M = [], intervaller = {};
  K.hours.forEach(function(h){
    const id = h[0], tz = h[1], fra = h[2], til = h[3], farge = h[4];
    const idag = dagI(tz, nu), alle = [];
    for(let k = -1; k <= 3; k++){
      const base = new Date(Date.UTC(idag.y, idag.m, idag.d + k));
      alle.push([vegg(tz, base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), fra, 0), vegg(tz, base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), til, 0)]);
    }
    intervaller[id] = alle;
    M.push({ id: id, tz: tz, farge: farge, navn: T.cities[id] || id, alle: alle });
  });
  /* Helg: neste aapning er soendag kl. 17 New York eller senere - finn den foerste
     oekta som starter etter det, saa nedtellingen ikke peker paa en lukket dag. */
  let helgSlutt = null;
  if(helg){
    helgSlutt = vegg("America/New_York", ny.y, ny.m, ny.d, 17, 0); let n = 0;
    while((dagI("America/New_York", helgSlutt).wd !== "Sun" || helgSlutt <= nu) && n < 5){ helgSlutt = new Date(helgSlutt.getTime() + 864e5); n++; }
  }
  const apne = [], sover = [];
  M.forEach(function(m){
    m.aktiv = helg ? null : m.alle.find(function(iv){ return iv[0] <= nu && nu < iv[1]; }) || null;
    m.neste = m.alle.find(function(iv){ return iv[0] > nu && (!helgSlutt || iv[1] > helgSlutt); }) || null;
    if(m.neste && helgSlutt && m.neste[0] < helgSlutt) m.neste = [helgSlutt, m.neste[1]];
    (m.aktiv ? apne : sover).push(m.navn);
    const vis = m.aktiv || m.neste || m.alle[1];
    const li = el("li", m.aktiv ? "on" : "off"); li.style.setProperty("--c", m.farge);
    const cn = el("span", "cn"); const dt = el("i", "dot"); dt.style.background = m.farge; cn.appendChild(dt); cn.appendChild(document.createTextNode(m.navn));
    if(!m.aktiv){ const z = el("span", "zz"); z.setAttribute("aria-hidden", "true"); ["z", "z", "z"].forEach(function(t){ z.appendChild(el("i", null, t)); }); cn.appendChild(z); }
    li.appendChild(cn);
    const hr = el("span", "hr", klokke(vis[0]) + "–" + klokke(vis[1])); hr.dir = "ltr"; li.appendChild(hr);
    m.st = el("span", "st"); li.appendChild(m.st);
    if(m.aktiv){ const pg = el("i", "pg"); m.pg = el("b"); pg.appendChild(m.pg); li.appendChild(pg); }
    if(T.local){ m.lt = el("span", "lt"); li.appendChild(m.lt); }
    liste.appendChild(li);
  });
  const naaTekst = helg ? [T.now_weekend] : [apne.length ? T.now_open.replace("{L}", apne.join(" · ")) : T.now_none, apne.length && sover.length ? T.now_asleep.replace("{L}", sover.join(" · ")) : ""].filter(Boolean);
  if(T.now_open){ const sn = $("ss-now"); sn.textContent = ""; naaTekst.forEach(function(t){ sn.appendChild(el("span", null, t)); }); }
  let sone = ""; try{ sone = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").split("/").pop().replace(/_/g, " "); }catch(e){}
  if(T.you) $("ss-you").textContent = T.you.replace("{T}", ltr(klokke(nu))).replace("{Z}", ltr(sone)).replace(/ · $/, "");

  /* London + New York-overlapp i dag (lokal dag) */
  let ov = null;
  intervaller.london.forEach(function(L){ intervaller.newyork.forEach(function(N){
    const a = Math.max(L[0], N[0]), b = Math.min(L[1], N[1]);
    if(b > a && (!ov || Math.abs(a - nu) < Math.abs(ov[0] - nu))) ov = [new Date(a), new Date(b)];
  }); });

  /* ---- Urskiven ---- */
  const dial = $("ss-dial");
  let hand = null, klT = null, klS = null;
  if(dial){
    dial.textContent = "";
    const W = 320, c = 160;
    const vinkel = function(t){ return ((t - midnatt) / 864e5) * 360 - 90; };
    const pkt = function(r, deg){ const a = deg * Math.PI / 180; return [c + r * Math.cos(a), c + r * Math.sin(a)]; };
    const bue = function(r, d0, d1){
      const p0 = pkt(r, d0), p1 = pkt(r, d1), stor = (d1 - d0) > 180 ? 1 : 0;
      return "M" + p0[0].toFixed(2) + " " + p0[1].toFixed(2) + " A" + r + " " + r + " 0 " + stor + " 1 " + p1[0].toFixed(2) + " " + p1[1].toFixed(2);
    };
    const svg = svgEl("svg", { viewBox: "0 0 " + W + " " + W, role: "img", "aria-label": naaTekst.join(" ") });
    const defs = svgEl("defs", {});
    const rg = svgEl("radialGradient", { id: "ssbg" });
    rg.appendChild(svgEl("stop", { offset: "0%", "stop-color": "var(--dial-in, #1d1830)" }));
    rg.appendChild(svgEl("stop", { offset: "100%", "stop-color": "var(--dial-out, #0c0a14)" }));
    defs.appendChild(rg); svg.appendChild(defs);
    svg.appendChild(svgEl("circle", { cx: c, cy: c, r: 156, fill: "url(#ssbg)", class: "face" }));
    /* Dag og natt i din egen tid: lys bue 06-18, moerk 18-06 */
    const tid = function(hh){ return new Date(midnatt.getTime() + hh * 36e5); };
    svg.appendChild(svgEl("path", { d: bue(146, vinkel(tid(6)), vinkel(tid(18))), class: "day" }));
    svg.appendChild(svgEl("path", { d: bue(146, vinkel(tid(18)), vinkel(tid(30))), class: "night" }));
    const sol = svgEl("text", { x: pkt(146, vinkel(tid(12)))[0], y: pkt(146, vinkel(tid(12)))[1] + 5, class: "ico" }); sol.textContent = "☀️"; svg.appendChild(sol);
    const mane = svgEl("text", { x: pkt(146, vinkel(tid(0)))[0], y: pkt(146, vinkel(tid(0)))[1] + 5, class: "ico" }); mane.textContent = "🌙"; svg.appendChild(mane);
    for(let t = 0; t < 24; t++){
      const d = vinkel(tid(t)), stor = t % 6 === 0, a = pkt(stor ? 128 : 132, d), b = pkt(137, d);
      svg.appendChild(svgEl("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: stor ? "tk big" : "tk" }));
      if(stor && t !== 0 && t !== 12){ const p = pkt(118, d); const lb = svgEl("text", { x: p[0], y: p[1] + 4, class: "hl" }); lb.textContent = String(t).padStart(2, "0"); svg.appendChild(lb); }
    }
    M.forEach(function(m, i){
      const r = 104 - i * 14;
      svg.appendChild(svgEl("circle", { cx: c, cy: c, r: r, class: "track" }));
      m.alle.forEach(function(iv){
        const a = Math.max(iv[0], midnatt), b = Math.min(iv[1], dagSlutt);
        if(b <= a) return;
        const on = m.aktiv && iv[0] === m.aktiv[0];
        const d = bue(r, vinkel(a), vinkel(b) - 0.01);
        if(on) svg.appendChild(svgEl("path", { d: d, stroke: m.farge, class: "glow" }));
        svg.appendChild(svgEl("path", { d: d, stroke: m.farge, class: on ? "arc on" : "arc" }));
      });
    });
    if(ov && !helg){
      const a = Math.max(ov[0], midnatt), b = Math.min(ov[1], dagSlutt);
      if(b > a) svg.appendChild(svgEl("path", { d: bue(44, vinkel(a), vinkel(b)), class: "ovl" }));
    }
    hand = svgEl("g", { class: "hand" });
    hand.appendChild(svgEl("line", { x1: c, y1: c, x2: c + 150, y2: c, class: "hd" }));
    hand.appendChild(svgEl("circle", { cx: c + 146, cy: c, r: 9, class: "ping" }));
    hand.appendChild(svgEl("circle", { cx: c + 146, cy: c, r: 5, class: "head" }));
    svg.appendChild(hand);
    svg.appendChild(svgEl("circle", { cx: c, cy: c, r: 34, class: "hub" }));
    klT = svgEl("text", { x: c, y: c + 2, class: "kl" }); svg.appendChild(klT);
    klS = svgEl("text", { x: c, y: c + 18, class: "ks" }); svg.appendChild(klS);
    dial.appendChild(svg);
    hand._v = vinkel;
  }

  /* ---- Markedsklokka paa startskjermen v2 (founder 17.10 19:56): én setning om hva som
     skjer nå + en levende 24-timers stripe per marked med «nå»-strek. Tidene i telefonens tid. ---- */
  const mk = $("mk-now");
  if(mk && T.mk && T.now_open){
    mk.textContent = "";
    const hd = el("span", "mkhd"); hd.appendChild(el("i", "live")); hd.appendChild(el("b", null, T.mk));
    /* Live gullpris (K-108) - det Sonic handler. Vises bare naar kilden svarer. */
    const px = el("span", "mkpx"); px.id = "mk-px"; px.setAttribute("dir", "ltr"); px.hidden = !GULL.p;
    px.appendChild(el("small", null, "XAU/USD")); px.appendChild(el("b", "v")); px.appendChild(el("i", "pil"));
    hd.appendChild(px); mk.appendChild(hd); gullVis();
    mk.appendChild(el("span", "mksay", naaTekst[0] || ""));
    const tl = el("span", "mktl"); tl.setAttribute("dir", "ltr");
    const pst = function(t){ return Math.max(0, Math.min(100, (t - midnatt) / 864e5 * 100)); };
    M.forEach(function(m){
      const lane = el("span", "lane" + (m.aktiv ? " on" : "")); lane.style.setProperty("--c", m.farge);
      lane.appendChild(el("span", "ln", m.navn));
      const tr = el("span", "tr");
      m.alle.forEach(function(iv){ if(iv[1] <= midnatt || iv[0] >= dagSlutt) return;
        const sg = el("i"); sg.style.insetInlineStart = pst(iv[0]) + "%"; sg.style.width = (pst(iv[1]) - pst(iv[0])) + "%"; tr.appendChild(sg); });
      lane.appendChild(tr);
      m.chipT = el("em"); lane.appendChild(m.chipT);
      tl.appendChild(lane);
    });
    const now = el("span", "nowl"); tl.appendChild(now);
    const ax = el("span", "ax"); ["00", "06", "12", "18", "24"].forEach(function(h){ ax.appendChild(el("span", null, h)); }); tl.appendChild(ax);
    mk.appendChild(tl);
    /* Neste store nyhet (founder 17.10 21:01): fra data/nyheter.json, som en GitHub-jobb henter
       hver time fra Forex Factory-feeden (K-28). Tid i telefonens tid. */
    const nw = el("span", "mknews"); nw.id = "mk-news"; nw.hidden = true; mk.appendChild(nw);
    nyhetVis();
    mk.removeAttribute("aria-label");   /* WCAG 2.5.3: navnet = den synlige teksten (Lighthouse 17.10) */
    mk.hidden = false;
    mk.onclick = function(){ location.hash = "#hours"; };
    MKNOW = { now: now, midnatt: midnatt };
  }

  /* Tider isoleres som LTR, ellers snur et tidsrom seg i urdu/arabisk («18:00–14:00»). */
  $("ss-overlap").textContent = ov ? T.overlap.replace("{A}–{B}", ltr(klokke(ov[0]) + "–" + klokke(ov[1]))).replace("{A}", ltr(klokke(ov[0]))).replace("{B}", ltr(klokke(ov[1]))) : "";
  let roll = vegg("America/New_York", ny.y, ny.m, ny.d, 17, 0);
  if(roll <= nu) roll = new Date(roll.getTime() + 864e5);
  if(helg) $("ss-roll").textContent = T.weekend.replace("{A}", ltr(klokke(helgSlutt || roll)));
  else $("ss-roll").textContent = T.rollover.replace("{A}", ltr(klokke(roll)));

  SS = { T: T, M: M, hand: hand, klT: klT, klS: klS, sone: sone, zz: zz, ltr: ltr, dag: midnatt.getDate() };
  ssTick();
  if(!ssTimer){
    let n = 0;
    ssTimer = setInterval(function(){
      if(document.hidden) return;
      const synlig = ($("s-sessions") && $("s-sessions").offsetParent) || ($("mk-now") && $("mk-now").offsetParent);
      if(!synlig) return;
      n++;
      /* Hvert minutt (og naar en oekt bytter tilstand) tegnes alt paa nytt; ellers bare tall og viser. */
      const bytte = SS && SS.M.some(function(m){ const nu = Date.now(); return (m.aktiv && nu >= m.aktiv[1]) || (!m.aktiv && m.neste && nu >= m.neste[0]); });
      if(n % 60 === 0 || bytte || (SS && new Date().getDate() !== SS.dag)) renderSessions(); else ssTick();
    }, 1000);
  }
}
/* ---- Live gullpris (founder 17.10 20:59 «trading look … pulser som gir sjel») ----
   Gratis kilde uten noekkel (K-108). Hentes hvert 30. sekund bare naar siden synes.
   Endring: kort blink grønt ▲ / rødt ▼ - pil i tillegg til farge (fargeblinde). */
const GULL = { p: 0, forrige: 0, t: 0, retning: "" };
function gullFmt(v){ const t = v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return (typeof lang !== "undefined" && lang === "no") ? t.replace(/,/g, " ").replace(".", ",") : t; }
function gullVis(){
  const px = document.getElementById("mk-px"); if(!px || !GULL.p) return;
  px.hidden = false;
  px.querySelector(".v").textContent = gullFmt(GULL.p);
  const pil = px.querySelector(".pil"); pil.textContent = GULL.retning === "opp" ? "▲" : GULL.retning === "ned" ? "▼" : "";
  px.classList.toggle("gammel", Date.now() - GULL.t > 10 * 60000);
}
/* Gullprisen hentes én gang (tickeren kursHent), ikke to (maalt 17.10 Fast 3G: XAU ble hentet
   dobbelt). gullHent leser bare det tickeren allerede har. */
function gullFraKurs(){
  const q = KURS.XAU; if(!q) return;
  const endret = GULL.p && q.p !== GULL.p;
  GULL.retning = endret ? (q.p > GULL.p ? "opp" : "ned") : GULL.retning;
  GULL.p = q.p; GULL.t = Date.now();
  gullVis();
  const px = document.getElementById("mk-px");
  if(px && endret){ px.classList.remove("opp", "ned"); void px.offsetWidth; px.classList.add(GULL.retning); }
}
function gullHent(){ gullFraKurs(); }
/* (gullHent kalles naa fra kursHent, se der) */
/* ---- Neste store nyhet ---- */
const NYHET = { liste: null, hentet: 0 };
function nyhetHent(){
  if(NYHET.liste && Date.now() - NYHET.hentet < 30 * 60000) return Promise.resolve();
  return fetch("data/nyheter.json", { cache: "no-store" }).then(function(r){ return r.ok ? r.json() : null; })
    .then(function(j){ if(Array.isArray(j)){ NYHET.liste = j; NYHET.hentet = Date.now(); nyhetVis(); try{ radarVis(); }catch(e){} try{ markedVis(); }catch(e){} try{ vaktOppdater(); }catch(e){} } }).catch(function(){});
}
function nyhetVis(){
  const box = document.getElementById("mk-news"); if(!box || !NYHET.liste) return;
  const T = (C.sessions && (C.sessions[lang] || C.sessions.en)) || {};
  if(!T.news_t){ box.hidden = true; return; }
  const nu = Date.now();
  const neste = NYHET.liste.find(function(n){ const t = Date.parse(n.d); return t && t > nu - 5 * 60000 && (!n.i || n.i === "H"); });   /* #149: bare store her */
  box.textContent = ""; box.hidden = false;
  const h = el("span", "nh"); h.appendChild(el("i", "nd")); h.appendChild(el("b", null, T.news_t)); box.appendChild(h);
  if(!neste){ box.appendChild(el("span", "nt", T.news_none)); return; }
  const t = new Date(Date.parse(neste.d)), ms = t - nu, hh = Math.floor(Math.max(0, ms) / 36e5), mi = Math.floor(Math.max(0, ms) % 36e5 / 6e4);
  const kl = String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0");
  const dag = t.toDateString() === new Date().toDateString() ? "" : t.toLocaleDateString(lang === "no" ? "nb-NO" : "en-GB", { weekday: "short" }) + " ";
  const rad = el("span", "nr"); rad.setAttribute("dir", "ltr");
  rad.appendChild(el("b", "cc", neste.c)); rad.appendChild(el("span", "ttl", neste.t));
  rad.appendChild(el("em", null, dag + kl + " · " + T.news_in.replace("{T}", varighet(hh, mi))));
  box.appendChild(rad);
  box.appendChild(el("span", "nt", T.news_tip));
  const N = T.news_share;
  if(N && PAGE !== "leaders"){
    const kn = el("button", "nshare", N.btn); kn.type = "button";
    kn.onclick = function(){ kn.disabled = true;
      nyhetBilde(N).then(function(b){ kn.disabled = false; if(!b) return;
        delBilde(b, "aimpire-news.png", N.msg.replace("{LINK}", delLenke("", "hours")) + aapneLinje(), function(){ kn.textContent = N.saved; setTimeout(function(){ kn.textContent = N.btn; }, 2600); }); },
        function(){ kn.disabled = false; }); };
    box.appendChild(kn);
  }
}
window.addEventListener("load", function(){ hentNavnekart(); if(PAGE !== "leaders") hentLederliste().then(function(l){ if(l && l.length) safe(render); });
  setTimeout(nyhetHent, 1500); setInterval(function(){ if(!document.hidden){ nyhetHent(); nyhetVis(); } }, 60000); });
function ssTick(){
  if(!SS) return;
  const nu = new Date(), T = SS.T;
  SS.M.forEach(function(m){
    const txt = m.aktiv ? T.open + " · " + T.closes_in.replace("{T}", SS.ltr(nedtelling(m.aktiv[1] - nu))) : m.neste ? SS.zz + " · " + T.opens_in.replace("{T}", SS.ltr(nedtelling(m.neste[0] - nu))) : SS.zz;
    if(m.st) m.st.textContent = txt;
    if(m.pg) m.pg.style.width = Math.min(100, Math.max(0, (nu - m.aktiv[0]) / (m.aktiv[1] - m.aktiv[0]) * 100)).toFixed(2) + "%";
    if(m.lt){ const der = dagI(m.tz, nu), natt = der.h < 6 || der.h >= 20; m.lt.textContent = (natt ? "🌙 " : "☀️ ") + T.local.replace("{T}", SS.ltr(String(der.h).padStart(2, "0") + ":" + String(der.mi).padStart(2, "0"))); }
    if(m.chipP) m.chipP.style.width = Math.min(100, Math.max(0, (nu - m.aktiv[0]) / (m.aktiv[1] - m.aktiv[0]) * 100)).toFixed(2) + "%";
    if(m.chipT){ const ms = m.aktiv ? m.aktiv[1] - nu : m.neste ? m.neste[0] - nu : 0;
      const h = Math.floor(ms / 36e5), mi = Math.floor(ms % 36e5 / 6e4);
      m.chipT.textContent = !ms ? "" : (m.aktiv ? "\u2193 " : "\u2191 ") + varighet(h, mi); }
  });
  if(MKNOW && MKNOW.now) MKNOW.now.style.insetInlineStart = "calc(84px + (100% - 84px - 74px) * " + Math.max(0, Math.min(1, (nu - MKNOW.midnatt) / 864e5)).toFixed(4) + ")";
  if(SS.hand){
    SS.hand.setAttribute("transform", "rotate(" + SS.hand._v(nu).toFixed(3) + " 160 160)");
    SS.klT.textContent = String(nu.getHours()).padStart(2, "0") + ":" + String(nu.getMinutes()).padStart(2, "0");
    SS.klS.textContent = String(nu.getSeconds()).padStart(2, "0") + (SS.sone ? " · " + SS.sone : "");
  }
}
let psInst = null;
/* Margin i gull (#99, 17.10): hvor mye en handel binder, og hva $1 i gullprisen betyr.
   Kontrakt 100 oz/lot er typisk (UTTREKK §3) - maa sjekkes i MT5. Giring hos partneren:
   metaller 1:100, Amplify 1:30 (K-41). Regnestykke, ikke raad. */
let MG_LEV = 100, MG_PX_RORT = false;
function renderMargin(){
  const sec = $("s-margin"), M = C.margin && (C.margin[lang] || C.margin.en);
  if(!sec) return; if(!M){ sec.hidden = true; return; }
  sec.hidden = false;
  $("mg-t").textContent = M.title; $("mg-lede").textContent = M.lede;
  $("mg-lots-l").textContent = M.lots; $("mg-lev-l").textContent = M.lev; $("mg-px-l").textContent = M.price;
  $("mg-check").textContent = M.check; $("mg-formula").textContent = M.formula;
  const lots = $("mg-lots"), px = $("mg-px");
  const lp = $("mg-lotpre"); lp.textContent = "";
  [0.01, 0.05, 0.1, 1].forEach(function(v){ const b = el("button", null, String(v).replace(".", lang === "no" ? "," : ".")); b.type = "button"; b.dir = "ltr";
    b.onclick = function(){ lots.value = v; regn(); }; lp.appendChild(b); });
  const lv = $("mg-lev"); lv.textContent = "";
  M.levs.forEach(function(x){ const b = el("button", null, x[1]); b.type = "button"; b.setAttribute("aria-pressed", String(x[0] === MG_LEV));
    b.onclick = function(){ MG_LEV = x[0]; renderMargin(); }; lv.appendChild(b); });
  if(!MG_PX_RORT && KURS.XAU) px.value = KURS.XAU.p;
  px.oninput = function(){ MG_PX_RORT = true; regn(); };
  lots.oninput = regn;
  function regn(){
    const L = Math.max(0, parseFloat(lots.value) || 0), P = Math.max(0, parseFloat(px.value) || 0);
    const verdi = L * 100 * P, margin = verdi / MG_LEV, perDollar = L * 100;
    const usd = function(n){ return "$" + n.toLocaleString("en-US", { minimumFractionDigits: n < 100 ? 2 : 0, maximumFractionDigits: n < 100 ? 2 : 0 }); };
    const o = $("mg-out"); o.textContent = "";
    [[M.out_margin, usd(margin), "stor"], [M.out_val, usd(verdi), ""], [M.out_move, M.move_v.replace("{X}", usd(perDollar)), "mv"]].forEach(function(r){
      const d = el("div", "mgrow " + r[2]); d.appendChild(el("span", null, r[0])); const b = el("b", null, r[1]); b.dir = "ltr"; d.appendChild(b); o.appendChild(d); });
  }
  regn();
}
/* Fibonacci-nivaaer (inspirert av SageMaster «Helix», K-118): ren matematikk paa toppen og
   bunnen medlemmet skriver inn. Laering, aldri et signal (B-034). */
let FB_OPP = true, FB_ROERT = false;
function renderFib(){
  const sec = $("s-fib"), F = C.fib && (C.fib[lang] || C.fib.en);
  if(!sec) return; if(!F){ sec.hidden = true; return; } sec.hidden = false;
  $("fb-t").textContent = F.title; $("fb-lede").textContent = F.lede; $("fb-hi-l").textContent = F.hi; $("fb-lo-l").textContent = F.lo;
  $("fb-dir-l").textContent = F.dir; $("fb-note").textContent = F.note;
  const hi = $("fb-hi"), lo = $("fb-lo");
  if(!FB_ROERT && !hi.value){ const g = (KURS.XAU && KURS.XAU.p) || 4000; hi.value = Math.round(g * 1.012); lo.value = Math.round(g * 0.988); }
  const dv = $("fb-dir"); dv.textContent = "";
  [[true, F.up], [false, F.down]].forEach(function(x){ const b = el("button", null, x[1]); b.type = "button"; b.setAttribute("aria-pressed", String(FB_OPP === x[0])); b.onclick = function(){ FB_OPP = x[0]; renderFib(); }; dv.appendChild(b); });
  hi.oninput = lo.oninput = function(){ FB_ROERT = true; tegn(); };
  function tegn(){
    const H = parseFloat(hi.value), L = parseFloat(lo.value), o = $("fb-out"); o.textContent = "";
    if(!(H > 0 && L > 0 && H > L)) return;
    const R = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    const des = H - L < 20 ? 3 : 2;
    R.forEach(function(r){
      const pris = FB_OPP ? H - (H - L) * r : L + (H - L) * r;
      const rad = el("div", "fbrow" + (r === 0.618 ? " gyll" : "") + (r === 0 || r === 1 ? " ende" : ""));
      rad.appendChild(el("span", "fbp", (r * 100).toFixed(1).replace(".0", "") + " %"));
      const strek = el("i", "fbs"); strek.style.setProperty("--x", ((1 - r) * 100) + "%"); rad.appendChild(strek);
      rad.appendChild(el("b", null, "$" + pris.toLocaleString("en-US", { minimumFractionDigits: des, maximumFractionDigits: des })));
      o.appendChild(rad);
    });
  }
  tegn();
}
/* Fellesskapet i Element X (founder 18.10 00:47): kort innfoering + de AAPNE rommene.
   Romlista er et oeyeblikksbilde av omraadets hierarki (join_rule «restricted» = aapent for
   alle i omraadet), hentet 18.10; lukkede/inaktive rom («invite») er utelatt. Fakta om
   traader/omraader: Element-bloggen 12.11.2025 (K-119). */
function renderCommunity(){
  const sec = $("s-community"), M = C.community && (C.community[lang] || C.community.en);
  if(!sec) return; if(!M){ sec.hidden = true; return; } sec.hidden = false;
  $("cm-t").textContent = M.title; $("cm-lede").textContent = M.lede; $("cm-note").textContent = M.note;
  const ru = $("cm-rooms"); ru.textContent = "";
  M.rooms.forEach(function(r){ const li = el("li"); li.appendChild(el("b", null, r[0])); li.appendChild(el("span", null, r[1])); ru.appendChild(li); });
  const tu = $("cm-tips"); tu.textContent = "";
  M.tips.forEach(function(t){ const li = el("li"); li.appendChild(el("span", "e", t[0])); li.appendChild(el("span", null, t[1])); tu.appendChild(li); });
  const go = $("cm-go"); go.textContent = ""; go.appendChild(el("span", "t", M.cta));
  const url = C.guide_ui && C.guide_ui._stuck_url ? "https://matrix.to/#/%23aimpire:matrix.org" : null;
  if(url && safeUrl(url)){ go.href = url; go.hidden = false; } else go.hidden = true;
}
/* #225 (founder 19.10 «vær innovativ»): verktoeyene snakker sammen. Velger du GBP/USD i kalkulatoren eller journalen,
   og en STOR nyhet for GBP eller USD kommer innen 2 timer (eller gikk for under 15 min siden), vises et lite roedt kort
   med rådet fra markedsklokka. Bare tekster som finnes (sessions.news_in / news_tip), ingen ny oversettelse. */
function nyhetsVakt(instr){
  if(typeof NYHET === "undefined" || !Array.isArray(NYHET.liste)) return null;
  const sym = String(instr || "").toUpperCase().replace(/[^A-Z]/g, ""); if(sym.length < 6) return null;
  const val = [sym.slice(0, 3), sym.slice(3, 6)], nu = Date.now();
  let best = null;
  NYHET.liste.forEach(function(n){
    if(!n || !n.t || !n.c || (n.i && n.i !== "H")) return;
    const t = Date.parse(n.d); if(!t || t < nu - 15 * 60000 || t > nu + 120 * 60000) return;
    const par = NYH_PAR[n.c] || [];
    if(val.indexOf(n.c) < 0 && par.indexOf(sym) < 0 && !(n.c === "ALL" && sym === "XAUUSD")) return;
    if(!best || t < best.t) best = { n: n, t: t };
  });
  return best;
}
function vaktVis(id, instr){
  const h = $(id); if(!h) return;
  const v = nyhetsVakt(instr), K = C.sessions, T = K && (K[lang] || K.en);
  h.textContent = ""; h.hidden = true;
  if(!v || !T) return;
  const d = new Date(v.t), ms = v.t - Date.now();
  const tag = lang === "no" ? "nb" : (baseOf(lang) === "ar" ? "ar-u-nu-latn" : baseOf(lang) === "ur" ? "ur-u-nu-latn" : baseOf(lang));
  let naar; if(ms > 0) naar = (T.news_in || "{T}").replace("{T}", "\u2066" + varighet(Math.floor(ms / 36e5), Math.floor(ms % 36e5 / 6e4)) + "\u2069");
  else { try{ naar = d.toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit", hour12: false }); }catch(e){ naar = klokke(d); } }
  const a = el("a", "nyvakt");
  a.href = typeof v.n.u === "string" && /^https:\/\/www\.forexfactory\.com\/calendar\/[0-9]+-[a-z0-9-]+$/.test(v.n.u) ? v.n.u : "https://www.forexfactory.com/calendar";
  a.target = "_blank"; a.rel = "noopener noreferrer";
  const b = el("b"); b.appendChild(el("i", null, "\uD83D\uDD34 " + v.n.c)); b.appendChild(document.createTextNode("\u2066" + v.n.t + "\u2069")); a.appendChild(b);
  const sp = el("span", null, naar); const par = NYH_PAR[v.n.c];
  if(par){ sp.appendChild(document.createTextNode(" \u00b7 ")); sp.appendChild(el("span", "par", "\u2192 " + par.join(" "))); }
  a.appendChild(sp);
  if(T.news_tip) a.appendChild(el("small", null, T.news_tip));
  h.appendChild(a); h.hidden = false;
}
function vaktOppdater(){
  try{ const I = C.possize && C.possize.inst.find(function(x){ return x[0] === psInst; }); if(I) vaktVis("ps-vakt", I[1]); }catch(e){}
  try{ const j = $("jn-inst"); if(j) vaktVis("jn-vakt", j.value); }catch(e){}
}
document.addEventListener("input", function(e){ if(e.target && e.target.id === "jn-inst") vaktOppdater(); });
function renderPos(){
  const K = C.possize, sec = $("s-pos");
  if(!K || !sec) return;
  const T = K[lang] || K.en;
  $("t-pos").textContent = T.title; $("ps-lede").textContent = T.lede;
  $("ps-bal-l").textContent = T.bal; $("ps-risk-l").textContent = T.risk; $("ps-inst-l").textContent = T.inst;
  $("ps-check").textContent = T.check; $("ps-formula").textContent = T.formula;
  if(psInst === null){ try{ const lagret = JSON.parse(load("aimpire.pos") || "null"); if(lagret){ psInst = lagret.i; ["bal","risk","stop"].forEach(function(f){ if(lagret[f]) $("ps-" + f).value = lagret[f]; }); } }catch(e){} }
  if(!K.inst.some(function(x){ return x[0] === psInst; })) psInst = K.inst[0][0];
  const box = $("ps-inst"); box.textContent = "";
  K.inst.forEach(function(x){
    const b = el("button", null, x[0] === "xauusd" ? T.gold + " (" + x[1] + ")" : x[1]); b.type = "button";
    b.setAttribute("aria-pressed", String(x[0] === psInst)); b.dir = "ltr";
    b.onclick = function(){ psInst = x[0]; renderPos(); };
    box.appendChild(b);
  });
  const I = K.inst.find(function(x){ return x[0] === psInst; });
  try{ vaktVis("ps-vakt", I[1]); }catch(e){}
  $("ps-stop-l").textContent = I[3] === "usd" ? T.stop_d : T.stop_p;
  const tall = function(id){ const v = parseFloat(String($(id).value).replace(",", ".")); return isFinite(v) && v > 0 ? v : null; };
  const bal = tall("ps-bal"), risk = tall("ps-risk"), stop = tall("ps-stop");
  const out = $("ps-out"); out.textContent = "";
  const kort = function(lab, verdi){ const k = el("div", "k"); k.appendChild(el("small", null, lab)); const st = el("strong", null, verdi); st.dir = "ltr"; k.appendChild(st); out.appendChild(k); };
  /* #147: norsk bruker komma som desimaltegn - likt med marginkalkulatoren rett under. */
  const lok = lang === "no" ? "nb-NO" : "en-US";
  const usd = function(n){ return "$" + n.toLocaleString(lok, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const des = function(n, d){ return n.toLocaleString(lok, { minimumFractionDigits: d, maximumFractionDigits: d }); };
  if(!bal || !risk || !stop || risk > 100){ kort(T.r_usd, "—"); kort(T.lots, "—"); return; }
  const rUsd = bal * risk / 100;
  const raa = rUsd / (stop * I[2]);
  const lots = Math.floor(raa * 100 + 1e-9) / 100;
  kort(T.r_usd, usd(rUsd));
  kort(T.lots, lots >= 0.01 ? des(lots, 2) + " lot" : "< " + des(0.01, 2));
  if(lots < 0.01){
    const minRisk = 0.01 * stop * I[2];
    const w = el("p", "warn2", T.floor.replace("{X}", "\u2066" + usd(minRisk) + "\u2069").replace("{P}", "\u2066" + des(minRisk / bal * 100, 1) + " %\u2069"));
    out.appendChild(w);
  }
  try{ store("aimpire.pos", JSON.stringify({ i: psInst, bal: $("ps-bal").value, risk: $("ps-risk").value, stop: $("ps-stop").value })); }catch(e){}
}
["ps-bal","ps-risk","ps-stop"].forEach(function(id){ document.addEventListener("input", function(e){ if(e.target && e.target.id === id) renderPos(); }); });
let SK_FROE = 12345;
function renderStreak(nyKjoring){
  const K = C.streaks, sec = $("s-streak");
  if(!K || !sec) return;
  /* Funn (lav): tallene skal ikke endre seg av seg selv ved hver ny tegning - bare paa «kjoer». */
  if(nyKjoring) SK_FROE = (Math.random() * 4294967296) >>> 0;
  let froe = SK_FROE;
  const rnd = function(){ froe |= 0; froe = froe + 0x6D2B79F5 | 0; let t = Math.imul(froe ^ froe >>> 15, 1 | froe); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const T = K[lang] || K.en;
  $("t-streak").textContent = T.title; $("sk-lede").textContent = T.lede; $("sk-note").textContent = T.note;
  $("sk-win-l").textContent = T.win; $("sk-rr-l").textContent = T.rr; $("sk-risk-l").textContent = T.risk; $("sk-run").textContent = T.run;
  const tall = function(id, lo, hi){ const v = parseFloat(String($(id).value).replace(",", ".")); return isFinite(v) && v >= lo && v <= hi ? v : null; };
  const w = tall("sk-win", 1, 99), rr = tall("sk-rr", 0.1, 10), r = tall("sk-risk", 0.1, 50);
  const out = $("sk-out"); out.textContent = ""; out.className = "psout three";
  const fig = $("sk-fig");
  const kort = function(lab, verdi){ const k = el("div", "k"); k.appendChild(el("small", null, lab)); const st = el("strong", null, verdi); st.dir = "ltr"; k.appendChild(st); out.appendChild(k); };
  if(w === null || rr === null || r === null){ kort(T.streak, "—"); kort(T.dd50, "—"); kort(T.end_below, "—"); fig.textContent = ""; return; }
  const N = 1000, H = 100, p = w / 100, tap = r / 100, gev = r / 100 * rr;
  const rekker = [], kurver = []; let fall50 = 0, under = 0;
  const alle = new Float32Array(N * (H + 1));   /* for medianen per handel */
  for(let k = 0; k < N; k++){
    let b = 1, lav = 1, rad = 0, lengst = 0; const kurve = k < 24 ? [1] : null;
    for(let t = 0; t < H; t++){
      if(rnd() < p){ b *= 1 + gev; rad = 0; } else { b *= 1 - tap; rad++; if(rad > lengst) lengst = rad; }
      if(b < lav) lav = b;
      if(kurve) kurve.push(b);
      alle[k * (H + 1) + t + 1] = b;
    }
    alle[k * (H + 1)] = 1;
    rekker.push(lengst); if(lav <= 0.5) fall50++; if(b < 1) under++;
    if(kurve) kurver.push(kurve);
  }
  rekker.sort(function(a, b){ return a - b; });
  kort(T.streak, String(rekker[Math.floor(N / 2)]));
  kort(T.dd50, (fall50 / N * 100).toFixed(1) + " %");
  kort(T.end_below, (under / N * 100).toFixed(0) + " %");
  /* 24 tilfeldige kurver, logaritmisk akse rundt start (1,0) */
  const W = 320, Hh = 150, maks = Math.max.apply(null, kurver.map(function(c){ return Math.max.apply(null, c); })), min = Math.min.apply(null, kurver.map(function(c){ return Math.min.apply(null, c); }));
  const lo = Math.log(Math.min(min, 0.45)), hi = Math.log(Math.max(maks, 1.6));
  const y = function(v){ return (Hh - 8) - (Math.log(v) - lo) / (hi - lo) * (Hh - 16); };
  let svg = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" role="img"><line x1="0" x2="' + W + '" y1="' + y(1).toFixed(1) + '" y2="' + y(1).toFixed(1) + '" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="3 3"/>' +
    '<line x1="0" x2="' + W + '" y1="' + y(0.5).toFixed(1) + '" y2="' + y(0.5).toFixed(1) + '" stroke="#C21FBF" stroke-opacity=".45" stroke-dasharray="2 4"/>' +
    '<text x="4" y="' + (y(1) - 4).toFixed(1) + '" font-size="9" fill="currentColor" fill-opacity=".6">100 %</text>' +
    '<text x="4" y="' + (y(0.5) - 4).toFixed(1) + '" font-size="9" fill="#C21FBF" fill-opacity=".8">50 %</text>';
  const farger = ["#15D8C4", "#1B4FD8", "#C21FBF", "#E3B505"];
  kurver.forEach(function(c, i){
    let d = ""; c.forEach(function(v, t){ d += (t ? "L" : "M") + (t / H * W).toFixed(1) + " " + y(v).toFixed(1); });
    svg += '<path d="' + d + '" fill="none" stroke="' + farger[i % 4] + '" stroke-opacity=".55" stroke-width="1.2"/>';
  });
  /* Typisk forloep (median av alle 1 000), uthevet - som linja i en backtest-rapport (K-118). */
  let md = ""; const kol = new Float32Array(N);
  for(let t = 0; t <= H; t++){ for(let k = 0; k < N; k++) kol[k] = alle[k * (H + 1) + t]; kol.sort(); const v = kol[N >> 1];
    md += (t ? "L" : "M") + (t / H * W).toFixed(1) + " " + y(Math.max(v, Math.exp(lo))).toFixed(1); }
  svg += '<path d="' + md + '" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity=".9" stroke-linecap="round"/>';
  fig.innerHTML = svg + "</svg>" + (T.median ? '<small class="skmed"><i></i>' + T.median.replace(/</g, "&lt;") + '</small>' : "");
}
document.addEventListener("input", function(e){ if(e.target && /^sk-(win|rr|risk)$/.test(e.target.id)) renderStreak(true); });
document.addEventListener("click", function(e){ if(e.target && e.target.id === "sk-run") renderStreak(true); });
let jnDir = "buy";
function jnLes(){ try{ const v = JSON.parse(load("aimpire.journal") || "[]"); return Array.isArray(v) ? v : []; }catch(e){ return []; } }
function jnSkriv(a){ try{ store("aimpire.journal", JSON.stringify(a)); }catch(e){} }
function renderGrowth(){
  const G = C.growth && (C.growth[lang] || C.growth.en); if(!G || !$("s-growth")) return;
  $("t-growth").textContent = G.title; $("gr-lede").textContent = G.lede;
  $("gr-mt5-t").textContent = G.mt5_t; $("gr-portal-t").textContent = G.portal_t; $("gr-calc-t").textContent = G.calc_t;
  /* Maskerte skjermbilder fra founders egen portal (19.10, alle tall erstattet med ••• foer bildet ble tatt). */
  const GRBILDE = { "gr-portal": ["assets/guide/tag-wallet-net-deposits.webp", "assets/guide/tag-account-summary-equity.webp"] };
  [["gr-mt5", G.mt5], ["gr-portal", G.portal]].forEach(function(x){ const ol = $(x[0]); ol.textContent = "";
    x[1].forEach(function(t, i){ const li = el("li", null, t); const src = (GRBILDE[x[0]] || [])[i];
      if(src){ const fg = el("figure", "grfig"); const im = document.createElement("img"); im.src = src; im.alt = G.img || ""; im.loading = "lazy"; im.decoding = "async"; im.width = 500; im.height = i ? 430 : 380;
        fg.appendChild(im); fg.appendChild(el("figcaption", null, G.img || "")); li.appendChild(fg); }
      ol.appendChild(li); }); });
  $("gr-dep-l").textContent = G.dep; $("gr-bal-l").textContent = G.bal; $("gr-note").textContent = G.note; $("gr-warn").textContent = G.warn;
  grRegn();
}
/* Ingenting lagres: verdiene lever bare i feltene til siden lukkes. */
function grRegn(){
  const G = C.growth && (C.growth[lang] || C.growth.en), out = $("gr-out"); if(!G || !out) return;
  /* Komma eller punktum, mellomrom og $ tåles (norsk/urdu-tastatur). Østarabiske sifre gjøres om. */
  const tall = function(v){ v = String(v || "").replace(/[\u0660-\u0669]/g, function(x){ return x.charCodeAt(0) - 0x660; }).replace(/[\u06F0-\u06F9]/g, function(x){ return x.charCodeAt(0) - 0x6F0; }).replace(/[\s$]/g, "").replace(",", "."); return /^\d*\.?\d+$/.test(v) ? parseFloat(v) : NaN; };
  const d = tall($("gr-dep").value), b = tall($("gr-bal").value);
  out.className = "grout";
  if(!(d > 0) || !(b >= 0)){ out.textContent = ($("gr-dep").value || $("gr-bal").value) ? G.need : ""; return; }
  const diff = b - d, pct = diff / d * 100;
  const iso = function(t){ return "⁦" + t + "⁩"; };
  const D = iso("$" + Math.abs(diff).toLocaleString("en-US", { maximumFractionDigits: 2 })), P = iso((Math.abs(pct) < 0.05 ? "0" : Math.abs(pct).toFixed(1)) + " %");
  if(Math.abs(diff) < 0.005){ out.textContent = G.even; return; }
  out.classList.add(diff > 0 ? "opp" : "ned");
  out.textContent = (diff > 0 ? G.up : G.down).replace("{D}", D).replace("{P}", P);
}
document.addEventListener("input", function(e){ if(e.target && /^gr-(dep|bal)$/.test(e.target.id)) grRegn(); });
function renderJournal(){
  const K = C.journal, sec = $("s-journal");
  if(!K || !sec) return;
  const T = K[lang] || K.en;
  $("t-journal").textContent = T.title; $("jn-lede").textContent = T.lede; $("jn-warn").textContent = T.warn;
  $("jn-inst-l").textContent = T.inst; $("jn-dir-l").textContent = T.dir; $("jn-lots-l").textContent = T.lots;
  $("jn-res-l").textContent = T.res; $("jn-note-l").textContent = T.note;
  $("jn-add").textContent = T.add; $("jn-export").textContent = T.export; $("jn-clear").textContent = T.clear;
  try{ vaktVis("jn-vakt", $("jn-inst").value); }catch(e){}
  const dir = $("jn-dir"); dir.textContent = "";
  [["buy", T.buy], ["sell", T.sell]].forEach(function(x){
    const b = el("button", null, x[1]); b.type = "button"; b.setAttribute("aria-pressed", String(jnDir === x[0]));
    b.onclick = function(){ jnDir = x[0]; renderJournal(); }; dir.appendChild(b);
  });
  const a = jnLes(), liste = $("jn-list"), sum = $("jn-sum");
  liste.textContent = ""; sum.textContent = "";
  const usd = function(n){ return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  if(!a.length){ liste.appendChild(el("li", "meta", T.empty)); $("jn-export").hidden = true; $("jn-clear").hidden = true; return; }
  $("jn-export").hidden = false; $("jn-clear").hidden = false;
  const vunnet = a.filter(function(x){ return x.r > 0; }).length, tapt = a.filter(function(x){ return x.r < 0; }).length;
  const totalt = a.reduce(function(s, x){ return s + (x.r || 0); }, 0);
  const k1 = el("div", "k"); k1.appendChild(el("small", null, T.count.replace("{N}", a.length).replace("{W}", vunnet).replace("{L}", tapt))); sum.appendChild(k1);
  const k2 = el("div", "k"); k2.appendChild(el("small", null, T.total)); const st = el("strong", null, usd(totalt)); st.dir = "ltr"; k2.appendChild(st); sum.appendChild(k2);
  /* Resultatkurve fra egne handler (inspirert av SageMasters «Dashboard», K-118). */
  let jf = $("jn-fig"); if(!jf){ jf = el("div", "cchart jnfig"); jf.id = "jn-fig"; jf.setAttribute("dir", "ltr"); sum.after(jf); }
  jf.textContent = "";
  if(a.length >= 2){
    const kum = []; let s0 = 0; a.forEach(function(x){ s0 += (x.r || 0); kum.push(s0); });
    const W = 320, Hh = 110, lo = Math.min(0, Math.min.apply(null, kum)), hi = Math.max(0, Math.max.apply(null, kum)), sp = (hi - lo) || 1;
    const X = function(i){ return 6 + i * (W - 12) / (kum.length - 1); }, Y = function(v){ return 8 + (Hh - 16) * (1 - (v - lo) / sp); };
    let d = ""; kum.forEach(function(v, i){ d += (i ? " L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1); });
    jf.innerHTML = (T.curve ? '<small class="jnct">' + T.curve.replace(/</g, "&lt;") + '</small>' : "") + '<svg viewBox="0 0 ' + W + ' ' + Hh + '" preserveAspectRatio="none"><line x1="0" x2="' + W + '" y1="' + Y(0).toFixed(1) + '" y2="' + Y(0).toFixed(1) + '" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="3 3"/>' +
      '<path class="ln" pathLength="1" d="' + d + '" style="stroke:' + (s0 >= 0 ? "#16C784" : "#EA3943") + '"/><circle class="pt" cx="' + X(kum.length - 1).toFixed(1) + '" cy="' + Y(s0).toFixed(1) + '" r="4"/></svg>';
  }
  a.slice().reverse().forEach(function(x){
    const li = el("li"); const top = el("div", "top");
    const i = el("span", null, x.i || "—"); i.dir = "ltr"; top.appendChild(i);
    top.appendChild(el("span", "meta", (x.d === "sell" ? T.sell : T.buy) + (x.l ? " · " + x.l + " lot" : "")));
    const r = el("span", "r " + (x.r > 0 ? "pos" : x.r < 0 ? "neg" : ""), usd(x.r || 0)); r.dir = "ltr"; top.appendChild(r);
    li.appendChild(top);
    const meta = el("div", "meta", new Date(x.t).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })); meta.dir = "ltr"; li.appendChild(meta);
    if(x.n) li.appendChild(el("p", "nt", x.n));
    const del = el("button", "del", T.del); del.type = "button";
    del.onclick = function(){ jnSkriv(jnLes().filter(function(y){ return y.t !== x.t; })); renderJournal(); };
    li.appendChild(del); liste.appendChild(li);
  });
}
document.addEventListener("click", function(e){
  const id = e.target && e.target.id; if(!id) return;
  if(id === "jn-add"){
    const T = C.journal[lang] || C.journal.en;
    const inst = String($("jn-inst").value).trim().toUpperCase().slice(0, 16);
    const l = parseFloat(String($("jn-lots").value).replace(",", "."));
    const r = parseFloat(String($("jn-res").value).replace(",", ".").replace("−", "-").replace(/[^0-9.\-]/g, ""));
    if(!inst && !isFinite(r)){ markerFeil("jn-inst"); return; }
    const a = jnLes(); a.push({ t: Date.now(), i: inst, d: jnDir, l: isFinite(l) && l > 0 ? Math.round(l * 100) / 100 : null, r: isFinite(r) ? Math.round(r * 100) / 100 : 0, n: String($("jn-note").value).trim().slice(0, 400) });
    jnSkriv(a.slice(-500));
    ["jn-lots", "jn-res", "jn-note"].forEach(function(f){ $(f).value = ""; });
    renderJournal(); vibrer(8);   /* #243: ingen konfetti for å lagre en handel - belønner handel (FCA, research #241 pkt 10). Konfetti bare for læring. */
  } else if(id === "jn-export"){
    const rader = [["time", "instrument", "direction", "lots", "result_usd", "note"]].concat(jnLes().map(function(x){
      return [new Date(x.t).toISOString(), x.i || "", x.d, x.l == null ? "" : x.l, x.r, (x.n || "").replace(/\r?\n/g, " ")];
    }));
    const csv = rader.map(function(r){ return r.map(function(v){ v = String(v); return /[",;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(","); }).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "aimpire-journal.csv";
    document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  } else if(id === "jn-clear"){
    const T = C.journal[lang] || C.journal.en;
    if(confirm(T.confirm)){ jnSkriv([]); renderJournal(); }
  }
});
/* Kalkulatorens kurve (founder 17.10 22:43 «mindre barnslig»): beholdt beloep summert
   maaned for maaned, med en stolpe per maaned under. Samme tall som resultatet. */
function mndNavn(ym){
  try{ const d = new Date(ym + "-15T00:00:00Z"); return d.toLocaleDateString((conf(lang).bcp || baseOf(lang)), { month: "short", year: "2-digit", timeZone: "UTC" }); }catch(e){ return ym; }
}
function calcKurve(kept){
  const box = $("cc-chart"); if(!box) return;
  const W = 320, H = 120, BH = 26, n = kept.length; if(!n){ box.textContent = ""; return; }
  let sum = 0; const cum = [0].concat(kept.map(function(m){ sum += m[1]; return sum; }));
  const lo = Math.min.apply(null, cum), hi = Math.max.apply(null, cum), sp = (hi - lo) || 1;
  const x = function(i){ return 6 + i * (W - 12) / n; }, y = function(v){ return 8 + (H - 16) * (1 - (v - lo) / sp); };
  let d = "M" + x(0).toFixed(1) + " " + y(cum[0]).toFixed(1);
  for(let i = 1; i < cum.length; i++) d += " L" + x(i).toFixed(1) + " " + y(cum[i]).toFixed(1);
  const mx = Math.max.apply(null, kept.map(function(m){ return Math.abs(m[1]); })) || 1, bw = Math.max(2, (W - 12) / n - 3);
  let bars = "";
  kept.forEach(function(m, i){ const h = Math.max(1.5, Math.abs(m[1]) / mx * (BH - 2));
    bars += '<rect class="' + (m[1] >= 0 ? "bo" : "bn") + '" x="' + (x(i) + 1.5).toFixed(1) + '" y="' + (H + 6 + BH - h).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="1"/>'; });
  const ex = x(n), ey = y(cum[n]);
  box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + (H + BH + 8) + '" preserveAspectRatio="none">' +
    '<defs><linearGradient id="ccl" x1="0" x2="1"><stop offset="0" stop-color="#15D8C4"/><stop offset=".55" stop-color="#1B4FD8"/><stop offset="1" stop-color="#C21FBF"/></linearGradient>' +
    '<linearGradient id="cca" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15D8C4" stop-opacity=".22"/><stop offset="1" stop-color="#15D8C4" stop-opacity="0"/></linearGradient></defs>' +
    '<g class="gr"><line x1="0" x2="' + W + '" y1="' + (H * .33).toFixed(0) + '" y2="' + (H * .33).toFixed(0) + '"/><line x1="0" x2="' + W + '" y1="' + (H * .66).toFixed(0) + '" y2="' + (H * .66).toFixed(0) + '"/></g>' +
    '<path class="ar" d="' + d + ' L' + ex.toFixed(1) + ' ' + H + ' L' + x(0).toFixed(1) + ' ' + H + ' Z"/>' +
    '<path class="ln" pathLength="1" d="' + d + '"/>' + bars +
    '<circle class="pt" cx="' + ex.toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="4"/></svg>' +
    '<div class="cax"><span>' + mndNavn(kept[0][0]) + '</span><span>' + mndNavn(kept[n - 1][0]) + '</span></div>';
}
let GULL_NODE = null;
function gullChart(){
  const wrap = el("div", "gchart"); wrap.setAttribute("dir", "ltr");
  const hold = el("div", "gchold"); hold.appendChild(el("i", "gcspin")); wrap.appendChild(hold);
  const last = function(){
    if(wrap.dataset.lastet) return; wrap.dataset.lastet = "1";
    const mork = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    const c = el("div", "tradingview-widget-container"); c.style.height = "100%";
    const w = el("div", "tradingview-widget-container__widget"); w.style.height = "100%"; c.appendChild(w);
    const sc = document.createElement("script"); sc.async = true;
    sc.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    sc.text = JSON.stringify({ autosize: true, symbol: "OANDA:XAUUSD", interval: "15", timezone: "Etc/UTC",
      theme: mork ? "dark" : "light", style: "1", locale: "en", hide_top_toolbar: true, hide_legend: false,
      allow_symbol_change: false, save_image: false, calendar: false, hide_volume: true,
      backgroundColor: mork ? "rgba(26,26,34,1)" : "rgba(255,255,255,1)",
      gridColor: mork ? "rgba(39,36,47,0.6)" : "rgba(231,226,238,0.8)", support_host: "https://www.tradingview.com" });
    c.appendChild(sc);
    c.style.position = "relative"; c.style.zIndex = "1"; wrap.appendChild(c);   /* spinneren ligger under til iframen har tegnet */
  };
  /* Tregt nett / «spar data» (founder 22:59: nettet i Pakistan er struppet): ikke last
     automatisk - vis en knapp, saa medlemmet selv velger aa bruke data. */
  let treg = false;
  try{ const cn = navigator.connection; treg = !!(cn && (cn.saveData || /(^|-)2g|3g/.test(cn.effectiveType || ""))); }catch(e){}
  if(treg){
    hold.textContent = "";
    const S = C.short && C.short["s-amplify"] && (C.short["s-amplify"][lang] || C.short["s-amplify"].en) || {};
    const kn = el("button", "gcbtn", S.chart_load || "Show live chart"); kn.type = "button";
    kn.onclick = function(){ hold.textContent = ""; hold.appendChild(el("i", "gcspin")); last(); };
    hold.appendChild(kn);
    return wrap;
  }
  /* Synlig paa skjermen -> last. IntersectionObserver + egen sjekk som reserve
     (IO fyrer ikke naar siden ikke tegnes, maalt 17.10). */
  const synlig = function(){
    if(wrap.dataset.lastet || !wrap.isConnected || !wrap.offsetParent) return;
    const r = wrap.getBoundingClientRect();
    if(r.top < innerHeight + 200 && r.bottom > -200){ last(); window.removeEventListener("scroll", paaScroll); }
  };
  let st = null;
  const paaScroll = function(){ if(st) return; st = setTimeout(function(){ st = null; synlig(); }, 150); };
  window.addEventListener("scroll", paaScroll, { passive: true });
  if("IntersectionObserver" in window){
    const io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ io.disconnect(); last(); } }); }, { rootMargin: "200px" });
    setTimeout(function(){ io.observe(wrap); }, 0);
  }
  setTimeout(synlig, 1500);
  return wrap;
}
function renderCalc(){
  const K = C.calculator, sec = $("s-calc");
  if(!K || !sec || !C.results) return;
  sec.hidden = !K.live;
  if(!K.live) return;
  const T = K[lang] || K.en;
  $("cc-lede").textContent = T.lede;
  { const hw = $("cc-how"); if(hw){ const K = C.calculator[lang] || C.calculator.en; hw.textContent = K.how || "How this is worked out"; } }
  $("cc-amount-l").textContent = T.amount;
  $("cc-total-l").textContent = T.total;
  $("cc-risk-t").textContent = T.risk;
  $("cc-method").textContent = T.method;
  $("cc-disc").textContent = T.disclaimer;
  const usd = function(n){ return "$" + n.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}); };
  const per = $("cc-per"); per.textContent = "";
  const PS = T.periods_short || T.periods;
  K.periods.forEach(function(n, i){
    const b = el("button", null, PS[i]); b.type = "button"; b.title = T.periods[i];
    b.setAttribute("aria-pressed", String(n === calcPeriod));
    b.onclick = function(){ calcPeriod = n; renderCalc(); };
    per.appendChild(b);
  });
  const inp = $("cc-amount"), sl = $("cc-slide");
  $("cc-range").textContent = T.range || K.en.range;
  const pre = $("cc-pre"); pre.textContent = "";
  [50, 100, 250, 500, 1000].forEach(function(v){
    const b = el("button", null, "$" + v.toLocaleString("en-US")); b.type = "button"; b.dir = "ltr";
    b.onclick = function(){ inp.value = v; sl.value = v; calc(); };
    pre.appendChild(b);
  });
  sl.oninput = function(){ inp.value = sl.value; calc(); };
  /* Hver maaned: [maaned, brutto %, kurtasje %, fee ukentlig netto %, fee per vinnerdag %]
     paa strategikontoen. Ganges med 24 og beloepet. Ingen rentes rente: gevinsten tas ut. */
  function calc(){
    const A = Math.max(0, parseFloat(inp.value) || 0), f = A * K.multiple / 100;
    const ms = K.costs.slice(-calcPeriod);
    const sum = function(i){ return ms.reduce(function(s, m){ return s + m[i]; }, 0) * f; };
    const G = sum(1), Cm = sum(2), Fw = sum(3), Fd = sum(4);
    const hi = G - Cm - Fw, lo = G - Cm - Fd;
    if(String(sl.value) !== String(Math.min(2000, Math.max(10, A)))) sl.value = Math.min(2000, Math.max(10, A));
    /* Stolpen: hvor bruttoen blir av. Beholdt (lav) + det ekstra du kan beholde
       ved ukentlig oppgjoer + avgift + kurtasje = brutto. */
    const pct = function(x){ return G > 0 ? Math.max(0, x / G * 100).toFixed(2) + "%" : "0%"; };
    const bar = $("cc-bar").children;
    bar[0].style.width = pct(lo); bar[1].style.width = pct(hi - lo); bar[2].style.width = pct(Fw); bar[3].style.width = pct(Cm);
    /* Ett tall: det forsiktige (avgift per vinnerdag). Spennet vises bare naar det betyr
       noe (> 1 %); det fulle spennet staar uansett i tabellen under «Slik er det regnet». */
    $("cc-total").textContent = (lo >= 0 ? "+" : "\u2212") + usd(Math.abs(lo)) + (hi - lo > Math.abs(lo) * 0.01 ? " \u2013 " + usd(hi) : "");
    const dl = $("cc-delta");
    if(dl){ const pr = A > 0 ? lo / A * 100 : 0; dl.className = "cdelta " + (lo >= 0 ? "opp" : "ned");
      dl.textContent = (T.of_dep || "{p} / {A}").replace("{p}", (pr >= 0 ? "+" : "\u2212") + Math.round(Math.abs(pr)) + " %").replace("{A}", A % 1 ? usd(A) : "$" + A.toLocaleString("en-US")); }
    const kept = ms.map(function(m){ return [m[0], (m[1] - m[2] - m[3]) * f]; });
    const best = kept.reduce(function(a, b){ return b[1] > a[1] ? b : a; });
    const worst = kept.reduce(function(a, b){ return b[1] < a[1] ? b : a; });
    $("cc-months").textContent = T.months + ": " + best[0] + " " + usd(best[1]) + " \u00b7 " + worst[0] + " " + usd(worst[1]);
    calcKurve(kept);
    CALC_SIST = { A: A, lo: lo, hi: hi, pr: A > 0 ? lo / A * 100 : 0, kept: kept, best: best, worst: worst,
      snitt: kept.reduce(function(a, m){ return a + m[1]; }, 0) / (kept.length || 1), per: K.periods.indexOf(calcPeriod) };
    const st = $("cc-stats");
    if(st){ st.textContent = "";
      const snitt = kept.reduce(function(a, m){ return a + m[1]; }, 0) / (kept.length || 1);
      [[T.best || "Best", best, "opp"], [T.worst || "Worst", worst, worst[1] >= 0 ? "" : "ned"], [T.avg || "Avg", [null, snitt], ""]].forEach(function(x){
        const c = el("div", "cst " + x[2]); c.appendChild(el("span", null, x[0]));
        const v = el("b", null, (x[1][1] >= 0 ? "+" : "\u2212") + usd(Math.abs(x[1][1]))); v.dir = "ltr"; c.appendChild(v);
        if(x[1][0]) c.appendChild(el("small", null, mndNavn(x[1][0])));
        st.appendChild(c);
      });
    }
    const R = T.rows || K.en.rows, tab = $("cc-tab"); tab.textContent = "";
    [[R[0], usd(G)], [R[1], "\u2212" + usd(Cm)], [R[2], "\u2212" + usd(Fw) + " \u2013 \u2212" + usd(Fd)], [R[3], usd(lo) + " \u2013 " + usd(hi)]]
      .forEach(function(r){ tab.appendChild(el("dt", null, r[0])); const dd = el("dd", null, r[1]); dd.dir = "ltr"; tab.appendChild(dd); });
    const ul = $("cc-risks"); ul.textContent = "";
    T.risks.forEach(function(r){
      ul.appendChild(el("li", null, r.replace(/\{A\}/g, usd(A)).replace(/\{D\}/g, usd(A * K.multiple * K.worst_day / 100))));
    });
    planleggIsolering();
  }
  /* #156: en delt lenke (?ca=250&cp=6#calc) aapner med samme beloep og periode. Leses bare foerste gang. */
  if(!renderCalc.q){ renderCalc.q = 1;
    try{ const q = KALK_Q || new URLSearchParams(location.search), qa = parseFloat(q.get("ca")), qp = parseInt(q.get("cp"), 10);
      if(qa >= 10 && qa <= 1000000){ inp.value = Math.round(qa);
        /* mottakeren skal se tallet med en gang, ikke lete etter det under Sonic-teksten */
        setTimeout(function(){ const cb = sec.querySelector(".cbig"); if(cb && cb.offsetParent){ const y = cb.getBoundingClientRect().top + scrollY - 150; scrollTo(0, Math.max(0, y)); } }, 900); }
      if(K.periods.indexOf(qp) !== -1 && qp !== calcPeriod){ calcPeriod = qp; renderCalc(); return; }
    }catch(e){} }
  inp.oninput = calc; calc();
  delKalk(T);
}
let CALC_SIST = null;
function renderHalal(){
  const sec = $("s-halal"), H = C.halal && (C.halal[lang] || C.halal.en); if(!sec) return;
  sec.hidden = !H || PAGE === "leaders"; if(sec.hidden) return;
  $("t-halal").textContent = H.title; $("hl-lede").textContent = H.lede;
  const g = $("hl-grid"); g.textContent = "";
  H.items.forEach(function(x){ const k = el("div", "hlk"); const ik = el("span", "e", x[0]); ik.setAttribute("aria-hidden", "true"); k.appendChild(ik);
    const t = el("div"); t.appendChild(el("b", null, x[1])); t.appendChild(el("p", null, x[2])); k.appendChild(t); g.appendChild(k); });
}
/* ===== #161 Lederlista (founder 18.10 23:15): kunden velger selv leder. =====
   Ledere er med bare hvis de selv krysser av i soeknaden (frivillig samtykke). */
const LISTE_SPRAAK = [["en","English"],["no","Norsk"],["hi","\u0939\u093f\u0928\u094d\u0926\u0940"],["ur","\u0627\u0631\u062f\u0648"],["ar","\u0627\u0644\u0639\u0631\u0628\u064a\u0629"]];
const LISTE_LAND = [["PK","\uD83C\uDDF5\uD83C\uDDF0 Pakistan"],["NO","\uD83C\uDDF3\uD83C\uDDF4 Norge"],["IN","\uD83C\uDDEE\uD83C\uDDF3 India"],["AE","\uD83C\uDDE6\uD83C\uDDEA UAE"],["SA","\uD83C\uDDF8\uD83C\uDDE6 Saudi Arabia"],["GB","\uD83C\uDDEC\uD83C\uDDE7 UK"],["SE","\uD83C\uDDF8\uD83C\uDDEA Sverige"],["DK","\uD83C\uDDE9\uD83C\uDDF0 Danmark"],["DE","\uD83C\uDDE9\uD83C\uDDEA Deutschland"],["US","\uD83C\uDDFA\uD83C\uDDF8 USA"]];
function flagg(k){ return k && /^[A-Z]{2}$/.test(k) ? String.fromCodePoint(127397 + k.charCodeAt(0), 127397 + k.charCodeAt(1)) : ""; }
function listeSkjema(){
  const box = $("ld-list"), F = C.leader_signup || {}, L = C.leaders[lang] || C.leaders.en, T = L.list;
  if(!box || !T || !F.list_field){ if(box) box.hidden = true; return; }
  if(box.dataset.l === lang && box.childNodes.length) return;   /* behold avkrysningene ved ny tegning */
  box.dataset.l = lang; box.textContent = ""; box.hidden = false;
  const lab = el("label", "ldchk"); const cb = document.createElement("input"); cb.type = "checkbox"; cb.id = "ld-show";
  lab.appendChild(cb); lab.appendChild(el("span", null, T.show)); box.appendChild(lab);
  box.appendChild(el("p", "hint", T.show_h));
  const mer = el("div", "ldmer"); mer.hidden = true;
  mer.appendChild(el("small", null, T.langs));
  const sp = el("div", "ldsp"); sp.id = "ld-sp";
  LISTE_SPRAAK.forEach(function(x){ const l = el("label", "ldpill"); const i = document.createElement("input"); i.type = "checkbox"; i.value = x[0];
    if(x[0] === baseOf(lang)) i.checked = true; l.appendChild(i); l.appendChild(el("span", null, x[1])); sp.appendChild(l); });
  mer.appendChild(sp);
  mer.appendChild(el("small", null, T.country));
  const sel = document.createElement("select"); sel.id = "ld-land"; sel.appendChild(el("option", null, "\u2014")); sel.firstChild.value = "";
  LISTE_LAND.forEach(function(x){ const o = el("option", null, x[1]); o.value = x[0]; sel.appendChild(o); });
  mer.appendChild(sel); box.appendChild(mer);
  cb.onchange = function(){ mer.hidden = !cb.checked; };
}
/* #172: fem frivillige felt for lederens kanaler. Brukes i soeknaden og i «Profilen din». */
function sosFelt(pfx, verdier, aapen){
  const L = C.leaders[lang] || C.leaders.en, T = L.sos; if(!T) return null;
  const d = el("details", "sosfelt"); if(aapen) d.open = true;
  d.appendChild(el("summary", null, T.t));
  d.appendChild(el("p", "hint", T.hint));
  SOSIAL.forEach(function(S){
    const rad = el("label", "sosinn"); rad.setAttribute("dir", "ltr");
    rad.appendChild(sosIkon(S[0])); rad.appendChild(el("span", "sospre", S[4]));
    const i = document.createElement("input"); i.className = "sosin"; i.id = pfx + S[0]; i.type = S[0] === "whatsapp" ? "tel" : "text";
    i.autocomplete = "off"; i.spellcheck = false; i.setAttribute("autocapitalize", "none"); i.maxLength = 60;
    i.setAttribute("aria-label", S[1]); i.placeholder = S[0] === "whatsapp" ? "47 912 34 567" : S[0] === "element" ? "name:matrix.org" : "";
    const v = (verdier || []).find(function(p){ return p[0] === S[0]; }); if(v) i.value = v[1];
    i.addEventListener("change", function(){ const r = rensSosial(S[0], i.value); if(r) i.value = r; rad.classList.toggle("feil", !!i.value.trim() && !r); });
    rad.appendChild(i); d.appendChild(rad);
    if(S[0] === "whatsapp") d.appendChild(el("p", "hint", T.wa));
    if(S[0] === "element" && T.el) d.appendChild(el("p", "hint", T.el));
  });
  return d;
}
function sosVerdier(pfx){
  const F = (C.leader_signup || {}).social_fields || {}, ut = [];
  SOSIAL.forEach(function(S){ const i = $(pfx + S[0]); const v = i ? rensSosial(S[0], i.value) : ""; if(v && F[S[0]]) ut.push([F[S[0]], S[0] === "whatsapp" ? "+" + v : v]); });
  return ut;
}
/* Et felt med noe i som ikke er et gyldig brukernavn/nummer: rød kant og fokus, ingenting sendes. */
function sosUgyldig(pfx){
  let foerste = null;
  SOSIAL.forEach(function(S){ const i = $(pfx + S[0]); if(!i) return; const feil = !!i.value.trim() && !rensSosial(S[0], i.value);
    i.parentNode.classList.toggle("feil", feil); if(feil && !foerste) foerste = i; });
  if(foerste){ foerste.focus(); return true; }
  return false;
}
/* #193 (founder 19.10 05:18): lenker fra CopyX-appen ser like ut som AiTech-lenker (e-koden er kryptert, kan ikke
   skilles fra hverandre - undersoekt), men kobler ikke medlemmene riktig. Derfor: roed advarsel + obligatorisk avkryssing. */
function kildeSkjema(){
  const L = C.leaders[lang] || C.leaders.en, T = L.src, w = $("ld-src"), k = $("ld-srcok"); if(!w || !k) return;
  if(!T){ w.hidden = true; k.hidden = true; return; }
  w.textContent = "\u26A0\uFE0F " + T.warn; w.hidden = false;
  k.querySelector("span").textContent = T.chk; k.hidden = false;
  /* #201: «why»-boksen sa det samme en tredje gang (roed advarsel + avkrysning dekker det) - skjules naar advarselen vises */
  const lw = $("ld-why"); if(lw) lw.hidden = true;
}
function sosSkjema(){
  const box = $("ld-sos"), F = C.leader_signup || {}, L = C.leaders[lang] || C.leaders.en;
  if(!box || !L.sos || !F.social_fields){ if(box) box.hidden = true; return; }
  if(box.dataset.l === lang && box.childNodes.length) return;
  box.dataset.l = lang; box.textContent = ""; box.hidden = false;
  box.appendChild(sosFelt("ld-sos-", null, false));
}
/* «Profilen din» for en godkjent leder: legg til eller endre kanaler uten ny soeknad. Skriptet godtar
   det bare naar partnerlenken OG e-posten er de samme som i den godkjente soeknaden. */
function profilBoks(out, me){
  const L = C.leaders[lang] || C.leaders.en, T = L.sos, F = C.leader_signup || {}, lr = leaderById(me);
  if(!T || !F.social_fields || !F.form || !lr || out.querySelector(".profboks")) return;
  const b = el("div", "profboks");
  b.appendChild(el("h4", null, T.prof_t)); b.appendChild(el("p", "hint", T.prof_lede));
  const likProfil = function(a, c){ return JSON.stringify(a || []) === JSON.stringify(c || []); };
  const friskKort = function(){ try{ out.querySelectorAll(".sosrad").forEach(function(r){ r.remove(); }); const rad = sosRad(me, lr.name, false); if(rad){ const k = out.querySelector(".ldstatus") || out.firstChild; if(k) k.parentNode.insertBefore(rad, k.nextSibling); } }catch(e){} };
  let pending = null; try{ pending = JSON.parse(localStorage.getItem("aimpire.profilv." + me) || "null"); }catch(e){}
  if(pending && Date.now() - pending.t < 3600000 && !likProfil(PROFIL[me], pending.P)){ PROFIL[me] = pending.P; friskKort(); }
  const felt = sosFelt("pf-sos-", PROFIL[me], true); b.appendChild(felt);
  const m = document.createElement("input"); m.type = "email"; m.className = "profmail"; m.inputMode = "email"; m.autocomplete = "email";
  m.placeholder = L.mail_ph || "Email"; b.appendChild(m);
  const knapp = el("button", "copyb", T.save); knapp.type = "button"; b.appendChild(knapp);
  const st = el("p", "vnote"); st.setAttribute("role", "status"); b.appendChild(st);
  /* #262 (founder 20.10 10:26): etter «Lagre» skal siden selv vise at det er gjort - verdiene vises med en gang, knappen
     laases med tidspunkt, og siden sjekker arket til endringen er synlig for alle. Ingen grunn til aa trykke igjen. */
  const tag = ({ no: "nb-NO", en: "en-GB", hi: "hi-IN", ur: "ur-PK", ar: "ar-EG" })[baseOf(lang)] || "en-GB";
  const klokke = function(ms){ try{ return new Date(ms).toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit", hour12: false }); }catch(e){ return ""; } };
  const visSendt = function(p){ knapp.disabled = true; knapp.textContent = T.saved; st.textContent = (T.sent || "").replace("{T}", klokke(p.t)); };
  const visSynlig = function(){ knapp.disabled = true; knapp.textContent = T.saved; st.textContent = T.visible || ""; store("aimpire.profilv." + me, null); };
  if(pending && Date.now() - pending.t < 3600000){
    if(likProfil(PROFIL[me], pending.P) && pending.sett) visSynlig();
    else { visSendt(pending); felt.querySelectorAll("input").forEach(function(i){ i.readOnly = true; }); }
  } else if(pending) store("aimpire.profilv." + me, null);
  /* selv-sjekk: hent arket paa nytt hvert minutt til verdiene er der */
  if(knapp.disabled && !(T.visible && st.textContent === T.visible)){
    const sjekk = function(){ if(!document.body.contains(st)) return; delete PROFIL[me]; hentNavnekart(true).then(function(){ if(likProfil(PROFIL[me], (pending || {}).P)) visSynlig(); else { PROFIL[me] = pending.P; setTimeout(sjekk, 60000); } }).catch(function(){ PROFIL[me] = pending.P; setTimeout(sjekk, 60000); }); };
    setTimeout(sjekk, 60000);
  }
  knapp.onclick = function(){
    const mail = String(m.value || "").trim();
    if(sosUgyldig("pf-sos-")) return;
    if(!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(mail)){ st.textContent = T.err_mail; m.focus(); return; }
    const body = new URLSearchParams(); body.set(F.name_field, lr.name); body.set(F.link_field, lr.link);
    if(F.mail_field) body.set(F.mail_field, mail);
    if(F.sponsor_field) body.set(F.sponsor_field, "(profil)");
    if(F.lang_field) body.set(F.lang_field, baseOf(lang));
    sosVerdier("pf-sos-").forEach(function(x){ body.set(x[0], x[1]); });
    knapp.disabled = true;
    const P = []; SOSIAL.forEach(function(S){ const i = $("pf-sos-" + S[0]); const v = i ? rensSosial(S[0], i.value) : ""; if(v) P.push([S[0], v]); });
    sendSkjema(F.form, body)
      .then(function(){
        pending = { P: P, t: Date.now() }; store("aimpire.profilv." + me, JSON.stringify(pending)); PROFIL[me] = P;
        visSendt(pending); felt.querySelectorAll("input").forEach(function(i){ i.readOnly = true; }); vibrer([10, 40, 10]);
        /* kortet over viser kanalene med en gang */
        friskKort();
        const sjekk = function(){ if(!document.body.contains(st)) return; delete PROFIL[me]; hentNavnekart(true).then(function(){ if(likProfil(PROFIL[me], pending.P)) visSynlig(); else { PROFIL[me] = pending.P; setTimeout(sjekk, 60000); } }).catch(function(){ PROFIL[me] = pending.P; setTimeout(sjekk, 60000); }); };
        setTimeout(sjekk, 60000);
      })
      .catch(function(){ knapp.disabled = false; st.textContent = L.apply_fail || ""; });
  };
  out.appendChild(b);
}
/* #167 (founder 19.10): lederen velger lenkenavnet selv (aimpire.github.io/<navn>) og ser med en
   gang om det er ledig, mot den publiserte fanen «Navnelenker». Forslag naar navnet er tatt.
   Skriptet bruker valget ved godkjenning hvis det fortsatt er ledig (ellers navn+land, ellers nummer). */
const RESERVERT_NAVN = { ledere: 1, assets: 1, lang: 1, data: 1, index: 1, sw: 1, manifest: 1, app: 1, google: 1, "404": 1, aimpire: 1 };
function rensLenkenavn(t){ return String(t || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20); }
function lenkenavnLedig(sl){ if(sl.length < 3 || RESERVERT_NAVN[sl] || NAVN_OPPTATT[sl]) return false; const k = NAVNEKART || {}; return !Object.keys(k).some(function(id){ return k[id] === sl; }); }
function lenkenavnSkjema(){
  const box = $("ld-navn"), F = C.leader_signup || {}, L = C.leaders[lang] || C.leaders.en, T = L.linkname;
  if(!box || !T || !F.linkname_field){ if(box) box.hidden = true; return; }
  if(box.dataset.l === lang && box.childNodes.length) return;
  box.dataset.l = lang; box.textContent = ""; box.hidden = false;
  box.appendChild(el("small", "ldnl", T.lbl));
  const rad = el("label", "ldnrad"); rad.setAttribute("dir", "ltr");
  rad.appendChild(el("span", "ldnpre", "aimpire.github.io/"));
  const inp = document.createElement("input"); inp.id = "ld-lenkenavn"; inp.type = "text"; inp.autocomplete = "off"; inp.spellcheck = false; inp.maxLength = 20; inp.setAttribute("autocapitalize", "none");
  rad.appendChild(inp); box.appendChild(rad);
  const st = el("p", "ldnst"); st.setAttribute("role", "status"); box.appendChild(st);
  box.appendChild(el("p", "hint", T.hint));
  /* #233: forhaandsvisning - lederen ser belønningen mens hun skriver: navnet slik de hun inviterer ser det,
     og den faste lenken. Gjenbruker teksten fra sponsorkortet («{N} inviterte deg»), ingen ny oversettelse. */
  const SP = C.sponsor && (C.sponsor[lang] || C.sponsor.en), pv = el("div", "ldprev"); pv.hidden = true; pv.setAttribute("aria-hidden", "true");
  const pvw = el("div", "lpw"); pvw.appendChild(el("i", null, "\u2713")); const pvn = el("span"); pvw.appendChild(pvn); pv.appendChild(pvw);
  const pvu = el("div", "lpu"); pvu.dir = "ltr"; pv.appendChild(pvu); box.appendChild(pv);
  const forhaand = function(){
    const nm = cleanName(($("ld-name") || {}).value || ""), v = rensLenkenavn(inp.value);
    pv.hidden = !(SP && SP.by && (nm || v));
    pvn.textContent = SP && SP.by ? SP.by.replace("{N}", nm || "\u2026") : "";
    pvu.textContent = "aimpire.github.io/" + (v || "\u2026");
  };
  let egen = false;
  const sjekk = function(){
    const v = rensLenkenavn(inp.value); if(inp.value !== v) inp.value = v;
    try{ forhaand(); }catch(e){}
    st.textContent = ""; st.className = "ldnst";
    if(!v) return;
    if(lenkenavnLedig(v)){ st.textContent = T.ok; st.className = "ldnst ok"; return; }
    st.className = "ldnst opp"; st.appendChild(el("span", null, T.taken + " "));
    const land = ($("ld-land") || {}).value || "", rot = v.replace(/\d+$/, "") || v, forslag = [];
    if(land) forslag.push(rot + land.toLowerCase());
    for(let n = 2; forslag.length < 3 && n < 50; n++) forslag.push(rot + n);
    forslag.filter(lenkenavnLedig).slice(0, 3).forEach(function(f){ const b = el("button", "ldpill", f); b.type = "button"; b.onclick = function(){ inp.value = f; egen = true; sjekk(); }; st.appendChild(b); });
  };
  inp.addEventListener("input", function(){ egen = true; sjekk(); });
  const navnInp = $("ld-name");
  if(navnInp) navnInp.addEventListener("input", function(){ if(!egen){ inp.value = rensLenkenavn(navnSlug(navnInp.value)); sjekk(); } else { try{ forhaand(); }catch(e){} } });
  if(navnInp && navnInp.value){ inp.value = rensLenkenavn(navnSlug(navnInp.value)); }
  hentNavnekart().then(sjekk);
}
function listeValg(){
  const cb = $("ld-show"); if(!cb || !cb.checked) return { ja: false, sp: [], land: "" };
  return { ja: true, sp: Array.from(document.querySelectorAll("#ld-sp input:checked")).map(function(i){ return i.value; }), land: ($("ld-land") || {}).value || "" };
}
let LEDERLISTE = null;
function hentLederliste(){
  const F = C.leader_signup || {};
  if(!F.list_csv || LEDERLISTE) return Promise.resolve(LEDERLISTE || []);
  return fetch(F.list_csv + (F.list_csv.indexOf("?") < 0 ? "?" : "&") + "t=" + Math.floor(Date.now() / 300000), { cache: "no-store" })
    .then(function(r){ return r.ok ? r.text() : ""; })
    .then(function(t){
      LEDERLISTE = String(t || "").split(/\r?\n/).slice(1).map(function(rad){ const f = rad.split(",");
        return { id: (f[0] || "").trim(), name: cleanName(f[1] || ""), sp: String(f[2] || "").split(/\s+/).filter(function(x){ return /^(en|no|hi|ur|ar)$/.test(x); }), land: String(f[3] || "").trim() }; })
        .filter(function(x){ return /^[a-z0-9]{6}$/.test(x.id) && x.name; });
      return LEDERLISTE; })
    .catch(function(){ return []; });
}
/* Rekkefoelgen stokkes for hver besoekende (Fisher-Yates), saa ingen faar fordel av aa staa oeverst. */
function stokk(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function visLedervelger(){
  const L = C.leaders[lang] || C.leaders.en, T = L.list; if(!T || !LEDERLISTE || !LEDERLISTE.length) return;
  let ov = $("ldpick"); if(ov) ov.remove();
  ov = el("div", "ldpick"); ov.id = "ldpick"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
  const kort = el("div", "ldpk");
  const lukk = el("button", "ldpx", "\u00d7"); lukk.type = "button"; lukk.setAttribute("aria-label", "Close"); lukk.onclick = function(){ ov.remove(); };
  kort.appendChild(lukk); kort.appendChild(el("h3", null, T.pick_t)); kort.appendChild(el("p", "hint", T.pick_lede));
  const filt = el("div", "ldsp"); const liste = el("ul", "ldrows"); let valgt = baseOf(lang);
  const rekke = stokk(LEDERLISTE);
  const tegn = function(){
    liste.textContent = "";
    const vis = rekke.filter(function(x){ return valgt === "*" || x.sp.indexOf(valgt) !== -1; });
    if(!vis.length){ liste.appendChild(el("li", "ldtom", T.none)); return; }
    vis.forEach(function(x){
      const li = el("li");
      const av = el("span", "avi", Array.from(x.name)[0] || ""); av.setAttribute("aria-hidden", "true"); li.appendChild(av);
      const tx = el("span", "ldtx"); tx.appendChild(el("b", null, x.name + (x.land ? " " + flagg(x.land) : "")));
      const sn = x.sp.map(function(k){ const f = LISTE_SPRAAK.find(function(y){ return y[0] === k; }); return f ? f[1] : k; }).join(" \u00b7 ");
      if(sn) tx.appendChild(el("small", null, sn));
      const so = sosRad(x.id, x.name, true); if(so) tx.appendChild(so);   /* #172 */
      li.appendChild(tx);
      const b = el("a", "ldgo", T.go); b.href = "?l=" + x.id + "&lang=" + lang; li.appendChild(b);   /* intern navigasjon: koden er nok */
      liste.appendChild(li);
    });
  };
  [["*", T.all]].concat(LISTE_SPRAAK.filter(function(x){ return LEDERLISTE.some(function(y){ return y.sp.indexOf(x[0]) !== -1; }); }))
    .forEach(function(x){ const b = el("button", "ldpill", x[1]); b.type = "button"; b.setAttribute("aria-pressed", String(x[0] === valgt));
      b.onclick = function(){ valgt = x[0]; filt.querySelectorAll("button").forEach(function(y){ y.setAttribute("aria-pressed", String(y === b)); }); tegn(); }; filt.appendChild(b); });
  if(!LEDERLISTE.some(function(y){ return y.sp.indexOf(valgt) !== -1; })){ valgt = "*"; filt.firstChild.setAttribute("aria-pressed", "true"); }
  kort.appendChild(filt); kort.appendChild(liste); ov.appendChild(kort);
  ov.onclick = function(e){ if(e.target === ov) ov.remove(); };
  document.body.appendChild(ov); tegn();
  hentNavnekart().then(function(){ if(ov.isConnected) tegn(); });   /* #172: kanalene kommer fra navnelenke-fanen */
}
/* #157: felles delingslenke. Godkjent leder deler sin egen kode; ellers bare den verifiserte
   sponsoren fra adressen; ellers noeytral (B-022). */
function delLenke(ekstra, hash){
  const me = load("aimpire.me"), egen = me && leaderById(me);
  const aktiv = egen || (sponsorVerified ? leaderById(new URLSearchParams(location.search).get("l")) : null);
  const base = (C.canonical && /^https:\/\//.test(C.canonical)) ? C.canonical : (location.origin + location.pathname.replace(/(ledere|index)\.html$/, ""));
  /* Ren anbefaling (uten anker): ingen lang=, saa mottakeren velger spraak selv i porten. */
  const rest = [ekstra || "", (ekstra || hash) ? "lang=" + lang : ""].filter(Boolean).join("&");
  if(aktiv) return lederUrl(base, aktiv.id, aktiv.name, rest) + (hash ? "#" + hash : "");
  return base + (rest ? "?" + rest : "") + (hash ? "#" + hash : "");
}
/* Hub-lenker skal aapnes i nettleseren, ikke i WhatsApp/Element-appen (founder 16.10). Linjen
   hentes fra den vanlige delingsteksten, saa alle delinger sier det samme paa alle spraak. */
function aapneLinje(){
  const t = C.share && C.share.text && (C.share.text[lang] || C.share.text.en) || "";
  const i = t.indexOf("\n"); return i === -1 ? "" : t.slice(i);
}
/* #157: «Send til en venn» under hvert ord og hver leksjon - dyplenken aapner akkurat den. */
function sendVenn(tittel, anker){
  const I = C.share && C.share.item && (C.share.item[lang] || C.share.item.en); if(!I) return null;
  const b = el("button", "sendv", I.btn); b.type = "button";
  b.onclick = function(ev){ ev.stopPropagation();
    const m = I.msg.replace("{T}", tittel).replace("{LINK}", delLenke("", anker)) + aapneLinje();
    if(navigator.share){ navigator.share({ text: m }).catch(function(){}); return; }
    window.open("https://wa.me/?text=" + encodeURIComponent(m), "_blank", "noopener"); };
  return b;
}
/* Del en PNG: delingsark med fil der telefonen kan, ellers nedlasting. */
function delBilde(blob, navn, tekst, ferdig){
  const f = new File([blob], navn, { type: "image/png" });
  if(navigator.canShare && navigator.canShare({ files: [f] })){ navigator.share({ files: [f], text: tekst }).catch(function(){}); return; }
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = navn;
  document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 4000); if(ferdig) ferdig();
}
/* #157: ukens store nyheter som Story-bilde (1080 x 1920). Lederne faar noe nyttig aa poste hver
   dag - laering, ikke signal: tider, valuta og hvilke par som pleier aa bevege seg. */
function nyhetBilde(N){
  const W = 1080, H = 1920, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const x = cv.getContext("2d"), rtl = document.documentElement.dir === "rtl";
  const face = getComputedStyle(document.body).fontFamily, num = '"Archivo",' + face;
  const tag = lang === "no" ? "nb" : (baseOf(lang) === "ar" ? "ar-u-nu-latn" : baseOf(lang) === "ur" ? "ur-u-nu-latn" : baseOf(lang));
  const nu = Date.now(), uke = nu + 7 * 864e5;
  const liste = (NYHET.liste || []).map(function(n){ return { n: n, d: new Date(n.d) }; })
    .filter(function(e){ return e.n.i === "H" && e.d.getTime() > nu - 30 * 60000 && e.d.getTime() < uke && e.n.t && e.n.c; })
    .sort(function(a, b){ return a.d - b.d; }).slice(0, 14);
  let sone = ""; try{ sone = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop().replace(/_/g, " "); }catch(e){}
  const off = -new Date().getTimezoneOffset(), gmt = "GMT" + (off >= 0 ? "+" : "\u2212") + Math.floor(Math.abs(off) / 60) + (Math.abs(off) % 60 ? ":" + String(Math.abs(off) % 60).padStart(2, "0") : "");
  const ferdig = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load("800 64px Archivo"), document.fonts.load("600 40px " + face)]).catch(function(){}) : Promise.resolve();
  return ferdig.then(function(){
    const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#0B1630"); g.addColorStop(1, "#1C0B2A"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    const lg = x.createLinearGradient(80, 0, W - 80, 0); lg.addColorStop(0, "#15D8C4"); lg.addColorStop(.55, "#1B4FD8"); lg.addColorStop(1, "#C21FBF");
    x.fillStyle = lg; x.fillRect(0, 0, W, 12);
    const X0 = rtl ? W - 80 : 80, XE = rtl ? 80 : W - 80;
    x.direction = "ltr"; x.textAlign = "left"; x.font = "800 52px " + num; x.fillStyle = "#fff"; x.fillText("Aimpire", 80, 140);
    x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start";
    let ts = 76; do{ x.font = "800 " + ts + "px " + face; ts -= 4; }while(x.measureText(N.title).width > W - 160 && ts > 40);
    x.fillStyle = lg; x.fillText(N.title, X0, 270);
    x.font = "600 34px " + face; x.fillStyle = "rgba(255,255,255,.7)"; x.fillText(N.tz.replace("{Z}", "\u2066" + (sone ? sone + " " : "") + "(" + gmt + ")\u2069"), X0, rtl ? 350 : 330);
    let y = 420, dagFor = "";
    liste.forEach(function(e){
      let dag; try{ dag = e.d.toLocaleDateString(tag, { weekday: "long", day: "numeric", month: "short" }); }catch(er){ dag = e.d.toDateString(); }
      if(dag !== dagFor){ dagFor = dag; y += 26; x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start"; x.font = "700 34px " + face; x.fillStyle = "#15D8C4"; x.fillText(dag, X0, y); y += 18;
        x.fillStyle = "rgba(255,255,255,.12)"; x.fillRect(80, y, W - 160, 2); y += 58; }
      /* raden er alltid venstre-til-hoeyre: klokke, valuta, navn, par - som i kalenderen */
      x.direction = "ltr"; x.textAlign = "left";
      const kl = String(e.d.getHours()).padStart(2, "0") + ":" + String(e.d.getMinutes()).padStart(2, "0");
      x.font = "800 40px " + num; x.fillStyle = "#fff"; x.fillText(kl, 80, y);
      x.fillStyle = "#FF6B6B"; x.beginPath(); x.arc(232, y - 13, 9, 0, 7); x.fill();
      x.font = "800 40px " + num; x.fillStyle = "#FFD27A"; x.fillText(String(e.n.c).slice(0, 4), 258, y);
      let t = String(e.n.t); x.font = "600 38px " + num; x.fillStyle = "#fff";
      while(x.measureText(t).width > W - 160 - 290 && t.length > 4) t = t.slice(0, -2);
      if(t !== String(e.n.t)) t = t.replace(/\s*\S?$/, "") + "\u2026";
      x.fillText(t, 370, y);
      const par = NYH_PAR[e.n.c];
      if(par){ y += 46; x.font = "600 30px " + num; x.fillStyle = "rgba(255,255,255,.6)"; x.fillText("\u2192 " + par.join("  "), 370, y); }
      y += 70;
      if(y > H - 330) return;
    });
    if(!liste.length){ x.font = "600 40px " + face; x.fillStyle = "#fff"; x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start"; x.fillText("\u2014", X0, y + 40); }
    x.fillStyle = "rgba(255,255,255,.1)"; x.fillRect(80, H - 300, W - 160, 2);
    x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start"; x.font = "600 36px " + face; x.fillStyle = "#FFD27A";
    const ord = N.tip.split(" "); let linje = "", yy = H - 230;
    ord.forEach(function(o){ const p2 = linje ? linje + " " + o : o; if(x.measureText(p2).width > W - 160 && linje){ x.fillText(linje, X0, yy); linje = o; yy += rtl ? 62 : 50; } else linje = p2; });
    if(linje) x.fillText(linje, X0, yy);
    x.direction = "ltr"; x.textAlign = rtl ? "right" : "left"; x.font = "700 34px " + num; x.fillStyle = "#15D8C4";
    x.fillText(((C.canonical || "aimpire.github.io").replace(/^https?:\/\//, "").replace(/\/+$/, "")), X0, H - 70);
    return new Promise(function(res){ cv.toBlob(res, "image/png"); });
  });
}
/* #156 (founder 18.10): ledere skal kunne vise og sende regnestykket. To veier: lenke som aapner
   samme tall hos mottakeren, og et bilde (PNG) med forbeholdet brent inn - et skjermbilde mister
   det lett, bildet vaart kan ikke deles uten. Lenken baerer lederens egen kode hvis lederen er
   godkjent, ellers bare sponsoren fra adressen (samme regel som delingsknappen, B-022). */
function delKalk(T){
  const box = $("cc-share"), S = T.share || (C.calculator.en.share); if(!box || !S) return;
  box.textContent = "";
  const lenke = function(){ return delLenke("ca=" + Math.round(CALC_SIST.A) + "&cp=" + calcPeriod, "calc"); };
  const melding = function(){ return S.msg.replace("{A}", "\u2066$" + Math.round(CALC_SIST.A).toLocaleString("en-US") + "\u2069").replace("{LINK}", lenke()) + aapneLinje(); };
  const kvitt = el("small", "cshok"); kvitt.setAttribute("role", "status");
  const vis = function(t){ kvitt.textContent = t; clearTimeout(vis.t); vis.t = setTimeout(function(){ kvitt.textContent = ""; }, 2600); };
  const bl = el("button", "cshb", S.link); bl.type = "button";
  bl.onclick = function(){
    if(!CALC_SIST) return; const m = melding();
    if(navigator.share){ navigator.share({ text: m }).catch(function(){}); return; }
    const k = klipp(m);
    if(k) k.then(function(ok){ if(ok) vis(S.copied); else window.open("https://wa.me/?text=" + encodeURIComponent(m), "_blank", "noopener"); });
    else window.open("https://wa.me/?text=" + encodeURIComponent(m), "_blank", "noopener");
  };
  const bi = el("button", "cshb cshi", S.img); bi.type = "button";
  bi.onclick = function(){
    if(!CALC_SIST) return; bi.disabled = true;
    kalkBilde(T, S).then(function(blob){
      bi.disabled = false; if(!blob) return;
      delBilde(blob, "aimpire-sonic-" + Math.round(CALC_SIST.A) + ".png", melding(), function(){ vis(S.saved); });
    }, function(){ bi.disabled = false; });
  };
  box.appendChild(el("p", "cshint", S.hint));
  const rad = el("div", "cshrow"); rad.appendChild(bl); rad.appendChild(bi); box.appendChild(rad); box.appendChild(kvitt);
}
/* Kortet: 1080 x 1350 (staaende, passer WhatsApp-status og Instagram). Tegnes paa canvas, ingen bibliotek. */
function kalkBilde(T, S){
  const W = 1080, H = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const x = cv.getContext("2d"), d = CALC_SIST, rtl = document.documentElement.dir === "rtl";
  const face = getComputedStyle(document.body).fontFamily, num = '"Archivo",' + face;
  const usd = function(n){ return "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  const ferdig = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load("800 64px Archivo"), document.fonts.load("600 40px " + face)]).catch(function(){}) : Promise.resolve();
  return ferdig.then(function(){
    const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#0B1630"); g.addColorStop(1, "#1C0B2A");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    const lg = x.createLinearGradient(80, 0, W - 80, 0); lg.addColorStop(0, "#15D8C4"); lg.addColorStop(.55, "#1B4FD8"); lg.addColorStop(1, "#C21FBF");
    x.fillStyle = lg; x.fillRect(0, 0, W, 10);
    x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start";
    const X0 = rtl ? W - 80 : 80;
    const tekst = function(t, y, font, farge, maks){
      x.font = font; x.fillStyle = farge;
      if(!maks){ x.fillText(t, X0, y); return y; }
      const ord = String(t).split(" "); let linje = "", yy = y;
      ord.forEach(function(o){ const prov = linje ? linje + " " + o : o;
        if(x.measureText(prov).width > maks && linje){ x.fillText(linje, X0, yy); linje = o; yy += parseInt(font.match(/(\d+)px/)[1], 10) * (rtl ? 1.75 : 1.4); } else linje = prov; });
      if(linje) x.fillText(linje, X0, yy); return yy;
    };
    x.direction = "ltr"; x.textAlign = "left"; x.font = "800 52px " + num; x.fillStyle = "#fff"; x.fillText("Aimpire", 80, 110);
    const wmW = x.measureText("Aimpire").width; x.font = "600 30px " + num; x.fillStyle = "#15D8C4"; x.fillText("Sonic", 80 + wmW + 16, 108);
    x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start";
    const per = (T.periods || [])[d.per] || "";
    const amt = "\u2066$" + Math.round(d.A).toLocaleString("en-US") + "\u2069";
    tekst(S.card_amt + ": " + amt + "   " + per, 210, "600 38px " + face, "rgba(255,255,255,.78)");
    tekst(S.card_k, 300, "600 40px " + face, "#fff");
    x.font = "800 150px " + num; x.fillStyle = lg; x.direction = "ltr"; x.textAlign = rtl ? "right" : "left";
    x.fillText((d.lo >= 0 ? "+" : "\u2212") + usd(d.lo), X0, 450);
    x.font = "700 44px " + num; x.fillStyle = d.lo >= 0 ? "#3FE0A1" : "#FF6B6B";
    x.fillText((d.pr >= 0 ? "+" : "\u2212") + Math.round(Math.abs(d.pr)) + " %", X0, 520);
    /* kurven: samlet beholdt maaned for maaned, med stolper under */
    const k = d.kept, n = k.length, cx = 80, cw = W - 160, cy = 570, ch = 280;
    let sum = 0; const cum = [0].concat(k.map(function(m){ sum += m[1]; return sum; }));
    const lo = Math.min.apply(null, cum), hi = Math.max.apply(null, cum), sp = (hi - lo) || 1;
    const px = function(i){ return cx + i * cw / n; }, py = function(v){ return cy + 10 + (ch - 90) * (1 - (v - lo) / sp); };
    x.strokeStyle = "rgba(255,255,255,.08)"; x.lineWidth = 2;
    [0, .5, 1].forEach(function(f){ x.beginPath(); x.moveTo(cx, cy + 10 + (ch - 90) * f); x.lineTo(cx + cw, cy + 10 + (ch - 90) * f); x.stroke(); });
    x.beginPath(); cum.forEach(function(v, i){ i ? x.lineTo(px(i), py(v)) : x.moveTo(px(i), py(v)); });
    x.lineTo(px(n), cy + ch - 80); x.lineTo(px(0), cy + ch - 80); x.closePath();
    const ag = x.createLinearGradient(0, cy, 0, cy + ch); ag.addColorStop(0, "rgba(21,216,196,.28)"); ag.addColorStop(1, "rgba(21,216,196,0)"); x.fillStyle = ag; x.fill();
    x.beginPath(); cum.forEach(function(v, i){ i ? x.lineTo(px(i), py(v)) : x.moveTo(px(i), py(v)); }); x.strokeStyle = lg; x.lineWidth = 7; x.lineJoin = "round"; x.stroke();
    const mx = Math.max.apply(null, k.map(function(m){ return Math.abs(m[1]); })) || 1, bw = Math.max(4, cw / n - 6);
    k.forEach(function(m, i){ const h = Math.max(3, Math.abs(m[1]) / mx * 60); x.fillStyle = m[1] >= 0 ? "#3FE0A1" : "#FF6B6B"; x.fillRect(px(i) + 3, cy + ch - h, bw, h); });
    /* tre tall: beste, daarligste, snitt */
    const cols = [[T.best || "Best", d.best[1], mndNavn(d.best[0])], [T.worst || "Worst", d.worst[1], mndNavn(d.worst[0])], [T.avg || "Avg", d.snitt, ""]];
    if(rtl) cols.reverse();
    cols.forEach(function(c, i){ const bx = 80 + i * (W - 160) / 3, by = 925;
      x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "left"; if(rtl){ x.textAlign = "right"; }
      const tx = rtl ? bx + (W - 160) / 3 - 20 : bx;
      x.font = "600 30px " + face; x.fillStyle = "rgba(255,255,255,.65)"; x.fillText(c[0], tx, by);
      x.direction = "ltr"; x.font = "800 50px " + num; x.fillStyle = c[1] >= 0 ? "#fff" : "#FF6B6B"; x.fillText((c[1] >= 0 ? "+" : "\u2212") + usd(c[1]), tx, by + 62);
      if(c[2]){ x.direction = rtl ? "rtl" : "ltr"; x.font = "500 28px " + face; x.fillStyle = "rgba(255,255,255,.55)"; x.fillText(c[2], tx, by + 106); }
    });
    x.direction = rtl ? "rtl" : "ltr"; x.textAlign = "start";
    x.fillStyle = "rgba(255,255,255,.1)"; x.fillRect(80, 1062, W - 160, 2);
    /* Risikoen staar paa selve bildet: tallet over kan aldri deles uten den. */
    const risiko = (T.risks && T.risks[0] || "").replace(/\{A\}/g, amt);
    let yr = 1112; if(risiko) yr = tekst(risiko, yr, "600 30px " + face, "#FF8A8A", W - 160) + (rtl ? 62 : 52);
    tekst(S.card_note, yr, "600 30px " + face, "#FFD27A", W - 160);
    x.direction = "ltr"; x.textAlign = rtl ? "right" : "left"; x.font = "700 30px " + num; x.fillStyle = "#15D8C4";
    x.fillText(((C.canonical || "aimpire.github.io").replace(/^https?:\/\//, "").replace(/\/+$/, "")), X0, 1322);
    return new Promise(function(res){ cv.toBlob(res, "image/png"); });
  });
}
/* Bonuser og insentiver: hva hver gir og hva den krever. Informasjon, ikke maal. */
/* Stegtekst: én linje = én handling. Flere linjer blir en kort liste,
   en enkelt linje blir et vanlig avsnitt. */
function lines(txt, cls){
  if(txt.indexOf("\n") === -1) return el("p", cls || null, txt);
  const ul = el("ul", "acts" + (cls ? " " + cls : ""));
  txt.split("\n").filter(function(s){ return s.trim(); }).forEach(function(s){ ul.appendChild(el("li", null, s)); });
  return ul;
}
function p2pBox(P, video){
  const d = el("details", "p2p");
  d.appendChild(el("summary", null, P.title));
  if(P.lede) d.appendChild(el("p", null, P.lede));
  if(video){
    const a = el("a", "p2pv", P.watch || "YouTube"); a.href = video; a.target = "_blank"; a.rel = "noopener noreferrer";
    d.appendChild(a);
  }
  const ol = el("ol");
  P.steps.forEach(function(s){
    const li = el("li"); li.appendChild(el("h4", null, s[0]));
    const ul = el("ul"); s[1].forEach(function(b){ ul.appendChild(el("li", null, b)); }); li.appendChild(ul);
    ol.appendChild(li);
  });
  d.appendChild(ol);
  return d;
}
/* Kort inntjeningsguide (founder 17.10 17:53): bilde av flyten, tre steg, stigen og ett
   eksempel. Satsene er de samme som i detaljene (AiTech internasjonalt, K-kilder der). */
const IQ_RATES = [2, 1.5, 1, 1, .5, .5, .5, .5, .5, .5];
function iqIcon(kind){
  const ns = "http://www.w3.org/2000/svg", sv = document.createElementNS(ns, "svg");
  sv.setAttribute("viewBox", "0 0 24 24"); sv.setAttribute("aria-hidden", "true");
  const P = { me: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0z",
              friend: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0zm11.5 0a6.5 6.5 0 0 0-2-4.6A5 5 0 0 1 21 20z",
              coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm1 14v1.5h-2V17c-1.6-.3-2.8-1.3-2.9-2.8h2c.1.7.8 1.2 1.9 1.2 1.2 0 1.8-.5 1.8-1.1 0-.7-.6-1-2.1-1.4-1.9-.4-3.3-1-3.3-2.8 0-1.4 1.1-2.4 2.6-2.7V5.9h2v1.5c1.5.3 2.5 1.3 2.6 2.7h-2c-.1-.7-.7-1.1-1.6-1.1-1 0-1.6.4-1.6 1 0 .6.6.9 2 1.2 2 .5 3.4 1.1 3.4 2.9 0 1.5-1.1 2.6-2.8 2.9z" };
  const p = document.createElementNS(ns, "path"); p.setAttribute("d", P[kind]); p.setAttribute("fill", "currentColor");
  sv.appendChild(p); return sv;
}
function iqMoney(v){ const t = "$" + v.toFixed(2); return lang === "no" ? t.replace(".", ",") : t; }
function renderIbq(){
  const Q = C.ibq && (C.ibq[lang] || C.ibq.en), sec = $("s-ibq"), more = $("s-ibmore");
  if(!Q || !sec){ if(sec) sec.hidden = true; if(more) more.hidden = true; return; }
  sec.hidden = false; more.hidden = false;
  $("iq-t").textContent = Q.title; $("iq-lede").textContent = Q.lede;
  /* Flyten: du -> vennen -> du faar en del. Ett lite lys som vandrer langs pilene. */
  const fl = $("iq-flow"); fl.textContent = "";
  ["me", "friend", "coin"].forEach(function(k, i){
    if(i){ const ar = el("span", "iqarr"); ar.setAttribute("aria-hidden", "true"); ar.appendChild(el("i")); fl.appendChild(ar); }
    const n = el("div", "iqnode iq-" + k);
    const ic = el("span", "iqic"); ic.appendChild(iqIcon(k)); n.appendChild(ic);
    n.appendChild(el("strong", null, Q.flow[i][0])); n.appendChild(el("span", null, Q.flow[i][1]));
    fl.appendChild(n);
  });
  $("iq-fnote").textContent = Q.flow_note;
  /* Tre steg - en ekte rekkefoelge, derfor nummerert. */
  $("iq-st").textContent = Q.steps_t;
  const ol = $("iq-steps"); ol.textContent = "";
  const SP = C.sponsor && (C.sponsor[lang] || C.sponsor.en);
  Q.steps.forEach(function(st, i){
    const li = el("li"); li.appendChild(el("h4", null, st[0])); li.appendChild(el("p", null, st[1]));
    if(i === 1){ const a = el("a", "iqbtn"); a.href = "ledere.html"; a.appendChild(el("span", null, (SP && SP.own_link) || "ledere")); li.appendChild(a); }
    if(i === 2){ const a = el("a", "iqbtn ghost"); a.href = "https://aitech.ibportal.io/"; a.target = "_blank"; a.rel = "noopener noreferrer"; a.appendChild(el("span", null, Q.portal)); a.appendChild(el("b", null, "↗")); li.appendChild(a); }
    ol.appendChild(li);
  });
  /* Stigen: ti nivaaer, sats per lot som stolpe. 1-3 aapne med egne $250. */
  $("iq-lt").textContent = Q.ladder_t;
  const lad = $("iq-lad"); lad.textContent = "";
  IQ_RATES.forEach(function(r, i){
    const row = el("div", "iqrow" + (i < 3 ? " on" : ""));
    row.style.setProperty("--w", (r / 2 * 100) + "%"); row.style.setProperty("--d", (i * 60) + "ms");
    row.appendChild(el("span", "n", String(i + 1)));
    const bar = el("span", "bar"); bar.appendChild(el("i")); row.appendChild(bar);
    row.appendChild(el("span", "v", iqMoney(r)));
    lad.appendChild(row);
  });
  const leg = el("div", "iqleg"); leg.setAttribute("dir", document.documentElement.dir || "ltr");
  leg.appendChild(el("span", "on", Q.open)); leg.appendChild(el("span", null, Q.grow));
  lad.appendChild(leg);
  $("iq-lcap").textContent = Q.ladder_cap;
  /* Ett eksempel med to personer. */
  $("iq-et").textContent = Q.ex_t;
  const ex = $("iq-ex"); ex.textContent = "";
  const pair = el("div", "iqpair");
  Q.ex.forEach(function(p, i){
    if(i){ const ar = el("span", "iqarr sm"); ar.setAttribute("aria-hidden", "true"); ar.appendChild(el("i")); pair.appendChild(ar); }
    const who = el("div", "iqwho");
    who.appendChild(el("span", "avi", Array.from(p[0])[0]));
    const tx = el("div"); tx.appendChild(el("strong", null, p[0])); tx.appendChild(el("span", null, p[1])); who.appendChild(tx);
    pair.appendChild(who);
  });
  ex.appendChild(pair);
  ex.appendChild(el("p", null, Q.ex_body));
  /* Nivaaene som et lite tre: du oeverst, nivaa 1-3 under (2, 4, 8 prikker). */
  if(Q.lv){
    $("iq-lvt").textContent = Q.lv_t; $("iq-lvm").textContent = Q.lv_more;
    const tr = $("iq-lv"); tr.textContent = "";
    const top = el("div", "iqlvrow me"); const yo = el("span", "dot me"); yo.appendChild(iqIcon("me")); top.appendChild(yo);
    top.appendChild(el("div", "lbl")); top.lastChild.appendChild(el("strong", null, (Q.flow && Q.flow[0][0]) || ""));
    tr.appendChild(top);
    Q.lv.forEach(function(r, i){
      const row = el("div", "iqlvrow"); row.style.setProperty("--d", (i * 120) + "ms");
      const dots = el("div", "dots"); for(let k = 0; k < Math.pow(2, i + 1); k++) dots.appendChild(el("span", "dot l" + (i + 1)));
      row.appendChild(dots);
      const lb = el("div", "lbl"); lb.appendChild(el("strong", null, r[0])); lb.appendChild(el("span", null, r[1])); row.appendChild(lb);
      tr.appendChild(row);
    });
  }
  /* Opplaasing: to kort med hengelaas -> aapen laas. */
  if(Q.un){
    $("iq-unt").textContent = Q.un_t; $("iq-unn").textContent = Q.un_note;
    const un = $("iq-un"); un.textContent = "";
    Q.un.forEach(function(u, i){
      const card = el("div", "iqucard");
      card.appendChild(el("span", "lock", i ? "🔓" : "🔑"));
      const tx = el("div"); tx.appendChild(el("span", "if", u[0])); tx.appendChild(el("strong", null, u[1])); card.appendChild(tx);
      un.appendChild(card);
    });
  }
  /* Trappen: to spor - CPA (nye innskudd) og Leader Pools (teamvolum). */
  if(Q.cpa){
    $("iq-stt").textContent = Q.st_t; $("iq-rule").textContent = Q.rule;
    const st = $("iq-st2"); st.textContent = "";
    const track = function(title, items, cls){
      const box = el("div", "iqtrack " + cls); box.appendChild(el("p", "tt", title));
      const steps = el("div", "steps"); steps.setAttribute("dir", "ltr");
      items.forEach(function(it, i){
        const s2 = el("div", "step"); s2.style.setProperty("--h", (36 + i * 22) + "px"); s2.style.setProperty("--d", (i * 90) + "ms");
        s2.appendChild(el("b", null, it[1])); s2.appendChild(el("i")); s2.appendChild(el("span", null, it[0]));
        steps.appendChild(s2);
      });
      box.appendChild(steps); return box;
    };
    st.appendChild(track(Q.st_a + " → " + Q.st_a_lbl, Q.cpa, "a"));
    st.appendChild(track(Q.st_b, Q.pools, "b"));
  }
  /* Beloep, ikke antall (founder 18:22): 1 x $10 000 = 1 000 x $10. Ingen er bedre. */
  if(Q.va_cmp){
    $("iq-vat").textContent = Q.va_t; $("iq-val").textContent = Q.va_l;
    const va = $("iq-va"); va.textContent = "";
    Q.va_cmp.forEach(function(p, i){
      if(i){ va.appendChild(el("span", "eq", "=")); }
      const card = el("div", "iqvc");
      const pic = el("div", "pic" + (i ? " many" : " one"));
      if(i){ for(let k = 0; k < 60; k++) pic.appendChild(el("i")); } else { const b = el("span", "big"); b.appendChild(iqIcon("me")); pic.appendChild(b); }
      card.appendChild(pic); card.appendChild(el("strong", null, p[0])); card.appendChild(el("span", null, p[1]));
      va.appendChild(card);
    });
    const eq = el("div", "iqveq", Q.va_eq); va.appendChild(eq);
    $("iq-van").textContent = Q.va_note;
    $("iq-valt").textContent = Q.va_lv_t;
    const vl = $("iq-vl"); vl.textContent = "";
    [[Q.va_lv[0], 100], [Q.va_lv[1], 25]].forEach(function(x){
      const row = el("div", "iqrow on"); row.style.setProperty("--w", x[1] + "%");
      row.appendChild(el("span", "n wide", x[0][0]));
      const bar = el("span", "bar"); bar.appendChild(el("i")); row.appendChild(bar);
      row.appendChild(el("span", "v wide", x[0][1]));
      vl.appendChild(row);
    });
    $("iq-vln").textContent = Q.va_lv_note; $("iq-tip").textContent = Q.va_tip;
  }
  if(Q.rb){ $("iq-rbt").textContent = Q.rb_t; $("iq-rb").textContent = Q.rb; }
  $("iq-honest").textContent = Q.honest;
  /* Alt det lange: flyttes én gang inn i «Alle detaljer». */
  $("iq-more").textContent = Q.more;
  const inn = $("ibmore-in");
  ["s-earn", "s-ib", "s-bonus"].forEach(function(id){ const x = $(id); if(x && x.parentNode !== inn) inn.appendChild(x); });
  try{ ibForbedr(Q, SP); }catch(e){}
}
/* #170 runde 3 (founder 06:34 «alt kan bli mye bedre inkl provisjonssiden»):
   1) hurtiglenker under tittelen - overskriftene som allerede finnes, saa alle spraak virker uten ny tekst;
   2) «Lag din egen app-side» rett etter eksempelet, der beslutningen tas (ikke bare nederst);
   3) det europeiske programmet (gjelder faa medlemmer) flyttes inn i «Alle detaljer». */
function ibForbedr(Q, SP){
  const tit = $("iq-t"); if(!tit) return;
  let nav = $("iq-chips");
  if(!nav){ nav = el("nav", "iqchips"); nav.id = "iq-chips"; tit.before(nav); }
  nav.textContent = ""; nav.setAttribute("aria-label", Q.t || "");
  [["iq-et"], ["iq-lt"], ["iq-stt"], ["iq-st"], ["iq-more", true]].forEach(function(x){
    const h = $(x[0]); if(!h || !h.textContent.trim()) return;
    const b = el("button", "iqchip", h.textContent.trim()); b.type = "button";
    b.onclick = function(){ const d = x[1] ? $("ibmore-d") : null; if(d) d.open = true;
      const y = (d || h).getBoundingClientRect().top + scrollY - 78; window.scrollTo({ top: y, behavior: stilleBevegelse() ? "auto" : "smooth" }); };
    nav.appendChild(b);
  });
  const ex = $("iq-ex");
  if(ex && SP && SP.own_link){ let a = $("iq-cta"); if(!a){ a = el("a", "iqbtn iqcta"); a.id = "iq-cta"; a.href = "ledere.html"; ex.after(a); } a.textContent = ""; a.appendChild(el("span", null, SP.own_link)); }
  const rbt = $("iq-rbt"), rb = $("iq-rb"), inn = $("ibmore-in");
  if(rbt && rb && inn && Q.rb){
    let d = $("iq-rbakk"); if(!d){ d = el("details", "akk"); d.id = "iq-rbakk"; inn.insertBefore(d, inn.firstChild); }
    d.textContent = ""; const sm = el("summary"); sm.appendChild(el("span", null, Q.rb_t)); d.appendChild(sm);
    const k = el("div", "akkin"); k.appendChild(el("p", null, Q.rb)); d.appendChild(k);
    rbt.hidden = true; rb.hidden = true;
  }
}
/* #170 runde 2: «Alle detaljer» var ~10 000 px aapnet. Hvert tema (IB-delen) og hver bonus blir en egen
   sammenfoldet rad med overskriften synlig - en innholdsliste man aapner én og én. Teksten er urørt.
   Kjoeres etter hver tegning; allerede brettede blokker hoppes over. */
function ibAkkordion(){
  const inn = $("ibmore-in"); if(!inn) return;
  inn.querySelectorAll("#s-ib div.ib > section, #s-bonus div.bnl > article").forEach(function(x){
    if(x.querySelector(":scope > details.akk")) return;
    const h = x.querySelector(":scope > h3, :scope > h4, :scope > header h3, :scope > header h4") || x.querySelector("h3, h4");
    if(!h) return;
    const d = el("details", "akk"), sm = el("summary"), kropp = el("div", "akkin");
    sm.appendChild(el("span", null, h.textContent));
    d.appendChild(sm); d.appendChild(kropp);
    Array.from(x.childNodes).forEach(function(n){ if(n !== h && !(n.nodeType === 1 && n.contains(h) && n.tagName === "HEADER")) kropp.appendChild(n); });
    const hdr = h.closest("header"); if(hdr && hdr.parentNode === x) hdr.remove(); else h.remove();
    x.appendChild(d);
  });
}
/* Kort versjon foerst paa hver fane (founder 17.10 18:23, #97): samme moenster som IB-siden.
   Innhold i C.short[seksjons-id][spraak]. Det lange flyttes én gang inn i «Alle detaljer»;
   elementer i SHORT_KEEP blir staaende synlige (f.eks. grafen paa Resultater). */
const SHORT_KEEP = { "s-results": ["#rs-src", "#rs-fig", "#rs-leg"], "s-calc": [".calc", ".cbig", ".cshare"] };
const SHORT_NOFOLD = { "s-guide": 1, "s-leaders": 1 };   /* guiden er allerede en interaktiv sjekkliste - bare kart oeverst */
let SN_BELOP = 100;
function renderShort(){
  if(!C.short) return;
  Object.keys(C.short).forEach(function(id){
    const sec = $(id), Q = C.short[id][lang] || C.short[id].en;
    if(!sec || !Q) return;
    let box = $("sh-" + id), det = $("shd-" + id);
    if(!box && SHORT_NOFOLD[id]){
      box = el("div", "short nofold"); box.id = "sh-" + id;
      const h = sec.querySelector("h2"); const lede = h && h.nextElementSibling && h.nextElementSibling.classList.contains("lede") ? h.nextElementSibling : h;
      if(lede) lede.after(box); else sec.prepend(box);
    }
    if(!box){
      box = el("div", "short"); box.id = "sh-" + id;
      det = el("details", "ibmore shmore"); det.id = "shd-" + id;
      det.appendChild(el("summary")); const inn = el("div", "shin"); det.appendChild(inn);
      const keep = (SHORT_KEEP[id] || []).map(function(k){ return sec.querySelector(k); }).filter(function(n){ return n && n.parentNode === sec; });
      Array.from(sec.childNodes).forEach(function(n){ if(keep.indexOf(n) < 0) inn.appendChild(n); });
      sec.appendChild(box);
      keep.forEach(function(k){ sec.appendChild(k); });
      sec.appendChild(det);
    }
    box.textContent = "";
    if(Q.title){ const h = el("h2", null, Q.title); h.appendChild(el("b")); box.appendChild(h); }
    if(Q.path){
      const pa = el("ol", "shpath");
      pa.style.gridTemplateColumns = "repeat(" + Q.path.length + ",1fr)";
      /* #198: i guiden er ikonraden en snarvei - trykk = det steget aapnes, og ferdige steg faar hake. */
      const GSTEG = id === "s-guide" && Q.path.length === 6 ? [0, 1, 3, 4, 6, 7] : null;
      const gjort = GSTEG ? doneSet() : null;
      Q.path.forEach(function(p, i){ const li = el("li"); li.style.setProperty("--d", (i * 80) + "ms");
        if(GSTEG){ const b = el("button", "shgo"); b.type = "button"; const n = GSTEG[i];
          if(gjort.has(String(n))) li.classList.add("ok");
          b.appendChild(el("span", "e", p[0])); b.appendChild(el("span", "t", p[1])); b.setAttribute("aria-label", p[1] + " – " + (n + 1));
          b.onclick = function(){ location.hash = "#steg-" + (n + 1); }; li.appendChild(b); }
        else { li.appendChild(el("span", "e", p[0])); li.appendChild(el("span", "t", p[1])); }
        /* #233: ledersiden etter innsending - tre steg gjort, det siste (lenken) venter paa godkjenning */
        if(id === "s-leaders" && load("aimpire.me") && !leaderById(load("aimpire.me"))){ if(i < Q.path.length - 1) li.classList.add("ok"); else li.classList.add("naa"); }
        pa.appendChild(li); });
      box.appendChild(pa);
    }
    if(Q.lede) box.appendChild(el("p", "lede", Q.lede));
    if(Q.flow){
      const fl = el("div", "iqflow");
      Q.flow.forEach(function(f, i){
        if(i){ const ar = el("span", "iqarr"); ar.setAttribute("aria-hidden", "true"); ar.appendChild(el("i")); fl.appendChild(ar); }
        const n = el("div", "iqnode"); n.appendChild(el("span", "iqic emo", f[0]));
        n.appendChild(el("strong", null, f[1])); n.appendChild(el("span", null, f[2])); fl.appendChild(n);
      });
      box.appendChild(fl);
    }
    if(Q.chips){
      const ch = el("div", "shchips");
      Q.chips.forEach(function(c, i){ const k = el("div", "shchip"); k.style.setProperty("--d", (i * 90) + "ms"); k.appendChild(el("b", null, c[0])); k.appendChild(el("span", null, c[1])); ch.appendChild(k); });
      box.appendChild(ch);
    }
    /* Sonic (founder 17.10 19:40 «sonic siden må bli bedre»): levende historikk, eget beløp, 70/30. */
    if(Q.live_t && C.results && C.results.months){
      box.appendChild(el("h3", "iqh", Q.live_t));
      const sp = el("div", "snspark"); sp.setAttribute("dir", "ltr");
      const ms = C.results.months, mx = Math.max.apply(null, ms.map(function(m){ return m[1]; }));
      ms.forEach(function(m, i){ const b = el("i"); b.style.setProperty("--h", Math.max(8, m[1] / mx * 100) + "%"); b.style.setProperty("--d", (i * 35) + "ms"); b.title = m[0] + "  +" + m[1] + " %"; sp.appendChild(b); });
      box.appendChild(sp);
      const yr = el("div", "snyears"); yr.setAttribute("dir", "ltr"); yr.appendChild(el("span", null, ms[0][0].slice(0, 7))); yr.appendChild(el("span", null, ms[ms.length - 1][0].slice(0, 7))); box.appendChild(yr);
      box.appendChild(el("p", "iqnote", Q.live_cap));
    }
    if(Q.calc_t){
      box.appendChild(el("h3", "iqh", Q.calc_t));
      const cx = el("div", "sncalc");
      const r1 = el("div", "row"); r1.appendChild(el("span", null, Q.calc_l)); const v1 = el("b", "v1"); r1.appendChild(v1); cx.appendChild(r1);
      const sl = document.createElement("input"); sl.type = "range"; sl.min = "50"; sl.max = "2000"; sl.step = "50"; sl.value = String(SN_BELOP); sl.className = "cslide"; sl.setAttribute("aria-label", Q.calc_l); cx.appendChild(sl);
      const r2 = el("div", "row big"); r2.appendChild(el("span", null, Q.calc_trade)); const v2 = el("b", "v2"); r2.appendChild(v2); cx.appendChild(r2);
      const bar = el("div", "snbar"); const dep = el("i"); bar.appendChild(dep); cx.appendChild(bar);
      const nt = el("p", "iqnote"); cx.appendChild(nt);
      const fmt = function(v){ const t = "$" + Math.round(v).toLocaleString("en-US"); return lang === "no" ? t.replace(/,/g, " ") : t; };
      const upd = function(){ const d0 = +sl.value; v1.textContent = fmt(d0); v2.textContent = fmt(d0 * 24); dep.style.width = (100 / 24) + "%";
        nt.textContent = Q.calc_note.replace("{P}", lang === "no" ? "4,2 %" : "4.2%"); };
      sl.oninput = function(){ SN_BELOP = +sl.value; upd(); }; upd();
      box.appendChild(cx);
    }
    if(Q.split){
      box.appendChild(el("h3", "iqh", Q.split_t));
      const spl = el("div", "snsplit"); spl.setAttribute("dir", "ltr");
      Q.split.forEach(function(p, i){ const seg = el("div", i ? "fee" : "you"); seg.appendChild(el("b", null, p[1])); seg.appendChild(el("span", null, p[0])); spl.appendChild(seg); });
      box.appendChild(spl);
      box.appendChild(el("p", "iqnote", Q.split_note));
    }
    /* Live gull-chart (founder 22:51/22:58). Plassert ETTER 70/30, ikke midt i
       historikk -> ditt beloep -> fordeling: der var den et avbrudd i budskapet (NN/g K-111).
       TradingView (K-113), lastes foerst naar synlig. Til laering, aldri et signal. */
    /* #162: live gullgraf er tatt bort fra Sonic - et copy-trading-medlem trenger den ikke, og den
       inviterte til «bør jeg time dette selv?». Grafen ligger i Verktøy -> Markedstider. */
    /* #162 (founder 19.10 00:42): halal-forklaringen er flyttet fra Sonic til egen seksjon i Laer -
       paa produktsiden reiste den et spoersmaal mange ikke hadde. Se renderHalal(). */
    if(Q.steps){
      if(Q.steps_t) box.appendChild(el("h3", "iqh", Q.steps_t));
      const ol = el("ol", "iqsteps");
      Q.steps.forEach(function(st){ const li = el("li"); li.appendChild(el("h4", null, st[0])); li.appendChild(el("p", null, st[1])); ol.appendChild(li); });
      box.appendChild(ol);
    }
    if(Q.ex){
      if(Q.ex_t) box.appendChild(el("h3", "iqh", Q.ex_t));
      const ex = el("div", "iqex"); ex.appendChild(el("p", null, Q.ex)); box.appendChild(ex);
    }
    if(Q.tip) box.appendChild(el("p", "iqtip", Q.tip));
    if(det) det.querySelector("summary").textContent = Q.more;
  });
}
/* Verktoeykasse for ledere (B-034: «Leder skal kunne bruke den hvis de ikke vet noe eller
   sliter med noe som verktøykasse»). Snarveier til delene de bruker naar de forklarer. */
function renderLdKit(){
  const box = $("ld-kit"); if(!box) return;
  const L = C.leaders[lang] || C.leaders.en, K = L.kit;
  if(!K || PAGE !== "leaders"){ box.hidden = true; return; }
  box.hidden = false; box.textContent = "";
  const h = el("h3", "kh"); h.appendChild(el("span", null, "🧰 ")); h.appendChild(document.createTextNode(K.t)); box.appendChild(h);
  box.appendChild(el("p", "kl", K.lede));
  const mal = [["⚡", "./#earn"], ["🧭", "./#start"], ["🤝", "./#ib"], ["💬", "./#faq"], ["🕒", "./#hours"], ["🔑", "https://aitech.ibportal.io/"]];
  const g = el("div", "kg");
  K.items.forEach(function(it, i){
    const m = mal[i]; if(!m) return;
    const a = el("a", "kt"); a.href = m[1];
    if(/^https:/.test(m[1])){ a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.appendChild(el("span", "ki", m[0])); const tx = el("span", "kx"); tx.appendChild(el("b", null, it[0])); tx.appendChild(el("small", null, it[1])); a.appendChild(tx);
    g.appendChild(a);
  });
  /* #247 (founder 20.10 02:03): verktøykassen er det første på ledersiden; «Min side» (lenke, del, profil) – eller
     søknaden for den som ikke har lenke – er et kort inni den, sist, ikke det første man ser. */
  const B = C.ldbtn && (C.ldbtn[lang] || C.ldbtn.en), SP = C.sponsor && (C.sponsor[lang] || C.sponsor.en), meg = !!load("aimpire.me");
  if(K.mine_d && K.apply_d){
    const a = el("a", "kt ktmin"); a.href = "#t-leaders";
    a.onclick = function(ev){ ev.preventDefault(); const t = $("t-leaders"); if(t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 16, behavior: stilleBevegelse() ? "auto" : "smooth" }); };
    a.appendChild(el("span", "ki", meg ? "\uD83D\uDC64" : "\u2728"));
    const tx = el("span", "kx"); tx.appendChild(el("b", null, meg ? ((B && B.mine) || "") : ((SP && SP.own_link) || ""))); tx.appendChild(el("small", null, meg ? K.mine_d : K.apply_d)); a.appendChild(tx);
    g.appendChild(a);
  }
  box.appendChild(g);
}
function renderBonuses(){
  const B = C.bonuses && (C.bonuses[lang] || C.bonuses.en), sec = $("s-bonus"), host = $("bn-list");
  if(!B || !sec || !host){ if(sec) sec.hidden = true; return; }
  sec.hidden = false;
  $("bn-lede").textContent = B.lede;
  $("bn-note").textContent = B.note;
  host.textContent = "";
  B.items.forEach(function(it){
    const a = el("article");
    a.appendChild(el("h3", null, it[0]));
    [1, 2].forEach(function(i){
      const p = el("p"); p.appendChild(el("b", null, B.labels[i - 1])); p.appendChild(document.createTextNode(it[i])); a.appendChild(p);
    });
    host.appendChild(a);
  });
}
/* Uttak i tre deler, fra meglerens egne guider. Den midterste trengs bare
   foerste gang; det staar i tittelen, saa ingen gjoer den hver gang. */
function renderWithdraw(){
  const W = C.withdraw && (C.withdraw[lang] || C.withdraw.en), ol = $("wd-parts");
  if(!W || !ol) return;
  $("wd-lede").textContent = W.lede;
  ol.textContent = "";
  W.parts.forEach(function(pt){
    const li = el("li");
    li.appendChild(el("h3", null, pt[0]));
    li.appendChild(el("p", null, pt[1]));
    ol.appendChild(li);
  });
  $("wd-facts").textContent = W.facts;
}
/* Spoersmaal og svar. Soeket filtrerer paa spoersmaal OG svar, saa «uttak»
   finner «Kan jeg ta ut pengene mine?». Soeketeksten overlever spraakbytte. */
/* Emne-ikon til hvert spoersmaal, valgt fra det engelske spoersmaalet (samme paa alle spraak). */
function faqIkon(q){
  const t = String(q || "").toLowerCase();
  const R = [[/scam|fraud|safe|trust/, "\uD83D\uDEE1\uFE0F"], [/halal|islam/, "\uD83D\uDD4C"], [/password|support|hack|wallet/, "\uD83D\uDD12"],
    [/withdraw|take .*out|money out|payout/, "\uD83D\uDCB8"], [/deposit|put in|minimum|how much/, "\uD83D\uDCB5"], [/tax|statement/, "\uD83E\uDDFE"],
    [/cost|fee|commission/, "\uD83E\uDDFE"], [/lose|loss|risk|drawdown|close/, "\u26A0\uFE0F"], [/sonic|strategy|copy/, "\u26A1"],
    [/leader|sponsor|link|invite/, "\uD83D\uDD17"], [/account|register|sign|verify|id\b|kyc/, "\uD83E\uDEAA"], [/app|phone|mt5|metatrader/, "\uD83D\uDCF1"]];
  for(const r of R){ if(r[0].test(t)) return r[1]; }
  return "\uD83D\uDCAC";
}
function renderFaq(){
  const F = C.faq && (C.faq[lang] || C.faq.en), host = $("faq-list");
  if(!F || !host) return;
  $("faq-lede").textContent = F.lede;
  const q = $("faq-q"); q.placeholder = F.search; q.setAttribute("aria-label", F.search);
  host.textContent = "";
  const FE = (C.faq.en || F).items;
  F.items.forEach(function(it, k){
    const dt = el("details","qa");
    const sm = el("summary"); sm.appendChild(el("span", "qi", faqIkon((FE[k] || it)[0]))); sm.appendChild(el("span", "qq", it[0]));
    dt.appendChild(sm);
    dt.appendChild(el("p", null, it[1]));
    dt.id = "faq-" + host.childNodes.length;
    host.appendChild(dt);
  });
  const none = $("faq-none"); none.textContent = F.none;
  function filter(){
    const v = q.value.trim().toLowerCase(); let vis = 0;
    const rang = v ? soek(v).filter(function(h){ return h.e.cat === "faq"; }).map(function(h){ return h.e.id; }) : [];
    const treff = new Set(rang);
    /* Beste treff oeverst; uten soek: tilbake til opprinnelig rekkefoelge. */
    const alle = Array.from(host.querySelectorAll(".qa"));
    (v ? rang.map(function(id){ return $(id); }).filter(Boolean).concat(alle.filter(function(d){ return !treff.has(d.id); }))
       : alle.sort(function(a, b){ return Number(a.id.slice(4)) - Number(b.id.slice(4)); })).forEach(function(d){ host.appendChild(d); });
    host.querySelectorAll(".qa").forEach(function(dt){
      const hit = !v || treff.has(dt.id);
      dt.hidden = !hit; if(hit) vis++;
      dt.open = !!(v && hit);   /* funn A11 */
    });
    none.hidden = vis > 0;
  }
  q.oninput = filter; filter();
}
/* App-kortene bygges ett sted. I onboardingen (steg 6) uten bli-med-knappen:
   gruppa hoerer hjemme i siste steg, etter at appen er installert. */
function appCards(host, withJoin){
  const A = C.apps_page; if(!A || !host) return;
  const T = A[lang] || A.en;
  A.list.forEach(function(app){
    const card = el("div","appc");
    /* Samme ikon som i butikken, saa medlemmet kan se at det er den ekte
       appen. Navnet staar rett ved, derfor tom alt-tekst. */
    const head = el("div","ah");
    if(app.icon && sameOrigin(app.icon)){
      const im = el("img");
      im.loading = "lazy"; im.decoding = "async";
      im.src = app.icon; im.alt = ""; im.width = 48; im.height = 48;
      head.appendChild(im);
    }
    head.appendChild(el("h3", null, app.name));
    card.appendChild(head);
    card.appendChild(el("p", null, T[app.key] || ""));
    const row = el("div","apps");
    [["Android", app.android], ["iPhone", app.ios]].forEach(function(s){
      if(!safeUrl(s[1])) return;
      const a = el("a", null, s[0]);
      a.href = s[1]; a.target = "_blank"; a.rel = "noopener noreferrer";
      row.appendChild(a);
    });
    if(row.children.length) card.appendChild(row);
    /* Bli-med-knappen staar UNDER nedlastingen: lenka aapnes inne i appen,
       saa den virker foerst naar appen finnes. Samme lenke og samme navn
       som i steg 9. */
    if(withJoin && app.join && safeUrl(app.join) && T.join){
      card.appendChild(el("p","vnote", T.join_note));
      const j = el("a","joinbtn", T.join);
      j.href = app.join; j.target = "_blank"; j.rel = "noopener noreferrer";
      card.appendChild(j);
    }
    host.appendChild(card);
  });
}
function renderApps(){
  const A = C.apps_page, host = $("apps-list");
  if(!A || !host) return;
  const T = A[lang] || A.en;
  $("apps-lede").textContent = T.lede;
  host.textContent = "";
  appCards(host, true);
  $("apps-browser").textContent = T.browser;
  $("apps-warn").textContent = T.warn;
}

/* ---------- hovedmeny og visninger ---------- */
let view = "menu";
const CATS = ["start","tools","earn","learn","faq","ib","prod"];
/* Gamle lenker til #apps lander der appene bor naa. */
const ALIAS = { apps: "tools", calc: "earn", sonic: "earn", results: "earn", withdraw: "earn", chat: "start", hours: "tools", sizing: "tools", journal: "tools", toolkit: "tools" };
/* Menykort som hopper til en bestemt del av en fane. */
const JUMPTO = { calc: "s-calc", chat: "s-community" };

const MIKON = { earn: "\u26A1", start: "\uD83E\uDDED", tools: "\uD83E\uDDF0", learn: "\uD83C\uDF93", calc: "\uD83E\uDDEE", chat: "\uD83D\uDC65", faq: "\uD83D\uDCAC", ib: "\uD83E\uDD1D" };

/* Fanelinja (se CSS .tabbar). Fem plasser, som Instagram/iOS: flere blir for trangt paa
   375 px. Spoersmaal og IB naas fra Hjem og fra soeket. */
const TBIKON = {
  menu:  '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h5v-5.5h4V20h5V9.5"/>',
  start: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  prod:  '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><path d="M17 13.5v7M13.5 17h7"/>',
  learn: '<path d="M2 8.5 12 4l10 4.5-10 4.5z"/><path d="M6 10.5V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-5.5"/>',
  tools: '<path d="M3 17l5-5 4 4 8-9"/><path d="M15 7h5v5"/>',
  leader:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  more:  '<circle cx="5.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18.5" cy="12" r="1.3"/>'
};
/* Founder 17.10 22:24: fanen er «Produkter», ikke «Sonic» - Sonic er bare det foerste. */
/* Founder 17.10 22:55 + Hoober (K-114): midten naas raskest og mest presist -> Hjem i midten,
   som hevet merkeknapp. */
/* #194 (founder 19.10 05:57 «flere knapper i menyen nede»): sjette plass «Mer» aapner et ark med snarveier.
   Sju plasser ble maalt for trangt (19.10: «Produkter»/«Kalkulator» 52-54 px mot 42-47 px per plass paa 320-360 px). */
/* #196 (founder 06:07 «hva skjer med symmetrien» + «hjem-knappen fram igjen»): sju plasser, Hjem i midten.
   Lederknappen flyttet fra toppen hit (toppen: logo til venstre, soek + spraak til hoeyre). Etikettene krympes
   likt til de passer (tbTilpass), aldri under 8.5 px. */
const TBREKKE = ["start", "prod", "learn", "menu", "tools", "leader", "more"];
let tbLang = null;
/* Myk scroll til toppen, med hopp som reserve: i noen nettlesere/visninger beveger
   window.scrollTo({behavior:"smooth"}) seg ikke (maalt 17.10 i testpanelet). */
function tilToppen(){
  if(stilleBevegelse()){ window.scrollTo(0, 0); return; }
  try{ window.scrollTo({ top: 0, behavior: "smooth" }); }catch(e){ window.scrollTo(0, 0); }
  const y0 = scrollY;
  setTimeout(function(){ if(scrollY > 0 && scrollY >= y0 - 2) window.scrollTo(0, 0); tbScroll(); }, 700);
}
const TBPOS = {};
/* Fanenavnene i content.json staar i rekkefoelgen Hjem, Start, Produkter, Laer, Verktoey. */
const TBREKKE_TEKST = { menu: 0, start: 1, prod: 2, learn: 3, tools: 4 };
function renderTabbar(){
  const bar = $("tabbar"), row = $("tbrow");
  if(!bar || !row) return;
  const M = C.menu && (C.menu[lang] || C.menu.en);
  if(!M || !M.tabs){ bar.hidden = true; document.body.classList.remove("has-tabbar"); return; }
  bar.hidden = false; document.body.classList.add("has-tabbar");
  if(tbLang !== lang){
    tbLang = lang; row.textContent = "";
    TBREKKE.forEach(function(cat, n){
      const b = el("button", "tbb"); b.type = "button"; b.setAttribute("data-cat", cat);
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        (n === 0 ? '<defs><linearGradient id="tbgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#15D8C4"/><stop offset="1" stop-color="#C21FBF"/></linearGradient></defs>' : "") +
        TBIKON[cat] + '</svg>';
      if(cat === "menu"){ b.classList.add("tbhome"); const r = el("i", "tbring"); const im = document.createElement("img"); im.src = "assets/ap-gradient-96.png"; im.alt = ""; im.width = 26; im.height = 26; r.appendChild(im); b.insertBefore(r, b.firstChild); }
      b.appendChild(el("span", null, cat === "more" ? (M.more || "More") : cat === "leader" ? "" : (M.tabs[TBREKKE_TEKST[cat]] || cat)));
      if(cat === "leader"){ b.id = "tb-leader"; b.onclick = function(){ if(PAGE === "leaders"){ tilToppen(); return; } location.href = "ledere.html"; }; row.appendChild(b); return; }
      if(cat === "more"){ b.id = "tb-more"; b.setAttribute("aria-haspopup", "dialog"); b.setAttribute("aria-expanded", "false"); b.onclick = merArk; row.appendChild(b); return; }
      b.onclick = function(){
        /* #178: ledersiden har ogsaa menyen - et trykk gaar til samme mappe paa medlemssiden (med ?l= og spraak). */
        /* #192 (founder 05:12): fra ledersiden til appen med riktig kode - lederens EGEN kode paa egen telefon,
           ellers lederen man kom fra. Uten kode havnet man paa den universelle lenken. */
        if(PAGE === "leaders"){ const kd = load("aimpire.me") || load("aimpire.leader") || new URLSearchParams(location.search).get("l") || "";
          const qs = new URLSearchParams(); if(kd) qs.set("l", kd); qs.set("lang", lang);
          location.href = "index.html?" + qs.toString() + (cat === "menu" ? "" : "#" + cat); return; }
        if(view === cat){ tilToppen(); return; }
        /* Apple HIG, Tab bars: fanene bevarer «the current navigation state within each
           section» - man kommer tilbake dit man var, ikke til toppen. */
        TBPOS[view] = scrollY;
        if(TABS[cat] && !(cat in TBPOS)) tab = TABS[cat][0];
        setView(cat);
        const y = TBPOS[cat];
        if(y) setTimeout(function(){ window.scrollTo(0, Math.min(y, document.documentElement.scrollHeight - innerHeight)); tbScroll(); }, 30);
      };
      row.appendChild(b);
    });
  }
  /* Aktiv fane + prikk paa Kom i gang til alle stegene er gjort. */
  const gjort = doneSet().size, alle = (C.guide[lang] || C.guide.en).steps.length;
  row.querySelectorAll(".tbb").forEach(function(b){
    const cat = b.getAttribute("data-cat");
    if(cat === "more") return;
    if(cat === "leader"){ const LB = C.ldbtn && (C.ldbtn[lang] || C.ldbtn.en), sp = b.querySelector("span");
      if(LB && sp){ const t = load("aimpire.me") ? LB.mine : LB.other; if(sp.textContent !== t){ sp.textContent = t; b.setAttribute("aria-label", t); } }
      if(PAGE === "leaders") b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
      return; }
    const aktiv = PAGE !== "leaders" && (cat === view || (cat === "prod" && view === "earn"));   /* Sonic bor under Produkter */
    if(aktiv) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    let d = b.querySelector(".dot");
    const vis = cat === "start" && gjort > 0 && gjort < alle && view !== "start";   /* «du har et steg som venter» - ikke en evig prikk */
    if(vis && !d){ d = el("i", "dot"); d.setAttribute("aria-hidden", "true"); b.appendChild(d); }
    if(!vis && d) d.remove();
  });
  /* Maal sidehoeyden etter at nettleseren har tegnet - ikke midt i byttet (tvungen layout
     kostet 80-320 ms per mappebytte paa treg CPU, founder 18.10 01:15 «appen lagger»). */
  /* #204: maalingen etter at bildet er tegnet (rAF -> setTimeout). Inne i rAF tvang den fram hele sideoppsettet (300 ms paa
     billig Android) foer nettleseren rakk aa gjoere det selv; etterpaa er oppsettet allerede gjort. */
  requestAnimationFrame(function(){ setTimeout(function(){ tbScroll(); tbTilpass(); }, 0); });
}
/* Samme skriftstoerrelse paa alle etikettene: krymp i halve piksler til den lengste passer. */
function tbTilpass(){
  const row = $("tbrow"); if(!row || !row.offsetWidth) return;
  const sp = row.querySelectorAll(".tbb span"); if(!sp.length) return;
  /* #204: kalles ved tegning, naar fontene er klare og etter load - samme bredde, spraak, fonter og etiketter = samme svar */
  let noekkel = row.clientWidth + "|" + lang + "|" + ((document.fonts && document.fonts.status) || "") + "|"; sp.forEach(function(x){ noekkel += x.textContent + ";"; });
  if(tbTilpass.sist === noekkel) return; tbTilpass.sist = noekkel;
  /* #204 (maalt 19.10, CPU x6): aa maale etikettene i DOM-en rett etter tegningen tvang fram to fulle sideoppsett = 240 ms.
     Canvas maaler teksten med samme skrift uten noe sideoppsett (< 5 ms). Liten margin for avrunding og letter-spacing. */
  try{
    const cv = tbTilpass.cv || (tbTilpass.cv = document.createElement("canvas")), cx = cv.getContext("2d");
    const cs = getComputedStyle(sp[0]), fam = cs.fontFamily, vekt = cs.fontWeight || "600";
    const plass = row.clientWidth / sp.length - 3;   /* like brede knapper; 3 px slingring (padding 0, letter-spacing -.01em) */
    let m = 0; cx.font = vekt + " 11px " + fam;
    sp.forEach(function(x){ const b = cx.measureText(x.textContent).width + 1; if(b / plass > m) m = b / plass; });
    const fs = m > 1 ? Math.max(8.5, Math.floor(11 / m * 2) / 2) : 11;
    row.style.setProperty("--tbfs", fs + "px");
  }catch(e){ row.style.setProperty("--tbfs", "10px"); }
}
window.addEventListener("resize", function(){ clearTimeout(window.__tbT); window.__tbT = setTimeout(tbTilpass, 150); });
/* #210: maalingen skjedde foer webfonten var lastet - etiketten ble bredere etterpaa («Produkt…» paa 360 px). Maal igjen naar fontene er klare. */
try{ if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ try{ tbTilpass(); }catch(e){} }); }catch(e){}
window.addEventListener("load", function(){ setTimeout(function(){ try{ tbTilpass(); }catch(e){} }, 400); });   /* ledersiden: linja var skjult (bredde 0) ved foerste maaling */

/* Produktsiden (founder 17.10 22:24): Aimpires verktoey samlet. Sonic er det foerste;
   «Mer paa vei» navngir ingenting som ikke er bestemt. */
/* #194 «Mer»-arket: det som ikke faar egen fane, ett trykk unna. Lukkes med bakgrunn, Esc, Mer igjen eller et valg. */
function merArk(){
  let ark = $("mersheet");
  if(ark && !ark.hidden){ lukkMerArk(); return; }
  const M = C.menu && (C.menu[lang] || C.menu.en); if(!M) return;
  const tittel = function(k){ const it = (M.items || []).find(function(x){ return x[0] === k; }); return it ? it[1] : k; };
  const tilApp = function(hash){ const kd = load("aimpire.me") || load("aimpire.leader") || new URLSearchParams(location.search).get("l") || "";
    const qs = new URLSearchParams(); if(kd) qs.set("l", kd); qs.set("lang", lang); location.href = "index.html?" + qs.toString() + "#" + hash; };
  const B = C.ldbtn && (C.ldbtn[lang] || C.ldbtn.en), MK = C.market && (C.market[lang] || C.market.en), TU = C.tour && C.tour[lang] && C.tour[lang].ui;
  const valg = [
    ["calc", MIKON.calc, tittel("calc"), function(){ if(PAGE === "leaders") return tilApp("calc"); location.hash = "#calc"; }],
    ["market", "📈", MK && MK.title, function(){ if(PAGE === "leaders") return tilApp("tools"); aapneMarked(); }],
    ["growth", "\uD83D\uDCCA", C.growth && (C.growth[lang] || C.growth.en).more, function(){ if(PAGE === "leaders") return tilApp("tools"); tab = "journal"; setView("tools"); setTimeout(function(){ const g = $("s-growth"); if(g) g.scrollIntoView({ block: "start" }); }, 80); }],
    ["faq", MIKON.faq, tittel("faq"), function(){ if(PAGE === "leaders") return tilApp("faq"); setView("faq"); }],
    ["chat", MIKON.chat, tittel("chat"), function(){ if(PAGE === "leaders") return tilApp("chat"); location.hash = "#chat"; }],
    ["ib", MIKON.ib, tittel("ib"), function(){ if(PAGE === "leaders") return tilApp("ib"); setView("ib"); }],
    ["tour", "🧭", PAGE !== "leaders" && TU && TU.replay, function(){ try{ tourAapne(false); }catch(e){} }]
  ].filter(function(v){ return v[2]; });
  if(!ark){
    ark = el("div", "mersheet"); ark.id = "mersheet";
    const bg = el("div", "msbg"); bg.onclick = lukkMerArk; ark.appendChild(bg);
    const pn = el("div", "mspanel"); pn.setAttribute("role", "dialog"); pn.setAttribute("aria-modal", "true"); pn.id = "mspanel";
    ark.appendChild(pn); document.body.appendChild(ark);
    document.addEventListener("keydown", function(e){ if(e.key === "Escape" && !ark.hidden) lukkMerArk(); });
  }
  const pn = $("mspanel"); pn.textContent = ""; pn.setAttribute("aria-label", M.more || "More");
  /* #195 (founder 19.10 06:03 «lys og moerk synlig et sted saa folk kan bytte enkelt»): todelt bryter oeverst i arket.
     Arket blir staaende, saa man ser byttet med en gang. */
  const TA = C.theme_ask && (C.theme_ask[lang] || C.theme_ask.en);
  if(TA){
    const sg = el("div", "mstema"); sg.setAttribute("role", "group"); sg.setAttribute("aria-label", TA.title || "");
    const tegn = function(){ const naa = document.documentElement.getAttribute("data-theme") || "dark";
      sg.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", String(x.getAttribute("data-t") === naa)); }); };
    [["light", "\u2600\uFE0F", TA.light], ["dark", "\uD83C\uDF19", TA.dark]].forEach(function(t){
      const tb = el("button", null, t[1] + " " + t[2]); tb.type = "button"; tb.setAttribute("data-t", t[0]);
      tb.onclick = function(){ if((document.documentElement.getAttribute("data-theme") || "dark") !== t[0]){ try{ toggleTheme(); }catch(e){} } tegn(); };
      sg.appendChild(tb);
    });
    tegn(); pn.appendChild(sg);
  }
  const gr = el("div", "msgrid");
  valg.forEach(function(v){
    const b = el("button", "msb"); b.type = "button"; b.setAttribute("data-k", v[0]);
    b.appendChild(el("span", "msi", v[1])); b.appendChild(el("span", "mst", v[2]));
    b.onclick = function(){ lukkMerArk(); v[3](); };
    gr.appendChild(b);
  });
  pn.appendChild(gr);
  ark.hidden = false; document.body.classList.add("ms-open");
  const mb = $("tb-more"); if(mb){ mb.setAttribute("aria-expanded", "true"); mb.setAttribute("aria-current", "true"); }
  requestAnimationFrame(function(){ ark.classList.add("vis"); const f = pn.querySelector(".msb"); if(f) f.focus({ preventScroll: true }); });
}
function lukkMerArk(){
  const ark = $("mersheet"); if(!ark || ark.hidden) return;
  ark.classList.remove("vis"); ark.hidden = true; document.body.classList.remove("ms-open");
  const mb = $("tb-more"); if(mb){ mb.setAttribute("aria-expanded", "false"); mb.removeAttribute("aria-current"); }
}
function renderProducts(){
  let pv = $("prodview");
  const P = C.products && (C.products[lang] || C.products.en);
  if(!pv){ const bk = $("vhead") || $("topbar"); if(!bk) return; pv = el("section", "prodview"); pv.id = "prodview"; bk.after(pv); }
  pv.hidden = view !== "prod" || !P;
  if(pv.hidden) return;
  pv.textContent = "";
  const hd = el("div", "vhead"); hd.setAttribute("data-cat", "prod");
  leggSpark(hd);
  hd.appendChild(el("span", "vic", "\u2728"));
  const tx = el("div", "vtx"); tx.appendChild(el("b", null, P.title)); tx.appendChild(el("span", null, P.lede)); hd.appendChild(tx);
  pv.appendChild(hd);
  const grid = el("div", "pgrid");
  P.items.forEach(function(it){
    const b = el("button", "pcard"); b.type = "button";
    leggSpark(b);
    const top = el("span", "ptop");
    top.appendChild(el("span", "mic", MIKON[it.cat] || "\u2022"));
    const live = el("span", "plive"); live.appendChild(el("i")); live.appendChild(document.createTextNode(it.badge)); top.appendChild(live);
    b.appendChild(top);
    b.appendChild(el("b", "pt", it.name));
    b.appendChild(el("span", "pd", it.desc));
    /* #155: det en ny bruker trenger for aa bestemme seg - minstebeloep, honorar og at alt kan tapes. */
    if(it.facts){ const fx = el("span", "pfacts"); it.facts.forEach(function(f, i){ fx.appendChild(el("span", i === it.facts.length - 1 ? "pf warnf" : "pf", f)); }); b.appendChild(fx); }
    b.appendChild(el("span", "pm", it.cta));
    b.onclick = function(){ if(TABS[it.cat]) tab = TABS[it.cat][0]; setView(it.cat); };
    grid.appendChild(b);
  });
  const mer = el("div", "pcard pmore");
  mer.appendChild(el("span", "mic", "\uD83D\uDE80"));
  mer.appendChild(el("b", "pt", P.more_t)); mer.appendChild(el("span", "pd", P.more_d));
  grid.appendChild(mer);
  pv.appendChild(grid);
}

/* ---- Ticker (se CSS .tape2) ---- */
const KURS_SYM = ["XAU", "XAG", "BTC", "ETH"];
/* #213 B1: vide grenser (ca. 1/5 til 5 x kursen 19.10.2026) - fanger tull fra kilden, ikke vanlige bevegelser */
const KURS_SPENN = { XAU: [800, 20000], XAG: [10, 300], BTC: [15000, 400000], ETH: [400, 12000] };
const KURS = {};
function metallStengt(){
  /* Forex/metaller: stengt fra fredag kveld til soendag kveld. Bevisst smalt vindu
     (fre >= 22, hele loerdag, soen < 21 UTC) saa «stengt» alltid er sant. */
  const d = new Date(), w = d.getUTCDay(), h = d.getUTCHours();
  return w === 6 || (w === 5 && h >= 22) || (w === 0 && h < 21);
}
function kursFmt(sym, v){
  const des = sym === "BTC" ? 0 : 2;
  try{ return v.toLocaleString("en-US", { minimumFractionDigits: des, maximumFractionDigits: des }); }catch(e){ return String(v); }
}
/* #149 (founder 18.10 15:59): nyhetene har EGEN rad under kursene - ikke i samme banner. Hver nyhet
   viser alvorlighet (Forex Factory: High/Medium, K-28) og hvilke par den mest sannsynlig rører:
   valutaen mot USD, og gull for USD-nyheter. #182: raden ruller som kursbaandet og stopper ved beroering. */
const NYH_PAR = { USD: ["EURUSD", "XAUUSD", "USDJPY"], EUR: ["EURUSD", "EURGBP"], GBP: ["GBPUSD", "EURGBP"], JPY: ["USDJPY"],
  CAD: ["USDCAD"], AUD: ["AUDUSD"], NZD: ["NZDUSD"], CHF: ["USDCHF"], CNY: ["AUDUSD", "XAUUSD"], ALL: ["XAUUSD"] };
function radarVis(){
  const box = $("nradar"), trk = $("nradar-trk"); if(!box || !trk) return;
  if(typeof NYHET === "undefined" || !Array.isArray(NYHET.liste)){ box.hidden = true; return; }
  const T = C.tape && (C.tape[lang] || C.tape.en) || {};
  const nu = Date.now(), tag = lang === "no" ? "nb" : (baseOf(lang) === "ar" ? "ar-u-nu-latn" : baseOf(lang) === "ur" ? "ur-u-nu-latn" : baseOf(lang));
  const liste = NYHET.liste.map(function(n){ return { n: n, d: new Date(n.d), i: n.i || "H" }; })
    .filter(function(x){ return x.d.getTime() > nu - 10 * 60000 && x.n.t && x.n.c; })
    .sort(function(a, b){ return (a.d - b.d) || (a.i === "H" ? -1 : 1); })
    .filter(function(x, k, arr){ return !arr.slice(0, k).some(function(y){ return y.n.c === x.n.c && +y.d === +x.d; }); })
    .slice(0, 8);
  if(!liste.length){ box.hidden = true; return; }
  /* #185: ett kort, ikke et rullende baand. Viser de kommende nyhetene én om gangen (store foerst i tid),
     med nedtelling i nettleserens eget spraak, og skifter rolig hvert 5. sekund. Trykk = nyhetens egen side;
     «›» til hoeyre = hele lista i Verktøy. Staar stille naar man roerer den. */
  trk.textContent = ""; box.classList.remove("rull"); box.classList.add("kort");
  const kommende = liste.filter(function(x){ return x.d.getTime() > nu - 5 * 60000; }).slice(0, 6);
  const vis = kommende.length ? kommende : liste.slice(0, 1);
  const rtf = (function(){ try{ return new Intl.RelativeTimeFormat(tag, { numeric: "auto", style: "short" }); }catch(e){ return null; } })();
  const naar = function(d){ const min = Math.round((d.getTime() - Date.now()) / 60000); if(!rtf) return "";
    return Math.abs(min) < 60 ? rtf.format(min, "minute") : Math.abs(min) < 48 * 60 ? rtf.format(Math.round(min / 60), "hour") : rtf.format(Math.round(min / 1440), "day"); };
  const ffUrl = function(x){ return typeof x.n.u === "string" && /^https:\/\/www\.forexfactory\.com\/calendar\/[0-9]+-[a-z0-9-]+$/.test(x.n.u) ? x.n.u
    : "https://www.forexfactory.com/calendar?day=" + ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"][x.d.getMonth()] + x.d.getDate() + "." + x.d.getFullYear(); };
  const lab = el("span", "nrlab", "\uD83D\uDCC5"); lab.setAttribute("aria-hidden", "true"); trk.appendChild(lab);
  const kort = el("a", "nrk"); kort.target = "_blank"; kort.rel = "noopener noreferrer"; kort.setAttribute("aria-live", "polite"); trk.appendChild(kort);
  const alle = el("button", "nrall", "\u203A"); alle.type = "button"; alle.setAttribute("aria-label", T.news || "News"); alle.onclick = function(){ aapneMarked(); }; trk.appendChild(alle);
  let i = 0;
  const tegn = function(){
    const x = vis[i % vis.length]; if(!x) return;
    kort.href = ffUrl(x); kort.className = "nrk " + (x.i === "H" ? "hi" : "mid");
    kort.textContent = "";
    const imp = el("span", "imp"); imp.setAttribute("role", "img"); imp.setAttribute("aria-label", x.i === "H" ? (T.imp_hi || "High impact") : (T.imp_mid || "Medium impact")); kort.appendChild(imp);
    const l1 = el("span", "l1"); l1.appendChild(el("b", null, String(x.n.c).slice(0, 4))); l1.appendChild(el("span", "tt", String(x.n.t))); kort.appendChild(l1);
    const l2 = el("span", "l2"); l2.appendChild(el("span", "when", naar(x.d)));
    const par = NYH_PAR[x.n.c]; if(par) l2.appendChild(el("span", "par", "\u2192 " + par.join(" ")));
    kort.appendChild(l2);
    kort.classList.remove("inn"); void kort.offsetWidth; kort.classList.add("inn");
  };
  tegn();
  clearInterval(window.__nrTimer);
  if(vis.length > 1) window.__nrTimer = setInterval(function(){ if(document.hidden || box.classList.contains("pause")) return; i++; tegn(); }, 5000);
  if(!box.dataset.pauseKoblet){ box.dataset.pauseKoblet = "1"; let t = 0;
    const stopp = function(){ clearTimeout(t); box.classList.add("pause"); };
    const fortsett = function(){ clearTimeout(t); t = setTimeout(function(){ box.classList.remove("pause"); }, 3000); };
    box.addEventListener("pointerdown", stopp, { passive: true }); box.addEventListener("pointerup", fortsett, { passive: true });
    box.addEventListener("pointercancel", fortsett, { passive: true }); box.addEventListener("pointerleave", fortsett, { passive: true }); }
  box.hidden = false;
}
/* #184: full visning i Verktøy -> Markedstider. Samme data som baandene (KURS fra gold-api.com,
   NYHET fra kalenderjobben), saa ingen nye kall. Nedtellingen bruker nettleserens egen sprakform
   (Intl.RelativeTimeFormat), og tider vises i telefonens tid. */
let MK_TIMER = 0;
function markedVis(){
  const sec = $("s-market"), M = C.market && (C.market[lang] || C.market.en); if(!sec || !M) return;
  sec.hidden = false;
  const T = C.tape && (C.tape[lang] || C.tape.en) || {};
  $("mkt-t").textContent = M.title; $("mkt-lede").textContent = M.lede; $("mkt-pt").textContent = M.prices; $("mkt-nt").textContent = M.news; $("mkt-src").textContent = M.src;
  const tag = lang === "no" ? "nb" : (baseOf(lang) === "ar" ? "ar-u-nu-latn" : baseOf(lang) === "ur" ? "ur-u-nu-latn" : baseOf(lang));
  /* Kurser */
  const px = $("mkt-px"); px.textContent = ""; const stengt = metallStengt();
  KURS_SYM.forEach(function(k){
    const q = KURS[k]; const kort = el("div", "mkk" + (q && q.r ? " " + q.r : ""));
    kort.appendChild(el("b", null, k === "XAU" ? "XAUUSD" : k === "XAG" ? "XAGUSD" : k + "USD"));
    kort.appendChild(el("span", "v", q ? kursFmt(k, q.p) : "\u2014"));
    const metall = k === "XAU" || k === "XAG";
    if(metall && stengt) kort.appendChild(el("span", "st", T.closed || "closed"));
    else if(q && q.r) kort.appendChild(el("span", "a", q.r === "opp" ? "\u25B2" : "\u25BC"));
    px.appendChild(kort);
  });
  /* Nyheter */
  const box = $("mkt-news"), nx = $("mkt-next"); box.textContent = ""; nx.hidden = true;
  if(typeof NYHET === "undefined" || !Array.isArray(NYHET.liste)) return;
  const nu = Date.now();
  const liste = NYHET.liste.map(function(n){ return { n: n, d: new Date(n.d), i: n.i || "H" }; })
    .filter(function(x){ return x.n.t && x.n.c && !isNaN(x.d) && x.d.getTime() > nu - 6 * 3600e3; })
    .sort(function(a, b){ return a.d - b.d; });
  const ffUrl = function(x){ return typeof x.n.u === "string" && /^https:\/\/www\.forexfactory\.com\/calendar\/[0-9]+-[a-z0-9-]+$/.test(x.n.u) ? x.n.u
    : "https://www.forexfactory.com/calendar?day=" + ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"][x.d.getMonth()] + x.d.getDate() + "." + x.d.getFullYear(); };
  const lenke = function(a, x){ a.href = ffUrl(x); a.target = "_blank"; a.rel = "noopener noreferrer"; };
  const neste = liste.find(function(x){ return x.i === "H" && x.d.getTime() > nu; });
  if(neste){
    let om = ""; try{ const min = Math.round((neste.d.getTime() - nu) / 60000), rtf = new Intl.RelativeTimeFormat(tag, { numeric: "auto" });
      om = min < 60 ? rtf.format(min, "minute") : min < 48 * 60 ? rtf.format(Math.round(min / 60), "hour") : rtf.format(Math.round(min / 1440), "day"); }catch(e){}
    const a = el("a", "mknext"); lenke(a, neste);
    a.appendChild(el("small", null, "\uD83D\uDD34 " + M.next));
    a.appendChild(el("strong", null, "\u2066" + neste.n.c + " " + neste.n.t + "\u2069"));
    const par = NYH_PAR[neste.n.c]; a.appendChild(el("span", null, om + (par ? " \u00b7 \u2192 " + par.join(" ") : "")));
    nx.textContent = ""; nx.appendChild(a); nx.hidden = false; nx.className = ""; a.className = "mknext";
  }
  /* #212 (founder «nyhetsfeeden er veldig laaaang»): 15 av 20 nyheter er middels (fredag alene 11 PMI-er).
     Standard: bare store (roede). Én bryter med antall slaar paa de middels. Passerte nyheter (> 30 min) tas ut -
     feeden har ikke faktiske tall, saa en passert rad sier ingenting nytt. Bare eksisterende tekster (imp_hi/imp_mid). */
  const fersk = liste.filter(function(x){ return x.d.getTime() > nu - 30 * 60000; });
  const nMid = fersk.filter(function(x){ return x.i !== "H"; }).length, nHi = fersk.length - nMid;
  const visMid = load("aimpire.news.mid") === "1";
  /* Founder 19.10: hele ukeslista ligger bak én linje med antall; lukket til man aapner den, og valget huskes. */
  const alle = $("mkt-alle"), tell = $("mkt-tell");
  if(tell) tell.textContent = fersk.length ? "\uD83D\uDD34 " + nHi + (nMid ? " \u00b7 \uD83D\uDFE0 " + nMid : "") : "";
  if(alle && !alle._lytt){ alle._lytt = true; alle.open = load("aimpire.news.open") === "1";
    alle.addEventListener("toggle", function(){ store("aimpire.news.open", alle.open ? "1" : "0"); }); }
  if(nMid){ const br = el("button", "mkmid", "\uD83D\uDFE0 " + (T.imp_mid || "Medium impact") + " (" + nMid + ")"); br.type = "button";
    br.setAttribute("aria-pressed", String(visMid)); br.onclick = function(){ store("aimpire.news.mid", visMid ? "0" : "1"); markedVis(); }; box.appendChild(br); }
  const vist = fersk.filter(function(x){ return visMid || x.i === "H"; });
  if(!vist.some(function(x){ return x.d.getTime() > nu; })){ box.appendChild(el("p", "vnote", M.none)); }
  /* #206: hele uka var ~30 rader foran markedsklokka. Naa én sammenleggbar blokk per dag (dagnavnet paa
     telefonens spraak + antall); bare foerste dag med kommende nyheter er aapen. Ingen ny tekst trengs. */
  let dag = "", kropp = box, aapnet = false;
  const perDag = {}; vist.forEach(function(x){ let dg; try{ dg = x.d.toLocaleDateString(tag, { weekday: "long", day: "numeric", month: "short" }); }catch(e){ dg = x.d.toDateString(); } x.dg = dg; perDag[dg] = (perDag[dg] || 0) + 1; });
  vist.forEach(function(x){
    const dg = x.dg;
    if(dg !== dag){ dag = dg; const det = document.createElement("details"); det.className = "mkdet";
      const sm = el("summary", "mkdag", dg.charAt(0).toUpperCase() + dg.slice(1) + " (" + perDag[dg] + ")");   /* ::first-letter virker ikke paa flex */ det.appendChild(sm); box.appendChild(det); kropp = det;
      if(!aapnet && vist.some(function(y){ return y.dg === dg && y.d.getTime() >= nu; })){ det.open = true; aapnet = true; } }
    const a = el("a", "mkrow " + (x.i === "H" ? "hi" : "mid") + (x.d.getTime() < nu ? " forbi" : "")); lenke(a, x);
    let tid; try{ tid = x.d.toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit", hour12: false }); }catch(e){ tid = ""; }
    a.appendChild(el("span", "tid", tid));
    /* RTL (ur/ar): tittel og tall er engelske/latinske - isoleres saa «CAD CPI» og «0.2%» ikke snus eller limes sammen */
    const tt = el("span", "tt"); const b = el("b"); b.appendChild(el("i", null, x.n.c)); b.appendChild(document.createTextNode("\u2066" + x.n.t + "\u2069")); tt.appendChild(b);
    const sm = el("small"); const deler = []; const L = function(v){ return "\u2066" + v + "\u2069"; };
    if(x.n.f) deler.push(M.fc + " " + L(x.n.f)); if(x.n.p) deler.push(M.prev + " " + L(x.n.p));
    sm.appendChild(document.createTextNode(deler.join(" \u00b7 ")));
    const par = NYH_PAR[x.n.c]; if(par){ if(deler.length) sm.appendChild(document.createTextNode(" \u00b7 ")); sm.appendChild(el("span", "par", "\u2192 " + par.join(" "))); }
    tt.appendChild(sm); a.appendChild(tt);
    const go = el("span", "go", "\u203A"); go.setAttribute("aria-hidden", "true"); a.appendChild(go);
    kropp.appendChild(a);
  });
  clearTimeout(MK_TIMER); MK_TIMER = setTimeout(function(){ if(view === "tools") try{ markedVis(); }catch(e){} }, 60000);
}
/* #186 (founder 19.10 04:42): app-guide for alle (20-60 aar). Foerste gang aapnes den av seg selv; #200: kan alltid hoppes over.
   Andre gang og hver 10. gang: kan hoppes over. Telles per oekt (ett besoek = én gang), lagres paa telefonen.
   Hvert steg peker paa det EKTE elementet; finnes det ikke (f.eks. ingen leder), hoppes steget over. */
/* #188 (founder 19.10 04:50 «ta dem med paa reisen som en ekte vert, med piler og effekter … det maa vaere en
   opplevelse»): turen GAAR gjennom appen - Hjem, Start, Produkter, Sonic-kalkulatoren, Verktøy, Lær - og
   peker med en hoppende pil paa det ekte elementet. Vertskortet har Aimpire-merket, ringen pulserer, og turen
   ender med en liten feiring. Steg uten element (f.eks. ingen leder) hoppes over. */
const TOUR_STEG = [
  { k: "welcome", vis: "menu", m: null },
  { k: "leader", vis: "menu", m: function(){ const a = $("spon"), b = $("notice-none"); return (a && !a.hidden && a.offsetParent) ? a : (b && !b.hidden && b.offsetParent ? b : null); }, krev: true },
  { k: "own", vis: "menu", m: function(){ const x = document.querySelector('#spon a[href="ledere.html"], #notice-none a[href="ledere.html"], a.owncta'); return x && x.offsetParent ? x : null; }, krev: true },
  { k: "menu", vis: "menu", m: function(){ return document.querySelector(".tabbar:not([hidden])"); } },
  { k: "start", vis: "start", m: function(){ return document.querySelector("#guide li.current") || $("s-guide"); } },
  { k: "prod", vis: "prod", m: function(){ return document.querySelector("#prodview .pcard") || $("prodview"); } },
  { k: "calc", vis: "earn", tab: "calc", m: function(){ const s0 = $("s-calc"); return s0 && (s0.querySelector(".calc") || s0); } },
  /* #188 (founder 04:56 «ta dem ordentlig igjennom kalkulatoren der de trykker selv»): «lek» = ringen er et hull
     man kan trykke gjennom; resten av skjermen er sperret, saa man ikke gaar seg vill. */
  { k: "c1", vis: "earn", tab: "calc", lek: true, m: function(){ return document.querySelector("#s-calc .calc"); } },
  { k: "c2", vis: "earn", tab: "calc", lek: true, m: function(){ return $("cc-per"); } },
  { k: "c3", vis: "earn", tab: "calc", m: function(){ return [$("cc-total"), $("cc-delta"), $("cc-total-l")]; } },
  { k: "c4", vis: "earn", tab: "calc", m: function(){ return $("cc-chart"); } },
  { k: "c5", vis: "earn", tab: "calc", m: function(){ return $("cc-stats"); } },
  { k: "c6", vis: "earn", tab: "calc", lek: true, m: function(){ const d = $("shd-s-calc"); return d ? d.querySelector("summary") || d : null; }, krev: true },
  { k: "tools", vis: "tools", tab: "hours", m: function(){ return $("s-market") && !$("s-market").hidden ? $("s-market") : $("s-sessions"); } },
  { k: "learn", vis: "learn", m: function(){ return $("s-learn"); } },
  { k: "more", vis: "menu", m: function(){ return $("tb-more"); } },   /* #198: Mer-knappen (#194) */
  { k: "top", vis: "menu", m: function(){ const a = $("q-open"), b = $("switch"); return [a, b]; } },
  /* #189 (founder 05:02): siste steg = ansvarsfraskrivelse i roedt; «lest og forstått» kan hukes av foerst etter 3 s */
  { k: "risk", vis: "menu", m: null, risk: true },
  { k: "done", vis: "menu", m: null }
];
function tourAapne(tvungen){
  const G = C.tour && (C.tour[lang] || C.tour.en); if(!G || PAGE === "leaders" || $("tour")) return;
  const tilbakeTil = view;
  const ga = function(st){ if(st.tab && TABS[st.vis]) tab = st.tab; if(view !== st.vis){ try{ setView(st.vis); }catch(e){} } else if(st.tab){ try{ applyView(); }catch(e){} } };
  ga({ vis: "menu" }); window.scrollTo(0, 0);
  let steg = TOUR_STEG.filter(function(st){ if(!st.krev) return true; const m = st.m(); return Array.isArray(m) ? !!m.filter(Boolean)[0] : !!m; });
  /* #237 B-045 (founder 20.10 «kiss»): foerste gang og kommet via en leder = 3 kort i stedet for 19 - lederen,
     ansvarsfraskrivelsen (B-030) og «klar». Hele turen kommer ved neste besoek og ligger under Mer. */
  /* #243 (sky-funn 20.10, bekreftet lokalt): ledersteget finnes ogsaa uten leder (det peker da paa «ingen lederlenke»), saa den
     korte turen kom for alle. B-045: bare den som kom via en leder faar 3 kort. */
  /* Kom via lederlenke = koden står i adressen (?l=, ogsaa fra navnelenker) eller en leder er allerede husket. Ikke vent paa at
     arket er hentet og dekryptert - paa tregt nett er det ikke ferdig naar turen aapner (maalt 20.10: 7 av 32 fikk 19 kort). */
  let viaLeder = !!load("aimpire.leader");
  try{ if(/[0-9a-z]{6}$/.test(String(new URLSearchParams(location.search).get("l") || "").toLowerCase().replace(/[^a-z0-9]/g, ""))) viaLeder = true; }catch(e){}
  if(tvungen && viaLeder && steg.some(function(st){ return st.k === "leader"; })) steg = steg.filter(function(st){ return st.k === "leader" || st.risk || st.k === "done"; });
  const ov = el("div"); ov.id = "tour"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
  const sperre = el("div", "tsperre"); ov.appendChild(sperre);
  const ring = el("div", "ring ingen"); ov.appendChild(ring);
  const pil = el("div", "tpil"); pil.setAttribute("aria-hidden", "true"); pil.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3v15M5 12l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'; ov.appendChild(pil);
  const kort = el("div", "tkort"); kort.setAttribute("aria-live", "polite"); ov.appendChild(kort);
  /* #199 (founder 06:50): «Hopp over» lukker ikke - den gaar til siste steg, ansvarsfraskrivelsen med nedtelling.
     Den maa fortsatt leses og hukes av foer turen er ferdig. */
  /* #200 (founder 19.10): «guiden må folk kunne skippe og hoppe over» - «Hopp over» vises ogsaa foerste gang
     (endrer #186), og prikkene er trykkbare. Ingen vei forbi ansvarsfraskrivelsen uten avkrysning (B-030/#199). */
  const ri = steg.findIndex(function(x){ return x.risk; });
  let godkjent = false;
  const hoppTil = function(t){ if(ri >= 0 && t > ri && !godkjent) t = ri; if(t !== i){ i = t; tegn(); } };
  const hopp = el("button", "thopp", G.ui.skip); hopp.type = "button";
  /* Founder 19.10 21:20: «de må kunne skippe den etter de har gjort det første gang» - er guiden fullfoert én gang
     (ansvarsfraskrivelsen lest og huket av, B-030), lukker «Hopp over» rett ut. Foerste gang gaar den fortsatt til
     ansvarskortet (#199). */
  const gjortFoer = !tvungen && load("aimpire.tour.sett") === "1" && !!load("aimpire.disclaimer");
  hopp.onclick = function(){ if(ri >= 0 && i < ri && !gjortFoer) hoppTil(ri); else lukk(); };   /* #202: tegnes inne i kortet, under «Neste» */
  document.body.appendChild(ov); document.documentElement.classList.add("touraapen");
  /* #208: sveip/hjul utenfor kortet ruller ikke bakgrunnen (iOS ignorerer overflow:hidden ved sveip). Kortet selv kan rulles. */
  const stopp = function(e){ if(!(e.target.closest && e.target.closest(".tkort"))) e.preventDefault(); };
  ov.addEventListener("touchmove", stopp, { passive: false }); ov.addEventListener("wheel", stopp, { passive: false });
  let i = 0;
  let lukk = function(fest){ ov.remove(); document.documentElement.classList.remove("touraapen"); store("aimpire.tour.sett", "1"); window.removeEventListener("resize", plasser);
    try{ setView("menu"); window.scrollTo(0, 0); }catch(e){} if(fest) try{ feirVed(document.querySelector(".tbhome") || document.body, 40); vibrer([12, 60, 12]); }catch(e){} };
  const maal = function(){ const st = steg[i], m = st.m ? st.m() : null; return (Array.isArray(m) ? m : [m]).filter(function(x){ return x && x.getBoundingClientRect; }); };
  const plasser = function(){
    const els = maal(); kort.style.maxHeight = "";   /* #246: maal kortets naturlige hoeyde paa nytt */
    if(!els.length){ sperre.style.clipPath = ""; ring.className = "ring ingen"; ring.removeAttribute("style"); pil.className = "tpil"; kort.style.bottom = ""; kort.style.top = "50%"; kort.style.transform = "translateY(-50%)"; return; }
    let r = { l: 1e9, t: 1e9, r: -1e9, b: -1e9 };
    els.forEach(function(e){ const q = e.getBoundingClientRect(); r.l = Math.min(r.l, q.left); r.t = Math.min(r.t, q.top); r.r = Math.max(r.r, q.right); r.b = Math.max(r.b, q.bottom); });
    const pad = 6; r.t = Math.max(6, r.t); r.b = Math.min(innerHeight - 6, r.b);
    /* Elementer i oevre halvdel: ringen kortes slik at hele kortet faar plass under (ingen overlapp). */
    const kh = kort.offsetHeight || 270;
    if((r.t + (r.b - r.t) / 2 <= innerHeight / 2 || r.t < innerHeight * .5)) r.b = Math.min(r.b, innerHeight - kh - 70);
    ring.className = "ring";
    /* Interaktivt steg: hull i sperren akkurat der ringen er */
    if(steg[i].lek){ const x1 = Math.max(4, r.l - pad), y1 = r.t - pad, x2 = x1 + Math.min(innerWidth - 8, r.r - r.l + 2 * pad), y2 = y1 + Math.max(20, r.b - r.t + 2 * pad);
      sperre.style.clipPath = "polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, " + x1 + "px " + y1 + "px, " + x2 + "px " + y1 + "px, " + x2 + "px " + y2 + "px, " + x1 + "px " + y2 + "px, " + x1 + "px " + y1 + "px)"; ring.classList.add("lek"); }
    else sperre.style.clipPath = "";
    ring.style.left = (Math.max(4, r.l - pad)) + "px"; ring.style.top = (r.t - pad) + "px";
    ring.style.width = (Math.min(innerWidth - 8, r.r - r.l + 2 * pad)) + "px"; ring.style.height = Math.max(20, r.b - r.t + 2 * pad) + "px";
    kort.style.transform = "";
    const midt = Math.max(24, Math.min(innerWidth - 48, (r.l + r.r) / 2 - 22));
    if(r.t + (r.b - r.t) / 2 > innerHeight / 2){
      const bunn = Math.max(16, innerHeight - r.t + 56); kort.style.top = ""; kort.style.bottom = bunn + "px";
      pil.className = "tpil ned vis"; pil.style.left = midt + "px"; pil.style.top = ""; pil.style.bottom = (innerHeight - r.t + 8) + "px";
    } else {
      const topp = Math.max(12, Math.min(innerHeight - kh - 12, r.b + 58)); kort.style.bottom = ""; kort.style.top = topp + "px";
      pil.className = "tpil opp vis"; pil.style.left = midt + "px"; pil.style.bottom = ""; pil.style.top = (r.b + 8) + "px";
    }
    /* #246 (founder 20.10 «turen lagde problemer på noen modeller»): stor systemskrift og Nastaliq gjoer kortet hoeyere enn
       antatt. Maal det ekte kortet: det skal alltid ligge helt innenfor skjermen (knappene i den faste bunnen synlige, kortet
       ruller selv om det maa), og ringen skal aldri ligge over kortet. */
    /* Maalposisjonene regnes fra stilverdiene, ikke getBoundingClientRect: ring og kort glir (transition .35s), og
       midt i glidningen ville maalingen gi gammel plass. */
    requestAnimationFrame(function(){
      const H = innerHeight; kort.style.maxHeight = "";
      const kh2 = kort.offsetHeight;
      let kt = kort.style.top ? parseFloat(kort.style.top) : H - parseFloat(kort.style.bottom || "16") - kh2;
      if(kt + kh2 > H - 10 || kt < 12){ kt = Math.max(12, Math.min(kt, H - 10 - kh2)); kort.style.bottom = ""; kort.style.top = kt + "px"; }
      const kb = Math.min(H - 10, kt + kh2); if(kt + kh2 > H - 10) kort.style.maxHeight = (H - 10 - kt) + "px";
      if(ring.classList.contains("ingen")) return;
      const rt = parseFloat(ring.style.top), rb = rt + parseFloat(ring.style.height);
      if(rb > kt && rt < kb){
        pil.className = "tpil";
        if(rt < kt) ring.style.height = Math.max(20, kt - 10 - rt) + "px";
        else { const y = kb + 10; ring.style.top = y + "px"; ring.style.height = Math.max(20, rb - y) + "px"; }
      }
    });
  };
  const tegn = function(){
    const st = steg[i], VK = st.k === "done" && erVelkomst() && C.welcome && (C.welcome[lang] || C.welcome.en);
    const T = VK && VK.done && G.done ? [G.done[0], VK.done] : (G[st.k] || ["", ""]);   /* #237: ingen «Mer» i velkomstmodus */
    hopp.hidden = !!st.risk || i === steg.length - 1;   /* #199/#200: ikke paa ansvarssteget, og ikke ved «Ferdig» */
    ga(st);
    kort.classList.remove("inn"); pil.className = "tpil";
    setTimeout(function(){
      const els = maal(); const e0 = els[0];
      /* Elementet rulles opp like under toppen - da er det alltid plass til kortet under det. */
      if(e0 && !e0.closest(".tabbar") && !e0.closest(".mast")){ window.scrollTo(0, Math.max(0, e0.getBoundingClientRect().top + scrollY - 78)); }
      else if(!e0 || e0.closest(".mast")) window.scrollTo(0, 0);
      kort.textContent = "";
      const vert = el("div", "tvert"); const ik = document.createElement("img"); ik.src = "assets/ap-gradient-96.png"; ik.alt = ""; ik.width = 28; ik.height = 28; vert.appendChild(ik);
      const dots = el("div", "tdots"); steg.forEach(function(_, n){ const d = el("button"); d.type = "button";
        d.setAttribute("aria-label", G.ui.of.replace("{n}", n + 1).replace("{N}", steg.length)); if(n === i) d.setAttribute("aria-current", "step");
        d.appendChild(el("i", n === i ? "on" : (n < i ? "ferdig" : ""))); d.onclick = function(){ hoppTil(n); }; dots.appendChild(d); }); vert.appendChild(dots); kort.appendChild(vert);
      let rkb = null, rfot = null;
      if(st.risk){
        const R = G.risk || {}; kort.classList.add("trisk");
        kort.appendChild(el("h3", null, "\u26A0\uFE0F " + (R.t || ""))); const ul = el("ul", "trl"); (R.items || []).forEach(function(x){ ul.appendChild(el("li", null, x)); }); kort.appendChild(ul);
        const lab = el("label", "trok"); rkb = document.createElement("input"); rkb.type = "checkbox"; rkb.disabled = true; lab.appendChild(rkb); const lt = el("span", null, R.ok || ""); lab.appendChild(lt);
        const vent = el("small", "trvent"); rfot = [lab, vent];   /* #203: i den faste bunnen, saa avkrysningen alltid er synlig paa lave skjermer */
        /* Founder 05:05 «tre sekunder var lite» -> 05:06 «gjør det 10 sekunder på alle» -> 20.10 «fra 10 til 5 sekunder» (#235). */
        let igjen = 5; const tikk = function(){ if(!$("tour")) return; if(igjen > 0){ vent.textContent = (R.wait || "").replace("{s}", igjen); igjen--; setTimeout(tikk, 1000); } else { vent.textContent = ""; rkb.disabled = false; lab.classList.add("klar"); } };
        tikk();
      } else { kort.classList.remove("trisk"); kort.appendChild(el("h3", null, T[0])); kort.appendChild(el("p", null, T[1])); }
      const nav = el("div", "tnav");
      nav.appendChild(el("span", "tnr", G.ui.of.replace("{n}", i + 1).replace("{N}", steg.length)));
      if(i > 0){ const b = el("button", "tbak", G.ui.back); b.type = "button"; b.onclick = function(){ i--; tegn(); }; nav.appendChild(b); }
      const siste = i === steg.length - 1;
      const n = el("button", "tneste", siste ? G.ui.done : G.ui.next); n.type = "button";
      n.onclick = function(){ if(siste){ lukk(true); return; } if(rkb && !rkb.checked) return; if(rkb){ godkjent = true; store("aimpire.disclaimer", new Date().toISOString().slice(0, 10)); } i++; tegn(); vibrer(6); };
      if(rkb){ n.disabled = true; rkb.onchange = function(){ n.disabled = !rkb.checked; }; }
      nav.appendChild(n); const bunn = el("div", "tbunn"); if(rfot) rfot.forEach(function(x){ bunn.appendChild(x); }); bunn.appendChild(nav); if(!hopp.hidden) bunn.appendChild(hopp); kort.appendChild(bunn);
      void kort.offsetWidth; kort.classList.add("inn");
      setTimeout(plasser, 120); setTimeout(plasser, 450);
      setTimeout(function(){ try{ n.focus({ preventScroll: true }); }catch(e){} }, 150);
    }, st.vis !== (steg[i - 1] || {}).vis ? 380 : 60);
  };
  window.addEventListener("resize", plasser);
  /* Etter et trykk i kalkulatoren kan hoeyden endre seg - flytt ringen etter */
  const etterTrykk = function(){ if($("tour") && steg[i] && steg[i].lek) setTimeout(plasser, 120); };
  document.addEventListener("click", etterTrykk, true); document.addEventListener("input", etterTrykk, true);
  const lukk0 = lukk; lukk = function(f){ document.removeEventListener("click", etterTrykk, true); document.removeEventListener("input", etterTrykk, true); lukk0(f); };
  tegn();
}
/* Når skal guiden vises? Telles én gang per besoek (sessionStorage), foerst etter spraakvalget. */
function tourSjekk(){
  if(PAGE === "leaders" || !C.tour) return;
  let ny = false; try{ ny = !sessionStorage.getItem("aimpire.tour.oekt"); sessionStorage.setItem("aimpire.tour.oekt", "1"); }catch(e){ ny = false; }
  const sett = load("aimpire.tour.sett") === "1";
  /* aldri fullfoert = obligatorisk, ogsaa etter en omlasting midt i guiden */
  if(!sett){ if(ny) store("aimpire.tour.n", "1"); setTimeout(function(){ tourAapne(true); }, 900); return; }
  if(!ny) return;
  const n = (parseInt(load("aimpire.tour.n") || "0", 10) || 0) + 1; store("aimpire.tour.n", String(n));
  if(n === 2 || n % 10 === 0) setTimeout(function(){ tourAapne(false); }, 900);
}
/* #190: lys/moerk flyttet ned paa smale skjermer (plass til lederknappen oeverst) */
function temaBunn(){ const b = $("tema-bunn"), T = C.theme_ask && (C.theme_ask[lang] || C.theme_ask.en); if(!b) return;
  b.textContent = "\uD83C\uDF13 " + ((T && T.title) || "Light / dark");   /* #210: «◐» mangler i mange Android-fonter */ b.onclick = function(){ try{ toggleTheme(); }catch(e){} }; }
function tourKnapp(){
  const b = $("tour-igjen"), G = C.tour && (C.tour[lang] || C.tour.en); if(!b) return;
  if(!G || PAGE === "leaders"){ b.hidden = true; return; }
  b.hidden = false; b.textContent = "\uD83E\uDDED " + G.ui.replay; b.onclick = function(){ tourAapne(false); };
}
function aapneMarked(){ if(TABS.tools) tab = "hours"; setView("tools"); setTimeout(function(){ const s = $("s-market"); if(s) s.scrollIntoView({ block: "start" }); }, 80); }
function tapeVis(blink){
  const box = $("tape2"), trk = $("tape2-trk"); if(!box || !trk) return;
  if(!KURS_SYM.some(function(k){ return KURS[k]; })){ box.hidden = true; return; }
  const T = C.tape && (C.tape[lang] || C.tape.en) || {};
  const stengt = metallStengt();
  /* #185 (founder 19.10 04:32 «kjør på med det du heller ville gjort»): kursene staar STILLE i fire kolonner.
     Bevegelse bare naar noe faktisk skjer: tallet blinker groent/roedt naar det endres. Trykk = hele visningen i Verktøy. */
  const grp = el("div", "grp");
  KURS_SYM.forEach(function(k){
    const q = KURS[k]; if(!q) return;
    const t = el("button", "tk" + (q.r ? " " + q.r : "") + (blink && blink[k] ? " blink" : "")); t.type = "button";
    const metall = k === "XAU" || k === "XAG";
    const h = el("span", "tkh"); if(!(metall && stengt)) h.appendChild(el("i", "lv"));
    h.appendChild(el("b", null, k === "XAU" ? "XAUUSD" : k === "XAG" ? "XAGUSD" : k)); t.appendChild(h);
    const v = el("span", "tkv"); v.appendChild(el("span", "v", kursFmt(k, q.p)));
    if(metall && stengt) v.appendChild(el("span", "st", T.closed || "closed"));
    else if(q.r) v.appendChild(el("span", "a", q.r === "opp" ? "\u25B2" : "\u25BC"));
    t.appendChild(v); t.onclick = function(){ try{ aapneMarked(); }catch(e){} };
    grp.appendChild(t);
  });
  /* #144 (founder 18.10 15:36 «nyheter som påvirker verdensøkonomien … i banneren»): ukens store
     nyheter fra kalenderen (data/nyheter.json, K-28) rett etter kursene, i telefonens egen tid.
     Overskrifter fra nyhetsbyraaer er bevisst utelatt: lisensen for gjengivelse er uavklart. */
  trk.textContent = "";
  trk.appendChild(grp); box.classList.add("stille");
  box.hidden = false;
}
let KURS_SIST = 0;
function kursHent(){
  if(document.hidden) return;
  if(Date.now() - KURS_SIST < 10000) return;   /* oppstart + «synlig igjen» rett etter hverandre = én henting (treg nett) */
  KURS_SIST = Date.now();
  const blink = {};
  /* #213 G2: gold-api §4 «flere kall per sekund kan gi IP-blokk» (K-142). Mobiloperatoerer i Pakistan deler IP (CGNAT),
     saa fire kall i samme sekund fra hver telefon er unoedvendig risiko. Kallene spres med 1,1 s mellomrom. */
  Promise.all(KURS_SYM.map(function(k, n){
    return new Promise(function(r){ setTimeout(r, n * 1100); }).then(function(){ return fetch("https://api.gold-api.com/price/" + k, { cache: "no-store" }); }).then(function(r){ return r.ok ? r.json() : null; }).then(function(j){
      /* #213 B1: en gratiskilde uten garanti kan svare med tull (testet: 1e308 ga «∞», 1e-7 ga «0.00» vist som ekte kurs).
         Utenfor et vidt, rimelig spenn vises ikke. (Ingen «hopp-regel»: én feil foerste verdi ville da laast ute alle riktige.) */
      if(!j || typeof j.price !== "number" || !isFinite(j.price) || !(j.price > 0)) return;
      const spenn = KURS_SPENN[k]; if(spenn && (j.price < spenn[0] || j.price > spenn[1])) return;
      const ny = Math.round(j.price * 100) / 100, gml = KURS[k];
      const r = gml && ny !== gml.p ? (ny > gml.p ? "opp" : "ned") : (gml && gml.r) || "";
      if(gml && ny !== gml.p) blink[k] = 1;
      KURS[k] = { p: ny, r: r };
    }).catch(function(){});
  })).then(function(){ tapeVis(blink); try{ markedVis(); }catch(e){} try{ gullFraKurs(); }catch(e){} if(!MG_PX_RORT && KURS.XAU && $("mg-px")){ $("mg-px").value = KURS.XAU.p; $("mg-px").dispatchEvent(new Event("input")); MG_PX_RORT = false; } });
}
window.addEventListener("load", function(){ setTimeout(kursHent, 900); setInterval(kursHent, 30000); });
/* #186: guiden ved oppstart - bare naar spraaket allerede er valgt (ellers starter den etter spraakporten). */
window.addEventListener("load", function(){ setTimeout(function(){ if(load("aimpire.lang.asked") && !document.getElementById("port")) try{ tourSjekk(); }catch(e){} }, 1200); });
document.addEventListener("visibilitychange", function(){ if(!document.hidden) kursHent(); });

/* ---- Levende chart-linje (pynt) ---- */
let SPARK_N = 0;
function sparkSvg(){
  const ns = "http://www.w3.org/2000/svg", sv = document.createElementNS(ns, "svg");
  sv.setAttribute("class", "spark"); sv.setAttribute("viewBox", "0 0 200 80"); sv.setAttribute("preserveAspectRatio", "none"); sv.setAttribute("aria-hidden", "true");
  /* Et nytt, rolig forloep per kort: lukket randomwalk med svak oppdrift. */
  let y = 58, pts = [];
  const seed = ++SPARK_N * 9301;
  for(let i = 0; i <= 10; i++){
    const r = Math.sin(seed + i * 12.9898) * 43758.5453; const u = r - Math.floor(r);
    y = Math.max(14, Math.min(68, y + (u - 0.58) * 18)); pts.push([i * 19, y]);
  }
  let d = "M" + pts[0][0] + " " + pts[0][1];
  for(let i = 1; i < pts.length; i++){ const a = pts[i-1], b = pts[i], mx = (a[0] + b[0]) / 2; d += " C" + mx + " " + a[1] + " " + mx + " " + b[1] + " " + b[0] + " " + b[1]; }
  const last = pts[pts.length - 1];
  sv.innerHTML = '<defs><linearGradient id="sparkg" x1="0" x2="1"><stop offset="0" stop-color="#15D8C4" stop-opacity=".2"/><stop offset=".6" stop-color="#1B4FD8"/><stop offset="1" stop-color="#C21FBF"/></linearGradient>' +
    '<linearGradient id="sparkf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15D8C4" stop-opacity=".18"/><stop offset="1" stop-color="#15D8C4" stop-opacity="0"/></linearGradient></defs>' +
    '<path class="f" d="' + d + ' L190 80 L0 80 Z"/><path class="l" d="' + d + '"/><circle cx="' + (last[0] - 2) + '" cy="' + last[1] + '" r="3.2"/>';
  return sv;
}
/* #155 (18.10): av. Kurven var en tilfeldig «randomwalk med oppdrift» - paa Sonic-kortet ser den ut
   som et resultat uten aa vaere det (fabrikasjon / inntektsbilde, B-030), og preserveAspectRatio=none
   strakk prikken til en pille. Ekte tall staar i Historikk og Kalkulator. */
function leggSpark(node){ return; }

/* Sveip mellom mappene som i Instagram (founder 18.10 00:01), retningslaas fra #171 (founder 19.10 03:13
   «slider for lett … man proever bare aa scrolle ned»).
   #236 (founder 20.10 «sveipe tilbake til forrige side, høyre og venstre mellom fanene men med riktig tech så den
   ikke bytter for lett … tenk som en forbruker»): moenster fra Androids tilbake-gest - en pil kommer inn fra kanten
   og FOELGER fingeren, fylles naar grensen er naadd (med et lite rykk), og ingenting skjer foer man slipper. Drar man
   tilbake under grensen, avbrytes det. Man ser alltid hva som kommer til aa skje.
   - Retningen laases paa de foerste 12 px (#171): mer loddrett enn vannrett = scrolling resten av beroeringen.
     Avviker fingeren mer enn 45 px loddrett eller siden scroller, er sveipet glemt.
   - Fanene oeverst (Verktøy, Sonic) er egne sider i rekka; etter siste fane kommer neste mappe. Rekka stopper ved
     Verktøy - et sveip skal aldri ta deg ut av appen til ledersiden.
   - Tilbake: kantsveip fra venstre bare i appen lagt paa hjemskjermen paa iPhone (der finnes ingen tilbake-gest).
     Ellers eier telefonen/nettleseren kanten. */
const SVEIP_RING = ["start", "prod", "learn", "menu", "tools"];
function sveipMaal(steg){
  if(TABS[view]){ const o = TABS[view], j = o.indexOf(tab) + steg; if(j >= 0 && j < o.length) return { v: view, t: o[j] }; }
  const k = SVEIP_RING.indexOf(view === "earn" ? "prod" : view); if(k < 0) return null;
  const n = SVEIP_RING[k + steg]; if(!n) return null;
  return TABS[n] ? { v: n, t: steg > 0 ? TABS[n][0] : TABS[n][TABS[n].length - 1] } : { v: n };
}
function sveipNavn(m){
  try{ if(m.t){ const J = C.jump && (C.jump[lang] || C.jump.en); if(J && J[m.t]) return J[m.t]; }
    const M = C.menu && (C.menu[lang] || C.menu.en); return M && M.tabs ? (M.tabs[TBREKKE_TEKST[m.v]] || "") : ""; }catch(e){ return ""; }
}
function sveipGaa(m){
  if(m.v === view && m.t){ setTab(m.t, true); return; }
  TBPOS[view] = scrollY; if(m.t) tab = m.t;
  setView(m.v);
}
var NAV_DYBDE = 0;   /* var: brukes av setView, som kan kjoere foer denne linja ved oppstart */
(function(){
  const iosApp = /iPhone|iPad|iPod/.test(navigator.userAgent) && (navigator.standalone === true || (window.matchMedia && matchMedia("(display-mode: standalone)").matches));
  let x0 = 0, y0 = 0, sy0 = 0, aktiv = false, laas = "", maksDy = 0, modus = "", fremdrift = 0, maal = null, over = false, raf = 0, sisteDx = 0;
  const UNNTAK = "input,textarea,select,iframe,.jump,.switch,.tape2,.gchart,.cslide,.shot,.shotbox,.sheet,#tema,.cseg,.cpre,.mgseg,.qsug,.snspark,.cchart,.ssdial,.tvtape,#tour,.mersheet,[data-noswipe]";
  const sidelengsScroll = function(n){
    for(; n && n !== document.body; n = n.parentElement){
      if(n.scrollWidth > n.clientWidth + 4){ const ox = getComputedStyle(n).overflowX; if(ox === "auto" || ox === "scroll") return true; }
    }
    return false;
  };
  let pil = null;
  const lagPil = function(){ if(pil) return pil; pil = el("div", "svpil"); pil.setAttribute("aria-hidden", "true");
    pil.appendChild(el("i", "svr")); pil.appendChild(el("b", "svn")); document.body.appendChild(pil); return pil; };
  const tegn = function(){ raf = 0; if(!pil) return;
    const f = Math.min(1, fremdrift), side = sisteDx > 0 ? "v" : "h";
    pil.dataset.side = side; pil.classList.toggle("klar", over); pil.style.setProperty("--f", f.toFixed(3)); pil.hidden = f <= 0.02; };
  const skjul = function(){ fremdrift = 0; over = false; if(pil){ pil.hidden = true; pil.classList.remove("klar"); } };
  document.addEventListener("touchstart", function(e){
    aktiv = false; laas = ""; maksDy = 0; modus = ""; maal = null; over = false; skjul();
    if(e.touches.length !== 1 || PAGE === "leaders" || !document.body.classList.contains("has-tabbar")) return;
    if(document.documentElement.classList.contains("velkomst")) return;   /* #237: ingen sveip inn i det skjulte i velkomstmodus */
    const t = e.target; if(t.closest && t.closest(UNNTAK)) return;
    const qs = $("q-sheet"); if(qs && !qs.hidden) return;
    if(document.getElementById("tour")) return;
    const x = e.touches[0].clientX, rtl = document.documentElement.dir === "rtl";
    const kant = rtl ? x > innerWidth - 22 : x < 22;
    if(kant){ if(!iosApp || NAV_DYBDE < 1) return; modus = "tilbake"; }
    else if(x < 24 || x > innerWidth - 24) return;   /* kantene eier telefonen */
    else { if(sidelengsScroll(t)) return; modus = "fane"; }
    x0 = x; y0 = e.touches[0].clientY; sy0 = scrollY; aktiv = true;
  }, { passive: true });
  document.addEventListener("touchmove", function(e){
    if(!aktiv) return;
    if(e.touches.length !== 1){ aktiv = false; skjul(); return; }
    const dxs = e.touches[0].clientX - x0, dx = Math.abs(dxs), dy = Math.abs(e.touches[0].clientY - y0);
    if(dy > maksDy) maksDy = dy;
    if(!laas && (dx > 12 || dy > 12)) laas = dx > dy * 1.6 ? "x" : "y";
    if(laas === "y" || maksDy > 45 || Math.abs(scrollY - sy0) > 4){ aktiv = false; skjul(); return; }
    if(laas !== "x") return;
    const rtl = document.documentElement.dir === "rtl";
    if(modus === "tilbake"){ if((dxs > 0) === rtl){ fremdrift = 0; } else { maal = { tilbake: true }; } }
    else { const steg = (dxs < 0) !== rtl ? 1 : -1; maal = sveipMaal(steg); if(!maal){ fremdrift = 0; } }
    const grense = Math.max(96, innerWidth * 0.28);   /* ~110 px paa en vanlig telefon */
    sisteDx = dxs; fremdrift = maal ? dx / grense : 0;
    const varOver = over; over = fremdrift >= 1;
    if(over && !varOver) vibrer(5);
    lagPil(); if(maal && pil){ const nb = pil.querySelector(".svn"); const tx = maal.tilbake ? "" : sveipNavn(maal); if(nb.textContent !== tx) nb.textContent = tx; pil.classList.toggle("tilb", !!maal.tilbake); }
    if(!raf) raf = requestAnimationFrame(tegn);
  }, { passive: true });
  document.addEventListener("touchcancel", function(){ aktiv = false; skjul(); }, { passive: true });
  document.addEventListener("touchend", function(){
    if(!aktiv){ skjul(); return; } aktiv = false;
    const ok = laas === "x" && over && maal && !(window.getSelection && String(window.getSelection()).length);
    const m = maal; skjul();
    if(!ok) return;
    if(m.tilbake){ try{ history.back(); }catch(e){} return; }
    sveipGaa(m);
  }, { passive: true });
  window.addEventListener("popstate", function(){ if(NAV_DYBDE > 0) NAV_DYBDE--; });
})();
/* Hvor langt ned i denne visningen: 0-1, tegnet som strek over fanelinja. */
let tbTick = false;
function tbScroll(){
  const b = document.querySelector("#tbprog b"); if(!b) return;
  const maks = document.documentElement.scrollHeight - innerHeight;
  const f = maks > 40 ? Math.min(1, Math.max(0, scrollY / maks)) : 0;
  b.style.transform = "scaleX(" + f.toFixed(3) + ")";
}
window.addEventListener("scroll", function(){
  if(tbTick) return; tbTick = true;
  setTimeout(function(){ tbTick = false; tbScroll(); }, 50);
}, { passive: true });
window.addEventListener("resize", tbScroll, { passive: true });
function renderMenu(){
  const nav = $("menu-nav"); if(!nav) return;
  const M = C.menu && (C.menu[lang] || C.menu.en);
  if(!M){ nav.hidden = true; return; }
  /* «Markedene naa» flyttes inn paa Hjem rett under hovedkortene (se under); legg den
     tilbake utenfor foer nav toemmes, ellers forsvinner den ved neste render. */
  const mkNaa = $("mk-now"); if(mkNaa && mkNaa.parentNode === nav) nav.after(mkNaa);
  nav.textContent = "";
  /* Ledeteksten over kortene er tatt bort (lederfeedback 16.10): kortene sier det selv. */
  const done = doneSet(), steps = (C.guide[lang] || C.guide.en).steps.length;
  /* To fremhevede kort (Sonic og Kom i gang), resten som én liste. */
  const FEAT = { earn: 1, start: 1, ib: 1 };   /* founder 19.10 01:21 (#163): IB-bonusen er for alle og skal synes */
  /* Founder 17.10 22:36 «jobb mer med menyene … rekkefoelge og hvilke funksjonaliteter de
     gir»: Hjem er et dashbord, ikke en kopi av fanelinja. Verktoey og Laer staar i
     fanelinja og gjentas ikke her; resten blir snarveier i et kompakt rutenett. */
  const ITAB = { tools: 1, learn: 1 };
  const list = el("div","mlist mgrid");
  /* #142 (founder 18.10 15:20 «man må lete seg frem … tenk psykologi»): folk kommer med ÉN
     oppgave i hodet («sette inn», «ta ut»), ikke med et kart over fanene. Derfor står de
     vanligste oppgavene øverst på Hjem, med verbet de selv ville brukt, og hver går rett dit. */
  /* #254 (founder 20.10 02:54 «passe psyken»): ett tydelig neste steg øverst. Den som ikke har fullført Kom i gang,
     ser framdriften sin først (en påbegynt oppgave drar), så oppgavene, så resten. Provisjonskortet (#163: «skal synes»)
     står fortsatt på Hjem, men etter læringen - ingen skal bes om å verve før de selv er i gang. */
  const ufullfort = done.size < steps;
  const nesteW = el("div", "mfeat mneste"); nav.appendChild(nesteW);
  const ibW = el("div", "mfeat mib");
  const GO = C.goals && (C.goals[lang] || C.goals.en);
  if(GO && GO.items && GO.items.length){
    const gw = el("section", "goals"); gw.appendChild(el("h2", "gt", GO.t));
    const gg = el("div", "ggrid");
    GO.items.forEach(function(g){
      const a = el("a", "goal"); a.href = g[2];
      a.appendChild(el("span", "gi", g[0])); a.appendChild(el("span", "gl", g[1]));
      gg.appendChild(a);
    });
    gw.appendChild(gg); nav.appendChild(gw);
  }
  const feat = el("div","mfeat"); nav.appendChild(feat);
  M.items.forEach(function(it){
    const cat = it[0];
    if(ITAB[cat]) return;
    const b = el("button", FEAT[cat] ? "plate feat" : "plate");
    b.type = "button";
    b.setAttribute("data-cat", cat);
    b.appendChild(el("span","stripe"));
    /* Founder 17.10 19:56: ikoner og tydeligere mapper. */
    b.appendChild(el("span", "mic", MIKON[cat] || "•"));
    const bd = el("span","bd");
    bd.appendChild(el("span","t", it[1]));
    bd.appendChild(el("span","d", it[2]));
    /* Framdriften er ekte: den teller stegene medlemmet selv har huket av. */
    if(cat === "start" && done.size){
      const pg = el("span","pg");
      const bar = el("i"); const fill = el("b");
      fill.style.width = Math.round(Math.min(1, done.size / steps) * 100) + "%";
      bar.appendChild(fill);
      pg.appendChild(bar);
      pg.appendChild(el("span", null, done.size + " / " + steps));
      bd.appendChild(pg);
      /* Hvor man slapp, rett paa kortet - ett blikk, null leting (founder 17.10). */
      const UI = C.guide_ui[lang] || C.guide_ui.en;
      const G2 = C.guide[lang] || C.guide.en;
      const neste = G2.steps.findIndex(function(_, i){ return !done.has(String(i)); });
      const nxTekst = neste === -1 ? (UI.all_done_go || "") : (UI.next || "{t}").replace("{t}", G2.steps[neste][0]);
      if(nxTekst) bd.appendChild(el("span","nx", nxTekst));
    }
    b.appendChild(bd);
    const go = el("span","go");
    go.setAttribute("aria-hidden","true");
    b.appendChild(go);
    b.onclick = JUMPTO[cat] ? function(){ location.hash = "#" + cat; } : function(){ if(TABS[cat]) tab = TABS[cat][0]; setView(cat); };
    if(cat === "start" && ufullfort) nesteW.appendChild(b);
    else if(cat === "ib") ibW.appendChild(b);
    else if(FEAT[cat]) feat.appendChild(b); else list.appendChild(b);
  });
  if(mkNaa) nav.appendChild(mkNaa);   /* trading-pulsen tidlig: ekte gullpris + oekter */
  /* Dagens ord (founder 17.10 21:04 «samme tankegang … sjel»): ett begrep fra ordlista per dag. */
  const LT = C.learn && C.learn.terms && (C.learn.terms[lang] || C.learn.terms.en);
  if(LT && LT.length && M.wotd){
    const dagNr = Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
    const i = dagNr % LT.length, t = LT[i];
    const kort = el("button", "wotd"); kort.type = "button";
    const hd = el("span", "wh"); hd.appendChild(el("span", "we", "\uD83D\uDCD6")); hd.appendChild(el("small", null, M.wotd)); kort.appendChild(hd);
    kort.appendChild(el("b", null, t[0]));
    const forste = String(t[1] || "").match(/^[\s\S]*?[.!?\u06D4\u0964](?=\s|$)/); kort.appendChild(el("span", "wd", forste ? forste[0] : String(t[1] || "")));
    kort.appendChild(el("span", "wm", M.wotd_more));
    kort.onclick = function(){ setView("learn"); setTimeout(function(){ const d = $("ord-" + i); if(d){ d.open = true; d.scrollIntoView({ behavior: "smooth", block: "center" }); } }, 200); };
    nav.appendChild(kort);
  }
  /* Founder 17.10 22:22: dagens ord skal fram, ikke gjemmes under lista - den staar
     derfor rett under Sonic og Kom i gang, og lista kommer etter. */
  if(!nesteW.childNodes.length) nesteW.remove();
  if(!feat.childNodes.length) feat.remove();
  if(ibW.childNodes.length) nav.appendChild(ibW);   /* #254 */
  if(list.childNodes.length) nav.appendChild(list);
  /* Delingsknapp: medlemmet sender videre den lenken det selv kom inn paa, saa
     sponsoren foelger med (privat deling, aldri et offentlig innlegg). Uten
     sponsor deles den rene adressen. navigator.share gir det innebygde
     delingsarket paa mobil; ellers aapnes WhatsApp direkte. */
  const SH = C.share && C.share.label && (C.share.label[lang] || C.share.label.en);
  if(SH && PAGE !== "leaders"){
    const sb = el("button","share"); sb.type = "button";
    const ic = document.createElementNS("http://www.w3.org/2000/svg","svg");
    ic.setAttribute("viewBox","0 0 24 24"); ic.setAttribute("aria-hidden","true");
    const pth = document.createElementNS("http://www.w3.org/2000/svg","path");
    pth.setAttribute("fill","currentColor");
    pth.setAttribute("d","M18 16a3 3 0 0 0-2.4 1.2l-6.7-3.4a3 3 0 0 0 0-1.6l6.7-3.4A3 3 0 1 0 15 7c0 .3 0 .5.1.8L8.4 11.2a3 3 0 1 0 0 3.6l6.7 3.4A3 3 0 1 0 18 16z");
    ic.appendChild(pth); sb.appendChild(ic); sb.appendChild(el("span", null, SH));
    /* Founder 17.10 19:51: «oppfordre dem til å anbefale til en venn» - kort setning over knappen. */
    const SHH = C.share.hint && (C.share.hint[lang] || C.share.hint.en);
    if(SHH) nav.appendChild(el("p", "sharehint", SHH));
    sb.onclick = function(){
      /* Bare den aktive sponsoren (fra ?l= i adressen, verifisert) reiser videre.
         Aldri den huskede: en noeytral lenke skal dele noeytralt (B-022, gjennomgang 16.10 funn 1). */
      const aktiv = sponsorVerified ? leaderById(new URLSearchParams(location.search).get("l")) : null;
      const base = (C.canonical && /^https:\/\//.test(C.canonical)) ? C.canonical : (location.origin + location.pathname.replace(/index\.html$/, ""));
      const link = aktiv ? lederUrl(base, aktiv.id, aktiv.name) : base;
      const tpl = (C.share.text && (C.share.text[lang] || C.share.text.en)) || "{LINK}";
      const msg = tpl.replace("{LINK}", link);
      if(navigator.share){ navigator.share({ text: msg }).catch(function(){}); return; }
      window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank", "noopener");
    };
    nav.appendChild(sb);
  }
  /* #254: Hjem har ikke lenger kursbåndene øverst - «Markedene nå» (økter, gullpris, neste nyhet) er markedet der.
     Målt 20.10 (oppstart-kall): å tegne den i oppstarten kostet 58–112 ms på Mac, mye mer på billig Android. Den tegnes
     derfor først når man ruller ned mot Dagens ord (rett under der den kommer). Uten IntersectionObserver: etter 6 s. */
  try{ if(!renderMenu.mkFerdig && PAGE !== "leaders"){ if(renderMenu.io) renderMenu.io.disconnect();
    const tegnMk = function(){ try{ if(!renderMenu.mkFerdig){ renderMenu.mkFerdig = true; renderSessions(); } }catch(e){} };
    const anker = nav.querySelector(".wotd") || nav.querySelector(".mib") || nav.querySelector(".mfeat:not(.mneste)");
    if(anker && "IntersectionObserver" in window){
      renderMenu.io = new IntersectionObserver(function(en){ if(en.some(function(x){ return x.isIntersecting; })){ renderMenu.io.disconnect(); tegnMk(); } }, { rootMargin: "250px 0px" });
      renderMenu.io.observe(anker);
    } else setTimeout(tegnMk, 6000); } }catch(e){}
  const bk = $("back");
  if(bk){ bk.textContent = M.back; bk.onclick = function(){ setView("menu"); }; }
}

/* Visningen er ren CSS: data-view paa .shell bestemmer hvilken kategori
   som vises. `hidden` eies av render() alene og vinner alltid. */
/* Inntektsfanen er delt i faner (founder: «del opp inntjening i flere faner»).
   Raden øverst er fanene; bare én del vises om gangen. */
const TABS = { earn: ["sonic", "results", "calc", "withdraw"], tools: ["hours", "sizing", "journal", "toolkit"] };
let tab = "sonic";
function setTab(tb, scroll){
  tab = tb;
  const sh = document.querySelector(".shell"); if(sh) sh.setAttribute("data-tab", tb);
  [...document.querySelectorAll("#jump button")].forEach(function(b){
    const on = b.dataset.tab === tb; b.setAttribute("aria-selected", String(on));
    if(on){ const j = b.parentNode; if(j && j.scrollWidth > j.clientWidth){ const y0 = scrollY; try{ b.scrollIntoView({ inline: "center", block: "nearest" }); }catch(e){} if(Math.abs(scrollY - y0) > 2) scrollTo(0, y0); } }
    if(on && b.parentNode.scrollWidth > b.parentNode.clientWidth){
      const r = b.parentNode.getBoundingClientRect();
      if(r.top >= 0 && r.bottom <= innerHeight) b.scrollIntoView({block: "nearest", inline: "nearest"});
    }
  });
  if(scroll) window.scrollTo(0, 0);
  if(typeof merkForste === "function") merkForste();   /* fanebytte uten applyView - samme toppmarg som ved mappebytte */
}
const TABIKON = { sonic: "\u26A1", results: "\uD83D\uDCC8", calc: "\uD83E\uDDEE", withdraw: "\uD83D\uDCB8", hours: "\uD83D\uDD52", sizing: "\uD83D\uDCCF", journal: "\uD83D\uDCD3", toolkit: "\uD83E\uDDF0" };
function renderJump(){
  const j = $("jump"); if(!j) return;
  const J = C.jump && (C.jump[lang] || C.jump.en);
  j.textContent = "";
  const order = TABS[view];
  /* Fanen fra en annen visning (f.eks. «sonic») finnes ikke her - start på første. */
  if(order && order.indexOf(tab) === -1) tab = order[0];
  if(!J || !order){ j.hidden = true; const sh = document.querySelector(".shell"); if(sh) sh.removeAttribute("data-tab"); return; }
  j.setAttribute("role", "tablist");
  order.forEach(function(tb){
    const b = el("button", null, null); b.type = "button"; b.dataset.tab = tb; b.setAttribute("role", "tab");
    if(TABIKON[tb]) b.appendChild(el("span", "ti", TABIKON[tb]));   /* founder 17.10 21:04: ikoner i alle mapper */
    b.appendChild(el("span", "tl", J[tb] || tb));
    b.onclick = function(){ setTab(tb, true); };
    j.appendChild(b);
  });
  j.hidden = false;
  setTab(tab, false);
}
function settTittel(){
  try{
    const M = C.menu && (C.menu[lang] || C.menu.en);
    const P = C.products && (C.products[lang] || C.products.en);
    const navn = view === "prod" && P ? P.title : M && M.items ? (M.items.find(function(it){ return it[0] === view; }) || [])[1] : null;
    document.title = (view !== "menu" && navn) ? "Aimpire \u00b7 " + navn : "Aimpire";
  }catch(e){}
}
/* #237 B-045 (founder 20.10 01:33): kunden som kommer via en leders lenke skal FØRSTE gang bare se
   startskjermen, kort om produktene og kalkulatoren - enkelt. Samme adresse og samme app (ingen ny offentlig
   side, B-041): resten skjules med klassen html.velkomst til kontoen er opprettet (Kom i gang steg 2 huket av),
   personen trykker «Se hele appen», eller ?full=1. Ledere selv og besøkende uten leder får aldri modusen. */
function erVelkomst(){
  if(PAGE === "leaders") return false;
  try{ if(new URLSearchParams(location.search).get("full") === "1") store("aimpire.full", "1"); }catch(e){}
  if(load("aimpire.full") === "1" || load("aimpire.me")) return false;
  if(!load("aimpire.leader")) return false;
  const d = doneSet(); return !(d.has("1") || d.has("2"));
}
function velkomst(){
  const paa = erVelkomst(), V = C.welcome && (C.welcome[lang] || C.welcome.en);
  document.documentElement.classList.toggle("velkomst", paa);
  let full = $("vk-full"), tilb = $("vk-tilbake");
  if(!paa || !V){ if(full) full.hidden = true; if(tilb) tilb.hidden = true; return; }
  const nav = $("menu-nav");
  if(!full && nav){
    full = el("button", "vkfull"); full.type = "button"; full.id = "vk-full";
    full.onclick = function(){ store("aimpire.full", "1"); velkomst(); try{ renderTabbar(); }catch(e){} window.scrollTo(0, 0); };
    const ml = nav.querySelector(".mlist"); (ml ? ml : nav.lastChild).after(full);
  }
  if(full){ full.hidden = false; full.textContent = V.full; }
  if(!tilb){ tilb = el("button", "vktilbake"); tilb.type = "button"; tilb.id = "vk-tilbake"; tilb.onclick = function(){ setView("menu"); }; document.body.appendChild(tilb); }
  tilb.textContent = (document.documentElement.dir === "rtl" ? "→ " : "← ") + V.back;
  tilb.hidden = view === "menu";
}
function applyView(){
  settTittel();
  const sh = document.querySelector(".shell"), nav = $("menu-nav"), bk = $("topbar");
  if(PAGE === "leaders"){
    try{ renderTabbar(); }catch(e){}
    sh.removeAttribute("data-view");
    const nt = $("notices"); if(nt) nt.hidden = true;
    if(nav) nav.hidden = true;
    if(bk) bk.hidden = true;
    try{ temaBunn(); }catch(e){}   /* #210: knappen var tom paa ledersiden (applyView returnerte foer den fikk tekst) */
    return;
  }
  sh.setAttribute("data-view", view);
  try{ velkomst(); }catch(e){}
  applyView.n = (applyView.n || 0) + 1; if(applyView.n > 1) sh.classList.add("navd");
  { const U = UTSATT[view]; if(U && U.size){ U.forEach(function(f){ try{ f(); }catch(e){} }); U.clear(); if(view === "tools") try{ planleggIsolering(); }catch(e){} } }
  try{ renderTabbar(); }catch(e){}
  try{ renderProducts(); }catch(e){}
  try{ tapeVis(); }catch(e){}
  try{ if(TV_VENT) setTimeout(function(){ try{ tvStart(); }catch(e){} }, 400); }catch(e){}   /* #254 */
  /* #254: «Markedene nå» tegnes fra renderMenu når man ruller ned mot den (se der). */
  try{ radarVis(); }catch(e){}   /* #149: nyhetsraden følger språket */
  try{ markedVis(); }catch(e){}   /* #184 */
  try{ tourKnapp(); }catch(e){}   /* #186 */
  try{ temaBunn(); }catch(e){}
  if(nav) nav.hidden = view !== "menu";
  if(bk) bk.hidden = view === "menu";
  renderJump();
  /* Mappehode (founder 17.10 21:04 «samme tankegang som hjemskjermen i alle mapper»):
     samme ikon og navn som flisa man trykket paa, saa man ser hvor man er. */
  let vh = $("vhead");
  if(!vh && bk){ vh = el("div", "vhead"); vh.id = "vhead"; bk.after(vh); }
  if(vh){
    const M = C.menu && (C.menu[lang] || C.menu.en);
    const it = M && M.items.find(function(x){ return x[0] === view; });
    vh.hidden = view === "menu" || !it; vh.textContent = "";
    if(it){
      vh.setAttribute("data-cat", view);
      leggSpark(vh);
      vh.appendChild(el("span", "vic", MIKON[view] || "\u2022"));
      const tx = el("div", "vtx"); tx.appendChild(el("b", null, it[1])); tx.appendChild(el("span", null, it[2])); vh.appendChild(tx);
    }
    /* Ingen dobbel tittel: en seksjonstittel som er lik mappehodet, skjules. */
    document.querySelectorAll(".sec > h2.dupl").forEach(function(h){ h.classList.remove("dupl"); });
    if(it){ const lik = function(x){ return String(x || "").trim().toLowerCase(); };
      document.querySelectorAll('.sec[data-cat="' + view + '"] > h2').forEach(function(h){ if(lik(h.firstChild && h.firstChild.textContent) === lik(it[1])) h.classList.add("dupl"); }); }
  }
  /* Finpuss 19.10: 56 px tomrom mellom mappehodet og første seksjon (målt i alle mapper med faner).
     Første seksjon i visningen/fanen faar mindre toppmarg. Bare attributter leses - ingen layout-maaling (#204). */
  merkForste();
}
function merkForste(){
  try{
    document.querySelectorAll(".sec.forst").forEach(function(x){ x.classList.remove("forst"); });
    const f = Array.prototype.find.call(document.querySelectorAll('.sec[data-cat="' + view + '"]'), function(x){
      return !x.hidden && (!x.dataset.tab || !TABS[view] || x.dataset.tab === tab); });
    if(f && view !== "menu") f.classList.add("forst");
  }catch(e){}
}

/* «Ha Aimpire paa telefonen» (founder 16.10): aapnet inne i WhatsApp/Element
   maa man finne lenka i chatten hver gang. Lagt paa hjemskjermen aapner siden
   med ett trykk. Android Chrome: ekte install-knapp naar nettleseren tilbyr
   den. Ellers: én linje per plattform, bak «Slik». Kan lukkes; husker det. */
/* Soek paa tvers av hele siden, i det spraaket som leses. Indeksen bygges av
   innholdet som allerede ligger i minnet, ingen henting. Treff hopper til riktig
   visning/fane/element og aapner det om det er foldet. */
let SIDX = [], SIDX_LANG = null, indeksPlan = 0;
function sikreIndeks(){ if(SIDX_LANG !== lang || !SIDX.length){ buildIndex(); SIDX_LANG = lang; } }
function planleggIndeks(){
  if(indeksPlan) return;
  const kjor = function(){ indeksPlan = 0; try{ sikreIndeks(); }catch(e){} };
  indeksPlan = window.requestIdleCallback ? requestIdleCallback(kjor, { timeout: 4000 }) : setTimeout(kjor, 2500);
}
/* Deler som ikke vises paa Hjem, tegnes foerst naar visningen deres aapnes (#100). #204: per visning - kalkulatoren
   (Sonic) og markedsklokka (Verktøy) kostet 112 + 108 ms ved oppstart paa billig Android uten aa vises. */
const UTSATT = { tools: new Set(), earn: new Set() };
function utsett(v, f){ if(view === v) try{ f(); }catch(e){} else UTSATT[v].add(f); }
function norm(s){ return String(s || "").normalize("NFKD").replace(/[\u0300-\u036f\u064b-\u0652\u0670]/g, "").replace(/\u00d7/g, "x").toLowerCase(); }   /* 24× = 24x */
function buildIndex(){
  /* Soek v2 (founder 17.10 19:52 «gjør søkemotoren mer avansert»): indeksen bygges for
     valgt spraak OG engelsk, og de to flettes per oppslag - saa et engelsk ord (eller
     romanisert urdu) finner treff ogsaa naar siden staar paa urdu/norsk. */
  const M = C.menu && (C.menu[lang] || C.menu.en); const where = {};
  ((M && M.items) || []).forEach(function(it){ where[it[0]] = it[1]; });
  const samle = function(L){
    const R = [];
    const pk = function(o){ return o && (o[L] || o.en); };
    /* kw = skjulte soekeord: teller i soeket, vises aldri i forhaandsvisningen. */
    /* #222: mappens og fanens navn (det folk ser i menyen: «Sonic», «Kalkulator», «Verktøy») teller som stikkord for
       alle oppslag i den - saa «sonic kalkulator» finner Sonic-kalkulatoren, ikke posisjonskalkulatoren i Verktøy. */
    const JL = pk(C.jump) || {}, ML = pk(C.menu) || {}, MT = ML.tabs || {};
    const mappe = function(cat){ const it = (ML.items || []).find(function(x){ return x[0] === cat; }); return it ? it[1] : (cat in TBREKKE_TEKST ? MT[TBREKKE_TEKST[cat]] : ""); };   /* «Sonic», «Verktøy», «Kom i gang» … */
    const add = function(title, text, cat, tb, id, kw, url){ if(!title) return;
      const navn = [tb && JL[tb], cat && mappe(cat)].filter(Boolean).join(" ");
      R.push({ t: title, x: String(text || ""), cat: cat, tab: tb, id: id, kw: ((kw || "") + " " + navn).trim(), url: url || "" }); };
    const G = pk(C.guide);
    /* Hele steget soekbart: ogsaa notat, VPN-tips, bildeforklaringer og quiz (kundegjennomgang
       17.10: «vpn» ga 0 treff selv om tipset staar i steg 9). */
    G.steps.forEach(function(st, i){ const x = st[2] || {};
      const ekstra = [x.check, x.note, x.vpn && x.vpn.t, x.marks && x.marks.map(function(m){ return m.t; }).join(" "), x.quiz && x.quiz.q].filter(Boolean).join(" ");
      add(st[0], st[1] + " " + ekstra, "start", null, "st-" + i, x.vpn ? "vpn cloudflare 1.1.1.1" : ""); });
    const LN = C.learn; if(LN && LN.terms){ pk(LN.terms).forEach(function(t, i){ add(t[0], [t[1], t[2], t[3]].join(" "), "learn", null, "ord-" + i); }); }
    if(C.halal){ const HQ = pk(C.halal); if(HQ) add(HQ.title, [HQ.lede].concat(HQ.items.map(function(x){ return x[1] + " " + x[2]; })).join(" ") + " halal islam swap", "learn", null, "s-halal"); }
    const A = C.academy; if(A && A.lessons){ A.lessons.forEach(function(les, i){ add(pk(les.title), pk(les.blocks).map(function(b){ return b[0] + " " + b[1]; }).join(" "), "learn", null, "les-" + (les.id || i)); }); }
    const F = pk(C.faq); if(F) F.items.forEach(function(it, i){ add(it[0], it[1], "faq", null, "faq-" + i); });
    const E = pk(C.earn); if(E && E.items) E.items.forEach(function(it, i){ add(it[0], it[1], "ib", null, "earn-" + i); });
    const I = pk(C.ib); if(I && I.blocks) I.blocks.forEach(function(b){ add(b[0], b[1], "ib", null, "s-ib"); });
    const Q = pk(C.ibq); if(Q){ add(Q.title, [Q.lede, Q.flow_note, (Q.steps || []).map(function(x){ return x.join(" "); }).join(" "), Q.ex_body, Q.lv_t, Q.un_t, Q.st_t, Q.rule, Q.va_t, Q.va_l, Q.rb].join(" "), "ib", null, "s-ibq"); }
    const B = pk(C.bonuses); if(B && B.items) B.items.forEach(function(it){ add(it[0], it[1] + " " + it[2], "ib", null, "s-bonus"); });
    [["sessions", "hours", "s-sessions"], ["possize", "sizing", "s-pos"], ["streaks", "sizing", "s-streak"], ["journal", "journal", "s-journal"]].forEach(function(v){
      const X = pk(C[v[0]]); if(X) add(X.title, (X.lede || "") + " " + (X.note || ""), "tools", v[1], v[2]);
    });
    /* Nye deler 17.10: produkter, margin-kalkulator, beloepskalkulator. */
    const PR = pk(C.products); if(PR) add(PR.title, [PR.lede, PR.items.map(function(it){ return it.name + " " + it.desc; }).join(" "), PR.more_t, PR.more_d].join(" "), "prod", null, "prodview");
    /* #197: «Se din egen utvikling» (#181) og ledersiden var ikke soekbare. */
    const GR = pk(C.growth); if(GR) add(GR.title, [GR.lede, GR.portal.join(" "), GR.mt5.join(" "), GR.calc_t, GR.more].join(" "), "tools", "journal", "s-growth", "utvikling progress equity net deposits balance saldo resultat");
    const LDS = pk(C.leaders), SPN = pk(C.sponsor); if(LDS && SPN && SPN.own_link && PAGE !== "leaders") add(SPN.own_link, [LDS.title, LDS.body, LDS.why].join(" "), "menu", null, "", "leder leader app-side min side lenke link invite", "ledere.html");
    const MG = pk(C.margin); if(MG) add(MG.title, [MG.lede, MG.check, MG.formula, MG.lev, MG.lots].join(" "), "tools", "sizing", "s-margin");
    const KC = pk(C.calculator), JC = pk(C.jump), MC = M && M.items.find(function(it){ return it[0] === "calc"; });
    if(KC) add((MC && MC[1]) || (JC && JC.calc) || "Calculator", [JC && JC.calc, MC && MC[2], KC.lede, KC.amount, KC.total].filter(Boolean).join(" "), "earn", "calc", "s-calc");
    const W = pk(C.withdraw); if(W && W.parts) W.parts.forEach(function(p){ add(p[0], p[1], "earn", "withdraw", "s-withdraw"); });
    const AM = C.amplify && C.amplify.items && pk(C.amplify.items); if(AM) AM.forEach(function(it){ add(it[0], Array.isArray(it[1]) ? it[1].join(" ") : it[1], "earn", "sonic", "s-amplify"); });
    /* Kortversjonene (#97) - ogsaa halal-boksen paa Sonic. */
    const TABOF = { "s-amplify": ["earn", "sonic"], "s-withdraw": ["earn", "withdraw"], "s-results": ["earn", "results"], "s-calc": ["earn", "calc"], "s-guide": ["start", null] };
    if(C.short) Object.keys(C.short).forEach(function(sid){ const S = pk(C.short[sid]); const tc = TABOF[sid]; if(!S || !tc || !S.title) return;
      /* Bare tekstverdiene - ikke feltnavn som «halal_t» (lekket inn i forhaandsvisningen, 18.10). */
      const verdier = []; (function samle(o){ if(typeof o === "string"){ if(!/^[a-z_]+$/.test(o)) verdier.push(o); } else if(o && typeof o === "object") Object.keys(o).forEach(function(k){ samle(o[k]); }); })(S);
      const tekst = verdier.join(" ");
      add(S.title, tekst, tc[0], tc[1], "sh-" + sid);
      if(S.halal_t) add(S.halal_t, S.halal_lede + " " + S.halal.map(function(h){ return h[1]; }).join(" "), tc[0], tc[1], "sh-" + sid); });
    return R;
  };
  SIDX = samle(lang);
  const EN = (conf(lang).roman_of || lang) === "en" ? null : samle("en");
  SIDX.forEach(function(e, k){
    const en = EN && EN.length === SIDX.length ? EN[k] : null;
    e.n = norm(e.t + " " + e.x + " " + e.kw + (en ? " " + en.t + " " + en.x : ""));
    e.nt = norm(e.t + (en ? " " + en.t : ""));
    e.ws = e.n.split(ORDSKILLE).filter(Boolean);
    e.wt = e.nt.split(ORDSKILLE).filter(Boolean);
    e.nk = " " + norm(e.kw || "") + " ";   /* #197: stikkord som er hele soeket, teller som tittel */
    e.w = where[e.cat] || "";
  });
}
/* Synonymer paa tvers av spraak: ett ord i en gruppe finner de andre. */
const SYN = [
  ["uttak", "ta ut", "withdraw", "withdrawal", "cash out", "utbetaling", "payout", "nikal", "nikalna", "نکال", "نکالیں", "निकाल", "निकालें", "سحب"],
  ["innskudd", "sette inn", "deposit", "jama", "جمع", "ڈپازٹ", "जमा", "إيداع", "ايداع"],
  ["halal", "haram", "حلال", "حرام", "हलाल", "islam", "islamic", "islamsk", "اسلامی", "إسلامي", "swap", "rente", "renter", "interest", "sood", "سود", "ब्याज", "فوائد", "riba", "ربا"],
  ["passord", "password", "پاس ورڈ", "पासवर्ड", "كلمة المرور"],
  ["lenke", "link", "لنک", "लिंक", "رابط"],
  ["svindel", "scam", "fraud", "dhoka", "دھوکہ", "धोखा", "احتيال", "نصب"],
  ["sponsor", "leder", "leader", "partner", "لیڈر", "लीडर", "قائد"],
  ["risiko", "risk", "tap", "tape", "taper", "tapt", "miste", "lose", "lost", "loss", "khona", "کھونا", "खोना", "خطرہ", "نقصان", "जोखिम", "नुकसान", "مخاطر", "خسارة"],
  ["gebyr", "avgift", "fee", "fees", "honorar", "kurtasje", "commission", "فیس", "फीस", "رسوم", "عمولة"],
  ["bonus", "bonuser", "bonuses", "rebate", "cpa", "pool"],
  ["token", "aitech", "000000", "hash"],
  ["konto", "account", "اکاؤنٹ", "खाता", "حساب"],
  ["penger", "money", "paise", "پیسے", "पैसे", "أموال", "مال"],
  /* Smart soek (founder 17.10 23:50 «semi selvtenkende, men ikke AI som koster»):
     flere intensjoner, saa et spoersmaal med egne ord treffer riktig sted. */
  ["registrere", "registrering", "registrer", "opprette", "sign up", "signup", "register", "kholna", "kholein", "کھولنا", "کھولیں", "खोलें", "खोलना", "تسجيل", "إنشاء"],
  ["verifisere", "verifisering", "kyc", "id", "pass", "passport", "identitet", "shanakhti", "شناختی", "पहचान", "هوية", "جواز"],
  ["godkjenning", "godkjent", "approval", "approved", "manzoori", "منظوری", "मंज़ूरी", "موافقة"],
  ["minimum", "minst", "laveste", "lowest", "kam se kam", "کم از کم", "कम से कम", "الحد الأدنى"],
  ["mt5", "metatrader", "meta trader", "terminal"],
  ["megler", "megleren", "broker", "tag markets", "t.m. financials", "tmfinancials", "بروکر", "ब्रोकर", "وسيط"],
  ["vpn", "1.1.1.1", "cloudflare", "blokkert", "blocked", "block", "محظور"],   /* ikke «band/بند»: betyr ogsaa «stengt» paa urdu */
  ["krypto", "crypto", "usdt", "usdc", "binance", "p2p", "jazzcash", "easypaisa", "redotpay", "wallet", "lommebok", "والٹ", "वॉलेट", "محفظة"],
  ["sonic", "copy", "copytrading", "kopiere", "strategi", "strategy", "amplify", "24x"],
  ["lang tid", "hvor lenge", "how long", "kitna waqt", "kitni dair", "کتنا وقت", "कितना समय", "كم من الوقت"]
].map(function(g){ return g.map(norm); });
/* Smaaord som ikke sier noe om hva man leter etter. */
const STOPP = new Set(["er","jeg","min","mitt","mine","din","ditt","dine","det","den","en","et","og","i","på","pa","til","av","med","hva","hvordan","kan","som","for","is","the","my","a","an","to","of","how","can","what","do","does","i","me","your","kya","hai","mera","meri","mein","ka","ki","ke","کیا","ہے","میرا","میری","میں","کا","کی","के","का","की","है","क्या","मेरा","में","هل","ما","كيف","في","من","hvor","når","nar","hvorfor","må","ma","jo","where","when","why","should","kaise","kab","kahan","kyun","کیسے","کب","کہاں","کیوں","कैसे","कब","कहाँ","क्यों","متى","أين","لماذا"].map(norm));
function lev1(a, b){
  /* Sant hvis a og b er like med høyst én skrivefeil (bytte, mangler, ekstra). */
  if(Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, feil = 0;
  while(i < a.length && j < b.length){
    if(a[i] === b[j]){ i++; j++; continue; }
    if(++feil > 1) return false;
    if(a.length === b.length && a[i] === b[j + 1] && a[i + 1] === b[j]){ i += 2; j += 2; continue; }   /* ombyttede bokstaver («uttka») = én feil */
    if(a.length > b.length) i++; else if(b.length > a.length) j++; else { i++; j++; }
  }
  return feil + (a.length - i) + (b.length - j) <= 1;
}
/* Poeng for ett ord mot ett oppslag: 0 = ikke treff. Tittel teller tre ganger. */
/* Ordet kobles til en intensjonsgruppe ogsaa naar det er boeyd («nikalun» -> nikal) eller
   har én skrivefeil («uttka» -> uttak). Regnes én gang per ord, ikke per oppslag (ytelse). */
const ALT_CACHE = {};
function altFor(t){
  if(ALT_CACHE[t]) return ALT_CACHE[t];
  const alt = [t]; SYN.forEach(function(g){ if(g.some(function(x){ return x === t || (t.length >= 3 && x.indexOf(t) === 0) || (x.length >= 4 && t.indexOf(x) === 0) || (t.length >= 4 && x.length >= 4 && lev1(x, t)); })) g.forEach(function(x){ if(alt.indexOf(x) < 0) alt.push(x); }); });
  return (ALT_CACHE[t] = alt);
}
function ordPoeng(e, t){
  const alt = altFor(t);
  let best = 0;
  alt.forEach(function(a, k){
    const syn = k > 0 ? 0.8 : 1;
    /* Korte ord (<= 3 tegn, f.eks. «alt», «id») maa vaere hele ord - ellers treffer «alt» inne i «resultat». */
    /* #222: stikkord (inkl. mappe-/fanenavn) teller mellom tittel (6) og broedtekst (2) */
    if(a.length <= 3 && a.indexOf(" ") < 0){
      if(e.wt && e.wt.indexOf(a) > -1) best = Math.max(best, 6 * syn);
      else if(e.nk && e.nk.indexOf(" " + a + " ") > -1) best = Math.max(best, 4 * syn);
      else if(e.ws.indexOf(a) > -1) best = Math.max(best, 2 * syn);
      return;
    }
    if(e.nt.indexOf(a) > -1) best = Math.max(best, 6 * syn);
    else if(e.nk && e.nk.indexOf(a) > -1) best = Math.max(best, 4 * syn);
    else if(e.n.indexOf(a) > -1) best = Math.max(best, 2 * syn);
    else if(a.length >= 4 && e.ws.some(function(w){ return lev1(w, a) || (w.length > a.length && lev1(w.slice(0, a.length), a)); })) best = Math.max(best, 1 * syn);
  });
  return best;
}
let ORDSKILLE = /[\s.,;:!?()«»"'\/\-–—]+/;
try{ ORDSKILLE = new RegExp("[^\\p{L}\\p{N}$%]+", "u"); }catch(e){}
function soek(v){
  sikreIndeks();
  const q = norm(v).trim(); if(q.length < 2) return [];
  let ord = q.split(/\s+/).filter(function(t){ return t.length > 1; });
  if(!ord.length) return [];
  const fyll = ord.filter(function(t){ return STOPP.has(t); });
  if(fyll.length < ord.length) ord = ord.filter(function(t){ return !STOPP.has(t); });   /* fyllord teller bare naar de er alt som er skrevet */
  /* Myk treffregel: de fleste viktige ordene maa finnes, ikke alle - saa et helt
     spoersmaal med ett ukjent ord (f.eks. «jazzcash») fortsatt finner svaret. Rangering:
     flest ord som stemmer foerst, saa poeng. Gir det ingenting, holder ett ord. */
  /* IDF-vekting (som BM25 i Fuse.js/MiniSearch, K-115): et ord som finnes i faa oppslag,
     sier mer enn et ord som finnes overalt. Regnes én gang per soek. */
  const P = SIDX.map(function(e){ return ord.map(function(t){ return ordPoeng(e, t); }); });
  const N = SIDX.length || 1;
  const idf = ord.map(function(_, k){ let df = 0; P.forEach(function(r){ if(r[k]) df++; }); return df ? Math.log(1 + (N - df + 0.5) / (df + 0.5)) : 0; });
  const vurder = function(trengs){
    return SIDX.map(function(e, ix){
      let sum = 0, traff = 0, sterke = 0;
      ord.forEach(function(t, k){ const p = P[ix][k]; if(p){ sum += p * (0.5 + idf[k]); traff++; if(p >= 4) sterke++; } });
      if(traff < trengs) return null;
      if(ord.length > 1 && e.n.indexOf(q) > -1) sum += 4;   /* hele frasen samlet */
      const kjerne = ord.join(" ");   /* «hva er amplify» -> oppslaget som HETER Amplify foerst */
      if(kjerne.length >= 3 && (e.nt === kjerne || e.nt.indexOf(kjerne + " ") === 0)) sum += 25;
      else if(kjerne.length >= 3 && e.nk && e.nk.indexOf(" " + kjerne + " ") > -1) sum += 25;
      /* #222: oppslag der ALLE ordene staar i tittel eller stikkord gaar foran dem som trenger broedteksten */
      return { e: e, s: sum, k: traff, st: sterke };
    }).filter(Boolean).sort(function(a, b){ return (b.k - a.k) || (b.st - a.st) || (b.s - a.s); });
  };
  const trengs = ord.length <= 2 ? ord.length : Math.ceil(ord.length * 0.6);
  const r = vurder(trengs);
  return r.length ? r : (trengs > 1 ? vurder(1) : r);
}
let qHist = false;
/* #232: tastatur paa PC/Mac - «/» eller Ctrl/⌘+K aapner søket (som i Slack, GitHub, Notion). Ikke mens man skriver i et felt. */
document.addEventListener("keydown", function(e){
  const t = e.target, skriver = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
  const k = (e.key || "").toLowerCase();
  if(((e.ctrlKey || e.metaKey) && k === "k") || (!skriver && !e.ctrlKey && !e.metaKey && !e.altKey && e.key === "/")){
    if(!$("q-sheet") || document.getElementById("tour")) return;
    e.preventDefault(); try{ openSearch(); }catch(x){}
  }
});
function openSearch(){
  const sh = $("q-sheet"), q = $("q-all"); if(!sh || !q) return;
  sh.hidden = false; document.body.classList.add("q-open");
  try{ history.pushState({ q: 1 }, "", location.href); qHist = true; }catch(e){ qHist = false; }
  setTimeout(function(){ q.focus(); }, 30);
  try{ if(RUN_SOEK) RUN_SOEK(); }catch(e){}
}
function closeSearch(beholdHistorikk){
  const sh = $("q-sheet"); if(!sh || sh.hidden) return;
  sh.hidden = true; document.body.classList.remove("q-open");
  const gaaTilbake = qHist && !beholdHistorikk; qHist = false;
  if(gaaTilbake){ try{ history.back(); }catch(e){} }
}
function gaaTil(e){
  if(e.url){ closeSearch(true); location.href = e.url; return; }   /* #197: treff paa en annen side (ledersiden) */
  /* Husk soeket bare naar man faktisk valgte et treff (ikke halve ord underveis). */
  try{ const qa = $("q-all"), q0 = qa ? qa.value.trim() : ""; if(q0.length >= 3){ let sist = JSON.parse(load("aimpire.sok") || "[]").filter(function(x){ return x !== q0; }); sist.unshift(q0); store("aimpire.sok", JSON.stringify(sist.slice(0, 5))); } }catch(err){}
  closeSearch(true);
  if(e.tab && TABS[e.cat]) tab = e.tab;
  setView(e.cat);
  setTimeout(function(){ const t = $(e.id); if(!t) return;
    if(t.tagName === "DETAILS") t.open = true;
    for(let p = t.parentElement; p; p = p.parentElement){ if(p.tagName === "DETAILS") p.open = true; }   /* funn 7 */
    if(t.classList.contains("folded")){ t.classList.add("open"); const n = Number(String(t.id || "").replace("st-", "")); if(!isNaN(n)) OPEN_STEPS.add(n); }
    t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 180);
}
/* Avstand mellom to ord (Levenshtein), kuttet ved 3 - nok til «mente du». */
function avstand(a, b){
  if(Math.abs(a.length - b.length) > 2) return 3;
  let f = []; for(let j = 0; j <= b.length; j++) f[j] = j;
  for(let i = 1; i <= a.length; i++){ let pr = f[0]; f[0] = i; let min = f[0];
    for(let j = 1; j <= b.length; j++){ const t = f[j]; f[j] = Math.min(f[j] + 1, f[j - 1] + 1, pr + (a[i - 1] === b[j - 1] ? 0 : 1)); pr = t; if(f[j] < min) min = f[j]; }
    if(min > 2) return 3; }
  return f[b.length];
}
function menteDu(v){
  sikreIndeks();
  const ord = v.split(/\s+/).filter(function(t){ return t.length >= 4 && !STOPP.has(t); }); if(!ord.length) return null;
  const vok = {}; SIDX.forEach(function(e){ norm(e.t).split(ORDSKILLE).forEach(function(w){ if(w.length >= 4) vok[w] = (vok[w] || 0) + 1; }); });
  const ut = ord.map(function(t){ let best = null, bd = 3, bn = 0;
    Object.keys(vok).forEach(function(w){ const d = avstand(t, w); if(d < bd || (d === bd && vok[w] > bn)){ best = w; bd = d; bn = vok[w]; } });
    return bd <= 2 ? best : t; });
  const s = ut.join(" "); return s !== ord.join(" ") ? s : null;
}
let RUN_SOEK = null;
function renderSearch(){
  /* search.ph / search.none ligger som spraakobjekt i content.json, men pakkene leverer
     dem som ferdig streng for valgt spraak - godta begge. */
  const pick = function(v){ return (v && typeof v === "object") ? (v[lang] || v.en) : v; };
  const S = C.search ? { ph: pick(C.search.ph), none: pick(C.search.none), close: pick(C.search.close), answer: pick(C.search.answer), popular: pick(C.search.popular), more: pick(C.search.more), related: pick(C.search.related), didyou: pick(C.search.didyou), recent: pick(C.search.recent) } : null;
  const sheet = $("q-sheet"), q = $("q-all"), out = $("q-out"), xb = $("q-close"), ob = $("q-open");
  if(!S || !S.ph || !sheet || !q) return;
  q.placeholder = S.ph; q.setAttribute("aria-label", S.ph);
  if(ob){ ob.setAttribute("aria-label", S.ph); ob.title = S.ph; const sl = ob.querySelector(".sbl"); if(sl) sl.textContent = S.ph; }
  if(xb){ xb.setAttribute("aria-label", S.close || "Close"); xb.title = S.close || "Close"; xb.onclick = function(){ closeSearch(); }; }
  if(!sheet.dataset.wired){
    sheet.dataset.wired = "1";
    sheet.addEventListener("click", function(e){ if(e.target === sheet) closeSearch(); });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeSearch(); });
  }
  /* #100: indeksen (~0,25 s, dobbel paa ikke-engelsk) bygges naar telefonen er ledig,
     eller i det noen faktisk soeker - ikke mens Hjem tegnes. */
  planleggIndeks();
  const run = function(){
    const v = norm(q.value.trim()); out.textContent = "";
    if(v.length < 2){
      /* Forslag foer man skriver: det folk faktisk spoer om (FAQ-titlene). */
      let sist = []; try{ sist = JSON.parse(load("aimpire.sok") || "[]"); }catch(e){}
      if(sist.length && S.recent){
        out.appendChild(el("div", "qlbl", S.recent));
        const rw0 = el("div", "qsug");
        sist.forEach(function(t){ const c = el("button", "qchip qrec", t); c.type = "button"; c.onclick = function(){ q.value = t; run(); }; rw0.appendChild(c); });
        out.appendChild(rw0);
      }
      sikreIndeks();
      const fq = SIDX.filter(function(e){ return e.cat === "faq"; }).slice(0, 6);
      if(fq.length && S.popular){
        out.appendChild(el("div", "qlbl", S.popular));
        const rw = el("div", "qsug");
        fq.forEach(function(e){ const c = el("button", "qchip", e.t); c.type = "button"; c.onclick = function(){ gaaTil(e); }; rw.appendChild(c); });
        out.appendChild(rw); out.hidden = false;
      } else out.hidden = true;
      return;
    }
    const hits = soek(q.value).slice(0, 8);
    if(!hits.length){
      out.appendChild(el("div", "qnone", S.none));
      /* «Mente du …?»: naermeste ord fra innholdet (opptil to feil). */
      const forslag = menteDu(norm(q.value));
      if(forslag && S.didyou){ const c = el("button", "qchip", S.didyou + " " + forslag + "?"); c.type = "button"; c.onclick = function(){ q.value = forslag; run(); }; out.appendChild(c); }
      out.hidden = false; return;
    }
    /* Svarkort: er beste treff et spoersmaal med svar, og klart best, vis svaret med en gang. */
    const h0 = hits[0];
    const samme = hits.length > 1 && norm(hits[1].e.t) === norm(h0.e.t);   /* samme spoersmaal to steder hindrer ikke svaret */
    if(h0.e.cat === "faq" && S.answer && (hits.length === 1 || samme || h0.k > hits[1].k || h0.s >= hits[1].s * 1.25)){
      /* «Spoer Aimpire» (inspirert av DeepSage-mentorene, K-120): svaret som en boble fra
         Aimpire med kort «skriver …» foerst. Svaret er vaart eget kildebelagte innhold, ingen AI. */
      const kort = el("div", "qans mentor");
      const av = el("span", "mav"); const ai = document.createElement("img"); ai.src = "assets/ap-gradient-96.png"; ai.alt = ""; ai.width = 22; ai.height = 22; av.appendChild(ai); kort.appendChild(av);
      kort.appendChild(el("small", null, S.answer));
      kort.appendChild(el("b", null, h0.e.t));
      const setn = h0.e.x.match(/[^.!?\u06D4\u0964]+[.!?\u06D4\u0964]+/g) || [h0.e.x];
      kort.appendChild(el("p", null, setn.slice(0, 2).join(" ").trim()));
      const mer = el("button", "qmore", (S.more || "\u2192") + " \u2192"); mer.type = "button"; mer.onclick = function(){ gaaTil(h0.e); };
      kort.appendChild(mer);
      /* Relaterte spoersmaal: andre svar med samme ord - som neste-spoersmaal hos AI-assistenter. */
      const rel = hits.slice(1).filter(function(h){ return h.e.cat === "faq"; }).slice(0, 3);
      if(rel.length && S.related){
        kort.appendChild(el("small", "qrelt", S.related));
        const rw = el("div", "qsug");
        rel.forEach(function(h){ const c = el("button", "qchip", h.e.t); c.type = "button"; c.onclick = function(){ q.value = h.e.t; run(); }; rw.appendChild(c); });
        kort.appendChild(rw);
      }
      out.appendChild(kort);
      if(!stilleBevegelse()){ kort.classList.add("skriver"); setTimeout(function(){ kort.classList.remove("skriver"); }, 450); }
    }

    hits.forEach(function(h){
      const b = el("button", "qres"); b.type = "button";
      b.appendChild(el("b", null, h.e.t));
      const nx = norm(h.e.x); let i = nx.indexOf(v);
      if(i < 0){ const f = v.split(/\s+/).filter(function(t){ return t.length > 2; }).map(function(t){ return nx.indexOf(t); }).filter(function(k){ return k > -1; }); if(f.length) i = Math.min.apply(null, f); }
      let snip;
      if(i > -1){ let st = Math.max(0, i - 50); if(st > 0){ const sp = h.e.x.indexOf(" ", st); if(sp > -1 && sp < i) st = sp + 1; } snip = (st > 0 ? "\u2026" : "") + h.e.x.slice(st, i + v.length + 90) + (i + v.length + 90 < h.e.x.length ? "\u2026" : ""); }
      else snip = h.e.x.slice(0, 120) + (h.e.x.length > 120 ? "\u2026" : "");
      if(snip.trim()) b.appendChild(el("span", null, snip));
      if(h.e.w) b.appendChild(el("small", null, h.e.w));
      b.onclick = function(){ gaaTil(h.e); };
      out.appendChild(b);
    });
    out.hidden = false;
  };
  let qT = null;
  q.oninput = function(){ clearTimeout(qT); qT = setTimeout(run, 120); };   /* vent til man har skrevet ferdig (billige telefoner) */
  RUN_SOEK = run;
  q.onkeydown = function(e){ if(e.key === "Enter"){ const f = out.querySelector(".qres"); if(f) f.click(); } };
  if(q.value) run();
}
let installPrompt = null;
window.addEventListener("beforeinstallprompt", function(e){ e.preventDefault(); installPrompt = e; renderKeep(); });
window.addEventListener("appinstalled", function(){ store("aimpire.keep", "installed"); renderKeep(); });
/* #93: hvilken app-nettleser er vi i? Moenstrene er hentet fra inapp-spy (MIT, K-101),
   saa vi ikke gjetter. Telegram kjennes paa egne window-objekter, ikke paa UA. */
function inAppNavn(){
  const ua = navigator.userAgent || "";
  const standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if(standalone) return null;
  const kjente = [["TikTok", /musical_ly|Bytedance/i], ["Instagram", /\bInstagram/i], ["Threads", /\bBarcelona/i],
    ["Messenger", /\bFB[\w_]+\/(Messenger)/i], ["Facebook", /\bFB[\w_]+\/|\bFacebook|FB_IAB|FBAN/i], ["Snapchat", /Snapchat/i],
    ["LinkedIn", /LinkedInApp/i], ["WhatsApp", /\b(WAiOS|WA4A)\/|WhatsApp/i], ["X", /\bTwitter/i], ["Line", /\bLine\//i]];
  for(const k of kjente){ if(k[1].test(ua)) return k[0]; }
  if("TelegramWebview" in window || "TelegramWebviewProxy" in window || "TelegramWebviewProxyProto" in window) return "Telegram";
  if(/WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*wv\)/i.test(ua)) return "";
  return null;
}
function inAppBanner(){
  const bar = $("inapp-bar"); if(!bar) return;
  const app = inAppNavn();
  let lukket = false; try{ lukket = sessionStorage.getItem("aimpire.iab") === "1"; }catch(e){}
  const I = C.install || {}, pick = function(v){ return v && typeof v === "object" ? (v[lang] || v[baseOf(lang)] || v.en || "") : (v || ""); };
  if(app === null || lukket || !pick(I.inapp_bar)){ bar.hidden = true; return; }
  $("inapp-t").textContent = pick(I.inapp_bar).replace("{APP}", app || pick(I.inapp_any));
  const android = /Android/.test(navigator.userAgent || "");
  const go = $("inapp-go"), ios = $("inapp-ios");
  if(android){
    go.hidden = false; ios.hidden = true;
    go.textContent = pick(I.open_chrome);
    /* Hele adressen med ?l= foelger med, saa sponsoren ikke blir borte i overgangen. */
    go.href = "intent://" + location.host + location.pathname + location.search + location.hash + "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent(location.href) + ";end";
  } else { go.hidden = true; ios.hidden = false; ios.textContent = pick(I.inapp_ios); }
  const rot = document.documentElement, maal = function(){ if(!bar.hidden) rot.style.setProperty("--iabh", Math.ceil(bar.getBoundingClientRect().height) + "px"); };
  $("inapp-x").onclick = function(){ try{ sessionStorage.setItem("aimpire.iab", "1"); }catch(e){} bar.hidden = true; rot.classList.remove("iabvis"); };
  bar.hidden = false; rot.classList.add("iabvis"); maal(); window.addEventListener("resize", maal);
}
function renderKeep(){
  /* install ligger per felt {title:{en,ur,..}, body:{..}} - ikke per spraak. Boksen har
     aldri vist seg foer (gjennomgang 17.10, funn A1). Taaler begge former. */
  const I = C.install, box = $("keep");
  const pickI = function(v){ return (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] || v.en || "") : v; };
  let K = null;
  if(I){
    const direkte = I[lang] || I.en;
    K = (direkte && typeof direkte === "object" && direkte.title) ? direkte
      : Object.keys(I).reduce(function(o, k){ o[k] = pickI(I[k]); return o; }, {});
  }
  if(!K || !K.title || !box) return;
  const ua = navigator.userAgent || "";
  const standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if(standalone || load("aimpire.keep") === "installed" || PAGE === "leaders"){ box.hidden = true; return; }
  const ios = /iPhone|iPad|iPod/.test(ua), android = /Android/.test(ua);
  const inapp = /\bwv\b|WhatsApp|FBAN|FBAV|Instagram|Line\//.test(ua);
  box.hidden = false;
  $("keep-t").textContent = K.title; $("keep-b").textContent = K.body;
  /* Founder 17.10 20:01: liten knapp i stedet for et stort kort som skjuler resten. */
  const pill = $("keep-pill"); pill.textContent = "\uD83D\uDCF2 " + K.title;
  /* #143 (founder 18.10 15:30): Android - ett trykk og det blir app (nettleserens egen dialog).
     iPhone har ingen slik dialog; der aapner pillen den korte forklaringen. */
  pill.onclick = function(){
    if(installPrompt){ installPrompt.prompt(); installPrompt.userChoice.then(function(){ installPrompt = null; renderKeep(); }); return; }
    box.classList.toggle("open"); };
  $("keep-x").setAttribute("aria-label", K.later || "Not now");
  $("keep-x").onclick = function(){ box.classList.remove("open"); };   /* funn 11: pillen blir staaende */
  const go = $("keep-go"); go.textContent = K.button; go.hidden = !installPrompt;
  go.onclick = function(){ if(!installPrompt) return; installPrompt.prompt(); installPrompt.userChoice.then(function(){ installPrompt = null; renderKeep(); }); };
  $("keep-how-t").textContent = K.how;
  const pi = $("keep-ios"), pa = $("keep-android"), pw = $("keep-inapp");
  pi.textContent = K.ios; pa.textContent = K.android; pw.textContent = K.inapp;
  pi.hidden = !(ios || !android); pa.hidden = !(android && !installPrompt);
  /* #143: iPhone har ingen installer-knapp - vis den ene linja straks, uten ekstra «Slik»-trykk. */
  if(ios){ const kh = box.querySelector(".keep-how"); if(kh) kh.open = true; }
  const ch = $("keep-chrome"); ch.textContent = K.open_chrome;
  if(android && (inapp || !installPrompt)){
    ch.hidden = false;
    ch.href = "intent://" + location.host + location.pathname + location.search + "#Intent;scheme=https;package=com.android.chrome;end";
  } else ch.hidden = true;
  /* Inne i en app-nettleser: vis veien ut uten aa maatte aapne «Slik». */
  if(inapp && !box.dataset.howaapnet){ box.dataset.howaapnet = "1"; box.querySelector(".keep-how").open = true; }
  if(inapp && !box.dataset.autoaapnet){ box.dataset.autoaapnet = "1"; box.classList.add("open"); }
}
/* Har medlemmet framdrift, aapner Start ved det aktive steget - ikke oeverst,
   forbi sju ferdige steg (founder 17.10: gjoer ting lettere). */
function hoppTilAktivtSteg(){
  if(view !== "start") return;
  const d = doneSet();
  if(!d.size) return;
  setTimeout(function(){
    const li = document.querySelector("#guide li.current");
    if(li && view === "start") li.scrollIntoView({ block: "start" });
  }, 80);
}
function setView(v, fraHash){
  view = CATS.indexOf(v) === -1 ? "menu" : v;
  if(view !== "menu" && typeof planleggTema === "function") planleggTema(1200);
  if(!fraHash){
    const h = view === "menu" ? " " : "#" + view;
    try{ history.pushState(null, "", h); NAV_DYBDE++; }catch(e){ location.hash = view === "menu" ? "" : view; }
    window.scrollTo(0, 0);
  }
  applyView();
  if(!fraHash) hoppTilAktivtSteg();
}

function viewFromHash(){
  const qs = $("q-sheet"); if(qs && !qs.hidden){ closeSearch(true); return; }   /* tilbake-knappen lukker soeket (funn A12) */
  let h = (location.hash || "").replace(/^#/, "");
  const raw = h;
  /* #130: «Guider som allerede finnes» aapner leksjonen selv, ikke bare Laer-fanen. */
  if(/^(les|ord)-[\w-]+$/.test(raw)){
    setView("learn", true); try{ history.replaceState(null, "", "#learn"); }catch(e){}
    setTimeout(function(){ const t = $(raw); if(!t) return; if(t.tagName === "DETAILS") t.open = true;
      for(let p = t.parentElement; p; p = p.parentElement){ if(p.tagName === "DETAILS") p.open = true; }
      t.scrollIntoView({ block: "start" }); }, 120);
    return;
  }
  /* #142: «#steg-7» = Start, steg 7 åpent og rullet fram (snarveiene på Hjem). */
  const sm = /^steg-(\d{1,2})$/.exec(raw);
  if(sm){
    const ix = parseInt(sm[1], 10) - 1;
    setView("start", true); OPEN_STEPS.add(ix);
    setTimeout(function(){ const li = $("st-" + ix); if(!li) return;
      if(li.classList.contains("folded")){ li.classList.add("open"); const hh = li.querySelector("h3"); if(hh) hh.setAttribute("aria-expanded", "true"); }
      li.scrollIntoView({ block: "start" }); }, 140);
    return;
  }
  h = ALIAS[h] || h;
  const foer = view;
  setView(CATS.indexOf(h) === -1 ? "menu" : h, true);
  if(view !== foer){ try{ window.scrollTo(0, 0); }catch(e){} hoppTilAktivtSteg(); }   /* ny visning = start oeverst (funn A9) */
  if(raw === "calc"){ setTab("calc", true); }
  /* #131: «Gruppa i Element X» fra Hjem og «Spør i gruppa» - rett til gruppa, ikke til steg 1. */
  else if(raw === "chat"){ setTimeout(function(){ const c = $("s-community"); if(c) c.scrollIntoView({ block: "start" }); }, 260); }
  else if(TABS[h] && TABS[h].indexOf(raw) !== -1){ setTab(raw, true); }   /* #92: #hours -> Verktoey, fanen Markedstider */
}
window.addEventListener("hashchange", viewFromHash);
window.addEventListener("popstate", viewFromHash);

/* Romanisert urdu/arabisk er et eget spraakspor (ur_rm, ar_rm), men ikke en
   egen knapp i hovedraden: det er et skriftvalg under spraaket. */
const baseOf = code => conf(code).roman_of || code;
function oppdaterSprakKnapp(){
  const b = $("L-cur"); if(!b) return;
  const L = conf(lang), base = conf(baseOf(lang));
  b.textContent = "";
  b.appendChild(el("span", "gl", "\uD83C\uDF10"));
  const t = el("span", "lt", L.roman_of ? L.label : base.label); t.dir = "auto"; b.appendChild(t);
}
function ldTopp(){
  const lt = $("ld-top"), B = C.ldbtn && (C.ldbtn[lang] || C.ldbtn.en); if(!lt || !B) return;
  const meg = !!load("aimpire.me");
  lt.textContent = ""; lt.classList.toggle("meg", meg);
  const sv = document.createElementNS("http://www.w3.org/2000/svg", "svg"); sv.setAttribute("viewBox", "0 0 24 24"); sv.setAttribute("aria-hidden", "true");
  sv.innerHTML = '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  lt.appendChild(sv); lt.appendChild(el("span", null, meg ? B.mine : B.other)); lt.setAttribute("aria-label", meg ? B.mine : B.other); lt.title = meg ? B.mine : B.other;
}
function buildSwitch(){
  const nav = $("switch"); nav.textContent = "";
  /* #155 (proff-gjennomgang): seks språkknapper i egen rad tok plass før man så hva Aimpire er, og
     velkomstporten spør allerede om språk. Nå: én knapp med gjeldende språk - trykk = porten igjen
     (språk og skrift, f.eks. urdu / Roman Urdu). */
  const lb = el("button", "langbtn"); lb.type = "button"; lb.id = "L-cur";
  lb.setAttribute("aria-label", "Language");
  lb.onclick = function(){ store("aimpire.lang.asked", null); try{ sporSprak(); }catch(e){} };
  nav.appendChild(lb); oppdaterSprakKnapp();
  /* #232: «◐» finnes ikke i mange skrifter (vist som en liten «‹» paa PC og Android). Ekte ikon i stedet:
     maane i moerkt tema, sol i lyst - viser hva man HAR, og bytter ved trykk. */
  const th = el("button","thm");
  th.innerHTML = '<svg class="ti-m" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>' +
    '<svg class="ti-s" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  th.setAttribute("aria-label","Light or dark"); th.title = "Light / dark";
  th.onclick = toggleTheme;
  nav.appendChild(th);
  /* #190 (founder 19.10 05:03 «hvor er lederknappen … der boer innstillingene vaere»): fast knapp oeverst.
     Leder paa egen telefon = «Min side» (lenke, profil, kanaler, QR); ellers «Leder» (soeknaden). */
  if(false && PAGE !== "leaders" && !$("ld-top")){   /* #196: lederknappen bor naa i bunnmenyen */
    const lt = el("a", "ldtop"); lt.id = "ld-top"; lt.href = "ledere.html";
    nav.parentNode.insertBefore(lt, nav);
  }
  ldTopp();
  if(PAGE !== "leaders" && $("q-sheet") && !$("q-open")){
    const sb = el("button","sbtn"); sb.type = "button"; sb.id = "q-open";
    sb.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    sb.setAttribute("aria-label", "Search");
    /* #232: paa PC/Mac blir ikonet et synlig soekefelt med hurtigtast (CSS viser det bare >= 1024 px) */
    sb.appendChild(el("span", "sbl"));
    sb.appendChild(el("span", "kbd", /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "\u2318K" : "Ctrl K"));
    sb.onclick = openSearch;
    nav.parentNode.insertBefore(sb, nav);
  }
}

/* Spraakpakker (#37): siden har bare engelsk. Et annet spraak hentes én gang
   fra lang/<kode>.json og lagres paa telefonen, saa neste besoek aapner rett
   paa urdu uten ventetid. Pakken byttes bare naar innholdet faktisk endres
   (hashen i C.packs). Feiler hentingen, vises engelsk - aldri en tom side. */
const HAVE = { en: true };
function mergePack(L, entries){
  entries.forEach(function(e){
    let o = C;
    for(let i = 0; i < e[0].length && o; i++) o = o[e[0][i]];
    if(o && typeof o === "object") o[L] = e[1];
  });
  HAVE[L] = true;
}
function cachedPack(L){
  try{
    const p = JSON.parse(localStorage.getItem("aimpire.pack." + L) || "null");
    return p && C.packs && p.v === C.packs[L] ? p.d : null;
  }catch(e){ return null; }
}
function ensurePack(L){
  if(HAVE[L] || !C.packs || !C.packs[L]) return Promise.resolve(true);
  const c = cachedPack(L);
  if(c){ mergePack(L, c); return Promise.resolve(true); }
  const timeout = new Promise(function(res){ setTimeout(function(){ res(null); }, 8000); });
  /* Hashen ligger i filnavnet, ikke i ?v=: GitHub Pages' kant ignorerer spoerrestrengen,
     saa ?v= kunne gi en gammel pakke under ny hash (gjennomgang 17.10, funn C2). */
  const get = fetch("lang/" + L + "." + C.packs[L] + ".json")
    .then(function(r){ return r.ok ? r.json() : null; })
    .catch(function(){ return null; });
  return Promise.race([get, timeout]).then(function(d){
    if(!Array.isArray(d)) return false;
    mergePack(L, d);
    try{ localStorage.setItem("aimpire.pack." + L, JSON.stringify({ v: C.packs[L], d: d })); }catch(e){}
    return true;
  });
}
let langSeq = 0, LANG_KLAR = false;   /* #204: sant etter foerste applyLang - foer det tegner ingen andre hele siden */
function setLang(code){
  const L = conf(code).code, my = ++langSeq;
  if(HAVE[L] || cachedPack(L)){ ensurePack(L); applyLang(L); return; }
  document.documentElement.setAttribute("aria-busy", "true");
  ensurePack(L).then(function(ok){
    if(my !== langSeq) return;   /* funn 5: et senere valg vinner */
    document.documentElement.removeAttribute("aria-busy");
    applyLang(ok ? L : "en", !ok);
  });
}
function applyLang(code, ikkeLagre){
  document.documentElement.removeAttribute("aria-busy");   /* #155 F1: synkron gren og utdaterte svar skal aldri la siden stå skjult */
  const L = conf(code);
  lang = L.code;
  document.documentElement.lang = L.bcp || L.code;
  document.documentElement.dir = L.dir;
  document.documentElement.setAttribute("data-font", L.font);
  C.langs.forEach(function(x){
    const b = $("L-" + x.code);
    if(b) b.setAttribute("aria-pressed", String(x.code === baseOf(lang)));
  });
  try{ oppdaterSprakKnapp(); }catch(e){} try{ ldTopp(); }catch(e){}
  /* #155 F11: oppdateringsstripa følger språket. */
  try{ const ob = $("oppdater"); if(ob){ const U = C.update_ready || {}, G = C.update_go || {}; const ut = ob.querySelector(".ut"), ug = ob.querySelector(".ug");
    if(ut) ut.textContent = "\u2728 " + (U[lang] || U[baseOf(lang)] || U.en); if(ug) ug.textContent = "\u21BB " + (G[lang] || G[baseOf(lang)] || G.en); } }catch(e){}
  /* Skriftvalg: bare naar spraaket har en romanisert variant. */
  const sc = $("script"), base = baseOf(lang);
  const rom = C.langs.find(function(x){ return x.roman_of === base; });
  if(sc){
    sc.textContent = "";
    sc.hidden = !rom;
    if(rom){
      [conf(base), rom].forEach(function(x){
        const b = el("button", null, x.label);
        b.type = "button";
        b.setAttribute("aria-pressed", String(x.code === lang));
        if(x.dir === "rtl") b.dir = "rtl";
        b.onclick = function(){ store("aimpire.script." + base, x.code); setLang(x.code); };
        sc.appendChild(b);
      });
    }
  }
  if(!ikkeLagre) store("aimpire.lang", lang);
  /* Funn 10: paa en lederlenke staar spraaket i adressen, saa iPhone-appen (eget lager) beholder det. */
  try{ const q = new URLSearchParams(location.search); if(q.get("l") && q.get("lang") !== lang){ q.set("lang", lang); history.replaceState(history.state, "", location.pathname + "?" + q.toString() + location.hash); } }catch(e){}
  LANG_KLAR = true;
  render();
}
function toggleTheme(){
  /* Moerk er standard (founder 15.10): foerste trykk gaar til lys. */
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  store("aimpire.theme.v2", next);
  lukkTema();
}
/* Spør én gang ved første besøk om lys eller mørk bakgrunn. Valget gjelder straks
   (forhaandsvisning), lagres, og kan endres senere med ◐. Lukkes panelet, står mørk. */
function temaTekst(){
  const box = document.getElementById("tema"); if(!box || !C.theme_ask) return;
  const T = C.theme_ask[lang] || C.theme_ask.en;
  box.querySelector("h3").textContent = T.title; box.querySelector("p").textContent = T.body;
  box.querySelector(".x").setAttribute("aria-label", T.close);
  box.querySelector('[data-t="light"] span').textContent = T.light;
  box.querySelector('[data-t="dark"] span').textContent = T.dark;
}
function lukkTema(){
  store("aimpire.theme.asked", "1");
  const box = document.getElementById("tema"); if(!box) return;
  box.classList.remove("vis"); setTimeout(function(){ box.remove(); }, 400);
}
function sporTema(){
  if(load("aimpire.theme.v2") || load("aimpire.theme.asked") || !C.theme_ask || document.getElementById("tema")) return;
  /* Founder 18.10 16:09: språk FØR lys/mørk - de vet ikke hva «mørk» betyr før språket er valgt. */
  if(!load("aimpire.lang.asked") || document.getElementById("port")){ TEMA_PLAN = false; return; }
  const box = document.createElement("div"); box.id = "tema"; box.setAttribute("role", "dialog"); box.setAttribute("aria-labelledby", "tema-h");
  box.innerHTML = '<div class="tt"><h3 id="tema-h"></h3><button class="x" type="button">\u00d7</button></div><p></p><div class="valg">' +
    '<button type="button" data-t="light" aria-pressed="false"><div class="pv l"><i></i><i></i><b></b></div><span></span></button>' +
    '<button type="button" data-t="dark" aria-pressed="false"><div class="pv d"><i></i><i></i><b></b></div><span></span></button></div>';
  document.body.appendChild(box);
  temaTekst();
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  box.querySelectorAll(".valg button").forEach(function(b){
    b.setAttribute("aria-pressed", String(b.dataset.t === cur));
    b.onclick = function(){
      document.documentElement.setAttribute("data-theme", b.dataset.t);
      store("aimpire.theme.v2", b.dataset.t);
      box.querySelectorAll(".valg button").forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
      feirVed(b, 12); vibrer(8);
      setTimeout(lukkTema, 650);
    };
  });
  box.querySelector(".x").onclick = lukkTema;
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ box.classList.add("vis"); }); });
}
/* Fortsatt ved FOERSTE besoek (#80), men ikke over velkomst-/registreringskortet i aller
   foerste oeyeblikk (kundegjennomgang 17.10 23:30): spoer naar kunden har aapnet en del av
   appen, eller etter 45 s. */
let TEMA_PLAN = false;
function planleggTema(ms){ if(TEMA_PLAN) return; TEMA_PLAN = true; setTimeout(function(){ try{ sporTema(); }catch(e){} }, ms); }
window.addEventListener("load", function(){ setTimeout(function(){ planleggTema(0); }, 45000); });
/* #145 (founder 18.10 15:38 «språkene ser man ikke tydelig … la dem velge når de åpner linken, deretter
   farge»): ved første åpning et ark med de fem språkene i egen skrift. Urdu og arabisk faar et andre
   valg: egen skrift eller romanisert (latinske bokstaver) - med en prøvelinje, saa man ser forskjellen.
   Etterpaa kommer lys/mørk. Lukkes arket, gjelder spraaket som allerede er valgt. */
function sporSprak(){
  /* #148 (founder 18.10 15:57 «drit stygt … unngå typisk Claude-layout»): ikke et ark med bokser,
     men en velkomstport. Hilsenen i egen skrift ER knappen - man kjenner igjen sitt eget alfabet før
     man leser. Urdu/arabisk: raden deler seg i egen skrift | latinske bokstaver. Alltid svart, uansett tema. */
  const A = C.lang_ask; if(!A || !A.rows || load("aimpire.lang.asked") || document.getElementById("port")) return;
  const port = el("div"); port.id = "port"; port.setAttribute("role", "dialog"); port.setAttribute("aria-label", "Language");
  const top = el("div", "ptop"); const lg = document.createElement("img"); lg.src = "assets/ap-gradient-96.png"; lg.alt = "Aimpire"; lg.width = 34; lg.height = 34; top.appendChild(lg);
  const x = el("button", "px", "\u00d7"); x.type = "button"; x.setAttribute("aria-label", "Close"); top.appendChild(x); port.appendChild(top);
  /* Sjel (founder 16:29 «den var død»): merkevarens kurslinje tegnes over porten, med en lysprikk som løper. */
  const ns = "http://www.w3.org/2000/svg", sv = document.createElementNS(ns, "svg"); sv.setAttribute("class", "pline"); sv.setAttribute("aria-hidden", "true");
  /* Founder 16:33: pulsen diagonalt fra hjørne til hjørne - en kurs som stiger nede-venstre -> oppe-høyre, bak hilsenene.
     Punktene regnes i skjermens piksler (ikke strukket viewBox), saa strek og lyspuls blir jevne. */
  const VW = Math.max(320, window.innerWidth), VH = Math.max(480, window.innerHeight);
  sv.setAttribute("viewBox", "0 0 " + VW + " " + VH);
  const P = [[-.02,1.02],[.08,.93],[.14,.96],[.24,.83],[.31,.86],[.40,.73],[.47,.77],[.57,.60],[.63,.64],[.72,.48],[.79,.52],[.88,.32],[.93,.36],[1.02,-.02]];
  const D = "M" + P.map(function(q){ return Math.round(q[0] * VW) + " " + Math.round(q[1] * VH); }).join(" L");
  sv.innerHTML = '<defs><linearGradient id="plg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#15D8C4"/><stop offset=".5" stop-color="#1B4FD8"/><stop offset="1" stop-color="#C21FBF"/></linearGradient></defs>' +
    '<path class="pl" pathLength="100" d="' + D + '"/><path class="pp" pathLength="100" d="' + D + '"/>';
  port.appendChild(sv);
  const list = el("div", "prows"); port.appendChild(list);
  const ferdig = function(){ store("aimpire.lang.asked", "1"); port.classList.add("ut"); setTimeout(function(){ port.remove(); document.documentElement.classList.remove("portaapen"); }, 520); planleggTema(900); setTimeout(function(){ try{ tourSjekk(); }catch(e){} }, 700); };
  /* Steg 2 i samme port (#148): lys eller mørk som to halvdeler av skjermen - man ser valget før man tar det. */
  const temaSteg = function(){
    const T = C.theme_ask && (C.theme_ask[lang] || C.theme_ask.en);
    if(!T || load("aimpire.theme.v2")){ ferdig(); return; }
    port.classList.add("tema"); list.textContent = "";
    const ferdigTema = function(){ store("aimpire.theme.asked", "1"); TEMA_PLAN = true; ferdig(); };
    [["light", T.light], ["dark", T.dark]].forEach(function(v, i){
      const k = el("button", "pth " + v[0]); k.type = "button"; k.style.setProperty("--i", i);
      if(i === 0 && T.title) k.appendChild(el("span", "pq", T.title));
      k.appendChild(el("span", "pg", v[1]));
      k.onclick = function(){ document.documentElement.setAttribute("data-theme", v[0]); store("aimpire.theme.v2", v[0]); vibrer(8); k.classList.add("valgt"); setTimeout(ferdigTema, 380); };
      list.appendChild(k);
    });
  };
  const velg = function(code, node){ setLang(code); vibrer(8); if(node) node.classList.add("valgt"); setTimeout(temaSteg, 380); };
  const fontAv = function(code){ const L = C.langs.find(function(y){ return y.code === code; }); return L ? L.font : "latin"; };
  A.rows.forEach(function(r, i){
    const L = C.langs.find(function(y){ return y.code === r[0]; }); if(!L) return;
    const b = el("button", "prow"); b.type = "button"; b.dir = L.dir; b.lang = r[0]; b.style.setProperty("--i", i);
    b.setAttribute("data-f", L.font);
    b.appendChild(el("span", "pg", r[1])); b.appendChild(el("span", "pn", r[2]));
    if(r[3]){ const f = el("span", "pf", r[3]); f.setAttribute("aria-hidden", "true"); b.appendChild(f); }
    b.onclick = function(){
      const S = A.script && A.script[{ ur: "for_urdu", ar: "for_arabic" }[r[0]]];
      const rm = C.langs.find(function(y){ return y.roman_of === r[0]; });
      if(!S || !rm){ velg(r[0], b); return; }
      port.classList.add("delt");
      list.querySelectorAll(".prow").forEach(function(o){ if(o !== b) o.classList.add("bort"); });
      const split = el("div", "psplit");
      [[r[0], S.a, S.a_d, L.dir, L.font], [rm.code, S.b, S.b_d, "ltr", "latin"]].forEach(function(v){
        const k = el("button", "phalf"); k.type = "button"; k.dir = v[3]; k.setAttribute("data-f", v[4]); k.lang = v[0];
        k.appendChild(el("span", "pg", v[1])); k.appendChild(el("span", "pn", v[2]));
        k.onclick = function(){ velg(v[0], k); }; split.appendChild(k);
      });
      /* Founder 16:35: si hva valget er - spørsmålet over, i begge skrifter. */
      const sq = el("div", "psq"); const q1 = el("b", null, S.q || ""); q1.dir = L.dir; q1.setAttribute("data-f", L.font); sq.appendChild(q1);
      if(S.q_rm){ const q2 = el("span", null, S.q_rm); q2.dir = "ltr"; sq.appendChild(q2); }
      b.replaceWith(split); split.before(sq);
    };
    list.appendChild(b);
  });
  x.onclick = function(){ if(port.classList.contains("tema")){ store("aimpire.theme.asked", "1"); TEMA_PLAN = true; ferdig(); } else temaSteg(); };   /* lukk = behold språket, men vis lys/mørk på det */
  document.documentElement.classList.add("portaapen");
  document.body.appendChild(port);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ port.classList.add("inn"); }); });
}
window.addEventListener("load", function(){ setTimeout(function(){ try{ sporSprak(); }catch(e){} }, 600); });
(function(){
  const th = load("aimpire.theme.v2");
  if(th) document.documentElement.setAttribute("data-theme", th);
  let l = load("aimpire.lang");
  try{ const ql = new URLSearchParams(location.search).get("lang"); if(ql && C.langs.some(function(x){ return x.code === ql; })) l = ql; }catch(e){}
  if(!C.langs.some(function(x){ return x.code === l; })){
    /* Telefonens egen rekkefoelge avgjoer: en urdu-telefon med engelsk som nr. 2 skal faa
       urdu, ikke engelsk (gjennomgang 17.10, funn A2). nb/nn = norsk. */
    const liste = ((navigator.languages && navigator.languages.length) ? Array.prototype.slice.call(navigator.languages) : [navigator.language || ""])
      .map(function(x){ return String(x || "").toLowerCase().replace(/^(nb|nn)(?=-|$)/, "no"); });
    let hit = null;
    for(let i = 0; i < liste.length && !hit; i++){
      hit = C.langs.find(function(x){ return liste[i] === x.code || liste[i].indexOf(x.code + "-") === 0; });
    }
    l = hit ? hit.code : C.langs[0].code;
  }
  let h0 = (location.hash || "").replace(/^#/, "");
  const raa0 = h0;
  h0 = ALIAS[h0] || h0;
  if(CATS.indexOf(h0) !== -1) view = h0;
  /* #142: delt/aapnet lenke til et steg (#steg-7) - Start-fanen, og steget aapnes naar siden er tegnet. */
  if(/^(les|ord)-[\w-]+$|^chat$/.test(raa0)) setTimeout(viewFromHash, 700);   /* #155 F7: dype lenker til leksjon/ord/gruppa virker også ved første åpning */
  if(/^steg-\d{1,2}$/.test(raa0)){ view = "start"; OPEN_STEPS.add(parseInt(raa0.slice(5), 10) - 1); setTimeout(viewFromHash, 700); }
  /* En delt lenke til en FANE (#calc) skal aapne fanen, ikke bare visningen. */
  if(TABS[h0] && TABS[h0].indexOf(raa0) !== -1) tab = raa0;
  const go = function(){ lang = conf(l).code; initSponsor(); buildSwitch(); setLang(l); };   /* #155 F10: riktig språk i adressen fra start */
  /* Har lenka eller telefonen en leder, ventes det paa den ferske lista (liten
     fil), saa en leder founder nettopp har lagt til eller fjernet gjelder straks. */
  /* Ytelsesmaaling 17.10 (Fast 3G, 4x CPU): aa holde hele siden skjult til lista kom,
     ga 3,5 s forsinket foerste visning. Naa tegnes siden straks; sponsorblokken viser
     «sjekker invitasjonen» til lista er der, og oppdaterer seg selv naar den kommer.
     Hurtigbufret liste fra sist gjoer uansett sponsoren riktig fra foerste bilde. */
  /* Hjemskjerm-ikonet: hvitt for universal, moerkt KUN naar siden aapnes fra en
     lederlenke (founder 17.10 04:07 + 04:12). Byttes foer noen rekker aa lagre. */
  try{
    const lKode = String(new URLSearchParams(location.search).get("l") || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if(lKode && /^[a-z0-9]{6}$/.test(lKode)){
      const atL = document.querySelector('link[rel="apple-touch-icon"]');
      if(atL) atL.href = "assets/apple-touch-icon-dark.png";
    }
  }catch(e){}
  /* Funn 1: lista startes FOER foerste tegning, saa «sjekker invitasjonen» vises i stedet for «ingen sponsor». */
  const pReg = loadReg();
  try{ go(); }catch(e){ try{ console.error(e); }catch(_){} }
  /* #100: lista kommer etter foerste tegning. Hele siden tegnes bare paa nytt naar det
     den endrer - sponsoren, bekreftelsen, konflikten eller «sjekker» - faktisk er nytt
     (maalt 18.10: en ekstra full tegning paa ~0,5-1 s paa treg telefon for ingenting). */
  const sponsorBilde = function(){ return [sponsorUrl, sponsorName, sponsorVerified, REG_VENTER,
    pendingConflict ? pendingConflict.a.id + "/" + pendingConflict.b.id : ""].join("|"); };
  const foerReg = sponsorBilde();
  /* #204 (maalt 19.10, CPU x6): lista kom 8 ms FOER spraakpakken, saa hele siden ble tegnet to ganger paa rad (2 x 300 ms).
     Er spraaket ikke klart ennaa, tegner applyLang alt straks etterpaa - med sponsoren. */
  pReg.then(function(){ try{ initSponsor(); if(sponsorBilde() !== foerReg && LANG_KLAR) render(); }catch(e){} });
  /* Siden virker uten nett etter foerste besoek, og andre aapning er
     oeyeblikkelig. Registreres for alle, etter load, saa den aldri
     konkurrerer med foerste last. */
  /* Maaling (B-020): Cloudflare Web Analytics, uten cookies og uten lagret IP.
     Lastes bare naar founder har limt inn token, og foerst etter load. */
  const CF = C.analytics && C.analytics.cf_token;
  if(CF && /^[0-9a-f]{32}$/.test(CF) && location.protocol === "https:"){
    const lastBeacon = function(){
      const sc = document.createElement("script"); sc.defer = true;
      sc.src = "https://static.cloudflareinsights.com/beacon.min.js";
      sc.setAttribute("data-cf-beacon", JSON.stringify({ token: CF }));
      document.body.appendChild(sc);
    };
    if(document.readyState === "complete") lastBeacon(); else window.addEventListener("load", lastBeacon);
  }
  if("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){
    /* Ledersiden: feltene overlever en omlasting (16.10: en leder satt paa en gammel
       versjon av siden i en halvtime og fikk soeknaden stille avvist av Google). */
    const LD_FELT = ["ld-in", "ld-name", "ld-mail", "ld-spons"], LD_KEY = "aimpire.ld.stash";
    const erLedere = PAGE === "leaders";   /* feltet ld-in finnes skjult paa medlemssiden ogsaa (gjennomgang 17.10, funn C1) */
    if(erLedere){
      try{
        const st = JSON.parse(sessionStorage.getItem(LD_KEY) || "null");
        if(st){ sessionStorage.removeItem(LD_KEY); LD_FELT.forEach(function(id){ const el = document.getElementById(id); if(el && st[id]) el.value = st[id]; }); }
      }catch(e){}
    }
    let haddeKontroll = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("controllerchange", function(){
      if(!haddeKontroll){ haddeKontroll = true; return; }   /* foerste installasjon (ingen gammel SW): ikke last om */
      /* Medlemssiden: ingen tvungen omlasting midt i lesingen, men en tydelig knapp.
         (Founder 17.10 12:06: «alle får opp de gamle» - faner står åpne i dagevis.) */
      /* #147: vis bare varselet hvis siden som vises faktisk er eldre enn den som ligger ute.
         Fingeravtrykk = app-skriptets navn (hash) + lengden av stilarkene. Samme = alt er ferskt, ingen stripe. */
      if(!erLedere){
        const fp = function(appSrc, cssLen){ return String(appSrc || "").replace(/^.*\//, "") + "|" + cssLen; };
        const minApp = (document.querySelector('script[src*="app-"]') || {}).getAttribute ? document.querySelector('script[src*="app-"]').getAttribute("src") : "";
        let minCss = 0; document.querySelectorAll("style").forEach(function(st){ minCss = Math.max(minCss, st.textContent.length); });   /* største stilark (noscript-stilen telles ikke i DOM) */
        fetch("./", { cache: "no-store" }).then(function(r){ return r.ok ? r.text() : null; }).then(function(t){
          if(!t){ visOppdater(); return; }
          const m = new RegExp("<script sr" + "c=.(app-[a-z]\\.[0-9a-f]+\\.js)").exec(t);   /* delt opp: byggets lenkesjekk skal ikke lese dette som en fil */ let css = 0;
          t.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, function(_, c){ css = Math.max(css, c.length); return _; });
          if(fp(m && m[1], css) !== fp(minApp, minCss)) visOppdater();
        }).catch(function(){ visOppdater(); });
        return;
      }
      if(window.__ldSending) return;                         /* midt i en innsending: aldri avbryt den */
      const harInnhold = LD_FELT.some(function(id){ const el = document.getElementById(id); return !!(el && el.value); });
      let lagret = false;
      try{
        const sist = Number(sessionStorage.getItem("aimpire.sw.reloadedAt") || 0);
        if(Date.now() - sist < 15000) return;                /* aldri omlastingsloekke */
        sessionStorage.setItem("aimpire.sw.reloadedAt", String(Date.now()));
        const st = {}; LD_FELT.forEach(function(id){ const el = document.getElementById(id); if(el && el.value) st[id] = el.value; });
        sessionStorage.setItem(LD_KEY, JSON.stringify(st));
        lagret = true;
      }catch(e){}
      if(harInnhold && !lagret) return;                      /* kunne ikke ta vare paa feltene (sessionStorage sperret): la lederen sende foerst */
      location.reload();
    });
    function visOppdater(){
      if(document.getElementById("oppdater")) return;
      /* #150 (founder 18.10 16:07): «trykk for å oppdatere» i en pille ble ikke forstått. Nå en stripe
         øverst: hva som har skjedd til venstre, en ekte knapp «Oppdater nå» til høyre. Hele stripa virker. */
      const U = C.update_ready || {}, G = C.update_go || {};
      const k = document.createElement("button"); k.id = "oppdater"; k.type = "button";
      k.appendChild(el("span", "ut", "\u2728 " + (U[lang] || U[baseOf(lang)] || U.en || "A new version is ready")));
      k.appendChild(el("span", "ug", "\u21BB " + (G[lang] || G[baseOf(lang)] || G.en || "Update now")));
      k.onclick = function(){ location.reload(); };
      document.body.appendChild(k);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ k.classList.add("vis"); }); });
    }
    const regSw = function(){
      navigator.serviceWorker.register("sw.js").then(function(reg){
        /* Se etter ny versjon naar siden kommer i forgrunnen igjen, og hvert minutt mens den er aapen. */
        const sjekk = function(){ try{ reg.update().catch(function(){}); }catch(e){} };
        document.addEventListener("visibilitychange", function(){ if(document.visibilityState === "visible") sjekk(); });
        setInterval(sjekk, 60000);
      }).catch(function(){});
    };
    if(document.readyState === "complete") regSw(); else window.addEventListener("load", regSw);
  }
})();
