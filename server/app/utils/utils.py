
from typing import Literal


countries = Literal[
    "us","gb","ae","af","al","dz","as","ad","ao","ai","aq","ag","ar","am","aw","au","at","az","bs","bh",
    "bd","bb","by","be","bz","bj","bm","bt","bo","ba","bw","bv","br","io","bn","bg","bf","bi","kh","cm",
    "ca","cv","ky","cf","td","cl","cn","cx","co","km","cg","cd","ck","cr","ci","hr","je","cu","cy","cw",
    "cz","dk","dj","dm","do","tl","ec","eg","sv","gq","er","ee","et","fk","fo","fj","fi","fr","gf","pf",
    "tf","ga","gm","ge","de","gh","gi","gr","gl","gd","gp","gu","gt","gn","gw","gy","ht","hm","va","hn",
    "hk","hu","is","in","id","ir","iq","ie","il","it","jm","jp","jo","kz","ke","ki","xk","kp","kr","kw",
    "kg","la","lv","lb","ls","lr","ly","li","lt","lu","mo","mk","mg","mw","my","mv","ml","mt","mh","mq",
    "mr","mu","yt","mx","fm","md","mc","mn","ms","ma","mz","mm","me","na","nr","np","nl","an","nc","nz",
    "ni","ne","ng","nu","nf","mp","no","om","pk","pw","ps","pa","pg","py","pe","ph","pn","pl","pt","pr",
    "qa","re","ro","ru","rw","sh","kn","lc","pm","vc","ws","sm","st","sa","sn","sc","sl","sg","sk","si",
    "sb","so","za","gs","es","lk","sd","sr","sj","sz","se","ch","sy","tw","tj","tz","th","tg","tk","to",
    "tt","tn","tr","tm","tc","tv","ug","ua","uy","uz","vu","ve","vn","vg","vi","wf","eh","ye","yu","zm",
    "zw","rs","sx","wo"
]

languages = Literal[
    "af","sq","am","ar","hy","as","az","bm","eu","be","bn","bs","bg","my","ca","ckb","zh",
    "hr","cs","da","nl","en","et","pi","fi","fr","gl","ka","de","el","gu","ha","he","hi",
    "hu","is","id","it","jp","kn","kz","kh","rw","ko","ku","lv","lt","lb","mk","ms","ml",
    "mt","mi","mr","mn","ne","no","or","ps","fa","pl","pt","pa","ro","ru","sm","sr","sn",
    "sd","si","sk","sl","so","es","sw","sv","tg","ta","te","th","zht","tr","tk","uk","ur",
    "uz","vi","cy","zu"
]

categories = Literal["business","crime","domestic","education","entertainment", 'environment', 'food','health', 'lifestyle','politics','science', 'sports', 'technology', 'top', 'tourism','world', 'other']